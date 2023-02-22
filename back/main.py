from asgiref.wsgi import WsgiToAsgi
from flask import Flask,request,session ,jsonify
from models import Image,User,Library,Book,Page,Note,Character,Place,BookMark,BookPlace,BookCharacter,LibraryBook,connect_db,db
from werkzeug.utils import secure_filename
from flask_cors import CORS,cross_origin

from flask_session import Session
import uuid as uuid
import base64
import os

app = Flask(__name__)
CORS(app)

asgi_app = WsgiToAsgi(app)

cors=CORS(app,resources={r"/*":{
"origins":"https://writing-aura.up.railway.app"
}})
@cross_origin(supports_credentials=True)

def serve():
    return send_from_directory(app.static_folder,'index.html')

uri = os.environ.get('DATABASE_URL',"postgresql:///library_db")
if uri.startswith("postgres://"):
    uri = uri.replace("postgres://", "postgresql://", 1)

app.config["SQLALCHEMY_DATABASE_URI"] = uri
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config["SECRET_KEY"] = os.environ.get('SECRET_KEY','catsArethebest')
app.config['SESSION_TYPE'] = 'sqlalchemy'

connect_db(app)
db.create_all()

app.config['SESSION_SQLALCHEMY'] = db
ses = Session(app)

ses.app.session_interface.db.create_all()
##################################### Users #################################

############################################################ get current user
@app.route("/logged-in-user", methods=["GET"])
def logged_in_user():
    """Returns current user"""
    if "username" in session:
        try:
            user = User.query.get_or_404(session["username"])
            return jsonify({'user': user.serialize()})
        except Exception as e:
            print('-------------------')
            print(e)
            print('-------------------')
    return jsonify({'message': 'Not logged in!'})


####################################################### register

@app.route("/register", methods=["POST"])
def register_user():
    """Makes a new user"""
    data = request.get_json()
    try:
        new_user = User.register(
                username=data['username'],
                password=data['password'],
                first_name=data['first_name'],
                last_name=data['last_name'],
                )
        session["username"] = data.get('username')
        session.modified = True
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        print('-------------------')
        print(e)
        print('-------------------')
        return jsonify({'message': 'Username already taken, please pick another one.'})
    return jsonify({'user': new_user.serialize()}), 201

####################################################### login

@app.route("/login", methods=["POST"])
def login_user():
    """Process the login form. if the user is authenticated goes to /users/<username>"""
    try:
        data = request.get_json()
        current_user = User.authenticate(data['username'], data['password'])
        if current_user:
            session["username"] = current_user.username
            session.modified = True
            return jsonify({'user': current_user.serialize()})
        else:
            return jsonify({'message': 'Invalid username or password, please try again.'})
    except Exception as e:
        print('-------------------')
        print(e)
        print('-------------------')
        return jsonify({'message':'Error!'})


####################################################### logout

@app.route("/logout", methods=["GET"])
def logout_user():
    """Logs out current user"""
    try:
        session.pop("username")
        session.modified = True
        return jsonify("logged out!")
    except Exception as e:
        print('-------------------')
        print(e)
        print('-------------------')
        return jsonify({'message':'Error!'})



####################################################### Get users

@app.route("/users", methods=["GET"])
def users_page():
    """gets all users"""
    users = User.query.all();
    return jsonify({'users':[user.serialize() for user in users]})


####################################################### Get user ################

@app.route("/users/<username>", methods=["GET"])
def get_user(username):
    """gets a user"""
    user = User.query.get_or_404(username)
    return jsonify({'user': user.serialize()})



####################################################### edit user

@app.route("/users/<username>", methods=["PATCH"])
def edit_user(username):
    """Edits a user"""
    if "username" in session and session["username"] == username:
        try:
            data = request.get_json()
            print('-------------------')
            print(data)
            print('-------------------')
            user = User.query.get_or_404(username)
            user.first_name = data.get('first_name',user.first_name)
            user.last_name = data.get('last_name',user.last_name)
            user.bio = data.get('bio',user.bio)

            db.session.add(user)
            db.session.commit()
            return jsonify({'user': user.serialize()})
        except Exception as e:
            print('-------------------')
            print(e)
            print('-------------------')
    return jsonify({'message':'Unauthorized!'}), 401


####################################################### change user password

@app.route("/users/<username>/change_password", methods=["PATCH"])
def change_password(username):
    """changes a user's password"""
    if "username" in session and session["username"] == username:
        try:
            data = request.get_json()
            user = User.authenticate(username, data['old_password'])
            if user:
                user = User.query.get_or_404(username)
                user.changePassword(data['password'])
                db.session.add(user)
                db.session.commit()
                return jsonify({'user': user.serialize()})
        except Exception as e:
            print('-------------------')
            print(e)
            print('-------------------')
    return jsonify({'message':'Unauthorized!'}), 401


####################################################### delete user ##############################

@app.route("/users/<username>/delete", methods=["POST"])
def delete_user(username):
    """Deletes user"""
    if "username" in session and session["username"] == username:
        try:
            data = request.get_json()
            current_user = User.authenticate(username, data['password'])
            if current_user:
                session.pop("username")
                db.session.delete(current_user)
                db.session.commit()
                return jsonify({'message':'Deleted!'})
        except Exception as e:
            print('-------------------')
            print(e)
            print('-------------------')
    return jsonify({'message':'Unauthorized!'}), 401


##################Images#######################
#
#
# @app.route("/users/<username>/image",methods =['GET'])
# def get_all_images(username):
#     """gets all images for a user """
#
#     if "username" in session and session["username"] == username:
#         images = Image.query.filter_by(username=username).all()
#         return jsonify(images)
#     return jsonify({message:'Unauthorized!'})
#
#
# @app.route("/users/<username>/image/<imageName>",methods =['GET'])
# def get_image(username,imageName):
#     """gets an image """
#     if "username" in session:
#         image = Image.query.get_or_404(imageName)
#         return jsonify(image)
#     return jsonify({message:'Unauthorized!'})
#
#
# @app.route("/users/<username>/image",methods =['POST']) ##################################################################redo
# def add_image(username):
#     """adds a new image"""
#
#     if "username" in session and session["username"] == username:
#         form = UploadImgForm()
#         current_user = User.query.get_or_404(username)
#         if form.validate_on_submit():
#             pic = request.files['image']
#
#
#             filename = secure_filename(pic.filename+'_'+str(uuid.uuid1()))
#             # pic.save(os.path.join(app.config['UPLOAD_FOLDER'], filename))
#             pic.save(f"static/images/{filename}.png")
#             # file_type = pic.mimetype
#             # new_img = Image(img=pic.read(),type=file_type,name=filename)
#             # db.session.add(new_img)
#             # current_user.profile_image = new_img.name
#             new_img = Image(name=filename,path=f"/static/images/{filename}.png")
#             db.session.add(new_img)
#             db.session.commit()
#
#             return jsonify({username: username, imageName: new_img.name})
#     return render_template('add_image_form.html',form=form,current_user=current_user)
#
#
# @app.route("/users/<username>/profile_img",methods =['POST'])
# def profile_image(username):
#     """adds or changes a users profile_img """
#
#     if "username" in session and session["username"] == username:
#         current_user = User.query.get_or_404(username)
#
#
#         current_user.profile_image = request.args.get('imageName',current_user.profile_image)
#         db.session.add(current_user)
#         db.session.commit()
#
#     return jsonify({message:'Unauthorized!'})
#
#
# @app.route("/image/<imageName>",methods =['DELETE'])
# def delete_image(imageName):
#     """deletes a page"""
#     if "username" in session:
#         image = Image.query.get_or_404(imageName)
#         if session["username"] == image.username:
#             Image.query.get_or_404(imageName).delete()
#             db.session.commit()
#             return jsonify({message:'Deleted!'})
#     return jsonify({message:'Unauthorized!'});
#
################Libraries###############


####################################################### get public libraries
@app.route("/libraries/public/<int:off_set>",methods =['GET'])
def get_public_libraries(off_set):
    """gets public libraries"""
    try:
        libraries = Library.query.filter(Library.id >= off_set, Library.id < off_set+20,Library.is_public==True).all()
        return jsonify({'libraries':[library.serialize() for library in libraries]})
    except Exception as e:
        print('-------------------')
        print(e)
        print('-------------------')
        return jsonify({'message':'Error!'})



####################################################### get all user libraries
@app.route("/users/<username>/libraries/",methods =['GET'])
def get_user_libraries(username):
    """gets all of the current users libraries or all the public libraries of another user"""
    # print('-------------------------user libraries')
    # print('session:',session)
    # print('session user:',session.get("username",'no user'))
    # print('username:',username)
    # # breakpoint()
    # print('-------------------------')
    libraries = []
    try:
        if "username" in session and session["username"] == username:
            libraries = Library.query.filter_by(username=username).all()
        else:
            libraries = Library.query.filter_by(username=username,is_public=True).all()
    except Exception as e:
        print('-------------------------user libraries error')
        print('error:',e)
        print('-------------------------')
    return jsonify({'libraries':[library.serialize() for library in libraries]})

####################################################### get library
@app.route("/libraries/<int:library_id>",methods =['GET'])
def get_library(library_id):
    """gets a library"""
    if "username" in session:
        try:
            library = Library.query.get_or_404(library_id)
            if session["username"] == library.username:
                return jsonify({'library': library.serialize()})
        except Exception as e:
            print('-------------------')
            print(e)
            print('-------------------')
    return jsonify({'message':'Unauthorized!'}), 401



####################################################### get all library books
@app.route("/libraries/<int:library_id>/books",methods =['GET'])
def get_library_books(library_id):
    """gets all of the books in a library"""
    library = Library.query.get_or_404(library_id)
    if "username" in session and (session["username"] == library.username or library.is_public):
        return jsonify({'books':[book.serialize() for book in library.books]})
    return jsonify({'message':'Unauthorized!'}), 401


####################################################### new library

@app.route("/users/<username>/libraries",methods =['POST'])
def add_library(username):
    """makes a new library"""
    if "username" in session and session["username"] == username:
        try:
            data = request.get_json()
            library = Library(name=data.get('name'),description=data.get('description'),is_public=data.get('is_public'),username=username);
            db.session.add(library)
            db.session.commit()
            return jsonify({'library':library.serialize()}), 201
        except Exception as e:
            print('-------------------')
            print(e)
            print('-------------------')
            return jsonify({'message':'Error!'})
    return jsonify({'message':'Unauthorized!'}), 401

####################################################### new library book

@app.route("/users/<username>/libraries/books",methods =['POST'])
def make_library_book(username):
    """adds a book to a library"""
    if "username" in session and session["username"] == username:
        try:
            data = request.get_json()
            libraries=data.get('libraries')
            books=data.get('books')
            for library_id in libraries:
                for book_id in books:
                    library_book = LibraryBook(book_id=book_id,library_id=library_id);
                    db.session.add(library_book)
            db.session.commit()
            return jsonify({'message':'Added to Library'}), 201
        except Exception as e:
            return jsonify({'message':'Already added to library!'})
    return jsonify({'message':'Unauthorized!'}), 401



####################################################### delete library book

@app.route("/libraries/<int:library_id>/books/<int:book_id>",methods =['DELETE'])
def delete_library_book(library_id,book_id):
    """deletes a book to a library"""
    if "username" in session:
        try:
            library = Library.query.get_or_404(library_id)
            if session["username"] == library.username:
                library_book = LibraryBook.query.filter_by(book_id=book_id,library_id=library_id).one();
                db.session.delete(library_book)
                db.session.commit()
                return jsonify({'message':'Deleted!'})

        except Exception as e:
            print('-------------------')
            print(e)
            print('-------------------')
    return jsonify({'message':'Unauthorized!'}), 401

####################################################### edit library

@app.route("/libraries/<int:library_id>",methods =['PATCH'])
def edit_library(library_id):
    """edits a book"""
    if "username" in session:
        try:
            library = Library.query.get_or_404(library_id)
            if session["username"] == library.username:
                data = request.get_json()
                library.name = data.get('name',library.name)
                library.description = data.get('description',library.description)
                library.is_public = data.get('is_public',library.is_public)
                db.session.add(library)
                db.session.commit()
                return jsonify({'library':library.serialize()})
        except Exception as e:
            print('-------------------')
            print(e)
            print('-------------------')
    return jsonify({'message':'Unauthorized!'}), 401


####################################################### delete library
@app.route("/libraries/<int:library_id>",methods =['DELETE'])
def delete_library(library_id):
    """deletes a library"""
    if "username" in session:
        try:
            library = Library.query.get_or_404(library_id)
            if session["username"] == library.username:
                 db.session.delete(library)
                 db.session.commit()
                 return jsonify({'message':'Deleted!'})
        except Exception as e:
            print('-------------------')
            print(e)
            print('-------------------')
    return jsonify({'message':'Unauthorized!'}), 401




################books###############

####################################################### get all public
@app.route("/books",methods =['GET'])
def get_all_books():
    """gets all public books"""
    try:
        books = Book.query.filter_by(is_public=True).all()
        return jsonify({'books':[book.serialize() for book in books]})
    except Exception as e:
        print('-------------------')
        print(e)
        print('-------------------')
        return jsonify({'message':'Error!'})



####################################################### get all user books
@app.route("/users/<username>/books",methods =['GET'])
def get_user_books(username):
    """gets all of a users books if the user is not the one signed in it gets all the public books from the user"""
    try:
        books = []
        if "username" in session and session["username"] == username:
            books = Book.query.filter_by(username=username).all()

        else:
            books = Book.query.filter_by(is_public=True,username=username).all()
        return jsonify({'books':[book.serialize() for book in books]})
    except Exception as e:
        print('-------------------')
        print(e)
        print('-------------------')
        return jsonify({'message':'Error!'})



####################################################### get
@app.route("/books/<int:book_id>",methods =['GET'])
def get_book(book_id):
    """gets a book"""
    if "username" in session:
        try:
            book = Book.query.get_or_404(book_id)
            if session["username"] == book.username or book.is_public:
                return jsonify({'book': book.serialize()})
        except Exception as e:
            print('-------------------')
            print(e)
            print('-------------------')
    return jsonify({'message':'Unauthorized!'}),401

####################################################### new book

@app.route("/users/<username>/books",methods =['POST'])
def make_book(username):
    """makes a new book"""
    if "username" in session and session["username"] == username:
        try:
            data = request.get_json()
            book = Book(username = username,title = data.get('title'),synopsys = data.get('synopsys'),text_color = data.get('text_color'),cover_color = data.get('cover_color'),theme = data.get('theme'),cover_image = data.get('cover_image'),is_public = data.get('is_public'))
            db.session.add(book)
            db.session.commit()
            return jsonify({'book':book.serialize()}), 201
        except Exception as e:
            print('-------------------------new book error------------')
            print(e)
            print('-------------------------')
            return jsonify({'message':'error'}),500
    return jsonify({'message':'Unauthorized!'}),401


####################################################### edit book

@app.route("/users/<username>/books/<int:book_id>",methods =['PATCH'])
def edit_book(username,book_id):
    """edits a book"""
    if "username" in session and session["username"] == username:
        try:
            data = request.get_json()
            book = Book.query.get_or_404(book_id);
            book.title = data.get('title',book.title)
            book.synopsys = data.get('synopsys',book.synopsys)
            book.text_color = data.get('text_color',book.text_color)
            book.cover_color = data.get('cover_color',book.cover_color)
            book.theme = data.get('theme',book.theme)
            book.cover_image = data.get('cover_image',book.cover_image)
            book.is_public = data.get('is_public',book.is_public)
            db.session.add(book)
            db.session.commit()
            return jsonify({'book':book.serialize()})
        except Exception as e:
            print('-------------------')
            print(e)
            print('-------------------')
    return jsonify({'message':'Unauthorized!'}), 401


####################################################### delete book
@app.route("/users/<username>/books/<int:book_id>",methods =['DELETE'])
def delete_book(username,book_id):
    """deletes a book"""
    if "username" in session and session["username"] == username:
        try:
            book = Book.query.get_or_404(book_id);
            db.session.delete(book)
            db.session.commit()
            return jsonify({'message':'Deleted!'})
        except Exception as e:
            print('-------------------')
            print(e)
            print('-------------------')
    return jsonify({'message':'Unauthorized!'}), 401

###############pages################


####################################################### get all pages for book
@app.route("/books/<int:book_id>/pages/all",methods =['GET'])
def get_book_pages(book_id):
    """gets all the ids and page numbers for the pages in a book"""
    if "username" in session:
        try:
            book = Book.query.get_or_404(book_id)
            if book.is_public or session["username"] == book.username:
                pages = Page.query.filter_by(book_id=book_id).order_by('page_num').all()
                return jsonify({'pages':[page.serialize() for page in pages]})
        except Exception as e:
            print('-------------------')
            print(e)
            print('-------------------')
    return jsonify({'message':'Unauthorized!'}), 401

####################################################### get page
@app.route("/books/<int:book_id>/pages/<int:page_num>",methods =['GET'])
def get_page(book_id,page_num):
    """ gets a page """
    if "username" in session:
        try:
            book = Book.query.get_or_404(book_id)
            if book.is_public or session["username"] == book.username:
                # page = Page.query.get_or_404(page_id)
                page = Page.query.filter_by(book_id=book_id,page_num=page_num).one();
                return jsonify({'page':page.serialize()})
        except Exception as e:
            print('-------------------------get page error------------')
            print(e)
            print('-------------------------')
            return jsonify({'message':'Page not found!'})
    return jsonify({'message':'Unauthorized!'}), 401

####################################################### get pages
@app.route("/books/<int:book_id>/pages",methods =['GET'])
def get_pages(book_id):
    """ gets a page """
    if "username" in session:
        try:
            book = Book.query.get_or_404(book_id)
            if book.is_public or session["username"] == book.username:
                page_nums = request.args.getlist('page_nums[]')
                num_of_pages = len(page_nums)
                pages =[]
                i=0
                while i < num_of_pages:
                    page = Page.query.filter_by(book_id=book_id,page_num=page_nums[i]).one();
                    pages.append(page)
                    i+=1
                return jsonify({'pages':[page.serialize() for page in pages]})
        except Exception as e:
            print('-------------------------get pages error------------')
            print(e)
            print('-------------------------')
        return jsonify({'message':'Page not found!'})
    return jsonify({'message':'Unauthorized!'}), 401


####################################################### new page

@app.route("/books/<int:book_id>/pages",methods =['POST'])
def add_page(book_id):
    """makes a new page"""
    if "username" in session:
        try:
            book = Book.query.get_or_404(book_id)
            if session["username"] == book.username:
                data = request.get_json()
                num_of_pages = data.get('num_of_pages')
                page_num = len(book.pages)+1
                pages =[]
                while num_of_pages > 0:
                    page = Page(page_num=page_num,book_id=book_id,text='',title='')
                    db.session.add(page)
                    pages.append(page)
                    page_num += 1
                    num_of_pages -= 1
                db.session.commit()
                return jsonify({'pages':[page.serialize() for page in pages]}), 201
        except Exception as e:
            print('-------------------')
            print(e)
            print('-------------------')
    return jsonify({'message':'Unauthorized!'}), 401



####################################################### edit page
@app.route("/books/<int:book_id>/pages/<int:page_num>",methods =['PATCH'])
def edit_page(book_id,page_num):
    """edits a book"""
    try:
        if "username" in session:
            book = Book.query.get_or_404(book_id);
            if session["username"] == book.username:
                data = request.get_json()
                page = Page.query.filter_by(book_id=book_id,page_num=page_num).one();
                # page = Page.query.get_or_404(page_id);
                page.title = data.get('title',page.title)
                page.text = data.get('text',page.text)
                page.image = data.get('image',page.image)
                db.session.add(page)
                db.session.commit()
                return jsonify({'page':page.serialize()})
    except Exception as e:
        print('-------------------------get pages error------------')
        print(e)
        print('-------------------------')
        return jsonify({'message':'Page not found!'})
    return jsonify({'message':'Unauthorized!'}), 401


####################################################### delete page
@app.route("/books/<int:book_id>/pages/<int:page_id>",methods =['DELETE'])
def delete_page(book_id,page_id):
    """deletes a page"""
    if "username" in session:
        try:
            book = Book.query.get_or_404(book_id);
            if session["username"] == book.username:
                Page.query.get_or_404(page_id).delete()
                db.session.commit()
                return jsonify({'message':'Deleted!'})
        except Exception as e:
            print('-------------------')
            print(e)
            print('-------------------')
    return jsonify({'message':'Unauthorized!'}), 401



#############notes##################


####################################################### get all notes for a book
@app.route("/books/<int:book_id>/notes",methods =['GET'])
def get_book_notes(book_id):
    """gets all the ids and page numbers for the pages in a book"""
    if "username" in session:
        try:
            notes = Note.query.filter_by(book_id=book_id).order_by('order').all()
            if session["username"] == notes[0].book.username:
                return jsonify({'notes':[note.serialize() for note in notes]})
        except Exception as e:
            print('-------------------')
            print(e)
            print('-------------------')
    return jsonify({'message':'Unauthorized!'}), 401

####################################################### get note
@app.route("/notes/<int:note_id>",methods =['GET'])
def get_notes(note_id):
    """ gets a page """
    if "username" in session:
        try:
            note = Note.query.get_or_404(note_id)
            if session["username"] == note.book.username:
                return jsonify({'note':note.serialize()});
        except Exception as e:
            print('-------------------')
            print(e)
            print('-------------------')
    return jsonify({'message':'Unauthorized!'}), 401


####################################################### new note

@app.route("/books/<int:book_id>/notes",methods =['POST'])
def new_note(book_id):
    """makes a new page"""
    book = Book.query.get_or_404(book_id)
    if "username" in session and session["username"] == book.username:
        try:
            data = request.get_json()
            note = Note(book_id=book_id,title=data.get('title'),text=data.get('text'),order=data.get('order'))
            db.session.add(note)
            db.session.commit()
            return jsonify({'note':note.serialize()}), 201
        except Exception as e:
            print('-------------------')
            print(e)
            print('-------------------')
    return jsonify({'message':'Unauthorized!'}), 401



####################################################### edit note
@app.route("/notes/<int:note_id>",methods =['PATCH'])
def edit_note(note_id):
    """edits a note"""
    if "username" in session:
        try:
            note = Note.query.get_or_404(note_id)
            if session["username"] == note.book.username:
                data = request.get_json()
                note.title = data.get('title',note.title)
                note.text = data.get('text',note.text)
                # note.image = data.get('image',note.image)
                note.order = data.get('order',note.order)
                db.session.add(note)
                db.session.commit()
                return jsonify({'note':note.serialize()})
        except Exception as e:
            print('-------------------')
            print(e)
            print('-------------------')
    return jsonify({'message':'Unauthorized!'}), 401

####################################################### switch order note
@app.route("/notes/<int:note_id>/<int:other_note_id>",methods =['PATCH'])
def switch_note_order(note_id,other_note_id):
    """edits a book"""
    if "username" in session:
        try:
            note = Note.query.get_or_404(note_id)
            if session["username"] == note.book.username:
                other_note = Page.query.get_or_404(other_note_id)
                temp_order = note.order
                note.order = other_note.order
                other_note.order = temp_order
                db.session.add(other_note)
                db.session.add(note)
                db.session.commit()
                return jsonify({'note':note.serialize()})

        except Exception as e:
            print('-------------------')
            print(e)
            print('-------------------')
    return jsonify({'message':'Unauthorized!'}), 401

####################################################### delete note
@app.route("/books/<int:book_id>/notes/<int:note_id>",methods =['DELETE'])
def delete_note(book_id,note_id):
    """deletes a note"""
    if "username" in session:
        try:
            book = Book.query.get_or_404(book_id);
            if session["username"] == book.username:
                note = Note.query.get_or_404(note_id)
                db.session.delete(note)
                db.session.commit()
                return jsonify({'message':'Deleted!'})
        except Exception as e:
            print('-------------------')
            print(e)
            print('-------------------')
    return jsonify({'message':'Unauthorized!'}), 401




############characters#############


####################################################### get all characters for book
@app.route("/books/<int:book_id>/characters",methods =['GET'])
def get_book_characters(book_id):
    """gets all the characters for a book"""
    if "username" in session:
        try:
            book = Book.query.get_or_404(book_id)
            if session["username"] == book.username:
                return jsonify({'characters':[character.serialize() for character in book.characters]})
        except Exception as e:
            print('-------------------')
            print(e)
            print('-------------------')
    return jsonify({'characters':[character.serialize() for character in book.characters if character.is_public]})


####################################################### get all characters for user
# @app.route("/user/<username>/characters",methods =['GET'])
# def get_user_characters(username):
#     """gets all the characters for a book"""
#     if "username" in session and session["username"] == username:
#         try:
#             # characters = db.session.query(Character,Book).join(Book).filter(Book.username==username).all()
#             characters = Book.query.filter(Book.username==username).join(Character).all()
#
#          # books = Book.query.filter(Book.username==username).all()
#          # characters = [char for char inbook.characters for book in books]
#             return jsonify({'characters':[character.serialize() for character in characters]})
#         except Exception as e:
#             print('-------------------')
#             print(e)
#             print('-------------------')
#     return jsonify({'message':'Unauthorized!'}), 401
#     # return jsonify({'characters':[character.serialize() for character in characters if character.is_public]})
#

####################################################### get character
@app.route("/books/<int:book_id>/characters/<int:character_id>",methods =['GET'])
def get_characters(book_id,character_id):
    """ gets a character """
    if "username" in session:
        try:
            book = Book.query.get_or_404(book_id)
            character = Character.query.get_or_404(character_id)
            if character.is_public or session["username"] == book.username:
                return jsonify({'character':character.serialize()});
        except Exception as e:
            print('-------------------')
            print(e)
            print('-------------------')
    return jsonify({'message':'Unauthorized!'}), 401


####################################################### new character

@app.route("/books/<int:book_id>/characters",methods =['POST'])
def new_character(book_id):
    """makes a new character"""
    book = Book.query.get_or_404(book_id)
    if "username" in session and session["username"] == book.username:
        try:
            data = request.get_json()
            character = Character(name=data.get('name'),birthday=data.get('birthday'),description=data.get('description'),extra_info=data.get('extra_info'),story=data.get('story'))
            db.session.add(character)
            db.session.commit()
            book_character = BookCharacter(book_id=book_id,character_id=character.id)
            db.session.add(book_character)
            db.session.commit()
            return jsonify({'character':character.serialize()}), 201
        except Exception as e:
            print('-------------------')
            print(e)
            print('-------------------')
    return jsonify({'message':'Unauthorized!'}), 401

####################################################### new book character

@app.route("/books/<int:book_id>/characters/<int:character_id>",methods =['POST'])
def new_book_character(book_id,character_id):
    """ adds a character to a book"""
    book = Book.query.get_or_404(book_id)
    if "username" in session and session["username"] == book.username:
        try:
            data = request.get_json()
            book_character = BookCharacter(book_id=book_id,character_id=character_id)
            db.session.add(book_character)
            db.session.commit()
            return jsonify({'message':'Added'}), 201
        except Exception as e:
            print('-------------------')
            print(e)
            print('-------------------')
    return jsonify({'message':'Unauthorized!'}), 401


####################################################### edit character
@app.route("/books/<int:book_id>/characters/<int:character_id>",methods =['PATCH'])
def edit_character(book_id,character_id):
    """edits a character"""
    if "username" in session:
        try:
            book = Book.query.get_or_404(book_id);
            if session["username"] == book.username:
                data = request.get_json()
                character = Character.query.get_or_404(character_id);
                character.name = data.get('name',character.name)
                character.birthday = data.get('birthday',character.birthday)
                character.description = data.get('description',character.description)
                character.extra_info = data.get('extra_info',character.extra_info)
                character.story = data.get('story',character.story)
                character.image = data.get('image',character.image)
                character.is_public = data.get('is_public',character.is_public)
                db.session.add(character)
                db.session.commit()
                return jsonify({'character':character.serialize()})
        except Exception as e:
            print('-------------------')
            print(e)
            print('-------------------')
    return jsonify({'message':'Unauthorized!'}), 401


####################################################### delete character
@app.route("/books/<int:book_id>/characters/<int:character_id>",methods =['DELETE'])
def delete_character(book_id,character_id):
    """deletes a character"""
    if "username" in session:
        try:
            book = Book.query.get_or_404(book_id);
            if session["username"] == book.username:
                char = Character.query.get_or_404(character_id)
                db.session.delete(char)
                db.session.commit()
                return jsonify({'message':'Deleted!'})

        except Exception as e:
            print('-------------------')
            print(e)
            print('-------------------')
    return jsonify({'message':'Unauthorized!'}), 401


 ############bookmarks################


####################################################### get all bookmarks for book
@app.route("/bookmarks/<int:book_id>",methods =['GET'])
def get_bookmarks(book_id):
    """gets all bookmarks for a book"""
    if "username" in session:
        try:
            book = Book.query.get_or_404(book_id)
            if session["username"] == book.username:
                bookmarks =BookMark.query.filter_by(book_id=book_id).all()
                return jsonify({'bookmarks':[bookmark.serialize() for bookmark in bookmarks]})
        except Exception as e:
            print('-------------------')
            print(e)
            print('-------------------')
    return jsonify({'message':'Unauthorized!'}), 401

####################################################### get bookmark
@app.route("/bookmarks/<int:book_id>/<int:page_id>",methods =['GET'])
def get_bookmark(book_id,page_id):
    """ gets a bookmark """
    if "username" in session:
        try:
            book = Book.query.get_or_404(book_id)
            if book.is_public or session["username"] == book.username:
                bookmark = BookMark.query.filter_by(book_id=book_id,page_id=page_id).one()
                return jsonify({'bookmark':bookmark.serialize()});
        except Exception as e:
            print('-------------------')
            print(e)
            print('-------------------')
    return jsonify({'message':'Unauthorized!'}), 401


####################################################### new bookmark

@app.route("/bookmarks/<int:book_id>/<int:page_id>",methods =['POST'])
def add_bookmark(book_id,page_id):
    """makes a new bookmark"""
    book = Book.query.get_or_404(book_id)
    if "username" in session and session["username"] == book.username:
        try:
            data = request.get_json()
            bookmark = BookMark(book_id=book_id,page_id=page_id,text=data.get('text'))
            db.session.add(bookmark)
            db.session.commit()
            return jsonify({'bookmark':bookmark.serialize()}), 201
        except Exception as e:
            print('-------------------')
            print(e)
            print('-------------------')
    return jsonify({'message':'Unauthorized!'}), 401



####################################################### edit bookmark
@app.route("/bookmarks/<int:book_id>/<int:page_id>",methods =['PATCH'])
def edit_bookmark(book_id,page_id):
    """edits a bookmark"""
    if "username" in session:
        try:
            book = Book.query.get_or_404(book_id);
            if session["username"] == book.username:
                data = request.get_json()
                bookmark = BookMark.query.filter_by(book_id=book_id,page_id=page_id).one()
                bookmark.text = data.get('text',bookmark.text)
                db.session.add(bookmark)
                db.session.commit()
                return jsonify({'bookmark':bookmark.serialize()})

        except Exception as e:
            print('-------------------')
            print(e)
            print('-------------------')
    return jsonify({'message':'Unauthorized!'}), 401


####################################################### delete bookmark
@app.route("/bookmarks/<int:book_id>/<int:page_id>",methods =['DELETE'])
def delete_bookmark(book_id,page_id):
    """deletes a bookmark"""
    if "username" in session:
        try:
            book = Book.query.get_or_404(book_id);
            if session["username"] == book.username:
                BookMark.query.filter_by(book_id=book_id,page_id=page_id).delete()
                db.session.commit()
                return jsonify({'message':'Deleted!'})
        except Exception as e:
            print('-------------------')
            print(e)
            print('-------------------')
    return jsonify({'message':'Unauthorized!'}), 401


#############places#################


####################################################### get all places for book
@app.route("/books/<int:book_id>/places",methods =['GET'])
def get_book_place(book_id):
    """gets all the places for a book"""
    if "username" in session:
        try:
            book = Book.query.get_or_404(book_id)
            if session["username"] == book.username:
                return jsonify({'places':[place.serialize() for place in  book.places]})
        except Exception as e:
            print('-------------------')
            print(e)
            print('-------------------')
    return jsonify({'message':'Unauthorized!'}), 401

####################################################### get place
@app.route("/books/<int:book_id>/places/<int:place_id>",methods =['GET'])
def get_place(book_id,place_id):
    """ gets a place """
    if "username" in session:
        try:
            book = Book.query.get_or_404(book_id)
            place = Place.query.get_or_404(place_id)
            if place.is_public or session["username"] == book.username:
                return jsonify({'place':place.serialize()});

        except Exception as e:
            print('-------------------')
            print(e)
            print('-------------------')
    return jsonify({'message':'Unauthorized!'}), 401


####################################################### new place

@app.route("/books/<int:book_id>/places",methods =['POST'])
def new_place(book_id):
    """makes a new place"""
    book = Book.query.get_or_404(book_id)
    if "username" in session and session["username"] == book.username:
        try:
                data = request.get_json()
                place =Place(name=data['name'],description=data['description'],extra_info=data['extra_info'],is_public=data['is_public'])
                db.session.add(place)
                db.session.commit()
                book_place = BookPlace(book_id=book_id,place_id=place.id)
                db.session.add(book_place)
                db.session.commit()
                return jsonify({'place':place.serialize()}), 201
        except Exception as e:
            print('-------------------')
            print(e)
            print('-------------------')
    return jsonify({'message':'Unauthorized!'}), 401

####################################################### new book place

@app.route("/books/<int:book_id>/places/<int:place_id>",methods =['POST'])
def new_book_place(book_id,place_id):
    """ adds a place to a book"""
    book = Book.query.get_or_404(book_id)
    if "username" in session and session["username"] == book.username:
        try:
                data = request.get_json()
                book_character = BookPlace(book_id=book_id,place_id=place_id)
                db.session.add(book_place)
                db.session.commit()
                return jsonify({'message':'Added!'}), 201
        except Exception as e:
            print('-------------------')
            print(e)
            print('-------------------')
    return jsonify({'message':'Unauthorized!'}), 401


####################################################### edit place
@app.route("/books/<int:book_id>/places/<int:place_id>",methods =['PATCH'])
def edit_place(book_id,place_id):
    """edits a place"""
    if "username" in session:
        try:
            book = Book.query.get_or_404(book_id);
            if session["username"] == book.username:
                data = request.get_json()
                place = Place.query.get_or_404(place_id);
                place.name = data.get('name',place.name)
                place.description = data.get('description',place.description)
                place.extra_info = data.get('extra_info',place.extra_info)
                place.is_public = data.get('is_public',place.is_public)
                place.image = data.get('image',place.image)
                db.session.add(place)
                db.session.commit()
                return jsonify({'place':place.serialize()})
        except Exception as e:
            print('-------------------')
            print(e)
            print('-------------------')
    return jsonify({'message':'Unauthorized!'}), 401


####################################################### delete place
@app.route("/books/<int:book_id>/places/<int:place_id>",methods =['DELETE'])
def delete_place(book_id,place_id):
    """deletes a place"""
    if "username" in session:
        try:
            book = Book.query.get_or_404(book_id);
            if session["username"] == book.username:
                place = Place.query.get_or_404(place_id)
                db.session.delete(place)
                db.session.commit()
                return jsonify({'message':'Deleted!'})
        except Exception as e:
            print('-------------------')
            print(e)
            print('-------------------')
    return jsonify({'message':'Unauthorized!'}), 401

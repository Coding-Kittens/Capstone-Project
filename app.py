
from flask import Flask, redirect, render_template, request,flash,session ,jsonify, g
from models import Image,User,Library,Book,Page,Note,Character,Place,BookMark,BookPlace,BookCharacter,LibraryBook,connect_db,db
from werkzeug.utils import secure_filename
from flask_cors import CORS,cross_origin
import uuid as uuid
import base64
import os

app = Flask(__name__,static_folder='build',static_url_path='')
CORS(app)
@cross_origin()

def serve():
    return send_from_directory(app.static_folder,'index.html')

app.config["SQLALCHEMY_DATABASE_URI"] = os.environ.get('DATABASE_URL',"postgresql/library_db").replace("postgresql", "postgresql://", 1)
app.config["SQLALCHEMY_TRACK_MODIFICATIONS"] = False
app.config["SQLALCHEMY_ECHO"] = True
app.config["SECRET_KEY"] = "catsarethebest"


#
# UPLOAD_FOLDER = 'static/images/'
# app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

connect_db(app)
db.create_all()


##################################### Users #################################

############################################################ get current user
@app.route("/logged-in-user", methods=["GET"])
def logged_in_user():
    """Returns current user"""
    if "username" in session:
        user = User.query.get_or_404(session["username"])
        # image = None
        # if user.profile_image:
        #     image = user.pic.img
        current_user = {
        'username': user.username,
        'is_pro_user': user.is_pro_user,
        'first_name': user.first_name,
        'last_name': user.last_name,
        }
        return jsonify(current_user)

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
                is_pro_user=data['is_pro_user'],
                first_name=data['first_name'],
                last_name=data['last_name'],
                )
        session["username"] = new_user.username
        db.session.add(new_user)
        db.session.commit()
    except Exception as e:
        return jsonify({'Error': e})
    return jsonify({'username': new_user.username,'is_pro_user':new_user.is_pro_user,'first_name':new_user.first_name,'last_name':new_user.last_name});

####################################################### login

# @app.route("/logged-in-user", methods=["GET"])
# def logged_in_user():
#     if "username" in session:
#         return jsonify({'username': session["username"]})
#     return jsonify({'message': 'Unauthorized'})



@app.route("/login", methods=["POST"])
def login_user():
    """Process the login form. if the user is authenticated goes to /users/<username>"""
    data = request.get_json()
    current_user = User.authenticate(data['username'], data['password'])
    if current_user:
        session["username"] = current_user.username
        return jsonify({'username': current_user.username,'is_pro_user':current_user.is_pro_user,'first_name':current_user.first_name,'last_name':current_user.last_name})
    else:
        return jsonify({'message': 'Invalid username or password, please try again.'})


####################################################### logout

@app.route("/logout", methods=["GET"])
def logout_user():
    """Logs out current user"""
    session.pop("username")
    return jsonify("logged out!")

####################################################### Get all users-- temp

@app.route("/users", methods=["GET"])
def users_page():
    """Shows all users for testing"""
    res = User.query.all();

    users = [ {
    'username': u.username,
    'is_pro_user': u.is_pro_user,
    'first_name':u.first_name,
    'last_name':u.last_name,
    } for u in res]

    return jsonify(users)


####################################################### Get user ################

@app.route("/users/<username>", methods=["GET"])
def get_user(username):
    """Shows the user page to logged in users"""
    if "username" in session and session["username"] == username:
        current_user = User.query.get_or_404(username)
        return jsonify({current_user})
    return jsonify({'message':'Unauthorized!'})

####################################################### delete user ##############################

@app.route("/users/<username>/delete", methods=["POST"])
def delete_user(username):
    """Deletes user"""
    if "username" in session and session["username"] == username:
        current_user = User.query.get_or_404(username)
        session.pop("username")
        current_user.feedback = []
        User.query.filter_by(username=username).delete()
        db.session.commit()
        return jsonify({'message':"Deleted User"})
    return jsonify({'message':'Unauthorized!'})


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
    """gets 20 public libraries"""
    libraries = Library.query.filter_by(id >= off_set, id < off_set+20).all()
    return jsonify([library.serialize() for library in libraries])


####################################################### get all user libraries
@app.route("/users/<username>/libraries/",methods =['GET'])
def get_user_libraries(username):
    """gets all of the current users libraries or all the public libraries of another user"""
    if "username" in session and session["username"] == username:
        libraries = Library.query.filter_by(username=username).all()
    else:
        libraries = Library.query.filter_by(username=username,is_public=True).all()
    return jsonify([library.serialize() for library in libraries])

####################################################### get library
@app.route("/libraries/<int:library_id>",methods =['GET'])
def get_library(library_id):
    """gets a library"""
    if "username" in session:
        library = Library.query.get_or_404(library_id)
        if session["username"] == library.username:
            return jsonify({'library': library.serialize()})
    return jsonify({'message':'Unauthorized!'})



####################################################### get all library books
@app.route("/libraries/<int:library_id>/books",methods =['GET'])
def get_library_books(library_id):
    """gets all of the books in a library"""
    library = Library.query.get_or_404(library_id)
    if "username" in session and (session["username"] == library.username or library.is_public):
        return jsonify({'books':[book.serialize() for book in library.books]})
    return jsonify({'message':'Unauthorized!'})


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
            return jsonify(library.serialize())
        except Exception as e:
            return jsonify({'Error':e})
    return jsonify({'message':'Unauthorized!'})

####################################################### new library book

@app.route("/books/<int:book_id>/libraries/<int:library_id>",methods =['POST'])
def make_library_book(book_id,library_id):
    """adds a book to a library"""
    if "username" in session:
        library = Library.query.get_or_404(library_id)
        if session["username"] == library.username:
            data = request.get_json()
            library_book = LibraryBook(book_id=book_id,library_id=library_id);
            db.session.add(library_book)
            db.session.commit()
            return jsonify({'message':'Added book to library'}), 201
    return jsonify({'message':'Unauthorized!'}), 401


####################################################### edit library

@app.route("/libraries/<int:library_id>",methods =['PATCH'])
def edit_library(library_id):
    """edits a book"""
    if "username" in session:
        library = Library.query.get_or_404(library_id)
        if session["username"] == library.username:
            data = request.get_json()
            library.name = data.get('name',library.name)
            library.description = data.get('description',library.description)
            library.is_public = data.get('is_public',library.is_public)
            db.session.add(library)
            db.session.commit()
            return jsonify(library.serialize()), 201
    return jsonify({'message':'Unauthorized!'}), 401


####################################################### delete library
@app.route("/libraries/<int:library_id>",methods =['DELETE'])
def delete_library(library_id):
    """deletes a library"""
    if "username" in session and session["username"] == username:
        Library.query.get_or_404(library_id).delete()
        db.session.commit()
        return jsonify({'message':'Deleted!'})
    return jsonify({'message':'Unauthorized!'})




################books###############

####################################################### get all public
@app.route("/books",methods =['GET'])
def get_all_books():
    """gets all public books"""
    books = Book.query.filter_by(is_public=true).all()
    return jsonify([book.serialize() for book in books])


####################################################### get all user books
@app.route("/users/<username>/books",methods =['GET'])
def get_user_books(username):
    """gets all of the current users books"""
    if "username" in session and session["username"] == username:
        books = Book.query.filter_by(username=username).all()
        return jsonify([book.serialize() for book in books])
    return jsonify({'message':'Unauthorized!'})



####################################################### get
@app.route("/users/<username>/books/<int:book_id>",methods =['GET'])
def get_book(username,book_id):
    """gets a book"""
    if "username" in session and session["username"] == username:
        book = Book.query.get_or_404(book_id)
        return jsonify(book.serialize())
    return jsonify({'message':'Unauthorized!'}),401

####################################################### new book

@app.route("/users/<username>/books/create",methods =['POST'])
def make_book(username):
    """makes a new book"""
    if "username" in session and session["username"] == username:
        try:
            data = request.get_json()
            book = Book(username = username,title = data.get('title'),synopsys = data.get('synopsys'),text_color = data.get('text_color'),cover_color = data.get('cover_color'),theme = data.get('theme'),cover_image = data.get('cover_image'),is_public = data.get('is_public'))

            db.session.add(book)
            db.session.commit()
            return jsonify(book.serialize())
        except Exception as e:
            return jsonify({'Error':e}),500
    return jsonify({'message':'Unauthorized!'}),401


####################################################### edit book

@app.route("/users/<username>/books/<int:book_id>",methods =['PATCH'])
def edit_book(username,book_id):
    """edits a book"""
    if "username" in session and session["username"] == username:
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
        return jsonify(book.serialize())
    return jsonify({'message':'Unauthorized!'})


####################################################### delete book
@app.route("/users/<username>/books/<int:book_id>",methods =['DELETE'])
def delete_book(username,book_id):
    """deletes a book"""
    if "username" in session and session["username"] == username:
        Book.query.get_or_404(book_id).delete()
        db.session.commit()
        return jsonify({'message':'Deleted!'})
    return jsonify({'message':'Unauthorized!'})

###############pages################


####################################################### get all pages for book
@app.route("/books/<int:book_id>/pages",methods =['GET'])
def get_book_pages(book_id):
    """gets all the ids and page numbers for the pages in a book"""
    if "username" in session:
        book = Book.query.get_or_404(book_id)
        if book.is_public or session["username"] == book.username:
            pages = Page.query.filter_by(book_id=book_id).order_by('page_num').all()
            return jsonify([page.serialize() for page in pages])
    return jsonify({'message':'Unauthorized!'}), 401

####################################################### get page
@app.route("/books/<int:book_id>/pages/<int:page_id>",methods =['GET'])
def get_pages(book_id,page_id):
    """ gets a page """
    if "username" in session:
        book = Book.query.get_or_404(book_id)
        if book.is_public or session["username"] == book.username:
            page = Page.query.get_or_404(page_id)
            return jsonify(page.serialize())
    return jsonify({'message':'Unauthorized!'}), 401


####################################################### new page

@app.route("/books/<int:book_id>/pages",methods =['POST'])
def add_page(book_id):
    """makes a new page"""
    if "username" in session:
        book = Book.query.get_or_404(book_id)
        if session["username"] == book.username:
            data = request.get_json()
            num_of_pages = data.get('num_of_pages')
            page_num =data.get('page_num')
            pages =[]
            while num_of_pages > 0:
                page = Page(page_num=page_num,book_id=book_id)
                db.session.add(page)
                pages.append(page.serialize())
                page_num += 1
                num_of_pages -= 1
            db.session.commit()
            return jsonify(pages), 201
    return jsonify({'message':'Unauthorized!'}), 401



####################################################### edit page
@app.route("/books/<int:book_id>/pages/<int:page_id>",methods =['PATCH'])
def edit_page(book_id,page_id):
    """edits a book"""

    if "username" in session:
        book = Book.query.get_or_404(book_id);
        if session["username"] == book.username:
            data = request.get_json()
            page = Page.query.get_or_404(page_id);
            page.title = data.get('title',page.title)
            page.text = data.get('text',page.text)
            page.image = data.get('image',page.image)
            db.session.add(page)
            db.session.commit()
            return jsonify(page.serialize()), 201
    return jsonify({'message':'Unauthorized!'}), 401


####################################################### delete page
@app.route("/books/<int:book_id>/pages/<int:page_id>",methods =['DELETE'])
def delete_page(book_id,page_id):
    """deletes a page"""

    if "username" in session:
        book = Book.query.get_or_404(book_id);
        if session["username"] == book.username:
            Page.query.get_or_404(page_id).delete()
            db.session.commit()
            return jsonify({'message':'Deleted!'})
    return jsonify({'message':'Unauthorized!'}), 401



#############notes##################


####################################################### get all notes for a book
@app.route("/books/<int:book_id>/notes",methods =['GET'])
def get_book_notes(book_id):
    """gets all the ids and page numbers for the pages in a book"""
    if "username" in session:
        notes = Note.query.filter_by(book_id=book_id).all()
        if session["username"] == notes[0].book.username:
            return jsonify([note.serialize() for note in notes])
    return jsonify({'message':'Unauthorized!'})

####################################################### get note
@app.route("/notes/<int:note_id>",methods =['GET'])
def get_notes(note_id):
    """ gets a page """
    if "username" in session:
        note = Note.query.get_or_404(note_id)
        if session["username"] == note.book.username:
            return jsonify(note.serialize());
    return jsonify({'message':'Unauthorized!'})


####################################################### new note

@app.route("/books/<int:book_id>/notes",methods =['POST'])
def new_note(book_id):
    """makes a new page"""
    book = Book.query.get_or_404(book_id)
    if "username" in session and session["username"] == book.username:
        data = request.get_json()
        note = Note(book_id=book_id,*data)
        db.session.add(note)
        db.session.commit()
        return jsonify(note.serialize())
    return jsonify({'message':'Unauthorized!'})



####################################################### edit note
@app.route("/notes/<int:note_id>",methods =['PATCH'])
def edit_note(book_id,note_id):
    """edits a book"""

    if "username" in session:
        note = Page.query.get_or_404(note_id)
        if session["username"] == note.book.username:
            data = request.get_json()
            note.title = data.get('title',note.title)
            note.text = data.get('text',note.text)
            # note.image = data.get('image',note.image)
            note.order = data.get('order',note.order)
            db.session.add(note)
            db.session.commit()
            return jsonify(note.serialize())
    return jsonify({'message':'Unauthorized!'})

####################################################### switch order note
@app.route("/notes/<int:note_id>/<int:other_note_id>",methods =['PATCH'])
def switch_note_order(note_id,other_note_id):
    """edits a book"""

    if "username" in session:
        note = Page.query.get_or_404(note_id)
        if session["username"] == note.book.username:
            other_note = Page.query.get_or_404(other_note_id)
            temp_order = note.order
            note.order = other_note.order
            other_note.order = temp_order
            db.session.add(other_note)
            db.session.add(note)
            db.session.commit()
            return jsonify(note.serialize())
    return jsonify({'message':'Unauthorized!'})

####################################################### delete page
@app.route("/books/<int:book_id>/notes/<int:note_id>",methods =['DELETE'])
def delete_note(book_id,note_id):
    """deletes a page"""

    if "username" in session:
        book = Book.query.get_or_404(book_id);
        if session["username"] == book.username:
            Note.query.get_or_404(note_id).delete()
            db.session.commit()
            return jsonify({'message':'Deleted!'})
    return jsonify({'message':'Unauthorized!'})




############characters#############


####################################################### get all characters for book
@app.route("/books/<int:book_id>/characters",methods =['GET'])
def get_book_characters(book_id):
    """gets all the characters for a book"""
    if "username" in session:
        book = Book.query.get_or_404(book_id)
        if session["username"] == book.username:
            return jsonify([character.serialize() for character in book.characters])
    return jsonify({'message':'Unauthorized!'})

####################################################### get character
@app.route("/books/<int:book_id>/characters/<int:character_id>",methods =['GET'])
def get_characters(book_id,character_id):
    """ gets a character """
    if "username" in session:
        book = Book.query.get_or_404(book_id)
        character = Character.query.get_or_404(character_id)
        if character.is_public or session["username"] == book.username:
            return jsonify(character.serialize());
    return jsonify({'message':'Unauthorized!'})


####################################################### new character

@app.route("/books/<int:book_id>/characters",methods =['POST'])
def new_character(book_id):
    """makes a new character"""
    book = Book.query.get_or_404(book_id)
    if "username" in session and session["username"] == book.username:
        data = request.get_json()
        character = Character(*data)
        book_character = BookCharacter(book_id=book_id,character_id=character.id)
        db.session.add(character)
        db.session.add(book_character)
        db.session.commit()
        return jsonify(character.serialize())
    return jsonify({'message':'Unauthorized!'})

####################################################### new book character

@app.route("/books/<int:book_id>/characters/<int:character_id>",methods =['POST'])
def new_book_character(book_id,character_id):
    """ adds a character to a book"""
    book = Book.query.get_or_404(book_id)
    if "username" in session and session["username"] == book.username:
        data = request.get_json()
        book_character = BookCharacter(book_id=book_id,character_id=character_id)
        db.session.add(book_character)
        db.session.commit()
        return jsonify({'message':'Added'})
    return jsonify({'message':'Unauthorized!'})


####################################################### edit character
@app.route("/books/<int:book_id>/characters/<int:character_id>",methods =['PATCH'])
def edit_character(book_id,character_id):
    """edits a character"""

    if "username" in session:
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
            return jsonify(character.serialize())
    return jsonify({'message':'Unauthorized!'})


####################################################### delete character
@app.route("/books/<int:book_id>/characters/<int:character_id>",methods =['DELETE'])
def delete_character(book_id,character_id):
    """deletes a character"""
    if "username" in session:
        book = Book.query.get_or_404(book_id);
        if session["username"] == book.username:
            Character.query.get_or_404(character_id).delete()
            db.session.commit()
            return jsonify({'message':'Deleted!'})
    return jsonify({'message':'Unauthorized!'});


 ############bookmarks################


####################################################### get all bookmarks for book
@app.route("/bookmarks/<int:book_id>",methods =['GET'])
def get_bookmarks(book_id):
    """gets all bookmarks for a book"""
    if "username" in session:
        book = Book.query.get_or_404(book_id)
        if session["username"] == book.username:
            return jsonify([bookmark.serialize() for bookmark in  book.bookmarks])
    return jsonify({'message':'Unauthorized!'})

####################################################### get bookmark
@app.route("/bookmarks/<int:book_id>/<int:page_id>",methods =['GET'])
def get_bookmark(book_id,page_id):
    """ gets a bookmark """
    if "username" in session:
        book = Book.query.get_or_404(book_id)
        if book.is_public or session["username"] == book.username:
            bookmark = Bookmark.query.filter_by(book_id=book_id,page_id=page_id).one()
            return jsonify(bookmark.serialize());
    return jsonify({'message':'Unauthorized!'})


####################################################### new bookmark

@app.route("/bookmarks/<int:book_id>/<int:page_id>",methods =['POST'])
def add_bookmark(book_id):
    """makes a new bookmark"""
    book = Book.query.get_or_404(book_id)
    if "username" in session and session["username"] == book.username:
        data = request.get_json()
        bookmark = Bookmark(book_id=book_id,page_id=page_id,text=data.get('text'))
        db.session.add(bookmark)
        db.session.commit()
        return jsonify(bookmark.serialize())
    return jsonify({'message':'Unauthorized!'})



####################################################### edit page
@app.route("/bookmarks/<int:book_id>/<int:page_id>",methods =['PATCH'])
def edit_bookmark(book_id,page_id):
    """edits a bookmark"""

    if "username" in session:
        book = Book.query.get_or_404(book_id);
        if session["username"] == book.username:
            data = request.get_json()
            bookmark = Bookmark.query.filter_by(book_id=book_id,page_id=page_id).one()
            bookmark.text = data.get('text',bookmark.text)
            db.session.add(bookmark)
            db.session.commit()
            return jsonify(bookmark.serialize())
    return jsonify({'message':'Unauthorized!'})


####################################################### delete page
@app.route("/bookmarks/<int:book_id>/<int:page_id>",methods =['DELETE'])
def delete_bookmark(book_id,page_id):
    """deletes a bookmark"""

    if "username" in session:
        book = Book.query.get_or_404(book_id);
        if session["username"] == book.username:
            Bookmark.query.filter_by(book_id=book_id,page_id=page_id).delete()
            db.session.commit()
            return jsonify({'message':'Deleted!'})
    return jsonify({'message':'Unauthorized!'});


#############places#################


####################################################### get all places for book
@app.route("/books/<int:book_id>/places",methods =['GET'])
def get_book_place(book_id):
    """gets all the places for a book"""
    if "username" in session:
        book = Book.query.get_or_404(book_id)
        if session["username"] == book.username:
            return jsonify([place.serialize() for place in  book.places])
    return jsonify({'message':'Unauthorized!'})

####################################################### get place
@app.route("/books/<int:book_id>/places/<int:place_id>",methods =['GET'])
def get_place(book_id,place_id):
    """ gets a place """
    if "username" in session:
        book = Book.query.get_or_404(book_id)
        place = Place.query.get_or_404(place_id)
        if place.is_public or session["username"] == book.username:
            return jsonify(place.serialize());
    return jsonify({'message':'Unauthorized!'})


####################################################### new place

@app.route("/books/<int:book_id>/places",methods =['POST'])
def new_place(book_id):
    """makes a new place"""
    book = Book.query.get_or_404(book_id)
    if "username" in session and session["username"] == book.username:
        data = request.get_json()
        place =Place(*data)
        book_place = BookPlace(book_id=book_id,place_id=place.id)
        db.session.add(place)
        db.session.add(book_place)
        db.session.commit()
        return jsonify(place.serialize())
    return jsonify({'message':'Unauthorized!'})

####################################################### new book place

@app.route("/books/<int:book_id>/places/<int:place_id>",methods =['POST'])
def new_book_place(book_id,place_id):
    """ adds a place to a book"""
    book = Book.query.get_or_404(book_id)
    if "username" in session and session["username"] == book.username:
        data = request.get_json()
        book_character = BookPlace(book_id=book_id,place_id=place_id)
        db.session.add(book_place)
        db.session.commit()
        return jsonify({'message':'Added'})
    return jsonify({'message':'Unauthorized!'})


####################################################### edit place
@app.route("/books/<int:book_id>/places/<int:place_id>",methods =['PATCH'])
def edit_place(book_id,place_id):
    """edits a place"""
    if "username" in session:
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
            return jsonify(place.serialize())
    return jsonify({'message':'Unauthorized!'})


####################################################### delete place
@app.route("/books/<int:book_id>/places/<int:place_id>",methods =['DELETE'])
def delete_place(book_id,place_id):
    """deletes a place"""

    if "username" in session:
        book = Book.query.get_or_404(book_id);
        if session["username"] == book.username:
            Place.query.get_or_404(place_id).delete()
            db.session.commit()
            return jsonify({'message':'Deleted!'})
    return jsonify({'message':'Unauthorized!'});

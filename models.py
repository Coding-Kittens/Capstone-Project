

from flask_sqlalchemy import SQLAlchemy
import datetime
from flask_bcrypt import Bcrypt

db = SQLAlchemy()
bcrypt = Bcrypt()

def connect_db(app):
    db.app = app
    db.init_app(app)


class Image(db.Model):
    __tablename__ ='images'
    name = db.Column(db.Text,primary_key=True)
    path = db.Column(db.Text)
    username = db.Column(db.String(20),db.ForeignKey('users.username'),nullable = False)
    user = db.relationship('User',backref='images',foreign_keys=[username])
    # img = db.Column(db.LargeBinary, nullable = False)
    # type = db.Column(db.Text,nullable = False)

class User(db.Model):
    """ User model """
    __tablename__ = 'users'

    username = db.Column(db.String(20),primary_key=True)
    password = db.Column(db.Text,nullable = False)
    is_pro_user = db.Column(db.Boolean,nullable = False,default = False)
    first_name = db.Column(db.Text,nullable = False)
    last_name = db.Column(db.Text,nullable = False)
    profile_image = db.Column(db.Text,db.ForeignKey('images.name'))
    pic =db.relationship('Image',backref='userProfile',foreign_keys=[profile_image])

    @classmethod
    def register(cls, username, password,first_name, last_name, is_pro_user):
        """registers a new user"""
        hashed_b = bcrypt.generate_password_hash(password)

        hashed = hashed_b.decode("utf8")

        return cls(
            username=username,
            password=hashed,
            is_pro_user=is_pro_user,
            first_name=first_name,
            last_name=last_name,
        )

    @classmethod
    def authenticate(cls, username, password):
        """authenticates a user
        retruns user if valid, false if not"""
        user = User.query.filter_by(username=username).first()
        if user and bcrypt.check_password_hash(user.password, password):
            return user
        return False

    def full_name(self):
        return f'{self.first_name} {self.last_name}'

class Library (db.Model):
    __tablename__ ='libraries'
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    name = db.Column(db.String(100),nullable = False)
    description = db.Column(db.String(200),nullable = False)
    is_public = db.Column(db.Boolean,nullable = False,default = False)
    username = db.Column(db.String(20),db.ForeignKey('users.username'),nullable = False)
    books = db.relationship('Book',secondary='library_books',backref='libraries')
    user = db.relationship('User',backref='libraries')

    def serialize(self):
        return {"id": self.id,
                "name": self.name,
                "description": self.description,
                "is_public": self.is_public,
                "username": self.username,
                }


class Book(db.Model):
    """ Book model """
    __tablename__ ='books'
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    is_public = db.Column(db.Boolean,nullable = False,default = False)
    title = db.Column(db.String(100),nullable = False)
    synopsys = db.Column(db.String(200))
    username = db.Column(db.String(20),db.ForeignKey('users.username'),nullable = False)
    text_color = db.Column(db.Text,nullable = False,default='#FFFFFF')
    cover_color = db.Column(db.Text,nullable = False,default='#874148')
    cover_image = db.Column(db.Text,db.ForeignKey('images.name'))
    theme = db.Column(db.Integer,nullable = False,default=0)
    pic =db.relationship('Image',backref='books')
    user = db.relationship('User',backref='books')

    def serialize(self):
        return {"id": self.id,
                "title": self.title,
                "synopsys": self.synopsys,
                "is_public": self.is_public,
                "username": self.username,
                "text_color": self.text_color,
                "cover_color": self.cover_color,
                "cover_image": self.cover_image,
                "theme": self.theme,
                "author": self.user.full_name,
                }

class Page(db.Model):
    """ Page model """
    __tablename__ ='pages'
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    title = db.Column(db.String(100))
    text = db.Column(db.Text)
    image = db.Column(db.Text,db.ForeignKey('images.name'))
    page_num = db.Column(db.Integer,nullable = False)
    book_id = db.Column(db.Integer,db.ForeignKey('books.id'),nullable = False)
    book =db.relationship('Book',backref='pages')
    pic =db.relationship('Image',backref='pages')
    def serialize(self):
        return {"id": self.id,
                "title": self.title,
                "text": self.text,
                "page_num": self.page_num,
                "book_id": self.book_id,
                "image": self.image,
                }

class Note(db.Model):
    """ Note model """
    __tablename__ ='notes'
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    title = db.Column(db.Text,nullable = False)
    text = db.Column(db.Text,nullable = False)
    image = db.Column(db.Text,db.ForeignKey('images.name'))
    book_id = db.Column(db.Integer,db.ForeignKey('books.id'),nullable = False)
    order = db.Column(db.Integer)
    book =db.relationship('Book',backref='notes')
    pic =db.relationship('Image',backref='notes')
    def serialize(self):
        return {"id": self.id,
                "title": self.title,
                "text": self.text,
                "book_id": self.book_id,
                "username": self.username,
                "order": self.order,
                "image": self.image,
                }

class Character(db.Model):
    """ Character model """
    __tablename__ ='characters'
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    image = db.Column(db.Text,db.ForeignKey('images.name'))
    name = db.Column(db.Text,nullable = False)
    birthday = db.Column(db.Text)
    description = db.Column(db.Text)
    extra_info = db.Column(db.Text)
    story = db.Column(db.Text)
    books =db.relationship('Book',secondary ='book_characters',backref='characters')
    pic = db.relationship('Image',backref='characters')
    is_public = db.Column(db.Boolean,nullable = False,default = False)
    def serialize(self):
        return {"id": self.id,
                "name": self.name,
                "description": self.description,
                "birthday": self.birthday,
                "username": self.username,
                "extra_info": self.extra_info,
                "story": self.story,
                "image": self.image,
                "is_public": self.is_public,
                }

class Place(db.Model):
    """Place model """
    __tablename__ ='places'
    id = db.Column(db.Integer,primary_key=True,autoincrement=True)
    name = db.Column(db.Text)
    description = db.Column(db.Text)
    image = db.Column(db.Text,db.ForeignKey('images.name'))
    extra_info = db.Column(db.Text)
    books =db.relationship('Book',secondary='book_places',backref='places')
    pic =db.relationship('Image',backref='places')
    is_public = db.Column(db.Boolean,nullable = False,default = False)
    def serialize(self):
        return {"id": self.id,
                "name": self.name,
                "description": self.description,
                "is_public": self.is_public,
                "image": self.image,
                "extra_info": self.extra_info,
                }

class BookMark(db.Model):
    """ BookMark model """
    __tablename__ ='bookmarks'
    book_id = db.Column(db.Integer,db.ForeignKey('books.id'),primary_key=True)
    page_id = db.Column(db.Integer,db.ForeignKey('pages.id'),primary_key=True)
    text = db.Column(db.Text)
    book =db.relationship('Book',backref='bookmarks')
    page =db.relationship('Book',backref='bookmark')
    def serialize(self):
        return {"book_id": self.book_id,
                "page_id": self.page_id,
                "text": self.synopsys,
                }

class BookPlace(db.Model):
    """ Book place model """
    __tablename__ ='book_places'
    book_id = db.Column(db.Integer,db.ForeignKey('books.id'),primary_key=True)
    place_id = db.Column(db.Integer,db.ForeignKey('places.id'),primary_key=True)



class BookCharacter(db.Model):
    """ Book character model """
    __tablename__ ='book_characters'
    book_id = db.Column(db.Integer,db.ForeignKey('books.id'),primary_key=True)
    character_id = db.Column(db.Integer,db.ForeignKey('characters.id'),primary_key=True)




class LibraryBook(db.Model):
    """model for what books are in what libraries"""
    __tablename__ = 'library_books'
    library_id = db.Column(db.Integer,db.ForeignKey('libraries.id'),primary_key=True)
    book_id = db.Column(db.Integer,db.ForeignKey('books.id'),primary_key=True)

"""API tests."""
import os
from unittest import TestCase

from flask import Flask,request,session ,jsonify
from models import User,Library,Book,Page,Note,Character,Place,BookMark,BookPlace,BookCharacter,LibraryBook,db
from main import app


os.environ["DATABASE_URL"] = "postgresql:///library_test"
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_ECHO'] = True


db.create_all()



class APITestCase(TestCase):
    """Tests for users."""
    def setUp(self):
        """gets rid of any users """
        u = User(username='testUser',password='123',first_name='crystal',last_name='powell')
        b = Book(id=423,username='testUser',title='testBook',synopsys='description',is_public = False,text_color = '#000000',cover_color='#ffffff',theme=0)
        p = Page(id=546,page_num=34,book_id=423)
        db.session.add(u)
        db.session.add(b)
        db.session.add(p)
        db.session.commit()



    def tearDown(self):
        """clears db session """
        User.query.delete()
        db.session.rollback()


    def test_User(self):
        """ Tests for User """
        with app.test_client() as client:
            #register
            res = client.post('/register',data={'username':'testUser2','password':'123','first_name':'nick','last_name':'powell'})
            data = res.get_data(as_text = True)
            self.assertIn("testUser2",data)
            # logout
            res = client.get('/logout')
            data = res.get_data(as_text = True)
            self.assertIn("logged out!",data)
            #login
            res = client.post('/login',data={'username':'testUser2','password':'123'})
            data = res.get_data(as_text = True)
            self.assertIn("testUser2",data)


    def test_libraries(self):
        """ Tests for Library """
        with app.test_client() as client:
            client.post('/login',data={'username':'testUser','password':'123'})
            #add
            res = client.post('/users/testUser/libraries',data={'name':'testLibrary','description':'description','is_public':False})
            data = res.get_data(as_text = True)
            self.assertIn("testLibrary",data)
            #get
            res = client.get('/users/testUser/libraries')
            data = res.get_data(as_text = True)
            self.assertIn("testLibrary",data)

    def test_books(self):
        """Tests for Book """
        with app.test_client() as client:
            client.post('/login',data={'username':'testUser','password':'123'})
            #add
            res = client.post('/users/testUser/books',data={'title':'testBook','synopsys':'description','is_public':False,'text_color':'#000000','cover_color':'#ffffff','theme':'0'})
            data = res.get_data(as_text = True)
            self.assertIn("testBook",data)
            #get
            res = client.get('/users/testUser/books')
            data = res.get_data(as_text = True)
            self.assertIn("testBook",data)


    def test_pages(self):
        """ Tests for Page"""
        with app.test_client() as client:
            client.post('/login',data={'username':'testUser','password':'123'})
            #add
            res = client.post('/books/423/pages',data={'num_of_pages':2})
            data = res.get_data(as_text = True)
            self.assertIn("pages",data)

            # edit
            res = client.patch('/books/423/pages/1',data={'text':'pg1'})
            data = res.get_data(as_text = True)
            self.assertIn("pg1",data)

            #get
            res = client.get('/books/423/pages/all')
            data = res.get_data(as_text = True)
            self.assertIn("pg1",data)


    def test_characters(self):
        """ Tests for Character """
        with app.test_client() as client:
            client.post('/login',data={'username':'testUser','password':'123'})
            #add
            res = client.post('/books/423/characters',data={'name':'testName'})
            data = res.get_data(as_text = True)
            self.assertIn("testName",data)
            #get
            res = client.get('/books/423/characters')
            data = res.get_data(as_text = True)
            self.assertIn("testName",data)


    def test_places(self):
        """ Tests for Place"""
        with app.test_client() as client:
            client.post('/login',data={'username':'testUser','password':'123'})
            #add
            res = client.post('/books/423/places',data={'name':'testPlace'})
            data = res.get_data(as_text = True)
            self.assertIn("testPlace",data)
            #get
            res = client.get('/users/testUser/places')
            data = res.get_data(as_text = True)
            self.assertIn("testPlace",data)


    def test_notes(self):
        """ Tests for Note"""
        with app.test_client() as client:
            client.post('/login',data={'username':'testUser','password':'123'})
            #add
            res = client.post('/books/423/notes',data={'title':'testTitle','text':'testText'})
            data = res.get_data(as_text = True)
            self.assertIn("testTitle",data)
            #get
            res = client.get('/books/423/notes')
            data = res.get_data(as_text = True)
            self.assertIn("testTitle",data)


    def test_bookmarks(self):
        """ Tests for BookMark """
        with app.test_client() as client:
            client.post('/login',data={'username':'testUser','password':'123'})
            #add
            res = client.post('/bookmarks/423/546',data={'text':'testText'})
            data = res.get_data(as_text = True)
            self.assertIn("testText",data)
            #get
            res = client.get('/bookmarks/423')
            data = res.get_data(as_text = True)
            self.assertIn("testText",data)

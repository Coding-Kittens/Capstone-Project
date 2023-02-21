"""API tests."""
import os
from unittest import TestCase

from flask import Flask,request,session ,jsonify
from models import User,Library,Book,Page,Note,Character,Place,BookMark,BookPlace,BookCharacter,LibraryBook,connect_db,db
from main import app


os.environ["DATABASE_URL"] = "postgresql:///library_test"
from app import app

db.create_all()



class APITestCase(TestCase):
    """Tests for users."""
    def setUp(self):
        """gets rid of any users """
        u = User(username='testUser',password='123',first_name='crystal',last_name='powell')
        db.session.add(u)
        db.session.commit()



    def tearDown(self):
        """clears db session """
        User.query.delete()
        db.session.rollback()


    def test_register(self):
        """ Tests if a new user is added """
        with app.test_client() as client:
            res = client.post('/register',data={'username':'testUser2','password':'123','first_name':'nick','last_name':'powell'})
            data = res.get_data(as_text = True)
            self.assertIn("testUser2",data)

    def test_get_libraries(self):
        """ Tests if a new user is added """
        with app.test_client() as client:
            res = client.post('/users/testUser/libraries',data={})
            data = res.get_data(as_text = True)
            self.assertIn("testUser",data)

    def test_get_books(self):
        """ Tests if a new user is added """
        with app.test_client() as client:
            res = client.post('/users/testUser/libraries',data={})
            data = res.get_data(as_text = True)
            self.assertIn("testUser",data)

    def test_get_pages(self):
        """ Tests if a new user is added """
        with app.test_client() as client:
            res = client.post('/users/testUser/libraries',data={})
            data = res.get_data(as_text = True)
            self.assertIn("testUser",data)

    def test_get_characters(self):
        """ Tests if a new user is added """
        with app.test_client() as client:
            res = client.post('/users/testUser/libraries',data={})
            data = res.get_data(as_text = True)
            self.assertIn("testUser",data)

    def test_get_places(self):
        """ Tests if a new user is added """
        with app.test_client() as client:
            res = client.post('/users/testUser/libraries',data={})
            data = res.get_data(as_text = True)
            self.assertIn("testUser",data)

    def test_get_notes(self):
        """ Tests if a new user is added """
        with app.test_client() as client:
            res = client.post('/users/testUser/libraries',data={})
            data = res.get_data(as_text = True)
            self.assertIn("testUser",data)

    def test_get_bookmarks(self):
        """ Tests if a new user is added """
        with app.test_client() as client:
            res = client.post('/users/testUser/libraries',data={})
            data = res.get_data(as_text = True)
            self.assertIn("testUser",data)

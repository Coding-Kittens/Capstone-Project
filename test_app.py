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


    def test_User(self):
        """ Tests for User """
        with app.test_client() as client:
            res = client.post('/register',data={'username':'testUser2','password':'123','first_name':'nick','last_name':'powell'})
            data = res.get_data(as_text = True)
            self.assertIn("testUser2",data)


    def test_libraries(self):
        """ Tests for Library """
        with app.test_client() as client:


    def test_books(self):
        """Tests for Book """
        with app.test_client() as client:


    def test_pages(self):
        """ Tests for Page"""
        with app.test_client() as client:


    def test_characters(self):
        """ Tests for Character """
        with app.test_client() as client:


    def test_places(self):
        """ Tests for Place"""
        with app.test_client() as client:


    def test_notes(self):
        """ Tests for Note"""
        with app.test_client() as client:


    def test_bookmarks(self):
        """ Tests for BookMark """
        with app.test_client() as client:

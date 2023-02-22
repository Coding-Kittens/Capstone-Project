The title of my site is Writing Aura.

* I used Flask and React.
* I deployed it on railway.

**Heres the link:** [https://writing-aura.up.railway.app/](https://writing-aura.up.railway.app/)


It is a book writing site that lets you share your books with others if you want.
	
Unlike most book writing sites that just have a text block to write in, this one lets you write in a book format, so it actualy looks like your writing a book.

**Site Features:**

* Writing books
* Reading books
* Keep track of the characters and places in books
	* So you can write down information on the 	characters and places/settings in your stories.
* Writing notes
	* So you can write notes on your story.
* Adding bookmarks
	* So you can go to spacific pages.
* Keep track of Libraries and the books in each of them
	* So you can orginize your books in different Libraries.
	* So you can add books from other users that you would like to read.
* 'Search'  for books/ libraries/ users.
	* So you can read other peoples books that they make public.

* Edit User
	* So you can edit your user info like your bio.

**User Flow:**

* Sign-Up
	* Add a bio to your user page.
	* Make a new book and start writing.
		* Add notes, characters, places and bookmarks to help you write and keep track of information for your book.
		* Make a new library and add your book to it.
		* If you want to share your book with others make your book public!
	* Look for and read someone elses book.
* Login
	* Go to your books and continue writing one of your books.
	* Read your old books.
	* Read other peoples books.
	
	
**Testing:**

* Tests for my front end are in a tests folder in the src folder of the React app.
	* Run the back end with a test db, in main.py
	
			`os.environ["DATABASE_URL"] = "postgresql:///library_test"`
		* run the back end `flask run`
	* Run the tests for the front end

		`npx jest -i`

* Tests for my Back end are in file called test_app.py outside of the src folder.
	* Run the tests for the back end
	`python test_app.py  unittest `
	
**My API:**

* My API keeps track of all the information used in my front end and handles authentication and authorization.
* It keeps track of what user is logged in with flask-session.
* I made all the routes for each table.
* For the routes where you add, edit, or delete information, it checks to make sure the user is authorized.
* For routes where you get information that is privet, it checks to make sure the user is authorized.
* It keeps track of information for:
	* Users
	* Books
	* Libraries
	* Characters
	* Places
	* Notes
	* Bookmarks


****


**This is for personal use only!**

* Please Do not take any of my images or Fonts,
	*  The Caligraphy font, the hand written font, and the images used, I made myself. 
* Do Not use my Images or fonts! 

Copyright © 2023 Rose Berry Powell

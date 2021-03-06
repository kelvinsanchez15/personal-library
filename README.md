# Quality Assurance Project #3: Personal Library.

## View project

[Personal Library](https://personal-library-kel.glitch.me/)

## User Stories

1. Nothing from my website will be cached in my client as a security measure.

2. I will see that the site is powered by 'PHP 4.2.0' even though it isn't as a security measure.

3. I can post a title to /api/books to add a book and returned will be the object with the title and a unique \_id.

4. I can get /api/books to retrieve an array of all books containing title, \_id and commentcount.

5. I can get /api/books/{\_id} to retrieve a single object of a book containing title, \_id and an array of comments (empty array if no comments present).

6. I can post a comment to /api/books/{\_id} to add a comment to a book and returned will be the books object similar to get /api/books/{\_id}.

7. I can delete /api/books/{\_id} to delete a book from the collection. Returned will be 'delete successful' if successful.

8. If I try to request a book that doesn't exist I will get a 'no book exists' message.

9. I can send a delete request to /api/books to delete all books in the database. Returned will be 'complete delete successful' if successful.

10. All 6 functional tests requiered are complete and passing.

## Additional Dependencies

- [CORS](https://www.npmjs.com/package/cors).
- [Dotenv](https://www.npmjs.com/package/dotenv).
- [Express](https://www.npmjs.com/package/express).
- [Helmet](https://www.npmjs.com/package/helmet).
- [Method Override](https://www.npmjs.com/package/methodoverride).
- [MongoDB](https://www.npmjs.com/package/mongodb).
- [Mongoose](https://www.npmjs.com/package/mongoose).
- [Pug](https://www.npmjs.com/package/pug).
- [Jest](https://www.npmjs.com/package/jest).
- [SuperTest](https://www.npmjs.com/package/supertest).

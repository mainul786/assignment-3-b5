## Library Managment system

## uses Technolagy

- Backend Language: typeScript
- Framework : Express.js
- Database : MongoDB
- ODM : Mongoose
- Runtime: Nodejs

## using Featuars

Add a new Book
See the Book List
Find the Book using filter, sort, skip and limit
Book update
Book Delete
Give Book Borrow and Return
Check status Book is avaliable or not using static method

## Book Method, Endpoint and short work description

Method GET Endpoint /api/books works description Get all books (with filter, sort, paginate)
Method GET Endpoint /api/books/:bookId work description Get book by ID or get a single value
Method POST Endpoint /api/books works description Add a new book
Method PUT Endpoints /api/books/:bookId works description Update a book
Method DELETE Endpointd /api/books/:bookId works description Delete a book

## Borrow Method, Endpoint and short work description

Method POST Endpoint /api/borrow work description Borrow a book
Method GET Endpoint /api/borrow work description View borrow records as title, isbn and totalQuantity

## if you want run may project flow the below step

git clone https://github.com/mainul786/assignment-3-b5.git
cd assignment-3-b5

## package install

npm install

## run project

npm run start:dev

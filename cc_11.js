//Task 1: Creating a book class. Library inventory management system.

class Book { //create the new class
    static allBooks = [];
    constructor(title, author, isbn, copies) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.copies = copies; //store the variables
        Book.allBooks.push(this); //add each book to the all books array
    }

    getDetails() { //create a function to get the details of something in the book class
        return `Title: ${this.title}, Author: ${this.author}, ISBN: ${this.isbn}, Copies: ${this.copies}`; //use template literals to return a string with all the book information
    }

    updateCopies(quantity) { //create a function to update the variable "this.copies"
        if (typeof quantity !== "number") { //first we check if the input is a number
            return console.log(`Invalid input. Please input a number.`); //if it's not, we return an error message
        }
        if (quantity < 0) { //then, if it passes the first if condition, check for a negative value
            if (Math.abs(quantity) > this.copies) { //if the absolute value of the quantity is more than the number of copies
                console.log(`Insufficient copies.`); //do not subtract the number from copies and return an error message
            } else { //if the negative value is not absolutely more than the number of copies
                this.copies += quantity; //add the negative value to the quantity
            }
        } else { //if the value is not negative
            this.copies += quantity; //add the quantity to the current number of copies
        }
    }
}
const book1 = new Book("The Great Gatsby", "F. Scott Fitzgerald", 123456, 5);
console.log(book1.getDetails());
book1.updateCopies(-1);
console.log(book1.getDetails()); //test data

//Task 2: Creating a borrower class. Library member scenario.
class Borrower { //create the borrower class
    constructor(name, borrowerId) { //allow something with a name and borrower ID to be an instance of the class
        this.name = name;
        this.borrowerId = borrowerId;
        this.borrowedBooks = []; //create an empty array to store the books they borrow
    }

    borrowBook(book) { //create a method inside the class
        let foundBook; //create a variable with no value, to be assigned later
        if (typeof book == "string") { //if the value entered is a string
            foundBook = Book.allBooks.find(b => b.title === book); //set the value of the variable equal to the instance of Book in the allBooks array with the title matching the given title
        } else if (book instanceof Book) { //if the given value is an instance of the Book class, the variable will be set to the value of the instance
            foundBook = book;
        }
        if (!foundBook) { //if the variable is not set
            return console.log(`Book not found.`); //return an error message
        }
        if (foundBook.copies <= 0) { //if the number of copies is 0 or less
            return console.log(`Insufficient copies.`); //return an error message
        }
        foundBook.updateCopies(-1); //if neither of the two previous if conditions execute, remove a copy from the number of copies
        this.borrowedBooks.push(foundBook); //push the book to the borrowedBooks array
    }

    returnBook(book) { //create another method to take books out of the array, meaning they are no longer borrowed
        let foundBook; //initialize a variable with no value
        if (typeof book === "string") { //if the type of value is a string
            foundBook = this.borrowedBooks.find(b => b.title === book); //find the instance in the array with a matching title
        } else if (book instanceof Book) { //if the given input is an instance of Book
            foundBook = book; //the variable will be set to that instance
        }
        if (!foundBook) { //if the variable is not set equal to something
            return console.log(`Book not found.`) //return an error
        }
        const index = this.borrowedBooks.findIndex(b => b === foundBook); //find the index of the specified book
        this.borrowedBooks.splice(index, 1); //get rid of the instance in this array using splice. start at the index we found and remove one instance
        foundBook.updateCopies(1); //add one copy
    }
}

const borrower1 = new Borrower("Alice Johnson", 201);
borrower1.borrowBook("The Great Gatsby");
console.log(JSON.stringify(borrower1.borrowedBooks, null, 2));
borrower1.returnBook("The Great Gatsby");
console.log(JSON.stringify(borrower1.borrowedBooks, null, 2)); //test data. Using JSON.stringify because of issues with the array in the Google Chrome console

//Task 3: Creating a library class. Book and borrower tracking scenario.
class Library { //create new library class
    constructor() { //create the constructor with no parameters
        this.books = []; //create an empty books array
        this.borrowers = []; //create an empty borrowers array
    }

    addBook(book) { //add a method to push to the books array if the book is an instance of the Book class
        if (book instanceof Book) { //check if the book is an instance of Book
            this.books.push(book); //if it is, push it to the array
        } else { //if it's not
            return console.log(`Invalid book.`) //return error message
        }
    }

    addMember(borrower) {//added a method to add members to the library array, like with the books
        if (borrower instanceof Borrower) { //check if the borrower is an instance of Borrower
            this.borrowers.push(borrower); //if it is, push it to the array
        } else { //if they're not
            return console.log(`Invalid member.`); //return an error message
        }
    }

    listBooks() { //add a method to log all the details of the books in this array
        this.books.forEach(inst => console.log(inst.getDetails())); //for each instance in the array, use the getDetails method to return the details
    }

    //Task 4: Implementing book borrowing.
    lendBook(borrowerId, isbn) { //
        const book = this.books.find(b => b.isbn === isbn); //find the book with the matching ISBN and save it
        const borrower = this.borrowers.find(b => b.borrowerId === borrowerId); //find the borrower with the matching ID
        if (!book) { //if the book is not found
            return console.log(`Book not found.`); //return an error
        }
        if (!borrower) { //if the borrower is not found
            return console.log(`Member not found`); //return an error
        }
        if (book.copies <= 0) { //if there are not enough copies to lend the book
            return console.log(`Insufficient copies.`); //return an error
        } 
        book.updateCopies(-1);
        borrower.borrowBook(book); //if none of the previous if statements execute, subtract one from the number of available copies and use the borrowBook method to put it in the array of books borrowed by the borrower
        }

    //Task 5: implementing book returns.
    returnBook(borrowerId, isbn) {
        const borrower = this.borrowers.find(b => b.borrowerId === borrowerId);
        if (!borrower) { //if the borrower is not found
            return console.log(`Member not found`); //return an error
        }
        const book = borrower.borrowedBooks.find(b => b.isbn === isbn);
        if (!book) { //if the book is not found
        return console.log(`Book not found.`); //return an error
        }
        borrower.returnBook(book); //use
        }
    }


//Task 3 test data
const library = new Library();
library.addBook(book1);
library.listBooks();


//Task 4 test data
library.addMember(borrower1); 
library.lendBook(201, 123456);
console.log(book1.getDetails());
console.log(JSON.stringify(borrower1.borrowedBooks));

//Task 5 test data
library.returnBook(201, 123456);
console.log(JSON.stringify(book1.getDetails()));
console.log(JSON.stringify(borrower1.borrowedBooks));


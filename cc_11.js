//Task 1: Creating a book class. Library inventory management system.

class Book { //create the new class
    constructor(title, author, isbn, copies) {
        this.title = title;
        this.author = author;
        this.isbn = isbn;
        this.copies = copies; //store the variables
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
            this.borrowedBooks.push(book); //push the specified book to the array
    }

    returnBook(book) { //create another method to take books out of the array, meaning they are no longer borrowed
        const index = this.borrowedBooks.indexOf(book); //find the index in the array that contains the specified book
        if (index !== -1) { //if the index is not equal to negative one, in other words, if the instance is found
            this.borrowedBooks.splice(index, 1); //splice the array at the index of the book we want to remove, remove one item 
        } else { //if the index of the book is -1, meaning it was not found
            return console.log(`Book not found.`) //return an error message
        }
    }
}

const borrower1 = new Borrower("Alice Johnson", 201);
borrower1.borrowBook("The Great Gatsby");
console.log(borrower1.borrowedBooks);
borrower1.returnBook("The Great Gatsby");
console.log(borrower1.borrowedBooks); //test data
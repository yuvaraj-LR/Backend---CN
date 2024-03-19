// -------------pre-written code starts---------------
import mongoose from 'mongoose';
import { bookSchema } from './book.schema.js'

// creating model from schema.
const booksModel = mongoose.model('Book', bookSchema);

export default class BookRepository {

    //book creation
    async createBook(bookData) {
        const book = new booksModel(bookData);
        const savedBook = await book.save();
        return savedBook;
    }

    // filtering of book by id
    async getOne(id) {
        const book = await booksModel.findById(id);
        return book;
    }

    // ------------prewritten code ends----------------

    // Complete the following functions:

    //filtering the books based on genre
    async listBooksByGenre(genre) {
        try {
            let books = await booksModel.find({genre});
            console.log(books, "booksss....");
            return books;
        } catch (error) {
            console.log(error, "error in listBook Repo.");
        }
    }

    //increasing the count of available books
    async updateBookAvailability(bookId, quantity) { 
        try {
            let book = await booksModel.findById(bookId);
            if(book) {
                book.availableCopies += quantity;
                await book.save();

                return book;
            } else {
                console.log("User Not Found.");
            }
        } catch (error) {
            console.log(error, "error in updateBook Repo.");
        }
    }

    //deletion of book
    async deleteBookById(bookId) { 
        try {
            return await booksModel.findByIdAndRemove(bookId)
        } catch (error) {
            console.log(error, "error in deleteBookById Repo.");
        }
    }
}
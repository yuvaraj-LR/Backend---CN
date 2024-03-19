import mongoose from 'mongoose';
import { bookSchema } from './book.schema.js'

const BookModel = mongoose.model("books", bookSchema);


export default class BookRepository {


    // -----Change code in below functions only-----
    //book creation
    async createBook(bookData) {
        try {
            let newBook = new BookModel(bookData);
            await newBook.save();

            return newBook;
        } catch (error) {
            console.log(error);
            console.log("error in createBook.");
        }
    }

    //filtering the book by id
    async getOne(id) {
        try {
            return await BookModel.findById(id);
        } catch (error) {
            console.log(error);
            console.log("error in getOne.");
        }
    }
}
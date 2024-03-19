import mongoose from 'mongoose';
import BookRepository from "./book.repository.js";

export default class BookController {
    constructor() {
        this.bookRepository = new BookRepository();
    }

    //------change code in below functions only--------

    // creation of book
    createBook = async (req, res) => {
        try {
            const {title, author, genre, copies, availableCopies} = req.body;

            const newBook = {
                title, author, genre, copies, availableCopies
            }

            await this.bookRepository.createBook(newBook);
            return res.status(201).send(newBook);
        } catch (error) {
            console.log(error);
            console.log("Error in createBook.");
        }
        
     }

    // filtering of book by id
    getOne = async (req, res) => {
        try {
            const id = req.params.bookId;
            console.log(id, "iddd...");

            let getBookbyId = await this.bookRepository.getOne(id);

            console.log(getBookbyId, "getBookByIdd....");
            
            if(getBookbyId) {
                return res.status(200).send(getBookbyId);
            } else {
                return res.status(404).send("Not Found");
            }
        } catch (error) {
            console.log(error);
            console.log("Error in getOne.");
        }
     }

}

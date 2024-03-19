//-----------pre-written code starts----------
import BookRepository from "./book.repository.js";

export default class BookController {
  constructor() {
    this.bookRepository = new BookRepository();
  }

  //book creation
  createBook = async (req, res) => {
    const { title, author, genre, copies, availableCopies } = req.body;
    try {
      const bookData = {
        title,
        author,
        genre,
        copies,
        availableCopies,
      };
      await this.bookRepository.createBook(bookData);
      res.status(201).json(bookData);
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to create a new book" });
    }
  };

  //filtering the book by id
  getOne = async (req, res) => {
    const { bookId } = req.params;
    console.log(bookId);

    try {
      const book = await this.bookRepository.getOne(bookId);
      if (!book) {
        res.status(404).send("book  not found.");
      } else {
        res.status(200).send(book);
      }
    } catch (err) {
      console.log(err);
      res.status(500).json({ error: "Failed to find book" });
    }
  };

  //---------------pre-written code ends-----------------

  // Complete the functions below:

  //filtering the books based on genre
  listBooksByGenre = async (req, res) => {
    try {
      const { genre } = req.params; 
      console.log(genre, "genree....");

      const filteredData = await this.bookRepository.listBooksByGenre(genre);
      console.log(filteredData, "filteredData....");

      if(filteredData) {
        res.status(201).send(filteredData);
      } else {
        res.status(400).send("No list available.")
      }
      
    } catch (error) {
      console.log(error, "error in listBook Controller.");
    }
  };

  //increasing the count of available books
  updateBookAvailability = async (req, res) => {
    const {bookId} = req.params;
    const {quantity} = req.body;

    try {
      let result = await this.bookRepository.updateBookAvailability(bookId, quantity);
      console.log(result, "result...");

      res.status(201).send(result);
    } catch (error) {
      console.log(error, "error in updateBookAvailability Controller.");
    }
  };

  //deletion of book
  deleteBook = async (req, res) => {
    try {
      let {bookId} = req.params;
      console.log(bookId);
      await this.bookRepository.deleteBookById(bookId);

      res.status(201).send("Book Deleted successfully.")
    } catch (error) {
      console.log(error, "error in deleteBook Controller.");
    }
  };
}

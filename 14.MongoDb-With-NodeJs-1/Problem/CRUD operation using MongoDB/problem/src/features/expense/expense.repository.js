import { ObjectId } from "mongodb";
import { getDB } from "../../config/mongodb.js"

class ExpenseRepository {
  constructor() {
    this.collectionName = "expenses"; // name of the collection in mongodb
  }

  // Create a new expense
  async addExpense(expense) {
    let db = getDB();
    let collection = db.collection(this.collectionName);

    try {
      await collection.insertOne(expense);
      return expense;
    } catch (error) {
      console.log(error, "error in addExpense...");
    }
  }

  // Get one expnese by its ID
  async getOne(id) {
    let db = getDB();
    let collection = db.collection(this.collectionName);

    try {
      return await collection.findOne({_id: new ObjectId(id)});
    } catch (error) {
      console.log(error, "error in getOne...");
    }
  }

  // Get all expenses
  async getAllExpenses() {
    let db = getDB();
    let collection = db.collection(this.collectionName);

    try {
      return await collection.find().toArray();
    } catch (error) {
      console.log(error, "error in getAll...");
    }
  }

  // Add tag to an expense
  async addTagToExpense(id, tag) {
    let db = getDB();
    let collection = db.collection(this.collectionName);

    try {
      return await collection.updateOne({_id: new ObjectId(id)}, {$push: {tags: {tag}}});
    } catch (error) {
      console.log(error, "error in addTagToExpense...");
    }
  }

  // Filter expenses based on date, amount, and isRecurring field
  async filterExpenses(criteria) {
    let db = getDB();
    let collection = db.collection(this.collectionName);

    return await collection.find(criteria).toArray();
  }
}

export default ExpenseRepository;

import ExpenseModel from "./expense.model.js";
import ExpenseRepository from "./expense.repository.js";

export default class ExpenseController {
  constructor() {
    this.expenseRepository = new ExpenseRepository();
  }

  // Create new expense
  add = async (req, res) => {
    const {title, amount, date, isRecurring, tags} = req.body;

    const newExpenses = new ExpenseModel(title, parseFloat(amount), date, isRecurring, tags);

    try {
      let result = await this.expenseRepository.addExpense(newExpenses);

      return res.status(201).send(result);
    } catch (error) {
      console.log(error, "error in add.");
    }
  };

  // Get a specific expense
  getOne = async (req, res) => {
    const id = req.params.id;
    
    try {
      let result = await this.expenseRepository.getOne(id);

      return res.status(200).send(result);
    } catch (error) {
      console.log(error, "error in getOne.");
    }
  };

  // Get all expenses
  getAll = async (req, res) => {
    try {
      let result = await this.expenseRepository.getAllExpenses();

      return res.status(200).send(result);
    } catch(error) {
      console.log(error, "error in getAll.");
    }
  };

  // Add a tag to an expense
  addTag = async (req, res) => {
    const {expenseId, tag} = req.query;

    try {
      let result = this.expenseRepository.addTagToExpense(expenseId, tag);

      return res.status(200).send("Tag was added.")
      
    } catch (error) {
      console.log(error, "error in addTag.");
    }



  };

  // Filter expenses based on given criteria
  filter = async (req, res) => {
    const {minAmount, maxAmount, isRecurring} = req.query;

    console.log(minAmount, "minAmount", maxAmount, "maxAmount", isRecurring, "isRecurring");

    try {
      let filterExpression = {};

      if(minAmount) {
          filterExpression.price = {$gte: parseFloat(minAmount)}
      } 

      if (maxAmount) {
          filterExpression.price = {...filterExpression, $lte: parseFloat(maxAmount)}
      }

      if(isRecurring) {
          filterExpression.catagory = isRecurring;
      }

      let result = await this.expenseRepository.filterExpenses(filterExpression);

      return res.status(200).send(result);
    } catch (error) {
      console.log(error, "error in filter...");
    }
  };
}

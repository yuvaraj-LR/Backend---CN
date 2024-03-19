// Please don't change the pre-written code
// Import the necessary modules here

const Solution = () => {
  // Write your code here
  const fs = require("fs");

  try {
    fs.writeFileSync("notes.txt", "The world has enough coders")
  } catch (error) {
    console.log("The file doesn't exists.");    
  }

  const buffer = fs.readFileSync("notes.txt");
  console.log(buffer.toString());

  try {
    fs.appendFileSync("notes.txt", " BE A CODING NINJA!")
  } catch(error) {
    console.log("The file doesn't exists.");    
  }

  const buffer1 = fs.readFileSync("notes.txt");
  console.log(buffer1.toString());

};
Solution();
module.exports = Solution;

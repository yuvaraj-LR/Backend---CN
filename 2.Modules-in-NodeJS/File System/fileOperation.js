// Importing the fs module.

const fs = require("fs");

console.log("Start to read the file.");

// Read file - Method - 1
// const buffer = fs.readFileSync("data.txt")
// console.log(buffer.toString());

// Read file - Method - 2
// const buffer = fs.readFileSync("data.txt", {encoding: 'utf8'});
// console.log(buffer);

// Write the file, 
    // If file exists, override the content, else create new one.

// try {
//     fs.writeFileSync("employee.txt", "Name: Yuvaraj, Age: 21, Dept: CS");
// } catch (err) {
//     console.log("The File doesn't exists.");
// }


// Append the file.
    // Add content to existing file. 

// try {
//     fs.appendFileSync("data.txt", "Name : Yuvaraj, Age: 21");
// } catch {
//     console.log("The file doesn't exists.");
// }

console.log("End to read the file.");
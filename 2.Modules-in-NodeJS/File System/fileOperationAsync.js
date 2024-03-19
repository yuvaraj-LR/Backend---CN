const fs = require("fs");

// These are async operation so the log statments will not be in same order.

// // This is write file operation. 
// fs.writeFile("employee.txt", "This is new employee.", (err)=> {
//     if(err) {
//         console.log("File doesn't exists.");
//     } else {
//         console.log("File written successfully.");
//     }
// })

// // This is read file operation.
// fs.readFile("employee.txt", ({encoding: 'utf8'}), (err, data) => {
//     if(err) {
//         console.log("File doesn't exists.");
//     } else {
//         console.log(data);
//     }
// })

// // This is append file operation.
// fs.appendFile("employee.txt", "This is another new employee.", (err, data) => {
//     if (err) {
//         console.log("File doesnb't exists.");
//     } else {
//         console.log("File data append successfully.");
//     }
// })

// this is deleting file operation.
fs.unlink("employee.txt", (err, data) => {
    if (err) {
        console.log("File doesnb't exists.");
    } else {
        console.log("File data deleted successfully.");
    }
})

console.log("This is another function.")
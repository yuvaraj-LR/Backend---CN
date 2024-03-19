// Import required module
const readline = require("readline");

const Solution = () => {
  const interface1 = readline.createInterface({
    input: process.stdin,
    output: process.stdout
  });

  interface1.question("Enter the first number: ", (n1) => {
    interface1.question("Enter the second number: ", (n2) => {
      const maxi = Math.max(Number(n1), Number(n2));
      console.log(`The maximum of the two numbers is: ${maxi}`);
    });
  });
};

Solution();
module.exports = Solution;

// Please do not change the prewritten code

// import axios from 'axios';

let axios = require("axios");

const Solution = async () => {
  // Write your code here
  const response = await axios.get('https://api.codingninjas.com/api/v3/event_tags')

  console.log(response.data);
};
Solution();
module.exports = Solution;

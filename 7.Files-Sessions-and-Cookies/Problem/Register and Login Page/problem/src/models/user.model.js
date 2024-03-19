// Please don't change the pre-written code
// Import the necessary modules here

export const users = [
  { id: 1, name: "vivek", email: "krvivi28@gmail.com", password: "vivek28@" },
];

export const registerUser = (user) => {
  // Write your code here
  users.push({
    ...user, id: users.length + 1
  });

  return true;
};


export const authenticateUser = (reqUser) => {
  console.log(reqUser, "user auth...");

  const foundUser = users.find(
    (x) => x.email === reqUser.email && x.password === reqUser.password
  );

  return foundUser; // Returns true if user is found, false otherwise
};


exports.getAbsolutePath = (filePath) => {
  // Write your code 
  const path = require("path");

  const filePathResolve = path.resolve(filePath);
  return filePathResolve;

};

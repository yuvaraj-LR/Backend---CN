// Please don't change the pre-written code
// Import the necessary modules here

import {body, validationResult} from 'express-validator'; 

export const formValidation = async (req, res, next) => {
  // Write your code here

  // 1. Setup rules for validation.
  const rules = [
    body('name').notEmpty().withMessage("Name is required"),
    body('email').notEmpty().withMessage("Enter a valid email"),
    body('imageUrl').custom((value, {req}) => {
      if(!req.file) {
        throw new Error("Profile image is required");
      } 
      return true;
    })
  ]

  // 2. run those rules.  
  await Promise.all(
    rules.map((rule) => rule.run(req))
  );

  // 3. check for errors after checking the rules.
  var validationErrors = validationResult(req);
  console.log(validationErrors.array()[0], "validationErrors.");

  // 4. If errors are there, need to return the error message.
  // Instead of rendering '/', specify the correct view file name
  if (!validationErrors.isEmpty()) {
    return res.render('upload-form', { error: validationErrors.array()[0].msg });
  }

  next();

};

export default formValidation;

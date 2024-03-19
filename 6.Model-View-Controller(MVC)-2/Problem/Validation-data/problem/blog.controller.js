// Please don't change the pre-written code

export const validateBlog = (req, res) => {
  const { title, description, image } = req.body;

  let errors = [];

  if(!title) {
    errors.push("The title field should not be empty.")
  }

  if (title.trim().length <= 3) {
    errors.push("The title field should contain at least 3 characters.");
  }

  if(!description) {
    errors.push("The description field should not be empty.")
  }

  if (description.trim().length <= 10) {
    errors.push("The description field should contain at least 10 characters.");
  }

  try {
    let validURL = new URL(image);
  } catch (err) {
    errors.push("The image URL provided should be a valid URL.");
  }

  if (errors.length === 0) {
    res.status(201).render("addBlog", { errors: null, success: true });
  } else {
    res.status(400).render("addBlog", { errors: errors, success: false });
  }
};

export const renderBlogForm = (req, res) => {
  res.render("addBlog", { errors: null, success: false });
};


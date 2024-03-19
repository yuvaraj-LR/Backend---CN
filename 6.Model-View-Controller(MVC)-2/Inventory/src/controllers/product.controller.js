import ProductModel from '../models/product.model.js';

class ProductsController {
  getProducts(req, res, next) {
    var products = ProductModel.getAll();
    res.render('index', { products });
  }

  getAddProduct(req, res, next) {
    res.render('new-product', {
      errorMessage: null,
    });
  }

  getUpdateProductView(req, res, next) {

    const id = req.params.id;
    const productFound = ProductModel.getById(id);
    console.log(productFound, "productFound");
    if (productFound) {
      return res.render('update-product', {
        product: productFound,
        errorMessage: null,
      });
    }
    // 2. else return errors.
    else {
      res.status(401).send('Product not found');
    }
  } 

  getDeleteProductView(req, res, next) {
    const id = req.params.id;
    const productFound = ProductModel.getById(id);

    if(!productFound) {
      return res.status(401).send("Product not found.")
    }
    var products = ProductModel.getAll();

    ProductModel.delete(id);
    res.render('index', { products });

  }

  postAddProduct(req, res, next) {
    ProductModel.add(req.body);
    var products = ProductModel.getAll();
    res.render('index', { products });
  }

  updateProductView(req, res) {
    ProductModel.update(req.body);
    var products = ProductModel.getAll();
    res.render('index', { products });
  }

  deleteProduct(req, res) {
    ProductModel.delete(req.body);
    var products = ProductModel.getAll();
    res.render('index', { products });
  }
  
}

export default ProductsController;

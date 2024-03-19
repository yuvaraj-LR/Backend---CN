import UserModel from "../users/users.model.js"

export default class ProductModel{
    constructor(name, desp, img_url, catagory, price, sizes, id) {
        this._id = id;
        this.name = name;
        this.desp = desp;
        this.img_url = img_url;
        this.catagory = catagory;
        this.price = price;
        this.sizes = sizes;
    }

    static getAll() {
        return products;
    }

    static addProduct(newProduct) {
        newProduct.id = products.length + 1;
        products.push(newProduct);
        return products;
    }

    static getSingleProduct(id) {
        return products.find(product => product.id == id); 
    }

    static filter(minPrice, maxPrice, category) {
        const result = products.filter((product) => {
            return (
                product.price >= minPrice &&
                product.price <= maxPrice &&
                product.type === category
            );
        });
        return result;
    }

    static rateProduct(userId, productId, rating) {
        // 1. Validate the user.
        let user = UserModel.getAll().find(u => u.id == userId);
        if(!user) {
            throw new Error("Invalid UserID!!!");
        }

        // 2. Validate the product.
        let product = products.find(p => p.id == productId);
        if(!product) {
            throw new Error("Invalid ProductID!!!");
        }

        // 3. Check if the product has already rated.
        if(!product.rating) {
            product.rating = [];
            product.rating.push[{
                userId,
                rating
            }];
        } else {
            // If yes, need to change the value or keep it same it is. 
            const existingRatingIndex = product.rating.findIndex(r => r.id == userId);

            if(existingRatingIndex >= 0) {
                product.rating[existingRatingIndex] = {
                    userId,
                    rating
                }
            }

            else {
                product.rating.push({
                    userId,
                    rating
                })
            }
        }
    }
}

const products = [
    new ProductModel(1, "Iphone", "This is the Iphone 12 Pro", "https://www.amazon.in/iphone/s?k=iphone", 1, 80000),
    new ProductModel(2, "T-Shirt", "This is the T-shirt", "https://www.amazon.in/T-Shirts/b?ie=UTF8&node=1968123031", 2, 2000 ["S", "M", "L", "XL"], ),
    new ProductModel(3, "Kids-Shirt", "This is the Kids-shirt", "https://www.amazon.in/boys-shirts/b?ie=UTF8&node=1967895031", 2, 5000 ["S", "M"])
];
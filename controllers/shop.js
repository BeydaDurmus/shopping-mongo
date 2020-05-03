const Product = require('../models/product');
//const Category = require('../models/category');

exports.getIndex = (req, res, next) => {
    Product.getAll()
        .then(products => {
            console.log(products);
            res.render('shop/index', 
            {
                title: 'Shopping',
                products: products,
                path: '/'               
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

exports.getProducts = (req, res, next) => {
    Product.getAll()
        .then(products => {
            res.render('shop/index', {
                title: 'Products',
                products: products,
                path: '/products',
                action: req.query.action
            });
        })
        .catch((err) => {
            console.log(err);
        });
    }

exports.getProductByCategoryId = (req,res,next)=>{
    const categoryid = req.params.categoryid;
    const products = Product.getProductsByCategoryId(categoryid);
    const categories = Category.getAll();
    res.render('shop/products',
    {   
        title:'Products',
        products:products,
        categories:categories,
        selectedCategory: categoryid,
        path:'/products'

    });
}

exports.getProduct = (req, res, next) => {
        Product.getById(req.params.productid)
            .then(product =>{
                res.render('shop/product-detail',{
                    title:product.name,
                    path:'/products',
                    product:product

                });
            })
            .catch((err) =>{ console.log(err)});
}

exports.getProductDetails= (req, res, next) => {
    res.render('shop/product-detail',
        {
            title: 'Products',
            path: '/product-detail'
        });
}

exports.getOrders= (req, res, next) => {
    res.render('shop/carts',
        {
            title: 'Orders',
            path: '/orders'
        });
}

exports.getCarts= (req, res, next) => {
    res.render('shop/carts',
        {
            title: 'Carts',
            path: '/carts'
        });
}
exports.getAddProduct = (req, res, next) => {
    res.render('add-product',
        {
            title: 'Add a New Product',
            path: '/admin/add-product'
        });
}

exports.postAddProduct = (req, res, next) => {
  const product = new Product(
      req.body.name,
      req.body.price,
      req.body.imageUrl,
      req.body.description);
    product.saveProduct();
    res.redirect('/');
}
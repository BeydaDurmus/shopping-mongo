const Product = require('../models/product');
const Category = require('../models/category');

exports.getIndex = (req, res, next) => {
    const products = Product.getAll();
    const categories = Category.getAll();
    res.render('shop/index',
        {
            title: 'Shopping',
            products: products,
            categories:categories,
            path: '/'
        });
}

exports.getProducts = (req, res, next) => {
    const products = Product.getAll();
    const categories = Category.getAll();
    res.render('shop/products',
        {
            title: 'Products',
            products: products,
            categories:categories,
            path: '/products'
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

    const productId = req.params.productid;
    const product = Product.getById(productId);
    res.render('shop/product-detail',{
        title:product.name,
        product:product,
        path:'products'
    });
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
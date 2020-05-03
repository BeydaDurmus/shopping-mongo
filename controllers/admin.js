 const Product = require('../models/product');
 //const Category = require('../models/category');
 exports.getProducts = (req, res, next) => {
    Product.getAll()
        .then(products => {
            res.render('admin/products', {
                title: 'Admin Products',
                products: products,
                path: '/admin/products',
                action: req.query.action
            });
        })
        .catch((err) => {
            console.log(err);
        });
}

 exports.getAddProduct = (req, res, next) => {
    //const categories = Category.getAll();
    res.render('admin/add-product', {
        title: 'New Product',
        //categories:categories,
        path: '/admin/add-product'
    });
}

exports.postAddProduct = (req, res, next) => {
 
    const name = req.body.name;
    const price = req.body.price;
    const imageUrl = req.body.imageUrl;
    const description = req.body.description; 
    //product.categoryid = req.body.categoryid;
    const product = new Product(name,price,imageUrl,description);
    product.saveProduct()
        .then(result =>{
            res.redirect('/admin/products');
    })
        .catch(err => {
            console.log(err);
        })
}

exports.getEditProduct = (req, res, next) => {

    Product.getById(req.params.productid)
        .then(product => {
            console.log(product);
            res.render('admin/edit-product', {
                title: 'Edit Product',
                path: '/admin/products',
                product: product
            });
        })
        .catch(err => { console.log(err) });

}

exports.postEditProduct = (req, res, next) => {
    const id = req.body.id;
    const name = req.body.name;
    const price = req.body.price;
    const description = req.body.description;
    const imageUrl = req.body.description;
    //product.categoryid=req.body.categoryid;
    const product = new Product(name,price,description,imageUrl,id);
    product.saveProduct()
        .then(result=>{
            res.redirect('/admin/products?action=edit');
        })
        .catch((err)=>{console.log(err)});
}

exports.postDeleteProduct = (req, res, next) => {
    const id = req.body.productid;
    Product.deleteById(id)
        .then(() => {
            console.log('product has bees deleted.');
            res.redirect('/admin/products?action=delete');
        })
        .catch((err) => {
            console.log(err);
        })
   
}

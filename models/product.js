const getDb = require('../database').getdb;
const mongodb= require('mongodb');
module.exports = class Product{
    constructor(name,price,imageUrl,description,id){
        //this.id=(Math.floor(Math.random()*99999)+1).toString();
        this.name = name;
        this.price = price;
        this.imageUrl = imageUrl;
        this.description = description;
        this._id= id ? new mongodb.ObjectID(id) : null; //id varsa-> mongoDbden atansın id yoksa-> null değer gelsin ki yeni ürün eklensin      
    }

    saveProduct() {
        let db = getDb(); //const sabiti olarak değil ,birden fazla işlem olduğu için let kullanıldı.
        if(this._id)
        {
            db=db.collection('products')
            .updateOne({_id:this._id},{$set:this});//tüm fieldsleri günceller

        }
        else
        {
            db=db.collection('products')
            .insertOne(this)
            
        }
         
        return db
        .then(result => {
             console.log(result);
        })
        .catch(err=> {console.log(err)});
    }
    
    static getAll() {
        const db = getDb();
        return db.collection('products')
            .find()
            .project({name:1,price:1,imageUrl:1})
            .toArray()
            .then(products => {
                return products;
            })
            .catch(err => console.log(err));
    }

    static getById(productid) {
        const db = getDb();
        return db.collection('products').
        findOne({ _id: new mongodb.ObjectID(productid) })
        .then(product => {
            return product;
        }).catch(err => {
            console.log(err);
        });
    }

    static deleteById(productid){
        const db = getDb();
        return db.collection('products')
                .deleteOne({_id:new mongodb.ObjectID(productid)})
                .then(() => {
                    console.log('deleted');
                })
                .catch ((err) => { console.log(err)
                });
    }
}

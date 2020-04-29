const products = [
    { id:"123456",name:'Samsung S6',price:'2000',imageUrl:'1.jpg',description:'Good',categoryid:"1"},
    { id:"123457",name:'Huawai Y6',price:'5000',imageUrl:'2.jpg',description:'Excellent',categoryid:"1"},
    { id:"123458",name:'Huawai Y7',price:'3000',imageUrl:'huawei-y6-2019-32-gb-mavi-dist-cep-telefonu_288366.jpg',description:'Cool',categoryid:"1"},
    { id:"123459",name:'iPhone X',price:'7000',imageUrl:'iphone_screen.png',description:'Perfect',categoryid:"1"},
    { id:"123460",name:'Bilgisayar',price:'2000',imageUrl:'1.jpg',description:'Good',categoryid:"2"},
    { id:"123461",name:'Buzdolabı',price:'5000',imageUrl:'2.jpg',description:'Excellent',categoryid:"3"}
];

module.exports = class Product{

    constructor(name,price,imageUrl,description,categoryid){
        this.id=(Math.floor(Math.random()*99999)+1).toString();
        this.name = name;
        this.price = price;
        this.description = description;
        this.imageUrl = imageUrl;
        this.categoryid = categoryid;
    }

    saveProduct() {
        products.push(this);
    }

    static getAll()
    {
        return products;
    }

    static getById(id) {
        const  product = products.find(i=>i.id === id);
        return  product;
    }

    static getProductsByCategoryId(categoryid)
    {
        return products.filter(i=>i.categoryid === categoryid);
    }

    static Update(product)
    {
        const index = products.findIndex(i=>i.id === product.id);

        products[index].name=product.name;
        products[index].price=product.price;
        products[index].imageUrl=product.imageUrl;
        products[index].description=product.description;
        products[index].categoryid=product.categoryid;
    }

    static deleteById(id)
    {
        const index = products.findIndex(i=>i.id === id);
        products.splice(index,1);
    }
}

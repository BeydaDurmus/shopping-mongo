const categories = [
    {id:"1",name:"Telefon",description:"Telefon kategorisi ürünler"},
    {id:"2",name:"Bilgisayar",description:"Bilgisayar Kategori Ürünleri"},
    {id:"3",name:"Beyaz Eşya",description:"Beyaz Eşya Kategori Ürünleri"}
];

module.exports = class Category {
    constructor(name,description){
        this.id=(categories.length+1).toString();
        this.name=name;
        this.description=description;
    }

    saveCategory()
     {
         categories.push(this);
     }

    static getAll()
     {
         return categories;
     }

    static getById(id)
    {
        return categories.find(i=>i.id === id);
    }

    static Update(category)
    {
        const index = categories.findIndex(i=>i.id === category.id);
        categories[index].name=category.name;
        categories[index].description=category.description;
    }

    static deleteById(id)
    {
        const index = categories.findIndex(i=i.id === id);
        categories.splice(index,1); 
    }
}
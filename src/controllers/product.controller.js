const products = require("../data/products");


// const products = [{
//     id: 1,
//     name: "Laptop",
//     price: 50000
// },
// {
//     id:2,
//     name: "Mouse",
//     price:1000
// }
// ];

const getProducts = (req,res) =>{

    const { name, minPrice, maxPrice}  = req.query;
    let filteredProducts = products;

    if(name) {
        filteredProducts = filteredProducts.filter(
            (product) => product.name.toLowerCase() === name.toLowerCase()
        );
    }

        if(minPrice) {
            filteredProducts = filteredProducts.filter(
                (product) => product.price >= Number(minPrice)
            );
        }

        if(maxPrice){
            filteredProducts = filteredProducts.filter(
                (product) => product.price <=Number(maxPrice)
            );
        }
    
        
    

    res.json(filteredProducts);
};


const getProductById = (req,res)=>{
    const id = Number(req.params.id);

    const product = products.find(
        (product)=> product.id ===id
    );
    
    if(!product)
    {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.json(product);

}

const createProduct = (req,res) =>{
    const { name, price } = req.body;

    if(!name || price === undefined)
    {
        return res.status(400).json({
            message: "Name and price are required"
        });
    }
    if(price<=0)
    {
        return res.status(400).json({
            message: "Price must be greater than 0"
        });
    }
    const newProduct = {
        id: products.length + 1,
        name: name,
        price: price
    };

    products.push(newProduct);

    res.status(201).json(newProduct);
};

const updateProduct = (req,res) =>{

    const id= Number(req.params.id);

    const product = products.find(
        (product) => product.id ===id
    );

    if(!product)
    {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const {name,price} = req.body;

    if(!name || price === undefined)
    {
        return res.status(400).json({
            message: "Name and price are required"
        });
    }
    if(price <= 0)
    {
        return res.status(400).json({
            message: "Price must be greater than 0"
        });
    }
    product.name=name;
    product.price=price;

    res.json(product);

}

const updateProductPartial = (req,res) => {

};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    updateProductPartial
};
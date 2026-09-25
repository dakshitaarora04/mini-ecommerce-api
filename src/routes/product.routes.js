const express = require("express");
const router = express.Router();

const products = [
    {
        id: 1,
        name: "Laptop",
        price: 50000
    },
    {
        id: 2,
        name: "Mouse",
        price:1000
    }
];

router.get("/:id", (req,res)=>{
    const id = req.params.id;
    const product = products.find((product) => product.id === Number(id));


    if(!product)
    {
        return res.status(404).json({
            message: "Product not found"
        });
    }
    res.json(product);
})


// router.get("/", (req,res)=>{
//     res.json(products);
// });

router.get("/", (req,res) => {

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
});

router.post("/", (req,res) => {
    
    const {name,price} = req.body;


    if(!name || price ==undefined)
    {
        return res.status(400).json({
            message: "Name and price are required"
        });
    }

    if(price<=0){
        return res.status(400).json({
            message: "Price must be a greater than 0"
        });
    }

    const newProduct = {
            id: products.length +1,
            name: name,
            price: price
        };

        products.push(newProduct);
        res.status(201).json(newProduct);
    });




router.put("/:id", (req,res) =>{
    const id = Number(req.params.id);

    const  product = products.find((product) => product.id === id);

    if(!product){
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

if(price <=0){
    return res.status(400).json({
        message: "Price must be greater than 0"
    });
}

product.name=name;
product.price=price;

res.json(product);

});




router.patch("/:id", (req,res) => {
    const id = Number(req.params.id);
    const product = products.find((product) => product.id === id);

    if(!product) {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    const {name,price} = req.body;

    if(name !== undefined && name==="")
    {
        return res.status(400).json({
            message: "Name cannot be empty"
        });
    }

    if(price !== undefined && price<=0)
    {
        return res.status(400).json({
            message: "Price must be greater than 0"
        });
    }



    if(name !==undefined){
        product.name = name;
    }

    if(price !==undefined)
    {
        product.price = price;
    }

    res.json(product);

});

router.delete("/:id",(req,res) => {
  
    const id = Number(req.params.id);

    const productIndex = products.findIndex(
        (product) => product.id ===id
    );

    if(productIndex === -1)
    {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    products.splice(productIndex, 1);
    res.json({
        message: "Product deleted successfully"
    });
});

module.exports = router;


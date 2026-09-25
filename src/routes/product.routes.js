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


    const newProduct = {
            id: products.length +1,
            name: name,
            price: price
        };

        products.push(newProduct);
        res.status(201).json(newProduct);
    });

module.exports = router;


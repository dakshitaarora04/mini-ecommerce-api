// const products = require("../data/products");

const Product = require("../models/product.model");

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

// const getProducts = (req,res) =>{

//     const { name, minPrice, maxPrice}  = req.query;
//     let filteredProducts = products;

//     if(name) {
//         filteredProducts = filteredProducts.filter(
//             (product) => product.name.toLowerCase() === name.toLowerCase()
//         );
//     }

//         if(minPrice) {
//             filteredProducts = filteredProducts.filter(
//                 (product) => product.price >= Number(minPrice)
//             );
//         }

//         if(maxPrice){
//             filteredProducts = filteredProducts.filter(
//                 (product) => product.price <=Number(maxPrice)
//             );
//         }
    
        
    

//     res.json(filteredProducts);
// };

const getProducts = async (req,res) => {
    try{
        const products = await Product.find();

        res.json(products);
    }
    catch(error){
        res.status(500).json({
            message: "failed to fetch products"
        });
    }
};


const getProductById = async(req,res)=>{
    try{
 // const id = Number(req.params.id);

    const product = await Product.findById(req.params.id);
        
    if(!product)
    {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.json(product);

}

catch(error){
    res.status(500).json({
        message: "Failed to fetch product"
    });
}
    };
   

const createProduct = async (req,res) =>{
   try{
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
    const newProduct = await Product.create({
       name,
       price
    });

    res.status(201).json(newProduct);

   }  
   catch(error)
   {
    res.status(500).json({
        message: "Failed to create product"
    });
   }
};


const updateProduct = async(req,res) =>{

    try{
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
    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            name,
            price
        },
        {
            new:true,
            runValidators: true
        }
    );
    if(!product)
    {
        return res.status(404).json({
            message: "Product not found"
        });
  
    }
    res.json(product);
    }

    catch(error) {
        res.status(500).json({
            message: "Failed to update product"
        });
    }
    
};

const updateProductPartial = async(req,res) => {

    try{
        
    const {name,price} = req.body;

    if(name !==undefined && name==="")
    {
        return res.status(400).json({
            message:"Name cannot be empty"
        });
    }

    if(price !==undefined && price<=0)
    {
        return res.status(400).json({
             message: "Price must be greater than 0"
        });
    }

    const product = await Product.findByIdAndUpdate(
        req.params.id,
        {
            ...(name !== undefined && {name}),
            ...(price !==undefined && {price})
        },
        {
            new: true,
            runValidators: true
        }
    );

    if(!product)
    {
        return res.status(404).json({
            message: "Product not found"
        });
    }

    res.json(product);

    }

    catch(error)
    {
        res.status(500).json({
            message: "Failed to update product"
        });
    }
    
};

const deleteProduct = async (req,res) => {

    try{
      
        const product = await Product.findByIdAndDelete(req.params.id);
        if(!product)
        {
            return res.status(404).json({
                message:"Product not found"
            });
        }


    res.json({
        message: "Product deleted successfully",
        product
    });

    }
    catch(error){

         res.status(500).json({
            message: "Failed to delete product"
        });
    }

   
};

module.exports = {
    getProducts,
    getProductById,
    createProduct,
    updateProduct,
    updateProductPartial,
    deleteProduct
};

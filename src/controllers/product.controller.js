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

        const {name, minPrice, maxPrice, page=1, limit = 10} = req.query;

        if(isNaN(Number(page)) || Number(page)<1)
        {
            return res.status(400).json({
                message:"page must be a positive number"
            });
        }

    
        if(isNaN(Number(limit)) || Number(limit)<1)
        {
            return res.status(400).json({
                message:"limit must be a positive number"
            });
        }
        const skip = (Number(page) - 1) * Number(limit);

        const filter = {};

        if(minPrice !== undefined && isNaN(Number(minPrice)))
        {
            return res.status(400).json({
                message:"minPrice must be a valid number"
            });
        }

        if(maxPrice !== undefined && isNaN(Number(maxPrice)))
        {
            return res.status(400).json({
                message:"maxPrice must be a valid number"
            });
        }

        if(name !==undefined)
        {
            filter.name={
                $regex: `^${name}$`,
                $options: "i"
            };
        }


        if(minPrice !== undefined &&
            maxPrice !== undefined &&
            Number(minPrice) > Number(maxPrice)
        )
        {
            return res.status(400).json({
                message: "minPrice cannot be greater than maxPrice"
            });
        }

        if(minPrice !== undefined)
        {
            filter.price ={
                $gte:Number(minPrice)
            };
        }

        if(maxPrice !== undefined)
        {
            filter.price = {
                ...filter.price,
                    $lte : Number(maxPrice)
                };
            }
        
        const products = await Product.find(filter)
            .skip(skip)
            .limit(Number(limit));

        const total = await Product.countDocuments(filter);

        res.json({

            page: Number(page),
            limit: Number(limit),
            total,
            totalPages: Math.ceil(total / Number(limit)),
            products
        });
    }
    catch(error){
        res.status(500).json({
            message: "failed to fetch products"
        });
    }
};


const getProductById = async(req,res,next)=>{
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

//     if(error.name === "CastError")
//     {

//         return res.status(400).json({
//             message:"Invalid product ID"
//         });
//     }
//     res.status(500).json({
//         message: "Failed to fetch product"
//     });
// }


    next(error);
}

    };
   

const createProduct = async (req,res,next) =>{
   try{
const { name, price } = req.body;

    if(!name || price === undefined)
    {
        return res.status(400).json({
            message: "Name and price are required"
        });
    }
    // if(price<=0)
    // {
    //     return res.status(400).json({
    //         message: "Price must be greater than 0"
    //     });
    // }
    const newProduct = await Product.create({
       name,
       price
    });

    res.status(201).json(newProduct);

   }  
   catch(error)
   {

    // if(error.name === "ValidationError")
    // {
    //     return res.status(400).json({
    //         message: error.message
    //     });
    // }
    // res.status(500).json({
    //     message: "Failed to create product"
    // });
    next(error);
   }
};


const updateProduct = async(req,res, next) =>{

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

        // if(error.name === "CastError")
        // {
        //     return res.status(400).json({
        //         message: "Invalid product ID"
        //     });
        // }
        // if(error.name ==="ValidationError")
        // {
        //     return res.status(400).json({
        //         message: error.message
        //     });
        // }
        // res.status(500).json({
        //     message: "Failed to update product"
        // });
        next(error);
    }
    
};

const updateProductPartial = async(req,res,next) => {

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
        // if(error.name === "CastError")
        // {
        //     return res.status(400).json({
        //         message: "Invalid product ID"
        //     });
        // }

        // if(error.name === "ValidationError")
        // {
        //     return res.status(400).json({
        //         message: error.message
        //     });
        // }
        // res.status(500).json({
        //     message: "Failed to update product"
        // });
        next(error);
    }
    
};

const deleteProduct = async (req,res,next) => {

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

        // if(error.name === "CastError")
        // {
        //     return res.status(400).json({
        //         message: "Invalid product ID"
        //     });
        // }

        //  res.status(500).json({
        //     message: "Failed to delete product"
        // });
        next(error);
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

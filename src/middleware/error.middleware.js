const errorMiddleware = (error, req, res, next) => {

    console.log(error);

    if(error.name === "CastError")
    {
        return res.status(400).json({
            message: "Invalid product ID"
        });
    }
    if(error.name === "ValidationError")
    {
        return res.status(400).json({
            message: error.message
        });
    }

    res.status(500).json({
        message:"Something went wrong"
    });
};
module.exports = errorMiddleware;
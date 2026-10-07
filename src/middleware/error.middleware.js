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

    const statusCode = error.statusCode || 500;

    res.status(statusCode).json({
        message: error.message ||"Something went wrong"
    });
};
module.exports = errorMiddleware;
const errorHandler=(err,req,res,next) => {
    const statusCode=res.statusCode===200 ? 500:res.statusCode
    if (statusCode===500) {
        err.message="internal server error"
    }
    res.status(statusCode).json({
        message:err.message,
        stackTrace: process.env.NODE_ENV === 'development' ? err.stack : null})
}

module.exports=errorHandler
const asyncHandler=require('express-async-handler')
const jwt=require('jsonwebtoken')

const validateToken=asyncHandler(async(req,res,next)=> {
    let authHeader=req.headers.authorization || req.headers.Authorization
    if (authHeader && authHeader.startsWith("Bearer ")){
        authHeader=authHeader.split(" ")
        let token=authHeader[1]

        try{
        const decoded=jwt.verify(token,process.env.SECRET_KEY)
        req.user=decoded.userInfo
        next()
        }
        catch(err){
            res.status(401)
            throw new Error("Unauthorized user")
        }
    }
    else{
        res.status(401)
        throw new Error("Unauthorized user or token is missing")
    }
})

module.exports=validateToken
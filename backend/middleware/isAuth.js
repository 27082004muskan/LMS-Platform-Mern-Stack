import jwt from 'jsonwebtoken';

const isAuth =async (req, res, next) => {
    try{
let {token}=req.cookies;
    if(!token){
        return res.status(401).json({
            message:"Unauthorized! No token found"
        });
    }

    let verifyToken = await jwt.verify(token, process.env.JWT_SECRET);

    if(!verifyToken){
        return res.status(400).json({
            message:"User does not have valid token"
        })
    }

    req.userId = verifyToken.userId
    next();


    }catch(error){
        return res.status(500).json({
            message:`Auth Error ${error}`
        })
    }
}

export default isAuth;
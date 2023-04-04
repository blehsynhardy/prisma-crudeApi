import jwt from 'jsonwebtoken';
import bcrypt from 'bcrypt';

//compare password during login
export const comparePassword = (password, hash) => {
    return bcrypt.compare(password, hash)
}


//hash password during signup
export const hashpassword = (password) => {
    return bcrypt.hash(password, 5);    
}

//create Jwt token when sign in
export const createJwt = (user) => {
    const token = jwt.sign({
         id : user.id,
         username : user.username},
         process.env.JWT_SECRET)

        return token;
}

//Protect the route using bearer token
export const protect = (req,res, next) => {
    const bearer = req.headers.authorization;
    if(!bearer) {
        res.status(401);
        res.send({message : 'user not authorized'})
        return
    }

    const [, token] = bearer.split(' ');
    if(!token) {
        res.status(401)
        res.send({message : 'not a valid token'})
        return
    }

    try {
        const user = jwt.verify(token, process.env.JWT_SECRET)
        req.user = user
        next()
        
    }catch(e) {
        console.log(e)
        res.status(401)
        res.send({message : 'not a valid token'})
        return
    }
 }



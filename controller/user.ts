import { comparePassword, createJwt, hashpassword } from '../auth/auth';
import prisma from '../helpers/db';

export const createUser = async (req, res, next) => {
    let checkUsername = req.body.username
try {
  let isExistingUser =  await prisma.user.findUnique({
        where: {
            username : checkUsername
        }
    })

    if (isExistingUser) {
        return res.json({message: "User already exists"})
    }
    const user = await prisma.user.create({
        data:{
            username : req.body.username,
            password : await hashpassword(req.body.password)
        }
    })
    const token = createJwt(user);
    res.json({token});
    } catch (e) {
        e.type = 'input'
        next(e)
    }
}

export const signIn = async (req, res) => {
    try {
        const user = await prisma.user.findUnique({
            where:{
                username : req.body.username
            }
        })
        if(user) {
            const isValid = await comparePassword(req.body.password, user.password);
            if(!isValid) {
                res.status(401)
                res.json({message : 'invalid password'})
                return
            }
            const token = createJwt(user);
            res.json({token, status : true});
        } else {
            res.status(401)
            res.json({message : "username not found"})
        }
    } catch(err) {
        res.json({message : "something went wrong \n"})
    }
    
}
import prisma from "../helpers/db"


//Get all product related to the user
export const getUserProduct = async(req,res) => {
    try {
        const user = await prisma.user.findUnique({
            where : {
                id : req.user.id
            },
            include : {
                product : true
            }
        })
         res.json({data : user.product})
    }catch(err) {
        res.status(400).json({message : err})
    }    
}


//Get one product 

export const getOneProduct = async (req, res) => {
    try {
        const id = req.param.id;
        const product = await prisma.product.findFirst({
            where : {
                id,
                belongsToId : req.user.id
            }
        })
        res.status(200).json({data : product})
    }catch(err) {
        res.status(400).json({message : "there is nothing "})
    }
}


export const createProduct = async(req, res) => {
    try {
         const product = await prisma.product.create({
            data : {
                name : req.body.name,
                belongsToId : req.user.id
            }
         })
      res.status(201).json({data : product, message : "product create succesffully"})
    } catch(err) {
        res.status(400)
        res.json({message : err})
    }
}

export const updateProduct = async(req, res) => {
   const update = await prisma.product.update({
        where : {
            id_belongsToId : {
                id : req.param.id,
                belongsToId : req.user.id
            }
        },
        data : {
            name : req.body.name
        }
   })
   res.status(201).json({data : update})
}

export const deleteProduct = async (req, res) => {
    const deleteProduct = await prisma.product.delete({
        where : {
            id_belongsToId : {
                id : req.param.id,
                belongsToId : req.user.id
            }
           
        },
    })
    res.status(201).json({data : deleteProduct, message : "product deleted succesffuly"})

}




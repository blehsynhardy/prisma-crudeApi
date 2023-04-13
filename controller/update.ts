import prisma from "../helpers/db"

export const singleUpdate =  async(req,res) => {
    const update = prisma.update.findUnique({
        where : {
            id: req.param.id,
        }
    })
    res.status(200).status({message : update})
} 
export const fetchAllUpdate =  async(req,res) => {

    const products = await prisma.product.findMany({
        where : {
            belongsToId : req.user.id
        },
        include : {
            Update : true
        }
    })

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.Update]
    }, [])

    res.json({message : updates});
} 

export const createUpdate = async(req, res) => {

    const product =  await prisma.product.findUnique({
        where : {
            id : req.body.productId
        }
    })
    if(!product) {
        return res.json({message : "not your product"})
    }

    const create = await prisma.update.create({
        data : {
            title : req.body.title,
            body : req.body.body,
            ProductId : req.body.productId
        }
    })

    res.json({message : create})
}


export const deleteUpdate =  async(req,res) => {

    const products = await prisma.product.findMany({
        where : {
            belongsToId : req.user.id
        },
        include : {
            Update : true
        }
    })

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.Update]
    }, [])

    const match =  updates.find(update => update.id === req.param.id);
    if(!match) {
        return res.json({message : "Not matching data"})
    } 


    const deleted = prisma.update.delete({
        where : {
            id : req.param.id
        }

    })
    res.json({message :deleted})


} 


export const updateUpdate =  async(req,res) => {
    const products = await prisma.product.findMany({
        where : {
            belongsToId : req.user.id
        },
        include : {
            Update : true
        }
    })

    const updates = products.reduce((allUpdates, product) => {
        return [...allUpdates, ...product.Update]
    }, [])

    const match =  updates.find(update => update.id === req.param.id);
    if(!match) {
        return res.json({message : "Not matching data"})
    } 

    const updateUpdate = await prisma.update.update({
        where : {
            id : req.param.id
        },
        data : req.body
    })

    res.json({data: updateUpdate})

}
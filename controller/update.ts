import prisma from "../helpers/db"

export const singleUpdate =  async( req, res) => {

    try {
        const update = await prisma.update.findUnique({
            where : {
                id: req.params.id,
            }
        })
        res.status(200).json({message : update})
     }  catch(e) {
            res.json({message : "there is a problem while fetching data"})
    }
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
            product : {connect : {id : product.id}}
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
     console.log(req.user.id)
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

    console.log(updates)

    const match =  updates.find(update => update.id === req.params.id);
    console.log(match)
    if(!match) {
        return res.json({message : "Not matching data"})
    } 

    const updateUpdate = await prisma.update.update({
        where : {
            id : req.params.id
        },
        data : req.body
    })

    res.json({data: updateUpdate})

}
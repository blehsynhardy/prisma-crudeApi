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
export const createUpdate = async (req, res) => {
    const product =  await prisma.product.findUnique({
        where : {
            id : req.body.productId
        }
    })
    if(!product) {
        return res.json({message : "not your product"})
    }

    const update = await prisma.update.create({
        data : req.body
    })
    res.json({data : update})
}
export const deleteUpdate =  async(req,res) => {} 
export const updateUpdate =  async(req,res) => {}  
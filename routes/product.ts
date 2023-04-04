import { Router } from 'express';
import { getUserProduct, updateProduct, getOneProduct, createProduct } from '../controller/product';
import { validate_product } from '../validation';


const router = Router();
router.get('/get-product', getUserProduct)
router.get('/get-product/:id', getOneProduct)
router.put('/update-product/:id', updateProduct)
router.post('/create-product',validate_product, createProduct)
router.delete('/delete-product/:id', ()=> {})



export default router

import {Router} from 'express'
import { createUpdate, fetchAllUpdate } from '../controller/update';
import { validate_update } from '../validation';

const router = Router();

 router.get('/get-update', fetchAllUpdate)
// router.get('/get-product/:id', getOneProduct)
// router.put('/update-product/:id', updateProduct)
router.post('/create-update',validate_update, createUpdate)
//router.delete('/delete-product/:id', ()=> {})

export default router;

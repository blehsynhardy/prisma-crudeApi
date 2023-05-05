import {Router} from 'express'
import { createUpdate, fetchAllUpdate, singleUpdate, updateUpdate } from '../controller/update';
import { validate_update } from '../validation';

const router = Router();

 router.get('/get-update', fetchAllUpdate)
 router.get('/get-update/:id', singleUpdate)
 router.put('/update-update/:id', updateUpdate)
router.post('/create-update',validate_update, createUpdate)
//router.delete('/delete-product/:id', ()=> {})

export default router;

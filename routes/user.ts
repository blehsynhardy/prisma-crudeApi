import { Router } from 'express';
import { createUser, signIn } from '../controller/user';
import { login_schema } from '../validation';

const router = Router();

router.post('/create', login_schema, createUser);
router.post('/signin', login_schema, signIn);

export default router

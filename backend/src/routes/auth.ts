import express from 'express';
import auth from '../middleware/auth';
import { login, register, logout } from '../controllers/authController';

const router = express.Router();

router.post('/register', register);
router.post('/login', login);
router.post('/logout', auth, logout);

export default router;
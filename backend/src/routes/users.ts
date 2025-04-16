import express from 'express';
import auth from '../middleware/auth';
import { 
  getUserProfile, 
  updateUserProfile, 
  updateUserPassword 
} from '../controllers/userController';

const router = express.Router();

router.get('/profile', auth, getUserProfile);
router.put('/profile', auth, updateUserProfile);
router.put('/password', auth, updateUserPassword);

export default router;
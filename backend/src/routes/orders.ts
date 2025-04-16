import express from 'express';
import auth from '../middleware/auth';
import {
  createOrder,
  getOrders,
  getOrderById,
  updateOrderStatus,
  uploadOrderPhoto
} from '../controllers/orderController';

const router = express.Router();

// Order management routes
router.post('/', auth, createOrder);
router.get('/', auth, getOrders);
router.get('/:id', auth, getOrderById);
router.put('/:id/status', auth, updateOrderStatus);
router.post('/:id/photo', auth, uploadOrderPhoto);

export default router;
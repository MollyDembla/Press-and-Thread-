import express from 'express';
import auth from '../middleware/auth';
import {
  getServices,
  getServiceById,
  createService,
  updateService,
  deleteService
} from '../controllers/serviceController';

const router = express.Router();

router.get('/', getServices);
router.get('/:id', getServiceById);
router.post('/', auth, createService);
router.put('/:id', auth, updateService);
router.delete('/:id', auth, deleteService);

export default router;
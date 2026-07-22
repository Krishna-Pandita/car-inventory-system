import { Router } from 'express';
import { create, getAll, search, update, remove } from '../controllers/vehicleController';
import { authenticateToken, requireAdmin } from '../middleware/authMiddleware';

const router = Router();

router.use(authenticateToken);

router.get('/', getAll);
router.get('/search', search);
router.post('/', requireAdmin, create);
router.put('/:id', requireAdmin, update);
router.delete('/:id', requireAdmin, remove);

export default router;

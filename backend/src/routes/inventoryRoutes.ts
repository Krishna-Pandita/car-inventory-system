import { Router } from 'express';
import { purchase, restock } from '../controllers/inventoryController';
import { authenticateToken, requireAdmin } from '../middleware/authMiddleware';

const router = Router();

router.use(authenticateToken);

router.post('/:id/purchase', purchase);
router.post('/:id/restock', requireAdmin, restock);

export default router;

import { Router } from 'express';
import { purchase, restock } from '../controllers/inventoryController';
import { authenticateToken, requireAdmin } from '../middleware/authMiddleware';

const router = Router();

router.post('/:id/purchase', authenticateToken, purchase);
router.post('/:id/restock', authenticateToken, requireAdmin, restock);

export default router;

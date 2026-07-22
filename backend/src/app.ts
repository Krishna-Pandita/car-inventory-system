import express from 'express';
import cors from 'cors';
import authRoutes from './routes/authRoutes';
import vehicleRoutes from './routes/vehicleRoutes';
import inventoryRoutes from './routes/inventoryRoutes';

const app = express();

app.use(cors());
app.use(express.json());

// Routes
app.use('/api/auth', authRoutes);
app.use('/api/vehicles', inventoryRoutes);
app.use('/api/vehicles', vehicleRoutes);

// Base route & Health check
app.get('/api/health', (_req, res) => {
  res.json({ status: 'ok', timestamp: new Date().toISOString() });
});

export default app;

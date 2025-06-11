import express, { Application, Request, Response } from 'express';
import dotenv from 'dotenv';
import emailRoutes from './routes/emailRoutes';


dotenv.config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(express.json());

// Routes
app.use('/api', emailRoutes);

// Basic route
app.get('/', (req: Request, res: Response) => {
  res.send('Hello from TypeScript Node.js backend!');
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
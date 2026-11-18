import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import authRoutes from './src/routes/AuthRoutes.js';
import userRoutes from './src/routes/UserRoutes.js';
import globalErrorHandler from './src/middleware/GlobalErrorHandler.js';
import globalRateLimiter from './src/utils/GlobalRateLimiter.js';

const app = express();

app.disable("x-powered-by");
app.use(helmet());
app.use(express.json({ limit: "10kb" }));
app.use(express.urlencoded({extended: true}));

app.use(globalRateLimiter);

app.get("/health", (req, res) => {
  res.json({ status: "ok" });
});

app.use("/api/auth", authRoutes);
app.use('/api/users', userRoutes);

app.use((req, res) => {
  return res.status(404).json({ 
    status: 404,
    success: false,
    message: 'Invalid end point',
    error: "Not found",
    data: null,
  });
});

app.use(globalErrorHandler);
import express from 'express';
import helmet from 'helmet';
import { TaskRouter } from './routes/taskRoutes';
import { CategoryRouter } from './routes/categoryRoutes';

const app = express();
app.use(express.json());
app.use(helmet());

// Configuração das rotas
app.use('/tasks', TaskRouter);
app.use('/categories', CategoryRouter);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});

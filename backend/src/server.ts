import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import { v4 as uuidv4 } from 'uuid';
import { body, validationResult } from 'express-validator';
import { Task, CreateTaskRequest, UpdateTaskRequest, ApiResponse } from './types';

const app = express();
const PORT = process.env.PORT || 3001;

// In-memory storage for demo purposes
let tasks: Task[] = [
  {
    id: uuidv4(),
    title: 'Welcome to TaskFlow',
    description: 'This is your first task. Try marking it as complete!',
    completed: false,
    priority: 'medium',
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  }
];

// Middleware
app.use(helmet());
app.use(cors());
app.use(morgan('combined'));
app.use(express.json({ limit: '10mb' }));

// Validation middleware
const validateCreateTask = [
  body('title').trim().isLength({ min: 1, max: 100 }).withMessage('Title must be 1-100 characters'),
  body('description').trim().isLength({ max: 500 }).withMessage('Description must be less than 500 characters'),
  body('priority').isIn(['low', 'medium', 'high']).withMessage('Priority must be low, medium, or high'),
  body('dueDate').optional().isISO8601().withMessage('Due date must be a valid ISO date')
];

const validateUpdateTask = [
  body('title').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Title must be 1-100 characters'),
  body('description').optional().trim().isLength({ max: 500 }).withMessage('Description must be less than 500 characters'),
  body('completed').optional().isBoolean().withMessage('Completed must be a boolean'),
  body('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Priority must be low, medium, or high'),
  body('dueDate').optional().isISO8601().withMessage('Due date must be a valid ISO date')
];

// Helper function to handle validation errors
const handleValidationErrors = (req: express.Request, res: express.Response): boolean => {
  const errors = validationResult(req);
  if (!errors.isEmpty()) {
    const response: ApiResponse = {
      success: false,
      error: 'Validation failed',
      message: errors.array().map(err => err.msg).join(', ')
    };
    res.status(400).json(response);
    return true;
  }
  return false;
};

// Routes
app.get('/health', (req, res) => {
  const response: ApiResponse = {
    success: true,
    message: 'TaskFlow API is running'
  };
  res.json(response);
});

app.get('/api/tasks', (req, res) => {
  const response: ApiResponse<Task[]> = {
    success: true,
    data: tasks
  };
  res.json(response);
});

app.get('/api/tasks/:id', (req, res) => {
  const task = tasks.find(t => t.id === req.params.id);
  if (!task) {
    const response: ApiResponse = {
      success: false,
      error: 'Task not found'
    };
    return res.status(404).json(response);
  }

  const response: ApiResponse<Task> = {
    success: true,
    data: task
  };
  res.json(response);
});

app.post('/api/tasks', validateCreateTask, (req: express.Request, res: express.Response) => {
  if (handleValidationErrors(req, res)) return;

  const { title, description, priority, dueDate }: CreateTaskRequest = req.body;

  const newTask: Task = {
    id: uuidv4(),
    title,
    description,
    completed: false,
    priority,
    dueDate,
    createdAt: new Date().toISOString(),
    updatedAt: new Date().toISOString()
  };

  tasks.push(newTask);

  const response: ApiResponse<Task> = {
    success: true,
    data: newTask,
    message: 'Task created successfully'
  };
  res.status(201).json(response);
});

app.put('/api/tasks/:id', validateUpdateTask, (req: express.Request, res: express.Response) => {
  if (handleValidationErrors(req, res)) return;

  const taskIndex = tasks.findIndex(t => t.id === req.params.id);
  if (taskIndex === -1) {
    const response: ApiResponse = {
      success: false,
      error: 'Task not found'
    };
    return res.status(404).json(response);
  }

  const updates: UpdateTaskRequest = req.body;
  const updatedTask: Task = {
    ...tasks[taskIndex],
    ...updates,
    updatedAt: new Date().toISOString()
  };

  tasks[taskIndex] = updatedTask;

  const response: ApiResponse<Task> = {
    success: true,
    data: updatedTask,
    message: 'Task updated successfully'
  };
  res.json(response);
});

app.delete('/api/tasks/:id', (req, res) => {
  const taskIndex = tasks.findIndex(t => t.id === req.params.id);
  if (taskIndex === -1) {
    const response: ApiResponse = {
      success: false,
      error: 'Task not found'
    };
    return res.status(404).json(response);
  }

  tasks.splice(taskIndex, 1);

  const response: ApiResponse = {
    success: true,
    message: 'Task deleted successfully'
  };
  res.json(response);
});

// Error handling middleware
app.use((err: Error, req: express.Request, res: express.Response, next: express.NextFunction) => {
  console.error('Unhandled error:', err);
  const response: ApiResponse = {
    success: false,
    error: 'Internal server error',
    message: 'Something went wrong. Please try again later.'
  };
  res.status(500).json(response);
});

// 404 handler
app.use((req, res) => {
  const response: ApiResponse = {
    success: false,
    error: 'Not found',
    message: 'The requested resource was not found'
  };
  res.status(404).json(response);
});

app.listen(PORT, () => {
  console.log(`TaskFlow API server running on port ${PORT}`);
});

export default app;
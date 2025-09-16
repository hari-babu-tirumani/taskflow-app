"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const cors_1 = __importDefault(require("cors"));
const helmet_1 = __importDefault(require("helmet"));
const morgan_1 = __importDefault(require("morgan"));
const uuid_1 = require("uuid");
const express_validator_1 = require("express-validator");
const app = (0, express_1.default)();
const PORT = process.env.PORT || 3001;
// In-memory storage for demo purposes
let tasks = [
    {
        id: (0, uuid_1.v4)(),
        title: 'Welcome to TaskFlow',
        description: 'This is your first task. Try marking it as complete!',
        completed: false,
        priority: 'medium',
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    }
];
// Middleware
app.use((0, helmet_1.default)());
app.use((0, cors_1.default)());
app.use((0, morgan_1.default)('combined'));
app.use(express_1.default.json({ limit: '10mb' }));
// Validation middleware
const validateCreateTask = [
    (0, express_validator_1.body)('title').trim().isLength({ min: 1, max: 100 }).withMessage('Title must be 1-100 characters'),
    (0, express_validator_1.body)('description').trim().isLength({ max: 500 }).withMessage('Description must be less than 500 characters'),
    (0, express_validator_1.body)('priority').isIn(['low', 'medium', 'high']).withMessage('Priority must be low, medium, or high'),
    (0, express_validator_1.body)('dueDate').optional().isISO8601().withMessage('Due date must be a valid ISO date')
];
const validateUpdateTask = [
    (0, express_validator_1.body)('title').optional().trim().isLength({ min: 1, max: 100 }).withMessage('Title must be 1-100 characters'),
    (0, express_validator_1.body)('description').optional().trim().isLength({ max: 500 }).withMessage('Description must be less than 500 characters'),
    (0, express_validator_1.body)('completed').optional().isBoolean().withMessage('Completed must be a boolean'),
    (0, express_validator_1.body)('priority').optional().isIn(['low', 'medium', 'high']).withMessage('Priority must be low, medium, or high'),
    (0, express_validator_1.body)('dueDate').optional().isISO8601().withMessage('Due date must be a valid ISO date')
];
// Helper function to handle validation errors
const handleValidationErrors = (req, res) => {
    const errors = (0, express_validator_1.validationResult)(req);
    if (!errors.isEmpty()) {
        const response = {
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
    const response = {
        success: true,
        message: 'TaskFlow API is running'
    };
    res.json(response);
});
app.get('/api/tasks', (req, res) => {
    const response = {
        success: true,
        data: tasks
    };
    res.json(response);
});
app.get('/api/tasks/:id', (req, res) => {
    const task = tasks.find(t => t.id === req.params.id);
    if (!task) {
        const response = {
            success: false,
            error: 'Task not found'
        };
        return res.status(404).json(response);
    }
    const response = {
        success: true,
        data: task
    };
    res.json(response);
});
app.post('/api/tasks', validateCreateTask, (req, res) => {
    if (handleValidationErrors(req, res))
        return;
    const { title, description, priority, dueDate } = req.body;
    const newTask = {
        id: (0, uuid_1.v4)(),
        title,
        description,
        completed: false,
        priority,
        dueDate,
        createdAt: new Date().toISOString(),
        updatedAt: new Date().toISOString()
    };
    tasks.push(newTask);
    const response = {
        success: true,
        data: newTask,
        message: 'Task created successfully'
    };
    res.status(201).json(response);
});
app.put('/api/tasks/:id', validateUpdateTask, (req, res) => {
    if (handleValidationErrors(req, res))
        return;
    const taskIndex = tasks.findIndex(t => t.id === req.params.id);
    if (taskIndex === -1) {
        const response = {
            success: false,
            error: 'Task not found'
        };
        return res.status(404).json(response);
    }
    const updates = req.body;
    const updatedTask = {
        ...tasks[taskIndex],
        ...updates,
        updatedAt: new Date().toISOString()
    };
    tasks[taskIndex] = updatedTask;
    const response = {
        success: true,
        data: updatedTask,
        message: 'Task updated successfully'
    };
    res.json(response);
});
app.delete('/api/tasks/:id', (req, res) => {
    const taskIndex = tasks.findIndex(t => t.id === req.params.id);
    if (taskIndex === -1) {
        const response = {
            success: false,
            error: 'Task not found'
        };
        return res.status(404).json(response);
    }
    tasks.splice(taskIndex, 1);
    const response = {
        success: true,
        message: 'Task deleted successfully'
    };
    res.json(response);
});
// Error handling middleware
app.use((err, req, res, next) => {
    console.error('Unhandled error:', err);
    const response = {
        success: false,
        error: 'Internal server error',
        message: 'Something went wrong. Please try again later.'
    };
    res.status(500).json(response);
});
// 404 handler
app.use((req, res) => {
    const response = {
        success: false,
        error: 'Not found',
        message: 'The requested resource was not found'
    };
    res.status(404).json(response);
});
app.listen(PORT, () => {
    console.log(`TaskFlow API server running on port ${PORT}`);
});
exports.default = app;

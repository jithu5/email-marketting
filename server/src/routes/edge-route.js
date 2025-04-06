import express from 'express';
import { AuthMiddleware } from '../middlewares/auth.middleware.js';
import {addEdge,deleteEdge,getEdges} from "../controllers/edge-controller.js"

const edgeRouter = express.Router();

// Create new edge
edgeRouter.post('/add', AuthMiddleware, addEdge);

// Delete edge
edgeRouter.delete('/delete', AuthMiddleware, deleteEdge);

// Get all edges
edgeRouter.get('/get', AuthMiddleware, getEdges);

export default edgeRouter;
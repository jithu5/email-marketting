import express from "express";
import { AuthMiddleware } from "../middlewares/auth.middleware.js";
import {
  addNode,
  deleteNode,
  getAllNodes,
  updateNode,
} from "../controllers/node-controller.js";

const nodeRouter = express.Router();

// Create new node
nodeRouter.post("/add", AuthMiddleware, addNode);

// update node
nodeRouter.put("/update", AuthMiddleware, updateNode);

// Delete node
nodeRouter.delete("/delete", AuthMiddleware, deleteNode);

// get all nodes
nodeRouter.get("/get", AuthMiddleware, getAllNodes);

export default nodeRouter;

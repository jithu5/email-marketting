import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";
import Edge from "../models/edge.model.js";
import User from "../models/user.model.js";

export const addEdge = AsyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    throw new ApiError(401, "User not authenticated");
  }
  try {
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const { edge } = req.body;
    if (!edge) {
      throw new ApiError(400, "Edge data is required");
    }
    const { source, target, id, type } = edge;
    if (!source || !target || !id || !type) {
      throw new ApiError(400, "Edge data is not valid");
    }
    const existingEdge = await Edge.findOne({ source, target });
    if (existingEdge) {
      throw new ApiError(400, "Edge already exists");
    }
    const newEdge = new Edge(edge);
    newEdge.userId = userId;
    const savedEdge = await newEdge.save();
    if (!savedEdge) {
      throw new ApiError(500, "Edge not saved");
    }
    res
      .status(201)
      .json(new ApiResponse(201, savedEdge, "New edge created successfully"));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

export const deleteEdge = AsyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    throw new ApiError(401, "User not authenticated");
  }
  try {
    const { nodeId } = req.body;
    if (!nodeId) {
      throw new ApiError(400, "Edge ID is required");
    }
    const deletedEdge = await Edge.find({
      $or: [{ source: nodeId }, { target: nodeId }],
    });
    if (!deletedEdge) {
      throw new ApiError(404, "Edge not found");
    }
    // Use Promise.all to remove all found edges
    await Promise.all(deletedEdges.map((edge) => edge.remove()));
    res
      .status(200)
      .json(new ApiResponse(200, deletedEdge, "Edge deleted successfully"));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

export const getEdges = AsyncHandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    throw new ApiError(401, "User not authenticated");
  }
  try {
    const edges = await Edge.find({ userId: userId });
    if (!edges) {
      throw new ApiError(404, "No edges found");
    }
    res
      .status(200)
      .json(new ApiResponse(200, edges, "Edges fetched successfully"));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

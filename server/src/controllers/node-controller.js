import Node from "../models/node.model.js";
import User from "../models/user.model.js";
// import Canvas from "../models/canvas.model";
import { AsyncHandler } from "../utils/AsyncHandler.js";
import { ApiError } from "../utils/ApiError.js";
import { ApiResponse } from "../utils/ApiResponse.js";

export const addNode = AsyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      throw new ApiError(401, "User not authenticated");
    }
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const { node } = req.body;
    if (!node) throw new ApiError(400, "Node data is required");
    const { position, type, id, data } = node;
    if (!position || !type || !id || !data)
      throw new ApiError(400, "Node data is not valid");
    const { x, y } = position;
    if (!x || !y) throw new ApiError(400, "Node position is not valid");
    const { label, value } = data;
    if (!label || !value) throw new ApiError(400, "Node data is not valid");

    const newNode = new Node({
      userId: userId,
      position: {
        x: x,
        y: y,
      },
      type: type,
      id: id,
      data: {
        label: label,
        value: value,
      },
    });
    const savedNode = await newNode.save();

    if (!savedNode) {
      throw new ApiError(500, "Node not saved");
    }
    res
      .status(201)
      .json(new ApiResponse(201, savedNode, "New node created successfully"));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

export const deleteNode = AsyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      throw new ApiError(401, "User not authenticated");
    }
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const { nodeId } = req.body;
    if (!nodeId) throw new ApiError(400, "Node ID is required");
    const node = await Node.findById(nodeId);
    if (!node) throw new ApiError(404, "Node not found");
    if (node.userId.toString() !== userId.toString()) {
      throw new ApiError(403, "User not authorized to delete this node");
    }
    const deletedNode = await Node.findByIdAndDelete(nodeId);
    if (!deletedNode) {
      throw new ApiError(500, "Node not deleted");
    }
    res
      .status(200)
      .json(new ApiResponse(200, deletedNode, "Node deleted successfully"));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

export const updateNode = AsyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      throw new ApiError(401, "User not authenticated");
    }
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const { nodeId, node } = req.body;
    if (!nodeId || !node) {
      throw new ApiError(400, "Node ID and data are required");
    }
    console.log(node)
    const { position, type, id, data } = node;
    if (!position || !type || !id || !data) {
      throw new ApiError(400, "Node data is not valid");
    }
    const { x, y } = position;
    if (!x || !y) {
      throw new ApiError(400, "Node position is not valid");
    }
    const { label, value } = data;
    if (!label) {
      throw new ApiError(400, "Node data is not valid");
    }
    console.log(nodeId)
    const existingNode = await Node.findOne({ id: nodeId });
    console.log("Existing node:", existingNode);


    const updatedNode = await Node.findByIdAndUpdate(
      nodeId, // ✅ Correct query filter
      {
        position: {
          x: node.position.x,
          y: node.position.y + 150,
        },
        type: type,
        id: Number(id) +1,
        data: {
          label: label,
          value: value || null,
        },
      },
      { new: true }
    );

    if (!updatedNode) {
      throw new ApiError(500, "Node not updated");
    }

    res
      .status(200)
      .json(new ApiResponse(200, updatedNode, "Node updated successfully"));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

export const getAllNodes = AsyncHandler(async (req, res) => {
  try {
    const userId = req.user._id;
    if (!userId) {
      throw new ApiError(401, "User not authenticated");
    }
    const user = await User.findById(userId).select("-password");
    if (!user) {
      throw new ApiError(404, "User not found");
    }
    const nodes = await Node.find({ userId: userId });
    if (!nodes) {
      throw new ApiError(404, "No nodes found for this user");
    }
    console.log(nodes)
    res
      .status(200)
      .json(new ApiResponse(200, nodes, "Nodes retrieved successfully"));
  } catch (error) {
    throw new ApiError(error.statusCode, error.message);
  }
});

import mongoose from "mongoose";

const canvasSchema = new mongoose.Schema(
  {
    nodes: [
      {
        type: mongoose.Schema.Types.ObjectId,
        ref: "Node",
        required: true,
      },
    ],
    edges: {
      type: Array,
      required: true,
    },
    userId: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

const Canvas = mongoose.model("Canvas", canvasSchema);
export default Canvas;

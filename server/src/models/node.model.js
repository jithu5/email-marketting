import mongoose from "mongoose";

const NodeSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    position: {
      x: {
        type: Number,
        required: true,
      },
      y: {
        type: Number,
        required: true,
      },
    },
    data: {
      label: {
        type: String,
        required: true,
      },
      value: {
        type: Object,
      },
    },
    type: {
      type: String,
    },
    userId:{
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    }
  },
  {
    timestamps: true,
  }
);

const Node = mongoose.model("Node", NodeSchema);
export default Node;

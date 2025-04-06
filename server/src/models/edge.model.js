import mongoose from "mongoose";

const EdgeSchema = new mongoose.Schema(
  {
    id: {
      type: String,
      required: true,
      unique: true,
    },
    source: {
      type: String,
      required: true,
    },
    target: {
      type: String,
      required: true,
    },
    animated: {
      type: Boolean,
      default: true,
    },
    type:{
        type: String,
        required: true,
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

const Edge = mongoose.model("Edge", EdgeSchema);
export default Edge;
import mongoose from "mongoose";

const categorySchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
    },
    slug: {
      type: String,
      required: true,
    },
    // image: {
    //   url: {
    //     type: String,
    //     default: "",
    //   },
    //   id: {
    //     type: String,
    //     default: "",
    //   },
    // },
  },
  { timestamps: true }
);

export default mongoose.model("Category", categorySchema);

import mongoose, { Schema, Types, model } from "mongoose";

const famillySchema = new Schema(
  {
    user: {
      type: Types.ObjectId,
      ref: "User",
    },

    adults: {
      type: Number,
      default: 0,
      min: 0,
      required: true,
    },
    babies: {
      type: Number,
      default: 0,
      min: 0,

      required: true,
    },
    childeren: {
      type: Number,
      default: 0,
      min: 0,
      required: true,
    },
  },
  { timestamps: true, strictQuery: true, toJSON: { virtuals: true } }
);

const famillyModel =
  mongoose.models.famillyModel || model("Familly", famillySchema);
export default famillyModel;

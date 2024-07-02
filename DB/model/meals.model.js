import mongoose, { Schema, Types, model } from "mongoose";

const mealsSchema = new Schema(
  {
    recipeName: {
      type: String,
      required: true,
      min: 8,
      max: 25,
    },
    _id:{
      type: Number,
      required: true,
    },
    slug: {
      type: String,
      required: true,
    },
    user: {
      type: Types.ObjectId,
      ref: "User",
    },
    information: {
      type: String,
      min: 8,
      max: 180,
    },
    image: {
      url: {
        type: String,
        default:
          "https://res.cloudinary.com/dz5dpvxg7/image/upload/v1703666417/resturant/bestFood/l3vhxelayjrekpb3vl1x.png",
      },
      id: {
        type: String,
        default: "resturant/bestFood/l3vhxelayjrekpb3vl1x.png",
      },
    },
    cloudFolder: String,
    typeMeals: {
      type: String,
      enum: ["Lunch", "Dinner", "Breakfast"],
      default: "Lunch",
    },
    EnoughFor: {
      type: Number,
      required: true,
    },
    times: {
      type: Number,
      required: true,
    },
    calories: {
      type: Number,
      required: true,
    },
    isSaved: { type: Boolean, default: false },
    ingredients: {
      type:String,
      required: true,
    },
    steps:{
      type:String,
      required: true,
    },
  },
  { timestamps: true, strictQuery: true, toJSON: { virtuals: true } }
);

mealsSchema.query.pagination = function (page) {
  page = !page || page < 1 || isNaN(page) ? 1 : page;
  const limit = 6;
  const skip = limit * (page - 1);
  return this.skip(skip).limit(limit);
};
mealsSchema.query.customSelect = function (fields) {
  if (!fields) return this;
  const modelKeys = Object.keys(mealsModel.schema.paths);
  const queryKeys = fields.split(" ");
  const matchKeys = queryKeys.filter((key) => modelKeys.includes(key));
  return this.select(matchKeys);
};

const mealsModel = mongoose.models.mealsModel || model("Meals", mealsSchema);
export default mealsModel;

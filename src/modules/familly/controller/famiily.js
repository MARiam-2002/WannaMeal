import famillyModel from "../../../../DB/model/famillyMember.js";
import { asyncHandler } from "../../../utils/errorHandling.js";

export const addOrDeleteAdults = asyncHandler(async (req, res, next) => {
  const { kind } = req.query;
  const family = await famillyModel.findOneAndUpdate(
    {
      user: req.user._id,
    },
    { $inc: { adults: kind === "add" ? 1 : -1 } },
    { new: true }
  );
  if (!family) return next("Family not found", { cause: 404 });

  return res.status(201).json({ success: true, family });
});
export const addOrDeleteBabies = asyncHandler(async (req, res, next) => {
  const { kind } = req.query;
  const family = await famillyModel.findOneAndUpdate(
    {
      user: req.user._id,
    },
    { $inc: { babies: kind === "add" ? 1 : -1 } },

    { new: true }
  );
  if (!family) return next("Family not found", { cause: 404 });

  return res.status(201).json({ success: true, family });
});
export const addOrDeleteChildren = asyncHandler(async (req, res, next) => {
  const { kind } = req.query;
  const family = await famillyModel.findOneAndUpdate(
    {
      user: req.user._id,
    },
    { $inc: { childeren: kind === "add" ? 1 : -1 } },
    { new: true }
  );
  if (!family) return next("Family not found", { cause: 404 });

  return res.status(201).json({ success: true, family });
});

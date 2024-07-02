export const requirePremium = (req, res, next) => {
  if (!req.user.isPremium) {
    return res.status(403).json({
      message: "Premium membership required",
    });
  }

  next();
};

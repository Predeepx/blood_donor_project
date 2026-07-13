export const validateRequest = (
  req,
  res,
  next
) => {
  const {
    bloodGroup,
    units,
    hospital,
    city,
    location,
  } = req.body;

  if (
    !bloodGroup ||
    !units ||
    !hospital ||
    !city ||
    !location
  ) {
    return res.status(400).json({
      message:
        "All fields are required",
    });
  }

  next();
};
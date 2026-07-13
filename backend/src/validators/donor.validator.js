export const validateDonor = (
  req,
  res,
  next
) => {
  const {
    bloodGroup,
    phone,
    city,
    location,
  } = req.body;

  if (
    !bloodGroup ||
    !phone ||
    !city ||
    !location
  ) {
    return res.status(400).json({
      message:
        "Missing required fields",
    });
  }

  next();
};
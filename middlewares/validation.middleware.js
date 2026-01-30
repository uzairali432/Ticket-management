const bodyValidator = (schema) => {
  return (req, res, next) => {
    const data = req.body;
    if (!data) {
      res.status(422).json({ message: "Enter the data!" });
      return;
    }
    const { error } = schema.validate(data);
    if (error) {
      res.status(422).json({ message: error.details[0].message });
      return;
    }
    next();
  };
};

module.exports = { bodyValidator };

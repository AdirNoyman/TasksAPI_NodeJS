const notFound = (req, res) => {
  res.status(404).send('<h1>Route does not exists 😥</h1>');
};

module.exports = notFound;

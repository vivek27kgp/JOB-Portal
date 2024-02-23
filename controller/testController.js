export const testPostController = (req, res) => {
  const { name } = req.body;
  res.status(200).end(`Your name is ${name}`);
};

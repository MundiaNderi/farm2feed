const express = require("express");
const orderRoutes = require("./routes/orderRoutes");

const app = express();

app.use(express.json());

app.use(orderRoutes);

app.get("/", (req, res) => {
  res.json({
    message: "Farm2Feed Order Processing API",
  });
});

const PORT = process.env.PORT || 3000;

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

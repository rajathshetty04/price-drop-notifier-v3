const express = require("express");
const checkProductDetails = require("./controllers/checkProductDetails");
const app = express();

app.use(express.json());
app.use(express.static("./public"));

app.post("/api/v1/getProductDetails",async (req, res) => {
  console.log(req.body);
  const { productLink, targetPrice } = req.body;

  const productDetails =await checkProductDetails(productLink);

  res.json({
    status: true,
    product: {...productDetails,targetPrice: targetPrice}
  });
});

const port = 3000;
app.listen(port, () => {
  console.log(`Server is running on ${port}`);
});

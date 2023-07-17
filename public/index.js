const setLoadingAnimation = () => {
  document.querySelector(".product").innerHTML = `<span class="loader"></span>`;
};

const getProductDetails = async (productLink, targetPrice) => {
  console.log(productLink, targetPrice);

  const options = {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productLink: productLink,
      targetPrice: targetPrice,
    }),
  };

  try {
    const result = await fetch("/api/v1/getProductDetails", options).then(
      (res) => res.json()
    );
    return result;
  } catch (error) {
    console.error(error);
    return {
      status: false,
      product: {
        name: "No product found",
        currentPrice: 0,
      },
    };
  }
};

const setProductDetails = (productDetails) => {
  const { status } = productDetails;

  if (status) {
    const { name, currentPrice, targetPrice } = productDetails.product;

    document.querySelector(
      ".product"
    ).innerHTML = `<div class="">Poduct Name : <b>${name}</b></div>
    <div class="">Current Price : <b>${currentPrice}</b></div>
    <div class="">Target Price : <b>${targetPrice}</b></div>
    <button class="btn">Notify Me</button>`;
  } else {
    document.querySelector(
      ".product"
    ).innerHTML = `<div style="color: #ac0606;">We're sorry, but we couldn't find the product.</div>`;
  }

  console.log(productDetails);
};

document.querySelector("#searchBtn").addEventListener("click", async () => {
  const productLink = document.querySelector(".productLink").value;
  const targetPrice = document.querySelector(".targetPrice").value;

  if (productLink && targetPrice) {
    setLoadingAnimation();
    const productDetails = await getProductDetails(productLink, targetPrice);
    setProductDetails(productDetails);
  } else {
    alert("Please enter both Product Link and Target Price");
  }
});

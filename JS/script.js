let productList = document.getElementById("list");

const listProducts = (event) => {
  event.preventDefault();
  let productsDiv = document.getElementById("data");
  let productForm = document.getElementById("myForm");

  productsDiv.innerHTML = "";
  fetch("http://localhost:3000/getProduct")
    .then((res) => res.json())
    .then((data) => {
      data.forEach((product, i) => {
        productsDiv.innerHTML += `
               <div class="product-item">
                  
                  <div class="col-2">${product.ID}</div>
                  <div class="col-2">${product.product_name}</div>
                  <div class="col-2">${product.starting_price}</div>
                </div>
                <hr>
                `;
      });
    })
    .catch((error) => {
      console.error("Error fetching products:", error);
    });
productForm.classList.add("hidden");
//formContainer.classList.add("hidden");
}

productList.addEventListener("click", listProducts);

//<div class="col-2">Product ID</div>
                  // <div class="col-2">Product Name</div>
                  // <div class="col-2">Starting Price</div>
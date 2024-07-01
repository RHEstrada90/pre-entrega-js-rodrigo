// Constantes y DOM

const btnCart = document.querySelector(".container-cart-icon");
const containerCartProducts = document.querySelector(
  ".container-cart-products"
);
const cartInfo = document.querySelector(".cart-product");
const rowProduct = document.querySelector(".row-product");
const productsList = document.querySelector(".container-items");
const valorTotal = document.querySelector(".total-pagar");
const countProducts = document.querySelector("#contador-productos");
const cartEmpty = document.querySelector(".cart-empty");
const cartTotal = document.querySelector(".cart-total");
const buttons = document.querySelector(".btn-add-cart");

let allProducts = [];

// Icono carrito

btnCart.addEventListener("click", () => {
  containerCartProducts.classList.toggle("hidden-cart");
});

// Añadir al carrito

productsList.addEventListener("click", (e) => {
  if (e.target.classList.contains("btn-add-cart")) {
    const product = e.target.parentElement;
    Toastify({
      text: "Producto añadido",
      style: {
        background:
          "linear-gradient(to right, rgba(175, 142, 102, 1) 0%, rgba(136, 67, 8, 1) 100%",
      },
      duration: 2000,
    }).showToast();
    const infoProduct = {
      quantity: 1,
      title: product.querySelector("h2").textContent,
      price: product.querySelector("p").textContent,
    };

    const exists = allProducts.some((item) => item.title === infoProduct.title);
    if (exists) {
      allProducts = allProducts.map((item) =>
        item.title === infoProduct.title
          ? { ...item, quantity: item.quantity + 1 }
          : item
      );
    } else {
      allProducts.push(infoProduct);
    }
    updateCart();
  }
});

// manejar carrito

rowProduct.addEventListener("click", (e) => {
  if (e.target.classList.contains("icon-close")) {
    const title = e.target.parentElement.querySelector("p").textContent;
    allProducts = allProducts.filter((item) => item.title !== title);
    updateCart();
  }
});

// actualizar carrito

const updateCart = () => {
  cartEmpty.classList.toggle("hidden", allProducts.length > 0);
  rowProduct.classList.toggle("hidden", allProducts.length === 0);
  cartTotal.classList.toggle("hidden", allProducts.length === 0);

  rowProduct.innerHTML = allProducts
    .map(
      (product) => `
    <div class="cart-product">
      <div class="info-cart-product">
        <span class="cantidad-producto-carrito">${product.quantity}</span>
        <p class="titulo-producto-carrito">${product.title}</p>
        <span class="precio-producto-carrito">${product.price}</span>
      </div>
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="icon-close">
        <path stroke-linecap="round" stroke-linejoin="round" d="M6 18L18 6M6 6l12 12"/>
      </svg>
    </div>
  `
    )
    .join("");

  const total = allProducts.reduce(
    (sum, item) => sum + item.quantity * parseFloat(item.price.slice(1)),
    0
  );
  const totalQuantity = allProducts.reduce(
    (sum, item) => sum + item.quantity,
    0
  );

  valorTotal.innerText = `$${total}`;
  countProducts.innerText = totalQuantity;
};

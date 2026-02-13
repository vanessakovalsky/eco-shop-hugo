let cart = JSON.parse(localStorage.getItem("cart")) || [];

function addToCart(id, name, price) {
  cart.push({ id, name, price, qty: 1 });
  localStorage.setItem("cart", JSON.stringify(cart));
  updateCartCount();
}

function updateCartCount() {
  document.getElementById("cart-count").innerText = cart.length;
}

updateCartCount();

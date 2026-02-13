document.addEventListener("DOMContentLoaded", function () {

  let cart = JSON.parse(localStorage.getItem("cart")) || [];

  function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
  }

  function updateCartCount() {
    const countElement = document.getElementById("cart-count");
    if (countElement) {
      countElement.textContent = cart.reduce((acc, item) => acc + item.qty, 0);
    }
  }

  window.addToCart = function (id, name, price) {
    const existing = cart.find(p => p.id === id);

    if (existing) {
      existing.qty += 1;
    } else {
      cart.push({ id, name, price, qty: 1 });
    }

    saveCart();
    updateCartCount();

    alert("Produit ajouté au panier 🛒");
  };

  updateCartCount();
});

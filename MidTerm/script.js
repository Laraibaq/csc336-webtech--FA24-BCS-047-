// N = 47, so the limit is (47 mod 4) + 2 = 5
const MAX_PER_PRODUCT = 5;

let cart = [];

const cartLink = document.querySelector(".cart-link");
const cartCount = document.querySelector("#cart-count");
const miniCart = document.querySelector("#mini-cart");
const cartItems = document.querySelector("#cart-items");
const cartTotal = document.querySelector("#cart-total");
const addButtons = document.querySelectorAll(".add-to-cart-btn");

// "Rs. 2,000" -> 2000
function parsePrice(text) {
  return Number(text.replace(/[^0-9]/g, ""));
}

function getCardName(button) {
  const card = button.closest(".product-card");
  return card.querySelector(".product-card-name").textContent.trim();
}

function render() {
  // 1. badge
  cartCount.textContent = cart.length;

  // 2. list in the mini cart
  cartItems.innerHTML = "";
  if (cart.length === 0) {
    const empty = document.createElement("li");
    empty.textContent = "Your cart is empty";
    cartItems.appendChild(empty);
  }
  cart.forEach(function (item, index) {
    const li = document.createElement("li");

    const label = document.createElement("span");
    label.textContent = item.name + " - Rs. " + item.price.toLocaleString("en-US");

    const removeBtn = document.createElement("button");
    removeBtn.type = "button";
    removeBtn.className = "remove-btn";
    removeBtn.textContent = "Remove";
    removeBtn.addEventListener("click", function () {
      cart.splice(index, 1);
      render();
    });

    li.appendChild(label);
    li.appendChild(removeBtn);
    cartItems.appendChild(li);
  });

  // 3. total with reduce()
  const total = cart.reduce(function (sum, item) {
    return sum + item.price;
  }, 0);
  cartTotal.textContent = "Rs. " + total.toLocaleString("en-US");

  // 4. limit: enable or disable each Add to Cart button
  addButtons.forEach(function (button) {
    const name = getCardName(button);
    const timesAdded = cart.filter(function (item) {
      return item.name === name;
    }).length;

    if (timesAdded >= MAX_PER_PRODUCT) {
      button.textContent = "Limit reached";
      button.disabled = true;
    } else {
      button.textContent = "Add to Cart";
      button.disabled = false;
    }
  });
}

// Add to Cart buttons
addButtons.forEach(function (button) {
  button.addEventListener("click", function () {
    const card = button.closest(".product-card");
    const name = card.querySelector(".product-card-name").textContent.trim();
    const price = parsePrice(card.querySelector(".product-card-price").textContent);

    cart.push({ name: name, price: price });
    render();
  });
});

// Cart icon opens and closes the mini cart
cartLink.addEventListener("click", function (event) {
  event.preventDefault();
  miniCart.hidden = !miniCart.hidden;
});

render();
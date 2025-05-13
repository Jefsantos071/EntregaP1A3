
const foods = [
  {
    id: 1,
    name: "Pizza Margherita",
    description: "Molho de tomate, mussarela e manjericão fresco.",
    price: 35.90,
    image: "https://img.freepik.com/fotos-premium/pizza-com-frutos-do-mar-e-queijo-vista-superior-em-um-fundo-de-madeira-copie-o-espaco_187166-63986.jpg"
  },

  {
    id: 2,
    name: "Hambúrguer Clássico",
    description: "Hambúrguer bovino, queijo, alface, tomate e maionese.",
    price: 29.90,
    image: "https://img.freepik.com/fotos-premium/banner-publicitario-de-fast-food-de-hamburguer-com-cheeseburger-com-espaco-de-copia-para-a-sua-marca_742418-17057.jpg"
  },
  {
    id: 3,
    name: "Sushi Combo",
    description: "8 peças variadas de sushi fresco.",
    price: 49.50,
    image: "https://img.freepik.com/fotos-premium/close-up-sushi-comida-japonesa-deliciosa-sobre-fundo-escuro-com-espaco-de-copia_130265-15763.jpg"
  },
  {
    id: 4,
    name: "Salada Caesar",
    description: "Alface, croutons, parmesão e molho Caesar caseiro.",
    price: 22.00,
    image: "https://img.freepik.com/fotos-premium/vista-superior-de-uma-salada-caesar-em-um-prato-preto-contra-um-fundo-preto_844466-414.jpg"
  },
  {
    id: 5,
    name: "Lasanha à Bolonhesa",
    description: "Camadas de massa, molho bolonhesa e queijo gratinado.",
    price: 39.90,
    image: "https://img.freepik.com/fotos-premium/deliciosa-pasta-de-lasanha-assada-com-molho-de-carne-sal-especiarias-e-ervas-sobre-um-fundo-de-concreto-escuro_73989-70555.jpg"
  }
];

let cart = {};

const foodListEl = document.getElementById("food-list");
const cartItemsEl = document.getElementById("cart-items");
const cartTotalEl = document.getElementById("cart-total");
const orderBtnEl = document.getElementById("order-btn");
const successMessageEl = document.getElementById("success-message");

function renderFoodList() {
  foodListEl.innerHTML = "";
  foods.forEach(food => {
    const foodItem = document.createElement("div");
    foodItem.className = "food-item";
    foodItem.innerHTML = `
        <img src="${food.image}" alt="${food.name}" class="food-image" />
        <div class="title">${food.name}</div>
        <div class="description">${food.description}</div>
        <div class="price">R$ ${food.price.toFixed(2).replace(".", ",")}</div>
        <button aria-label="Adicionar ${food.name} ao carrinho">Adicionar</button>
      `;
    const btn = foodItem.querySelector("button");
    btn.addEventListener("click", () => addToCart(food.id));
    foodListEl.appendChild(foodItem);
  });
}

function addToCart(foodId) {
  if (cart[foodId]) {
    cart[foodId].qty++;
  } else {
    const food = foods.find(f => f.id === foodId);
    cart[foodId] = { ...food, qty: 1 };
  }
  renderCart();
}

function removeFromCart(foodId) {
  if (!cart[foodId]) return;
  cart[foodId].qty--;
  if (cart[foodId].qty <= 0) {
    delete cart[foodId];
  }
  renderCart();
}

function renderCart() {
  cartItemsEl.innerHTML = "";
  const itemsIds = Object.keys(cart);
  if (itemsIds.length === 0) {
    cartItemsEl.innerHTML = "<p>Seu carrinho está vazio.</p>";
    cartTotalEl.textContent = "Total: R$ 0,00";
    orderBtnEl.disabled = true;
    successMessageEl.style.display = "none";
    return;
  }
  let total = 0;
  itemsIds.forEach(id => {
    const item = cart[id];
    total += item.price * item.qty;
    const cartItem = document.createElement("div");
    cartItem.className = "cart-item";
    cartItem.innerHTML = `
        <div class="cart-item-name">${item.name}</div>
        <div class="cart-item-qty" aria-label="Quantidade de ${item.name}">
          <button aria-label="Remover 1 unidade de ${item.name}">-</button>
          <span>${item.qty}</span>
          <button aria-label="Adicionar 1 unidade de ${item.name}">+</button>
        </div>
        <div class="cart-item-price">R$ ${(item.price * item.qty).toFixed(2).replace(".", ",")}</div>
      `;
    const btns = cartItem.querySelectorAll("button");
    btns[0].addEventListener("click", () => removeFromCart(item.id));
    btns[1].addEventListener("click", () => addToCart(item.id));
    cartItemsEl.appendChild(cartItem);
  });
  cartTotalEl.textContent = `Total: R$ ${total.toFixed(2).replace(".", ",")}`;
  orderBtnEl.disabled = false;
  successMessageEl.style.display = "none";
}

function finalizeOrder() {
  if (Object.keys(cart).length === 0) return;
  cart = {};
  renderCart();
  successMessageEl.style.display = "block";
  setTimeout(() => {
    successMessageEl.style.display = "none";
  }, 4000);
}

orderBtnEl.addEventListener("click", finalizeOrder);

renderFoodList();
renderCart();
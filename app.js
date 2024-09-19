const apiURL = 'https://fakestoreapi.com/products';
const productContainer = document.getElementById('products');
const cartItems = document.getElementById('cart-items');
const cartTotal = document.getElementById('cart-total');
let cart = [];

// Obtener los productos de la API
const getProducts = async () => {
  try {
    const response = await fetch(apiURL);
    const data = await response.json();
    renderProducts(data);
  } catch (error) {
    console.error("Error al obtener productos: ", error);
  }
};

// Renderizar productos en la página
const renderProducts = (products) => {
  products.forEach((product) => {
    const productElement = document.createElement('div');
    productElement.classList.add('product');

    productElement.innerHTML = `
      <img src="${product.image}" alt="${product.title}" />
      <h3>${product.title}</h3>
      <p>$${product.price}</p>
      <button onclick="addToCart(${product.id}, '${product.title}', ${product.price})">Agregar al Carrito</button>
    `;

    productContainer.appendChild(productElement);
  });
};

// Agregar producto al carrito
const addToCart = (id, name, price) => {
  const productInCart = cart.find((item) => item.id === id);

  if (productInCart) {
    productInCart.quantity++;
  } else {
    cart.push({ id, name, price, quantity: 1 });
  }

  renderCart();
};

// Renderizar el carrito en la página
const renderCart = () => {
  cartItems.innerHTML = ''; // Limpiar el carrito
  let total = 0;

  cart.forEach((item) => {
    total += item.price * item.quantity;
    const cartItem = document.createElement('li');
    cartItem.innerHTML = `
      <span>${item.name}</span>
      <span>$${item.price} x ${item.quantity}</span>
    `;
    cartItems.appendChild(cartItem);
  });

  cartTotal.textContent = `Total: $${total.toFixed(2)}`;
};

// Vaciar el carrito
document.getElementById('clear-cart').addEventListener('click', () => {
  cart = [];
  renderCart();
});

// Inicializar los productos en la página
getProducts();

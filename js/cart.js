let cart = JSON.parse(localStorage.getItem('cart')) || [];
const cartCount = document.getElementById('cartCount');

function updateCartCount() {
  if (cartCount) cartCount.innerText = cart.length;
}
updateCartCount();

function addToCart(id) {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((p) => {
      cart.push(p);
      localStorage.setItem('cart', JSON.stringify(cart));
      updateCartCount();
      alert('Added to cart');
    });
}

function openCart() {
  document.getElementById('cartModal').classList.remove('hidden');
  renderCart();
}

function closeCart() {
  document.getElementById('cartModal').classList.add('hidden');
}

function renderCart() {
  const items = document.getElementById('cartItems');
  const total = document.getElementById('totalPrice');
  items.innerHTML = '';
  let sum = 0;

  cart.forEach((p, i) => {
    sum += p.price;
    items.innerHTML += `
      <div class="flex justify-between">
        <span>${p.title.slice(0, 20)}...</span>
        <span>$${p.price}</span>
      </div>
    `;
  });

  total.innerText = '$' + sum.toFixed(2);
}

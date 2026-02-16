const productsDiv = document.getElementById('products');
const categoryDiv = document.getElementById('categories');
const loader = document.getElementById('loader');

function renderProducts(data) {
  productsDiv.innerHTML = '';

  data.forEach((p) => {
    productsDiv.innerHTML += `
      <div class="bg-white p-4 rounded shadow">
        <img src="${p.image}" class="h-40 mx-auto object-contain"/>

        <span class="text-xs bg-gray-200 px-2 py-1 rounded">
          ${p.category}
        </span>

        <h3 class="mt-2 font-semibold">
          ${p.title.length > 35 ? p.title.slice(0, 35) + '...' : p.title}
        </h3>

        <p class="text-indigo-600 font-bold">$${p.price}</p>
        <p class="text-sm"> <i class="fa-solid fa-star text-orange-500"></i> ${p.rating.rate}</p>

        <div class="flex gap-2 mt-3">
          <button
            onclick="openDetails(${p.id})"
            class="flex-1 border py-1 rounded text-sm">
            Details
          </button>

          <button
            onclick="addToCart(${p.id})"
            class="flex-1 bg-indigo-600 text-white py-1 rounded text-sm">
            Add
          </button>
        </div>
      </div>
    `;
  });
}


function loadAll() {
  loader.classList.remove('hidden');
  fetch('https://fakestoreapi.com/products')
    .then((res) => res.json())
    .then((data) => {
      renderProducts(data);
      loader.classList.add('hidden');
    });
}

fetch('https://fakestoreapi.com/products/categories')
  .then((res) => res.json())
  .then((categories) => {
    categoryDiv.innerHTML = `<button onclick="loadAll()"
      class="border px-3 py-1 rounded bg-indigo-600 text-white">All</button>`;

    categories.forEach((cat) => {
      categoryDiv.innerHTML += `
        <button onclick="loadCategory('${cat}')"
          class="border px-3 py-1 rounded">${cat}</button>
      `;
    });
  });

function loadCategory(cat) {
  loader.classList.remove('hidden');
  fetch(`https://fakestoreapi.com/products/category/${cat}`)
    .then((res) => res.json())
    .then((data) => {
      renderProducts(data);
      loader.classList.add('hidden');
    });
}

loadAll();


function openDetails(id) {
  fetch(`https://fakestoreapi.com/products/${id}`)
    .then((res) => res.json())
    .then((p) => {
      document.getElementById('modalImage').src = p.image;
      document.getElementById('modalTitle').innerText = p.title;
      document.getElementById('modalDescription').innerText = p.description;
      document.getElementById('modalPrice').innerText = '$' + p.price;
      document.getElementById('modalRating').innerHTML =
        '<i class="fa-solid fa-star text-orange-500"></i> ' + p.rating.rate;

      document.getElementById('modalAddToCart').onclick = () => addToCart(p.id);

      document.getElementById('detailsModal').classList.remove('hidden');
    });
}

function closeDetails() {
  document.getElementById('detailsModal').classList.add('hidden');
}

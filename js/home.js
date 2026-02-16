fetch('https://fakestoreapi.com/products')
  .then((res) => res.json())
  .then((data) => {
    const topRated = data.slice(0, 3);

    const container = document.getElementById('trendingProducts');

    topRated.forEach((product) => {
      container.innerHTML += `
        <div class="bg-white p-4 rounded-lg shadow">
          
          <img src="${product.image}"
            class="h-48 mx-auto object-contain mb-4" />

          <span class="text-xs bg-indigo-100 text-indigo-600 px-2 py-1 rounded">
            ${product.category}
          </span>

          <h3 class="font-semibold mt-3">
            ${product.title}
          </h3>

          <div class="flex justify-between items-center mt-2">
            <p class="font-bold">$${product.price}</p>
            <p class="text-sm text-yellow-500">
               <i class="fa-solid fa-star text-orange-500"></i>  ${product.rating.rate} (${product.rating.count})
            </p>
          </div>

          <div class="flex gap-2 mt-4">
            <button
              onclick="openDetails(${product.id})"
              class="flex-1 border rounded py-1 text-sm">
              Details
            </button>
            <button
              onclick="addToCart(${product.id})"
              class="flex-1 bg-indigo-600 text-white rounded py-1 text-sm">
              Add
            </button>
          </div>

        </div>
      `;
    });
  });

fetch('https://fakestoreapi.com/products')
  .then((res) => res.json())
  .then((data) => {
    const top3 = data.sort((a, b) => b.rating.rate - a.rating.rate).slice(0, 3);
    const div = document.getElementById('trending');

    top3.forEach((p) => {
      div.innerHTML += `
        <div class="bg-white p-4 rounded shadow">
          <img src="${p.image}" class="h-40 mx-auto object-contain"/>
          <h3 class="mt-3 font-semibold">${p.title.slice(0, 35)}...</h3>
          <p class="text-indigo-600 font-bold">$${p.price}</p>
          <p> <i class="fa-solid fa-star text-orange-500"></i> ${p.rating.rate}</p>
        </div>
      `;
    });
  });

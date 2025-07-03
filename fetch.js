const url = "https://fakestoreapi.com/products/";
const productContainer = document.getElementById("product-container");
var products;
async function getData() {
  // const container = document.querySelector(".container");
  try {
    const response = await fetch(url);
    products = await response.json();
    displayData(products);
  } catch (error) {
    productContainer.innerHTML = `<p class="text-red-600">Erreur : ${error.message}</p>`;
  }
}

getData();
function displayData(products1) {
  productContainer.innerHTML = "";
  products1.forEach((product) => {
    const element = document.createElement("div");
    element.className =
      "product bg-white rounded shadow-lg shadow-sky-400/20 border-2 border-blue-600/20 p-4";
    const image = document.createElement("img");
    image.src = product.image;
    image.alt = product.title;
    image.className = "mb-2 rounded block mx-auto w-[150px] h-[180px]";

    const title = document.createElement("h2");
    title.className =
      "text-l font-bold mb-2 text-sky-600 h-11 overflow-hidden text-ellipsis";
    title.textContent = product.title;

    const desc = document.createElement("p");
    desc.className =
      "description text-sm text-gray-600 mt-2 overflow-hidden max-h-16 transition-all duration-300";
    desc.textContent = product.description;

    const btn = document.createElement("button");
    btn.className = "toggle-btn text-white mt-2 text-sm bg-sky-600 rounded p-1";
    btn.textContent = "Show more";

    const price = document.createElement("p");
    price.className = "text-yellow-500 mt-1 font-bold";
    price.innerHTML = `<strong>Prix :</strong> $${product.price}`;

    let expanded = false;
    btn.addEventListener("click", () => {
      expanded = !expanded;
      desc.classList.toggle("max-h-16", !expanded);
      title.classList.toggle("h-11", !expanded);
      btn.textContent = expanded ? "Show less" : "Show more";
    });

    element.appendChild(image);
    element.appendChild(title);
    element.appendChild(desc);
    element.appendChild(btn);
    element.appendChild(price);

    productContainer.appendChild(element);
  });
}

const category = document.getElementById("category-select");
category.addEventListener("change", function () {
  const selectedCategory = this.value;
  const filtredData =
    selectedCategory === "all"
      ? products
      : products.filter((product) => product.category === selectedCategory);
  console.log(filtredData);
  displayData(filtredData);
});

// Fetch products from backend.
const loadProduct = async () => {
    try {
        const response = await fetch('/products');
        const products = await response.json();

        const productList = document.getElementById('productList');
        const items = products.map(p => `<li>${p.name} - ${p.price}</li>`);
        productList.innerHTML = items.join("");
    } catch (error) { console.error("Error Loading Products:", error); };
};

loadProduct();
import { fetchProducts } from "./dataService.js";

import {
    setProducts,
    renderFeaturedProducts,
    renderCatalog
} from "./catalog.js";

document.addEventListener("DOMContentLoaded", async () => {

    const products =
        await fetchProducts();

    setProducts(products);

    renderFeaturedProducts();

    renderCatalog();

});
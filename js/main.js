import { fetchProducts } from "./dataService.js";

import {
    setProducts,
    renderFeaturedProducts,
    renderCatalog,
    initializeModal
} 

from "./catalog.js";
import { loadGallery }
from "./gallery.js";
import { loadRecipe }
from "./recipe.js";


document.addEventListener("DOMContentLoaded", async () => {

    const products =
        await fetchProducts();

    setProducts(products);

    renderFeaturedProducts();

    renderCatalog();
    initializeModal();
    await loadGallery();
    await loadRecipe();
    
    const searchInput =
    document.querySelector(
        "#searchInput"
    
    );
    const modal =
    document.querySelector(
        "#productModal"
    );

const closeModal =
    document.querySelector(
        "#closeModal"
    );

closeModal.addEventListener(
    "click",
    () => modal.close()
);

    searchInput.addEventListener(
    "input",
    event => {

        renderCatalog(
            event.target.value
        );
    

    }
);

});
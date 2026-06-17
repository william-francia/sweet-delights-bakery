let products = [];
export function initializeModal() {

    document.addEventListener(
        "click",
        event => {

            const button =
                event.target.closest(
                    ".view-product-btn"
                );

            if (!button) return;

            const productId =
                Number(
                    button.dataset.id
                );

            const product =
                products.find(
                    p => p.id === productId
                );

            openModal(product);
        }
    );
}
import {
    toggleFavorite,
    isFavorite,
    getFavoriteProducts
}
from "./favorites.js";

export function setProducts(data) {
    products = data;
}

export function getProducts() {
    return products;
}

export function renderFeaturedProducts() {

    const container =
        document.querySelector("#featuredProductsContainer");

    if (!container) return;

    container.innerHTML = products
        .slice(0, 3)
        .map(createCard)
        .join("");
}

export function renderCatalog(searchTerm = "") {

    const container =
        document.querySelector("#catalogContainer");

    if (!container) return;

    const filteredProducts =
    products.filter(product =>
        product.name
            .toLowerCase()
            .includes(
                searchTerm.toLowerCase()
            )
    );

const categories =
    [...new Set(
        filteredProducts.map(
            product => product.category
        )
    )];

    container.innerHTML = categories
        .map(category =>
    createCategorySection(
        category,
        filteredProducts
    )
)
        .join("");

    initializeCarousels();
    initializeFavorites();
    renderFavorites();
}

function createCard(product) {

    return `
        <article class="product-card">

            <img
                src="${product.image}"
                alt="${product.name}"
                loading="lazy"
            >

            <div class="product-card-content">

                <h3>${product.name}</h3>

                <p>${product.description}</p>

                <span class="price">
                    Bs ${product.price}
                </span>

                <div class="product-actions">

    <button
    class="favorite-btn
    ${isFavorite(product.id)
        ? "active"
        : ""}"
    data-id="${product.id}">
    🤍
</button>
    

    <button
        class="view-product-btn"
        data-id="${product.id}">
        View Details
    </button>

</div>

            </div>

        </article>
    `;
}
function createCategorySection(
    category,
    filteredProducts
) {

    const categoryProducts =
    filteredProducts.filter(
        product => product.category === category
    );

    return `

        <section class="category-section">

            <div class="category-header">

                <h3>${category}</h3>

                <div class="carousel-controls">

                    <button class="carousel-btn prev">
                        ❮
                    </button>

                    <button class="carousel-btn next">
                        ❯
                    </button>

                </div>

            </div>

            <div class="carousel-wrapper">

                <div class="carousel-track">

                    ${categoryProducts
                        .map(createCard)
                        .join("")}

                </div>

            </div>

        </section>

    `;
}
function initializeCarousels() {

    const sections =
        document.querySelectorAll(
            ".category-section"
        );

    sections.forEach(section => {

        const track =
            section.querySelector(
                ".carousel-track"
            );

        const prevBtn =
            section.querySelector(
                ".prev"
            );

        const nextBtn =
            section.querySelector(
                ".next"
            );

        let currentIndex = 0;

        const cards =
            track.querySelectorAll(
                ".product-card"
            );

        const visibleCards = 3;

        const maxIndex =
            Math.max(
                cards.length - visibleCards,
                0
            );

        nextBtn.addEventListener(
            "click",
            () => {

                if (currentIndex < maxIndex) {

                    currentIndex++;

                    updateCarousel();
                }
            }
        );

        prevBtn.addEventListener(
            "click",
            () => {

                if (currentIndex > 0) {

                    currentIndex--;

                    updateCarousel();
                }
            }
        );

        function updateCarousel() {

            const cardWidth =
                cards[0].offsetWidth + 20;

            track.style.transform =
                `translateX(-${
                    currentIndex * cardWidth
                }px)`;
        }
    });
}
function initializeFavorites() {

    const buttons =
        document.querySelectorAll(
            ".favorite-btn"
        );

    buttons.forEach(button => {

        button.addEventListener(
            "click",
            () => {

                const productId =
                    Number(
                        button.dataset.id
                    );

                toggleFavorite(productId);

                button.classList.toggle(
                    "active"
                );
                renderFavorites();
            }
        );
    });
}
export function renderFavorites() {

    const section =
        document.querySelector(
            "#favorites"
        );

    const container =
        document.querySelector(
            "#favoritesContainer"
        );

    if (
        !section ||
        !container
    ) return;

    const favoriteProducts =
        getFavoriteProducts(
            products
        );

    if (
        favoriteProducts.length === 0
    ) {

        section.style.display =
            "none";

        return;
    }

    section.style.display =
        "block";

    container.innerHTML =
        favoriteProducts
            .map(createCard)
            .join("");
}
function openModal(product) {

    const modal =
        document.querySelector(
            "#productModal"
        );

    const content =
        document.querySelector(
            "#modalContent"
        );

    content.innerHTML = `

        <img
            src="${product.image}"
            alt="${product.name}"
            class="modal-image"
        >

        <h2>
            ${product.name}
        </h2>

        <p>
            ${product.description}
        </p>

        <h3>
            Bs ${product.price}
        </h3>

        <p>
            Category:
            ${product.category}
        </p>

    `;

    modal.showModal();
}

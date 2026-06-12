let products = [];

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

export function renderCatalog() {

    const container =
        document.querySelector("#catalogContainer");

    if (!container) return;

    const categories =
        [...new Set(products.map(
            product => product.category
        ))];

    container.innerHTML = categories
        .map(createCategorySection)
        .join("");

    initializeCarousels();
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

                <button
                    class="view-product-btn"
                    data-id="${product.id}">
                    View Details
                </button>

            </div>

        </article>
    `;
}
function createCategorySection(category) {

    const categoryProducts =
        products.filter(
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
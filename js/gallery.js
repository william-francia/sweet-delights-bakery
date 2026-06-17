// js/gallery.js

export async function loadGallery() {

    const container =
        document.querySelector(
            "#galleryContainer"
        );

    if (!container) return;

    try {

        const response =
            await fetch(
                "https://www.themealdb.com/api/json/v1/1/filter.php?c=Dessert"
            );

        const data =
            await response.json();

        const desserts =
            data.meals.slice(0, 8);

        container.innerHTML =
            desserts.map(dessert => `
                <article class="gallery-card">

                    <img
                        src="${dessert.strMealThumb}"
                        alt="${dessert.strMeal}"
                        loading="lazy"
                    >

                    <h3>
                        ${dessert.strMeal}
                    </h3>

                </article>
            `).join("");

    }

    catch (error) {

        console.error(
            "Gallery API Error:",
            error
        );
    }
}
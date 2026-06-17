export async function loadRecipe() {

    const container =
        document.querySelector(
            "#recipeContainer"
        );

    if (!container) return;

    try {

        const response =
            await fetch(
                "https://www.themealdb.com/api/json/v1/1/random.php"
            );

        const data =
            await response.json();

        const recipe =
            data.meals[0];

        container.innerHTML = `

            <article class="recipe-card">

                <img
                    src="${recipe.strMealThumb}"
                    alt="${recipe.strMeal}"
                >

                <div class="recipe-content">

                    <h3>
                        ${recipe.strMeal}
                    </h3>

                    <p>
                        ${recipe.strInstructions
                            .substring(0, 300)}...
                    </p>

                    <a
                        href="${recipe.strSource || '#'}"
                        target="_blank"
                        class="recipe-btn"
                    >
                        View Full Recipe
                    </a>

                </div>

            </article>

        `;
    }

    catch (error) {

        console.error(
            "Recipe API Error:",
            error
        );
    }
}
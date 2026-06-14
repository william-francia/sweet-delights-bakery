const STORAGE_KEY = "favoriteProducts";

export function getFavorites() {

    return JSON.parse(
        localStorage.getItem(STORAGE_KEY)
    ) || [];
}

export function toggleFavorite(productId) {

    let favorites = getFavorites();

    if (favorites.includes(productId)) {

        favorites = favorites.filter(
            id => id !== productId
        );

    } else {

        favorites.push(productId);
    }

    localStorage.setItem(
        STORAGE_KEY,
        JSON.stringify(favorites)
    );
}

export function isFavorite(productId) {

    return getFavorites()
        .includes(productId);
}
export function getFavoriteProducts(
    products
) {

    const favorites =
        getFavorites();

    return products.filter(
        product =>
            favorites.includes(
                product.id
            )
    );
}
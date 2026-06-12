export async function fetchProducts() {

    try {

        const response =
            await fetch("./data/products.json");

        if (!response.ok) {
            throw new Error("Unable to load products.");
        }

        return await response.json();

    } catch (error) {

        console.error(error);

        return [];

    }

}
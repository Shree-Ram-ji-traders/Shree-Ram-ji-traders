const db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);

async function loadProducts() {

    const { data, error } = await db
        .from("products2")
        .select("*");

    if (error) {
        console.log(error);
        return;
    }

    const productsDiv = document.getElementById("products");
    productsDiv.innerHTML = "";

    data.forEach(product => {

        productsDiv.innerHTML += `
            <div class="product">
                <a href="${product.meesho_link}" target="_blank">
                    <img src="${product.image}" width="200">
                    <h3>${product.name}</h3>
                </a>
            </div>
        `;

    });

}

loadProducts();
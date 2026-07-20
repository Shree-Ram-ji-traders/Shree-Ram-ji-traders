const db = window.supabase.createClient(
    SUPABASE_URL,
    SUPABASE_PUBLISHABLE_KEY
);
const uploadBtn = document.getElementById("uploadBtn");

uploadBtn.addEventListener("click", async () => {

    const image = document.getElementById("image").files[0];
    const name = document.getElementById("productName").value;
    const meeshoLink = document.getElementById("meeshoLink").value;

    if (!image || !name || !meeshoLink) {
        alert("Please fill all fields.");
        return;
    }
   const formData = new FormData();
formData.append("file", image);
formData.append("upload_preset", CLOUDINARY_UPLOAD_PRESET);

const response = await fetch(
    `https://api.cloudinary.com/v1_1/${CLOUDINARY_CLOUD_NAME}/image/upload`,
    {
        method: "POST",
        body: formData
    }
);

const data = await response.json();

const { error } = await db
    .from("products2")
    .insert([
        {
            name: name,
            image: data.secure_url,
            meesho_link: meeshoLink
        }
    ]);

if (error) {
    alert("Error: " + error.message);
} else {
    alert("Product Added Successfully!");
}
});
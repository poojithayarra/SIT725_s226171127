fetch("/api/books")
.then(response => response.json())
.then(result => {
    const booksDiv = document.getElementById("books");
    const books = Array.isArray(result) ? result : (result.data || []);

    if (!books.length) {
        booksDiv.innerHTML = "<p>No books available right now.</p>";
        return;
    }

    books.forEach(book => {
        const card = document.createElement("div");
        card.className = "book-card";

        card.innerHTML = `
            <h2>${book.title}</h2>
            <p class="book-meta"><strong>Author:</strong> ${book.author} &nbsp;•&nbsp; <strong>Genre:</strong> ${book.genre}</p>
            <p class="hint">Click to read the summary</p>
            <p class="description">${book.summary}</p>
        `;

        card.classList.add("active");

        card.addEventListener("click", () => {
            card.classList.toggle("active");
        });

        booksDiv.appendChild(card);
    });
})
.catch(error => {
    console.log(error);
    document.getElementById("books").innerHTML = "<p>Unable to load books.</p>";
});
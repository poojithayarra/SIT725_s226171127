fetch("/api/books")
    .then(response => response.json())
    .then(result => {

        const booksDiv = document.getElementById("books");

        result.data.forEach(book => {

            const card = document.createElement("div");

            card.className = "book-card";

            let price = "Price unavailable";

            if (book.price) {
                if (typeof book.price === "object" && book.price.$numberDecimal) {
                    price = `$${book.price.$numberDecimal}`;
                } else {
                    price = `$${book.price}`;
                }
            }

            card.innerHTML = `
                <h2>${book.title}</h2>

                <p>
                    <strong>Author:</strong> ${book.author}
                </p>

                <p>
                    <strong>Genre:</strong> ${book.genre}
                </p>

                <p>
                    <strong>Year:</strong> ${book.year}
                </p>

                <p>
                    <strong>Price:</strong> ${price}
                </p>

                <p class="summary">
                    ${book.summary}
                </p>
            `;

            booksDiv.appendChild(card);
        });

    })
    .catch(error => {
        console.error("Error loading books:", error);
    });
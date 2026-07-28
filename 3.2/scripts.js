const modal = document.getElementById("bookModal");
const modalImage = document.getElementById("modalImage");
const modalTitle = document.getElementById("modalTitle");
const modalAuthor = document.getElementById("modalAuthor");
const modalDescription = document.getElementById("modalDescription");
const closeButton = document.getElementById("closeModal");

const openModal = (title, author, image, description) => {
    modalImage.src = image;
    modalImage.alt = `${title} cover`;
    modalTitle.textContent = title;
    modalAuthor.textContent = `By ${author}`;
    modalDescription.textContent = description;
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
};

const closeModal = () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
};

document.querySelectorAll(".book-card").forEach((card) => {
    card.addEventListener("click", () => {
        openModal(card.dataset.title, card.dataset.author, card.dataset.image, card.dataset.description);
    });

    card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openModal(card.dataset.title, card.dataset.author, card.dataset.image, card.dataset.description);
        }
    });
});

closeButton.addEventListener("click", closeModal);

modal.addEventListener("click", (event) => {
    if (event.target === modal) {
        closeModal();
    }
});

document.addEventListener("keydown", (event) => {
    if (event.key === "Escape") {
        closeModal();
    }
});
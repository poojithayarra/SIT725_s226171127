const modal = document.getElementById("bookModal");
const servicesContainer = document.getElementById("servicesContainer");
const serviceForm = document.getElementById("serviceForm");
const formMessage = document.getElementById("formMessage");
const modalIcon = document.getElementById("modalIcon");
const modalTitle = document.getElementById("modalTitle");
const modalCategory = document.getElementById("modalCategory");
const modalLocation = document.getElementById("modalLocation");
const modalDescription = document.getElementById("modalDescription");
const closeButton = document.getElementById("closeModal");

const getServiceIcon = (category) => {
    const iconMap = {
        "Food Support": "🥫",
        "Mental Health": "💛",
        "Transport": "🚐",
        "Education": "📚",
        "Housing": "🏠",
        "Care": "🤝"
    };

    return iconMap[category] || "🤝";
};

const openModal = (title, category, location, description, icon) => {
    modalTitle.textContent = title;
    modalCategory.textContent = category;
    modalLocation.textContent = `Location: ${location}`;
    modalDescription.textContent = description;
    modalIcon.textContent = icon;
    modal.classList.add("active");
    modal.setAttribute("aria-hidden", "false");
};

const closeModal = () => {
    modal.classList.remove("active");
    modal.setAttribute("aria-hidden", "true");
};

const attachCardEvents = (card) => {
    card.addEventListener("click", () => {
        openModal(card.dataset.title, card.dataset.category, card.dataset.location, card.dataset.description, card.dataset.icon);
    });

    card.addEventListener("keydown", (event) => {
        if (event.key === "Enter" || event.key === " ") {
            event.preventDefault();
            openModal(card.dataset.title, card.dataset.category, card.dataset.location, card.dataset.description, card.dataset.icon);
        }
    });
};

const renderServices = (services) => {
    if (!servicesContainer) {
        return;
    }

    if (!services.length) {
        servicesContainer.innerHTML = '<p class="empty-state">No services are available yet.</p>';
        return;
    }

    servicesContainer.innerHTML = "";

    services.forEach((service) => {
        const card = document.createElement("article");
        card.className = "service-card";
        card.tabIndex = 0;
        card.dataset.title = service.serviceName;
        card.dataset.category = service.category;
        card.dataset.location = service.location;
        card.dataset.description = service.description;
        card.dataset.icon = getServiceIcon(service.category);

        card.innerHTML = `
            <div class="service-icon">${card.dataset.icon}</div>
            <div class="service-info">
                <h3>${service.serviceName}</h3>
                <p class="service-meta">${service.category} • ${service.location}</p>
                <p>${service.description}</p>
            </div>
        `;

        attachCardEvents(card);
        servicesContainer.appendChild(card);
    });
};

const loadServices = async () => {
    try {
        const response = await fetch("/api/services");
        const result = await response.json();
        renderServices(result.data || []);
    } catch (error) {
        console.error("Failed to load services:", error);
        if (servicesContainer) {
            servicesContainer.innerHTML = '<p class="empty-state">Unable to load services right now.</p>';
        }
    }
};

const submitService = async (event) => {
    event.preventDefault();

    const formData = new FormData(serviceForm);
    const service = Object.fromEntries(formData.entries());

    try {
        const response = await fetch("/api/services", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(service)
        });

        const result = await response.json();

        if (response.ok) {
            formMessage.textContent = "Service added successfully.";
            serviceForm.reset();
            await loadServices();
        } else {
            formMessage.textContent = result.message || "Unable to save service.";
        }
    } catch (error) {
        formMessage.textContent = "Something went wrong while saving.";
        console.error(error);
    }
};

serviceForm.addEventListener("submit", submitService);

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

loadServices();
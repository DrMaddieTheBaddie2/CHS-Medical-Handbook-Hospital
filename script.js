const searchInput = document.getElementById("searchInput");
const cards = Array.from(document.querySelectorAll(".card"));

if (searchInput) {
  searchInput.addEventListener("input", (event) => {
    const query = event.target.value.trim().toLowerCase();

    cards.forEach((card) => {
      if (!query) {
        card.classList.remove("hidden");
        return;
      }

      const label = card.dataset.label?.toLowerCase() || "";
      const match = label.includes(query);
      card.classList.toggle("hidden", !match);
    });
  });
}

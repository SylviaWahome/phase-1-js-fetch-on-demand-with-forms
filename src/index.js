// src/index.js
const init = () => {
  const form   = document.querySelector("form");
  const input  = document.querySelector("#searchByID");
  const title  = document.querySelector("#movieDetails h4");
  const summary = document.querySelector("#movieDetails p");

  form.addEventListener("submit", async (e) => {
    e.preventDefault();                     // stop page refresh
    const id = input.value.trim();          // grab & tidy user input
    if (!id) return;                        // ignore empty submits

    try {
      const res = await fetch(`http://localhost:3000/movies/${id}`);

      if (!res.ok) {                        // handles 404 / 500
        title.textContent   = "Movie not found";
        summary.textContent = "Double‑check the ID and try again.";
        return;
      }

      const data = await res.json();
      title.textContent   = data.title;
      summary.textContent = data.summary;
    } catch (err) {                         // network / server down
      title.textContent   = "Network error";
      summary.textContent = "Is json‑server running on port 3000?";
      console.error(err);
    } finally {
      input.value = "";                     // clear the box for next search
    }
  });
};

document.addEventListener("DOMContentLoaded", init);

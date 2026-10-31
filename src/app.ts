type MovieCategory = "Ficção Histórica" | "Animação" | "Documentário" | "Drama" | "Ação/Capoeira";

interface Movie {
  id: string;
  title: string;
  category: MovieCategory;
  year: number;
  watched: boolean;
  posterUrl?: string;
}

let movies: Movie[] = [
  {
    id: "1",
    title: "Besouro",
    category: "Ação/Capoeira",
    year: 2009,
    watched: true,
    posterUrl: "https://images.unsplash.com/photo-1518709268805-4e9042af9f23?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "2",
    title: "Uma História de Amor e Fúria",
    category: "Animação",
    year: 2013,
    watched: false,
    posterUrl: "https://images.unsplash.com/photo-1578632767115-351597cf2477?q=80&w=600&auto=format&fit=crop"
  },
  {
    id: "3",
    title: "Marighella",
    category: "Ficção Histórica",
    year: 2019,
    watched: true,
    posterUrl: "https://images.unsplash.com/photo-1485846234645-a62644f84728?q=80&w=600&auto=format&fit=crop"
  }
];

const movieForm = document.getElementById("movieForm") as HTMLFormElement | null;
const titleInput = document.getElementById("title") as HTMLInputElement | null;
const posterUrlInput = document.getElementById("posterUrl") as HTMLInputElement | null;
const categorySelect = document.getElementById("category") as HTMLSelectElement | null;
const yearInput = document.getElementById("year") as HTMLInputElement | null;
const watchedCheckbox = document.getElementById("watched") as HTMLInputElement | null;
const formError = document.getElementById("formError") as HTMLDivElement | null;

const searchInput = document.getElementById("searchInput") as HTMLInputElement | null;
const filterCategory = document.getElementById("filterCategory") as HTMLSelectElement | null;

const movieGrid = document.getElementById("movieGrid") as HTMLDivElement | null;
const emptyMessage = document.getElementById("emptyMessage") as HTMLDivElement | null;

const totalCountEl = document.getElementById("totalCount") as HTMLSpanElement | null;
const watchedCountEl = document.getElementById("watchedCount") as HTMLSpanElement | null;
const pendingCountEl = document.getElementById("pendingCount") as HTMLSpanElement | null;

function updateSummary(): void {
  const total = movies.length;
  const watched = movies.filter(m => m.watched).length;
  const pending = total - watched;

  if (totalCountEl) totalCountEl.textContent = total.toString();
  if (watchedCountEl) watchedCountEl.textContent = watched.toString();
  if (pendingCountEl) pendingCountEl.textContent = pending.toString();
}

function renderCatalog(): void {
  if (!movieGrid || !emptyMessage) return;

  const searchTerm: string = searchInput?.value.trim().toLowerCase() || "";
  const selectedCategory: string = filterCategory?.value || "TODAS";

  const filteredMovies: Movie[] = movies.filter(movie => {
    const matchesSearch = movie.title.toLowerCase().includes(searchTerm);
    const matchesCategory = selectedCategory === "TODAS" || movie.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  movieGrid.innerHTML = "";

  if (filteredMovies.length === 0) {
    movieGrid.style.display = "none";
    emptyMessage.style.display = "block";
    emptyMessage.textContent = movies.length === 0
      ? "Nenhuma obra cadastrada até o momento."
      : "Nenhum resultado encontrado para os filtros selecionados.";
  } else {
    movieGrid.style.display = "grid";
    emptyMessage.style.display = "none";

    filteredMovies.forEach(movie => {
      const card = document.createElement("div");
      card.className = "movie-card";

      const backgroundStyle = movie.posterUrl
        ? `style="background-image: url('${movie.posterUrl}');"`
        : `style="background: linear-gradient(135deg, #1c1917 0%, #292524 100%);"`;

      card.innerHTML = `
        <div class="card-poster" ${backgroundStyle}>
          <span class="badge-tag">${movie.category}</span>
        </div>
        <div class="card-content">
          <h3 class="card-title">${movie.title}</h3>
          <p class="card-meta">Lançamento: ${movie.year}</p>
          
          <div class="status-indicator ${movie.watched ? 'status-watched' : 'status-pending'}">
            <span class="status-dot"></span>
            <span>${movie.watched ? 'Já Assistido' : 'Quero Assistir'}</span>
          </div>

          <div class="card-actions">
            <button class="btn btn-sm btn-toggle" data-action="toggle" data-id="${movie.id}">
              ${movie.watched ? "Marcar Pendente" : "Marcar Visto"}
            </button>
            <button class="btn btn-sm btn-delete" data-action="delete" data-id="${movie.id}">
              Remover
            </button>
          </div>
        </div>
      `;

      movieGrid.appendChild(card);
    });
  }

  updateSummary();
}

function handleAddMovie(event: Event): void {
  event.preventDefault();

  if (!titleInput || !categorySelect || !yearInput || !watchedCheckbox || !formError) return;

  const title: string = titleInput.value.trim();
  const categoryValue: string = categorySelect.value;
  const year: number = parseInt(yearInput.value, 10);
  const watched: boolean = watchedCheckbox.checked;
  const posterUrl: string = posterUrlInput?.value.trim() || "";

  formError.style.display = "none";
  formError.textContent = "";

  if (!title) {
    showError("Por favor, preencha o título da obra.");
    return;
  }

  if (!categoryValue) {
    showError("Selecione uma categoria válida para a obra.");
    return;
  }

  if (isNaN(year) || year < 1890 || year > new Date().getFullYear() + 5) {
    showError("Por favor, informe um ano de lançamento válido.");
    return;
  }

  const newMovie: Movie = {
    id: Date.now().toString(),
    title,
    category: categoryValue as MovieCategory,
    year,
    watched,
    posterUrl: posterUrl.length > 0 ? posterUrl : undefined
  };

  movies.unshift(newMovie);
  movieForm?.reset();
  renderCatalog();
}

function showError(message: string): void {
  if (!formError) return;
  formError.textContent = message;
  formError.style.display = "block";
}

function handleCatalogAction(event: MouseEvent): void {
  const target = event.target as HTMLElement;
  const button = target.closest("button");
  if (!button) return;

  const action = button.getAttribute("data-action");
  const id = button.getAttribute("data-id");

  if (!action || !id) return;

  if (action === "toggle") {
    movies = movies.map(movie => {
      if (movie.id === id) {
        return { ...movie, watched: !movie.watched };
      }
      return movie;
    });
  } else if (action === "delete") {
    movies = movies.filter(movie => movie.id !== id);
  }

  renderCatalog();
}

if (movieForm) movieForm.addEventListener("submit", handleAddMovie);
if (searchInput) searchInput.addEventListener("input", renderCatalog);
if (filterCategory) filterCategory.addEventListener("change", renderCatalog);
if (movieGrid) movieGrid.addEventListener("click", handleCatalogAction);

renderCatalog();
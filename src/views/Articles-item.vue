<script setup>
import { ref, computed } from 'vue';
import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';
import { articles } from '@/data/articles.js';

const categories = ['Todos', 'Economía', 'Política', 'Sociología', 'Historia', 'Cultura'];
const selectedCategory = ref('Todos');

const filteredArticles = computed(() => {
  if (selectedCategory.value === 'Todos') return articles;
  return articles.filter(a => a.category === selectedCategory.value);
});

const selectedArticle = ref(null);

function openModal(article) {
  selectedArticle.value = article;
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  selectedArticle.value = null;
  document.body.style.overflow = '';
}

function formatDate(dateStr) {
  const [year, month, day] = dateStr.split('-');
  const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  return `${parseInt(day)} ${months[parseInt(month) - 1]}. ${year}`;
}
</script>

<template>
  <header>
    <Navbar />
  </header>

  <!-- Hero -->
  <section class="articles-hero">
    <div class="articles-hero-content">
      <h1 class="articles-hero-title">Artículos</h1>
      <p class="articles-hero-desc">
        Investigaciones y papers académicos en ciencias sociales, economía, política y cultura.
        Explora el conocimiento producido por investigadores comprometidos con la realidad latinoamericana.
      </p>
    </div>
  </section>

  <!-- Filtros -->
  <section class="articles-filter-section">
    <div class="articles-filter-container">
      <button
        v-for="cat in categories"
        :key="cat"
        class="filter-btn"
        :class="{ 'filter-btn--active': selectedCategory === cat }"
        @click="selectedCategory = cat"
      >
        {{ cat }}
      </button>
    </div>
  </section>

  <!-- Grid de artículos -->
  <section class="articles-grid-section">
    <div class="articles-grid">
      <div v-for="article in filteredArticles" :key="article.id" class="article-card">
        <div class="article-card-header">
          <span class="article-badge">{{ article.category }}</span>
          <span class="article-date">{{ formatDate(article.date) }}</span>
        </div>
        <h3 class="article-card-title">{{ article.title }}</h3>
        <p class="article-card-authors">{{ article.authors }}</p>
        <p class="article-card-abstract">{{ article.abstract }}</p>
        <button class="article-card-btn" @click="openModal(article)">Leer más</button>
      </div>
    </div>

    <p v-if="filteredArticles.length === 0" class="articles-empty">
      No hay artículos en esta categoría aún.
    </p>
  </section>

  <!-- Modal de detalle -->
  <Teleport to="body">
    <div v-if="selectedArticle" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content" role="dialog" aria-modal="true">
        <button class="modal-close" @click="closeModal" aria-label="Cerrar">×</button>
        <div class="modal-header">
          <span class="article-badge">{{ selectedArticle.category }}</span>
          <span class="modal-date">{{ formatDate(selectedArticle.date) }}</span>
        </div>
        <h2 class="modal-title">{{ selectedArticle.title }}</h2>
        <p class="modal-authors">{{ selectedArticle.authors }}</p>
        <p class="modal-abstract">{{ selectedArticle.abstract }}</p>
        <div class="modal-actions">
          <a
            v-if="selectedArticle.pdfUrl && selectedArticle.pdfUrl !== '#'"
            :href="selectedArticle.pdfUrl"
            target="_blank"
            class="btn-pdf"
          >
            Descargar PDF
          </a>
          <button class="btn-close-modal" @click="closeModal">Cerrar</button>
        </div>
      </div>
    </div>
  </Teleport>

  <footer>
    <Footer />
  </footer>
</template>

<style scoped>
/* ===== HERO ===== */
.articles-hero {
  background: linear-gradient(135deg, #d06e12, #456a9a);
  padding: 80px 5%;
  text-align: center;
  color: white;
}

.articles-hero-title {
  font-family: 'Inter', sans-serif;
  font-size: 2.8rem;
  font-weight: 700;
  margin: 0 0 16px;
}

.articles-hero-desc {
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.7;
  opacity: 0.92;
}

/* ===== FILTROS ===== */
.articles-filter-section {
  padding: 32px 5%;
  background: #f8f4f0;
  border-bottom: 1px solid #e8ddd4;
}

.articles-filter-container {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
  justify-content: center;
  max-width: 900px;
  margin: 0 auto;
}

.filter-btn {
  padding: 8px 20px;
  border-radius: 24px;
  border: 2px solid #d06e12;
  background: transparent;
  color: #d06e12;
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
}

.filter-btn:hover,
.filter-btn--active {
  background: #d06e12;
  color: white;
}

/* ===== GRID ===== */
.articles-grid-section {
  padding: 48px 5%;
  max-width: 1200px;
  margin: 0 auto;
}

.articles-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 28px;
}

.article-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.article-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.13);
}

.article-card-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.article-badge {
  background: #456a9a;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  white-space: nowrap;
}

.article-date {
  font-size: 0.82rem;
  color: #888;
  font-family: 'Inter', sans-serif;
}

.article-card-title {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
  line-height: 1.4;
}

.article-card-authors {
  font-family: 'Inter', sans-serif;
  font-size: 0.85rem;
  color: #d06e12;
  margin: 0;
  font-weight: 500;
}

.article-card-abstract {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #555;
  line-height: 1.6;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
  flex: 1;
}

.article-card-btn {
  margin-top: auto;
  padding: 9px 18px;
  background: #d06e12;
  color: white;
  border: none;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  align-self: flex-start;
}

.article-card-btn:hover {
  background: #b85e0e;
}

.articles-empty {
  text-align: center;
  color: #888;
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  padding: 40px 0;
}

/* ===== MODAL ===== */
.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.6);
  z-index: 2000;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
}

.modal-content {
  background: white;
  border-radius: 16px;
  padding: 40px;
  max-width: 680px;
  width: 100%;
  max-height: 85vh;
  overflow-y: auto;
  position: relative;
  font-family: 'Inter', sans-serif;
}

.modal-close {
  position: absolute;
  top: 16px;
  right: 20px;
  background: none;
  border: none;
  font-size: 1.8rem;
  cursor: pointer;
  color: #555;
  line-height: 1;
}

.modal-close:hover {
  color: #d06e12;
}

.modal-header {
  display: flex;
  align-items: center;
  gap: 12px;
  margin-bottom: 16px;
}

.modal-date {
  font-size: 0.85rem;
  color: #888;
}

.modal-title {
  font-size: 1.4rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 8px;
  line-height: 1.35;
}

.modal-authors {
  font-size: 0.95rem;
  color: #d06e12;
  font-weight: 600;
  margin: 0 0 16px;
}

.modal-abstract {
  font-size: 0.95rem;
  color: #444;
  line-height: 1.75;
  margin: 0 0 24px;
}

.modal-actions {
  display: flex;
  gap: 12px;
  flex-wrap: wrap;
}

.btn-pdf {
  padding: 10px 22px;
  background: #456a9a;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-size: 0.9rem;
  font-weight: 600;
  transition: background 0.2s;
}

.btn-pdf:hover {
  background: #375880;
}

.btn-close-modal {
  padding: 10px 22px;
  background: #f0ebe5;
  color: #555;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-close-modal:hover {
  background: #e0d8cf;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 1024px) {
  .articles-grid {
    grid-template-columns: repeat(2, 1fr);
  }
}

@media (max-width: 640px) {
  .articles-hero-title {
    font-size: 2rem;
  }

  .articles-grid {
    grid-template-columns: 1fr;
  }

  .modal-content {
    padding: 24px 20px;
  }
}
</style>

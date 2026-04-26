<script setup>
import { ref } from 'vue';
import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';
import { opinions } from '@/data/opinions.js';

const featuredOpinion = opinions.find(o => o.featured);
const gridOpinions = opinions.filter(o => !o.featured || o.id !== featuredOpinion?.id);

const selectedOpinion = ref(null);

function openModal(opinion) {
  selectedOpinion.value = opinion;
  document.body.style.overflow = 'hidden';
}

function closeModal() {
  selectedOpinion.value = null;
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
  <section class="opinion-hero">
    <div class="opinion-hero-content">
      <h1 class="opinion-hero-title">Columna de Opinión</h1>
      <p class="opinion-hero-desc">
        Voces y perspectivas críticas sobre política, economía, sociedad y cultura.
        Un espacio para el análisis independiente y el debate informado.
      </p>
    </div>
  </section>

  <!-- Columna destacada -->
  <section v-if="featuredOpinion" class="opinion-featured-section">
    <div class="opinion-featured-inner">
      <span class="opinion-featured-label">Columna destacada</span>
      <span class="opinion-badge">{{ featuredOpinion.category }}</span>
      <h2 class="opinion-featured-title">{{ featuredOpinion.title }}</h2>
      <p class="opinion-featured-author">
        Por <strong>{{ featuredOpinion.author }}</strong>
        <span class="opinion-featured-bio"> — {{ featuredOpinion.authorBio }}</span>
      </p>
      <p class="opinion-featured-excerpt">{{ featuredOpinion.excerpt }}</p>
      <button class="opinion-featured-btn" @click="openModal(featuredOpinion)">
        Leer columna
      </button>
    </div>
  </section>

  <!-- Grid de columnas -->
  <section class="opinion-grid-section">
    <h2 class="opinion-grid-heading">Todas las columnas</h2>
    <div class="opinion-grid">
      <div
        v-for="opinion in opinions"
        :key="opinion.id"
        class="opinion-card"
      >
        <div class="opinion-card-header">
          <span class="opinion-badge">{{ opinion.category }}</span>
          <span class="opinion-card-date">{{ formatDate(opinion.date) }}</span>
        </div>
        <h3 class="opinion-card-title">{{ opinion.title }}</h3>
        <p class="opinion-card-author">{{ opinion.author }}</p>
        <p class="opinion-card-bio">{{ opinion.authorBio }}</p>
        <p class="opinion-card-excerpt">{{ opinion.excerpt }}</p>
        <button class="opinion-card-btn" @click="openModal(opinion)">Leer columna</button>
      </div>
    </div>
  </section>

  <!-- Modal de detalle -->
  <Teleport to="body">
    <div v-if="selectedOpinion" class="modal-overlay" @click.self="closeModal">
      <div class="modal-content" role="dialog" aria-modal="true">
        <button class="modal-close" @click="closeModal" aria-label="Cerrar">×</button>
        <div class="modal-header">
          <span class="opinion-badge">{{ selectedOpinion.category }}</span>
          <span class="modal-date">{{ formatDate(selectedOpinion.date) }}</span>
        </div>
        <h2 class="modal-title">{{ selectedOpinion.title }}</h2>
        <p class="modal-author">Por <strong>{{ selectedOpinion.author }}</strong></p>
        <p class="modal-author-bio">{{ selectedOpinion.authorBio }}</p>
        <div class="modal-content-text">
          <p v-for="(paragraph, i) in selectedOpinion.content.split('\n\n')" :key="i">
            {{ paragraph }}
          </p>
        </div>
        <button class="btn-close-modal" @click="closeModal">Cerrar</button>
      </div>
    </div>
  </Teleport>

  <footer>
    <Footer />
  </footer>
</template>

<style scoped>
/* ===== HERO ===== */
.opinion-hero {
  background: linear-gradient(135deg, #456a9a, #d06e12);
  padding: 80px 5%;
  text-align: center;
  color: white;
}

.opinion-hero-title {
  font-family: 'Inter', sans-serif;
  font-size: 2.8rem;
  font-weight: 700;
  margin: 0 0 16px;
}

.opinion-hero-desc {
  font-family: 'Inter', sans-serif;
  font-size: 1.1rem;
  max-width: 700px;
  margin: 0 auto;
  line-height: 1.7;
  opacity: 0.92;
}

/* ===== FEATURED ===== */
.opinion-featured-section {
  background: #f8f4f0;
  padding: 60px 5%;
  border-bottom: 1px solid #e8ddd4;
}

.opinion-featured-inner {
  max-width: 800px;
  margin: 0 auto;
}

.opinion-featured-label {
  display: inline-block;
  font-family: 'Inter', sans-serif;
  font-size: 0.8rem;
  font-weight: 700;
  letter-spacing: 1.5px;
  text-transform: uppercase;
  color: #d06e12;
  margin-bottom: 12px;
}

.opinion-badge {
  background: #456a9a;
  color: white;
  font-size: 0.75rem;
  font-weight: 600;
  padding: 3px 10px;
  border-radius: 12px;
  font-family: 'Inter', sans-serif;
  margin-left: 10px;
}

.opinion-featured-title {
  font-family: 'Inter', sans-serif;
  font-size: 1.9rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 16px 0 12px;
  line-height: 1.3;
}

.opinion-featured-author {
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  color: #555;
  margin: 0 0 16px;
}

.opinion-featured-bio {
  font-style: italic;
  color: #888;
}

.opinion-featured-excerpt {
  font-family: 'Inter', sans-serif;
  font-size: 1.05rem;
  color: #444;
  line-height: 1.75;
  border-left: 4px solid #d06e12;
  padding-left: 20px;
  margin: 0 0 28px;
  font-style: italic;
}

.opinion-featured-btn {
  padding: 12px 28px;
  background: #d06e12;
  color: white;
  border: none;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
}

.opinion-featured-btn:hover {
  background: #b85e0e;
}

/* ===== GRID ===== */
.opinion-grid-section {
  padding: 60px 5%;
  max-width: 1200px;
  margin: 0 auto;
}

.opinion-grid-heading {
  font-family: 'Inter', sans-serif;
  font-size: 1.6rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 36px;
  text-align: center;
  position: relative;
}

.opinion-grid-heading::after {
  content: '';
  width: 50px;
  height: 4px;
  background-color: #d06e12;
  position: absolute;
  bottom: -10px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 4px;
}

.opinion-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 28px;
}

.opinion-card {
  background: white;
  border-radius: 12px;
  padding: 28px;
  box-shadow: 0 2px 12px rgba(0, 0, 0, 0.08);
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: transform 0.25s ease, box-shadow 0.25s ease;
}

.opinion-card:hover {
  transform: translateY(-4px);
  box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
}

.opinion-card-header {
  display: flex;
  align-items: center;
  gap: 8px;
}

.opinion-card-date {
  font-size: 0.82rem;
  color: #888;
  font-family: 'Inter', sans-serif;
  margin-left: auto;
}

.opinion-card-title {
  font-family: 'Inter', sans-serif;
  font-size: 1.05rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
  line-height: 1.4;
}

.opinion-card-author {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #d06e12;
  font-weight: 600;
  margin: 0;
}

.opinion-card-bio {
  font-family: 'Inter', sans-serif;
  font-size: 0.82rem;
  color: #888;
  font-style: italic;
  margin: 0;
  line-height: 1.5;
}

.opinion-card-excerpt {
  font-family: 'Inter', sans-serif;
  font-size: 0.9rem;
  color: #555;
  line-height: 1.65;
  margin: 0;
  flex: 1;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.opinion-card-btn {
  margin-top: auto;
  padding: 9px 18px;
  background: transparent;
  color: #456a9a;
  border: 2px solid #456a9a;
  border-radius: 8px;
  font-family: 'Inter', sans-serif;
  font-size: 0.88rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s, color 0.2s;
  align-self: flex-start;
}

.opinion-card-btn:hover {
  background: #456a9a;
  color: white;
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
  max-width: 720px;
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
  font-size: 1.5rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0 0 10px;
  line-height: 1.35;
}

.modal-author {
  font-size: 1rem;
  color: #d06e12;
  margin: 0 0 4px;
}

.modal-author-bio {
  font-size: 0.88rem;
  color: #888;
  font-style: italic;
  margin: 0 0 20px;
}

.modal-content-text p {
  font-size: 0.96rem;
  color: #444;
  line-height: 1.8;
  margin-bottom: 16px;
}

.btn-close-modal {
  margin-top: 8px;
  padding: 10px 22px;
  background: #f0ebe5;
  color: #555;
  border: none;
  border-radius: 8px;
  font-size: 0.9rem;
  font-weight: 600;
  cursor: pointer;
  transition: background 0.2s;
  font-family: 'Inter', sans-serif;
}

.btn-close-modal:hover {
  background: #e0d8cf;
}

/* ===== RESPONSIVE ===== */
@media (max-width: 900px) {
  .opinion-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 640px) {
  .opinion-hero-title {
    font-size: 2rem;
  }

  .opinion-featured-title {
    font-size: 1.5rem;
  }

  .modal-content {
    padding: 24px 20px;
  }
}
</style>

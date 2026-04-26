<script setup>
import Navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';

import { ref, onMounted, onBeforeUnmount, computed } from 'vue';
import { articles } from '@/data/articles.js';
import { opinions } from '@/data/opinions.js';

const latestArticles = computed(() =>
  [...articles].sort((a, b) => new Date(b.date) - new Date(a.date)).slice(0, 3)
);

const featuredOpinions = computed(() =>
  opinions.filter(o => o.featured).slice(0, 2)
);

function formatDate(dateStr) {
  const [year, month, day] = dateStr.split('-');
  const months = ['ene', 'feb', 'mar', 'abr', 'may', 'jun', 'jul', 'ago', 'sep', 'oct', 'nov', 'dic'];
  return `${parseInt(day)} ${months[parseInt(month) - 1]}. ${year}`;
}

/* =============================
   CARRUSEL PRINCIPAL
============================= */

import img1 from '@/assets/Palpanuma publicaciones.jpg';
// import img2 from '@/assets/book_home_2.png';
// import img3 from '@/assets/book_home_3.png';

const images = [img1];

const currentImageIndex = ref(0);
const intervalId = ref(null);

const nextImage = () => {
  currentImageIndex.value = (currentImageIndex.value + 1) % images.length;
};

/* iniciar carrusel */

const startCarousel = () => {
  stopCarousel();
  intervalId.value = setInterval(nextImage, 5000);
};

/* detener carrusel */

const stopCarousel = () => {
  if (intervalId.value) {
    clearInterval(intervalId.value);
    intervalId.value = null;
  }
};

onMounted(() => {
  startCarousel();
});

onBeforeUnmount(() => {
  stopCarousel();
});
</script>

<template>
  <header>
    <Navbar />
  </header>
  <div class="home-area">
    <!-- Carrusel automático -->
    <div class="carousel-container">
      <img class="img-home" :src="images[currentImageIndex]" />
      <div class="carousel-dots">
        <span
          v-for="(image, index) in images"
          :key="index"
          :class="{ active: index === currentImageIndex }"
          @click="currentImageIndex = index"
        ></span>
      </div>
    </div>

    <div class="text-home">
      <strong>Las Luces de Palpanuma</strong> es una revista académica y de opinión dedicada a difundir
      conocimiento riguroso en ciencias sociales, economía, política y cultura. Nuestro objetivo es
      acercar la investigación y el pensamiento crítico a lectores comprometidos con comprender y
      transformar la realidad latinoamericana.
    </div>

    <!-- Sección: Últimos Artículos -->
    <section class="home-section">
      <h2 class="title-home">Últimos Artículos</h2>
      <div class="home-articles-grid">
        <div
          v-for="article in latestArticles"
          :key="article.id"
          class="home-article-card"
        >
          <div class="home-article-card-top">
            <span class="home-badge">{{ article.category }}</span>
            <span class="home-date">{{ formatDate(article.date) }}</span>
          </div>
          <h3 class="home-article-title">{{ article.title }}</h3>
          <p class="home-article-authors">{{ article.authors }}</p>
        </div>
      </div>
      <div class="home-section-footer">
        <router-link to="/articles" class="home-view-all-btn">Ver todos los artículos →</router-link>
      </div>
    </section>

    <!-- Sección: Columnas de Opinión Destacadas -->
    <section class="home-section home-section--alt">
      <h2 class="title-home">Columnas de Opinión Destacadas</h2>
      <div class="home-opinions-grid">
        <div
          v-for="opinion in featuredOpinions"
          :key="opinion.id"
          class="home-opinion-card"
        >
          <span class="home-badge home-badge--blue">{{ opinion.category }}</span>
          <h3 class="home-opinion-title">{{ opinion.title }}</h3>
          <p class="home-opinion-author">{{ opinion.author }}</p>
          <p class="home-opinion-excerpt">{{ opinion.excerpt }}</p>
        </div>
      </div>
      <div class="home-section-footer">
        <router-link to="/opinion" class="home-view-all-btn">Ver todas las columnas →</router-link>
      </div>
    </section>
  </div>

  <footer>
    <Footer />
  </footer>
</template>

<style>
.img-home {
  width: 100%;
  height: 80vh;
  min-height: 500px;
  object-fit: cover;
  object-position: center 30%; /* 🔥 mueve el enfoque hacia arriba */
  transition: opacity 0.8s ease;
}

/* .home-area {
} */

.title-home {
  text-align: center;
  font-size: 32px;
  font-weight: 700;
  margin: 80px 0 40px 0;
  text-align: center;
  position: relative;
}

.title-home::after {
  content: '';
  width: 60px;
  height: 4px;
  background-color: #d06e12;
  position: absolute;
  bottom: -12px;
  left: 50%;
  transform: translateX(-50%);
  border-radius: 5px;
}

.text-home {
  max-width: 900px;
  margin: 60px auto;
  font-family: 'Inter', sans-serif;
  text-align: center;
  font-size: 18px;
  line-height: 1.7;
}

.main-text-home{
  color: #d06e12;
  font-size: 24px;
}

.our-stories {
  width: 100%;
  background: linear-gradient(135deg, #d06e12, #456a9a);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 40px;
  padding: 80px 40px;
  flex-wrap: wrap;
}

.card-icons {
  /* width: 90px; */
  height: 140px;
  background-color: white;
  border-radius: 30%;
  object-fit: contain;
  margin-bottom: 20px;
}

.logs-item {
  width: 180px;
  min-height: 220px;
  background-color: #ab5d14;
  border-radius: 16px;
  text-align: center;
  color: #ffffff;
  padding: 20px;
  transition: transform 0.3s ease, box-shadow 0.3s ease;
  text-decoration: none; /* quita el subrayado */
}

.logs-item:hover {
  transform: translateY(-8px);
  box-shadow: 0 20px 40px rgba(0, 0, 0, 0.25);
}

.our-sector {
  width: 100%;
  height: 300px;
  background: linear-gradient(135deg, #d06e12, #456a9a);
  display: flex;
  flex-direction: row;
  justify-content: center;
  align-items: center;
  gap: 20px;
}

/* ===============================
   Carrusel automático clientes
================================= */

.our-customers {
  overflow: hidden;
  background: linear-gradient(135deg, #d06e12, #456a9a);
  padding: 80px 0;
  position: relative;
}

.customers-track {
  display: flex;
  width: max-content;
  animation: scrollCustomers 25s linear infinite;
}

.customer-slide {
  flex: 0 0 auto;
  padding: 0 40px;
}

.customer-icons {
  height: 60px;
  width: auto;
  opacity: 0.8;
  transition: all 0.3s ease;
}

.customer-icons:hover {
  transform: scale(1.1);
}

/* Animación infinita */
@keyframes scrollCustomers {
  0% {
    transform: translateX(0);
  }
  100% {
    transform: translateX(-50%);
  }
}

/* Estilos para el carrusel */
.carousel-container {
  position: relative;
  width: 100%;
}

.carousel-container::after {
  content: '';
  position: absolute;
  inset: 0;
  background: rgba(0, 0, 0, 0.25);
}

.carousel-dots {
  position: absolute;
  bottom: 20px;
  left: 0;
  right: 0;
  display: flex;
  justify-content: center;
  gap: 10px;
}

.carousel-dots span {
  width: 12px;
  height: 12px;
  border-radius: 50%;
  cursor: pointer;
  transition: background-color 0.3s;
}

.carousel-dots .active {
  background: #d06e12;
  transform: scale(1.2);
}
/* =================================
   MEJORAS RESPONSIVE MOVIL
================================= */

@media (max-width: 768px) {
  /* Imagen principal */
  .img-home {
    height: 55vh;
    min-height: 280px;
  }

  /* Texto introductorio */
  .text-home {
    font-size: 16px;
    padding: 0 20px;
    margin: 40px auto;
  }

  /* Títulos */
  .title-home {
    font-size: 26px;
    margin: 60px 0 30px 0;
  }

  /* ===============================
     SERVICIOS
  =============================== */

  .our-stories {
    gap: 20px;
    padding: 50px 20px;
  }

  .logs-item {
    width: 140px;
    min-height: 170px;
    padding: 15px;
  }

  .card-icons {
    width: 65px;
    height: 65px;
    padding: 14px;
  }

  /* ===============================
     SECTORES
  =============================== */

  .our-sector {
    height: auto;
    flex-wrap: wrap;
    padding: 50px 20px;
    gap: 20px;
  }
}

/* =================================
   MOVILES PEQUEÑOS
================================= */

@media (max-width: 480px) {
  .img-home {
    height: 45vh;
  }

  .title-home {
    font-size: 22px;
  }

  .logs-item {
    width: 120px;
    min-height: 150px;
    font-size: 10px;
  }

  .card-icons {
    width: 55px;
    height: 55px;
  }

  .customer-icons {
    height: 45px;
  }
}

/* ===== SECCIONES HOME: ARTÍCULOS Y OPINIONES ===== */

.home-section {
  padding: 60px 5%;
  max-width: 1200px;
  margin: 0 auto;
}

.home-section--alt {
  background: #f8f4f0;
  max-width: 100%;
  padding: 60px 5%;
}

.home-section--alt .home-articles-grid,
.home-section--alt .home-opinions-grid {
  max-width: 1200px;
  margin: 0 auto;
}

.home-articles-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 24px;
  margin-top: 48px;
}

.home-article-card {
  background: white;
  border-radius: 12px;
  padding: 22px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.07);
  display: flex;
  flex-direction: column;
  gap: 8px;
  transition: transform 0.22s ease, box-shadow 0.22s ease;
}

.home-article-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.12);
}

.home-article-card-top {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 8px;
}

.home-badge {
  background: #d06e12;
  color: white;
  font-size: 0.72rem;
  font-weight: 700;
  padding: 3px 9px;
  border-radius: 10px;
  font-family: 'Inter', sans-serif;
}

.home-badge--blue {
  background: #456a9a;
}

.home-date {
  font-size: 0.8rem;
  color: #999;
  font-family: 'Inter', sans-serif;
}

.home-article-title {
  font-family: 'Inter', sans-serif;
  font-size: 0.97rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
  line-height: 1.4;
}

.home-article-authors {
  font-family: 'Inter', sans-serif;
  font-size: 0.83rem;
  color: #d06e12;
  margin: 0;
  font-weight: 500;
}

.home-opinions-grid {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 24px;
  margin-top: 48px;
}

.home-opinion-card {
  background: white;
  border-radius: 12px;
  padding: 24px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.07);
  display: flex;
  flex-direction: column;
  gap: 10px;
  transition: transform 0.22s ease, box-shadow 0.22s ease;
}

.home-opinion-card:hover {
  transform: translateY(-3px);
  box-shadow: 0 6px 20px rgba(0, 0, 0, 0.11);
}

.home-opinion-title {
  font-family: 'Inter', sans-serif;
  font-size: 1rem;
  font-weight: 700;
  color: #1a1a2e;
  margin: 0;
  line-height: 1.4;
}

.home-opinion-author {
  font-family: 'Inter', sans-serif;
  font-size: 0.87rem;
  color: #456a9a;
  font-weight: 600;
  margin: 0;
}

.home-opinion-excerpt {
  font-family: 'Inter', sans-serif;
  font-size: 0.88rem;
  color: #555;
  line-height: 1.65;
  margin: 0;
  display: -webkit-box;
  -webkit-line-clamp: 3;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.home-section-footer {
  text-align: center;
  margin-top: 36px;
}

.home-view-all-btn {
  display: inline-block;
  padding: 12px 28px;
  background: #d06e12;
  color: white;
  border-radius: 8px;
  text-decoration: none;
  font-family: 'Inter', sans-serif;
  font-size: 0.95rem;
  font-weight: 600;
  transition: background 0.2s;
}

.home-view-all-btn:hover {
  background: #b85e0e;
}

@media (max-width: 900px) {
  .home-articles-grid {
    grid-template-columns: repeat(2, 1fr);
  }

  .home-opinions-grid {
    grid-template-columns: 1fr;
  }
}

@media (max-width: 600px) {
  .home-articles-grid {
    grid-template-columns: 1fr;
  }
}
</style>

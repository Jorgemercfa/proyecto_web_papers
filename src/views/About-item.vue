<script setup>
import navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';
</script>

<template>
  <header>
    <navbar />
  </header>

  <section class="about-section">
    <div class="about-container">
      <h1 class="main-title">Nosotros</h1>

      <div class="about-card">
        <p class="about-text">
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut aliquip ex ea commodo consequat. Duis aute irure dolor in reprehenderit in voluptate velit esse cillum dolore eu fugiat nulla pariatur. Excepteur sint occaecat cupidatat non proident, sunt in culpa qui officia deserunt mollit anim id est laborum.
        </p>

        <h2>Visión</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>

        <h2>Misión</h2>
        <p>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
        </p>
      </div>
    </div>
  </section>

  <footer>
    <Footer />
  </footer>
</template>

<style>
.about-container {
  width: 85%;
  max-width: 1100px;
  margin: auto;
}

.main-title {
  font-size: 48px;
  font-weight: 700;
  margin-bottom: 20px;
  position: relative;
}

.main-title::after {
  content: '';
  width: 80px;
  height: 4px;
  background-color: #d06e12; /* Línea roja */
  display: block;
  margin-top: 10px;
  border-radius: 2px;
}

.about-card {
  background-color: #d06e12; /* Azul oscuro como la imagen */
  color: #f2f2f2;
  padding: 50px;
  border-radius: 20px;
  margin-top: 40px;
  box-shadow: 0 20px 60px rgba(0, 0, 0, 0.2);
  line-height: 1.7;
}

.about-card h2 {
  margin-top: 30px;
  margin-bottom: 10px;
  font-size: 22px;
  color: #ffffff;
}

.about-card p {
  font-size: 16px;
  margin-bottom: 15px;
}
</style>

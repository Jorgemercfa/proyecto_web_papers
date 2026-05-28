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
  @apply w-[85%] max-w-[1100px] mx-auto;
}

.main-title {
  @apply text-5xl font-bold mb-5 relative;
}

.main-title::after {
  content: '';
  width: 80px;
  height: 4px;
  background-color: #d06e12;
  display: block;
  margin-top: 10px;
  border-radius: 2px;
}

.about-card {
  @apply text-[#f2f2f2] p-[50px] rounded-[20px] mt-10 shadow-2xl leading-[1.7];
  background-color: #d06e12;
}

.about-card h2 {
  @apply mt-8 mb-2 text-[22px] text-white;
}

.about-card p {
  @apply text-base mb-4;
}
</style>

<script setup>
import 'primeicons/primeicons.css';
const year = new Date().getFullYear();
</script>

<template>
  <footer class="footer-area">
    <div class="footer-container">
      <div class="contact-footer">
        <h4 class="titile-footer">Contacto</h4>
        <div class="footer-text">
          <div>ejemplo@gmail.com</div>
        </div>
      </div>
      <div class="social-media">
        <h4 class="title-footer">Redes Sociales</h4>

        <div class="social-icons">
          <a
            href="s"
            target="_blank"
          >
            <i class="pi pi-instagram"></i>
          </a>

          <!-- <a href="" target="_blank">
            <i class="pi pi-youtube"></i>
          </a>

          <a href="" target="_blank">
            <i class="pi pi-tiktok"></i>
          </a> -->
        </div>
      </div>
    </div>
    <div class="footer-bottom">
      © {{ year }} XXXXXX. Todos los derechos reservados.
    </div>
  </footer>
</template>

<style>
.footer-area {
  @apply mt-24 text-white;
  background-color: #ab5d14;
}

/* CONTENEDOR */
.footer-container {
  @apply max-w-6xl mx-auto px-[5%] py-12 flex justify-between items-start gap-10;
}

/* TÍTULOS */
.titile-footer {
  @apply text-[1.1rem] font-semibold mb-4 relative;
}

/* Línea decorativa (BLANCA para que combine con el verde) */
.titile-footer::after {
  content: '';
  width: 40px;
  height: 3px;
  background-color: #ffffff;
  position: absolute;
  bottom: -6px;
  left: 0;
  border-radius: 4px;
}

/* TEXTO */
.footer-text {
  @apply text-[0.95rem] leading-relaxed;
  color: #e6e6e6;
}

/* ICONOS */
.social-icons {
  @apply flex gap-5 mt-4;
}

.social-icons a {
  @apply text-[1.8rem] text-white transition duration-300;
}

.social-icons a:hover {
  color: #d06e12;
  transform: translateY(-3px);
}
/* BARRA INFERIOR */
.footer-bottom {
  @apply text-center py-5 text-[0.85rem] border-t;
  color: #cccccc;
  border-color: rgba(255, 255, 255, 0.2);
}

/* RESPONSIVE */
@media (max-width: 768px) {
  .footer-container {
    @apply flex-col items-center text-center;
  }

  .titile-footer::after {
    left: 50%;
    transform: translateX(-50%);
  }

  .social-media2 {
    justify-content: center;
  }
}
</style>

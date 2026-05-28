<script setup>
import { computed, ref, onMounted } from 'vue';
import navbar from '@/components/Navbar-item.vue';
import Footer from '@/components/Footer-item.vue';

const AUTHOR_USER = 'fabiana valdivia';
const AUTHOR_PASSWORD = 'wert!hwrdv#2786';
const SESSION_STORAGE_KEY = 'palpanuma-newsletter-author';

const GITHUB_USER = process.env.VUE_APP_GITHUB_USER || '';
const GITHUB_REPO = process.env.VUE_APP_GITHUB_REPO || '';
const FILE_PATH = 'public/posts.json';
const BRANCH = process.env.VUE_APP_GITHUB_BRANCH || 'main';
const TOKEN = process.env.VUE_APP_GITHUB_TOKEN || '';
const LOCAL_STORAGE_KEY = 'palpanuma-newsletter-posts';

const GITHUB_CONTENTS_URL = `https://api.github.com/repos/${GITHUB_USER}/${GITHUB_REPO}/contents/${FILE_PATH}`;
const canSyncWithGitHub = computed(() =>
  Boolean(GITHUB_USER && GITHUB_REPO && TOKEN),
);

const loginForm = ref({ user: '', password: '' });
const postForm = ref({ title: '', note: '' });
const uploadedPhotos = ref([]);
const posts = ref([]);
const isAuthor = ref(false);
const isLoading = ref(false);
const loginError = ref('');
const postError = ref('');
const syncError = ref('');
const showLoginForm = ref(false);

const sortedPosts = computed(() =>
  [...posts.value].sort(
    (a, b) => new Date(b.createdAt) - new Date(a.createdAt),
  ),
);

onMounted(async () => {
  isAuthor.value = sessionStorage.getItem(SESSION_STORAGE_KEY) === 'true';
  await loadPosts();
});

function createDefaultPosts() {
  return [
    {
      id: Date.now(),
      title: 'Bienvenidos al Newsletter',
      note: 'Este espacio será usado para compartir avances del libro, notas del autor e imágenes exclusivas del proceso creativo.',
      photos: [],
      createdAt: new Date().toISOString(),
    },
  ];
}

function textToBase64(text) {
  const bytes = new TextEncoder().encode(text);
  let binary = '';

  bytes.forEach((byte) => {
    binary += String.fromCharCode(byte);
  });

  return btoa(binary);
}

function base64ToText(base64Value) {
  const cleanBase64 = (base64Value || '').replace(/\n/g, '');
  const binary = atob(cleanBase64);
  const bytes = Uint8Array.from(binary, (char) => char.charCodeAt(0));
  return new TextDecoder().decode(bytes);
}

function buildGitHubHeaders() {
  return {
    Authorization: `token ${TOKEN}`,
    'Content-Type': 'application/json',
  };
}

function savePostsToLocalStorage() {
  localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(posts.value));
}

function loadPostsFromLocalStorage() {
  const savedPosts = localStorage.getItem(LOCAL_STORAGE_KEY);

  if (!savedPosts) {
    return null;
  }

  try {
    const parsed = JSON.parse(savedPosts);
    return Array.isArray(parsed) ? parsed : null;
  } catch {
    return null;
  }
}

async function fetchPostsFileFromGitHub() {
  if (!canSyncWithGitHub.value) {
    return null;
  }

  const response = await fetch(`${GITHUB_CONTENTS_URL}?ref=${BRANCH}`, {
    method: 'GET',
    headers: buildGitHubHeaders(),
  });

  if (response.status === 404) {
    return null;
  }

  if (!response.ok) {
    throw new Error(`No se pudo leer posts.json (${response.status}).`);
  }

  return response.json();
}

async function loadPosts() {
  isLoading.value = true;
  syncError.value = '';

  try {
    const localPosts = loadPostsFromLocalStorage();

    if (localPosts) {
      posts.value = localPosts;
    }

    if (!canSyncWithGitHub.value) {
      if (!localPosts) {
        posts.value = createDefaultPosts();
        savePostsToLocalStorage();
      }

      return;
    }

    const fileData = await fetchPostsFileFromGitHub();

    if (!fileData) {
      posts.value = createDefaultPosts();
      await savePosts();
      return;
    }

    const jsonText = base64ToText(fileData.content);
    const parsedPosts = JSON.parse(jsonText);

    posts.value = Array.isArray(parsedPosts) ? parsedPosts : [];
    savePostsToLocalStorage();
  } catch (error) {
    console.error(error);
    syncError.value = 'No se pudieron cargar las publicaciones desde GitHub.';
    postError.value =
      'Se cargaron solo los datos locales por un error de GitHub.';

    const localPosts = loadPostsFromLocalStorage();
    posts.value = localPosts || [];
  } finally {
    isLoading.value = false;
  }
}

async function savePosts() {
  isLoading.value = true;
  syncError.value = '';

  try {
    savePostsToLocalStorage();

    if (!canSyncWithGitHub.value) {
      postError.value = '';
      return;
    }

    const fileData = await fetchPostsFileFromGitHub();
    const content = textToBase64(JSON.stringify(posts.value, null, 2));

    const body = {
      message: 'update newsletter posts',
      content,
      branch: BRANCH,
    };

    if (fileData?.sha) {
      body.sha = fileData.sha;
    }

    const response = await fetch(GITHUB_CONTENTS_URL, {
      method: 'PUT',
      headers: buildGitHubHeaders(),
      body: JSON.stringify(body),
    });

    if (!response.ok) {
      throw new Error(`No se pudo guardar posts.json (${response.status}).`);
    }
  } catch (error) {
    console.error(error);
    syncError.value = 'No se pudieron guardar las publicaciones en GitHub.';
    postError.value =
      'Publicación guardada localmente. Revisa tu configuración de GitHub.';
    throw error;
  } finally {
    isLoading.value = false;
  }
}

function loginAuthor() {
  loginError.value = '';
  const user = loginForm.value.user.trim().toLowerCase();

  if (user === AUTHOR_USER && loginForm.value.password === AUTHOR_PASSWORD) {
    isAuthor.value = true;
    sessionStorage.setItem(SESSION_STORAGE_KEY, 'true');
    loginForm.value = { user: '', password: '' };
    return;
  }

  loginError.value = 'Credenciales incorrectas. Solo el autor puede editar.';
}

function logoutAuthor() {
  isAuthor.value = false;
  sessionStorage.removeItem(SESSION_STORAGE_KEY);
}

async function handlePhotoUpload(event) {
  const files = Array.from(event.target.files || []);

  if (!files.length) {
    return;
  }

  const readers = files.map((file) => fileToDataUrl(file));
  const photoUrls = await Promise.all(readers);
  uploadedPhotos.value = [...uploadedPhotos.value, ...photoUrls];
  event.target.value = '';
}

function fileToDataUrl(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = () => reject(new Error('No se pudo leer el archivo.'));
    reader.readAsDataURL(file);
  });
}

function removeUploadedPhoto(index) {
  uploadedPhotos.value.splice(index, 1);
}

async function addPost() {
  postError.value = '';

  if (!postForm.value.title.trim() || !postForm.value.note.trim()) {
    postError.value = 'Debes completar el título y la nota antes de publicar.';
    return;
  }

  const newPost = {
    id: Date.now(),
    title: postForm.value.title.trim(),
    note: postForm.value.note.trim(),
    photos: [...uploadedPhotos.value],
    createdAt: new Date().toISOString(),
  };

  const previousPosts = [...posts.value];
  posts.value.push(newPost);

  try {
    await savePosts();
    postForm.value = { title: '', note: '' };
    uploadedPhotos.value = [];
  } catch {
    posts.value = previousPosts;
  }
}

async function deletePost(postId) {
  postError.value = '';

  const previousPosts = [...posts.value];
  posts.value = posts.value.filter((post) => post.id !== postId);

  try {
    await savePosts();
  } catch {
    posts.value = previousPosts;
  }
}

function formatDate(date) {
  return new Date(date).toLocaleDateString('es-PE', {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
  });
}
</script>

<template>
  <header>
    <navbar />
  </header>

  <main class="newsletter-page">
    <section class="newsletter-container">
      <h1 class="title">Newsletter</h1>
      <p class="subtitle">
        Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.
      </p>
      <p v-if="syncError" class="warning-text">{{ syncError }}</p>

      <!-- Botón para mostrar/ocultar el formulario de autor -->
      <div v-if="!isAuthor" class="author-toggle-wrapper">
        <button
          class="toggle-login-btn"
          @click="showLoginForm = !showLoginForm"
        >
          {{ showLoginForm ? 'Cancelar' : '🔒 Acceso de autor' }}
        </button>
      </div>

      <!-- Formulario de acceso, oculto por defecto -->
      <div class="author-box" v-if="!isAuthor && showLoginForm">
        <h2>Acceso de autor</h2>
        <p>Solo el autor puede crear, editar o eliminar contenido.</p>

        <div class="form-grid">
          <input
            v-model="loginForm.user"
            type="text"
            placeholder="Usuario"
          />
          <input
            v-model="loginForm.password"
            type="password"
            placeholder="Contraseña"
          />
        </div>

        <button class="primary-btn" @click="loginAuthor">
          Ingresar como autor
        </button>
        <p v-if="loginError" class="error-text">{{ loginError }}</p>
      </div>

      <div class="author-panel" v-if="isAuthor">
        <div class="author-panel-header">
          <h2>Panel del autor</h2>
          <button class="primary-btn" @click="logoutAuthor">
            Cerrar sesión
          </button>
        </div>

        <div class="form-grid">
          <input
            v-model="postForm.title"
            type="text"
            placeholder="Título de la publicación"
          />
          <textarea
            v-model="postForm.note"
            rows="5"
            placeholder="Escribe la nota del newsletter"
          />
        </div>

        <label class="upload-label">
          Subir fotos
          <input
            type="file"
            accept="image/*"
            multiple
            @change="handlePhotoUpload"
          />
        </label>

        <div class="preview-grid" v-if="uploadedPhotos.length">
          <div
            v-for="(photo, index) in uploadedPhotos"
            :key="`${photo}-${index}`"
            class="preview-item"
          >
            <img :src="photo" alt="Vista previa de foto a publicar" />
            <button class="danger-btn" @click="removeUploadedPhoto(index)">
              Quitar
            </button>
          </div>
        </div>

        <button class="primary-btn" @click="addPost">
          Publicar newsletter
        </button>
        <p v-if="postError" class="error-text">{{ postError }}</p>
      </div>

      <section class="posts-list">
        <article v-for="post in sortedPosts" :key="post.id" class="post-card">
          <div class="post-header">
            <div>
              <h3>{{ post.title }}</h3>
              <p class="post-date">{{ formatDate(post.createdAt) }}</p>
            </div>
            <button
              v-if="isAuthor"
              class="danger-btn"
              @click="deletePost(post.id)"
            >
              Eliminar
            </button>
          </div>

          <p class="post-note">{{ post.note }}</p>

          <div class="post-photos" v-if="post.photos && post.photos.length">
            <img
              v-for="(photo, index) in post.photos"
              :key="`${post.id}-photo-${index}`"
              :src="photo"
              :alt="`Foto del newsletter ${post.title}`"
            />
          </div>
        </article>
      </section>
    </section>
  </main>

  <footer>
    <Footer />
  </footer>
</template>

<style scoped>
.newsletter-page {
  @apply py-[50px] px-[6%] pb-[90px];
}

.newsletter-container {
  @apply max-w-[980px] mx-auto;
}

.title {
  font-size: clamp(2rem, 4vw, 2.5rem);
  @apply mb-[10px];
}

.subtitle {
  @apply mb-[30px];
  color: #444;
}

.author-box,
.author-panel,
.post-card {
  @apply rounded-2xl shadow-lg p-6 mb-6;
  background: #d06e12;
  color: #fff;
}

.author-panel-header,
.post-header {
  @apply flex justify-between items-center gap-3 text-white;
}

.form-grid {
  @apply grid gap-3 my-4;
}

input,
textarea {
  @apply w-full p-3 border border-[#d8d8d8] rounded-xl text-[0.95rem] box-border;
}

.upload-label {
  @apply inline-flex flex-col gap-2 rounded-lg mb-4;
}

.preview-grid,
.post-photos {
  @apply grid gap-3 my-3 mb-5;
  grid-template-columns: repeat(auto-fill, minmax(150px, 1fr));
}

.preview-item img,
.post-photos img {
  @apply w-full h-[150px] object-cover rounded-xl;
}

.post-date {
  @apply text-[0.9rem];
}

.post-note {
  @apply leading-[1.8];
}

.primary-btn,
.danger-btn {
  @apply border-none rounded-lg py-[10px] px-[14px] cursor-pointer font-semibold;
}

.primary-btn {
  background-color: #ab5d14;
  color: #ffffff;
}

.danger-btn {
  background-color: #d64949;
  color: #fff;
}

.error-text {
  @apply mt-[10px];
  color: #b92d2d;
}

.warning-text {
  @apply mb-4;
  color: #8a5a00;
}

@media (max-width: 700px) {
  .author-panel-header,
  .post-header {
    @apply flex-col items-start;
  }
}

.author-toggle-wrapper {
  @apply flex justify-end mb-3;
}

.toggle-login-btn {
  @apply bg-transparent border-none text-[0.82rem] cursor-pointer px-2 py-1 rounded-md transition-colors duration-200;
  color: #888;
}

.toggle-login-btn:hover {
  color: #444;
}
</style>

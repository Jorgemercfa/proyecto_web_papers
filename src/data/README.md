# src/data — Capa de datos estáticos

## Estado actual

Los archivos en esta carpeta contienen **datos estáticos (mock data)** que simulan una base de datos. Esta aproximación es adecuada para la etapa actual del proyecto y permite desarrollar las vistas sin depender de un backend.

- `articles.js` — Array de papers/artículos académicos
- `opinions.js` — Array de columnas de opinión

## Migración a base de datos real

Cuando el proyecto crezca y se requiera persistencia real, estos archivos pueden reemplazarse fácilmente. Se recomienda **Supabase** por su SDK oficial para Vue 3 y su modelo de datos relacional.

### Opción 1: Supabase (recomendado)

```js
import { createClient } from '@supabase/supabase-js';

const supabase = createClient(SUPABASE_URL, SUPABASE_ANON_KEY);

// Reemplaza el import estático por:
const { data: articles } = await supabase.from('articles').select('*');
const { data: opinions } = await supabase.from('opinions').select('*');
```

### Opción 2: Firebase Firestore

```js
import { collection, getDocs } from 'firebase/firestore';

const articlesSnapshot = await getDocs(collection(db, 'articles'));
const articles = articlesSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
```

## Compatibilidad

La estructura de los objetos (campos y tipos) ya está diseñada para ser compatible directamente con una colección de Supabase o Firestore. Cada campo del objeto corresponde a una columna (Supabase) o campo (Firestore) del documento.

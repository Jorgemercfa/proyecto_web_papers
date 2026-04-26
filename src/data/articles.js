/**
 * DATOS ESTÁTICOS — Mock Data
 *
 * Actualmente los datos son estáticos (mock data) para esta etapa del proyecto.
 * Cuando el proyecto crezca, este archivo puede reemplazarse fácilmente por una
 * integración con Supabase (recomendado, tiene SDK oficial para Vue) o Firebase Firestore.
 * La estructura de los objetos ya está diseñada para ser compatible con una
 * colección de Supabase/Firestore: cada campo corresponde a una columna/campo del documento.
 *
 * Migración sugerida:
 *   - Supabase: import { createClient } from '@supabase/supabase-js'
 *     const { data } = await supabase.from('articles').select('*')
 *   - Firebase: import { collection, getDocs } from 'firebase/firestore'
 *     const snapshot = await getDocs(collection(db, 'articles'))
 */

export const articles = [
  {
    id: 1,
    title: 'Desigualdad económica en América Latina: tendencias recientes',
    authors: 'María González, Carlos Pérez',
    category: 'Economía',
    date: '2025-04-10',
    abstract:
      'Este paper analiza la evolución de la desigualdad económica en América Latina durante la última década, examinando indicadores de Gini y el impacto de políticas redistributivas. Se concluye que, pese a avances puntuales, la brecha estructural persiste y requiere reformas fiscales profundas.',
    pdfUrl: '#',
    image: null,
    featured: true,
  },
  {
    id: 2,
    title: 'Participación política juvenil en contextos de crisis institucional',
    authors: 'Andrés Molina',
    category: 'Política',
    date: '2025-03-22',
    abstract:
      'Se estudian los patrones de participación política de jóvenes entre 18 y 29 años en cuatro países latinoamericanos con alta desconfianza institucional. Los resultados muestran una reconfiguración de la acción política hacia movimientos extrapartidarios y redes digitales.',
    pdfUrl: '#',
    image: null,
    featured: false,
  },
  {
    id: 3,
    title: 'Movimientos sociales y construcción de identidad colectiva',
    authors: 'Lucía Ramírez, Fernando Salas',
    category: 'Sociología',
    date: '2025-03-05',
    abstract:
      'A partir de un enfoque etnográfico, este artículo examina cómo los movimientos sociales contemporáneos articulan demandas diversas bajo identidades colectivas emergentes. Se propone un modelo analítico que integra repertorios de acción con marcos culturales.',
    pdfUrl: '#',
    image: null,
    featured: true,
  },
  {
    id: 4,
    title: 'La reforma agraria de 1969: legados y reinterpretaciones',
    authors: 'José Huamán',
    category: 'Historia',
    date: '2025-02-18',
    abstract:
      'Este trabajo revisa la historiografía sobre la reforma agraria peruana de 1969, contrastando interpretaciones estructuralistas con enfoques de historia social. Se argumenta que los legados de la reforma son heterogéneos y varían significativamente según la región y el grupo social.',
    pdfUrl: '#',
    image: null,
    featured: false,
  },
  {
    id: 5,
    title: 'Industrias culturales y globalización: el caso de la música andina',
    authors: 'Valeria Torres, Miguel Quispe',
    category: 'Cultura',
    date: '2025-01-30',
    abstract:
      'Se analiza la inserción de la música andina en los circuitos globales de las industrias culturales, explorando tensiones entre autenticidad, mercado y apropiación cultural. El estudio combina análisis de mercado con entrevistas a músicos y productores.',
    pdfUrl: '#',
    image: null,
    featured: false,
  },
  {
    id: 6,
    title: 'Política monetaria y empleo informal en economías emergentes',
    authors: 'Rebeca Flores, Diego Arteaga',
    category: 'Economía',
    date: '2025-01-12',
    abstract:
      'El artículo examina la relación entre las decisiones de política monetaria y la dinámica del empleo informal en cinco economías emergentes. Se encuentra que las alzas de tasas de interés tienen un efecto asimétrico, afectando desproporcionadamente a los sectores de mayor informalidad.',
    pdfUrl: '#',
    image: null,
    featured: true,
  },
];

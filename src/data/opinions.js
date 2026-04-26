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
 *     const { data } = await supabase.from('opinions').select('*')
 *   - Firebase: import { collection, getDocs } from 'firebase/firestore'
 *     const snapshot = await getDocs(collection(db, 'opinions'))
 */

export const opinions = [
  {
    id: 1,
    title: 'El precio del silencio: democracia y medios en tiempos de polarización',
    author: 'Sofía Mendoza',
    authorBio: 'Periodista y politóloga. Investigadora en comunicación política y libertad de prensa.',
    date: '2025-04-15',
    excerpt:
      'La polarización mediática no es solo un fenómeno de percepción: tiene efectos concretos sobre la calidad deliberativa de nuestras democracias.',
    content:
      'La polarización mediática no es solo un fenómeno de percepción: tiene efectos concretos sobre la calidad deliberativa de nuestras democracias. Cuando los medios de comunicación se fragmentan en burbujas ideológicas impermeables, el espacio público se contrae y la posibilidad de un diálogo racional entre ciudadanos con opiniones distintas se vuelve cada vez más precaria.\n\nEn este contexto, el silencio resulta costoso. No el silencio entendido como ausencia de ruido, sino como exclusión sistemática de voces disidentes, de perspectivas incómodas, de datos que contradicen el relato dominante en cada burbuja. Las democracias saludables requieren medios que incomoden, que hagan preguntas difíciles independientemente de quién esté en el poder.\n\nLa pregunta que debemos hacernos no es si preferimos medios afines a nuestras ideas, sino qué tipo de democracia queremos construir. Una en la que el debate sea real, con sus fricciones y complejidades, o una en la que cada ciudadano viva en la comodidad de un relato que solo confirma sus creencias previas.',
    category: 'Política',
    featured: true,
  },
  {
    id: 2,
    title: 'Crecimiento sin inclusión: el espejismo del PIB',
    author: 'Rodrigo Castillo',
    authorBio: 'Economista. Especialista en desarrollo económico y políticas de bienestar.',
    date: '2025-04-02',
    excerpt:
      'Celebrar el crecimiento del PIB sin mirar cómo se distribuye es como celebrar que llovió sin preguntar si llegó agua a todas las tierras.',
    content:
      'Celebrar el crecimiento del PIB sin mirar cómo se distribuye es como celebrar que llovió sin preguntar si llegó agua a todas las tierras. Los indicadores macroeconómicos agregados pueden esconder realidades muy distintas: un país puede crecer a tasas envidiables mientras la mayoría de su población ve deteriorarse su calidad de vida.\n\nLos últimos datos de distribución del ingreso en la región confirman lo que muchos economistas heterodoxos llevan años advirtiendo: el crecimiento económico, por sí solo, no garantiza reducción de la pobreza ni de la desigualdad. Se necesitan políticas activas de redistribución, acceso universal a servicios básicos y mercados laborales que generen trabajo decente.\n\nMientras los gobiernos continúen usando el PIB como indicador principal de éxito, estarán midiendo el tamaño del pastel pero ignorando quién se lleva las porciones más grandes. Ha llegado el momento de complementar esa métrica con indicadores que reflejen la calidad de vida real de las personas.',
    category: 'Economía',
    featured: true,
  },
  {
    id: 3,
    title: 'La universidad pública y el reto de la pertinencia social',
    author: 'Elena Vargas',
    authorBio: 'Docente universitaria e investigadora en sociología de la educación.',
    date: '2025-03-20',
    excerpt:
      'La crisis de la universidad pública latinoamericana no es solo presupuestal: es también una crisis de sentido y de vínculo con las comunidades a las que debería servir.',
    content:
      'La crisis de la universidad pública latinoamericana no es solo presupuestal: es también una crisis de sentido y de vínculo con las comunidades a las que debería servir. Mientras los rankings internacionales premian la producción científica medida en publicaciones indexadas, las demandas más urgentes de las sociedades locales siguen sin encontrar respuesta en las aulas y laboratorios universitarios.\n\nEsta tensión entre excelencia académica medida globalmente y pertinencia local no tiene una solución simple, pero sí tiene caminos de salida. Las universidades que han logrado articular investigación de calidad con incidencia social real comparten algunas características: currículos flexibles, vinculación con actores comunitarios y apertura a formas de conocimiento no convencionales.\n\nEl desafío es enorme pero necesario: sin universidades públicas que justifiquen su relevancia ante la ciudadanía, la presión por su privatización o reducción seguirá creciendo. La autonomía universitaria no puede ser escudo para la autorreferencia.',
    category: 'Sociología',
    featured: false,
  },
  {
    id: 4,
    title: 'Memoria histórica: entre el deber y la instrumentalización política',
    author: 'Pablo Infante',
    authorBio: 'Historiador. Miembro del Centro de Estudios de Memoria y Derechos Humanos.',
    date: '2025-03-08',
    excerpt:
      'Recordar el pasado es un deber ético. Pero cuando la memoria histórica se convierte en arma de disputa electoral, el riesgo es que pierda su capacidad de generar comprensión y reconciliación.',
    content:
      'Recordar el pasado es un deber ético. Pero cuando la memoria histórica se convierte en arma de disputa electoral, el riesgo es que pierda su capacidad de generar comprensión y reconciliación. En varios países de la región, los debates sobre el pasado reciente han quedado atrapados en lógicas de confrontación que dificultan el trabajo genuino de elaboración colectiva del trauma.\n\nLas comisiones de verdad, los memoriales y la educación en derechos humanos son herramientas valiosas siempre que estén guiadas por un compromiso con los hechos y con las víctimas, no por agendas partidarias. Cuando eso no ocurre, la memoria se fragmenta según las conveniencias del momento y pierde su función social más importante: impedir la repetición.\n\nNo se trata de congelar el pasado ni de imponer una narrativa única, sino de construir espacios de escucha y reconocimiento que permitan a las sociedades avanzar sin borrar lo que ocurrió. La historia no se supera negándola; se supera comprendiéndola.',
    category: 'Historia',
    featured: false,
  },
];

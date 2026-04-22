/**
 * sections-config.js
 * Per-page section definitions for sidebar scroll-spy.
 * IDs MUST match <section id="..."> in each page's HTML.
 *
 * label: displayed directly in sidebar (no i18n lookup needed)
 */

const SECTIONS = {
  home: [
    { id: 'propuesta',     icon: 'compass',       label: 'Propuesta de valor' },
    { id: 'aceleradores',  icon: 'zap',           label: 'Aceleradores' },
    { id: 'diagnostico',   icon: 'stethoscope',   label: 'Diagnóstico' },
    { id: 'recursos',      icon: 'library',       label: 'Recursos' },
    { id: 'metodo',        icon: 'route',         label: 'El Método' },
    { id: 'programas',     icon: 'graduation-cap',label: 'Workshops' },
    { id: 'prueba-social', icon: 'trophy',        label: 'Formación' },
  ],

  vision: [
    { id: 'hero',        icon: 'eye',             label: 'Visión' },
    { id: 'problema',    icon: 'alert-triangle',   label: 'La Fractura' },
    { id: 'trampa',      icon: 'flame',            label: 'Caos²' },
    { id: 'sistema',     icon: 'layers',           label: 'Las 4 Fases' },
    { id: 'pivote',      icon: 'refresh-cw',       label: 'P.I.V.O.T.E.' },
    { id: 'principios',  icon: 'shield',           label: 'Principios' },
    { id: 'contacto',    icon: 'mail',             label: 'Conectar' },
  ],

  empresas: [
    { id: 'b2b',          icon: 'building-2',      label: 'Para Empresas' },
    { id: 'programas',    icon: 'graduation-cap',   label: 'Ruta B2B' },
    { id: 'diagnostico',  icon: 'stethoscope',      label: 'Diagnóstico' },
    { id: 'recursos',     icon: 'library',           label: 'Recursos' },
    { id: 'casos',        icon: 'briefcase',         label: 'Resultados' },
    { id: 'metodo',       icon: 'route',             label: 'El Método' },
    { id: 'contacto',     icon: 'mail',              label: 'Conectar' },
  ],

  personas: [
    { id: 'autodiagnostico', icon: 'scan-search',   label: 'Soberanía Digital' },
    { id: 'recursos',     icon: 'book-open',         label: 'Recursos' },
    { id: 'programas',    icon: 'graduation-cap',    label: 'Programas' },
    { id: 'comunidad',    icon: 'heart-handshake',   label: 'Comunidad' },
    { id: 'metodo',       icon: 'route',             label: 'El Método' },
    { id: 'casos',        icon: 'briefcase',         label: 'Resultados' },
    { id: 'contacto',     icon: 'mail',              label: 'Conectar' },
  ],

  programas: [
    { id: 'catalogo',     icon: 'layout-grid',       label: 'Catálogo' },
    { id: 'detalle',      icon: 'mic',               label: 'Masterclasses' },
    { id: 'audiencia',    icon: 'zap',               label: 'Workshops' },
    { id: 'duracion',     icon: 'stethoscope',       label: 'Diagnósticos' },
    { id: 'resultado',    icon: 'rocket',            label: 'Bootcamps' },
    { id: 'testimonios',  icon: 'crown',             label: 'Élite' },
    { id: 'inscripcion',  icon: 'mail',              label: 'Inscripción' },
  ],

  recursos: [
    { id: 'biblioteca',     icon: 'library',         label: 'Kit de Recursos' },
    { id: 'playbooks',      icon: 'book-marked',     label: 'Playbooks' },
    { id: 'herramientas',   icon: 'wrench',          label: 'Herramientas' },
    { id: 'premium',        icon: 'crown',           label: 'Premium' },
    { id: 'prompts',        icon: 'terminal',        label: 'Prompts' },
    { id: 'automatizacion', icon: 'bot',             label: 'Automatización' },
    { id: 'comunidad',      icon: 'heart-handshake', label: 'Comunidad' },
  ],

  metodo: [
    { id: 'filosofia',    icon: 'lightbulb',         label: 'Filosofía' },
    { id: 'diagnostico',  icon: 'stethoscope',       label: 'Diagnosticar' },
    { id: 'estrategia',   icon: 'map',               label: 'Diseñar' },
    { id: 'amplificacion',icon: 'megaphone',         label: 'Amplificar' },
    { id: 'pivote',       icon: 'refresh-cw',        label: 'Pivotar' },
    { id: 'evidencia',    icon: 'flask-conical',     label: 'Evidencia' },
    { id: 'siguiente',    icon: 'arrow-right',       label: 'Siguiente Paso' },
  ],

  diagnostico: [
    { id: 'introduccion', icon: 'info',              label: 'Introducción' },
    { id: 'segmento',     icon: 'users',             label: 'Tu Segmento' },
    { id: 'madurez',      icon: 'bar-chart',         label: 'Madurez' },
    { id: 'dolor',        icon: 'alert-triangle',    label: 'Puntos de Dolor' },
    { id: 'urgencia',     icon: 'clock',             label: 'Urgencia' },
    { id: 'equipo',       icon: 'users-round',       label: 'Tu Equipo' },
    { id: 'resultado',    icon: 'check-circle',      label: 'Resultado' },
  ],

  casos: [
    { id: 'destacados',   icon: 'star',              label: 'Destacados' },
    { id: 'empresa',      icon: 'building-2',        label: 'Empresas' },
    { id: 'persona',      icon: 'user',              label: 'Personas' },
    { id: 'resultados',   icon: 'trending-up',       label: 'Números' },
    { id: 'metodologia',  icon: 'cpu',               label: 'Metodología' },
    { id: 'testimonios',  icon: 'message-circle',    label: 'Testimonios' },
    { id: 'contacto',     icon: 'mail',              label: 'Conectar' },
  ],

  nosotros: [
    { id: 'vision',       icon: 'eye',               label: 'Quiénes Somos' },
    { id: 'equipo',       icon: 'users',             label: 'Equipo' },
    { id: 'ecosistema',   icon: 'network',           label: 'Ecosistema' },
    { id: 'mision',       icon: 'cpu',               label: 'Misión' },
    { id: 'valores',      icon: 'heart',             label: 'Valores' },
    { id: 'comunidad',    icon: 'heart-handshake',   label: 'Embajadores' },
    { id: 'contacto',     icon: 'mail',              label: 'Conectar' },
  ],

  insights: [
    { id: 'articulos',    icon: 'newspaper',         label: 'Artículos' },
    { id: 'tendencias',   icon: 'trending-up',       label: 'Tendencias' },
    { id: 'herramientas', icon: 'wrench',            label: 'Herramientas' },
    { id: 'investigacion',icon: 'microscope',        label: 'Investigación' },
    { id: 'comunidad',    icon: 'heart-handshake',   label: 'Comunidad' },
    { id: 'suscripcion',  icon: 'bell',              label: 'Suscripción' },
    { id: 'archivo',      icon: 'archive',           label: 'Archivo' },
  ],

  contacto: [
    { id: 'formulario',   icon: 'pen-line',          label: 'Conversemos' },
    { id: 'servicios',    icon: 'layers',            label: '60 Minutos' },
    { id: 'ubicacion',    icon: 'map-pin',           label: 'Modalidad' },
    { id: 'redes',        icon: 'share-2',           label: 'Redes' },
    { id: 'faq',          icon: 'help-circle',       label: 'Políticas' },
    { id: 'horario',      icon: 'clock',             label: 'Horario' },
    { id: 'mapa',         icon: 'map',               label: 'Cobertura' },
  ],

  legal: [
    { id: 'privacidad',   icon: 'shield',            label: 'Privacidad' },
    { id: 'terminos',     icon: 'scroll-text',       label: 'Términos' },
    { id: 'cookies',      icon: 'cookie',            label: 'Cookies' },
    { id: 'datos',        icon: 'database',          label: 'Datos' },
    { id: 'derechos',     icon: 'scale',             label: 'Derechos' },
    { id: 'cambios',      icon: 'history',           label: 'Cambios' },
    { id: 'contacto',     icon: 'mail',              label: 'Contacto Legal' },
  ],
};

const ALL_PAGES = Object.keys(SECTIONS);

export function getSections(pageSlug) {
  return SECTIONS[pageSlug] ?? [];
}

export function getAllPages() {
  return [...ALL_PAGES];
}

export function getSectionCount() {
  return ALL_PAGES.reduce((sum, slug) => sum + SECTIONS[slug].length, 0);
}

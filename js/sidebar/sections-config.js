/**
 * sections-config.js
 * Per-page section definitions for sidebar scroll-spy.
 * IDs MUST match <section id="..."> in each page's HTML.
 *
 * Contract:
 *   { id, icon, i18nKey }
 * with labels resolved from sidebar-labels.json at render time.
 */

const SECTIONS = {
  home: [
    { id: 'propuesta', icon: 'compass', i18nKey: 'sidebar.home.propuesta' },
    { id: 'aceleradores', icon: 'zap', i18nKey: 'sidebar.home.aceleradores' },
    { id: 'diagnostico', icon: 'stethoscope', i18nKey: 'sidebar.home.diagnostico' },
    { id: 'recursos', icon: 'library', i18nKey: 'sidebar.home.recursos' },
    { id: 'metodo', icon: 'route', i18nKey: 'sidebar.home.metodo' },
    { id: 'proposito', icon: 'heart', i18nKey: 'sidebar.home.proposito' },
    { id: 'formacion', icon: 'graduation-cap', i18nKey: 'sidebar.home.formacion' },
    { id: 'contacto', icon: 'mail', i18nKey: 'sidebar.home.contacto' }
  ],

  empresas: [
    { id: 'b2b', icon: 'building-2', i18nKey: 'sidebar.empresas.b2b' },
    { id: 'programas', icon: 'graduation-cap', i18nKey: 'sidebar.empresas.programas' },
    { id: 'diagnostico', icon: 'stethoscope', i18nKey: 'sidebar.empresas.diagnostico' },
    { id: 'recursos', icon: 'library', i18nKey: 'sidebar.empresas.recursos' },
    { id: 'casos', icon: 'briefcase', i18nKey: 'sidebar.empresas.casos' },
    { id: 'metodo', icon: 'route', i18nKey: 'sidebar.empresas.metodo' },
    { id: 'contacto', icon: 'mail', i18nKey: 'sidebar.empresas.contacto' }
  ],

  personas: [
    { id: 'autodiagnostico', icon: 'scan-search', i18nKey: 'sidebar.personas.autodiagnostico' },
    { id: 'recursos', icon: 'book-open', i18nKey: 'sidebar.personas.recursos' },
    { id: 'programas', icon: 'graduation-cap', i18nKey: 'sidebar.personas.programas' },
    { id: 'comunidad', icon: 'heart-handshake', i18nKey: 'sidebar.personas.comunidad' },
    { id: 'metodo', icon: 'route', i18nKey: 'sidebar.personas.metodo' },
    { id: 'casos', icon: 'briefcase', i18nKey: 'sidebar.personas.casos' },
    { id: 'contacto', icon: 'mail', i18nKey: 'sidebar.personas.contacto' }
  ],

  programas: [
    { id: 'catalogo', icon: 'layout-grid', i18nKey: 'sidebar.programas.catalogo' },
    { id: 'detalle', icon: 'mic', i18nKey: 'sidebar.programas.detalle' },
    { id: 'audiencia', icon: 'zap', i18nKey: 'sidebar.programas.audiencia' },
    { id: 'duracion', icon: 'stethoscope', i18nKey: 'sidebar.programas.duracion' },
    { id: 'resultado', icon: 'rocket', i18nKey: 'sidebar.programas.resultado' },
    { id: 'testimonios', icon: 'crown', i18nKey: 'sidebar.programas.testimonios' },
    { id: 'inscripcion', icon: 'mail', i18nKey: 'sidebar.programas.inscripcion' }
  ],

  recursos: [
    { id: 'biblioteca', icon: 'library', i18nKey: 'sidebar.recursos.biblioteca' },
    { id: 'playbooks', icon: 'book-marked', i18nKey: 'sidebar.recursos.playbooks' },
    { id: 'herramientas', icon: 'wrench', i18nKey: 'sidebar.recursos.herramientas' },
    { id: 'premium', icon: 'crown', i18nKey: 'sidebar.recursos.premium' },
    { id: 'prompts', icon: 'terminal', i18nKey: 'sidebar.recursos.prompts' },
    { id: 'automatizacion', icon: 'bot', i18nKey: 'sidebar.recursos.automatizacion' },
    { id: 'comunidad', icon: 'heart-handshake', i18nKey: 'sidebar.recursos.comunidad' }
  ],

  embajadores: [
    { id: 'red', icon: 'network', i18nKey: 'sidebar.embajadores.red' },
    { id: 'creador', icon: 'star', i18nKey: 'sidebar.embajadores.creador' },
    { id: 'founders', icon: 'users', i18nKey: 'sidebar.embajadores.founders' },
    { id: 'embajadores', icon: 'award', i18nKey: 'sidebar.embajadores.embajadores' },
    { id: 'programa', icon: 'graduation-cap', i18nKey: 'sidebar.embajadores.programa' },
    { id: 'aplicar', icon: 'mail', i18nKey: 'sidebar.embajadores.aplicar' }
  ],

  ruta: [
    { id: 'diagnostico', icon: 'stethoscope', i18nKey: 'sidebar.ruta.diagnostico' },
    { id: 'fundamentar', icon: 'compass', i18nKey: 'sidebar.ruta.fundamentar' },
    { id: 'acelerar', icon: 'zap', i18nKey: 'sidebar.ruta.acelerar' },
    { id: 'catalizar', icon: 'layers', i18nKey: 'sidebar.ruta.catalizar' },
    { id: 'amplificar', icon: 'rocket', i18nKey: 'sidebar.ruta.amplificar' },
    { id: 'personalizable', icon: 'settings', i18nKey: 'sidebar.ruta.personalizable' },
    { id: 'contacto', icon: 'mail', i18nKey: 'sidebar.ruta.contacto' }
  ],

  vision: [
    { id: 'hero', icon: 'eye', i18nKey: 'sidebar.vision.hero' },
    { id: 'problema', icon: 'alert-triangle', i18nKey: 'sidebar.vision.problema' },
    { id: 'trampa', icon: 'shield-alert', i18nKey: 'sidebar.vision.trampa' },
    { id: 'sistema', icon: 'cpu', i18nKey: 'sidebar.vision.sistema' },
    { id: 'pivote', icon: 'refresh-cw', i18nKey: 'sidebar.vision.pivote' },
    { id: 'principios', icon: 'book-open', i18nKey: 'sidebar.vision.principios' },
    { id: 'contacto', icon: 'mail', i18nKey: 'sidebar.vision.contacto' }
  ],

  metodo: [
    { id: 'filosofia', icon: 'lightbulb', i18nKey: 'sidebar.metodo.filosofia' },
    { id: 'diagnostico', icon: 'stethoscope', i18nKey: 'sidebar.metodo.diagnostico' },
    { id: 'estrategia', icon: 'map', i18nKey: 'sidebar.metodo.estrategia' },
    { id: 'amplificacion', icon: 'megaphone', i18nKey: 'sidebar.metodo.amplificacion' },
    { id: 'pivote', icon: 'refresh-cw', i18nKey: 'sidebar.metodo.pivote' },
    { id: 'evidencia', icon: 'flask-conical', i18nKey: 'sidebar.metodo.evidencia' },
    { id: 'siguiente', icon: 'arrow-right', i18nKey: 'sidebar.metodo.siguiente' }
  ],

  diagnostico: [
    { id: 'introduccion', icon: 'info', i18nKey: 'sidebar.diagnostico.introduccion' },
    { id: 'segmento', icon: 'users', i18nKey: 'sidebar.diagnostico.segmento' },
    { id: 'madurez', icon: 'bar-chart', i18nKey: 'sidebar.diagnostico.madurez' },
    { id: 'dolor', icon: 'alert-triangle', i18nKey: 'sidebar.diagnostico.dolor' },
    { id: 'urgencia', icon: 'clock', i18nKey: 'sidebar.diagnostico.urgencia' },
    { id: 'equipo', icon: 'users-round', i18nKey: 'sidebar.diagnostico.equipo' },
    { id: 'resultado', icon: 'check-circle', i18nKey: 'sidebar.diagnostico.resultado' }
  ],

  casos: [
    { id: 'destacados', icon: 'star', i18nKey: 'sidebar.casos.destacados' },
    { id: 'empresa', icon: 'building-2', i18nKey: 'sidebar.casos.empresa' },
    { id: 'persona', icon: 'user', i18nKey: 'sidebar.casos.persona' },
    { id: 'resultados', icon: 'trending-up', i18nKey: 'sidebar.casos.resultados' },
    { id: 'metodologia', icon: 'cpu', i18nKey: 'sidebar.casos.metodologia' },
    { id: 'testimonios', icon: 'message-circle', i18nKey: 'sidebar.casos.testimonios' },
    { id: 'contacto', icon: 'mail', i18nKey: 'sidebar.casos.contacto' }
  ],

  nosotros: [
    { id: 'vision', icon: 'eye', i18nKey: 'sidebar.nosotros.vision' },
    { id: 'equipo', icon: 'users', i18nKey: 'sidebar.nosotros.equipo' },
    { id: 'ecosistema', icon: 'network', i18nKey: 'sidebar.nosotros.ecosistema' },
    { id: 'mision', icon: 'cpu', i18nKey: 'sidebar.nosotros.mision' },
    { id: 'valores', icon: 'heart', i18nKey: 'sidebar.nosotros.valores' },
    { id: 'comunidad', icon: 'heart-handshake', i18nKey: 'sidebar.nosotros.comunidad' },
    { id: 'contacto', icon: 'mail', i18nKey: 'sidebar.nosotros.contacto' }
  ],

  insights: [
    { id: 'articulos', icon: 'newspaper', i18nKey: 'sidebar.insights.articulos' },
    { id: 'tendencias', icon: 'trending-up', i18nKey: 'sidebar.insights.tendencias' },
    { id: 'herramientas', icon: 'wrench', i18nKey: 'sidebar.insights.herramientas' },
    { id: 'investigacion', icon: 'microscope', i18nKey: 'sidebar.insights.investigacion' },
    { id: 'comunidad', icon: 'heart-handshake', i18nKey: 'sidebar.insights.comunidad' },
    { id: 'suscripcion', icon: 'bell', i18nKey: 'sidebar.insights.suscripcion' },
    { id: 'archivo', icon: 'archive', i18nKey: 'sidebar.insights.archivo' }
  ],

  contacto: [
    { id: 'formulario', icon: 'pen-line', i18nKey: 'sidebar.contacto.formulario' },
    { id: 'servicios', icon: 'layers', i18nKey: 'sidebar.contacto.servicios' },
    { id: 'ubicacion', icon: 'map-pin', i18nKey: 'sidebar.contacto.ubicacion' },
    { id: 'redes', icon: 'share-2', i18nKey: 'sidebar.contacto.redes' },
    { id: 'faq', icon: 'help-circle', i18nKey: 'sidebar.contacto.faq' },
    { id: 'horario', icon: 'clock', i18nKey: 'sidebar.contacto.horario' },
    { id: 'mapa', icon: 'map', i18nKey: 'sidebar.contacto.mapa' }
  ],

  legal: [
    { id: 'privacidad', icon: 'shield', i18nKey: 'sidebar.legal.privacidad' },
    { id: 'terminos', icon: 'scroll-text', i18nKey: 'sidebar.legal.terminos' },
    { id: 'cookies', icon: 'cookie', i18nKey: 'sidebar.legal.cookies' },
    { id: 'datos', icon: 'database', i18nKey: 'sidebar.legal.datos' },
    { id: 'derechos', icon: 'scale', i18nKey: 'sidebar.legal.derechos' },
    { id: 'cambios', icon: 'history', i18nKey: 'sidebar.legal.cambios' },
    { id: 'contacto', icon: 'mail', i18nKey: 'sidebar.legal.contacto' }
  ]
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

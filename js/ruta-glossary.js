/**
 * ruta-glossary.js — Bilingual level details for the Ruta page
 *
 * 10 levels (N0-N9) organized in 4 phases:
 *   Phase 1 Fundamentar: N0 (Diagnóstico), N1 (Coaching)
 *   Phase 2 Acelerar:    N2 (Ofimática), N3 (Ventas), N4 (Formas de Trabajo)
 *   Phase 3 Catalizar:   N5 (Amplificado), N6 (GerencIA), N7 (Empoderamiento Élite)
 *   Phase 4 Amplificar:  N8 (Vibe Coding), N9 (Digital Champions Élite)
 *
 * @license Copyleft
 * @copyright MetodologIA
 */

export const LEVELS = {
  n0: {
    es: {
      term: 'Nivel 0 · Entrada',
      title: 'Diagnóstico Estratégico',
      type: 'SIN COSTO',
      body: `<p>Detectamos exactamente <strong>dónde falla tu sistema</strong> antes de proponer soluciones.</p>
<h4>Qué incluye</h4>
<ul>
<li>Mapa de pérdidas de tiempo y puntos de fricción</li>
<li>Análisis de madurez digital y metodológica</li>
<li>Plan de mejora con quick wins + sesión 1:1 de 30 min</li>
</ul>
<p style="margin-top:.75rem;font-size:.85rem;color:var(--brand-text-soft);">Duración: 2 semanas de evaluación. Personas: 4 formularios (~20 min). Empresas: entrevistas focalizadas.</p>`,
      cta: 'Agendar diagnóstico →',
      ctaHref: '/diagnostico/'
    },
    en: {
      term: 'Level 0 · Entry',
      title: 'Strategic Diagnosis',
      type: 'NO COST',
      body: `<p>We detect exactly <strong>where your system fails</strong> before proposing solutions.</p>
<h4>What it includes</h4>
<ul>
<li>Map of time losses and friction points</li>
<li>Digital and methodological maturity analysis</li>
<li>Improvement plan with quick wins + 30 min 1:1 session</li>
</ul>
<p style="margin-top:.75rem;font-size:.85rem;color:var(--brand-text-soft);">Duration: 2 weeks of evaluation. Individuals: 4 forms (~20 min). Companies: focused interviews.</p>`,
      cta: 'Schedule diagnosis →',
      ctaHref: '/diagnostico/'
    }
  },

  n1: {
    es: {
      term: 'Nivel 1 · Coaching',
      title: 'EstrategIA Personal',
      type: 'COACHING · 18h',
      body: `<p>Plan de carrera <strong>digital + profesional</strong> personalizado con coaching 1:1.</p>
<h4>Qué incluye</h4>
<ul>
<li>Plan de carrera con objetivos trimestrales (OKRs)</li>
<li>100+ prompts + metodología probada</li>
<li>Acompañamiento estratégico continuo</li>
</ul>
<h4>Transformación</h4>
<p>De la reactividad operativa → <strong>estrategia deliberada</strong>.</p>`,
      cta: 'Explorar nivel →',
      ctaHref: '/programas/#detalle'
    },
    en: {
      term: 'Level 1 · Coaching',
      title: 'Personal StrategyIA',
      type: 'COACHING · 18h',
      body: `<p>Personalized <strong>digital + professional</strong> career plan with 1:1 coaching.</p>
<h4>What it includes</h4>
<ul>
<li>Career plan with quarterly objectives (OKRs)</li>
<li>100+ prompts + proven methodology</li>
<li>Continuous strategic coaching</li>
</ul>
<h4>Transformation</h4>
<p>From operational reactivity → <strong>deliberate strategy</strong>.</p>`,
      cta: 'Explore level →',
      ctaHref: '/programas/#detalle'
    }
  },

  n2: {
    es: {
      term: 'Nivel 2 · Bootcamp',
      title: 'Ofimática con IA',
      type: 'BOOTCAMP · 18h + 2 opcionales',
      body: `<p>Automatiza la burocracia para <strong>liberar talento</strong>. M365 + Copilot o Google Workspace.</p>
<h4>Qué incluye</h4>
<ul>
<li>Escritura automática de correos y documentos</li>
<li>Reportes, dashboards, presentaciones con IA</li>
<li>100+ prompts aplicados</li>
</ul>
<h4>Transformación</h4>
<p>De tareas manuales → <strong>5-10h semanales recuperadas</strong>.</p>`,
      cta: 'Ver bootcamp →',
      ctaHref: '/programas/#audiencia'
    },
    en: {
      term: 'Level 2 · Bootcamp',
      title: 'Office Suite with AI',
      type: 'BOOTCAMP · 18h + 2 optional',
      body: `<p>Automate bureaucracy to <strong>free up talent</strong>. M365 + Copilot or Google Workspace.</p>
<h4>What it includes</h4>
<ul>
<li>Automatic email and document writing</li>
<li>Reports, dashboards, presentations with AI</li>
<li>100+ applied prompts</li>
</ul>
<h4>Transformation</h4>
<p>From manual tasks → <strong>5-10h weekly recovered</strong>.</p>`,
      cta: 'View bootcamp →',
      ctaHref: '/programas/#audiencia'
    }
  },

  n3: {
    es: {
      term: 'Nivel 3 · Bootcamp',
      title: 'Gestión Comercial con IA',
      type: 'BOOTCAMP · 18h + 2 opcionales',
      body: `<p>Prospección inteligente y <strong>personalización a escala</strong>.</p>
<h4>Qué incluye</h4>
<ul>
<li>Pipeline comercial automatizado</li>
<li>Personalización masiva de outreach</li>
<li>100+ prompts comerciales + banco de objeciones</li>
</ul>
<h4>Transformación</h4>
<p>De pipeline impredecible → <strong>más reuniones cualificadas y mayor cierre</strong>.</p>`,
      cta: 'Ver bootcamp →',
      ctaHref: '/programas/#audiencia'
    },
    en: {
      term: 'Level 3 · Bootcamp',
      title: 'Sales Management with AI',
      type: 'BOOTCAMP · 18h + 2 optional',
      body: `<p>Intelligent prospecting and <strong>personalization at scale</strong>.</p>
<h4>What it includes</h4>
<ul>
<li>Automated commercial pipeline</li>
<li>Mass personalization of outreach</li>
<li>100+ commercial prompts + objection bank</li>
</ul>
<h4>Transformation</h4>
<p>From unpredictable pipeline → <strong>more qualified meetings and higher close rate</strong>.</p>`,
      cta: 'View bootcamp →',
      ctaHref: '/programas/#audiencia'
    }
  },

  n4: {
    es: {
      term: 'Nivel 4 · Bootcamp',
      title: 'Formas de Trabajo',
      type: 'BOOTCAMP · 18h + 2 opcionales',
      body: `<p>Agile + GTD + Kanban + Segundo Cerebro Digital integrados con IA.</p>
<h4>Qué incluye</h4>
<ul>
<li>Tu propio sistema operativo profesional</li>
<li>Flujos de trabajo optimizados con IA</li>
<li>100+ prompts + S.O. Vital (Sistema Operativo Personal)</li>
</ul>
<h4>Transformación</h4>
<p>Del caos operativo → <strong>procesos replicables, cero fricción</strong>.</p>`,
      cta: 'Ver bootcamp →',
      ctaHref: '/programas/#audiencia'
    },
    en: {
      term: 'Level 4 · Bootcamp',
      title: 'Ways of Working',
      type: 'BOOTCAMP · 18h + 2 optional',
      body: `<p>Agile + GTD + Kanban + Digital Second Brain integrated with AI.</p>
<h4>What it includes</h4>
<ul>
<li>Your own professional operating system</li>
<li>AI-optimized workflows</li>
<li>100+ prompts + Vital O.S. (Personal Operating System)</li>
</ul>
<h4>Transformation</h4>
<p>From operational chaos → <strong>replicable processes, zero friction</strong>.</p>`,
      cta: 'View bootcamp →',
      ctaHref: '/programas/#audiencia'
    }
  },

  n5: {
    es: {
      term: 'Nivel 5 · Bootcamp',
      title: 'Trabajar Amplificado',
      type: 'BOOTCAMP · 18h + 2 opcionales',
      body: `<p>Prompting avanzado, Custom GPTs, agentes IA y automatizaciones n8n.</p>
<h4>Qué incluye</h4>
<ul>
<li>Creación de GPTs y asistentes propios</li>
<li>Automatizaciones end-to-end con n8n</li>
<li>100+ prompts + 8 asistentes especializados</li>
</ul>
<h4>Transformación</h4>
<p>De usuario básico → <strong>dominio de IA generativa y soluciones agénticas</strong>.</p>`,
      cta: 'Ver bootcamp →',
      ctaHref: '/programas/#audiencia'
    },
    en: {
      term: 'Level 5 · Bootcamp',
      title: 'Amplified Work',
      type: 'BOOTCAMP · 18h + 2 optional',
      body: `<p>Advanced prompting, Custom GPTs, AI agents and n8n automations.</p>
<h4>What it includes</h4>
<ul>
<li>Build your own GPTs and assistants</li>
<li>End-to-end automations with n8n</li>
<li>100+ prompts + 8 specialized assistants</li>
</ul>
<h4>Transformation</h4>
<p>From basic user → <strong>generative AI mastery and agentic solutions</strong>.</p>`,
      cta: 'View bootcamp →',
      ctaHref: '/programas/#audiencia'
    }
  },

  n6: {
    es: {
      term: 'Nivel 6 · Bootcamp',
      title: 'GerencIA de Proyectos',
      type: 'BOOTCAMP · 18h + 2 opcionales',
      body: `<p>Dashboards automáticos, orquestación de agentes IA y métricas en tiempo real.</p>
<h4>Qué incluye</h4>
<ul>
<li>Dashboards de productividad automatizados</li>
<li>Orquestación de agentes IA</li>
<li>100+ prompts + gobernanza de automatización</li>
</ul>
<h4>Transformación</h4>
<p>Del micromanagement → <strong>visibilidad 360° y decisiones basadas en datos</strong>.</p>`,
      cta: 'Ver bootcamp →',
      ctaHref: '/programas/#audiencia'
    },
    en: {
      term: 'Level 6 · Bootcamp',
      title: 'Project ManagementIA',
      type: 'BOOTCAMP · 18h + 2 optional',
      body: `<p>Automated dashboards, AI agent orchestration and real-time metrics.</p>
<h4>What it includes</h4>
<ul>
<li>Automated productivity dashboards</li>
<li>AI agent orchestration</li>
<li>100+ prompts + automation governance</li>
</ul>
<h4>Transformation</h4>
<p>From micromanagement → <strong>360° visibility and data-driven decisions</strong>.</p>`,
      cta: 'View bootcamp →',
      ctaHref: '/programas/#audiencia'
    }
  },

  n7: {
    es: {
      term: 'Nivel 7 · Élite',
      title: 'Programa de Empoderamiento',
      type: 'PROGRAMA ÉLITE · 48h',
      body: `<p>14 módulos en 2 fases: de <strong>ejecutante agotado a estratega de impacto</strong>.</p>
<h4>Qué incluye</h4>
<ul>
<li>Diseño de sistemas propios</li>
<li>Mentalidad de diseñador y arquitecto</li>
<li>140+ prompts + asistentes personalizados</li>
<li>Opción: Módulo 0 de prueba</li>
</ul>
<h4>Transformación</h4>
<p>De dependencia tecnológica → <strong>soberanía total + diferenciación profesional</strong>.</p>`,
      cta: 'Explorar programa Élite →',
      ctaHref: '/programas/#resultado'
    },
    en: {
      term: 'Level 7 · Elite',
      title: 'Empowerment Program',
      type: 'ELITE PROGRAM · 48h',
      body: `<p>14 modules in 2 phases: from <strong>exhausted doer to impact strategist</strong>.</p>
<h4>What it includes</h4>
<ul>
<li>Own system design</li>
<li>Designer and architect mindset</li>
<li>140+ prompts + personalized assistants</li>
<li>Option: Module 0 trial</li>
</ul>
<h4>Transformation</h4>
<p>From technological dependence → <strong>total sovereignty + professional differentiation</strong>.</p>`,
      cta: 'Explore Elite program →',
      ctaHref: '/programas/#resultado'
    }
  },

  n8: {
    es: {
      term: 'Nivel 8 · Bootcamp',
      title: 'Vibe Coding',
      type: 'BOOTCAMP · 18h + 2 opcionales',
      body: `<p>Construir software sin saber programar. Cursor, Copilot, v0, desarrollo agéntico.</p>
<h4>Qué incluye</h4>
<ul>
<li>Desarrollo asistido por IA (Cursor, Copilot, v0)</li>
<li>Aplicaciones y automatizaciones propias</li>
<li>100+ prompts + deploy en tu propia infraestructura</li>
</ul>
<h4>Transformación</h4>
<p>De "necesito un developer" → <strong>tu propio software, de idea a realidad en horas</strong>.</p>`,
      cta: 'Ver bootcamp →',
      ctaHref: '/programas/#audiencia'
    },
    en: {
      term: 'Level 8 · Bootcamp',
      title: 'Vibe Coding',
      type: 'BOOTCAMP · 18h + 2 optional',
      body: `<p>Build software without knowing how to code. Cursor, Copilot, v0, agentic development.</p>
<h4>What it includes</h4>
<ul>
<li>AI-assisted development (Cursor, Copilot, v0)</li>
<li>Custom applications and automations</li>
<li>100+ prompts + deploy on own infrastructure</li>
</ul>
<h4>Transformation</h4>
<p>From "I need a developer" → <strong>your own software, idea to reality in hours</strong>.</p>`,
      cta: 'View bootcamp →',
      ctaHref: '/programas/#audiencia'
    }
  },

  n9: {
    es: {
      term: 'Nivel 9 · Élite',
      title: 'Digital Champions',
      type: 'PROGRAMA ÉLITE · 48h',
      body: `<p>Liderazgo de la (r)evolución digital. <strong>Agentes de cambio</strong> internos.</p>
<h4>Qué incluye</h4>
<ul>
<li>Liderazgo de transformación digital</li>
<li>Mentoría y formación de equipos</li>
<li>Certificación Champion + acceso a Red de Líderes</li>
<li>Opción: Módulo 0 de prueba</li>
</ul>
<h4>Transformación</h4>
<p>De operador → <strong>agente de cambio con autoridad reconocida e impacto multiplicado</strong>.</p>`,
      cta: 'Explorar programa Élite →',
      ctaHref: '/programas/#resultado'
    },
    en: {
      term: 'Level 9 · Elite',
      title: 'Digital Champions',
      type: 'ELITE PROGRAM · 48h',
      body: `<p>Digital (r)evolution leadership. Internal <strong>change agents</strong>.</p>
<h4>What it includes</h4>
<ul>
<li>Digital transformation leadership</li>
<li>Team mentoring and training</li>
<li>Champion Certification + Leader Network access</li>
<li>Option: Module 0 trial</li>
</ul>
<h4>Transformation</h4>
<p>From operator → <strong>change agent with recognized authority and multiplied impact</strong>.</p>`,
      cta: 'Explore Elite program →',
      ctaHref: '/programas/#resultado'
    }
  }
};

/**
 * Get level entry for the current locale.
 * @param {string} key — level ID (n0-n9)
 * @returns {{ term, title, type, body, cta, ctaHref } | null}
 */
export function getLevelEntry(key) {
  const entry = LEVELS[key];
  if (!entry) return null;
  const lang = (document.documentElement.lang || 'es').slice(0, 2);
  return entry[lang] || entry.es;
}

#!/usr/bin/env node

/**
 * generate-assistant-landings.js
 * Generates individual landing pages for each GPT/Gem assistant.
 *
 * Usage: node scripts/generate-assistant-landings.js
 */

import { writeFileSync, mkdirSync, existsSync } from 'fs';
import { join } from 'path';

const MOAT_CATEGORIES = {
  'Métodos': { color: '#06b6d4', desc: 'Frameworks, procesos y arquitectura metodológica' },
  'Ontología': { color: '#8b5cf6', desc: 'Investigación, análisis y conocimiento estructurado' },
  'Activos': { color: '#f97316', desc: 'Reportes, reviews y entregables de negocio' },
  'Templates': { color: '#ec4899', desc: 'Generación visual, infografías y contenido' },
  'Estrella': { color: 'var(--brand-gold)', desc: 'Orquestador principal del ecosistema' },
};

const ASSISTANTS = [
  // Estrella
  { slug: 'pristino', name: 'Pristino', moat: 'Estrella', desc: 'Comité de expertos en 1 chat. Orquesta múltiples perspectivas (estrategia, arquitectura, UX, delivery) sobre tu reto en una sola conversación.', gpt: 'https://chatgpt.com/g/g-6985f6a53cd08191a870c44661a2a060-pristino', gem: null },

  // Métodos
  { slug: 'command-center', name: 'CommandCenter', moat: 'Métodos', desc: 'Orquestador central de proyectos y decisiones. Coordina prioridades, asigna responsables y mantiene el ritmo de ejecución.', gpt: 'https://chatgpt.com/g/g-69d58e0f28748191ba700138c57dcd96-commandcenter', gem: 'https://gemini.google.com/gem/2ecd0faeb7ce' },
  { slug: 'strategy-architect', name: 'StrategyArchitect', moat: 'Métodos', desc: 'Diseño estratégico con frameworks. Construye roadmaps, define visión y alinea objetivos de largo plazo.', gpt: 'https://chatgpt.com/g/g-69d5cf8b6cb08191bbf7edeae32764ad-strategy-architect', gem: 'https://gemini.google.com/gem/eddb119cfcae' },
  { slug: 'tactics-architect', name: 'TacticsArchitect', moat: 'Métodos', desc: 'Tácticas de ejecución a corto plazo. Sprint planning, priorización y planes de acción semanales.', gpt: 'https://chatgpt.com/g/g-69d5cf90a73c8191b154dc67fc1b13dd-tactics-architect', gem: 'https://gemini.google.com/gem/562a50061176' },
  { slug: 'okr-architect', name: 'OKRArchitect', moat: 'Métodos', desc: 'Diseño de OKRs y resultados clave. Alinea equipos con objetivos medibles y ciclos trimestrales.', gpt: 'https://chatgpt.com/g/g-69d59be250ec81919a05dedd9f8c0ab9-okr-architect', gem: 'https://gemini.google.com/gem/32fc0d98a189' },
  { slug: 'kpi-architect', name: 'KPIArchitect', moat: 'Métodos', desc: 'Arquitectura de indicadores. Diseña dashboards, define métricas y construye sistemas de medición.', gpt: 'https://chatgpt.com/g/g-69d591fe4fc08191acbb7a2ffda38ca0-kpi-architect', gem: 'https://gemini.google.com/gem/57f22ffd62e8' },
  { slug: 'productivity-architect', name: 'ProductivityArchitect', moat: 'Métodos', desc: 'Sistemas de productividad personal. GTD, Kanban, time-blocking y rutinas de alto rendimiento.', gpt: 'https://chatgpt.com/g/g-69d59c0066088191aa9b4b3611763283-productivity-architect', gem: 'https://gemini.google.com/gem/41881ae310f6' },
  { slug: 'process-modeler', name: 'ProcessModeler', moat: 'Métodos', desc: 'Modelado de procesos de negocio. BPMN, diagramas de flujo y optimización de operaciones.', gpt: 'https://chatgpt.com/g/g-69d59bfa4f6c819186830c5eaf364de7-process-modeler', gem: 'https://gemini.google.com/gem/9d8f6543913a' },
  { slug: 'project-architect', name: 'ProjectArchitect', moat: 'Métodos', desc: 'Arquitectura de gestión de proyectos. WBS, cronogramas, gestión de riesgos y reportes de avance.', gpt: 'https://chatgpt.com/g/g-69d59c0a4f7c81919e066ba4129f576b-project-architect', gem: 'https://gemini.google.com/gem/c7e498669f19' },
  { slug: 'workflow-generator', name: 'WorkflowGenerator', moat: 'Métodos', desc: 'Generador de flujos de trabajo. Automatización de procesos repetitivos con lógica clara.', gpt: 'https://chatgpt.com/g/g-69d5cfa007a081919c16628b8478f39f-workflow-generator', gem: 'https://gemini.google.com/gem/1ab09f9a9b2e' },
  { slug: 'scaleup-review', name: 'ScaleUpReview', moat: 'Métodos', desc: 'Revisión de escalamiento. Evalúa si tu operación está lista para crecer sin romper procesos.', gpt: 'https://chatgpt.com/g/g-69d5cf876f3081918257b4bfe83f9d7e-scale-up-review', gem: 'https://gemini.google.com/gem/8e2d408927f3' },

  // Ontología
  { slug: 'finder-conocimiento', name: 'FinderConocimiento', moat: 'Ontología', desc: 'Búsqueda inteligente en base de conocimiento. Encuentra, conecta y sintetiza información dispersa.', gpt: 'https://chatgpt.com/g/g-69d591cf541481918116635e970c7d6a-finder-conocimiento', gem: 'https://gemini.google.com/gem/cb08bddacfd6' },
  { slug: 'finder-digital', name: 'FinderDigital', moat: 'Ontología', desc: 'Explorador de ecosistemas digitales. Mapea herramientas, plataformas y oportunidades tecnológicas.', gpt: 'https://chatgpt.com/g/g-69d591db4d9c8191bbc31c71832290ac-finder-digital', gem: 'https://gemini.google.com/gem/5e87c5ebd566' },
  { slug: 'finder-metodologia', name: 'FinderMetodologia', moat: 'Ontología', desc: 'Buscador especializado en metodologías. SAFe, LeSS, Scrum, Kanban, Design Thinking y más.', gpt: 'https://chatgpt.com/g/g-69d591dc5ae881918f2c67828b34af12-finder-metodologia', gem: 'https://gemini.google.com/gem/53961e3ef11c' },
  { slug: 'research-studio', name: 'ResearchStudio', moat: 'Ontología', desc: 'Estudio de investigación profunda. Revisión bibliográfica, estado del arte y síntesis ejecutiva.', gpt: 'https://chatgpt.com/g/g-69d5cf8271a081918b4e26bdafb5f9ae-research-studio', gem: 'https://gemini.google.com/gem/fdcef69e9992' },
  { slug: 'research-blueprint', name: 'ResearchBlueprint', moat: 'Ontología', desc: 'Blueprint de investigación estructurada. Diseño de hipótesis, marco teórico y metodología.', gpt: 'https://chatgpt.com/g/g-69d59bec507c819197750fbbc1e74aae-research-blueprint', gem: 'https://gemini.google.com/gem/7092d04b2915' },
  { slug: 'management-analyst', name: 'ManagementAnalyst', moat: 'Ontología', desc: 'Análisis de gestión y operaciones. Diagnóstico de madurez organizacional y recomendaciones.', gpt: 'https://chatgpt.com/g/g-69d59bcd4f00819197889d15b4f9e91e-management-analyst', gem: 'https://gemini.google.com/gem/82a277dc6190' },
  { slug: 'operations-analyst', name: 'OperationsAnalyst', moat: 'Ontología', desc: 'Análisis operativo. Identificación de cuellos de botella, pérdidas y oportunidades de mejora.', gpt: 'https://chatgpt.com/g/g-69d59bf156b08191bc343b028924119b-operations-analyst', gem: 'https://gemini.google.com/gem/4ed677f02c1d' },
  { slug: 'prompt-analyst', name: 'PromptAnalyst', moat: 'Ontología', desc: 'Análisis y mejora de prompts. Evaluación de calidad, optimización y reverse engineering.', gpt: 'https://chatgpt.com/g/g-69d59c0f5e408191b534e050f8383fd2-prompt-analyst', gem: 'https://gemini.google.com/gem/1ceb8ab92214' },
  { slug: 'qa-analyst', name: 'QAAnalyst', moat: 'Ontología', desc: 'Aseguramiento de calidad. Revisión de entregables, checklists y validación contra estándares.', gpt: 'https://chatgpt.com/g/g-69d59c1841588191817120014c14a88f-qa-analyst', gem: 'https://gemini.google.com/gem/a5f91f2341d7' },

  // Activos
  { slug: 'dbr', name: 'DBR', moat: 'Activos', desc: 'Daily Business Review. Revisión diaria del negocio: métricas clave, blockers y decisiones del día.', gpt: 'https://chatgpt.com/g/g-69d58e3ead488191b07fcbf521811f3d-dbr', gem: 'https://gemini.google.com/gem/12676dce65c5' },
  { slug: 'wbr', name: 'WBR', moat: 'Activos', desc: 'Weekly Business Review. Revisión semanal: progreso vs plan, desvíos y ajustes tácticos.', gpt: 'https://chatgpt.com/g/g-69d5cf9973a4819187b902cb0b5d9c89-wbr', gem: 'https://gemini.google.com/gem/3175ccb9651c' },
  { slug: 'mbr', name: 'MBR', moat: 'Activos', desc: 'Monthly Business Review. Revisión mensual: trends, pipeline, health metrics y forecast.', gpt: 'https://chatgpt.com/g/g-69d59bd350008191b71a8a2a874d693b-mbr', gem: 'https://gemini.google.com/gem/35c9bb15a2a6' },
  { slug: 'qbr', name: 'QBR', moat: 'Activos', desc: 'Quarterly Business Review. Revisión trimestral: OKRs, resultados y planificación del siguiente Q.', gpt: 'https://chatgpt.com/g/g-69d59c145ba8819183d122cf63052a07-qbr', gem: 'https://gemini.google.com/gem/c712b5683bf4' },
  { slug: 'hbr', name: 'HBR', moat: 'Activos', desc: 'Half-Year Business Review. Revisión semestral: estrategia, inversión y ajuste de roadmap.', gpt: 'https://chatgpt.com/g/g-69d591e55c448191a38e3e137bfd9a29-hbr', gem: 'https://gemini.google.com/gem/ec9e732fc19d' },
  { slug: 'ybr', name: 'YBR', moat: 'Activos', desc: 'Yearly Business Review. Revisión anual: retrospectiva, lecciones y visión del siguiente año.', gpt: 'https://chatgpt.com/g/g-69d5cf4872708191b6b313c9c3b701bb-ybr', gem: 'https://gemini.google.com/gem/2e537da66c6f' },
  { slug: 'meeting-analyst', name: 'MeetingAnalyst', moat: 'Activos', desc: 'Análisis de reuniones. Extrae acuerdos, action items y decisiones de transcripciones.', gpt: 'https://chatgpt.com/g/g-69d59bd8600c8191b72c48cbe394456a-meeting-analyst', gem: 'https://gemini.google.com/gem/d4679df24c33' },
  { slug: 'notetaker', name: 'NoteTaker', moat: 'Activos', desc: 'Toma de notas inteligente. Estructura, conecta y enriquece notas con contexto y referencias.', gpt: 'https://chatgpt.com/g/g-69d59bdd53308191a45d2cb4f5c33dcf-notetaker', gem: 'https://gemini.google.com/gem/5c9ac97027c7' },
  { slug: 'task-tracking-analyst', name: 'TaskTrackingAnalyst', moat: 'Activos', desc: 'Seguimiento de tareas. Priorización, dependencias y alertas de bloqueo.', gpt: 'https://chatgpt.com/g/g-69d5cf9578e08191a7d15fd034bb7176-task-tracking-analyst', gem: 'https://gemini.google.com/gem/f7db0e0343c8' },

  // Templates
  { slug: 'infographic-gem-studio', name: 'InfographicGemStudio', moat: 'Templates', desc: 'Estudio de infografías con IA. Diseño visual de datos, frameworks y procesos.', gpt: 'https://chatgpt.com/g/g-69d591f04c4081919d9ec50c0178fa8c-infographic-gem-studio', gem: 'https://gemini.google.com/gem/f2c4e79c86fa' },
  { slug: 'infographic-multimodal', name: 'InfographicMultimodalGenerator', moat: 'Templates', desc: 'Generador multimodal de infografías. Combina texto, datos y visualización en un solo output.', gpt: 'https://chatgpt.com/g/g-69d591f552b08191b289e08a45106354-infographic-multimodal-', gem: 'https://gemini.google.com/gem/86f8dc50c3c5' },
  { slug: 'infographic-strategy', name: 'InfographicStrategyPlanner', moat: 'Templates', desc: 'Planificador estratégico de infografías. Define narrativa visual, estructura y flujo de información.', gpt: 'https://chatgpt.com/g/g-69d591fa4ccc8191ab90ee61fa33534a-infographic-strategy-pl', gem: 'https://gemini.google.com/gem/8c28976809c8' },
];

function generateLanding(a) {
  const cat = MOAT_CATEGORIES[a.moat];
  const hasGem = a.gem ? `<a href="${a.gem}" target="_blank" rel="noopener noreferrer" class="home-cta home-cta--secondary" style="display:inline-flex;">Abrir en Gemini →</a>` : '';
  const hasGpt = a.gpt ? `<a href="${a.gpt}" target="_blank" rel="noopener noreferrer" class="home-cta home-cta--primary" style="display:inline-flex;">Abrir en ChatGPT →</a>` : '';

  return `<!DOCTYPE html>
<html lang="es" data-page-slug="recursos">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0, viewport-fit=cover">
  <title>${a.name} | Asistentes MetodologIA</title>
  <meta name="description" content="${a.desc}">
  <link rel="canonical" href="https://metodologia.info/recursos/asistentes/${a.slug}/">
  <meta name="robots" content="index, follow">
  <meta property="og:title" content="${a.name} | MetodologIA">
  <meta property="og:description" content="${a.desc}">
  <script type="importmap">{"imports":{"firebase/app":"https://www.gstatic.com/firebasejs/10.14.0/firebase-app.js","firebase/firestore":"https://www.gstatic.com/firebasejs/10.14.0/firebase-firestore.js"}}</script>
  <script>const t=localStorage.getItem('mdg_theme');if(t==='dark')document.documentElement.dataset.theme='dark';else document.documentElement.dataset.theme='light';</script>
  <link rel="preconnect" href="https://fonts.googleapis.com">
  <link rel="preconnect" href="https://fonts.gstatic.com" crossorigin>
  <link rel="stylesheet" href="https://fonts.googleapis.com/css2?family=Poppins:wght@700;900&family=Montserrat:wght@400;600;700&display=swap">
  <link rel="stylesheet" href="../../../estilos/neoswiss-system.css?v=4">
  <link rel="stylesheet" href="../../../estilos/home.css?v=4">
  <link rel="stylesheet" href="../../../estilos/triple-toggle.css?v=4">
  <link rel="icon" type="image/svg+xml" href="../../../favicon.svg">
</head>
<body>
  <div class="bg-mesh" aria-hidden="true"></div>
  <a href="#main" class="sr-only">Saltar al contenido</a>
  <site-header></site-header>
  <main id="main" class="main">
    <section class="section" style="min-height:60vh;display:flex;align-items:center;">
      <div class="container" style="max-width:640px;">
        <span class="eyebrow" style="color:${cat.color};">MOAT · ${a.moat}</span>
        <h1 class="h1" style="margin:1rem 0;">${a.name}</h1>
        <p class="lead" style="margin-bottom:1.5rem;">${a.desc}</p>
        <div class="principle x-card" style="margin-bottom:1.5rem;">
          <span class="principle__num">Patrón MOAT · ${a.moat}</span>
          <p class="principle__body">${cat.desc}. Cada asistente del ecosistema MetodologIA sigue el estándar <strong style="color:var(--brand-gold);">100 ✓</strong> de calidad.</p>
        </div>
        <div class="home-hero__ctas" style="justify-content:flex-start;">
          ${hasGpt}
          ${hasGem}
        </div>
        <p class="muted" style="font-size:.8rem;margin-top:1.5rem;">
          Parte del ecosistema de <strong>32 GPTs + 31 Gems</strong> de Metodolog<span style="color:var(--brand-gold)">IA</span>.
          <a href="/recursos/asistentes-gpt/" style="color:var(--brand-gold);">Ver todos los GPTs →</a>
        </p>
      </div>
    </section>
  </main>
  <triple-toggle></triple-toggle>
  <consent-banner></consent-banner>
  <site-footer></site-footer>
  <script type="module">import{initShell}from'../../../js/blueprint/shell.js?v=4';initShell({pageSlug:'recursos'});</script>
</body>
</html>`;
}

// Generate all landings
const baseDir = join(process.cwd(), 'recursos', 'asistentes');
if (!existsSync(baseDir)) mkdirSync(baseDir, { recursive: true });

let count = 0;
for (const a of ASSISTANTS) {
  const dir = join(baseDir, a.slug);
  if (!existsSync(dir)) mkdirSync(dir, { recursive: true });
  writeFileSync(join(dir, 'index.html'), generateLanding(a));
  count++;
}

console.log(`✓ ${count} assistant landing pages generated in recursos/asistentes/`);

/**
 * home-glossary.js — Bilingual modal content for home page
 *
 * Exports GLOSSARY object keyed by entry ID, each with { es, en } variants.
 * Each variant has { term, title, body } for the info dialog.
 *
 * @license Copyleft
 * @copyright MetodologIA
 */

export const GLOSSARY = {
  // ── Estándar 100 ✓ ──
  std100: {
    es: {
      term: 'Estándar de Calidad', title: '100 ✓',
      body: `<p class="std100-tagline"><em>1</em> prompt → valor. <em>0</em> fricción. <em>0</em> delay.</p>
<div class="std100-grid">
  <div class="std100-cell"><span class="std100-num">1</span><span class="std100-lbl">Prompt = Resultado</span></div>
  <div class="std100-cell"><span class="std100-num">0</span><span class="std100-lbl">Fricción</span></div>
  <div class="std100-cell"><span class="std100-num">0</span><span class="std100-lbl">Delay</span></div>
  <div class="std100-cell"><span class="std100-num">✓</span><span class="std100-lbl">Entrusted</span></div>
</div>
<p style="margin-top:.75rem;font-size:.85rem;">Calidad verificada: relevancia contextual, precisión factual y protocolo anti-alucinaciones en cada recurso que publicamos.</p>`
    },
    en: {
      term: 'Quality Standard', title: '100 ✓',
      body: `<p class="std100-tagline"><em>1</em> prompt → value. <em>0</em> friction. <em>0</em> delay.</p>
<div class="std100-grid">
  <div class="std100-cell"><span class="std100-num">1</span><span class="std100-lbl">Prompt = Result</span></div>
  <div class="std100-cell"><span class="std100-num">0</span><span class="std100-lbl">Friction</span></div>
  <div class="std100-cell"><span class="std100-num">0</span><span class="std100-lbl">Delay</span></div>
  <div class="std100-cell"><span class="std100-num">✓</span><span class="std100-lbl">Entrusted</span></div>
</div>
<p style="margin-top:.75rem;font-size:.85rem;">Verified quality: contextual relevance, factual accuracy and anti-hallucination protocol in every resource we publish.</p>`
    }
  },

  // ── Diagnóstico (cards home) ──
  diag_personas: {
    es: { term: 'Diagnóstico para Personas', title: 'Autodiagnóstico Profesional',
      body: '<p>4 formularios que miden tu nivel real en <strong>4 dimensiones</strong>:</p><ul><li><strong>Ficha Personal</strong> — contexto, rol, motivaciones (3-4 min)</li><li><strong>Madurez en IA</strong> — adopción real, no teórica (4-5 min)</li><li><strong>Método y Formas de Trabajo</strong> — cómo organizas y produces (4-5 min)</li><li><strong>Capacidades Digitales</strong> — competencias en 5 áreas (8-9 min)</li></ul><p style="margin-top:.75rem;font-size:.85rem;color:var(--brand-text-soft);">Total: ~20 minutos. Sin costo. Resultados personalizados con IA.</p>',
      cta: 'Ir al diagnóstico →', ctaHref: 'diagnostico/#segmento' },
    en: { term: 'Diagnosis for Individuals', title: 'Professional Self-Assessment',
      body: '<p>4 forms that measure your real level across <strong>4 dimensions</strong>:</p><ul><li><strong>Personal Profile</strong> — context, role, motivations (3-4 min)</li><li><strong>AI Maturity</strong> — real adoption, not theoretical (4-5 min)</li><li><strong>Methodology & Ways of Working</strong> — how you organize and produce (4-5 min)</li><li><strong>Digital Capabilities</strong> — skills across 5 areas (8-9 min)</li></ul><p style="margin-top:.75rem;font-size:.85rem;color:var(--brand-text-soft);">Total: ~20 minutes. No cost. AI-personalized results.</p>',
      cta: 'Go to diagnosis →', ctaHref: 'diagnostico/#segmento' }
  },
  diag_empresas: {
    es: { term: 'Diagnóstico para Empresas', title: 'Evaluación Organizacional',
      body: '<p>Evaluación profunda con <strong>entrevistas focalizadas</strong> a líderes clave de tu organización.</p><h4>Qué incluye</h4><ul><li><strong>Radar organizacional</strong> — madurez digital, metodológica y cultural</li><li><strong>Mapa de dolores</strong> — fricciones operativas priorizadas por impacto</li><li><strong>Roadmap priorizado</strong> — plan de acción con quick wins y estrategia a 90 días</li></ul><p style="margin-top:.75rem;font-size:.85rem;color:var(--brand-text-soft);">Por reunión. Entregable: Documento de Entendimiento con diagnóstico + ruta.</p>',
      cta: 'Agendar evaluación →', ctaHref: 'diagnostico/#madurez' },
    en: { term: 'Diagnosis for Companies', title: 'Organizational Assessment',
      body: '<p>Deep evaluation with <strong>focused interviews</strong> with key leaders in your organization.</p><h4>What it includes</h4><ul><li><strong>Organizational radar</strong> — digital, methodological and cultural maturity</li><li><strong>Pain map</strong> — operational frictions prioritized by impact</li><li><strong>Prioritized roadmap</strong> — action plan with quick wins and 90-day strategy</li></ul><p style="margin-top:.75rem;font-size:.85rem;color:var(--brand-text-soft);">By meeting. Deliverable: Understanding Document with diagnosis + route.</p>',
      cta: 'Schedule assessment →', ctaHref: 'diagnostico/#madurez' }
  },

  // ── Diagnóstico (3 pasos) ──
  diag01: {
    es: { term: 'Diagnóstico · Paso 1', title: '5 Dimensiones',
      body: '<p>Evaluamos tu situación en <strong>5 ejes</strong>: madurez digital, dolor operativo, urgencia estratégica, capacidad del equipo y segmento de mercado.</p><h4>Resultado</h4><p>Radar visual con tu nivel actual en cada dimensión.</p>' },
    en: { term: 'Diagnosis · Step 1', title: '5 Dimensions',
      body: '<p>We assess your situation across <strong>5 axes</strong>: digital maturity, operational pain, strategic urgency, team capacity and market segment.</p><h4>Result</h4><p>Visual radar with your current level in each dimension.</p>' }
  },
  diag02: {
    es: { term: 'Diagnóstico · Paso 2', title: 'Tu Perfil',
      body: '<p>Construimos tu <strong>radar de competencias</strong> con nivel detallado por área.</p><h4>Resultado</h4><p>Mapa de fortalezas y brechas priorizadas por impacto.</p>' },
    en: { term: 'Diagnosis · Step 2', title: 'Your Profile',
      body: '<p>We build your <strong>competency radar</strong> with detailed level per area.</p><h4>Result</h4><p>Map of strengths and gaps prioritized by impact.</p>' }
  },
  diag03: {
    es: { term: 'Diagnóstico · Paso 3', title: 'Tu Roadmap',
      body: '<p>Plan de acción priorizado con <strong>siguiente paso inmediato</strong>.</p><h4>Resultado</h4><p>Roadmap personalizado alineado a tus objetivos y recursos.</p>' },
    en: { term: 'Diagnosis · Step 3', title: 'Your Roadmap',
      body: '<p>Prioritized action plan with <strong>immediate next step</strong>.</p><h4>Result</h4><p>Personalized roadmap aligned to your goals and resources.</p>' }
  },

  // ── Recursos (3 tiles) ──
  rec_asist: {
    es: { term: 'Recursos Abiertos', title: 'GPTs + Gems',
      body: '<p><strong>18 Custom GPTs</strong> y <strong>5 Gemini Gems</strong> especializados por área.</p><h4>Incluye</h4><ul><li>Pristino — comité completo en 1 chat</li><li>Prompting avanzado para ventas y estrategia</li><li>Research con método y evidencia</li></ul>' },
    en: { term: 'Open Resources', title: 'GPTs + Gems',
      body: '<p><strong>18 Custom GPTs</strong> and <strong>5 Gemini Gems</strong> specialized by area.</p><h4>Includes</h4><ul><li>Pristino — full committee in 1 chat</li><li>Advanced prompting for sales and strategy</li><li>Research with method and evidence</li></ul>' }
  },
  rec_prompts: {
    es: { term: 'Recursos Abiertos', title: '180+ Prompts',
      body: '<p>Bibliotecas curadas para <strong>ventas, desarrollo, estrategia y productividad</strong>.</p><h4>Organización</h4><ul><li>Por rol y nivel de experiencia</li><li>Plantillas copy-paste listas para usar</li><li>Calidad <strong style="color:var(--brand-gold)">100 ✓</strong></li></ul>' },
    en: { term: 'Open Resources', title: '180+ Prompts',
      body: '<p>Curated libraries for <strong>sales, development, strategy and productivity</strong>.</p><h4>Organization</h4><ul><li>By role and experience level</li><li>Copy-paste templates ready to use</li><li>Quality <strong style="color:var(--brand-gold)">100 ✓</strong></li></ul>' }
  },
  rec_tools: {
    es: { term: 'Recursos Abiertos', title: 'Playbooks + n8n',
      body: '<p>Guías operativas paso a paso y <strong>automatizaciones listas</strong> para importar.</p><h4>Incluye</h4><ul><li>Flujos n8n para prospección y seguimiento</li><li>Playbooks de implementación por caso de uso</li><li>Templates de automatización empresarial</li></ul>' },
    en: { term: 'Open Resources', title: 'Playbooks + n8n',
      body: '<p>Step-by-step operational guides and <strong>ready-to-import automations</strong>.</p><h4>Includes</h4><ul><li>n8n flows for prospecting and follow-up</li><li>Implementation playbooks per use case</li><li>Enterprise automation templates</li></ul>' }
  },

  // ── Workshops (WS-01 a WS-12) ──
  ws01: {
    es: { term: 'Workshop · 1-3h', title: 'WS-01 · Intro IA',
      body: '<p>Superar la <em>Falacia de la Herramienta</em>: la IA amplifica, no sustituye el método.</p><h4>Entregable</h4><p>Mapeo de ecosistema y diagnóstico "Caos vs IA".</p>' },
    en: { term: 'Workshop · 1-3h', title: 'WS-01 · AI Intro',
      body: '<p>Overcome the <em>Tool Fallacy</em>: AI amplifies, it doesn\'t replace method.</p><h4>Deliverable</h4><p>Ecosystem mapping and "Chaos vs AI" diagnosis.</p>' }
  },
  ws02: {
    es: { term: 'Workshop · 1-3h', title: 'WS-02 · Prompting Avanzado',
      body: '<p>Protocolos de interacción de alto rendimiento. Calidad <strong style="color:var(--brand-gold)">100 ✓</strong> desde el primer prompt.</p><h4>Entregable</h4><p>Biblioteca de prompts maestros personalizados.</p>' },
    en: { term: 'Workshop · 1-3h', title: 'WS-02 · Advanced Prompting',
      body: '<p>High-performance interaction protocols. <strong style="color:var(--brand-gold)">100 ✓</strong> quality from the first prompt.</p><h4>Deliverable</h4><p>Personalized master prompt library.</p>' }
  },
  ws03: {
    es: { term: 'Workshop · 1-3h', title: 'WS-03 · Segundo Cerebro',
      body: '<p>PKM con Obsidian/Notion. Nada se olvida, todo se conecta.</p><h4>Entregable</h4><p>Arquitectura PARA/Zettelkasten operativa.</p><h4>Impacto</h4><p>Recupera <strong>5h semanales</strong> de búsqueda.</p>' },
    en: { term: 'Workshop · 1-3h', title: 'WS-03 · Second Brain',
      body: '<p>PKM with Obsidian/Notion. Nothing forgotten, everything connected.</p><h4>Deliverable</h4><p>Operational PARA/Zettelkasten architecture.</p><h4>Impact</h4><p>Recover <strong>5h weekly</strong> from searching.</p>' }
  },
  ws04: {
    es: { term: 'Workshop · 1-3h', title: 'WS-04 · Productividad Personal',
      body: '<p>GTD + Kanban para dominar el flujo, no la lista.</p><h4>Entregable</h4><p>Tablero de control y sistema "Mente como el Agua".</p>' },
    en: { term: 'Workshop · 1-3h', title: 'WS-04 · Personal Productivity',
      body: '<p>GTD + Kanban to master flow, not lists.</p><h4>Deliverable</h4><p>Control board and "Mind Like Water" system.</p>' }
  },
  ws05: {
    es: { term: 'Workshop · 1-3h', title: 'WS-05 · Moving Motivators',
      body: '<p>Descubre qué mueve a tu equipo con la dinámica de <em>Management 3.0</em>.</p><h4>Entregable</h4><p>Mapa de motivaciones del equipo y plan de acción.</p>' },
    en: { term: 'Workshop · 1-3h', title: 'WS-05 · Moving Motivators',
      body: '<p>Discover what drives your team with the <em>Management 3.0</em> dynamic.</p><h4>Deliverable</h4><p>Team motivation map and action plan.</p>' }
  },
  ws06: {
    es: { term: 'Workshop · 1-3h', title: 'WS-06 · Happiness Canvas',
      body: '<p>Framework visual para medir y mejorar la satisfacción del equipo.</p><h4>Entregable</h4><p>Canvas completado con compromisos de mejora.</p>' },
    en: { term: 'Workshop · 1-3h', title: 'WS-06 · Happiness Canvas',
      body: '<p>Visual framework to measure and improve team satisfaction.</p><h4>Deliverable</h4><p>Completed canvas with improvement commitments.</p>' }
  },
  ws07: {
    es: { term: 'Workshop · 1-3h', title: 'WS-07 · Team Canvas',
      body: '<p>Alinear propósito, valores, roles y reglas del equipo en una sesión.</p><h4>Entregable</h4><p>Team Canvas firmado como acuerdo de trabajo.</p>' },
    en: { term: 'Workshop · 1-3h', title: 'WS-07 · Team Canvas',
      body: '<p>Align purpose, values, roles and team rules in one session.</p><h4>Deliverable</h4><p>Team Canvas signed as a working agreement.</p>' }
  },
  ws08: {
    es: { term: 'Workshop · 1-3h', title: 'WS-08 · De Ocupado a Productivo',
      body: '<p>Identificar y eliminar las trampas de la "falsa productividad".</p><h4>Entregable</h4><p>Auditoría personal de tiempo y plan de recuperación.</p>' },
    en: { term: 'Workshop · 1-3h', title: 'WS-08 · From Busy to Productive',
      body: '<p>Identify and eliminate "false productivity" traps.</p><h4>Deliverable</h4><p>Personal time audit and recovery plan.</p>' }
  },
  ws09: {
    es: { term: 'Workshop · 1-3h', title: 'WS-09 · ¿Qué pasa con la IA?',
      body: '<p>Panorama real de la IA: oportunidades, riesgos y mitos desmentidos.</p><h4>Entregable</h4><p>Mapa de oportunidades IA para tu contexto específico.</p>' },
    en: { term: 'Workshop · 1-3h', title: 'WS-09 · What\'s Happening with AI?',
      body: '<p>Real AI landscape: opportunities, risks and debunked myths.</p><h4>Deliverable</h4><p>AI opportunity map for your specific context.</p>' }
  },
  ws10: {
    es: { term: 'Workshop · 1-3h', title: 'WS-10 · Ideación con IA',
      body: '<p>Técnicas de brainstorming potenciadas con IA generativa.</p><h4>Entregable</h4><p>Pipeline de ideas priorizadas y validadas.</p>' },
    en: { term: 'Workshop · 1-3h', title: 'WS-10 · Ideation with AI',
      body: '<p>Brainstorming techniques powered by generative AI.</p><h4>Deliverable</h4><p>Pipeline of prioritized and validated ideas.</p>' }
  },
  ws11: {
    es: { term: 'Workshop · 1-3h', title: 'WS-11 · Ética y Gobernanza',
      body: '<p>Framework para uso responsable de IA en tu organización.</p><h4>Entregable</h4><p>Checklist de gobernanza y política de uso IA.</p>' },
    en: { term: 'Workshop · 1-3h', title: 'WS-11 · Ethics & Governance',
      body: '<p>Framework for responsible AI use in your organization.</p><h4>Deliverable</h4><p>Governance checklist and AI usage policy.</p>' }
  },
  ws12: {
    es: { term: 'Workshop · 1-3h', title: 'WS-12 · Liderazgo Exponencial',
      body: '<p>Liderar equipos en la era de la IA: delegar a humanos <em>y</em> a agentes.</p><h4>Entregable</h4><p>Plan de liderazgo híbrido humano + IA.</p>' },
    en: { term: 'Workshop · 1-3h', title: 'WS-12 · Exponential Leadership',
      body: '<p>Leading teams in the AI era: delegating to humans <em>and</em> agents.</p><h4>Deliverable</h4><p>Hybrid human + AI leadership plan.</p>' }
  },

  // ── Propósito / Ikigai ──
  iki_love: {
    es: { term: 'Ikigai', title: 'Lo que amamos',
      body: '<ul><li>Idear estrategia con socios</li><li>Diseñar sistemas y guardrails</li><li>Enseñar y habilitar: que otros superen</li><li>Ordenar caos en claridad</li></ul>' },
    en: { term: 'Ikigai', title: 'What we love',
      body: '<ul><li>Ideating strategy with partners</li><li>Designing systems and guardrails</li><li>Teaching and enabling: helping others excel</li><li>Turning chaos into clarity</li></ul>' }
  },
  iki_good: {
    es: { term: 'Ikigai', title: 'Lo que hacemos bien',
      body: '<ul><li>Convertir problemas en operación estable</li><li>Habilitar equipos (capacidades/CoE)</li><li>IA aplicada con método</li><li>Traducir complejo → operable</li></ul>' },
    en: { term: 'Ikigai', title: 'What we do well',
      body: '<ul><li>Turning problems into stable operations</li><li>Enabling teams (capabilities/CoE)</li><li>AI applied with method</li><li>Translating complex → operable</li></ul>' }
  },
  iki_need: {
    es: { term: 'Ikigai', title: 'Lo que el mundo necesita',
      body: '<ul><li>Adopción segura de IA (sin humo)</li><li>Competitividad real para personas y organizaciones</li><li>Reducir trabajo invisible</li><li>Sistemas sostenibles</li></ul>' },
    en: { term: 'Ikigai', title: 'What the world needs',
      body: '<ul><li>Safe AI adoption (no hype)</li><li>Real competitiveness for people and organizations</li><li>Reducing invisible work</li><li>Sustainable systems</li></ul>' }
  },
  iki_paid: {
    es: { term: 'Ikigai', title: 'Por lo que nos pagan',
      body: '<ul><li>Bootcamps y talleres in-company</li><li>Diagnóstico + roadmap por proceso</li><li>Pilotos de implementación</li><li>Activos 1→N (playbooks, asistentes, automatizaciones)</li></ul>' },
    en: { term: 'Ikigai', title: 'What we get paid for',
      body: '<ul><li>Bootcamps and in-company workshops</li><li>Diagnosis + roadmap per process</li><li>Implementation pilots</li><li>1→N assets (playbooks, assistants, automations)</li></ul>' }
  },

  // ── Método (4 fases) ──
  fase01: {
    es: { term: 'El Método · Fase 1', title: 'Fundamentar',
      body: '<p>Mapear dolores, oportunidades y recursos con <strong>evidencia</strong>, no intuición.</p><h4>Salida</h4><p>Diagnóstico completo + mapa de prioridades.</p>' },
    en: { term: 'The Method · Phase 1', title: 'Foundation',
      body: '<p>Map pain points, opportunities and resources with <strong>evidence</strong>, not intuition.</p><h4>Output</h4><p>Complete diagnosis + priority map.</p>' }
  },
  fase02: {
    es: { term: 'El Método · Fase 2', title: 'Acelerar',
      body: '<p>Eliminar fricción y activar <strong>victorias rápidas</strong> que generan momentum.</p><h4>Salida</h4><p>Quick wins implementados + métricas base.</p>' },
    en: { term: 'The Method · Phase 2', title: 'Accelerate',
      body: '<p>Eliminate friction and trigger <strong>quick wins</strong> that build momentum.</p><h4>Output</h4><p>Implemented quick wins + baseline metrics.</p>' }
  },
  fase03: {
    es: { term: 'El Método · Fase 3', title: 'Catalizar',
      body: '<p>Convertir conocimiento tácito en <strong>activos digitales</strong> reutilizables.</p><h4>Salida</h4><p>Playbooks, templates y flujos automatizados.</p>' },
    en: { term: 'The Method · Phase 3', title: 'Catalyze',
      body: '<p>Turn tacit knowledge into reusable <strong>digital assets</strong>.</p><h4>Output</h4><p>Playbooks, templates and automated workflows.</p>' }
  },
  fase04: {
    es: { term: 'El Método · Fase 4', title: 'Amplificar',
      body: '<p>Agentes de Metodolog<span style="color:var(--brand-gold)">IA</span> trabajan <strong>24/7</strong> por ti.</p><h4>Salida</h4><p>Ecosistema autónomo con supervisión humana estratégica.</p>' },
    en: { term: 'The Method · Phase 4', title: 'Amplify',
      body: '<p>Metodolog<span style="color:var(--brand-gold)">IA</span> agents work <strong>24/7</strong> for you.</p><h4>Output</h4><p>Autonomous ecosystem with strategic human oversight.</p>' }
  },

  // ── Bootcamps ──
  bc01: {
    es: { term: 'Bootcamp · 18h', title: 'BC-01 · Ofimática con IA',
      body: '<p>M365 + Copilot. Automatizar la burocracia para liberar talento.</p><h4>Entregable</h4><p>Automatización de reportes, presentaciones y flujos.</p><h4>Impacto</h4><p>Recupera <strong>2h diarias</strong>.</p>' },
    en: { term: 'Bootcamp · 18h', title: 'BC-01 · Office Suite with AI',
      body: '<p>M365 + Copilot. Automate bureaucracy to free up talent.</p><h4>Deliverable</h4><p>Automated reports, presentations and workflows.</p><h4>Impact</h4><p>Recover <strong>2h daily</strong>.</p>' }
  },
  bc02: {
    es: { term: 'Bootcamp · 18h', title: 'BC-02 · Ventas con IA',
      body: '<p>Prospección híbrida y personalización a escala.</p><h4>Entregable</h4><p>Pipeline comercial automatizado.</p><h4>Impacto</h4><p><strong>Conexión genuina</strong> a escala.</p>' },
    en: { term: 'Bootcamp · 18h', title: 'BC-02 · Sales with AI',
      body: '<p>Hybrid prospecting and personalization at scale.</p><h4>Deliverable</h4><p>Automated commercial pipeline.</p><h4>Impact</h4><p><strong>Genuine connection</strong> at scale.</p>' }
  },
  bc03: {
    es: { term: 'Bootcamp · 18h', title: 'BC-03 · Formas de Trabajo',
      body: '<p>Agile + GTD + 2º Cerebro integrados con IA.</p><h4>Entregable</h4><p>Tu propio sistema operativo con cero fricción.</p><h4>Impacto</h4><p><strong>Predictibilidad</strong> y flujo constante.</p>' },
    en: { term: 'Bootcamp · 18h', title: 'BC-03 · Ways of Working',
      body: '<p>Agile + GTD + 2nd Brain integrated with AI.</p><h4>Deliverable</h4><p>Your own operating system with zero friction.</p><h4>Impact</h4><p><strong>Predictability</strong> and constant flow.</p>' }
  },
  bc04: {
    es: { term: 'Bootcamp · 18h', title: 'BC-04 · Trabajo Amplificado',
      body: '<p>Crea tus propios GPTs y asistentes autónomos.</p><h4>Entregable</h4><p><strong>3 agentes</strong> atendiendo procesos de negocio.</p>' },
    en: { term: 'Bootcamp · 18h', title: 'BC-04 · Amplified Work',
      body: '<p>Create your own GPTs and autonomous assistants.</p><h4>Deliverable</h4><p><strong>3 agents</strong> handling business processes.</p>' }
  },
  bc05: {
    es: { term: 'Bootcamp · 18h', title: 'BC-05 · Vibe Coding',
      body: '<p>Construir software sin saber programar.</p><h4>Entregable</h4><p>Web app funcional lista para producción.</p><h4>Impacto</h4><p><strong>Independencia total</strong> de TI.</p>' },
    en: { term: 'Bootcamp · 18h', title: 'BC-05 · Vibe Coding',
      body: '<p>Build software without knowing how to code.</p><h4>Deliverable</h4><p>Functional web app ready for production.</p><h4>Impact</h4><p><strong>Total independence</strong> from IT.</p>' }
  },

  // ── Programas Élite ──
  elite01: {
    es: { term: 'Élite · 16 semanas', title: 'Programa de Empoderamiento',
      body: '<p>14 módulos en 2 fases: de ejecutante agotado a estratega de impacto.</p><h4>Entregable</h4><p>Plan Maestro de Carrera con IA.</p><dl class="kv"><dt>Nivel</dt><dd>7</dd><dt>Duración</dt><dd>16 semanas · 48h+48h</dd></dl>' },
    en: { term: 'Elite · 16 weeks', title: 'Empowerment Program',
      body: '<p>14 modules in 2 phases: from exhausted doer to impact strategist.</p><h4>Deliverable</h4><p>Master Career Plan with AI.</p><dl class="kv"><dt>Level</dt><dd>7</dd><dt>Duration</dt><dd>16 weeks · 48h+48h</dd></dl>' }
  },
  elite02: {
    es: { term: 'Élite · 16 semanas', title: 'Digital Champions',
      body: '<p>Agentes de cambio internos. Estándar <strong style="color:var(--brand-gold)">100 ✓</strong>.</p><h4>Entregable</h4><p>Marco de transformación organizacional.</p><dl class="kv"><dt>Nivel</dt><dd>9</dd><dt>Duración</dt><dd>16 semanas · 48h+48h</dd></dl>' },
    en: { term: 'Elite · 16 weeks', title: 'Digital Champions',
      body: '<p>Internal change agents. <strong style="color:var(--brand-gold)">100 ✓</strong> standard.</p><h4>Deliverable</h4><p>Organizational transformation framework.</p><dl class="kv"><dt>Level</dt><dd>9</dd><dt>Duration</dt><dd>16 weeks · 48h+48h</dd></dl>' }
  },
};

/**
 * Get glossary entry for the current locale.
 * @param {string} key — glossary entry ID
 * @returns {{ term: string, title: string, body: string } | null}
 */
export function getEntry(key) {
  const entry = GLOSSARY[key];
  if (!entry) return null;
  const lang = (document.documentElement.lang || 'es').slice(0, 2);
  return entry[lang] || entry.es;
}

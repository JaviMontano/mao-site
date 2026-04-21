#!/usr/bin/env python3
"""
Build the Biblioteca Universal v4 — 443 entries.
Format: SPEC (Situacion, Pedido, Ejecucion, Criterio)

Layer 1: 26 single-letter commands (a-z)
Layer 2: 10 digit pipeline commands (0-9)
Layer 3: ~30 single-word accelerators
Layer 4: 365 SPEC prompts

Output: prompts_universales_v4.json
"""
import json
import os

SCRIPT_DIR = os.path.dirname(os.path.abspath(__file__))

PROTOCOLO = """>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion."""

ADJUNTOS_DESC = 'Archivos anexos, URLs de referencia, o "Sin adjuntos"'

def spec(situacion, pedido_arquetipo, pedido_spec, ejecucion_metodo, criterio, checklist_items, inputs):
    """Build a complete SPEC-format prompt string."""
    # Build [inputs]
    input_lines = []
    for inp in inputs:
        name = inp['name']
        desc = inp['desc']
        opt = "(opcional) " if inp.get('opt') else ""
        input_lines.append(f"- {name}: {{{{{name}}}}} > {opt}{desc}")
    input_lines.append(f"- ADJUNTOS: {{{{ADJUNTOS}}}} > {ADJUNTOS_DESC}")
    inputs_block = "\n".join(input_lines)

    # Build [checklist] — only specific items, no generics
    cl = "\n".join(f"- [ ] {c}" for c in checklist_items)

    return f"""[inputs]
{inputs_block}

[prompt]

--- S | SITUACION ---

{situacion}

--- P | PEDIDO ---

Arquetipo: {pedido_arquetipo}

{pedido_spec}

--- E | EJECUCION ---

{PROTOCOLO}

{ejecucion_metodo}

--- C | CRITERIO ---

{criterio}

[checklist]
{cl}"""


# ═══════════════════════════════════════════════════════════════
# LAYER 1: SINGLE-LETTER COMMANDS (a-z)
# ═══════════════════════════════════════════════════════════════

LETTERS = {
    "a": "Aprobado. Proceder con el plan presentado. Repasa los insights clave antes de avanzar con lo operativo.",
    "b": "Busca informacion adicional. Investiga fuentes complementarias, datos recientes y perspectivas alternas. Presenta hallazgos como briefing ejecutivo con fuentes.",
    "c": "Corrige y mejora: ortografia, gramatica, coherencia, tono y claridad. Entrega version limpia sin marcas de cambio. Si hay ambiguedades, resuelve a favor de la claridad.",
    "d": "Desglosa en partes. Descompone en componentes fundamentales. Cada parte con: definicion, relevancia y dependencias. Presenta como arbol o mapa.",
    "e": "Bucle de Excelencia. Define rubrica interna con 10 criterios: fundamento, veracidad, calidad, densidad, simplicidad, claridad, precision, profundidad, coherencia y valor. Evalua 1-10 por criterio. Itera hasta alcanzar 10/10 en todos. Entrega SOLO la version final — sin trazas del proceso. Guarda versiones intermedias en documento separado.",
    "f": "Formatea profesionalmente. Aplica headers, bullets, tablas, negritas, separadores logicos. El resultado debe ser escaneable y ejecutivo en 5 segundos.",
    "g": "Genera 5+ alternativas. Cada una con: nombre descriptivo, enfoque, ventaja principal, trade-off. Presenta en tabla comparativa.",
    "h": "Haz checklist accionable. Cada item: accion concreta, verificable, con responsable implicito y resultado esperado. Ordena por prioridad de impacto.",
    "i": "Identifica contexto completo de esta conversacion. Resume: objetivo principal, decisiones tomadas, temas abiertos, supuestos activos, proximos pasos. Formato: briefing de continuidad.",
    "j": "Justifica con evidencia. Cada afirmacion o recomendacion debe tener: dato, fuente, marco teorico, caso de referencia o razonamiento logico explicito.",
    "k": "Key takeaways. Extrae 5-7 insights mas importantes. Cada uno: insight + implicacion + accion sugerida. Formato escaneable.",
    "l": "Lista pros y contras. Evalua objetivamente ventajas y desventajas. Incluye ponderacion de impacto (alto/medio/bajo) por punto. Cierra con recomendacion.",
    "m": "Mejora significativamente. Toma el ultimo entregable y elevalo: mas profundidad, mejor estructura, datos mas solidos, redaccion mas precisa. Entrega solo la version mejorada.",
    "n": "Next step. Identifica la accion inmediata mas valiosa. Describe: que, quien, cuando, con que recursos, resultado esperado. Maxima concrecion.",
    "o": "Organiza cronologicamente. Crea timeline o secuencia ordenada. Incluye hitos, dependencias y fechas estimadas cuando sea posible.",
    "p": "Profundiza. Expande con mayor detalle, ejemplos concretos, datos de soporte, casos reales y matices no explorados. Nivel: experto senior.",
    "q": "Pregunta lo que falta. Identifica preguntas criticas NO formuladas. Brechas de informacion que podrian cambiar conclusiones o mejorar significativamente el resultado.",
    "r": "Resume ejecutivo. Max 3 parrafos. Parrafo 1: conclusion y recomendacion. Parrafo 2: evidencia y fundamento. Parrafo 3: proximos pasos concretos.",
    "s": "Sintetiza opciones abiertas. Consolida la mejor solucion integrando fortalezas de todas las alternativas y mitigando debilidades de cada una.",
    "t": "Traduce al otro idioma manteniendo tono, intencion y matices culturales. Espanol a ingles profesional o viceversa. Solo la traduccion, sin explicaciones.",
    "u": "Unifica y consolida. De multiples fragmentos o versiones, crea documento unico coherente. Elimina redundancias, resuelve contradicciones, asegura flujo narrativo.",
    "v": "Valida veracidad y consistencia. Marca cada afirmacion: OK / Requiere confirmacion / Potencialmente incorrecto. Sugiere correcciones donde aplique.",
    "w": "What if. Genera 3 escenarios: optimista, pesimista, mas probable. Cada uno con: condiciones de activacion, impacto esperado, acciones recomendadas.",
    "x": "Extrae datos clave en formato estructurado. Nombres, fechas, cifras, metricas, compromisos, decisiones. Presenta en tabla o JSON segun sea mas util.",
    "y": "Ya casi — revision final pre-entrega. Verifica: completitud, consistencia, formato, ortografia, parametros resueltos, listo para uso inmediato.",
    "z": "Zoom out. Perspectiva estrategica. Conecta con el panorama general: objetivos de largo plazo, implicaciones sistemicas, que estamos pasando por alto."
}

# ═══════════════════════════════════════════════════════════════
# LAYER 2: DIGIT PIPELINE (0-9)
# ═══════════════════════════════════════════════════════════════

DIGITS = {
    "0": "PRIMING — Setear Contexto\n\n1. Lee todo lo que comparto (texto, adjuntos, contexto). NO ejecutes nada.\n2. Reformula en tus palabras: quien soy, que hacemos, que restricciones hay.\n3. Pregunta max 3 ambiguedades criticas.\n\nSi el priming es correcto, todo fluye. Si no, todo es desperdicio.",

    "1": "ENTENDER — Comprender la Necesidad\n\n1. Escucha mi idea/tarea/problema (puede ser vago).\n2. Reformula en 1 oracion: Que + Para Que + Para Quien.\n3. Identifica lo que falta para actuar con precision.\n4. Presenta tu comprension para validacion ANTES de continuar.",

    "2": "DEFINIR — Construir el SPEC\n\n1. S: Para que? Que se desbloquea? Contexto y restricciones.\n2. P: Arquetipo experto + entregable concreto + alcance (SI/NO incluye).\n3. E: Metodo, fases, decisiones que requieren mi validacion.\n4. C: Formato, audiencia, tono, medida de exito.\n\nPresenta el SPEC completo para aprobacion. Es el contrato.",

    "3": "PLANIFICAR — Plan de Accion\n\n1. Descompone en fases secuenciales: que produces, que necesitas.\n2. Identifica dependencias y riesgos.\n3. Presenta el plan para aprobacion.\n\nNo ejecutes sin plan aprobado.",

    "4": "EJECUTAR — Primera Version\n\n1. Sigue el SPEC (paso 2) y el Plan (paso 3).\n2. Completitud > perfeccion. Es un draft.\n3. Marca [PENDIENTE] y [VERIFICAR] donde aplique.\n4. Entrega COMPLETO, no parcial.",

    "5": "ROBUSTECER — Agregar Sustancia\n\n1. Datos, fuentes, estadisticas verificables.\n2. Ejemplos concretos y casos reales.\n3. Resuelve todos los [PENDIENTE] y [VERIFICAR].\n\nMas solido, no mas largo.",

    "6": "SIMPLIFICAR — Destilar Valor\n\n1. Duplicados > queda uno. Pasivos > activos. Relleno > eliminado.\n2. Si quitarlo no empeora el resultado, quitarlo.\n3. El output DEBE ser mas corto que el input.\n\nSimplificar es destilar. Lo que sobrevive es diamante.",

    "7": "VALIDAR — Verificar Calidad\n\n1. Ejecuta [checklist] punto por punto: OK / AJUSTE / FALLA.\n2. Verifica coherencia y soporte de afirmaciones.\n3. Si FALLA: volver a paso 5 o 6. Si AJUSTE: corregir y avanzar.",

    "8": "ENTREGAR — Formato Final\n\n1. Aplica tono y formato del Criterio (C).\n2. Verifica: usable sin edicion por la audiencia destino.\n3. Test: si lo recibe alguien exigente, lo aceptaria tal cual?",

    "9": "CRISTALIZAR — Ingenieria Inversa\n\nAnaliza el historial completo. Genera 2 prompts reutilizables:\n\nA) Priming (max 200 palabras): contexto + rol + restricciones.\nB) SPEC de Alto Rendimiento: [inputs]/[prompt] S-P-E-C/[checklist] que produzca el resultado en 1 paso.\n\nEl proceso de hoy construye el atajo de manana."
}

# ═══════════════════════════════════════════════════════════════
# LAYER 3: SINGLE-WORD ACCELERATORS
# ═══════════════════════════════════════════════════════════════

WORDS = {
    # Removed: resume (covered by letter r), traduce (by t), profundiza (by p),
    # simplifica (by step 6 in pipeline), sintetiza (by s), consolida (by u).
    # Letters = micro (1 sentence). Words = detailed (3-5 sentences, different action).
    "compara": "Tabla comparativa estructurada. Columnas: criterios clave. Filas: opciones. Scoring numerico (1-5) por criterio. Totales ponderados. Recomendacion fundamentada al final.",
    "prioriza": "Ordena por impacto real. Top 3 con justificacion explicita. Usa criterios: impacto (alto/medio/bajo), esfuerzo (alto/medio/bajo), urgencia. Presenta como matriz o lista priorizada.",
    "reformula": "Reescribe con claridad profesional. Mismo mensaje, mejor forma. Activa verbos pasivos, elimina ambiguedades, mejora flujo logico. Entrega solo la version mejorada.",
    "debate": "Debate socratico. Presenta 3 perspectivas confrontadas sobre el tema: a favor, en contra, y una tercera via. Cada perspectiva con argumentos solidos. Cierra con sintesis que integre lo mejor de las tres.",
    "investiga": "Investigacion estructurada con fuentes verificables. Formato: hallazgos clave + evidencia + gaps identificados + implicaciones. Cada hallazgo con [FUENTE]. Cero afirmaciones sin soporte.",
    "documenta": "Formaliza en documento profesional con: titulo, fecha, autor, estructura con secciones numeradas, metadata relevante. Listo para archivar o compartir sin edicion.",
    "diagrama": "Crea representacion visual del concepto: diagrama de flujo, mapa mental, matriz, timeline o arquitectura segun aplique. Usa texto estructurado o pseudocodigo de Mermaid/PlantUML.",
    "evalua": "Evaluacion sistematica con rubrica explicita. Define criterios, escala (1-5 o 1-10), evalua cada dimension, presenta scoring total y recomendacion fundamentada.",
    "optimiza": "Identifica ineficiencias, cuellos de botella y desperdicios. Propone mejoras concretas con impacto estimado. Prioriza por ratio beneficio/esfuerzo. Formato: problema > solucion > impacto.",
    "automatiza": "Identifica lo automatizable en el proceso descrito. Para cada oportunidad: que automatizar, con que herramienta, ROI estimado (horas/semana ahorradas), complejidad de implementacion. Prioriza por quick wins.",
    "desafia": "Challenge mode. Ataca la propuesta desde 3 angulos: viabilidad tecnica, viabilidad financiera, viabilidad operativa. Busca fallas, supuestos no validados y riesgos ocultos. Se constructivo pero implacable.",
    "calibra": "Ajusta tono, profundidad y formato a la audiencia especificada. Si la audiencia es C-level: conciso, estrategico, orientado a decision. Si es tecnica: detallado, preciso, con evidencia. Si es general: accesible, con ejemplos.",
    # segmenta removed (covered by letter d=desglosa), consolida removed (covered by letter u=unifica)
    # ─── RESTORED + NEW WORDS to reach 42 total ───
    "resume": "Resume en formato ejecutivo: max 3 parrafos. Parrafo 1: conclusion y recomendacion principal. Parrafo 2: evidencia y fundamento clave. Parrafo 3: proximos pasos concretos con responsable y fecha.",
    "traduce": "Traduce al otro idioma manteniendo tono, intencion y matices culturales. Espanol a ingles profesional. Ingles a espanol latinoamericano profesional. Preserva terminos tecnicos. Solo la traduccion.",
    "profundiza": "Expande con nivel de experto senior: datos, ejemplos concretos, casos de estudio, matices no explorados, perspectivas contrarias. 3x mas valor que el contenido actual.",
    "simplifica": "Reduce a lo esencial. Cada palabra debe ganarse su lugar. Elimina redundancias. Si se puede decir en 1 oracion, no uses 3. El resultado debe ser mas corto que el input.",
    "contextualiza": "Situa en contexto: antecedentes historicos, marco teorico, tendencias relevantes, y por que importa AHORA. Conecta con el panorama general sin perder foco en lo especifico.",
    "cuantifica": "Convierte lo cualitativo en cuantitativo. Cada afirmacion con numero, porcentaje, rango o estimacion fundamentada. Si no hay dato exacto, proporciona orden de magnitud.",
    "visualiza": "Describe como representar visualmente: que tipo de grafico, mapa, diagrama o infografia. Especifica layout, paleta, jerarquia. El visual debe comunicar sin texto adicional.",
    "personaliza": "Adapta a mi contexto profesional especifico. No respuestas genericas — cada recomendacion debe considerar mi rol, sector, equipo, herramientas y restricciones reales.",
    "estructura": "Organiza en estructura piramidal: conclusion primero, argumentos de soporte despues, evidencia al final. Cada nivel responde al 'por que' del nivel superior. MECE.",
    "argumenta": "Construye argumento solido: tesis clara, 3 puntos de soporte con evidencia, anticipacion de contra-argumentos, conclusion. Cada afirmacion con dato o razonamiento explicito.",
    "predice": "Proyecta 3 escenarios basados en la informacion actual: optimista, probable, pesimista. Cada uno con condiciones, probabilidad estimada e implicaciones. No adivinar — extrapolar con fundamento.",
    "mapea": "Crea un mapa visual del concepto: elementos, relaciones, jerarquias, dependencias, flujos. Formato: texto estructurado compatible con Mermaid o diagrama ASCII.",
    "pareto": "Aplica principio 80/20: identifica el 20% de acciones/factores que producen el 80% del resultado. Presenta como lista priorizada con justificacion por item.",
    "verifica": "Verifica cada afirmacion contra fuentes. Marca: verificado / requiere fuente / potencialmente incorrecto. Para lo no verificable, indica nivel de confianza (alto/medio/bajo).",
    "operacionaliza": "Convierte el plan abstracto en operaciones concretas: quien hace que, cuando, con que, como se mide, donde se documenta. Cero ambiguedad. Todo ejecutable manana.",
    "sintetiza": "De multiples fuentes o inputs, produce 1 documento unificado. Solo lo que importa. Elimina redundancias, resuelve contradicciones, mantiene la esencia. Max 1 pagina.",
    "segmenta": "Divide en segmentos manejables con criterio logico. Cada segmento: nombre, alcance, dependencias, entregable parcial. Presenta como plan de trabajo segmentado.",
    "escenarios": "Genera 3 escenarios alternativos para la situacion: conservador, base, agresivo. Para cada uno: supuestos, implicaciones, acciones recomendadas, probabilidad estimada.",
    "prototipa": "Version minima viable. Lo suficiente para validar la idea o concepto. Rapido, funcional, descartable. Identifica: que valida este prototipo y que NO valida.",
    "escala": "Toma lo que funciona y disenalo para 10x volumen. Identifica: que se rompe al escalar, que necesita cambiar, que automatizar. Presenta plan de escalamiento progresivo.",
    "aterriza": "De lo abstracto a lo concreto. Cada concepto se traduce en: accion especifica, fecha, responsable, entregable medible. Cero generalidades.",
    "conecta": "Encuentra relaciones entre conceptos aparentemente separados. Mapea conexiones, patrones transversales y sinergias. Presenta como mapa de relaciones o insight de segundo orden.",
    "auditoria": "Revision exhaustiva y sistematica. Marca cada elemento: completo / faltante / incorrecto. Presenta hallazgos ordenados por severidad. Incluye recomendaciones de correccion.",
    "narrativa": "Transforma datos, hechos o analisis en historia con arco narrativo: situacion > tension > resolucion. Conecta con emociones y acciones. El dato cuenta la historia, la historia mueve a la accion.",
    "benchmark": "Compara contra mejores practicas del sector o industria. Identifica gaps, oportunidades de mejora y quick wins. Formato: metrica > tu estado > mejor practica > gap > accion.",
    "diagnostica": "Analisis de situacion actual. Fortalezas (que funciona), debilidades (que falla), sintomas (que se observa), causas (por que pasa). Formato: diagnostico + prescripcion.",
    "estrategia": "Vision de largo plazo. Define: objetivo estrategico, palancas clave, trade-offs, riesgos, timeline. Conecta con recursos disponibles y restricciones reales.",
    "feedback": "Feedback SBI estructurado: Situacion (cuando/donde), Comportamiento (que observaste, hechos), Impacto (que efecto tuvo). Cierra con pedido de cambio concreto y espacio para dialogo.",
    "reversa": "Ingenieria inversa. Analiza el historial completo de esta sesion. Genera: 1 prompt de priming (contexto + rol) + 1 SPEC de alto rendimiento (que produzca el mismo resultado en 1 paso). Listos para copiar a text expander.",
    "defiende": "Prepara argumentos defensivos para la posicion actual. Anticipa 5 objeciones probables. Para cada una: objecion, respuesta fundamentada, evidencia de soporte. Formato: tabla de objeciones-respuestas."
}

# ═══════════════════════════════════════════════════════════════
# LAYER 4: 365 SPEC PROMPTS
# ═══════════════════════════════════════════════════════════════
# Distribution (70% program-aligned, 30% cross-cutting):
#   productividad: 28 | pensamiento: 25 | investigacion: 25
#   escritura: 25    | data: 22        | visual: 20
#   agentes: 25      | stack: 15       | automatizacion: 18
#   engine: 15       | solucion: 10    | presentacion: 15
#   comunicacion: 12 | decision: 18    | liderazgo: 15
#   aprendizaje: 15  | negociacion: 10 | creatividad: 12
#   bienestar: 10    | meta: 15        | estrategia: 15
#   Total: ~365

SPECS = {}

# ─── PRODUCTIVIDAD (M1-M2) — 28 prompts ───

SPECS["productividad_disenar_ritual_matutino"] = spec(
    situacion="Para maximizar energia, claridad y enfoque desde el inicio del dia. Un ritual matutino bien disenado desbloquea 2-3 horas de deep work diarias que hoy se pierden en arranque lento. Profesion: {{PROFESION}}. Hora de despertar: {{HORA_DESPERTAR}}.",
    pedido_arquetipo="Coach de Alto Rendimiento con certificacion ICF PCC y especializacion en neurociencia aplicada a la productividad (10+ anos).",
    pedido_spec="""Disenar ritual matutino personalizado:
1. Version minima viable (15 min) para dias de alta carga
2. Version expandida (45 min) para dias de deep work
3. Secuencia basada en cronobiologia: cuerpo > mente > enfoque
4. Triggers de activacion y transicion entre fases
5. Checklist imprimible para seguimiento diario
6. Protocolo de recuperacion: que hacer cuando se rompe la racha""",
    ejecucion_metodo="""Metodo:
- Evaluar demandas energeticas del rol profesional
- Disenar secuencia basada en ciclos ultradianos
- Incluir: activacion fisica, priming mental, intencion del dia
- Cada componente con duracion, instruccion y variante express""",
    criterio="Formato: guia personal con ambas versiones. Tono: directo, motivador sin ser cursi. Audiencia: profesional que necesita resultados, no filosofia. Accion: implementar manana.",
    checklist_items=[
        "Las dos versiones (15 y 45 min) estan completas",
        "Cada componente tiene instruccion concreta y duracion",
        "Incluye protocolo de recuperacion ante fallas",
        "El ritual es sostenible a largo plazo, no heroico"
    ],
    inputs=[
        {'name': 'PROFESION', 'desc': 'Tu profesion o rol actual'},
        {'name': 'HORA_DESPERTAR', 'desc': 'Hora habitual de despertar'},
        {'name': 'ENERGIA_ACTUAL', 'desc': 'Nivel de energia al despertar (bajo/medio/alto)', 'opt': True}
    ]
)

SPECS["productividad_auditar_tiempo_semanal"] = spec(
    situacion="Para identificar donde se fuga el tiempo y redirigirlo a actividades de alto impacto. La mayoria de profesionales opera con 70% shallow work y 30% deep work. El objetivo es invertir esa proporcion.",
    pedido_arquetipo="Consultor de Productividad Personal con certificacion GTD (Getting Things Done) y experiencia en coaching ejecutivo de C-levels (15+ anos).",
    pedido_spec="""Auditoria completa del tiempo semanal:
1. Inventario de actividades con horas estimadas
2. Clasificacion: deep work vs shallow work vs admin vs desperdicio
3. Identificacion de las 3 mayores fugas de tiempo
4. Ratio actual deep/shallow y ratio objetivo
5. Semana tipo rediseñada con time blocks optimizados
6. Top 5 acciones inmediatas de mejora (implementables esta semana)""",
    ejecucion_metodo="""Metodo:
- Inventario completo de actividades por categoria
- Matriz Eisenhower para priorización
- Analisis de interrupciones y context switching
- Time blocking basado en picos de energia
- Principio Pareto: 20% actividades que generan 80% resultados""",
    criterio="Formato: diagnostico visual + plan de accion. Max 3 paginas. Tono: analitico y directo. Audiencia: el profesional mismo. Accion: implementar rediseno esta semana.",
    checklist_items=[
        "Todas las actividades semanales estan inventariadas",
        "Las 3 mayores fugas estan cuantificadas en horas",
        "La semana rediseñada es realista (no heroica)",
        "Las 5 acciones inmediatas son ejecutables esta semana"
    ],
    inputs=[
        {'name': 'ACTIVIDADES', 'desc': 'Lista de actividades principales de tu semana tipica'},
        {'name': 'HORAS_TRABAJO', 'desc': 'Horas de trabajo semanales totales'},
        {'name': 'OBJETIVO', 'desc': 'Tu objetivo profesional principal actual', 'opt': True}
    ]
)

SPECS["productividad_sistema_captura_inbox_cero"] = spec(
    situacion="Para eliminar la carga cognitiva de gestionar informacion entrante dispersa en multiples canales. Cada buzón sin procesar es deuda cognitiva que reduce capacidad de deep work.",
    pedido_arquetipo="Arquitecto de Sistemas de Productividad Personal con certificacion GTD y experiencia en diseno de workflows de informacion para equipos remotos.",
    pedido_spec="""Sistema de captura e inbox zero:
1. Mapa de todos los puntos de entrada de informacion
2. Flujo unificado: captura > procesamiento > organizacion > accion
3. Criterios de accion inmediata (regla de 2 minutos) vs diferida
4. Ritual de procesamiento con frecuencia optima
5. Configuracion recomendada por herramienta
6. Metricas de salud del sistema (como saber si funciona)""",
    ejecucion_metodo="""Metodo:
- Auditar todos los canales de entrada (email, chat, notas, tareas)
- Aplicar metodologia GTD: capturar, clarificar, organizar, reflexionar, comprometer
- Disenar filtros y reglas de automatizacion por canal
- Principio: un solo sistema de gestion, multiples puntos de entrada""",
    criterio="Formato: diagrama de flujo + guia de configuracion por herramienta. Tono: practico, paso a paso. Audiencia: profesional con 50+ inputs diarios. Accion: configurar hoy.",
    checklist_items=[
        "Todos los canales de entrada estan mapeados",
        "El flujo de procesamiento tiene menos de 5 pasos",
        "Incluye configuracion especifica por herramienta",
        "El ritual de procesamiento es sostenible (max 30 min/dia)"
    ],
    inputs=[
        {'name': 'HERRAMIENTAS', 'desc': 'Herramientas que usas (email, chat, notas, etc.)'},
        {'name': 'VOLUMEN', 'desc': 'Volumen aproximado de inputs diarios'}
    ]
)

SPECS["productividad_calcular_roi_personal"] = spec(
    situacion="Para cuantificar el retorno de invertir tiempo en una nueva herramienta, habito o metodologia. Las decisiones de adopcion deben basarse en datos, no en entusiasmo.",
    pedido_arquetipo="Analista de ROI y Economia del Comportamiento con MBA y experiencia en cuantificacion de productividad en consultoria (10+ anos).",
    pedido_spec="""Analisis de ROI personal:
1. Linea base actual: horas, calidad, costo de la tarea afectada
2. Estimacion de mejora con la nueva iniciativa
3. Calculo de horas recuperadas por semana/mes/ano
4. Monetizacion del impacto (valor/hora x horas recuperadas)
5. Periodo de retorno (payback period)
6. Escenarios: conservador, probable, optimista""",
    ejecucion_metodo="""Metodo:
- Cuantificar estado actual con precision
- Estimar mejoras basadas en benchmarks o evidencia
- ROI = (Ganancia - Inversion) / Inversion
- Incluir costos ocultos: curva de aprendizaje, migracion, riesgo
- Analisis de sensibilidad: que pasa si la mejora es solo 50% de lo esperado""",
    criterio="Formato: tabla comparativa antes/despues + calculo financiero. Tono: analitico. Audiencia: profesional que necesita justificar la inversion de tiempo. Accion: tomar decision de adopcion informada.",
    checklist_items=[
        "La linea base esta cuantificada con numeros reales",
        "El calculo incluye costos ocultos (aprendizaje, migracion)",
        "Los 3 escenarios son realistas (no solo el optimista)",
        "La recomendacion es clara: adoptar, posponer o descartar"
    ],
    inputs=[
        {'name': 'INICIATIVA', 'desc': 'Herramienta, habito o metodologia a evaluar'},
        {'name': 'HORAS_SEMANALES', 'desc': 'Horas semanales dedicadas a la tarea afectada'},
        {'name': 'VALOR_HORA', 'desc': 'Tu valor por hora estimado', 'opt': True}
    ]
)

SPECS["productividad_disenar_sistema_habitos"] = spec(
    situacion="Para construir un stack de habitos que se refuercen mutuamente y generen resultados compuestos en 90 dias. Los habitos aislados fallan; los sistemas de habitos persisten.",
    pedido_arquetipo="Disenador de Sistemas de Comportamiento con formacion en psicologia conductual y experiencia en coaching de habitos para ejecutivos (Atomic Habits certified).",
    pedido_spec="""Sistema de habitos progresivo:
1. Identidad profesional objetivo (quien quieres ser, no solo que quieres lograr)
2. Auditoria de habitos actuales: cuales conservar, cuales eliminar
3. Habit stack disenado con triggers, rutinas y recompensas
4. Aplicacion de las 4 leyes: obvio, atractivo, facil, satisfactorio
5. Calendario de implementacion de 90 dias con milestones
6. Sistema de tracking simple y protocolo de recuperacion""",
    ejecucion_metodo="""Metodo:
- Framework Atomic Habits de James Clear
- Habit stacking: anclar nuevos habitos a existentes
- Implementation intentions: cuando X ocurra, hare Y
- Two-minute rule: cada habito empieza en su version de 2 minutos
- Never miss twice: protocolo de recuperacion ante fallas""",
    criterio="Formato: plan de 90 dias + tracker + protocolo de recuperacion. Tono: motivador y practico. Audiencia: profesional que ha fallado antes con habitos. Accion: empezar manana con el habito mas pequeno.",
    checklist_items=[
        "La identidad objetivo esta definida antes que los habitos",
        "Cada habito tiene trigger, rutina y recompensa explicita",
        "El calendario de 90 dias tiene milestones verificables",
        "El protocolo de recuperacion es realista (no heroico)"
    ],
    inputs=[
        {'name': 'OBJETIVO', 'desc': 'Objetivo profesional a lograr en 90 dias'},
        {'name': 'HABITOS_ACTUALES', 'desc': 'Habitos actuales (buenos y malos)'},
        {'name': 'TIEMPO_DIARIO', 'desc': 'Tiempo diario disponible para nuevos habitos', 'opt': True}
    ]
)

SPECS["productividad_optimizar_entorno_digital"] = spec(
    situacion="Para eliminar fricciones digitales que consumen 30-60 minutos diarios en micro-interrupciones, busquedas y navegacion ineficiente. El entorno digital debe servir, no distraer.",
    pedido_arquetipo="Ingeniero de Productividad Digital con experiencia en ergonomia cognitiva, diseno de workspaces digitales y optimizacion de herramientas para equipos de alto rendimiento.",
    pedido_spec="""Optimizacion del entorno digital:
1. Auditoria del navegador: pestanas, marcadores, extensiones
2. Optimizacion de notificaciones (eliminar ruido, preservar senal)
3. Atajos de teclado para las 10 acciones mas frecuentes
4. Sistema de organizacion de archivos (naming, estructura, busqueda)
5. Ritual de higiene digital semanal (15 min max)
6. Stack minimo recomendado vs actual""",
    ejecucion_metodo="""Metodo:
- Inventario de herramientas con frecuencia de uso
- Eliminar antes de optimizar (menos herramientas > mejor configuradas)
- Principio de friccion minima: cada accion frecuente a max 2 clicks
- Notificaciones: solo urgente + importante, todo lo demas en batch""",
    criterio="Formato: guia paso a paso por herramienta. Tono: tecnico-practico. Audiencia: profesional que usa computadora 8+ horas diarias. Accion: implementar configuracion base en 1 hora.",
    checklist_items=[
        "Las notificaciones estan auditadas y reducidas",
        "Los 10 atajos principales estan documentados",
        "El sistema de archivos tiene naming convention clara",
        "El ritual de higiene semanal cabe en 15 minutos"
    ],
    inputs=[
        {'name': 'DISPOSITIVO', 'desc': 'Dispositivo principal (Mac/Windows/Linux)'},
        {'name': 'HERRAMIENTAS', 'desc': 'Top 5 herramientas que mas usas'},
        {'name': 'FRUSTRACIONES', 'desc': 'Las 3 mayores fricciones digitales actuales', 'opt': True}
    ]
)

SPECS["productividad_energia_no_tiempo"] = spec(
    situacion="Para alinear tareas de alto impacto con picos de energia natural. Gestionar el tiempo sin gestionar la energia es optimizar el contenedor pero no el contenido.",
    pedido_arquetipo="Especialista en Performance Humano con formacion en cronobiologia y diseno de jornadas de alto rendimiento para atletas corporativos.",
    pedido_spec="""Agenda basada en gestion de energia:
1. Perfil energetico personal: picos, valles, transiciones
2. Clasificacion de tareas por demanda cognitiva (alta/media/baja)
3. Alineacion: tareas de alta demanda en picos de energia
4. Bloques de recuperacion estrategicos (no opcionales)
5. Agenda tipo diaria con 3 variantes (dia ligero, normal, intenso)
6. Indicadores de alerta de sobreexigencia""",
    ejecucion_metodo="""Metodo:
- Mapeo de curva de energia personal (90-min ultradian cycles)
- Power of Full Engagement de Loehr/Schwartz
- Categorizar tareas: crear, decidir, comunicar, administrar
- Regla: deep work en picos, admin en valles, nada en transiciones""",
    criterio="Formato: 3 agendas tipo + perfil energetico visual. Tono: cientifico-practico. Audiencia: profesional que siente que trabaja mucho pero rinde poco. Accion: probar la agenda del dia normal manana.",
    checklist_items=[
        "El perfil energetico tiene picos y valles identificados",
        "Las tareas estan clasificadas por demanda cognitiva",
        "Las 3 variantes de agenda son realistas",
        "Los bloques de recuperacion estan integrados (no opcionales)"
    ],
    inputs=[
        {'name': 'CRONOTIPO', 'desc': 'Tu cronotipo (madrugador/intermedio/nocturno)'},
        {'name': 'TAREAS_CRITICAS', 'desc': 'Tus 3-5 tareas de mayor impacto'},
        {'name': 'AGENDA_ACTUAL', 'desc': 'Descripcion de tu agenda diaria actual', 'opt': True}
    ]
)

SPECS["productividad_weekly_review_sistema"] = spec(
    situacion="Para garantizar que la actividad diaria esta alineada con los objetivos trimestrales. Sin revision semanal, el dia a dia consume el largo plazo.",
    pedido_arquetipo="Facilitador de Revision Estrategica Personal con certificacion GTD y experiencia en coaching de OKRs para equipos de alto rendimiento.",
    pedido_spec="""Sistema de Weekly Review:
1. Template de revision semanal con secciones fijas
2. Preguntas de reflexion (max 7, enfocadas en aprendizaje)
3. Tablero de seguimiento de objetivos trimestrales
4. Proceso de planificacion de la proxima semana (top 3 prioridades)
5. Ritual completo en max 45 minutos
6. Metricas personales de salud productiva""",
    ejecucion_metodo="""Metodo:
- GTD Weekly Review: vaciar, revisar, planificar
- OKR personal: 3 objetivos trimestrales con key results medibles
- Retrospectiva agil adaptada: que funciono, que no, que cambio
- Principio: si no se revisa, no se gestiona""",
    criterio="Formato: template de revision + tablero de OKRs. Tono: reflexivo-practico. Audiencia: profesional que quiere coherencia entre dia a dia y largo plazo. Accion: hacer la primera revision este fin de semana.",
    checklist_items=[
        "El template cabe en 45 minutos o menos",
        "Las preguntas de reflexion son concretas (no filosoficas)",
        "El tablero de OKRs tiene max 3 objetivos con key results medibles",
        "El proceso es reproducible cada semana sin esfuerzo extra"
    ],
    inputs=[
        {'name': 'OBJETIVOS_TRIMESTRE', 'desc': 'Tus 3 objetivos principales este trimestre'},
        {'name': 'HERRAMIENTAS', 'desc': 'Donde gestionas tareas y calendario'}
    ]
)

SPECS["productividad_deep_work_protocolo"] = spec(
    situacion="Para proteger bloques de trabajo profundo en un entorno de interrupciones constantes. El deep work es la habilidad mas valiosa de la economia del conocimiento y la mas amenazada.",
    pedido_arquetipo="Experto en Deep Work y Atencion Focalizada con formacion en neurociencia cognitiva y diseno de entornos de concentracion para profesionales de tecnologia.",
    pedido_spec="""Protocolo de Deep Work personalizado:
1. Diagnostico de interrupciones actuales (internas y externas)
2. Diseno de bloques de deep work: duracion, frecuencia, ubicacion
3. Protocolo de entrada: como activar el estado de concentracion
4. Protocolo de salida: como cerrar y transicionar
5. Comunicacion con equipo: como proteger los bloques sin aislarte
6. Metricas de deep work (horas/semana, calidad de output)""",
    ejecucion_metodo="""Metodo:
- Cal Newport Deep Work framework
- Pomodoro adaptado (bloques de 52/17 o 90/20 segun cronobiologia)
- Environment design: eliminar triggers de distraccion
- Shutdown ritual: cierre cognitivo del bloque
- Tracking: horas de deep work como KPI personal""",
    criterio="Formato: protocolo imprimible + calendario semanal con bloques. Tono: directo, basado en evidencia. Audiencia: profesional en open office con muchas reuniones. Accion: bloquear 2 horas de deep work en el calendario de manana.",
    checklist_items=[
        "Las interrupciones principales estan diagnosticadas",
        "Los bloques de deep work tienen duracion y frecuencia definidas",
        "El protocolo de entrada y salida es reproducible",
        "La comunicacion con equipo preserva los bloques sin generar friccion"
    ],
    inputs=[
        {'name': 'CONTEXTO', 'desc': 'Tu entorno de trabajo (oficina, remoto, hibrido)'},
        {'name': 'INTERRUPCIONES', 'desc': 'Las 3 interrupciones mas frecuentes'},
        {'name': 'HORAS_DW_ACTUAL', 'desc': 'Horas de deep work semanales actuales (estimacion)', 'opt': True}
    ]
)

SPECS["productividad_decision_rapida_framework"] = spec(
    situacion="Para tomar decisiones de calidad en menos tiempo. La mayoria de decisiones profesionales son reversibles y no justifican analisis extenso. Decidir rapido y bien es una habilidad entrenada.",
    pedido_arquetipo="Decision Coach Ejecutivo con experiencia en toma de decisiones bajo incertidumbre y frameworks de Jeff Bezos (Type 1/Type 2) y Daniel Kahneman.",
    pedido_spec="""Framework de decision rapida:
1. Clasificacion de la decision: reversible (Type 2) vs irreversible (Type 1)
2. Template de 5 minutos para decisiones reversibles
3. Template de 30 minutos para decisiones irreversibles
4. Criterios de cuando escalar vs decidir solo
5. Protocolo de documentacion minima de decisiones
6. Registro: decision, fecha, razonamiento, resultado esperado""",
    ejecucion_metodo="""Metodo:
- Bezos Type 1/Type 2 decision framework
- Satisficing vs maximizing (Herbert Simon)
- Regla 70%: decide cuando tengas el 70% de la informacion
- Decision journal: registrar para aprender, no para arrepentirse""",
    criterio="Formato: 2 templates (5 min y 30 min) + arbol de decision de cuando usar cada uno. Tono: pragmatico. Audiencia: profesional que posterga por paralisis de analisis. Accion: usar el template de 5 minutos con la proxima decision pendiente.",
    checklist_items=[
        "Los 2 templates son usables en los tiempos indicados",
        "El arbol de clasificacion es claro (reversible vs irreversible)",
        "El protocolo de documentacion es minimo (max 3 campos)",
        "Incluye criterios claros de cuando NO decidir solo"
    ],
    inputs=[
        {'name': 'CONTEXTO', 'desc': 'Tu rol y nivel de autonomia en decisiones'},
        {'name': 'DECISION_EJEMPLO', 'desc': 'Una decision pendiente para probar el framework', 'opt': True}
    ]
)

# I'll continue generating specs for all categories. Due to the massive volume,
# let me add a helper that makes it faster to define them.

SPECS["productividad_delegar_tarea_efectivamente"] = spec(
    situacion="Para liberar tiempo de alto valor delegando tareas correctamente. Delegar mal cuesta mas que hacerlo uno mismo. Delegar bien multiplica capacidad.",
    pedido_arquetipo="Coach de Gestion y Delegacion con experiencia en Situational Leadership y desarrollo de equipos autonomos (15+ anos).",
    pedido_spec="""Delegacion efectiva:
1. Resultado esperado con criterios de aceptacion medibles
2. Nivel de delegacion apropiado (informar/consultar/decidir/actuar)
3. Recursos y autoridad necesarios para ejecutar
4. Checkpoints de seguimiento sin micromanagement
5. Protocolo de escalacion ante bloqueos""",
    ejecucion_metodo="""Metodo:
- RACI: responsable, accountable, consultado, informado
- Situational Leadership: nivel de delegacion segun madurez del receptor
- Intent-based leadership: comunicar intencion, no pasos""",
    criterio="Formato: plan de delegacion en 1 pagina.\nTono: directo, orientado a accion.\nAudiencia: lider que delega.\nAccion: delegar la tarea hoy con el plan listo.",
    checklist_items=[
        "El resultado esperado tiene criterios medibles",
        "El nivel de delegacion es apropiado al receptor",
        "Los checkpoints no son micromanagement",
        "El protocolo de escalacion esta definido"
    ],
    inputs=[
        {'name': 'TAREA', 'desc': 'Tarea o responsabilidad a delegar'},
        {'name': 'RECEPTOR', 'desc': 'Persona o equipo receptor'},
        {'name': 'EXPERIENCIA', 'desc': 'Nivel de experiencia del receptor con esta tarea'}
    ]
)

SPECS["productividad_reducir_reuniones_50"] = spec(
    situacion="Para recuperar horas semanales eliminando o comprimiendo reuniones de bajo valor. El profesional promedio pasa 23 horas/semana en reuniones; el 50% son innecesarias.",
    pedido_arquetipo="Consultor de Eficiencia Organizacional con experiencia en rediseno de cadencias de comunicacion para equipos de alto rendimiento.",
    pedido_spec="""Reduccion de reuniones:
1. Auditoria de reuniones actuales (nombre, frecuencia, duracion, asistentes, valor)
2. Clasificacion: eliminar / comprimir / convertir a async / mantener
3. Templates de comunicacion asincrona que reemplacen reuniones
4. Cadencia optima: cuales reuniones SI son necesarias y por que
5. Script para declinar reuniones sin generar friccion""",
    ejecucion_metodo="""Metodo:
- Meeting audit: listar todas, evaluar valor real vs percibido
- Principio de Amazon: no meeting sin documento previo de 6 paginas
- Async-first: si puede ser un email, Loom o doc, no es reunion
- Decision tree: necesita reunion? > necesita MI presencia?""",
    criterio="Formato: auditoria + recomendaciones + templates async.\nTono: pragmatico.\nAudiencia: profesional con agenda saturada.\nAccion: eliminar o convertir 3 reuniones esta semana.",
    checklist_items=[
        "Cada reunion tiene clasificacion justificada",
        "Min. 3 templates async listos para usar",
        "El script de declinacion es diplomatico y efectivo",
        "La cadencia propuesta libera min. 5 horas/semana"
    ],
    inputs=[
        {'name': 'REUNIONES', 'desc': 'Lista de reuniones semanales recurrentes'},
        {'name': 'ROL', 'desc': 'Tu rol y nivel de autonomia sobre tu agenda'}
    ]
)

SPECS["productividad_email_cero_friccion"] = spec(
    situacion="Para procesar email en batches eficientes en lugar de modo reactivo. El email es el mayor ladron de deep work: cada check interrumpe 23 minutos de concentracion.",
    pedido_arquetipo="Especialista en Comunicacion Digital Eficiente con experiencia en diseno de workflows de email para ejecutivos C-level.",
    pedido_spec="""Sistema de email de cero friccion:
1. Reglas de filtrado automatico (por remitente, asunto, urgencia)
2. Batches de procesamiento: frecuencia, duracion, ritual
3. Templates para las 5 respuestas mas comunes
4. Protocolo de triaje: actuar (<2min) / delegar / agendar / archivar
5. Metricas: inbox count al final del dia""",
    ejecucion_metodo="""Metodo:
- GTD email processing: capturar, clarificar, organizar, comprometer
- 2-minute rule: si toma menos de 2 min, hacerlo ahora
- Batch processing: 3 ventanas de 20 min (manana, mediodia, tarde)
- Zero notification: desactivar alertas, procesar por bloques""",
    criterio="Formato: guia de configuracion + 5 templates + ritual.\nTono: practico, paso a paso.\nAudiencia: profesional con 50+ emails/dia.\nAccion: configurar filtros y templates hoy.",
    checklist_items=[
        "Los filtros cubren 80% del volumen de email",
        "Los 5 templates son reutilizables inmediatamente",
        "El ritual de batches cabe en 60 min diarios total",
        "Las metricas de salud son simples y medibles"
    ],
    inputs=[
        {'name': 'VOLUMEN', 'desc': 'Emails diarios aproximados'},
        {'name': 'HERRAMIENTA', 'desc': 'Cliente de email (Gmail, Outlook, etc.)'},
        {'name': 'RESPUESTAS_COMUNES', 'desc': 'Tipos de emails que mas respondes', 'opt': True}
    ]
)

SPECS["productividad_shutdown_ritual_cierre"] = spec(
    situacion="Para cerrar la jornada laboral con un ritual que asegure: nada se olvida, manana empieza con claridad, y la mente se desconecta del trabajo. Sin cierre, el trabajo invade la vida.",
    pedido_arquetipo="Experto en Psicologia del Rendimiento con especialidad en transicion trabajo-vida y prevencion de burnout.",
    pedido_spec="""Shutdown Ritual:
1. Checklist de cierre diario (max 10 min)
2. Revision de tareas: que se completo, que queda, que se mueve a manana
3. Captura de loose ends: nada queda en la cabeza, todo queda en el sistema
4. Planificacion del dia siguiente (top 3 prioridades)
5. Frase o accion de corte psicologico (shutdown complete)""",
    ejecucion_metodo="""Metodo:
- Cal Newport Shutdown Complete ritual
- Zeigarnik effect: las tareas incompletas ocupan mente; capturarlas la libera
- Implementation intentions: manana a las X hare Y
- Transition buffer: actividad entre trabajo y vida personal""",
    criterio="Formato: checklist imprimible + guia de 1 pagina.\nTono: sereno, sin urgencia.\nAudiencia: profesional que no logra desconectar.\nAccion: ejecutar el ritual hoy al terminar de trabajar.",
    checklist_items=[
        "El ritual cabe en 10 minutos o menos",
        "Incluye captura de todos los loose ends",
        "Tiene la planificacion del dia siguiente",
        "Incluye accion de corte psicologico explicita"
    ],
    inputs=[
        {'name': 'HORA_CIERRE', 'desc': 'Hora a la que quieres terminar de trabajar'},
        {'name': 'HERRAMIENTAS', 'desc': 'Donde gestionas tareas y calendario'}
    ]
)

SPECS["productividad_sprint_personal_semanal"] = spec(
    situacion="Para aplicar metodologia agil a la productividad personal: sprints semanales con objetivo claro, foco y retrospectiva. La semana es la unidad minima de cambio medible.",
    pedido_arquetipo="Agile Coach Personal con certificacion CSM y experiencia en adaptacion de Scrum para productividad individual y equipos pequenos.",
    pedido_spec="""Sprint Personal Semanal:
1. Sprint Goal: 1 objetivo semanal que importa (no 10)
2. Sprint Backlog: max 5 tareas que soportan el goal
3. Daily standup personal (2 min): que hice, que hare, que me bloquea
4. Friday retro personal: que funciono, que no, 1 mejora para la proxima semana
5. Velocity tracking: cuantos goals completados en 4 semanas""",
    ejecucion_metodo="""Metodo:
- Scrum adaptado a 1 persona: sprint de 5 dias
- WIP limit: max 3 tareas en progreso simultaneo
- Sprint goal > task list: el objetivo guia, las tareas sirven
- Retro semanal: la mejora continua es el superpoder""",
    criterio="Formato: template de sprint + daily + retro.\nTono: motivador-practico.\nAudiencia: profesional que quiere estructura sin burocracia.\nAccion: planificar el sprint de esta semana.",
    checklist_items=[
        "El sprint goal es 1 y es medible",
        "El backlog tiene max 5 tareas",
        "El daily standup cabe en 2 minutos",
        "La retro produce 1 mejora concreta"
    ],
    inputs=[
        {'name': 'OBJETIVO_SEMANA', 'desc': 'Lo mas importante a lograr esta semana'},
        {'name': 'CONTEXTO', 'desc': 'Restricciones de la semana (viajes, reuniones, deadlines)'}
    ]
)

SPECS["productividad_batch_processing_tareas"] = spec(
    situacion="Para agrupar tareas similares y procesarlas en lote, eliminando el costo cognitivo del context switching. Cada cambio de contexto cuesta 23 minutos de recuperacion.",
    pedido_arquetipo="Ingeniero de Procesos Personales con experiencia en Lean Manufacturing aplicado a trabajo del conocimiento.",
    pedido_spec="""Sistema de Batch Processing:
1. Inventario de tareas recurrentes por tipo (email, llamadas, admin, creacion)
2. Agrupacion en batches por similitud cognitiva
3. Calendario semanal con bloques de batch asignados
4. Protocolo de transicion entre batches (2 min buffer)
5. Metricas: tiempo en batch vs tiempo en switching""",
    ejecucion_metodo="""Metodo:
- Task batching: agrupar por tipo cognitivo, no por proyecto
- Context cost: calcular el costo real del switching
- Time blocking: asignar bloques fijos a cada tipo de batch
- Buffer zones: 2-5 min de transicion entre tipos""",
    criterio="Formato: calendario semanal con batches + guia de implementacion.\nTono: tecnico-practico.\nAudiencia: profesional multitarea.\nAccion: implementar 2 batches esta semana.",
    checklist_items=[
        "Las tareas estan agrupadas por tipo cognitivo",
        "El calendario tiene bloques asignados",
        "Los buffers de transicion estan integrados",
        "El ahorro estimado en horas esta cuantificado"
    ],
    inputs=[
        {'name': 'TAREAS_RECURRENTES', 'desc': 'Lista de tareas que haces regularmente'},
        {'name': 'HORARIO', 'desc': 'Tu horario de trabajo semanal'}
    ]
)

SPECS["productividad_brain_dump_estructurado"] = spec(
    situacion="Para vaciar la mente de forma estructurada cuando la carga cognitiva es alta. Todo lo que esta en tu cabeza y no en un sistema es deuda cognitiva que reduce rendimiento.",
    pedido_arquetipo="Facilitador de Productividad con certificacion GTD y especialidad en reduccion de carga cognitiva para profesionales de alto rendimiento.",
    pedido_spec="""Brain Dump Estructurado:
1. Captura libre: escribir TODO sin filtro (5 min)
2. Clasificacion: tareas / ideas / preocupaciones / compromisos / pendientes
3. Procesamiento: para cada item, definir proxima accion concreta
4. Asignacion: cada item a su sistema (calendario, lista, nota, delegar, eliminar)
5. Validacion: mente vacia, todo capturado""",
    ejecucion_metodo="""Metodo:
- GTD Mind Sweep: vaciado completo de loops abiertos
- Trigger list: categorias para asegurar que nada se escape
- 2-minute rule: si se puede hacer en 2 min, hacerlo ahora
- Resultado: cero items en la cabeza, 100% en sistemas""",
    criterio="Formato: guia paso a paso + trigger list + template de clasificacion.\nTono: calmado, sin prisa.\nAudiencia: profesional con sensacion de caos.\nAccion: hacer el brain dump ahora mismo.",
    checklist_items=[
        "La trigger list cubre min. 10 categorias",
        "Cada item capturado tiene proxima accion definida",
        "Cada item esta asignado a un sistema especifico",
        "La guia es ejecutable en 15 minutos"
    ],
    inputs=[
        {'name': 'HERRAMIENTAS', 'desc': 'Donde gestionas tareas y notas'},
        {'name': 'CONTEXTO', 'desc': 'Que esta generando la sobrecarga actual', 'opt': True}
    ]
)

SPECS["productividad_kanban_personal_flujo"] = spec(
    situacion="Para visualizar todo el trabajo en progreso y limitar el WIP (Work In Progress). Sin visualizacion, es imposible gestionar el flujo. Con Kanban, ves los cuellos de botella.",
    pedido_arquetipo="Practitioner de Kanban con certificacion KMP y experiencia en aplicacion de sistemas de flujo para productividad personal.",
    pedido_spec="""Kanban Personal:
1. Diseno del tablero: columnas (Backlog / En Curso / Bloqueado / Listo)
2. WIP limits por columna (recomendacion basada en rol)
3. Politicas de movimiento: cuando mover una tarea de columna
4. Ritual diario: revision del tablero (2 min)
5. Metricas: cycle time, throughput, WIP ratio""",
    ejecucion_metodo="""Metodo:
- Kanban Method de David Anderson
- WIP limit: el constraint que crea flujo
- Pull system: no empezar nuevo hasta que haya capacidad
- Visualize > Limit > Manage > Improve""",
    criterio="Formato: diseno de tablero + reglas + metricas.\nTono: practico.\nAudiencia: profesional visual que necesita ver su flujo.\nAccion: crear el tablero hoy.",
    checklist_items=[
        "El tablero tiene max 5 columnas",
        "Los WIP limits estan definidos y justificados",
        "Las politicas de movimiento son claras",
        "Las metricas son automatizables"
    ],
    inputs=[
        {'name': 'ROL', 'desc': 'Tu rol profesional'},
        {'name': 'HERRAMIENTA', 'desc': 'Herramienta para el tablero (Trello, Notion, fisico)', 'opt': True}
    ]
)

SPECS["productividad_friction_audit_eliminar"] = spec(
    situacion="Para identificar y eliminar las fricciones invisibles que consumen 30-60 minutos diarios. Las fricciones pequenas se acumulan: 5 min de friccion × 20 veces/dia = 100 min perdidos.",
    pedido_arquetipo="Ingeniero de Experiencia Laboral con formacion en UX Design aplicado a workflows de trabajo del conocimiento.",
    pedido_spec="""Friction Audit:
1. Registro de fricciones durante 1 dia (tipo, frecuencia, tiempo perdido)
2. Clasificacion: eliminar / automatizar / simplificar / aceptar
3. Top 5 fricciones por impacto (tiempo × frecuencia)
4. Plan de eliminacion para cada una del top 5
5. Estimacion de tiempo recuperado por semana""",
    ejecucion_metodo="""Metodo:
- Friction logging: anotar cada vez que algo te frena
- Pareto: el 20% de fricciones causa el 80% del tiempo perdido
- UX del trabajo: cada accion frecuente deberia ser un click o menos
- Automation-first: si se repite, automatizar""",
    criterio="Formato: registro + top 5 + plan de eliminacion.\nTono: analitico.\nAudiencia: profesional que siente que pierde tiempo en tonterias.\nAccion: hacer el registro de fricciones manana.",
    checklist_items=[
        "El registro captura tipo, frecuencia y tiempo por friccion",
        "El top 5 esta ordenado por impacto real (tiempo × frecuencia)",
        "Cada friccion del top 5 tiene plan de eliminacion concreto",
        "El tiempo recuperado esta cuantificado por semana"
    ],
    inputs=[
        {'name': 'CONTEXTO', 'desc': 'Tu entorno de trabajo (herramientas, equipo, dinamica)'},
        {'name': 'FRUSTRACIONES', 'desc': 'Lo que mas te frustra de tu flujo actual', 'opt': True}
    ]
)

SPECS["productividad_template_system_entregables"] = spec(
    situacion="Para no empezar de cero cada vez que produces un entregable recurrente. Un sistema de templates reduce el tiempo de creacion en 60% y asegura consistencia de calidad.",
    pedido_arquetipo="Disenador de Sistemas de Productividad con experiencia en estandarizacion de entregables para equipos de consultoria y creacion de contenido.",
    pedido_spec="""Sistema de Templates:
1. Inventario de entregables recurrentes (tipo, frecuencia, tiempo actual)
2. Template para cada uno: estructura, secciones, placeholders
3. Checklist de calidad por template
4. Nomenclatura y organizacion de templates
5. Ritual de actualizacion trimestral""",
    ejecucion_metodo="""Metodo:
- 80/20: los 5 entregables mas frecuentes primero
- Template = estructura + placeholders + checklist
- Living documents: templates se mejoran con cada uso
- Naming convention: TIPO_FECHA_VERSION""",
    criterio="Formato: biblioteca de templates + guia de uso + ritual de mantenimiento.\nTono: sistematico.\nAudiencia: profesional que produce los mismos tipos de entregable repetidamente.\nAccion: crear el primer template hoy.",
    checklist_items=[
        "Los 5 entregables mas frecuentes estan inventariados",
        "Cada template tiene estructura + placeholders + checklist",
        "La nomenclatura es consistente y busqueda-friendly",
        "El ritual de actualizacion esta calendarizado"
    ],
    inputs=[
        {'name': 'ENTREGABLES', 'desc': 'Tipos de entregables que produces regularmente'},
        {'name': 'HERRAMIENTAS', 'desc': 'Donde creas tus entregables (Docs, Notion, etc.)'}
    ]
)

SPECS["productividad_accountability_system"] = spec(
    situacion="Para mantener consistencia en objetivos de largo plazo cuando la motivacion fluctua. La accountability externa es el multiplicador mas infravalorado de la productividad personal.",
    pedido_arquetipo="Coach de Accountability y Rendimiento con experiencia en coaching ejecutivo y diseno de sistemas de seguimiento para profesionales independientes.",
    pedido_spec="""Sistema de Accountability:
1. Definicion de objetivos con formato SMART y deadline
2. Buddy system o accountability partner (criterios de seleccion)
3. Cadencia de check-ins: frecuencia, formato, duracion
4. Dashboard personal de progreso (simple, visual)
5. Protocolo de recuperacion ante desvios
6. Rewards and consequences (internos y externos)""",
    ejecucion_metodo="""Metodo:
- Public commitment: compartir objetivos aumenta completion rate 65%
- Check-in cadence: semanal para metas mensuales, mensual para trimestrales
- Progress > perfection: medir avance, no resultado final
- Failure protocol: no castigar, analizar y ajustar""",
    criterio="Formato: sistema completo con dashboard + cadencia + protocolo.\nTono: motivador-estructurado.\nAudiencia: profesional que empieza fuerte pero pierde momentum.\nAccion: identificar accountability partner y agendar primer check-in.",
    checklist_items=[
        "Los objetivos son SMART y tienen deadline",
        "Los criterios para el accountability partner son claros",
        "La cadencia de check-ins es realista y sostenible",
        "El protocolo de recuperacion es compasivo pero firme"
    ],
    inputs=[
        {'name': 'OBJETIVOS', 'desc': 'Objetivos en los que necesitas accountability'},
        {'name': 'HORIZONTE', 'desc': 'Horizonte temporal (mensual, trimestral, anual)'}
    ]
)

SPECS["productividad_context_switching_minimizar"] = spec(
    situacion="Para reducir el context switching que destruye la productividad. Cada interrupcion cuesta 23 minutos de recuperacion. Con 10 switches diarios, pierdes 3.8 horas.",
    pedido_arquetipo="Neurocientifica Aplicada a Productividad con investigacion en atencion sostenida y diseno de entornos de trabajo de baja interrupcion.",
    pedido_spec="""Plan anti-context-switching:
1. Diagnostico: cuantos switches por dia y cuales son evitables
2. Clasificacion de interrupciones: internas (mente) vs externas (otros)
3. Estrategias por tipo: timeboxing, batching, notification management
4. Diseno de 'modo focus': que activar/desactivar al entrar en deep work
5. Comunicacion con equipo: como proteger focus sin aislarse""",
    ejecucion_metodo="""Metodo:
- Attention residue: el cerebro sigue procesando la tarea anterior
- Notification audit: eliminar el 80% de notificaciones
- Focus mode: configuracion de herramientas para silencio selectivo
- Proactive communication: avisar cuando estas en deep work""",
    criterio="Formato: diagnostico + plan de accion + configuracion de herramientas.\nTono: basado en ciencia.\nAudiencia: profesional en entorno de alta interrupcion.\nAccion: configurar modo focus y comunicar a equipo esta semana.",
    checklist_items=[
        "Los switches diarios estan cuantificados",
        "Las interrupciones estan clasificadas como internas/externas",
        "El modo focus tiene configuracion concreta por herramienta",
        "La comunicacion con equipo preserva relaciones"
    ],
    inputs=[
        {'name': 'ENTORNO', 'desc': 'Entorno de trabajo (oficina, remoto, hibrido)'},
        {'name': 'INTERRUPCIONES', 'desc': 'Las 3 interrupciones mas frecuentes'},
        {'name': 'HERRAMIENTAS', 'desc': 'Herramientas de comunicacion del equipo', 'opt': True}
    ]
)

SPECS["productividad_procrastinacion_protocolo"] = spec(
    situacion="Para desbloquear la ejecucion cuando la procrastinacion paraliza. La procrastinacion no es pereza — es aversion al malestar emocional asociado a la tarea. Se trata con protocolo, no con fuerza de voluntad.",
    pedido_arquetipo="Psicologo Conductual especializado en procrastinacion y autoregulacion, con experiencia en Terapia Cognitivo-Conductual aplicada a rendimiento profesional.",
    pedido_spec="""Protocolo anti-procrastinacion:
1. Diagnostico: que tarea procrastinas y que emocion la bloquea
2. Tecnica de 2 minutos: empezar con la version mas pequena posible
3. Implementation intentions: cuando X ocurra, hare Y
4. Temptation bundling: combinar tarea dificil con algo agradable
5. Accountability trigger: quien sabra si no lo hago
6. Recompensa inmediata por completar""",
    ejecucion_metodo="""Metodo:
- Emotion regulation: la procrastinacion es avoidance emocional
- Tiny habits: hacer la version de 2 minutos primero
- Pre-commitment: eliminar opciones de escape
- Self-compassion: castigarse empeora la procrastinacion""",
    criterio="Formato: protocolo paso a paso + diagnostico emocional.\nTono: compasivo pero firme.\nAudiencia: profesional que sabe que deberia pero no puede.\nAccion: ejecutar los primeros 2 minutos de la tarea bloqueada AHORA.",
    checklist_items=[
        "La emocion bloqueante esta identificada",
        "La version de 2 minutos es genuinamente ejecutable",
        "El implementation intention es especifico",
        "La recompensa es inmediata, no diferida"
    ],
    inputs=[
        {'name': 'TAREA', 'desc': 'Tarea que estas procrastinando'},
        {'name': 'TIEMPO_BLOQUEADO', 'desc': 'Cuanto tiempo llevas posponiendola', 'opt': True}
    ]
)

SPECS["productividad_meeting_note_to_action"] = spec(
    situacion="Para convertir notas de reunion desordenadas en acciones concretas en 5 minutos. El 80% del valor de una reunion se pierde si no se captura y distribuye en las primeras 2 horas.",
    pedido_arquetipo="Facilitador de Reuniones con experiencia en captura de decisiones, action items y knowledge management para equipos agiles.",
    pedido_spec="""De notas a acciones:
1. Extraer decisiones tomadas (que, quien, cuando)
2. Extraer action items (tarea, responsable, deadline)
3. Extraer preguntas abiertas que requieren seguimiento
4. Extraer insights o informacion nueva relevante
5. Generar resumen ejecutivo de 5 lineas para los que no asistieron""",
    ejecucion_metodo="""Metodo:
- Quad-Doc: decisiones + tareas + riesgos + preguntas
- Action item format: VERBO + OBJETO + RESPONSABLE + FECHA
- 2-hour rule: distribuir resumen dentro de 2 horas de la reunion
- If no action items, the meeting was an email""",
    criterio="Formato: Quad-Doc (4 tablas) + resumen de 5 lineas.\nTono: preciso, sin narrativa.\nAudiencia: asistentes + stakeholders que no asistieron.\nAccion: distribuir dentro de 2 horas de la reunion.",
    checklist_items=[
        "Cada decision tiene owner y fecha",
        "Cada action item tiene responsable y deadline",
        "Las preguntas abiertas tienen quien las resuelve",
        "El resumen permite entender sin haber asistido"
    ],
    inputs=[
        {'name': 'NOTAS', 'desc': 'Notas de la reunion (texto o transcripcion)'},
        {'name': 'PARTICIPANTES', 'desc': 'Quienes asistieron'}
    ]
)

SPECS["productividad_pomodoro_avanzado_personalizado"] = spec(
    situacion="Para implementar un sistema Pomodoro personalizado a tu cronobiologia y tipo de trabajo. El Pomodoro clasico (25/5) no es optimo para todos — la neurociencia sugiere adaptar los ciclos.",
    pedido_arquetipo="Especialista en Tecnicas de Atencion Focalizada con conocimiento en neurociencia de la atencion y ciclos ultradianos.",
    pedido_spec="""Pomodoro Personalizado:
1. Diagnostico de attention span actual (estimacion)
2. Ciclo optimo recomendado segun tipo de trabajo:
   - Deep work creativo: bloques de 52/17 o 90/20
   - Deep work analitico: bloques de 45/10
   - Shallow work: bloques de 25/5 clasico
3. Protocolo de inicio de sesion (ritual de 1 min)
4. Protocolo entre sesiones (que hacer en el descanso)
5. Tracking: sesiones/dia como KPI de productividad""",
    ejecucion_metodo="""Metodo:
- Ultradian rhythm: ciclos naturales de 90 min
- Progressive overload: empezar con ciclos cortos, ir extendiendo
- Active rest: descansos con movimiento, no con pantalla
- Deep work hours/day: medir como atleta mide km""",
    criterio="Formato: tabla de ciclos por tipo de trabajo + protocolos.\nTono: cientifico-practico.\nAudiencia: profesional que ya conoce Pomodoro pero lo abandono.\nAccion: probar el ciclo recomendado manana.",
    checklist_items=[
        "Los ciclos estan personalizados por tipo de trabajo",
        "Los protocolos de inicio y descanso son concretos",
        "El tracking es simple (no requiere app compleja)",
        "La progresion es gradual, no heroica"
    ],
    inputs=[
        {'name': 'TIPO_TRABAJO', 'desc': 'Tu tipo de trabajo predominante (creativo, analitico, comunicacion)'},
        {'name': 'ATENCION_ACTUAL', 'desc': 'Cuanto tiempo puedes concentrarte sin distraccion actualmente', 'opt': True}
    ]
)

SPECS["productividad_morning_planning_5min"] = spec(
    situacion="Para empezar cada dia con intencion en lugar de reactividad. 5 minutos de planificacion matutina ahorran 60 minutos de improvisacion durante el dia.",
    pedido_arquetipo="Coach de Planificacion Diaria con metodologia Ivy Lee y experiencia en diseno de rituales matutinos para profesionales de alto rendimiento.",
    pedido_spec="""Planificacion Matutina de 5 minutos:
1. Revisar calendario: que es inamovible hoy
2. Top 3 prioridades: si solo logro 3 cosas, cuales importan mas
3. Time blocking: asignar las 3 prioridades a bloques del dia
4. Anticipar fricciones: que podria desviarme y como prevenirlo
5. Intencion del dia: como quiero sentirme al terminar""",
    ejecucion_metodo="""Metodo:
- Ivy Lee method: 6 tareas max, ordenadas por prioridad
- MIT (Most Important Tasks): las 3 que mueven la aguja
- Eat the frog: la tarea mas dificil primero
- Intention setting: claridad de proposito antes de accion""",
    criterio="Formato: template de 5 minutos imprimible.\nTono: energizante y claro.\nAudiencia: profesional que empieza el dia revisando email.\nAccion: usar el template manana a las {{HORA}}.",
    checklist_items=[
        "El template es completable en 5 minutos reales",
        "Las top 3 prioridades estan vinculadas a time blocks",
        "La anticipacion de fricciones es especifica",
        "La intencion del dia es personal y motivadora"
    ],
    inputs=[
        {'name': 'HORA', 'desc': 'Hora a la que empiezas a trabajar'},
        {'name': 'HERRAMIENTAS', 'desc': 'Donde gestionas calendario y tareas'}
    ]
)

SPECS["productividad_async_communication_protocol"] = spec(
    situacion="Para comunicarte de forma asincrona efectiva, reduciendo reuniones y maximizando el tiempo de deep work del equipo. Async-first es el nuevo default del trabajo remoto e hibrido.",
    pedido_arquetipo="Disenador de Comunicacion Asincrona con experiencia en equipos distribuidos globalmente y culturas de trabajo remote-first (GitLab, Automattic style).",
    pedido_spec="""Protocolo de Comunicacion Asincrona:
1. Decision tree: cuando async vs sync (flowchart)
2. Formato estandar para updates async (contexto, pedido, deadline)
3. Templates: status update, decision request, FYI, escalation
4. SLA de respuesta por tipo de mensaje (urgente: 2h, normal: 24h, FYI: 48h)
5. Herramientas recomendadas por tipo de comunicacion""",
    ejecucion_metodo="""Metodo:
- Async-first: todo es async por default, sync solo cuando es necesario
- Write things down: si no esta escrito, no existe
- Low-context communication: asume que el receptor no tiene contexto
- Decision records: toda decision async queda documentada""",
    criterio="Formato: protocolo + decision tree + 4 templates.\nTono: profesional, clear-writing.\nAudiencia: equipo que transiciona a async.\nAccion: adoptar el decision tree y 1 template esta semana.",
    checklist_items=[
        "El decision tree async/sync es claro y accionable",
        "Los 4 templates cubren el 80% de comunicaciones",
        "Los SLAs son realistas para el contexto del equipo",
        "El protocolo no genera mas burocracia que la que elimina"
    ],
    inputs=[
        {'name': 'EQUIPO', 'desc': 'Tamano y distribucion del equipo'},
        {'name': 'HERRAMIENTAS', 'desc': 'Herramientas de comunicacion actuales (Slack, Teams, email, etc.)'},
        {'name': 'ZONA_HORARIA', 'desc': 'Zonas horarias del equipo', 'opt': True}
    ]
)

SPECS["productividad_energia_mapping_semanal"] = spec(
    situacion="Para mapear tu energia real a lo largo de la semana e identificar patrones que te permitan colocar trabajo de alto valor en momentos de alta energia. No todos los dias son iguales.",
    pedido_arquetipo="Analista de Rendimiento Personal con formacion en cronobiologia y ciencia del rendimiento aplicada al trabajo del conocimiento.",
    pedido_spec="""Energy Mapping Semanal:
1. Registro de energia por hora durante 5 dias (escala 1-5)
2. Identificacion de patrones: picos, valles, transiciones por dia
3. Mapa semanal: que dias son mejores para que tipo de trabajo
4. Recomendacion de distribucion de tareas por dia/hora
5. Factores que afectan energia: sueno, comida, ejercicio, reuniones""",
    ejecucion_metodo="""Metodo:
- Energy audit: registrar nivel de energia cada 2 horas por 5 dias
- Pattern recognition: buscar consistencias entre dias
- Task-energy alignment: tareas de alta demanda en picos
- Energy management > time management""",
    criterio="Formato: mapa semanal visual + recomendaciones.\nTono: cientifico-personal.\nAudiencia: profesional que quiere trabajar CON su energia, no contra ella.\nAccion: empezar el registro de energia manana.",
    checklist_items=[
        "El registro cubre al menos 5 dias laborales",
        "Los patrones estan identificados (no solo datos crudos)",
        "La recomendacion de distribucion es especifica por dia",
        "Los factores que afectan energia estan mapeados"
    ],
    inputs=[
        {'name': 'TIPO_TRABAJO', 'desc': 'Tu tipo de trabajo predominante'},
        {'name': 'HORARIO', 'desc': 'Tu horario laboral tipico'}
    ]
)

def qspec(key, sit, arq, ped, met, crit, checks, inps):
    """Quick spec builder with shorter parameter names."""
    SPECS[key] = spec(sit, arq, ped, met, crit, checks, inps)

# ─── PENSAMIENTO ESTRUCTURADO (M3) — 25 prompts ───

qspec("pensamiento_piramide_minto_estructura",
    "Para comunicar con claridad ejecutiva: conclusion primero, evidencia despues. La piramide de Minto elimina el 70% de malentendidos en comunicacion profesional.",
    "Consultor Senior de McKinsey-style Structured Communication con experiencia en presentaciones a boards y comites ejecutivos (15+ anos).",
    """Estructurar mensaje usando Piramide de Minto:
1. Situacion, Complicacion y Pregunta clave (SCQ)
2. Respuesta/conclusion principal en 1 oracion
3. Argumentos de soporte agrupados logicamente (MECE)
4. Evidencia por argumento con nivel de confianza
5. Adaptacion al formato solicitado: {{FORMATO}}""",
    """Metodo:
- Barbara Minto Pyramid Principle
- MECE: Mutuamente Excluyente, Colectivamente Exhaustivo
- Top-down communication: conclusion > argumentos > evidencia
- Cada nivel responde al "por que" del nivel superior""",
    "Formato: {{FORMATO}} (email/presentacion/memo/documento). Tono: ejecutivo, directo. Audiencia: {{AUDIENCIA}}. Accion: que la audiencia entienda el mensaje y actue sin reuniones adicionales.",
    ["La conclusion principal cabe en 1 oracion", "Los argumentos son MECE", "Cada nivel soporta el superior", "Adaptado a la audiencia especificada"],
    [{'name': 'TEMA', 'desc': 'Tema o mensaje a estructurar'}, {'name': 'AUDIENCIA', 'desc': 'Audiencia objetivo'}, {'name': 'FORMATO', 'desc': 'Formato de salida (email, presentacion, memo)', 'opt': True}]
)

qspec("pensamiento_issue_tree_problema",
    "Para descomponer problemas complejos en partes analizables. Sin estructura, los problemas complejos paralizan. Con issue tree, cada rama es una hipotesis testable.",
    "Consultor Estrategico Senior con experiencia en problem-solving estructurado para Fortune 500 y metodologia hypothesis-driven.",
    """Issue Tree MECE:
1. Problema reformulado como pregunta accionable
2. Primer nivel de descomposicion MECE (3-5 ramas)
3. Profundizar hasta hipotesis testables (3+ niveles)
4. Priorizar ramas por impacto potencial
5. Datos necesarios para validar cada hipotesis
6. Plan de investigacion por rama priorizada""",
    """Metodo:
- Hypothesis-driven problem solving
- MECE decomposition (sin solapamiento, sin vacios)
- 80/20: priorizar las ramas de mayor impacto
- Test-and-learn: cada hipotesis con metodo de validacion""",
    "Formato: arbol de issues con 3+ niveles + tabla de priorizacion. Tono: analitico. Audiencia: equipo que necesita resolver el problema. Accion: comenzar validacion por la rama de mayor impacto.",
    ["El problema esta formulado como pregunta accionable", "La descomposicion es MECE verificable", "Las hipotesis son testables con datos disponibles", "Las ramas estan priorizadas por impacto"],
    [{'name': 'PROBLEMA', 'desc': 'Problema o pregunta a descomponer'}, {'name': 'CONTEXTO', 'desc': 'Contexto relevante del problema'}, {'name': 'PROFUNDIDAD', 'desc': 'Niveles de profundidad (2-4)', 'opt': True}]
)

qspec("pensamiento_primeros_principios",
    "Para cuestionar suposiciones arraigadas y reconstruir soluciones desde verdades fundamentales. La innovacion real viene de preguntarse 'que es verdad' en lugar de 'que es habitual'.",
    "Pensador de Primeros Principios con formacion en fisica teorica y experiencia en innovacion disruptiva (estilo Elon Musk / Richard Feynman).",
    """Analisis de primeros principios:
1. Listar todas las suposiciones detras de la practica actual
2. Cuestionar cada suposicion: verdad fundamental o convencion?
3. Identificar las 3-5 verdades fundamentales e inmutables
4. Reconstruir solucion desde esas verdades (ignorando convenciones)
5. Comparar solucion reconstruida vs practica convencional
6. Evaluar viabilidad de la solucion reconstruida""",
    """Metodo:
- Razonamiento de primeros principios: deconstruir > cuestionar > reconstruir
- Distinguir: leyes fisicas vs convenciones sociales vs habitos industriales
- Pensamiento contrafactual: que haria alguien que empieza de cero
- Reality check: la solucion es mejor O solo diferente""",
    "Formato: tabla de suposiciones cuestionadas + solucion reconstruida + comparacion. Tono: retador pero riguroso. Audiencia: innovadores y tomadores de decision. Accion: evaluar si la solucion reconstruida merece un piloto.",
    ["Cada suposicion esta clasificada (verdad vs convencion)", "La solucion reconstruida es genuinamente diferente", "La comparacion es honesta (incluye trade-offs)", "La evaluacion de viabilidad es realista"],
    [{'name': 'SUPOSICION', 'desc': 'Creencia o practica a cuestionar'}, {'name': 'INDUSTRIA', 'desc': 'Industria o contexto'}]
)

qspec("pensamiento_modelos_mentales_latticework",
    "Para analizar situaciones complejas usando multiples lentes. Un solo modelo mental es un martillo buscando clavos. Multiples modelos revelan patrones invisibles.",
    "Estratega Multidisciplinario con formacion en economia conductual, sistemas complejos y toma de decisiones (estilo Charlie Munger).",
    """Analisis multi-modelo:
1. Seleccionar 3-5 modelos mentales relevantes para la situacion
2. Aplicar cada modelo como lente de analisis
3. Mapear convergencias entre modelos (patrones confirmados)
4. Mapear divergencias (tensiones no resueltas)
5. Identificar puntos ciegos que un solo modelo no cubre
6. Sintetizar insight integrado con recomendacion""",
    """Modelos mentales disponibles:
- Inversion (pensar al reves), Second-order thinking, Circle of competence
- Opportunity cost, Margin of safety, Comparative advantage
- Network effects, Feedback loops, Regression to the mean
- Sunk cost fallacy, Survivorship bias, Dunning-Kruger
- Seleccionar los mas relevantes para la situacion""",
    "Formato: analisis por modelo + tabla de convergencias/divergencias + insight final. Tono: analitico-reflexivo. Audiencia: decision-maker que necesita perspectiva profunda. Accion: tomar decision informada con multiples lentes.",
    ["Minimo 3 modelos aplicados con rigor", "Las convergencias revelan patrones reales", "Los puntos ciegos estan identificados", "El insight integrado es accionable"],
    [{'name': 'SITUACION', 'desc': 'Situacion o decision a analizar'}, {'name': 'DOMINIO', 'desc': 'Dominio principal (negocios, tech, personal)'}]
)

qspec("pensamiento_socratico_examinar",
    "Para examinar criticamente ideas propias o ajenas mediante preguntas sistematicas. El metodo socratico revela supuestos ocultos, contradicciones y fortalezas no articuladas.",
    "Facilitador Socratico y Pensador Critico con formacion filosofica y experiencia en facilitacion de debates estrategicos para equipos directivos.",
    """Examen socratico completo:
1. Clarificar la idea tal como esta expresada
2. Identificar supuestos implicitos (minimo 5)
3. Cuestionar la evidencia de cada supuesto
4. Explorar perspectivas alternativas (minimo 3)
5. Evaluar implicaciones y consecuencias
6. Formular la idea refinada post-examen o rechazarla con fundamento""",
    """Metodo socratico — 6 tipos de preguntas:
- Clarificacion: que quieres decir exactamente con...
- Supuestos: que estas dando por sentado...
- Evidencia: que datos soportan esto...
- Perspectiva: como lo veria alguien que...
- Implicaciones: si esto es cierto, entonces...
- Meta-pregunta: por que es importante esta pregunta...""",
    "Formato: 10+ preguntas socraticas aplicadas + supuestos revelados + idea refinada. Tono: retador pero constructivo. Audiencia: el autor de la idea. Accion: decidir si la idea se fortalece, se ajusta o se descarta.",
    ["Minimo 5 supuestos implicitos identificados", "Minimo 3 perspectivas alternativas exploradas", "La idea post-examen es mas solida (o descartada con fundamento)", "Las preguntas son genuinamente desafiantes, no cosmeticas"],
    [{'name': 'IDEA', 'desc': 'Idea, propuesta o supuesto a examinar'}, {'name': 'OBJETIVO', 'desc': 'Que buscas (validar, mejorar, desafiar, profundizar)'}]
)

qspec("pensamiento_segundo_orden_consecuencias",
    "Para ir mas alla del impacto inmediato y descubrir efectos cascada. Las decisiones de primer orden son obvias; el valor estrategico esta en las consecuencias de segundo y tercer orden.",
    "Analista de Sistemas Complejos con formacion en pensamiento sistemico (Donella Meadows) y estrategia de largo plazo (Howard Marks).",
    """Analisis de consecuencias de segundo orden:
1. Efectos de primer orden: impactos inmediatos y obvios
2. Efectos de segundo orden: consecuencias de las consecuencias
3. Efectos de tercer orden: impactos sistemicos y emergentes
4. Loops de retroalimentacion: positivos y negativos
5. Riesgos sistemicos y oportunidades ocultas
6. Mapa visual de cascada de consecuencias""",
    """Metodo:
- And then what? (repetir para cada consecuencia)
- Feedback loop analysis: que se refuerza, que se amortigua
- Unintended consequences checklist
- Pre-mortem: si esto sale mal en segundo orden, que paso""",
    "Formato: mapa de consecuencias en 3 niveles + loops identificados + oportunidades/riesgos. Tono: estrategico. Audiencia: decision-maker que necesita ver mas alla. Accion: ajustar la decision con perspectiva de largo plazo.",
    ["Los 3 niveles de consecuencias estan articulados", "Los feedback loops estan identificados", "Las oportunidades ocultas son genuinamente no-obvias", "Los riesgos sistemicos tienen mitigacion propuesta"],
    [{'name': 'DECISION', 'desc': 'Decision o accion a analizar'}, {'name': 'HORIZONTE', 'desc': 'Horizonte temporal de analisis'}]
)

qspec("pensamiento_pre_mortem_proyecto",
    "Para identificar causas de fallo ANTES de que ocurran. Es mas facil prevenir un incendio que apagarlo. El pre-mortem invierte la flecha temporal: imagina el fracaso, trabaja hacia atras.",
    "Facilitador de Pre-Mortem y Gestion de Riesgos con metodologia de Gary Klein y experiencia en planificacion de contingencias para proyectos criticos.",
    """Pre-Mortem completo:
1. Imaginar: el proyecto fallo completamente. Es un desastre.
2. Generar las 10 causas mas probables de fallo
3. Clasificar por probabilidad (1-5) e impacto (1-5)
4. Disenar mitigaciones para las top 5 causas
5. Crear plan de contingencia con triggers de activacion
6. Definir early warning indicators""",
    """Metodo:
- Gary Klein Pre-Mortem technique
- Prospective hindsight: imaginar el futuro fallo aumenta la precision del analisis en 30%
- Inversion: no que puede salir bien, sino que PUEDE salir mal
- Each risk gets: trigger, mitigation, contingency, owner""",
    "Formato: matriz de riesgos + plan de mitigacion + early warnings. Tono: pragmatico, sin alarmismo. Audiencia: lider del proyecto. Accion: implementar las 3 mitigaciones de mayor impacto esta semana.",
    ["Las 10 causas de fallo son plausibles (no genericas)", "La clasificacion probabilidad x impacto usa datos reales", "Las mitigaciones para top 5 son accionables", "Los early warning indicators son observables"],
    [{'name': 'PROYECTO', 'desc': 'Proyecto o iniciativa a analizar'}, {'name': 'PLAZO', 'desc': 'Plazo estimado del proyecto'}]
)

qspec("pensamiento_analisis_causal_fishbone",
    "Para identificar TODAS las causas de un problema, no solo la mas obvia. El diagrama de Ishikawa revela causas ocultas organizadas por categoria.",
    "Ingeniero de Calidad Senior con certificacion Six Sigma Black Belt y experiencia en analisis de causa raiz para operaciones criticas.",
    """Analisis causal (Ishikawa/Fishbone):
1. Definir el efecto/problema en la cabeza del pescado
2. Categorias de causas: Personas, Procesos, Tecnologia, Medicion, Entorno, Materiales
3. Brainstorm de causas por categoria (min. 3 por cada una)
4. 5 Whys en las 3 causas mas probables
5. Causa raiz confirmada con evidencia
6. Plan de accion correctiva""",
    """Metodo:
- Ishikawa diagram: efecto > categorias > causas > sub-causas
- 5 Whys: profundizar hasta la causa raiz real
- Validacion: la causa raiz, al corregirse, elimina el efecto""",
    "Formato: diagrama Ishikawa (texto) + 5 Whys + plan correctivo.\nTono: analitico, riguroso.\nAudiencia: equipo que necesita resolver el problema.\nAccion: implementar la correccion de la causa raiz principal.",
    ["Min. 3 causas por categoria", "5 Whys aplicados a top 3 causas", "Causa raiz tiene evidencia, no es suposicion", "Plan correctivo tiene responsable y fecha"],
    [{'name': 'PROBLEMA', 'desc': 'Problema o efecto a analizar'}, {'name': 'CONTEXTO', 'desc': 'Contexto donde ocurre'}]
)

qspec("pensamiento_analogia_transferir_solucion",
    "Para resolver un problema transfiriendo soluciones de dominios completamente diferentes. Las mejores innovaciones vienen de aplicar lo que funciona en un campo a otro donde nadie lo ha intentado.",
    "Pensador Analogico y Consultor de Innovacion Lateral con experiencia en transferencia de conocimiento cross-industry.",
    """Pensamiento por analogia:
1. Definir el problema con precision
2. Abstraer: cual es la estructura profunda del problema (no la superficie)
3. Buscar analogias en 3+ dominios diferentes (naturaleza, tecnologia, arte, deportes, etc.)
4. Para cada analogia: como se resolvio en ese dominio
5. Transferir la solucion al contexto original
6. Evaluar viabilidad de cada transferencia""",
    """Metodo:
- Analogical reasoning: estructura profunda > similitud superficial
- Cross-domain transfer: las mejores ideas vienen de lejos
- Biomimicry: la naturaleza ya resolvio la mayoria de problemas
- Forced connections: conectar lo aparentemente inconectable""",
    "Formato: 3+ analogias con solucion transferida + evaluacion de viabilidad.\nTono: creativo-analitico.\nAudiencia: innovador o problem-solver.\nAccion: prototipar la analogia mas viable.",
    ["Min. 3 analogias de dominios genuinamente diferentes", "La estructura profunda del problema esta articulada", "Cada transferencia tiene evaluacion de viabilidad", "Al menos 1 analogia es no-obvia y prometedora"],
    [{'name': 'PROBLEMA', 'desc': 'Problema a resolver'}, {'name': 'DOMINIO', 'desc': 'Dominio donde ocurre el problema'}]
)

qspec("pensamiento_inversion_pensar_al_reves",
    "Para descubrir soluciones pensando al reves: en vez de 'como logro X', preguntar 'como garantizo que X falle'. Invertir el problema revela riesgos y soluciones invisibles desde el enfoque directo.",
    "Estratega de Inversion Mental con formacion en teoria de decisiones y resolucion de problemas contraintuitivos (estilo Charlie Munger).",
    """Inversion:
1. Definir el objetivo positivo: que quieres lograr
2. Invertir: como GARANTIZARIAS que falle?
3. Listar las 10 formas mas seguras de fracasar
4. Para cada una: es algo que estas haciendo actualmente?
5. Invertir de nuevo: que acciones previenen cada fracaso
6. Plan: priorizar las prevenciones de mayor impacto""",
    """Metodo:
- Charlie Munger: 'Dime donde voy a morir para nunca ir ahi'
- Inversion thinking: el camino al exito se ve mas claro desde el fracaso
- Anti-goals: definir que NO hacer es tan valioso como definir que SI""",
    "Formato: lista de fracasos + inversiones + plan preventivo.\nTono: contraintuitivo, revelador.\nAudiencia: decision-maker.\nAccion: eliminar la causa de fracaso #1 esta semana.",
    ["Las 10 formas de fracasar son plausibles", "Al menos 3 son cosas que se estan haciendo actualmente", "Las prevenciones son accionables", "El plan esta priorizado por impacto"],
    [{'name': 'OBJETIVO', 'desc': 'Objetivo que quieres lograr'}, {'name': 'CONTEXTO', 'desc': 'Contexto donde persigues este objetivo'}]
)

qspec("pensamiento_steel_man_fortalecer_argumento",
    "Para fortalecer una posicion construyendo la version mas fuerte posible del argumento contrario. Si puedes defender la posicion opuesta mejor que tu oponente, realmente entiendes el problema.",
    "Debatedor Profesional y Analista de Argumentacion con experiencia en debate competitivo y analisis de politicas publicas.",
    """Steel Man:
1. Presenta la posicion original
2. Construye el MEJOR argumento posible de la posicion contraria (steel man)
3. Identifica donde el steel man tiene razon genuina
4. Identifica donde el steel man falla a pesar de ser fuerte
5. Fortalece la posicion original incorporando las verdades del steel man
6. Presenta la posicion final — mas robusta que la original""",
    """Metodo:
- Steel man > straw man: fortalecer al oponente, no debilitarlo
- Ideological Turing test: puedes defender la otra posicion tan bien que convenza al otro lado?
- Integration > refutation: incorporar verdades del oponente""",
    "Formato: posicion original > steel man > analisis > posicion fortalecida.\nTono: intelectualmente honesto.\nAudiencia: decision-maker o debatedor.\nAccion: presentar la posicion fortalecida con confianza.",
    ["El steel man es genuinamente fuerte (no una caricatura)", "Las verdades del oponente estan reconocidas", "La posicion final incorpora insights del steel man", "El resultado es mas robusto que la posicion original"],
    [{'name': 'POSICION', 'desc': 'Posicion o argumento a fortalecer'}, {'name': 'CONTEXTO', 'desc': 'Contexto del debate o decision'}]
)

qspec("pensamiento_red_team_atacar_plan",
    "Para encontrar vulnerabilidades en un plan, propuesta o estrategia ANTES de que el mercado o la realidad las encuentre por ti. Mejor fallar en la simulacion que en la ejecucion.",
    "Red Team Leader con experiencia en war gaming estrategico, analisis de vulnerabilidades y stress testing de planes de negocio.",
    """Red Team Analysis:
1. Recibir el plan/propuesta a atacar
2. Asumir el rol del adversario: competidor, mercado, regulador, Murphy's Law
3. Identificar 10 vectores de ataque (debilidades explotables)
4. Simular 3 escenarios de ataque (como destruirias este plan si fueras competidor)
5. Clasificar vulnerabilidades por severidad (critica/alta/media/baja)
6. Recomendar defensas para las top 5 vulnerabilidades""",
    """Metodo:
- Red teaming: pensar como el adversario
- Assume breach: asumir que algo va a salir mal
- Cascading failures: como un fallo pequeno se convierte en grande
- Mitigation > prevention: no puedes prevenir todo, pero puedes prepararte""",
    "Formato: 10 vulnerabilidades + 3 escenarios de ataque + defensas.\nTono: adversarial pero constructivo.\nAudiencia: lider del plan.\nAccion: implementar las defensas de las 3 vulnerabilidades criticas.",
    ["Los 10 vectores de ataque son plausibles", "Los escenarios son realistas, no catastrofistas", "Las vulnerabilidades estan clasificadas por severidad", "Las defensas son implementables con recursos actuales"],
    [{'name': 'PLAN', 'desc': 'Plan, propuesta o estrategia a atacar'}, {'name': 'ADVERSARIO', 'desc': 'Quien o que es el principal adversario/riesgo', 'opt': True}]
)

qspec("pensamiento_design_thinking_problema",
    "Para abordar problemas complejos centrados en el usuario con el proceso de Design Thinking: empatizar, definir, idear, prototipar, testear.",
    "Design Thinker Senior con certificacion de IDEO/Stanford d.school y experiencia en facilitacion de procesos de innovacion centrada en el usuario.",
    """Design Thinking aplicado:
1. Empatizar: quien tiene el problema? que siente? que necesita realmente?
2. Definir: reformular el problema como 'How Might We...' (HMW)
3. Idear: generar 20+ soluciones sin filtro (diverger)
4. Converger: seleccionar top 3 por deseabilidad × viabilidad × factibilidad
5. Prototipar: definir el MVP mas rapido para validar la idea #1
6. Testear: como y con quien validar el prototipo""",
    """Metodo:
- Stanford d.school 5-step process
- HMW (How Might We): reformular problemas como oportunidades
- Diverge then converge: primero cantidad, despues calidad
- Fail fast: prototipar rapido para aprender rapido""",
    "Formato: proceso completo con HMW + 20 ideas + top 3 + plan de prototipo.\nTono: creativo-estructurado.\nAudiencia: equipo de innovacion o profesional que enfrenta problema complejo.\nAccion: lanzar el prototipo de la idea #1.",
    ["El usuario del problema esta perfilado con empatia", "El HMW es abierto pero accionable", "Hay 20+ ideas generadas (divergencia real)", "El prototipo es buildable en 1 semana o menos"],
    [{'name': 'PROBLEMA', 'desc': 'Problema u oportunidad a abordar'}, {'name': 'USUARIO', 'desc': 'Quien tiene el problema (perfil)'}]
)

qspec("pensamiento_systems_thinking_mapa",
    "Para ver el sistema completo en lugar de partes aisladas. Los problemas mas dificiles son sistemicos: no se resuelven arreglando una pieza, sino entendiendo las conexiones.",
    "Analista de Sistemas Complejos con formacion en dinamica de sistemas (Donella Meadows, Peter Senge) y modelado de sistemas socio-tecnicos.",
    """Systems Map:
1. Identificar los elementos clave del sistema
2. Mapear relaciones causales entre elementos (A causa B, B refuerza C)
3. Identificar feedback loops: positivos (refuerzo) y negativos (balance)
4. Encontrar leverage points: donde una intervencion pequena tiene impacto grande
5. Identificar delays: donde el efecto tarda en manifestarse
6. Recomendar intervenciones en los leverage points""",
    """Metodo:
- Causal loop diagrams: visualizar relaciones causa-efecto
- Stock and flow: que se acumula, que fluye
- Donella Meadows' 12 leverage points
- The Fifth Discipline: mental models, shared vision, systems thinking""",
    "Formato: mapa de sistema (texto) + loops + leverage points + intervenciones.\nTono: sistemico, no reduccionista.\nAudiencia: lider que necesita ver el big picture.\nAccion: intervenir en el leverage point #1.",
    ["Los elementos clave del sistema estan identificados", "Los feedback loops son explicitos", "Los leverage points estan priorizados", "Las intervenciones son en los puntos de apalancamiento, no en los sintomas"],
    [{'name': 'SISTEMA', 'desc': 'Sistema a analizar (organizacion, proceso, mercado, etc.)'}, {'name': 'PROBLEMA', 'desc': 'Problema sistemico que se manifiesta'}]
)

qspec("pensamiento_six_hats_perspectivas",
    "Para analizar una situacion desde 6 perspectivas distintas de forma estructurada. Los Six Thinking Hats de De Bono eliminan la confusion de mezclar logica con emociones con creatividad.",
    "Facilitador de Pensamiento Paralelo con certificacion en Six Thinking Hats de Edward de Bono y experiencia en facilitacion de decisiones para comites directivos.",
    """Six Thinking Hats:
1. Blanco (Datos): que sabemos? que falta? solo hechos.
2. Rojo (Emociones): que sentimos? intuiciones, temores, entusiasmo. Sin justificar.
3. Negro (Critica): que puede salir mal? riesgos, debilidades, peligros.
4. Amarillo (Optimismo): que puede salir bien? beneficios, oportunidades.
5. Verde (Creatividad): que alternativas existen? ideas nuevas, provocaciones.
6. Azul (Control): resumen, proximos pasos, decision.""",
    """Metodo:
- Edward de Bono Six Hats: pensamiento paralelo, no adversarial
- Cada hat por separado: no mezclar perspectivas
- Secuencia recomendada: Azul > Blanco > Rojo > Negro > Amarillo > Verde > Azul
- Tiempo: 5 min por hat""",
    "Formato: analisis por hat + sintesis final con decision.\nTono: estructurado, cada seccion con su lente.\nAudiencia: equipo de decision.\nAccion: tomar la decision basada en las 6 perspectivas.",
    ["Los 6 hats estan cubiertos con profundidad", "Cada hat se mantiene en su perspectiva (no mezcla)", "El hat rojo incluye emociones reales (no las ignora)", "La sintesis azul tiene decision y proximos pasos"],
    [{'name': 'TEMA', 'desc': 'Tema, decision o situacion a analizar'}]
)

qspec("pensamiento_ooda_loop_decision_rapida",
    "Para tomar decisiones en entornos de alta velocidad y ambiguedad. El OODA Loop (Observar, Orientar, Decidir, Actuar) del coronel Boyd permite decidir mas rapido que la competencia.",
    "Estratega de Decision Rapida con formacion militar en OODA Loop y experiencia en entornos de alta presion (trading, crisis management, startups).",
    """OODA Loop:
1. Observar: que esta pasando REALMENTE? datos crudos, sin interpretacion
2. Orientar: que significa? contexto, mental models, experiencia previa
3. Decidir: cual es la mejor accion dado lo que se ahora?
4. Actuar: ejecutar rapidamente y volver a Observar
5. Meta: en que paso del loop estoy atascado?""",
    """Metodo:
- John Boyd OODA Loop: velocidad de decision > calidad perfecta
- Tempo: quien cicla el OODA mas rapido, gana
- Orientation is key: los sesgos viven en la orientacion
- Implicit guidance: con practica, el loop se vuelve automatico""",
    "Formato: analisis OODA aplicado + recomendacion de accion.\nTono: directo, sin analisis-paralisis.\nAudiencia: decision-maker bajo presion.\nAccion: ejecutar la decision ahora, iterar despues.",
    ["La observacion es de datos reales (no suposiciones)", "La orientacion identifica sesgos propios", "La decision es clara y ejecutable", "El ciclo tiene punto de re-evaluacion definido"],
    [{'name': 'SITUACION', 'desc': 'Situacion que requiere decision rapida'}, {'name': 'PRESION', 'desc': 'Tipo de presion (tiempo, competencia, crisis)', 'opt': True}]
)

qspec("pensamiento_bayesiano_actualizar_creencias",
    "Para actualizar creencias y estimaciones cuando llega nueva evidencia, en lugar de aferrarse a la primera impresion. El pensamiento bayesiano es la herramienta contra el sesgo de confirmacion.",
    "Analista Bayesiano con formacion en estadistica y teoria de decisiones bajo incertidumbre.",
    """Actualizacion Bayesiana:
1. Prior: cual es mi creencia/estimacion ANTES de la nueva evidencia? (probabilidad)
2. Nueva evidencia: que dato nuevo acaba de llegar?
3. Likelihood: que tan probable es esta evidencia SI mi creencia es correcta?
4. Likelihood alternativa: que tan probable es esta evidencia SI mi creencia es incorrecta?
5. Posterior: cual es mi creencia actualizada DESPUES de la evidencia?
6. Decision: cambia mi accion basada en la creencia actualizada?""",
    """Metodo:
- Bayes' Theorem: P(H|E) = P(E|H) * P(H) / P(E)
- Calibration: que tan bien calibradas estan tus probabilidades?
- Update incrementally: no flip-flop, ajusta gradualmente
- Base rates matter: no ignores la frecuencia base del evento""",
    "Formato: tabla prior > evidencia > posterior + recomendacion.\nTono: analitico, probabilistico.\nAudiencia: decision-maker que enfrenta incertidumbre.\nAccion: ajustar decision basada en el posterior actualizado.",
    ["El prior esta cuantificado (no vago)", "La evidencia esta evaluada por calidad", "El posterior es diferente del prior (hubo actualizacion real)", "La decision refleja el posterior, no la primera impresion"],
    [{'name': 'CREENCIA', 'desc': 'Creencia o estimacion actual a actualizar'}, {'name': 'EVIDENCIA', 'desc': 'Nueva evidencia que acaba de llegar'}]
)

qspec("pensamiento_occam_razor_solucion_simple",
    "Para elegir la solucion mas simple que resuelve el problema. La complejidad innecesaria es el mayor enemigo de la ejecucion. Si dos soluciones funcionan igual, elige la simple.",
    "Consultor de Simplificacion Estrategica con experiencia en reduccion de complejidad operativa para empresas en crecimiento.",
    """Navaja de Occam aplicada:
1. Listar todas las soluciones posibles al problema
2. Para cada una: cuantas suposiciones requiere? cuantas partes moviles tiene?
3. Ordenar por complejidad (menos suposiciones = mas simple)
4. Evaluar: la solucion simple resuelve el 80% del problema?
5. Si si: elegir la simple. Si no: agregar SOLO la complejidad necesaria.
6. Regla: la carga de la prueba esta en la complejidad, no en la simplicidad.""",
    """Metodo:
- Occam's Razor: entre explicaciones equivalentes, la mas simple gana
- KISS: Keep It Stupidly Simple
- Complexity budget: cada pieza compleja debe justificar su existencia
- MVP thinking: resolver el 80% con el 20% del esfuerzo""",
    "Formato: opciones rankeadas por complejidad + recomendacion + justificacion.\nTono: pragmatico.\nAudiencia: decision-maker que tiende a sobrecomplicar.\nAccion: implementar la solucion simple.",
    ["Las opciones estan rankeadas por numero de suposiciones", "La solucion simple resuelve el problema core", "La complejidad adicional (si existe) esta justificada", "La recomendacion es clara y accionable"],
    [{'name': 'PROBLEMA', 'desc': 'Problema a resolver'}, {'name': 'OPCIONES', 'desc': 'Soluciones consideradas (si ya las tienes)', 'opt': True}]
)

qspec("pensamiento_dialectico_tesis_antitesis",
    "Para generar comprension profunda confrontando dos posiciones opuestas y creando una sintesis que integre lo mejor de ambas. La verdad rara vez esta en un extremo.",
    "Facilitador de Pensamiento Dialectico con formacion filosofica y experiencia en mediacion de conflictos estrategicos.",
    """Proceso dialectico:
1. Tesis: la posicion A con sus mejores argumentos
2. Antitesis: la posicion B (opuesta) con sus mejores argumentos
3. Tensiones: donde se contradicen genuinamente (no superficialmente)
4. Verdades compartidas: que tienen en comun en el fondo
5. Sintesis: posicion C que integra las verdades de A y B y resuelve las tensiones
6. Evaluacion: la sintesis es mejor que A o B por separado?""",
    """Metodo:
- Hegel: tesis > antitesis > sintesis
- Steel man both sides: ambas posiciones en su version mas fuerte
- Integration > compromise: sintesis no es 50/50, es algo nuevo
- Productive tension: la contradiccion es el motor del progreso""",
    "Formato: tesis > antitesis > tensiones > sintesis.\nTono: filosofico-practico.\nAudiencia: pensador que necesita resolver una tension aparentemente irreconciliable.\nAccion: presentar la sintesis como nueva posicion.",
    ["Ambas posiciones estan en su version mas fuerte", "Las tensiones son genuinas (no artificiales)", "La sintesis es nueva (no un compromiso diluido)", "La sintesis es verificablemente mejor que las partes"],
    [{'name': 'POSICION_A', 'desc': 'Primera posicion o tesis'}, {'name': 'POSICION_B', 'desc': 'Posicion opuesta o antitesis'}]
)

qspec("pensamiento_lateral_provocacion",
    "Para escapar del pensamiento lineal y generar ideas genuinamente nuevas usando provocaciones deliberadas. El pensamiento lateral de De Bono rompe patrones establecidos.",
    "Facilitador de Pensamiento Lateral con certificacion en tecnicas de Edward de Bono y experiencia en innovacion de producto.",
    """Pensamiento Lateral:
1. Definir el patron de pensamiento actual (como se resuelve normalmente)
2. Provocacion: crear una afirmacion absurda o imposible (PO: ...)
3. Movimiento: desde la provocacion, que ideas nuevas surgen?
4. Random entry: elegir una palabra aleatoria y conectarla con el problema
5. Challenge: cuestionar por que se hace asi (no para criticar, para reimaginar)
6. Seleccionar las 3 ideas mas prometedoras nacidas del proceso""",
    """Metodo:
- Edward de Bono Lateral Thinking
- PO (Provocative Operation): afirmaciones deliberadamente absurdas
- Random entry: palabra aleatoria como catalizador
- Movement: no juzgar la provocacion, moverse DESDE ella""",
    "Formato: provocaciones + ideas generadas + top 3 seleccionadas.\nTono: provocador, jugueton-serio.\nAudiencia: equipo creativo o innovador.\nAccion: prototipar la idea lateral mas prometedora.",
    ["Min. 3 provocaciones genuinamente absurdas", "Las ideas son genuinamente diferentes al patron actual", "El top 3 es viable a pesar de nacer de lo absurdo", "El proceso es reproducible (no depende de inspiracion)"],
    [{'name': 'PROBLEMA', 'desc': 'Problema o area donde necesitas ideas nuevas'}, {'name': 'PATRON_ACTUAL', 'desc': 'Como se resuelve normalmente este tipo de problema'}]
)

qspec("pensamiento_abstraction_laddering",
    "Para subir y bajar en el nivel de abstraccion de un problema hasta encontrar el nivel correcto para resolverlo. Muchos problemas se resuelven en un nivel diferente al que se plantean.",
    "Consultor de Estrategia con experiencia en reframing de problemas y analisis multi-nivel (operativo, tactico, estrategico).",
    """Abstraction Laddering:
1. Nivel actual: como se plantea el problema hoy
2. Subir (Why?): por que es esto un problema? Que problema mas grande alimenta? (repetir 3x)
3. Bajar (How?): como se manifiesta concretamente? Que sub-problemas tiene? (repetir 3x)
4. Mapa de niveles: desde el mas abstracto al mas concreto
5. Nivel optimo: en cual nivel resolverlo tiene mas impacto?
6. Reformular el problema en el nivel optimo""",
    """Metodo:
- Abstraction laddering: Why (sube) / How (baja) / What (nivel actual)
- Right level of abstraction: ni tan abstracto que sea inaccionable, ni tan concreto que sea un parche
- Root problem vs symptom: el nivel correcto es donde vive la causa, no el sintoma""",
    "Formato: mapa de niveles (abstracto a concreto) + nivel optimo + problema reformulado.\nTono: analitico-reflexivo.\nAudiencia: problem-solver.\nAccion: resolver el problema en el nivel correcto.",
    ["El mapa tiene min. 3 niveles hacia arriba y 3 hacia abajo", "El nivel optimo esta justificado", "El problema reformulado es accionable", "El reformulado es diferente (y mejor) que el planteamiento original"],
    [{'name': 'PROBLEMA', 'desc': 'Problema como se plantea actualmente'}]
)

qspec("pensamiento_assumption_mapping",
    "Para hacer explicitas TODAS las suposiciones detras de un plan, estrategia o decision. Las suposiciones no validadas son minas terrestres. Mapearlas las desactiva.",
    "Analista de Riesgos Estrategicos con experiencia en validacion de supuestos para planes de inversion y estrategia corporativa.",
    """Assumption Map:
1. Listar TODAS las suposiciones del plan (min. 15)
2. Clasificar cada una: critica (si falla, el plan falla) vs nice-to-have
3. Clasificar por confianza: alta (tengo evidencia) / media (creo que si) / baja (no se)
4. Matriz 2×2: criticidad × confianza
5. Cuadrante peligroso: criticas + baja confianza = validar PRIMERO
6. Plan de validacion para cada suposicion del cuadrante peligroso""",
    """Metodo:
- Assumption mapping: hacer visible lo invisible
- Riskiest Assumption Test: validar primero lo que puede matarte
- Confidence calibration: cuanta evidencia realmente tienes?
- Validation experiments: como probar la suposicion rapido y barato""",
    "Formato: lista de suposiciones + matriz 2x2 + plan de validacion.\nTono: riguroso, sin complacencia.\nAudiencia: lider del plan.\nAccion: validar la suposicion mas peligrosa esta semana.",
    ["Min. 15 suposiciones identificadas", "La clasificacion criticidad/confianza es honesta", "El cuadrante peligroso tiene plan de validacion", "Las validaciones son ejecutables (no 'investigar mas')"],
    [{'name': 'PLAN', 'desc': 'Plan, estrategia o decision a analizar'}]
)

qspec("pensamiento_decision_journal_registro",
    "Para aprender de tus propias decisiones a lo largo del tiempo. Un Decision Journal captura: que decidiste, por que, que esperabas, y que paso realmente. Es el gym del juicio profesional.",
    "Coach de Decision-Making con experiencia en decision journals para traders, ejecutivos y emprendedores.",
    """Decision Journal:
1. Template de entrada: fecha, decision, contexto, opciones consideradas
2. Razonamiento: por que elegiste esta opcion (argumentos reales, no justificacion post-hoc)
3. Prediccion: que esperas que pase? con que probabilidad?
4. Estado emocional: como te sentias al decidir? (influye mas de lo que crees)
5. Review cadence: revisar decisiones pasadas cada 30 dias
6. Metricas: calibration score (prediccion vs realidad)""",
    """Metodo:
- Decision journal de Daniel Kahneman / Annie Duke
- Resulting: no juzgues la decision por el resultado (buena decision puede dar mal resultado)
- Calibration: mejorar la precision de tus predicciones con el tiempo
- Process > outcome: enfocarse en la calidad del proceso de decision""",
    "Formato: template de decision journal + ritual de review mensual.\nTono: reflexivo, sin auto-juicio.\nAudiencia: profesional que quiere mejorar su juicio.\nAccion: registrar la proxima decision importante con este template.",
    ["El template captura contexto, opciones, razonamiento y prediccion", "El estado emocional esta incluido (no ignorado)", "El ritual de review es mensual y sostenible", "Las metricas miden calibracion, no solo aciertos"],
    [{'name': 'TIPO_DECISIONES', 'desc': 'Tipo de decisiones que quieres trackear (inversiones, hiring, estrategia, etc.)'}]
)

qspec("pensamiento_cognitive_bias_audit",
    "Para identificar los sesgos cognitivos que estan influyendo en una decision o analisis actual. No podemos eliminar los sesgos, pero podemos detectarlos y compensar.",
    "Psicologa Cognitiva con especializacion en sesgos de decision y experiencia en debiasing para equipos de estrategia corporativa.",
    """Cognitive Bias Audit:
1. Describir la decision/analisis actual
2. Checklist de sesgos comunes aplicados a ESTE caso:
   - Confirmation bias: estoy buscando solo evidencia que confirme?
   - Anchoring: estoy anclado al primer numero/dato que vi?
   - Sunk cost: estoy considerando lo ya invertido que no se puede recuperar?
   - Availability: estoy sobrevalorando lo reciente o lo dramatico?
   - Dunning-Kruger: estoy seguro sin tener suficiente expertise?
   - Status quo: estoy favoreciendo no cambiar por comodidad?
3. Para cada sesgo detectado: como esta distorsionando el analisis
4. Estrategia de compensacion por sesgo
5. Decision ajustada post-audit""",
    """Metodo:
- Kahneman System 1/System 2: los sesgos viven en System 1
- Checklist approach: revisar sistematicamente, no depender de auto-deteccion
- Pre-mortem como debiasing: imaginar fallo activa pensamiento critico
- Red team: pedir que otro ataque tu razonamiento""",
    "Formato: checklist de sesgos + deteccion por caso + compensaciones + decision ajustada.\nTono: honesto, auto-critico.\nAudiencia: decision-maker que quiere decidir mejor.\nAccion: ajustar la decision basada en los sesgos detectados.",
    ["Min. 6 sesgos evaluados contra el caso especifico", "Al menos 2 sesgos detectados como activos", "Las compensaciones son concretas (no 'ser mas consciente')", "La decision ajustada es diferente a la pre-audit (si no, el audit fallo)"],
    [{'name': 'DECISION', 'desc': 'Decision o analisis a auditar'}, {'name': 'CONTEXTO', 'desc': 'Contexto de la decision'}]
)

qspec("pensamiento_reframing_cambiar_perspectiva",
    "Para transformar un problema cambiando el marco desde el que se observa. El mismo hecho se ve completamente diferente desde otro marco. Reframing no cambia la realidad — cambia lo que es posible.",
    "Facilitador de Reframing con formacion en PNL, terapia narrativa y estrategia creativa.",
    """Reframing en 5 lentes:
1. Frame actual: como se ve el problema/situacion hoy
2. Lente de oportunidad: donde esta la oportunidad escondida?
3. Lente temporal: como se vera esto en 5 anos? que cambia?
4. Lente del usuario: como lo ve la persona mas afectada?
5. Lente de recurso: que tengo que otros no tienen para resolver esto?
6. Mejor reframe: cual lente revela la perspectiva mas util y accionable?""",
    """Metodo:
- Reframing: cambiar el marco, no los hechos
- Multiple perspectives: min. 5 lentes diferentes
- Is this a problem or a constraint? Constraints enable creativity
- 'Yes, and...' (improv): construir sobre la realidad, no negarla""",
    "Formato: frame actual + 5 lentes + mejor reframe + accion.\nTono: revelador, expansivo.\nAudiencia: profesional atascado en un problema.\nAccion: abordar la situacion desde el mejor reframe.",
    ["El frame actual esta articulado con precision", "Las 5 lentes son genuinamente diferentes (no variaciones)", "El mejor reframe abre posibilidades que el frame original cerraba", "La accion es diferente bajo el nuevo frame"],
    [{'name': 'SITUACION', 'desc': 'Problema o situacion a reframear'}]
)

# ─── INVESTIGACION (M4) — 25 prompts ───

qspec("investigacion_protocolo_3_fases",
    "Para producir inteligencia verificable en 3 fases: exploracion amplia, analisis focalizado, validacion cruzada. La investigacion sin protocolo produce opiniones; con protocolo, produce evidencia.",
    "Analista de Inteligencia OSINT Senior con experiencia en investigacion de fuentes abiertas, verificacion de hechos y analisis para consultoria estrategica (15+ anos).",
    """Investigacion en 3 fases:
1. Fase 1 — Exploracion: busqueda amplia en fuentes diversas (min. 10 fuentes)
2. Fase 2 — Analisis: profundizacion en hallazgos clave, cruce de perspectivas
3. Fase 3 — Validacion: cruce con min. 3 fuentes independientes por hallazgo
4. Clasificacion de informacion por nivel de confiabilidad (alta/media/baja)
5. Identificacion de vacios de informacion y sesgos potenciales
6. Dossier ejecutivo con hallazgos, fuentes y gaps""",
    """Metodo:
- OSINT tradecraft: recoleccion > procesamiento > analisis > diseminacion
- Source evaluation: fiabilidad de fuente + veracidad de informacion
- Triangulacion: cada hallazgo clave validado por 3+ fuentes independientes
- Admission of uncertainty: marcar lo que NO sabemos""",
    "Formato: dossier ejecutivo con resumen + hallazgos clasificados + fuentes + gaps. Max 5 paginas. Tono: objetivo, basado en evidencia. Audiencia: decision-maker. Accion: tomar decision informada con nivel de confianza explicitado.",
    ["Minimo 10 fuentes consultadas", "Cada hallazgo clave tiene 3+ fuentes cruzadas", "Los vacios de informacion estan explicitados", "El nivel de confianza es honesto (no todo es 'alta confiabilidad')"],
    [{'name': 'TEMA', 'desc': 'Tema o entidad a investigar'}, {'name': 'OBJETIVO', 'desc': 'Para que necesitas esta informacion'}, {'name': 'FUENTES', 'desc': 'Tipos de fuentes preferidas', 'opt': True}]
)

qspec("investigacion_factcheck_afirmacion",
    "Para verificar la veracidad de una afirmacion antes de usarla en un entregable o tomar una decision basada en ella. En la era de la desinformacion, el fact-checking es higiene profesional.",
    "Fact-Checker Profesional con metodologia de Reuters y AP, especializado en verificacion de datos corporativos y estadisticas de mercado.",
    """Protocolo de fact-checking:
1. Aislar la afirmacion verificable exacta
2. Rastrear la fuente original (no la que la cita)
3. Buscar min. 3 fuentes independientes
4. Verificar fecha, contexto y completitud del dato
5. Buscar contra-evidencia o interpretaciones alternativas
6. Veredicto: Verdadero / Parcialmente Verdadero / Enganoso / Falso / No Verificable""",
    """Metodo:
- Source tracing: llegar a la fuente primaria, no la secundaria
- Contexto completo: el dato sin contexto puede ser enganoso
- Steel-man the opposition: buscar la mejor contra-evidencia
- Transparency: explicar el proceso de verificacion""",
    "Formato: reporte de verificacion con afirmacion, fuentes, veredicto y explicacion. Tono: neutral, riguroso. Audiencia: profesional que necesita certeza. Accion: usar o descartar la afirmacion con confianza.",
    ["La fuente original fue rastreada", "Min. 3 fuentes independientes consultadas", "El veredicto tiene explicacion transparente", "La contra-evidencia fue buscada activamente"],
    [{'name': 'AFIRMACION', 'desc': 'Afirmacion o dato a verificar'}, {'name': 'CONTEXTO', 'desc': 'Donde encontraste esta afirmacion'}]
)

qspec("investigacion_tendencias_sector",
    "Para mapear tendencias emergentes y senales debiles que afectaran a {{SECTOR}} en los proximos {{HORIZONTE}}. Quien ve las tendencias primero, decide primero.",
    "Analista de Tendencias y Futuros con experiencia en horizon scanning, analisis de senales debiles y consultoria de futuros para empresas multinacionales.",
    """Mapa de tendencias:
1. Mega-tendencias globales que afectan al sector
2. Senales debiles y tendencias emergentes (no mainstream todavia)
3. Analisis STEEP: Social, Tecnologico, Economico, Ecologico, Politico
4. Oportunidades por horizonte temporal (corto, medio, largo plazo)
5. Amenazas y disrupciones potenciales
6. Top 5 oportunidades estrategicas priorizadas""",
    """Metodo:
- Horizon scanning: 3 horizontes (H1: 1 ano, H2: 3 anos, H3: 5+ anos)
- STEEP analysis por dimension
- Weak signal detection: que esta pasando en los margenes
- Scenario planning: cruzar tendencias para imaginar futuros""",
    "Formato: mapa de tendencias por horizonte + analisis STEEP + top 5 oportunidades. Tono: estrategico. Audiencia: director de estrategia. Accion: incorporar al menos 1 tendencia en la planificacion actual.",
    ["Las mega-tendencias estan diferenciadas de las senales debiles", "El analisis STEEP cubre las 5 dimensiones", "Las oportunidades estan priorizadas con criterio", "Al menos 2 senales debiles son genuinamente no-obvias"],
    [{'name': 'SECTOR', 'desc': 'Sector o industria'}, {'name': 'HORIZONTE', 'desc': 'Horizonte temporal (1, 3, 5 anos)'}]
)

qspec("investigacion_dossier_empresa",
    "Para tener inteligencia completa sobre una empresa antes de una reunion, negociacion, partnership o decision de inversion. La preparacion es la ventaja competitiva mas infravalorada.",
    "Analista de Inteligencia Corporativa con experiencia en due diligence, perfilamiento organizacional y analisis competitivo para fondos de inversion.",
    """Dossier corporativo:
1. Perfil: historia, estructura, governance, tamano, ubicaciones
2. Posicion financiera: ingresos, crecimiento, salud (si es publica)
3. Equipo directivo: decisores clave, trayectoria, red de influencia
4. Posicion competitiva: market share, diferenciadores, debilidades
5. Movimientos estrategicos recientes: adquisiciones, lanzamientos, pivotes
6. Evaluacion: fortalezas, riesgos y oportunidades para TI""",
    """Metodo:
- Open source intelligence (OSINT) sobre fuentes publicas
- Analisis de red: conexiones entre directivos y ecosistema
- Financial health indicators: revenue growth, margins, debt
- Competitive positioning: Porter's, market share, differentiation""",
    "Formato: dossier ejecutivo max 5 paginas. Tono: analitico-objetivo. Audiencia: profesional que se reunira con esta empresa. Accion: llegar preparado con informacion que la contraparte no espera que tengas.",
    ["Perfil corporativo cubre estructura y governance", "Equipo directivo tiene al menos 3 perfiles clave", "La evaluacion final es honesta (no solo positiva)", "Las fuentes son citadas y verificables"],
    [{'name': 'EMPRESA', 'desc': 'Nombre de la empresa a investigar'}, {'name': 'OBJETIVO', 'desc': 'Para que (reunion, inversion, partnership, competencia)'}]
)

qspec("investigacion_sintesis_multiples_fuentes",
    "Para convertir multiples documentos, papers o reportes en un unico documento ejecutivo coherente. La abundancia de informacion sin sintesis es ruido.",
    "Investigador Senior especializado en revisiones sistematicas, meta-analisis y sintesis de literatura para consultoria estrategica.",
    """Sintesis ejecutiva:
1. Extraer hallazgos clave de cada fuente
2. Mapear consensos entre fuentes
3. Mapear contradicciones y tensiones
4. Identificar vacios (que ninguna fuente cubre)
5. Sintetizar en narrative review ejecutiva
6. Traducir hallazgos a recomendaciones practicas""",
    """Metodo:
- Systematic review approach: extraccion > clasificacion > sintesis
- Evidence mapping: consenso, contradiccion, vacio
- Strength of evidence: fuentes primarias > secundarias > opinion
- So-what test: cada hallazgo debe tener implicacion practica""",
    "Formato: sintesis ejecutiva con tabla de hallazgos por fuente, mapa de consensos/contradicciones, gaps y recomendaciones. Tono: objetivo. Audiencia: decision-maker con poco tiempo. Accion: tomar decisiones informadas sin leer todas las fuentes.",
    ["Todas las fuentes estan representadas en la sintesis", "Los consensos y contradicciones estan mapeados", "Los vacios de informacion estan explicitados", "Las recomendaciones conectan con los hallazgos (no son opiniones sueltas)"],
    [{'name': 'TEMA', 'desc': 'Tema de la investigacion'}, {'name': 'FUENTES', 'desc': 'Fuentes a sintetizar (titulos, URLs o resumenes)'}]
)

qspec("investigacion_benchmark_competitivo",
    "Para comparar tu rendimiento contra los mejores del sector con rigor metodologico. Sin benchmark, 'estamos bien' es una opinion. Con benchmark, es un hecho.",
    "Analista de Benchmarking con certificacion en APQC Benchmarking y experiencia en estudios comparativos para consultoria estrategica.",
    """Benchmark competitivo:\n1. Definir metricas clave a comparar (5-10)\n2. Identificar benchmark partners: competidores directos + best-in-class de otros sectores\n3. Recopilar datos comparativos (publicos, estimados, proxy)\n4. Tabla: metrica > tu valor > promedio sector > best-in-class > gap\n5. Root cause: por que existen los gaps mas grandes\n6. Plan de cierre para top 3 gaps""",
    "Metodo:\n- APQC benchmarking methodology\n- Fuentes: reportes de industria, earnings calls, LinkedIn, press releases\n- Gap analysis: cuantificar la distancia al mejor\n- Actionable gaps only: solo los que valen la pena cerrar",
    "Formato: tabla comparativa + gap analysis + plan de cierre.\nTono: analitico, basado en datos.\nAudiencia: director de estrategia.\nAccion: comenzar a cerrar el gap #1.",
    ["Las metricas son comparables (misma definicion)", "Min. 3 benchmark partners identificados", "Los gaps estan cuantificados", "El plan de cierre tiene acciones concretas"],
    [{'name': 'SECTOR', 'desc': 'Tu sector o industria'}, {'name': 'METRICAS', 'desc': 'Metricas clave a comparar'}, {'name': 'COMPETIDORES', 'desc': 'Competidores a incluir', 'opt': True}]
)

qspec("investigacion_due_diligence_rapida",
    "Para evaluar rapidamente una oportunidad (inversion, partnership, proveedor) con un due diligence estructurado. Rapido no significa superficial — significa enfocado en lo que importa.",
    "Analista de Due Diligence con experiencia en evaluacion de oportunidades para fondos de inversion y decisiones de partnership.",
    """Due Diligence rapida:\n1. Perfil de la entidad: que es, tamano, historia, reputacion\n2. Red flags check: litigios, noticias negativas, cambios de liderazgo\n3. Salud financiera: ingresos, crecimiento, deuda (si aplica)\n4. Capacidad: pueden cumplir lo que prometen?\n5. Riesgo: que puede salir mal y con que probabilidad\n6. Veredicto: proceed / proceed with caution / avoid""",
    "Metodo:\n- Structured OSINT: fuentes publicas verificables\n- Red flag checklist: litigios, regulatorios, reputacionales\n- Reference check: que dice el mercado sobre ellos\n- Risk-adjusted evaluation: no solo upside, sino downside",
    "Formato: ficha de DD en max 3 paginas.\nTono: objetivo, basado en hechos.\nAudiencia: decision-maker que evalua la oportunidad.\nAccion: tomar decision go/no-go.",
    ["Perfil cubre los 5 puntos criticos", "Red flags buscados activamente (no solo positivos)", "Veredicto tiene justificacion y nivel de confianza", "Fuentes son verificables"],
    [{'name': 'ENTIDAD', 'desc': 'Empresa, persona o proyecto a evaluar'}, {'name': 'TIPO', 'desc': 'Tipo de oportunidad (inversion, partnership, proveedor, cliente)'}]
)

qspec("investigacion_mapa_stakeholders",
    "Para mapear todos los stakeholders de una iniciativa con su nivel de influencia, interes y postura. Sin mapa de stakeholders, no sabes a quien convencer primero.",
    "Consultor de Gestion de Stakeholders con experiencia en mapeo de poder e influencia para proyectos de transformacion organizacional.",
    """Stakeholder Map:\n1. Identificar todos los stakeholders (directos e indirectos)\n2. Clasificar por: poder (alto/bajo) × interes (alto/bajo)\n3. Postura actual: aliado / neutral / resistente\n4. Preocupacion principal de cada stakeholder\n5. Estrategia de engagement por cuadrante\n6. Top 5 stakeholders criticos con plan personalizado""",
    "Metodo:\n- Power-Interest matrix de Mendelow\n- Stakeholder salience: poder × legitimidad × urgencia\n- Engagement strategy: manage closely / keep satisfied / keep informed / monitor\n- Influence network: quien influye a quien",
    "Formato: matriz poder-interes + tabla de stakeholders + estrategia.\nTono: estrategico.\nAudiencia: lider de la iniciativa.\nAccion: ejecutar plan de engagement con los top 5.",
    ["Todos los stakeholders estan identificados (no solo los obvios)", "La clasificacion poder/interes esta justificada", "Cada stakeholder tiene estrategia de engagement", "Los top 5 tienen plan personalizado"],
    [{'name': 'INICIATIVA', 'desc': 'Proyecto o iniciativa a mapear'}, {'name': 'CONTEXTO', 'desc': 'Contexto organizacional'}]
)

qspec("investigacion_analisis_competitivo_5_fuerzas",
    "Para evaluar el atractivo y la dinamica competitiva de un sector usando las 5 Fuerzas de Porter. Entender la estructura del juego antes de jugar.",
    "Estratega Competitivo con formacion en estrategia empresarial (Porter, Mintzberg) y experiencia en analisis sectorial para consultoria.",
    """5 Fuerzas de Porter:\n1. Rivalidad entre competidores: intensidad, diferenciacion, concentracion\n2. Amenaza de nuevos entrantes: barreras de entrada, capital, regulacion\n3. Poder de proveedores: concentracion, costo de cambio, alternativas\n4. Poder de compradores: concentracion, sensibilidad a precio, alternativas\n5. Amenaza de sustitutos: disponibilidad, relacion precio-rendimiento\n6. Conclusion: atractivo del sector (alto/medio/bajo) + implicaciones estrategicas""",
    "Metodo:\n- Michael Porter Competitive Forces\n- Scoring 1-5 por fuerza para cuantificar\n- Dynamic analysis: como estan cambiando las fuerzas\n- Strategic implications: que posicion tomar dado el analisis",
    "Formato: analisis por fuerza + scoring + conclusion estrategica.\nTono: analitico.\nAudiencia: director de estrategia.\nAccion: ajustar estrategia segun las fuerzas dominantes.",
    ["Las 5 fuerzas tienen scoring cuantitativo", "El analisis incluye dinamica (como estan cambiando)", "La conclusion tiene implicaciones estrategicas accionables", "Las fuentes de datos estan citadas"],
    [{'name': 'SECTOR', 'desc': 'Sector o industria a analizar'}, {'name': 'EMPRESA', 'desc': 'Tu empresa o posicion en el sector', 'opt': True}]
)

qspec("investigacion_pestel_entorno_macro",
    "Para analizar el entorno macro que afecta a tu organizacion o sector. PESTEL revela fuerzas externas que no controlas pero debes anticipar.",
    "Analista de Entorno Macro con formacion en economia politica y experiencia en analisis PESTEL para planificacion estrategica.",
    """Analisis PESTEL:\n1. Politico: regulaciones, estabilidad, politicas comerciales\n2. Economico: inflacion, tipo de cambio, crecimiento, empleo\n3. Social: demografia, tendencias culturales, estilos de vida\n4. Tecnologico: innovaciones, adopcion digital, disrupcion\n5. Ecologico: sostenibilidad, regulaciones ambientales, cambio climatico\n6. Legal: legislacion laboral, propiedad intelectual, compliance\n7. Impacto: para cada factor, impacto en MI organizacion (alto/medio/bajo)\n8. Oportunidades y amenazas priorizadas""",
    "Metodo:\n- PESTEL framework con scoring de impacto\n- Horizon scanning: fuentes de prensa, think tanks, reguladores\n- So-what: cada factor con implicacion concreta para la organizacion\n- Time horizon: corto (1 ano), medio (3 anos), largo (5+ anos)",
    "Formato: tabla PESTEL con scoring + oportunidades/amenazas priorizadas.\nTono: estrategico-analitico.\nAudiencia: equipo de planificacion estrategica.\nAccion: incorporar top 3 factores en la planificacion actual.",
    ["Las 6 dimensiones estan cubiertas con datos", "Cada factor tiene impacto cuantificado", "Las oportunidades y amenazas son especificas a la organizacion", "El horizonte temporal esta diferenciado"],
    [{'name': 'ORGANIZACION', 'desc': 'Tu organizacion o sector'}, {'name': 'PAIS', 'desc': 'Pais o region de operacion'}]
)

qspec("investigacion_voice_of_customer",
    "Para capturar y estructurar la voz del cliente de forma que informe decisiones de producto, servicio o estrategia. El cliente sabe lo que duele — tu trabajo es escuchar con estructura.",
    "Investigadora de UX Senior con experiencia en voice-of-customer programs, customer discovery y Jobs-to-be-Done methodology.",
    """Voice of Customer:\n1. Definir preguntas de investigacion (que necesitas saber)\n2. Segmentar clientes: actuales, potenciales, perdidos\n3. Guia de entrevista: 10 preguntas abiertas + 5 de sondeo\n4. Framework de analisis: temas, frecuencia, intensidad\n5. Customer quotes textuales (no interpretaciones)\n6. Insights priorizados por impacto en negocio\n7. Recomendaciones con conexion directa a quotes""",
    "Metodo:\n- Jobs-to-be-Done: que trabajo contrata el cliente\n- Pain/Gain analysis: que duele, que valoran\n- Verbatim quotes: las palabras exactas del cliente pesan mas que interpretaciones\n- Triangulation: cruzar lo que dicen, lo que hacen, lo que sienten",
    "Formato: reporte VOC con quotes, insights y recomendaciones.\nTono: centrado en el cliente.\nAudiencia: equipo de producto o estrategia.\nAccion: actuar sobre el insight #1.",
    ["Las preguntas de investigacion son claras", "Los insights tienen quotes textuales como evidencia", "Los segmentos de clientes estan representados", "Las recomendaciones conectan directamente con quotes"],
    [{'name': 'PRODUCTO', 'desc': 'Producto o servicio a investigar'}, {'name': 'SEGMENTOS', 'desc': 'Segmentos de clientes a investigar'}]
)

qspec("investigacion_analisis_swot_estrategico",
    "Para producir un SWOT que no sea un ejercicio generico sino una herramienta de decision estrategica. El SWOT bueno cruza fortalezas con oportunidades y debilidades con amenazas.",
    "Consultor de Estrategia con experiencia en TOWS Matrix y formulacion estrategica basada en SWOT cruzado.",
    """SWOT Estrategico:\n1. Fortalezas: que haces mejor que la competencia (con evidencia)\n2. Debilidades: donde eres vulnerable (honestamente)\n3. Oportunidades: tendencias externas que puedes capitalizar\n4. Amenazas: fuerzas externas que pueden danarte\n5. TOWS Matrix: cruzar S×O, S×T, W×O, W×T para generar estrategias\n6. Top 3 iniciativas estrategicas priorizadas""",
    "Metodo:\n- SWOT + TOWS Matrix: el cruce es donde esta el valor\n- SO strategies: usar fortalezas para capitalizar oportunidades\n- WT strategies: minimizar debilidades ante amenazas\n- Evidence-based: cada punto con dato o ejemplo concreto",
    "Formato: SWOT visual + TOWS matrix + 3 iniciativas priorizadas.\nTono: estrategico.\nAudiencia: equipo directivo.\nAccion: lanzar la iniciativa #1.",
    ["Cada cuadrante tiene min. 4 puntos con evidencia", "La TOWS matrix genera estrategias concretas por cruce", "Las 3 iniciativas son accionables", "Las debilidades son honestas (no cosmeticas)"],
    [{'name': 'ORGANIZACION', 'desc': 'Organizacion o unidad a analizar'}, {'name': 'SECTOR', 'desc': 'Sector o industria'}]
)

qspec("investigacion_analisis_sentimiento_marca",
    "Para entender como percibe el mercado tu marca, producto o servicio analizando fuentes publicas. La percepcion es la realidad del cliente.",
    "Analista de Brand Intelligence con experiencia en social listening, analisis de sentimiento y reputacion digital.",
    """Analisis de sentimiento:\n1. Fuentes: redes sociales, resenas, foros, prensa, Glassdoor\n2. Volumen: cuantas menciones, con que frecuencia\n3. Sentimiento: positivo, neutro, negativo (distribucion %)\n4. Temas recurrentes: que se dice mas (word cloud tematico)\n5. Comparacion con competidores (si hay datos)\n6. Alertas: temas negativos que requieren accion inmediata\n7. Recomendaciones por tema""",
    "Metodo:\n- Social listening frameworks\n- Sentiment classification: positivo/neutro/negativo + intensidad\n- Topic clustering: agrupar por temas recurrentes\n- Competitive share of voice: como te mencionan vs competencia",
    "Formato: dashboard de sentimiento + temas + alertas + recomendaciones.\nTono: analitico, basado en datos.\nAudiencia: equipo de marketing o reputacion.\nAccion: responder a las alertas criticas.",
    ["Las fuentes cubren min. 3 canales diferentes", "El sentimiento esta cuantificado (%)", "Los temas recurrentes estan agrupados", "Las alertas tienen nivel de urgencia"],
    [{'name': 'MARCA', 'desc': 'Marca, producto o servicio a analizar'}, {'name': 'PERIODO', 'desc': 'Periodo de analisis'}]
)

qspec("investigacion_market_sizing_tam_sam_som",
    "Para estimar el tamano de mercado de una oportunidad con rigor: TAM (total), SAM (al que puedes acceder), SOM (que puedes capturar realistamente).",
    "Analista de Mercados con experiencia en market sizing para startups, fondos de inversion y planificacion estrategica corporativa.",
    """Market Sizing TAM/SAM/SOM:\n1. TAM: mercado total disponible (top-down + bottom-up)\n2. SAM: mercado accesible por tu modelo de negocio\n3. SOM: mercado capturabel realistamente en 1-3 anos\n4. Metodologia top-down: fuentes macro + filtros\n5. Metodologia bottom-up: unidades × precio × penetracion\n6. Triangulacion: comparar ambos metodos\n7. Sensibilidad: que pasa si las suposiciones cambian +/-20%""",
    "Metodo:\n- Top-down: mercado total → filtros → segmento\n- Bottom-up: clientes potenciales × ticket promedio × frecuencia\n- Triangulation: ambos metodos deben converger\n- Cite sources: cada numero con fuente verificable",
    "Formato: estimacion TAM/SAM/SOM con metodologia + sensibilidad.\nTono: analitico, conservador.\nAudiencia: inversores o comite de estrategia.\nAccion: decidir si la oportunidad justifica inversion.",
    ["TAM tiene calculo top-down Y bottom-up", "Los filtros de TAM a SAM estan justificados", "El SOM es realista (no optimista)", "El analisis de sensibilidad muestra rango"],
    [{'name': 'OPORTUNIDAD', 'desc': 'Producto, servicio o mercado a dimensionar'}, {'name': 'GEOGRAFIA', 'desc': 'Region geografica'}]
)

qspec("investigacion_patent_landscape",
    "Para mapear el panorama de patentes en un area tecnologica y detectar tendencias de innovacion, espacios en blanco y posibles infractores.",
    "Analista de Patentes con formacion en propiedad intelectual y experiencia en patent landscaping para equipos de I+D y estrategia de IP.",
    """Patent Landscape:\n1. Busqueda por keywords, clasificacion IPC/CPC, assignees\n2. Volumen de patentes por ano (tendencia de actividad)\n3. Top assignees (quien esta patentando mas)\n4. Clusters tecnologicos (areas de concentracion)\n5. White spaces: areas sin patentes (oportunidad)\n6. Patentes relevantes para {{TECNOLOGIA}} (lista de top 10)\n7. Implicaciones para tu estrategia de IP""",
    "Metodo:\n- Patent database search: Google Patents, Espacenet, USPTO\n- IPC/CPC classification analysis\n- Citation analysis: patentes mas influyentes\n- Freedom-to-operate: areas sin restriccion de IP",
    "Formato: reporte de patent landscape + graficos de tendencia + white spaces.\nTono: tecnico-estrategico.\nAudiencia: equipo de I+D o estrategia de IP.\nAccion: priorizar white spaces para innovacion.",
    ["La busqueda cubre las bases de datos principales", "Las tendencias temporales estan visualizadas", "Los white spaces estan identificados", "Las implicaciones son estrategicas, no solo descriptivas"],
    [{'name': 'TECNOLOGIA', 'desc': 'Area tecnologica a investigar'}, {'name': 'EMPRESA', 'desc': 'Tu empresa o contexto', 'opt': True}]
)

qspec("investigacion_caso_estudio_analisis",
    "Para descomponer un caso de estudio (exito o fracaso) y extraer lecciones transferibles a tu contexto. Aprender de otros es el atajo mas barato hacia la sabiduria.",
    "Analista de Casos de Estudio con formacion en Harvard Case Method y experiencia en creacion de case studies para escuelas de negocio.",
    """Analisis de Caso:\n1. Contexto: que empresa, cuando, que sector, que tamano\n2. Situacion: que problema o oportunidad enfrentaban\n3. Decision: que decidieron hacer y por que\n4. Ejecucion: como lo implementaron\n5. Resultado: que paso (metricas si hay)\n6. Lecciones: que se puede generalizar\n7. Transferencia: como aplica esto a {{CONTEXTO}}""",
    "Metodo:\n- Harvard Case Method: situacion > decision > resultado > leccion\n- Survivorship bias check: tambien analizar fracasos\n- Contextual transfer: la leccion es universal o dependio del contexto?\n- Actionable lessons: cada leccion con 'esto significa que TU deberias...'",
    "Formato: analisis de caso + lecciones + transferencia a tu contexto.\nTono: analitico-pedagogico.\nAudiencia: decision-maker que quiere aprender de otros.\nAccion: aplicar la leccion #1 a tu situacion.",
    ["El contexto del caso esta completo", "El resultado tiene metricas o evidencia", "Las lecciones son genuinamente transferibles", "La conexion con tu contexto es explicita"],
    [{'name': 'CASO', 'desc': 'Caso de estudio a analizar (empresa, evento, decision)'}, {'name': 'CONTEXTO', 'desc': 'Tu contexto al que quieres transferir las lecciones'}]
)

qspec("investigacion_regulatory_scan",
    "Para mapear el entorno regulatorio que afecta una iniciativa, producto o mercado. Lo que no sabes de regulacion puede matar tu proyecto mas rapido que la competencia.",
    "Analista Regulatorio con experiencia en compliance, evaluacion de impacto regulatorio y navegacion de marcos legales multijurisdiccionales.",
    """Scan regulatorio:\n1. Marco regulatorio actual: leyes, normas, estandares aplicables\n2. Regulaciones en proceso: proyectos de ley, consultaciones publicas\n3. Precedentes: como se han interpretado las regulaciones existentes\n4. Riesgos de compliance: donde podrias estar en incumplimiento\n5. Oportunidades regulatorias: incentivos, subsidios, sandbox\n6. Mapa: regulacion × impacto en tu iniciativa × timeline""",
    "Metodo:\n- Regulatory scanning: fuentes oficiales, gacetas, parlamentos\n- Impact assessment: como cada regulacion afecta tu operacion\n- Compliance gap analysis: donde estas vs donde deberias estar\n- Regulatory horizon: que viene en los proximos 12-24 meses",
    "Formato: mapa regulatorio + riesgos + oportunidades.\nTono: tecnico-legal, accesible.\nAudiencia: lider del proyecto + equipo legal.\nAccion: cerrar el gap de compliance de mayor riesgo.",
    ["Las regulaciones vigentes estan mapeadas con fuente", "Las regulaciones en proceso estan identificadas", "Los riesgos de compliance estan cuantificados", "Las oportunidades regulatorias son concretas"],
    [{'name': 'INICIATIVA', 'desc': 'Producto, servicio o iniciativa a evaluar'}, {'name': 'JURISDICCION', 'desc': 'Pais o jurisdiccion aplicable'}]
)

qspec("investigacion_literature_review",
    "Para producir una revision de literatura estructurada sobre un tema, identificando el estado del arte, los debates abiertos y los vacios de conocimiento.",
    "Investigador Academico Senior con experiencia en revisiones sistematicas (PRISMA framework) y publicacion en journals indexados.",
    """Literature Review:\n1. Pregunta de investigacion\n2. Estrategia de busqueda: bases de datos, keywords, criterios de inclusion/exclusion\n3. Seleccion: cuantos papers encontrados vs incluidos\n4. Extraccion: hallazgos clave por paper (tabla)\n5. Sintesis: que dice la evidencia en su conjunto\n6. Debates abiertos: donde la evidencia es contradictoria\n7. Vacios: que no se ha investigado todavia""",
    "Metodo:\n- Systematic review light (no full PRISMA pero con rigor)\n- Evidence hierarchy: meta-analisis > RCT > observacional > opinion\n- Narrative synthesis: contar la historia que cuenta la evidencia\n- Critical appraisal: no toda evidencia pesa igual",
    "Formato: tabla de papers + sintesis narrativa + debates + vacios.\nTono: academico-accesible.\nAudiencia: profesional que necesita base de evidencia solida.\nAccion: usar la sintesis como fundamento para decisiones.",
    ["La estrategia de busqueda es reproducible", "La tabla de extraccion cubre los papers clave", "Los debates abiertos estan articulados", "Los vacios son oportunidades de investigacion"],
    [{'name': 'TEMA', 'desc': 'Tema de investigacion'}, {'name': 'ALCANCE', 'desc': 'Alcance (ultimos 5 anos, area especifica, etc.)', 'opt': True}]
)

qspec("investigacion_analisis_redes_influencia",
    "Para mapear redes de influencia en un ecosistema: quien influye a quien, donde estan los nodos de poder y como fluye la informacion.",
    "Analista de Redes Sociales con formacion en network science y experiencia en mapeo de ecosistemas de influencia para estrategia de negocios.",
    """Analisis de Red:\n1. Identificar actores clave del ecosistema (min. 20)\n2. Mapear relaciones: quien influye a quien, tipo de relacion\n3. Nodos de poder: actores con mas conexiones (hubs)\n4. Bridges: actores que conectan sub-comunidades\n5. Clusters: grupos densos de relaciones mutuas\n6. Implicaciones estrategicas: a quien acercarse, a traves de quien""",
    "Metodo:\n- Network analysis: centralidad, betweenness, clustering\n- Influence mapping: formal (jerarquia) + informal (relaciones)\n- Structural holes: donde hay gaps que puedes llenar\n- Strategy: acceder al cluster correcto a traves del bridge correcto",
    "Formato: mapa de red (texto o diagrama) + analisis de nodos + estrategia.\nTono: estrategico.\nAudiencia: profesional que necesita navegar un ecosistema.\nAccion: conectar con el bridge mas estrategico.",
    ["Min. 20 actores identificados", "Los tipos de relacion estan diferenciados", "Los hubs y bridges estan senalados", "La estrategia de acceso es concreta"],
    [{'name': 'ECOSISTEMA', 'desc': 'Ecosistema o industria a mapear'}, {'name': 'OBJETIVO', 'desc': 'Que quieres lograr en este ecosistema'}]
)

qspec("investigacion_scenario_planning_futuros",
    "Para construir escenarios plausibles del futuro que permitan tomar decisiones robustas ante la incertidumbre. No predecir el futuro — prepararse para varios.",
    "Futurista y Scenario Planner con formacion en prospectiva estrategica (Shell method) y experiencia en talleres de escenarios para comites directivos.",
    """Scenario Planning:\n1. Focal question: que necesitamos decidir?\n2. Driving forces: fuerzas que moldean el futuro del tema (STEEP)\n3. Critical uncertainties: las 2 fuerzas mas inciertas y de mayor impacto\n4. 4 escenarios: cruce de las 2 incertidumbres en una matriz 2×2\n5. Narrativa por escenario: nombre, historia, como se siente vivir ahi\n6. Implicaciones: que harias diferente en cada escenario\n7. Decisiones robustas: que acciones son buenas en TODOS los escenarios""",
    "Metodo:\n- Shell/GBN scenario planning method\n- 2×2 matrix: cruzar las 2 incertidumbres mas criticas\n- Wind-tunneling: testear decisiones contra los 4 escenarios\n- No-regret moves: acciones robustas en cualquier futuro",
    "Formato: 4 escenarios + narrativas + decisiones robustas.\nTono: estrategico, imaginativo pero riguroso.\nAudiencia: equipo de estrategia.\nAccion: implementar las decisiones no-regret.",
    ["Las 2 incertidumbres criticas estan justificadas", "Los 4 escenarios son plausibles y diferenciados", "Las narrativas son vividas (no solo descriptivas)", "Las decisiones robustas funcionan en los 4 escenarios"],
    [{'name': 'PREGUNTA', 'desc': 'Pregunta estrategica sobre el futuro'}, {'name': 'HORIZONTE', 'desc': 'Horizonte temporal (3, 5, 10 anos)'}]
)

qspec("investigacion_data_collection_plan",
    "Para disenar un plan de recoleccion de datos que garantice informacion util, confiable y accionable. Recolectar datos sin plan es acumular ruido.",
    "Investigador de Mercado con experiencia en diseno de estudios, metodologia de encuestas y analisis cuantitativo/cualitativo.",
    """Plan de recoleccion de datos:\n1. Pregunta de investigacion: que necesitas saber EXACTAMENTE\n2. Tipo de dato: cuantitativo, cualitativo, mixto\n3. Fuentes: primarias (encuestas, entrevistas) vs secundarias (reportes, bases)\n4. Muestra: quien, cuantos, como seleccionarlos\n5. Instrumento: cuestionario, guia, protocolo\n6. Timeline: cuando recolectar, cuanto tiempo\n7. Analisis previsto: como vas a analizar ANTES de recolectar""",
    "Metodo:\n- Research design: la pregunta determina el metodo, no al reves\n- Sample design: representatividad > volumen\n- Instrument design: preguntas que produzcan datos analizables\n- Pre-mortem: que puede salir mal en la recoleccion",
    "Formato: plan de investigacion completo + instrumento borrador.\nTono: metodologico.\nAudiencia: equipo de investigacion.\nAccion: lanzar la recoleccion segun el plan.",
    ["La pregunta de investigacion es especifica y contestable", "El metodo es apropiado para la pregunta", "La muestra esta justificada", "El analisis previsto esta definido ANTES de recolectar"],
    [{'name': 'PREGUNTA', 'desc': 'Que necesitas saber'}, {'name': 'RECURSOS', 'desc': 'Presupuesto y tiempo disponible', 'opt': True}]
)

qspec("investigacion_media_monitoring_alertas",
    "Para monitorear sistematicamente la cobertura mediatica de un tema, empresa o sector. Lo que no monitoreas, te sorprende.",
    "Especialista en Media Intelligence con experiencia en monitoreo de medios, analisis de cobertura y crisis communications.",
    """Media Monitoring:\n1. Keywords y queries de busqueda configurados\n2. Fuentes: medios nacionales, internacionales, especializados, blogs, podcasts\n3. Dashboard: volumen, sentimiento, medios, tono\n4. Alertas: triggers automaticos para cobertura critica\n5. Analisis semanal: que se dijo, que importa, que hacer\n6. Benchmark: tu cobertura vs competidores (share of voice)""",
    "Metodo:\n- Media monitoring best practices\n- Sentiment analysis: positivo/neutro/negativo por fuente\n- Share of voice: tu presencia vs competencia\n- Tiered alerting: critico (inmediato) / importante (diario) / FYI (semanal)",
    "Formato: configuracion de monitoreo + template de reporte semanal.\nTono: operativo.\nAudiencia: equipo de comunicaciones o PR.\nAccion: configurar alertas hoy.",
    ["Los keywords cubren variantes y contextos", "Las fuentes son diversas (no solo un tipo)", "Las alertas tienen niveles de severidad", "El benchmark incluye competidores"],
    [{'name': 'TEMA', 'desc': 'Tema, empresa o sector a monitorear'}, {'name': 'COMPETIDORES', 'desc': 'Competidores a incluir en benchmark', 'opt': True}]
)

qspec("investigacion_expert_interview_guide",
    "Para preparar una entrevista con un experto que extraiga maximo conocimiento en minimo tiempo. El arte de la entrevista no es hacer preguntas — es hacer las preguntas correctas.",
    "Entrevistadora Senior con experiencia en entrevistas de expertos para consultoria estrategica, periodismo investigativo y customer discovery.",
    """Guia de entrevista con experto:\n1. Background research: lo que YA se sabe (no perder tiempo preguntando lo googleable)\n2. Objetivo: que 3 cosas NECESITO saber que solo este experto puede decirme\n3. Preguntas de apertura: generar confianza (2-3 min)\n4. Preguntas core: las 5-7 que importan (abiertas, no dirigidas)\n5. Preguntas de sondeo: para profundizar en respuestas clave\n6. Pregunta de cierre: que no le pregunte que deberia haberle preguntado?\n7. Template de notas: como capturar durante la entrevista""",
    "Metodo:\n- Funnel approach: de lo amplio a lo especifico\n- Open questions: el experto habla, tu escuchas\n- Laddering: por que > como > ejemplo concreto\n- Silence is a question: dejar espacio para que piense",
    "Formato: guia de entrevista + background brief + template de notas.\nTono: preparado, profesional.\nAudiencia: quien va a hacer la entrevista.\nAccion: agendar la entrevista con esta guia lista.",
    ["El background research esta hecho (no se pregunta lo googleable)", "Las 5-7 preguntas core son abiertas y no dirigidas", "Las preguntas de sondeo profundizan", "La pregunta de cierre captura lo imprevisto"],
    [{'name': 'EXPERTO', 'desc': 'Nombre y perfil del experto a entrevistar'}, {'name': 'TEMA', 'desc': 'Tema de la entrevista'}, {'name': 'OBJETIVO', 'desc': 'Que necesitas saber que solo este experto puede decirte'}]
)

qspec("investigacion_competitive_intelligence_continua",
    "Para disenar un sistema de inteligencia competitiva continua, no un ejercicio one-shot. La inteligencia que caduca no es inteligencia — es historia.",
    "Director de Inteligencia Competitiva con certificacion SCIP y experiencia en programas de CI continua para empresas multinacionales.",
    """Sistema de CI continua:\n1. Competidores a monitorear: directos + indirectos + potenciales\n2. Dimensiones de monitoreo: producto, pricing, marketing, hiring, IP, partnerships\n3. Fuentes por competidor: website, redes, job boards, patents, press, earnings\n4. Cadencia: que monitorear diario / semanal / mensual / trimestral\n5. Dashboard de CI: indicadores clave por competidor\n6. Alertas: triggers que requieren accion inmediata\n7. Distribucion: quien recibe que informacion y cuando""",
    "Metodo:\n- SCIP CI cycle: plan > collect > analyze > disseminate\n- Early warning system: detectar movimientos antes que sean publicos\n- War gaming: simular que haria cada competidor\n- Intelligence products: different reports for different audiences",
    "Formato: sistema completo de CI + dashboard + cadencia.\nTono: estrategico-operativo.\nAudiencia: equipo de estrategia.\nAccion: activar el monitoreo con el competidor #1.",
    ["Los competidores cubren directos e indirectos", "Las dimensiones de monitoreo son exhaustivas", "La cadencia es realista y sostenible", "Las alertas tienen triggers concretos"],
    [{'name': 'EMPRESA', 'desc': 'Tu empresa'}, {'name': 'COMPETIDORES', 'desc': 'Competidores principales a monitorear'}, {'name': 'SECTOR', 'desc': 'Sector de operacion'}]
)

# ─── ESCRITURA (M5) — 25 prompts ───
qspec("escritura_brand_voice_document", "Para definir la voz de marca que hace que cada comunicacion sea reconocible, consistente y memorizable. Sin Brand Voice, cada pieza de contenido es de alguien diferente.", "Director Creativo y Estratega de Marca con experiencia en definicion de brand voice para marcas premium en LatAm y Europa.", """Brand Voice Document completo:\n1. Arquetipos de marca y personalidad (3 rasgos core)\n2. Espectro tonal: formal/informal, tecnico/accesible, serio/cercano\n3. Vocabulario: palabras que usamos vs palabras que evitamos\n4. Guias por formato (email, redes, presentaciones, web)\n5. 10 ejemplos antes/despues\n6. Anti-patterns: errores comunes a evitar""", "Metodo:\n- Arquetipos de Jung aplicados a marca\n- Tone-of-voice spectrum por contexto\n- Brand dictionary: terms to use / avoid / own\n- Real examples > abstract guidelines", "Formato: documento de referencia con secciones visuales. Tono: profesional con personalidad. Audiencia: cualquier persona que escriba en nombre de la marca. Accion: usar como referencia antes de cada pieza de comunicacion.", ["Los 3 rasgos de personalidad son claros y diferenciados", "El vocabulario tiene min. 20 palabras en usar/evitar", "Los 10 ejemplos antes/despues son concretos", "Las guias por formato cubren al menos 4 canales"], [{'name': 'MARCA', 'desc': 'Nombre de la marca'}, {'name': 'AUDIENCIA', 'desc': 'Audiencia principal'}, {'name': 'VALORES', 'desc': '3-5 valores fundamentales de la marca'}, {'name': 'REFERENCIAS', 'desc': 'Marcas cuyo tono admiras', 'opt': True}])

qspec("escritura_reescribir_profesional", "Para elevar un texto a nivel profesional/ejecutivo sin perder el mensaje original. La diferencia entre un borrador y un entregable es la edicion.", "Editor Ejecutivo Senior con experiencia en publicaciones de alto impacto (HBR, MIT Sloan, McKinsey Quarterly) y coaching de escritura para C-levels.", """Reescritura profesional:\n1. Preservar mensaje central intacto\n2. Eliminar redundancias y relleno\n3. Activar verbos pasivos > activos\n4. Mejorar estructura y flujo logico\n5. Elevar vocabulario sin sacrificar accesibilidad\n6. Presentar antes/despues de las 3 mejoras mas significativas""", "Metodo:\n- Read aloud test: si suena pesado, reescribir\n- One idea per paragraph: estructura clara\n- Strong verbs over adverbs\n- Cut 20%: si el texto mejora al cortar, cortarlo", "Formato: texto reescrito + lista de mejoras aplicadas. Tono: {{TONO}}. Audiencia: {{AUDIENCIA}}. Accion: usar la version reescrita directamente.", ["El mensaje central se preserva intacto", "El texto es min. 20% mas corto", "Los verbos pasivos fueron activados", "La version final no necesita edicion adicional"], [{'name': 'TEXTO', 'desc': 'Texto original a reescribir'}, {'name': 'TONO', 'desc': 'Tono deseado (ejecutivo, inspirador, tecnico)', 'opt': True}, {'name': 'AUDIENCIA', 'desc': 'Audiencia objetivo', 'opt': True}])

qspec("escritura_storytelling_datos", "Para convertir numeros en narrativas que muevan a la accion. Los datos sin historia son ignorados; las historias sin datos son ignoradas. La combinacion es irresistible.", "Data Storyteller Senior con experiencia en periodismo de datos, visualizacion narrativa y presentaciones ejecutivas basadas en evidencia para consultoria.", """Data storytelling:\n1. Identificar el insight principal que revelan los datos\n2. Crear arco narrativo: contexto > tension > resolucion\n3. Seleccionar las 3-5 cifras mas impactantes\n4. Disenar orden de revelacion para maximo impacto\n5. Sugerir formato visual por tipo de dato\n6. Conectar insight con call to action""", "Metodo:\n- Knaflic Storytelling with Data\n- Find the 'so what': que cambia este dato\n- Declutter: cada elemento visual debe ganarse su lugar\n- Guided attention: el ojo del lector sigue un camino deliberado", "Formato: narrativa + sugerencias de visualizacion + CTA. Tono: persuasivo con base en datos. Audiencia: {{AUDIENCIA}}. Accion: que la audiencia actue basada en la evidencia presentada.", ["El insight principal esta articulado en 1 oracion", "Las 3-5 cifras estan contextualizadas (no sueltas)", "El arco narrativo tiene tension y resolucion", "La conexion datos > accion es explicita"], [{'name': 'DATOS', 'desc': 'Datos o estadisticas a narrar'}, {'name': 'AUDIENCIA', 'desc': 'Audiencia objetivo'}, {'name': 'ACCION', 'desc': 'Accion que quieres que tome la audiencia'}])

qspec("escritura_email_alto_impacto", "Para escribir emails que se lean, se entiendan y generen la accion deseada en el primer envio. El 60% de emails profesionales no logran su objetivo porque estan mal escriturados.", "Comunicador Ejecutivo con experiencia en email writing para C-levels, negociaciones de alto impacto y comunicacion corporativa.", """Email de alto impacto:\n1. Subject line: maximo 7 palabras, accionable\n2. Primera linea: la conclusion o pedido (no contexto)\n3. Cuerpo: evidencia o contexto minimo necesario\n4. CTA: accion especifica, deadline, formato de respuesta esperado\n5. Version A (3 parrafos) y Version B (5 bullets)\n6. Timing recomendado de envio""", "Metodo:\n- Inverted pyramid: conclusion primero\n- One ask per email: un email, un pedido\n- Scannable formatting: bullets > parrafos densos\n- Subject line = mini-conclusion", "Formato: email listo para copiar/pegar + 2 variantes de subject line. Tono: {{TONO}}. Audiencia: {{DESTINATARIO}}. Accion: obtener la respuesta/accion deseada en 24-48h.", ["El subject line cabe en 7 palabras", "La primera linea contiene el pedido", "El CTA tiene accion + deadline + formato esperado", "El email no requiere scroll en mobile"], [{'name': 'OBJETIVO', 'desc': 'Que necesitas que pase despues de este email'}, {'name': 'DESTINATARIO', 'desc': 'Quien recibe el email y su perfil'}, {'name': 'CONTEXTO', 'desc': 'Contexto relevante para el email'}, {'name': 'TONO', 'desc': 'Tono (formal, cercano, urgente)', 'opt': True}])

qspec("escritura_linkedin_thought_leadership", "Para posicionarte como referente en tu campo a traves de contenido que genere engagement genuino y oportunidades profesionales. LinkedIn premia el valor, no la autopromocion.", "Estratega de LinkedIn y Personal Branding con experiencia en construccion de audiencia B2B (50K+ seguidores) y contenido viral profesional.", """Post LinkedIn thought leadership:\n1. Hook irresistible en primeras 2 lineas (scroll-stopper)\n2. Insight original basado en experiencia real\n3. Evidencia: ejemplo concreto, dato o historia\n4. Reflexion que invite a pensar diferente\n5. Cierre con pregunta que genere comentarios\n6. 3 variantes de hook + hashtags recomendados""", "Metodo:\n- Hook formula: pattern interrupt + curiosity gap\n- Insight > opinion: aportar perspectiva unica basada en experiencia\n- Engagement loop: el post invita a conversar, no a consumir\n- Algorithm awareness: estructura que maximiza dwell time", "Formato: post listo para publicar + 3 variantes de hook + hashtags. Tono: autentico, profesional sin ser corporativo. Audiencia: red profesional. Accion: publicar hoy.", ["El hook detiene el scroll (no es clickbait)", "El insight es original (no un lugar comun)", "La pregunta de cierre invita respuestas genuinas", "El post funciona sin imagenes"], [{'name': 'TEMA', 'desc': 'Tema o insight sobre el que quieres escribir'}, {'name': 'EXPERIENCIA', 'desc': 'Tu experiencia relevante con este tema'}])

qspec("escritura_secuencia_email_nurturing",
    "Para disenar una secuencia de emails que guie al prospecto desde interes inicial hasta conversion. El email nurturing bien disenado convierte a desconocidos en clientes sin llamadas en frio.",
    "Copywriter de Email Marketing con especializacion en secuencias de nurturing, psicologia de persuasion y conversion B2B/B2C.",
    """Secuencia de nurturing (5-7 emails):\n1. Journey del prospecto: awareness > consideration > decision\n2. Email por etapa con objetivo especifico\n3. Subject lines con >30% open rate potencial\n4. Body copy con framework de persuasion (PAS, AIDA, BAB)\n5. CTAs progresivos por email\n6. Timing recomendado entre emails\n7. Variantes A/B del email de conversion""",
    "Metodo:\n- PAS: Problem > Agitate > Solve\n- AIDA: Attention > Interest > Desire > Action\n- Reciprocity first: da valor antes de pedir\n- One CTA per email: claridad de accion",
    "Formato: 5-7 emails completos + timing + A/B del email de conversion.\nTono: {{TONO}}.\nAudiencia: {{AUDIENCIA}}.\nAccion: programar la secuencia en el ESP.",
    ["Cada email tiene objetivo y CTA claros", "Los subject lines son especificos y no genericos", "La progresion del journey es logica", "Las variantes A/B del email clave estan listas"],
    [{'name': 'PRODUCTO', 'desc': 'Producto o servicio que promueves'}, {'name': 'AUDIENCIA', 'desc': 'Perfil del prospecto ideal'}, {'name': 'OBJECION', 'desc': 'La objecion principal de la audiencia'}, {'name': 'TONO', 'desc': 'Tono (formal, cercano, experto)', 'opt': True}]
)

qspec("escritura_copy_landing_page",
    "Para escribir el copy de una landing page que convierta visitantes en leads o clientes. Cada seccion tiene un trabajo: el hero captura, el body convence, el CTA convierte.",
    "Conversion Copywriter con experiencia en landing pages de alto rendimiento (>10% conversion rate) para SaaS, educacion y servicios.",
    """Copy de Landing Page:\n1. Hero: headline + subheadline + CTA principal (above the fold)\n2. Pain points: 3-4 problemas que el visitante reconoce como propios\n3. Solucion: como tu producto/servicio resuelve cada pain point\n4. Social proof: testimonios, logos, numeros, casos\n5. Features > Benefits: que incluye y por que importa\n6. Objeciones: FAQ que anticipa y resuelve dudas\n7. CTA final: urgencia + claridad + bajo riesgo""",
    "Metodo:\n- AIDA: Attention (hero) > Interest (pain) > Desire (solution) > Action (CTA)\n- One page, one offer, one CTA\n- Specificity > generality: numeros concretos, no adjetivos vagos\n- Risk reversal: garantia, trial, cancela cuando quieras",
    "Formato: copy seccion por seccion listo para implementar.\nTono: persuasivo sin ser agresivo.\nAudiencia: {{AUDIENCIA}}.\nAccion: implementar el copy en la landing.",
    ["El headline comunica el beneficio principal en <10 palabras", "Los pain points son reconocibles por la audiencia", "El social proof es concreto (numeros, nombres)", "El CTA tiene claridad + urgencia + bajo riesgo"],
    [{'name': 'PRODUCTO', 'desc': 'Producto o servicio'}, {'name': 'AUDIENCIA', 'desc': 'Perfil del visitante ideal'}, {'name': 'PROPUESTA_VALOR', 'desc': 'Propuesta de valor principal'}]
)

qspec("escritura_caso_exito_cliente",
    "Para documentar un caso de exito que sirva como herramienta de ventas. Un buen caso de exito no es un testimonio — es una historia que el prospecto ve como espejo de su propia situacion.",
    "Storyteller Corporativo con experiencia en redaccion de case studies para empresas B2B de tecnologia y consultoria.",
    """Caso de exito:\n1. Headline con resultado cuantificable\n2. Perfil del cliente: empresa, sector, tamano, rol del contacto\n3. Desafio: que problema enfrentaba (con detalle)\n4. Solucion: que se hizo y por que esa solucion\n5. Implementacion: como se ejecuto (timeline)\n6. Resultados: metricas antes/despues (cuantificables)\n7. Quote del cliente (textual)\n8. Llamado a accion""",
    "Metodo:\n- Situation > Challenge > Solution > Results (SCSR)\n- Show, don't tell: metricas > adjetivos\n- Mirror effect: el prospecto debe verse reflejado\n- Permission: verificar con el cliente antes de publicar",
    "Formato: caso de exito de 1-2 paginas listo para ventas.\nTono: profesional, basado en resultados.\nAudiencia: prospectos similares al cliente del caso.\nAccion: usar en el proximo pitch de ventas.",
    ["El headline tiene resultado cuantificable", "El desafio es especifico (no generico)", "Los resultados tienen metricas antes/despues", "Incluye quote textual del cliente"],
    [{'name': 'CLIENTE', 'desc': 'Nombre o perfil del cliente'}, {'name': 'RESULTADO', 'desc': 'Principal resultado logrado'}, {'name': 'DETALLES', 'desc': 'Detalles del proyecto o engagement'}]
)

qspec("escritura_propuesta_comercial",
    "Para escribir una propuesta comercial que cierre. La propuesta no es un catalogo — es un documento de decision que le dice al cliente: entiendo tu problema, tengo la solucion, y esto es lo que sigue.",
    "Consultor de Desarrollo de Negocio con experiencia en redaccion de propuestas ganadoras para consultoria, tecnologia y servicios profesionales.",
    """Propuesta comercial:\n1. Resumen ejecutivo: problema, solucion, impacto en 1 pagina\n2. Entendimiento del problema: demostrar que entiendes su dolor\n3. Solucion propuesta: que, como, con quien\n4. Metodologia: fases, timeline, entregables por fase\n5. Equipo: quienes trabajaran y por que son los indicados\n6. Inversion: pricing con opciones (basico/estandar/premium)\n7. Proximos pasos: como arrancar (low-friction)""",
    "Metodo:\n- Lead with understanding: demostrar que entiendes antes de proponer\n- Value-based pricing: precio conectado a valor, no a costo\n- Options architecture: 3 opciones (el 80% elige la del medio)\n- Easy next step: que el paso siguiente sea simple",
    "Formato: propuesta de 5-10 paginas, profesional.\nTono: consultivo, no vendedor.\nAudiencia: decision-maker del cliente.\nAccion: cerrar el deal.",
    ["El resumen ejecutivo permite decidir sin leer mas", "El entendimiento del problema demuestra escucha", "Las opciones de pricing son claras y justificadas", "El proximo paso es de baja friccion"],
    [{'name': 'CLIENTE', 'desc': 'Empresa o persona a quien va la propuesta'}, {'name': 'PROBLEMA', 'desc': 'Problema principal del cliente'}, {'name': 'SOLUCION', 'desc': 'Tu solucion a alto nivel'}]
)

qspec("escritura_newsletter_engagement",
    "Para escribir newsletters que la gente abra, lea y espere con anticipacion. El 80% de newsletters se ignoran porque son listas de links. La tuya sera una experiencia.",
    "Editor de Newsletter con experiencia en newsletters de alto engagement (>40% open rate) para comunidades profesionales.",
    """Newsletter de alto engagement:\n1. Subject line: curiosidad + beneficio en <50 caracteres\n2. Intro hook: 2 lineas que enganchan (historia, dato, pregunta)\n3. Contenido principal: 1 tema profundo (no 10 superficiales)\n4. Formato scannable: bullets, bold, subheadings\n5. CTA: 1 accion clara al final\n6. Personal touch: voz humana, no corporativa""",
    "Metodo:\n- One big idea: cada newsletter sobre 1 tema, no 10\n- Value upfront: el valor esta en el email, no en links externos\n- Consistent format: el lector sabe que esperar\n- Reply trigger: invitar respuesta para crear comunidad",
    "Formato: newsletter lista para enviar.\nTono: personal, como si escribieras a un amigo inteligente.\nAudiencia: suscriptores de {{NEWSLETTER}}.\nAccion: enviar.",
    ["El subject line genera curiosidad genuina", "El contenido aporta valor sin requerir clicks", "El formato es scannable en 30 segundos", "El CTA es 1 y es claro"],
    [{'name': 'NEWSLETTER', 'desc': 'Nombre o tema de tu newsletter'}, {'name': 'AUDIENCIA', 'desc': 'Perfil de tu suscriptor'}, {'name': 'TEMA', 'desc': 'Tema de esta edicion'}]
)

qspec("escritura_presentacion_ejecutiva_script",
    "Para escribir el guion de una presentacion ejecutiva que persuada y mueva a la accion. El script no son las slides — es lo que DICES mientras las slides soportan visualmente.",
    "Coach de Presentaciones Ejecutivas con experiencia en preparacion de C-levels para boards, inversores y keynotes.",
    """Script de presentacion:\n1. Opening hook: historia, dato o pregunta que capture en 30 seg\n2. Problema: por que estamos aqui (tension)\n3. Solucion: tu propuesta (resolucion)\n4. Evidencia: datos que soportan cada afirmacion\n5. Call to action: que quieres que hagan\n6. Closing: frase memorable que resuene\n7. Notas por slide: que decir, cuanto tiempo, transicion""",
    "Metodo:\n- Duarte Resonate: what is > what could be > call to action\n- 10-20-30: max 10 slides, 20 min, font 30pt\n- Storytelling arc: setup > conflict > resolution\n- Practice rule: 1 hora de practica por 10 min de presentacion",
    "Formato: guion completo con notas por slide + timing.\nTono: ejecutivo, persuasivo.\nAudiencia: {{AUDIENCIA}}.\nAccion: presentar con confianza.",
    ["El opening hook funciona en 30 segundos", "Cada slide tiene nota de lo que decir", "El timing total cabe en el tiempo asignado", "El CTA es 1 y es inequivoco"],
    [{'name': 'TEMA', 'desc': 'Tema de la presentacion'}, {'name': 'AUDIENCIA', 'desc': 'Audiencia (board, inversores, equipo, clientes)'}, {'name': 'DURACION', 'desc': 'Duracion disponible'}]
)

qspec("escritura_informe_ejecutivo",
    "Para producir un informe ejecutivo que un C-level pueda leer en 5 minutos y tomar decisiones. El informe ejecutivo no es un resumen — es una herramienta de decision.",
    "Redactor Ejecutivo Senior con experiencia en reportes para boards y comites directivos de empresas multinacionales.",
    """Informe ejecutivo:\n1. Headline: conclusion principal en 1 oracion\n2. Resumen ejecutivo: 5 bullets con lo esencial\n3. Contexto: por que este tema importa ahora\n4. Hallazgos: datos clave organizados por relevancia\n5. Opciones: 2-3 caminos posibles con pros/contras\n6. Recomendacion: que hacer y por que\n7. Proximos pasos: acciones, responsables, fechas""",
    "Metodo:\n- Piramide de Minto: conclusion primero\n- Bullet-first: cada seccion empieza con lo clave\n- Data-backed: cada afirmacion con evidencia\n- Decision-ready: el lector puede decidir sin leer mas",
    "Formato: max 2 paginas. Tablas y bullets > parrafos.\nTono: ejecutivo, directo.\nAudiencia: C-level o comite directivo.\nAccion: tomar la decision recomendada.",
    ["La conclusion cabe en 1 oracion", "El resumen tiene max 5 bullets", "Las opciones tienen pros/contras cuantificados", "Los proximos pasos tienen responsable y fecha"],
    [{'name': 'TEMA', 'desc': 'Tema del informe'}, {'name': 'DATOS', 'desc': 'Datos o hallazgos principales'}, {'name': 'AUDIENCIA', 'desc': 'Quien lee este informe'}]
)

qspec("escritura_comunicado_interno",
    "Para redactar un comunicado interno que sea leido, entendido y actuado. El 60% de comunicados internos se ignoran porque no respetan el tiempo del lector.",
    "Directora de Comunicacion Interna con experiencia en change management y comunicacion corporativa para empresas de 500+ empleados.",
    """Comunicado interno:\n1. Subject: accion requerida + tema en <10 palabras\n2. TL;DR: que cambia y que debo hacer en 2 lineas\n3. Contexto: por que se toma esta decision\n4. Que cambia: antes > despues (tabla)\n5. Que debo hacer: acciones concretas por audiencia\n6. Timeline: cuando empieza, cuando completo\n7. Soporte: a quien preguntar si tengo dudas""",
    "Metodo:\n- TL;DR first: respetar el tiempo del lector\n- Before/after table: visualizar el cambio\n- Audience-specific actions: no todos deben hacer lo mismo\n- FAQ preemptive: anticipar las 5 preguntas mas comunes",
    "Formato: comunicado listo para enviar. Max 1 pagina.\nTono: claro, respetuoso, sin corporate-speak.\nAudiencia: equipo o empresa completa.\nAccion: que el 80% actue sin necesidad de reunion explicativa.",
    ["El TL;DR cabe en 2 lineas", "La tabla antes/despues es clara", "Las acciones son especificas por audiencia", "Incluye a quien preguntar para dudas"],
    [{'name': 'CAMBIO', 'desc': 'Que esta cambiando'}, {'name': 'AUDIENCIA', 'desc': 'Quien recibe el comunicado'}, {'name': 'TIMELINE', 'desc': 'Cuando entra en vigor'}]
)

qspec("escritura_articulo_blog_seo",
    "Para escribir un articulo de blog que rankee en Google Y sea valioso para el lector. SEO sin valor es spam. Valor sin SEO es invisible.",
    "Content Strategist y SEO Writer con experiencia en contenido que rankea top 3 en nichos competitivos.",
    """Articulo de blog SEO:\n1. Keyword research: keyword principal + 5 keywords secundarias\n2. Title: keyword + benefit en <60 caracteres\n3. Meta description: hook + keyword en <160 caracteres\n4. H2/H3 structure: outline con keywords naturalmente integradas\n5. Intro: hook + promesa + credibilidad (100 palabras)\n6. Body: contenido sustancial por seccion (no relleno)\n7. CTA: que hacer despues de leer\n8. Internal/external links: min. 3 + 2""",
    "Metodo:\n- Keyword-first outline: la estructura sigue las busquedas\n- E-E-A-T: Experience, Expertise, Authority, Trust\n- Skyscraper: mejor que todo lo que ya esta rankeando\n- Reader-first: escribe para personas, optimiza para Google",
    "Formato: articulo listo para publicar + metadata SEO.\nTono: experto accesible.\nAudiencia: personas buscando {{KEYWORD}}.\nAccion: publicar y monitorear posicionamiento.",
    ["El keyword principal esta en titulo, H2 y primeras 100 palabras", "El contenido es sustancialmente mejor que los top 3 actuales", "La estructura de H2/H3 es logica y scannable", "Los links internos y externos estan incluidos"],
    [{'name': 'KEYWORD', 'desc': 'Keyword principal objetivo'}, {'name': 'AUDIENCIA', 'desc': 'Perfil del lector'}, {'name': 'LONGITUD', 'desc': 'Longitud objetivo (1500, 2500, 4000 palabras)', 'opt': True}]
)

qspec("escritura_speech_motivacional",
    "Para escribir un discurso que inspire accion. Un buen speech no informa — transforma. El publico debe irse diferente de como llego.",
    "Speechwriter con experiencia en redaccion de discursos para CEOs, candidatos politicos y speakers de TEDx.",
    """Speech motivacional:\n1. Opening: historia personal que conecte emocionalmente (60 seg)\n2. Problema compartido: algo que la audiencia reconoce como propio\n3. Turning point: el momento de cambio (tu experiencia o caso)\n4. Framework: el modelo o principio que cambia todo\n5. Evidencia: 2-3 ejemplos que demuestren que funciona\n6. Call to action: 1 cosa que pueden hacer HOY\n7. Closing: frase que resuene y se recuerde""",
    "Metodo:\n- Hero's journey: ordinary world > challenge > transformation > return\n- Vulnerability: la autenticidad conecta mas que la perfeccion\n- Rule of 3: 3 ejemplos, 3 puntos, 3 acciones\n- Callback: cerrar con referencia al opening (full circle)",
    "Formato: guion completo con timing por seccion.\nTono: autentico, vulnerable, inspirador.\nAudiencia: {{AUDIENCIA}}.\nAccion: que el publico haga 1 cosa diferente manana.",
    ["El opening es una historia personal (no una estadistica)", "El problema compartido es universal para la audiencia", "El CTA es 1 y es ejecutable manana", "El closing referencia el opening (full circle)"],
    [{'name': 'TEMA', 'desc': 'Tema o mensaje central'}, {'name': 'AUDIENCIA', 'desc': 'Audiencia del discurso'}, {'name': 'DURACION', 'desc': 'Duracion (5, 10, 15, 20 min)'}]
)

qspec("escritura_white_paper_autoridad",
    "Para producir un white paper que posicione tu organizacion como autoridad en un tema. El white paper no vende — educa. Y al educar, genera confianza que se convierte en negocio.",
    "Content Strategist Senior con experiencia en white papers B2B para empresas de tecnologia, consultoria y servicios financieros.",
    """White Paper:\n1. Titulo: beneficio + tema especifico\n2. Resumen ejecutivo: problema, hallazgos, recomendacion (1 pag)\n3. Introduccion: por que este tema importa ahora\n4. Problema: diagnostico profundo basado en datos\n5. Solucion/Framework: tu perspectiva unica (aqui esta la autoridad)\n6. Evidencia: casos, datos, investigacion\n7. Recomendaciones: pasos accionables\n8. Sobre nosotros: 1 parrafo, no un brochure""",
    "Metodo:\n- Educate, don't sell: el 90% es valor, el 10% es posicionamiento\n- Original research > compiled research: datos propios pesan mas\n- Framework propio: nombra tu metodologia (esto genera autoridad)\n- Gate it: el white paper es el incentivo para capturar leads",
    "Formato: white paper de 8-15 paginas, disenado profesionalmente.\nTono: autoritativo, educativo.\nAudiencia: decision-makers y early adopters del sector.\nAccion: descargar genera lead, leer genera confianza.",
    ["El framework/perspectiva es genuinamente unico", "Los datos y evidencia son solidos", "El tono es educativo, no comercial", "El call to action es sutil y de valor"],
    [{'name': 'TEMA', 'desc': 'Tema del white paper'}, {'name': 'FRAMEWORK', 'desc': 'Tu framework o perspectiva unica', 'opt': True}, {'name': 'SECTOR', 'desc': 'Sector de tu audiencia'}]
)

qspec("escritura_thread_twitter_viral",
    "Para escribir un thread de Twitter/X que genere alcance y engagement. Un buen thread es un blog post condensado con la tension de una serie de TV.",
    "Growth Writer con experiencia en threads virales (100K+ impressions) y construccion de audiencia en Twitter/X.",
    """Thread viral:\n1. Tweet 1 (hook): promesa + curiosidad en <280 chars\n2. Tweet 2-3: contexto del problema (tension)\n3. Tweet 4-8: contenido principal (valor, frameworks, datos)\n4. Tweet 9-10: ejemplos o casos concretos\n5. Tweet 11: resumen de takeaways\n6. Tweet 12: CTA + retweet ask\n7. Alt hook: 2 variantes del tweet 1""",
    "Metodo:\n- Hook > Value > CTA: estructura de todo hilo\n- 1 idea per tweet: claridad maxima\n- Lists and frameworks: contenido que se guarda\n- Self-contained: cada tweet debe funcionar solo",
    "Formato: thread completo tweet por tweet + 2 hooks alternativos.\nTono: conversacional, valor-denso.\nAudiencia: profesionales de tu nicho.\nAccion: publicar en hora optima.",
    ["El hook genera curiosidad sin ser clickbait", "Cada tweet aporta valor standalone", "El contenido es framework/lista (guardable)", "El CTA es natural, no forzado"],
    [{'name': 'TEMA', 'desc': 'Tema del thread'}, {'name': 'INSIGHTS', 'desc': 'Insights o datos clave a incluir'}]
)

qspec("escritura_copy_producto_features",
    "Para transformar features tecnicas en beneficios que el cliente entienda y desee. El cliente no compra caracteristicas — compra transformaciones.",
    "Product Copywriter con experiencia en SaaS copywriting, product marketing y conversion de features a benefits.",
    """Feature-to-Benefit Copy:\n1. Lista de features del producto\n2. Para cada feature: 'So what?' test (por que le importa al cliente)\n3. Beneficio: traduccion a lenguaje del cliente\n4. Headline por feature: beneficio en 1 linea\n5. Microcopy: descripcion de 2-3 lineas\n6. Social proof por feature (si existe)\n7. Jerarquia: features ordenadas por importancia para el cliente""",
    "Metodo:\n- Features tell, benefits sell\n- So what? test: repetir hasta llegar al beneficio real\n- Jobs-to-be-Done: que trabajo contrata el cliente\n- Voice of Customer: usar las palabras del cliente",
    "Formato: tabla Feature > Benefit > Headline > Microcopy.\nTono: claro, centrado en el cliente.\nAudiencia: potenciales compradores.\nAccion: actualizar la pagina de producto.",
    ["Cada feature tiene beneficio explicitado", "Los beneficios usan lenguaje del cliente, no tecnico", "La jerarquia refleja prioridades del cliente", "Los headlines son concretos, no genericos"],
    [{'name': 'PRODUCTO', 'desc': 'Producto o servicio'}, {'name': 'FEATURES', 'desc': 'Lista de features a traducir'}, {'name': 'CLIENTE', 'desc': 'Perfil del cliente ideal'}]
)

qspec("escritura_guion_podcast",
    "Para producir un guion de podcast que mantenga la atencion del oyente de principio a fin. El audio es implacable: si pierdes la atencion, el oyente se va y no vuelve.",
    "Producer de Podcasts con experiencia en produccion de podcasts top 10 en Spotify LatAm para marcas y creadores independientes.",
    """Guion de podcast:\n1. Cold open: 15 segundos que enganchan (dato, pregunta, historia)\n2. Intro: bienvenida + que va a aprender el oyente\n3. Segmento 1: setup del tema (contexto + por que importa)\n4. Segmento 2: contenido principal (insights, datos, historias)\n5. Segmento 3: aplicacion practica (que puede hacer el oyente)\n6. Cierre: resumen + CTA + preview del proximo episodio\n7. Timestamps para edicion""",
    "Metodo:\n- Open loop: crear curiosidad que se resuelve mas adelante\n- Variety: alternar entre datos, historias, y takeaways\n- Pacing: cambiar ritmo cada 5-7 minutos\n- Conversational: escribir como hablas, no como escribes",
    "Formato: guion con timestamps + notas de produccion.\nTono: conversacional, como si hablaras con un amigo inteligente.\nAudiencia: oyentes de {{PODCAST}}.\nAccion: grabar el episodio.",
    ["El cold open funciona en 15 segundos", "Los segmentos alternan entre informar y entretener", "El contenido tiene takeaways accionables", "Los timestamps permiten edicion precisa"],
    [{'name': 'PODCAST', 'desc': 'Nombre y tema del podcast'}, {'name': 'TEMA_EPISODIO', 'desc': 'Tema de este episodio'}, {'name': 'DURACION', 'desc': 'Duracion objetivo del episodio'}]
)

qspec("escritura_micro_contenido_redes",
    "Para producir piezas de micro-contenido (carruseles, stories, reels scripts) que generen engagement en redes sociales. En redes, menos es mas y rapido gana.",
    "Social Media Content Creator con experiencia en contenido viral para Instagram, TikTok y LinkedIn (10M+ reach mensual).",
    """Micro-contenido para redes:\n1. Formato optimo segun plataforma y mensaje\n2. Hook visual/textual en 1-2 segundos\n3. Contenido: 1 idea, no mas\n4. Estructura: problema > solucion > CTA (en <60 seg o <10 slides)\n5. Captions: con hook propio + hashtags estrategicos\n6. 3 variantes del mismo contenido para A/B""",
    "Metodo:\n- Platform-native: cada red tiene su lenguaje\n- Save > like: contenido que se guarda (listas, frameworks, tips)\n- Pattern interrupt: romper el scroll con algo inesperado\n- Repurpose: 1 idea grande = 5 piezas de micro-contenido",
    "Formato: 3 piezas de micro-contenido listas para publicar.\nTono: nativo de la plataforma.\nAudiencia: seguidores de {{PERFIL}}.\nAccion: publicar la pieza #1 hoy.",
    ["El hook funciona en 2 segundos o menos", "Cada pieza tiene 1 sola idea clara", "El formato es nativo de la plataforma", "Las 3 variantes son genuinamente diferentes"],
    [{'name': 'PERFIL', 'desc': 'Tu perfil de redes y nicho'}, {'name': 'TEMA', 'desc': 'Tema del contenido'}, {'name': 'PLATAFORMA', 'desc': 'Plataforma destino (Instagram, TikTok, LinkedIn)'}]
)

qspec("escritura_resumen_libro_accionable",
    "Para producir un resumen de libro que no sea Wikipedia sino una herramienta de aplicacion. El resumen bueno te ahorra leer el libro Y te permite implementar las ideas.",
    "Book Reviewer y Knowledge Synthesizer con experiencia en resumenes ejecutivos de libros de negocio para C-levels.",
    """Resumen accionable de libro:\n1. Thesis: la idea central del libro en 1 oracion\n2. Framework: el modelo o metodologia del autor (visual)\n3. Top 5 ideas con explicacion (2-3 oraciones cada una)\n4. Quotes clave: las 3 frases mas poderosas del libro\n5. Critica: donde el libro falla o es debil\n6. Aplicacion: como aplico las 3 ideas principales a MI contexto\n7. Decision: leer el libro completo SI/NO y por que""",
    "Metodo:\n- Thesis-first: la gran idea antes que los detalles\n- Visual framework: si el autor tiene un modelo, visualizarlo\n- Actionable extraction: cada idea con 'esto significa que puedo...'\n- Honest critique: no todo libro merece 5 estrellas",
    "Formato: resumen de 2 paginas + framework visual + aplicacion personal.\nTono: analitico, personal.\nAudiencia: profesional que quiere el 80% del valor en 20% del tiempo.\nAccion: implementar la idea #1 esta semana.",
    ["La thesis cabe en 1 oracion", "El framework del autor esta visualizado", "La critica es honesta", "La aplicacion personal es concreta y accionable"],
    [{'name': 'LIBRO', 'desc': 'Titulo y autor del libro'}, {'name': 'CONTEXTO', 'desc': 'Tu contexto profesional para la aplicacion'}]
)

qspec("escritura_faq_completa_producto",
    "Para crear una FAQ que anticipe y resuelva el 80% de las dudas antes de que las pregunten. Una buena FAQ es ventas + soporte + educacion en un solo documento.",
    "UX Writer con experiencia en documentacion de producto, help centers y reduccion de tickets de soporte.",
    """FAQ completa:\n1. Categorias: pre-compra, uso, troubleshooting, facturacion, otros\n2. Top 20 preguntas reales (no inventadas)\n3. Respuesta por pregunta: directa, sin rodeos, con ejemplo si aplica\n4. Links a recursos adicionales donde aplique\n5. Formato scannable: la respuesta en 1 linea + expansion si se necesita\n6. Preguntas que llevan a conversion (CTA integrado)""",
    "Metodo:\n- Real questions: extraer de soporte, ventas, chat, reviews\n- Answer first: la respuesta en la primera oracion\n- Objection handling: las preguntas de pre-compra son objeciones disfrazadas\n- Living document: actualizar con cada pregunta nueva recurrente",
    "Formato: FAQ organizada por categorias, scannable.\nTono: claro, util, sin jerga.\nAudiencia: clientes actuales y potenciales.\nAccion: publicar y reducir tickets de soporte.",
    ["Las preguntas son reales (no genericas)", "Las respuestas son directas (primera oracion responde)", "Las categorias facilitan la navegacion", "Las preguntas de pre-compra tienen CTA sutil"],
    [{'name': 'PRODUCTO', 'desc': 'Producto o servicio'}, {'name': 'PREGUNTAS_COMUNES', 'desc': 'Preguntas frecuentes que ya recibes', 'opt': True}]
)

qspec("escritura_elevator_pitch",
    "Para condensar tu propuesta de valor en 30 segundos que generen interes genuino. El elevator pitch no cierra ventas — abre conversaciones.",
    "Coach de Comunicacion Ejecutiva con experiencia en pitch coaching para startups YCombinator y Techstars.",
    """Elevator Pitch:\n1. Hook: 1 oracion que genere curiosidad (dato, pregunta, afirmacion sorprendente)\n2. Problema: para quien y que dolor resuelves\n3. Solucion: que haces, en terminos simples\n4. Diferenciacion: por que tu y no otro\n5. Prueba: 1 dato o caso que demuestre que funciona\n6. CTA: que quieres que pase despues de este pitch\n7. 3 versiones: 15 seg, 30 seg, 60 seg""",
    "Metodo:\n- Problem > Solution > Proof > CTA\n- Jargon-free: si tu abuela no lo entiende, reescribir\n- Curiosity > comprehension: genera interes, no explicacion completa\n- Practice: el pitch natural requiere 50+ repeticiones",
    "Formato: 3 versiones (15/30/60 seg) listas para memorizar.\nTono: natural, seguro, no vendedor.\nAudiencia: inversores, clientes, networking.\nAccion: practicar 10 veces hoy.",
    ["Las 3 versiones tienen diferente profundidad pero mismo mensaje", "El hook genera curiosidad (no confusion)", "El lenguaje es libre de jerga", "El CTA es claro y de baja friccion"],
    [{'name': 'EMPRESA', 'desc': 'Tu empresa o proyecto'}, {'name': 'PROPUESTA', 'desc': 'Tu propuesta de valor'}, {'name': 'AUDIENCIA', 'desc': 'Audiencia principal del pitch'}]
)

qspec("escritura_contenido_onboarding",
    "Para escribir el contenido del onboarding de un cliente o empleado nuevo. Las primeras 48 horas determinan si alguien se queda comprometido o se pierde.",
    "Disenador de Experiencias de Onboarding con experiencia en customer success y employee onboarding para SaaS y empresas de servicios.",
    """Contenido de Onboarding:\n1. Welcome email: tono calido + que esperar + primer paso\n2. Quick start guide: del zero al primer resultado en <15 min\n3. Secuencia de emails dia 1, 3, 7, 14, 30\n4. FAQ de nuevos: las 10 preguntas que todos hacen al inicio\n5. Milestones: que logros deberia alcanzar en cada semana\n6. Escalation: que hacer si se atasca""",
    "Metodo:\n- Time to value: minimizar tiempo entre registro y primer resultado\n- Aha moment: disenar el camino hacia la primera experiencia de valor\n- Progressive disclosure: no abrumar con todo, revelar gradualmente\n- Check-in cadence: preguntar como va, no solo enviar contenido",
    "Formato: secuencia completa de contenido con emails + guia + FAQ.\nTono: calido, util, sin abrumar.\nAudiencia: nuevos clientes o empleados.\nAccion: implementar la secuencia.",
    ["El quick start lleva al primer resultado en <15 min", "La secuencia de emails tiene cadencia y proposito", "Los milestones son medibles por semana", "El path de escalation es claro"],
    [{'name': 'PRODUCTO', 'desc': 'Producto, servicio o empresa'}, {'name': 'AUDIENCIA', 'desc': 'Nuevos clientes o empleados'}, {'name': 'AHA_MOMENT', 'desc': 'Primer momento de valor para el nuevo usuario'}]
)

# ─── DATA (M6) — 22 prompts ───
qspec("data_analisis_exploratorio_dataset", "Para obtener una vision completa de un dataset antes de hacer analisis avanzado. El EDA revela la historia que los datos quieren contar.", "Data Analyst Senior con experiencia en analisis exploratorio, estadistica descriptiva y comunicacion de hallazgos para stakeholders no tecnicos.", """Analisis exploratorio completo:\n1. Auditoria de calidad: missing values, duplicados, tipos de datos\n2. Estadisticas descriptivas por variable\n3. Distribuciones y deteccion de outliers\n4. Correlaciones entre variables\n5. Top 5 insights con implicacion practica\n6. Recomendaciones de analisis profundo""", "Metodo:\n- Data quality assessment primero: garbage in = garbage out\n- Descriptive stats: media, mediana, std, percentiles\n- Visual exploration: histogramas, scatter, boxplots (descritos en texto)\n- So-what: cada hallazgo con implicacion de negocio", "Formato: reporte EDA con estadisticas, hallazgos y recomendaciones. Tono: analitico-accesible. Audiencia: equipo que tomara decisiones con estos datos. Accion: priorizar las lineas de analisis profundo sugeridas.", ["La calidad de datos esta auditada (nulls, duplicados, tipos)", "Las distribuciones de variables clave estan descritas", "Los 5 insights tienen implicacion practica", "Las recomendaciones de analisis profundo son accionables"], [{'name': 'DATASET', 'desc': 'Descripcion del dataset (columnas, filas, tipo)'}, {'name': 'PREGUNTA', 'desc': 'Pregunta de negocio a responder'}, {'name': 'HERRAMIENTA', 'desc': 'Herramienta preferida (Excel, Python, Code Interpreter)', 'opt': True}])

qspec("data_dashboard_metricas_disenar", "Para disenar un dashboard que cuente la historia correcta a la audiencia correcta. Un buen dashboard permite decidir en 30 segundos.", "Business Intelligence Analyst y Dashboard Designer con experiencia en diseno de dashboards ejecutivos para empresas Fortune 500.", """Dashboard de metricas:\n1. Definir 5-7 KPIs mas relevantes con formula y fuente\n2. Disenar layout con jerarquia visual clara (piramide)\n3. Seleccionar tipo de visualizacion optimo por metrica\n4. Definir frecuencia de actualizacion y ownership\n5. Configurar alertas y thresholds\n6. Wireframe del dashboard""", "Metodo:\n- Information hierarchy: lo mas importante arriba-izquierda\n- 5-second rule: el dashboard debe contar su historia en 5 seg\n- Chart selection: bar for comparison, line for trends, number for KPIs\n- No vanity metrics: cada KPI debe informar una decision", "Formato: wireframe + definicion de KPIs + guia de visualizacion. Tono: tecnico-practico. Audiencia: {{AUDIENCIA}}. Accion: implementar el dashboard en la herramienta elegida.", ["Los 5-7 KPIs tienen formula y fuente definidas", "El wireframe muestra jerarquia visual clara", "Cada tipo de grafico esta justificado", "Las alertas tienen thresholds concretos"], [{'name': 'PROCESO', 'desc': 'Proceso o area a medir'}, {'name': 'AUDIENCIA', 'desc': 'Quien consumira el dashboard'}, {'name': 'HERRAMIENTA', 'desc': 'Herramienta de BI disponible', 'opt': True}])

qspec("data_limpiar_transformar_datos", "Para convertir datos desordenados en datos listos para analisis. El 80% del trabajo de data science es limpieza. Hazlo bien una vez y automatiza para siempre.", "Data Engineer con experiencia en ETL, data wrangling y preparacion de datos para analytics y machine learning.", """Limpieza y transformacion:\n1. Diagnostico de calidad: nulls, formatos, duplicados, tipos incorrectos\n2. Plan de limpieza priorizado por impacto en el analisis\n3. Instrucciones/codigo de transformacion por problema\n4. Validacion post-limpieza: integridad, completitud, consistencia\n5. Documentacion de transformaciones aplicadas""", "Metodo:\n- Quality-first: no analizar datos sucios\n- Reproducible: cada transformacion documentada para repetir\n- Validation: contar registros antes y despues\n- Automate: si se repite, crear script", "Formato: guia paso a paso + codigo/formulas + validaciones.\nTono: tecnico-practico.\nAudiencia: analista que va a trabajar con estos datos.\nAccion: ejecutar la limpieza.", ["Los problemas de calidad estan diagnosticados", "Las transformaciones son reproducibles", "La validacion post-limpieza verifica integridad", "La documentacion permite repetir el proceso"], [{'name': 'DATOS', 'desc': 'Descripcion de los datos y sus problemas'}, {'name': 'FORMATO_DESTINO', 'desc': 'Formato deseado para el analisis'}])

qspec("data_kpi_framework_definir", "Para definir un framework de KPIs que mida lo que importa y no lo que es facil de medir. Las vanity metrics distraen; los KPIs correctos guian decisiones.", "Head of Analytics con experiencia en definicion de frameworks de metricas para startups y empresas en crecimiento.", """Framework de KPIs:\n1. Objetivo de negocio: que resultado buscamos\n2. North Star Metric: la metrica que mejor representa valor para el usuario\n3. Input metrics: que palancas mueven la North Star\n4. Health metrics: que NO debe empeorar mientras optimizamos\n5. Definicion por KPI: formula, fuente, frecuencia, owner, target\n6. Dashboard mockup: como visualizar los KPIs""", "Metodo:\n- North Star > vanity: 1 metrica que importa sobre todas\n- Input metrics: las palancas que podemos accionar\n- AARRR (pirate metrics): Acquisition, Activation, Retention, Revenue, Referral\n- Leading > lagging: medir lo que predice, no solo lo que ya paso", "Formato: framework + tabla de KPIs + mockup de dashboard.\nTono: estrategico-analitico.\nAudiencia: equipo de producto/estrategia.\nAccion: implementar el tracking de la North Star.", ["La North Star conecta con valor real para el usuario", "Los input metrics son accionables", "Cada KPI tiene formula, fuente y owner", "Las health metrics previenen optimizacion destructiva"], [{'name': 'NEGOCIO', 'desc': 'Tipo de negocio o producto'}, {'name': 'OBJETIVO', 'desc': 'Objetivo de negocio principal'}, {'name': 'HERRAMIENTA', 'desc': 'Herramienta de tracking disponible', 'opt': True}])

qspec("data_encuesta_disenar_analizar", "Para disenar una encuesta que produzca datos analizables y accionables, no opiniones vagas. El 90% de encuestas fallan porque las preguntas estan mal disenadas.", "Investigadora de Mercados con especializacion en diseno de encuestas y analisis cuantitativo (certificacion MRS).", """Encuesta completa:\n1. Objetivo: que decision depende de estos datos\n2. Poblacion y muestra: a quienes encuestar y cuantos\n3. Preguntas: max 15, cada una justificada por el objetivo\n4. Tipos de pregunta: escala, opcion multiple, abierta (mix optimo)\n5. Flujo logico: orden que minimiza sesgo\n6. Pre-test: 5 personas para validar comprension\n7. Plan de analisis: como vas a analizar ANTES de lanzar""", "Metodo:\n- Objective-first: la pregunta de investigacion guia todo\n- Double-barrel test: cada pregunta mide 1 sola cosa\n- Scale consistency: misma escala a lo largo de la encuesta\n- Leading question check: cero preguntas que sugieran la respuesta", "Formato: cuestionario listo + plan de analisis.\nTono: metodologico.\nAudiencia: equipo de investigacion.\nAccion: hacer pre-test con 5 personas.", ["Cada pregunta esta justificada por el objetivo", "No hay preguntas leading o double-barrel", "El plan de analisis esta definido ANTES del lanzamiento", "La muestra esta justificada"], [{'name': 'OBJETIVO', 'desc': 'Que decision depende de esta encuesta'}, {'name': 'POBLACION', 'desc': 'A quienes encuestar'}])

qspec("data_ab_test_disenar", "Para disenar un A/B test riguroso que produzca resultados confiables. Un A/B test mal disenado es peor que no testear — te da falsa confianza.", "Growth Data Scientist con experiencia en experimentacion y A/B testing para productos digitales (1000+ experimentos).", """A/B Test:\n1. Hipotesis: si cambio X, entonces Y mejora porque Z\n2. Metrica primaria: que mido exactamente\n3. Tamano de muestra: cuantos usuarios necesito (calculo de poder estadistico)\n4. Duracion: cuanto tiempo correr el test (min. 2 ciclos del negocio)\n5. Segmentacion: en que usuarios correr el test\n6. Guardrail metrics: que NO debe empeorar\n7. Decision criteria: a que p-value actuo""", "Metodo:\n- Hypothesis-first: no testear sin hipotesis explicita\n- Power analysis: calcular muestra ANTES de lanzar\n- One change at a time: aislar la variable\n- Novelty effect: esperar min. 2 semanas antes de concluir", "Formato: protocolo de A/B test completo.\nTono: cientifico-practico.\nAudiencia: equipo de producto/growth.\nAccion: lanzar el test.", ["La hipotesis es falsificable", "El tamano de muestra esta calculado", "La duracion minima esta justificada", "Los guardrail metrics estan definidos"], [{'name': 'CAMBIO', 'desc': 'Que quieres testear'}, {'name': 'METRICA', 'desc': 'Metrica principal'}, {'name': 'TRAFICO', 'desc': 'Trafico diario aproximado', 'opt': True}])

qspec("data_cohort_analysis", "Para entender el comportamiento de usuarios a lo largo del tiempo agrupandolos por cohorte. El promedio miente; las cohortes revelan la verdad.", "Product Analyst con experiencia en cohort analysis, retention curves y behavioral analytics para SaaS y marketplaces.", """Cohort Analysis:\n1. Definir cohorte: por que agrupar (fecha de registro, canal, plan)\n2. Metrica de seguimiento: retencion, revenue, actividad\n3. Tabla de cohortes: filas = cohortes, columnas = periodos\n4. Curvas de retencion/metrica por cohorte\n5. Comparacion: que cohortes son mejores y por que\n6. Insights: que explica las diferencias entre cohortes\n7. Acciones: como mejorar las cohortes futuras""", "Metodo:\n- Cohort > average: los promedios esconden tendencias\n- Retention curves: la forma de la curva cuenta la historia\n- Vintage analysis: cohortes mas recientes vs antiguas\n- Actionable segmentation: agrupar por variable que puedes influir", "Formato: tabla de cohortes + curvas + insights + acciones.\nTono: analitico.\nAudiencia: equipo de producto/growth.\nAccion: optimizar para mejorar la proxima cohorte.", ["La definicion de cohorte esta justificada", "La tabla cubre min. 6 periodos", "Las diferencias entre cohortes estan explicadas", "Las acciones son especificas y ejecutables"], [{'name': 'PRODUCTO', 'desc': 'Producto o servicio'}, {'name': 'METRICA', 'desc': 'Metrica principal (retencion, revenue, etc.)'}, {'name': 'DATOS', 'desc': 'Descripcion de los datos disponibles'}])

qspec("data_forecast_proyeccion", "Para producir proyecciones basadas en datos historicos con rangos de confianza. Proyectar no es adivinar — es cuantificar lo probable y lo posible.", "Analista de Forecasting con experiencia en modelos de proyeccion para finanzas, ventas y operaciones.", """Proyeccion/Forecast:\n1. Data historica: tendencia, estacionalidad, ciclos\n2. Metodo de proyeccion seleccionado con justificacion\n3. Escenario base: proyeccion central\n4. Escenario optimista y pesimista (rangos de confianza)\n5. Supuestos clave que afectan la proyeccion\n6. Sensibilidad: que pasa si los supuestos cambian\n7. Plan de actualizacion: cada cuanto recalibrar""", "Metodo:\n- Historical decomposition: tendencia + estacionalidad + ruido\n- Multiple scenarios: base + optimista + pesimista\n- Assumption transparency: cada supuesto explicito\n- Forecast ≠ target: la proyeccion describe, el target aspira", "Formato: proyeccion con 3 escenarios + supuestos + sensibilidad.\nTono: analitico, conservador.\nAudiencia: CFO o equipo de planificacion.\nAccion: usar el escenario base para presupuesto.", ["La data historica esta analizada (tendencia, estacionalidad)", "Los 3 escenarios son plausibles", "Los supuestos clave estan explicitos", "La sensibilidad muestra que supuestos importan mas"], [{'name': 'METRICA', 'desc': 'Que proyectar (ventas, usuarios, revenue, etc.)'}, {'name': 'DATOS_HISTORICOS', 'desc': 'Data historica disponible'}, {'name': 'HORIZONTE', 'desc': 'Horizonte de proyeccion'}])

qspec("data_regression_analysis_simple", "Para identificar relaciones entre variables y cuantificar su impacto. No es suficiente decir 'X afecta Y' — hay que decir 'X aumenta Y en Z por cada unidad'.", "Estadistica Aplicada con experiencia en analisis de regresion para decisiones de negocio en marketing, pricing y operaciones.", """Analisis de regresion:\n1. Variable dependiente (Y): que quiero explicar/predecir\n2. Variables independientes (X): que factores la afectan\n3. Verificacion de supuestos: linealidad, normalidad, homocedasticidad\n4. Modelo: coeficientes, R², significancia\n5. Interpretacion: en lenguaje de negocio, no estadistico\n6. Limitaciones: que NO puede concluir este analisis\n7. Recomendaciones basadas en los hallazgos""", "Metodo:\n- Correlation ≠ causation: siempre disclaimer\n- Practical significance > statistical significance\n- Residual analysis: el modelo captura la senyal, no el ruido\n- Business interpretation: cada coeficiente en terminos de impacto", "Formato: modelo + interpretacion en lenguaje de negocio + limitaciones.\nTono: tecnico-accesible.\nAudiencia: decision-maker no-estadistico.\nAccion: actuar sobre la variable de mayor impacto.", ["La variable dependiente esta justificada", "Los supuestos estan verificados", "La interpretacion esta en lenguaje de negocio", "Las limitaciones son honestas"], [{'name': 'PREGUNTA', 'desc': 'Que quieres explicar o predecir'}, {'name': 'VARIABLES', 'desc': 'Variables disponibles'}, {'name': 'DATOS', 'desc': 'Descripcion del dataset'}])

qspec("data_sql_query_compleja", "Para construir queries SQL complejas que extraigan exactamente la informacion que necesitas. SQL es el lenguaje universal de los datos — dominarlo es superpoder.", "Data Analyst Senior con experiencia en SQL avanzado (window functions, CTEs, subqueries) para bases de datos de produccion.", """SQL Query compleja:\n1. Pregunta de negocio en lenguaje natural\n2. Identificar tablas y relaciones necesarias\n3. Construir query paso a paso (CTE approach)\n4. Optimizacion: indexes, partitions, performance\n5. Validacion: query de verificacion para confirmar resultados\n6. Documentacion: comentarios inline explicando la logica""", "Metodo:\n- CTE-first: construir por bloques, no en 1 query monolitica\n- Test incrementally: cada CTE verificado antes de agregar el siguiente\n- Explain plan: verificar que el query es eficiente\n- Business validation: el resultado tiene sentido para el negocio?", "Formato: SQL query completa + documentacion + query de verificacion.\nTono: tecnico.\nAudiencia: data analyst o developer.\nAccion: ejecutar la query.", ["La query esta construida con CTEs legibles", "Cada CTE tiene comentario explicativo", "La query de verificacion confirma resultados", "La performance esta considerada"], [{'name': 'PREGUNTA', 'desc': 'Pregunta de negocio a responder'}, {'name': 'TABLAS', 'desc': 'Tablas disponibles y su estructura'}, {'name': 'BASE_DATOS', 'desc': 'Tipo de base de datos (PostgreSQL, MySQL, BigQuery)', 'opt': True}])

qspec("data_excel_modelo_financiero", "Para construir un modelo financiero en Excel que sea auditable, flexible y confiable. Un buen modelo financiero es una maquina de escenarios, no una hoja llena de numeros.", "Analista Financiero Senior con certificacion CFA Level II y experiencia en financial modeling para valuaciones, proyecciones y business cases.", """Modelo financiero en Excel:\n1. Estructura: inputs (azul) / calculos (negro) / outputs (verde)\n2. Supuestos clave en una hoja separada (facil de modificar)\n3. Estado de resultados proyectado (3-5 anos)\n4. Flujo de caja proyectado\n5. Analisis de sensibilidad (2 variables)\n6. Escenarios: base, optimista, pesimista\n7. Dashboard resumen con KPIs clave""", "Metodo:\n- Color coding: inputs azul, formulas negro, outputs verde\n- One formula per column: no formulas diferentes en la misma fila\n- No hardcoded numbers in formulas: todo referencia a inputs\n- Circular reference: evitar siempre", "Formato: especificacion completa del modelo + instrucciones de construccion.\nTono: tecnico-financiero.\nAudiencia: analista que va a construir el modelo.\nAccion: construir la estructura base del modelo.", ["La estructura inputs/calculos/outputs es clara", "Los supuestos estan centralizados", "El analisis de sensibilidad cubre las variables clave", "Los 3 escenarios son plausibles"], [{'name': 'NEGOCIO', 'desc': 'Tipo de negocio o proyecto'}, {'name': 'HORIZONTE', 'desc': 'Horizonte de proyeccion (3, 5, 10 anos)'}, {'name': 'METRICAS', 'desc': 'Metricas financieras clave', 'opt': True}])

qspec("data_customer_segmentation", "Para segmentar clientes por comportamiento real, no por suposiciones. Los segmentos buenos son accionables — cada uno recibe una estrategia diferente.", "Customer Analytics Manager con experiencia en segmentacion comportamental para e-commerce, SaaS y servicios financieros.", """Segmentacion de clientes:\n1. Variables de segmentacion: RFM (Recency, Frequency, Monetary) u otras\n2. Numero optimo de segmentos (3-5 manejables)\n3. Perfil por segmento: caracteristicas, tamano, valor\n4. Nombre descriptivo por segmento (memorable)\n5. Estrategia diferenciada por segmento\n6. KPIs por segmento\n7. Plan de implementacion""", "Metodo:\n- RFM analysis: Recency × Frequency × Monetary\n- Behavioral > demographic: lo que hacen importa mas que quienes son\n- Actionable segments: si no puedes actuar diferente por segmento, no sirve\n- 80/20: el 20% de clientes genera el 80% del valor", "Formato: perfiles de segmento + estrategia por segmento + KPIs.\nTono: analitico-estrategico.\nAudiencia: equipo de marketing/ventas.\nAccion: lanzar campana diferenciada por segmento.", ["Los segmentos son mutuamente excluyentes", "Cada segmento tiene perfil y tamano", "La estrategia es diferente por segmento (no generica)", "Los KPIs permiten medir exito por segmento"], [{'name': 'CLIENTES', 'desc': 'Tipo de clientes y datos disponibles'}, {'name': 'VARIABLES', 'desc': 'Variables de segmentacion disponibles'}, {'name': 'OBJETIVO', 'desc': 'Para que segmentar (retencion, upsell, adquisicion)'}])

qspec("data_roi_calculo_proyecto", "Para calcular el ROI de un proyecto o inversion con rigor financiero. Sin ROI cuantificado, toda inversion es un acto de fe.", "Analista de ROI con experiencia en business case development, analisis de inversiones y cuantificacion de beneficios intangibles.", """Calculo de ROI:\n1. Inversion total: costos directos + indirectos + oportunidad\n2. Beneficios: tangibles (ahorro, revenue) + intangibles (cuantificados)\n3. Timeline: cuando se materializan costos y beneficios\n4. ROI = (Beneficio Neto / Inversion) × 100\n5. Payback period: cuando se recupera la inversion\n6. NPV y TIR si aplica\n7. Escenarios: conservador, probable, optimista""", "Metodo:\n- Total Cost of Ownership: no solo el precio, sino todo el costo\n- Benefit quantification: traducir intangibles a numeros\n- Time value of money: descuento para horizontes >1 ano\n- Conservative bias: mejor sorprenderse positivamente", "Formato: modelo de ROI con 3 escenarios + payback + resumen ejecutivo.\nTono: financiero, conservador.\nAudiencia: decision-maker de inversion.\nAccion: aprobar o rechazar la inversion.", ["La inversion incluye costos ocultos", "Los beneficios intangibles estan cuantificados", "Los 3 escenarios son realistas", "El payback period esta calculado"], [{'name': 'PROYECTO', 'desc': 'Proyecto o inversion a evaluar'}, {'name': 'INVERSION', 'desc': 'Monto de inversion estimado'}, {'name': 'HORIZONTE', 'desc': 'Horizonte de evaluacion'}])

qspec("data_funnel_conversion_analisis", "Para diagnosticar donde se pierden usuarios/clientes en el funnel de conversion. Cada punto de caida es dinero que se va. Encontrar el leak mas grande = quick win mas valioso.", "Growth Analyst con experiencia en funnel optimization para SaaS, e-commerce y lead generation.", """Funnel Analysis:\n1. Definir etapas del funnel: awareness > consideration > conversion > retention\n2. Volumen por etapa: cuantos entran y cuantos salen\n3. Tasa de conversion entre etapas\n4. Benchmark: como se compara con el sector\n5. Identificar el biggest leak: donde se pierde mas valor\n6. Hipotesis de por que ocurre cada drop\n7. Experimentos propuestos para cerrar cada leak""", "Metodo:\n- Funnel math: conversion rate entre cada par de etapas\n- Biggest leak first: optimizar donde mas se pierde\n- Qualitative + quantitative: los numeros dicen donde, la investigacion dice por que\n- Experiment velocity: testear rapido, iterar rapido", "Formato: funnel visual con metricas + diagnostico + plan de experimentos.\nTono: analitico-pragmatico.\nAudiencia: equipo de growth/marketing.\nAccion: lanzar experimento para cerrar el leak #1.", ["El funnel tiene metricas reales por etapa", "El biggest leak esta identificado y cuantificado", "Las hipotesis de drop son testables", "Los experimentos tienen metrica de exito definida"], [{'name': 'PRODUCTO', 'desc': 'Producto o servicio'}, {'name': 'ETAPAS', 'desc': 'Etapas del funnel actual'}, {'name': 'DATOS', 'desc': 'Datos de conversion disponibles'}])

qspec("data_pricing_analysis", "Para analizar y optimizar el pricing de un producto o servicio basado en datos. El precio es la palanca de mayor impacto en profitabilidad — 1% de mejora en precio = 11% en profits.", "Pricing Analyst con experiencia en price optimization, conjoint analysis y pricing strategy para SaaS y servicios.", """Analisis de pricing:\n1. Pricing actual: estructura, niveles, metricas de uso\n2. Competitive pricing: como cobran los competidores\n3. Value metric: por que unidad deberia cobrar (usuarios, uso, valor)\n4. Willingness to pay: que pagaria el cliente (Van Westendorp si hay datos)\n5. Price sensitivity: como cambia demanda con precio\n6. Recomendacion: precio optimo con justificacion\n7. Implementacion: como migrar sin perder clientes""", "Metodo:\n- Value-based pricing > cost-plus > competitive matching\n- Price metric: cobrar por la unidad que mide valor para el cliente\n- Van Westendorp PSM: too cheap / cheap / expensive / too expensive\n- Anchoring: el precio se percibe relativo a algo", "Formato: analisis completo con recomendacion + plan de implementacion.\nTono: estrategico-analitico.\nAudiencia: equipo de producto/revenue.\nAccion: implementar el ajuste de pricing.", ["El competitive analysis tiene min. 5 competidores", "La value metric esta justificada", "La recomendacion tiene impacto estimado en revenue", "El plan de migracion minimiza churn"], [{'name': 'PRODUCTO', 'desc': 'Producto o servicio'}, {'name': 'PRICING_ACTUAL', 'desc': 'Estructura de precios actual'}, {'name': 'COMPETIDORES', 'desc': 'Competidores y sus precios', 'opt': True}])

qspec("data_churn_diagnostico", "Para diagnosticar por que se van los clientes y disenar intervenciones para retenerlos. Retener 1 cliente cuesta 5x menos que adquirir uno nuevo.", "Customer Success Analyst con experiencia en churn prediction, retention programs y customer lifecycle management.", """Diagnostico de churn:\n1. Churn rate actual: como se calcula y como ha evolucionado\n2. Segmentacion de churn: quienes se van (perfil)\n3. Leading indicators: senales antes del churn (behavioral triggers)\n4. Root cause analysis: por que se van (data + entrevistas)\n5. Cohort analysis: churn por cohorte de ingreso\n6. Interventions: estrategias de retencion por trigger\n7. Impact model: cuanto revenue se recupera por punto de churn reducido""", "Metodo:\n- Churn segmentation: no todos se van por la misma razon\n- Leading indicators > lagging: detectar ANTES de que se vayan\n- Win-back vs prevention: prevenir es mejor que recuperar\n- Revenue impact: cada punto de churn en dolares", "Formato: diagnostico + leading indicators + interventions + impact model.\nTono: analitico, orientado a accion.\nAudiencia: equipo de customer success/producto.\nAccion: implementar la intervencion para el trigger #1.", ["El churn rate esta correctamente calculado", "Los leading indicators son detectables con datos actuales", "Las interventions son especificas por trigger", "El impact model cuantifica el valor de reducir churn"], [{'name': 'PRODUCTO', 'desc': 'Producto o servicio'}, {'name': 'CHURN_ACTUAL', 'desc': 'Churn rate actual y tendencia'}, {'name': 'DATOS', 'desc': 'Datos de comportamiento disponibles'}])

qspec("data_visualization_best_practice", "Para elegir y disenar la visualizacion correcta para cada tipo de dato. El grafico equivocado no solo no comunica — desinforma.", "Data Visualization Specialist con experiencia en diseno de visualizaciones para reportes ejecutivos y dashboards (principios de Edward Tufte).", """Guia de visualizacion:\n1. Tipo de dato: comparacion, tendencia, composicion, distribucion, relacion\n2. Grafico recomendado por tipo con justificacion\n3. Design principles: data-ink ratio, no 3D, no pie charts (casi nunca)\n4. Color strategy: accesible, consistente, con proposito\n5. Annotation: titulos, labels, call-outs que cuentan la historia\n6. Anti-patterns: graficos que mienten o confunden""", "Metodo:\n- Tufte principles: maximize data-ink ratio, minimize chartjunk\n- Choose chart by question: comparison > bar, trend > line, part-of-whole > stacked\n- Color with purpose: highlight, categorize, or show magnitude\n- Alt text: toda visualizacion debe funcionar en texto tambien", "Formato: guia de seleccion de graficos + design principles + anti-patterns.\nTono: tecnico-didactico.\nAudiencia: cualquier profesional que presenta datos.\nAccion: redisenar la proxima presentacion de datos con estos principios.", ["La guia cubre los 5 tipos principales de dato", "Los anti-patterns estan ilustrados con ejemplos", "La paleta de colores es accesible (color-blind friendly)", "Cada grafico tiene alternativa en texto"], [{'name': 'TIPO_DATOS', 'desc': 'Tipo de datos que manejas', 'opt': True}])

qspec("data_automated_report_disenar", "Para disenar un reporte automatizado que se genere solo y se envie a los stakeholders correctos. El reporte manual es trabajo que la maquina deberia hacer.", "BI Engineer con experiencia en automatizacion de reportes para equipos de operaciones, finanzas y marketing.", """Reporte automatizado:\n1. Contenido del reporte: metricas, comparaciones, alertas\n2. Fuente de datos: de donde vienen los numeros\n3. Frecuencia: diario/semanal/mensual\n4. Formato de salida: email, Slack, dashboard, PDF\n5. Logica de alertas: cuando el reporte debe gritar\n6. Distribucion: quien recibe que version\n7. Especificacion tecnica para implementar""", "Metodo:\n- Define content BEFORE automation: que vale la pena automatizar\n- Exception reporting: el reporte perfecto solo muestra lo anormal\n- Audience-specific: el CEO no ve lo mismo que el analista\n- Self-service: el reporte responde preguntas sin reunion adicional", "Formato: especificacion de reporte + logica de alertas + distribucion.\nTono: tecnico.\nAudiencia: BI engineer o data analyst.\nAccion: implementar la automatizacion.", ["El contenido esta justificado por decision que informa", "Las alertas tienen thresholds cuantificados", "La distribucion diferencia por audiencia", "La especificacion es implementable con las herramientas disponibles"], [{'name': 'REPORTE', 'desc': 'Que reporte quieres automatizar'}, {'name': 'FUENTE', 'desc': 'Fuente de datos'}, {'name': 'HERRAMIENTA', 'desc': 'Herramienta de BI/automatizacion', 'opt': True}])

# ─── VISUAL (M7) — 20 prompts ───
qspec("visual_brief_creativo_imagen_ia", "Para obtener resultados profesionales y consistentes al generar imagenes con IA. El prompt visual es direccion de arte — no es un pedido vago.", "Director de Arte y Prompt Engineer Visual con experiencia en produccion de contenido visual con IA para marcas premium.", """Brief creativo para imagen IA:\n1. Concepto visual en 1 oracion\n2. Composicion: encuadre, perspectiva, punto focal\n3. Estilo: fotorrealista, ilustracion, minimalista, etc.\n4. Iluminacion: natural, dramatica, flat, etc.\n5. Paleta de colores: primarios y acentos\n6. 3 prompts optimizados (DALL-E, Midjourney, Stable Diffusion)\n7. Negative prompts (que evitar)""", "Metodo:\n- Art direction antes de prompt: vision > palabras\n- Specificity kills ambiguity: cada adjetivo importa\n- Technical params: aspect ratio, style weight, quality\n- Iteration: el primer resultado es el punto de partida", "Formato: brief creativo + 3 prompts listos para copiar + negative prompts. Tono: tecnico-creativo. Audiencia: creador de contenido visual. Accion: generar la imagen inmediatamente.", ["El concepto visual esta articulado en 1 oracion", "Los 3 prompts son especificos para cada plataforma", "Incluye negative prompts", "La paleta de colores es concreta (hex codes si aplica)"], [{'name': 'CONCEPTO', 'desc': 'Que quieres visualizar'}, {'name': 'USO', 'desc': 'Uso final (web, redes, presentacion, impresion)'}, {'name': 'ESTILO', 'desc': 'Estilo visual preferido', 'opt': True}])

qspec("visual_guion_video_corto", "Para producir video corto con estructura narrativa profesional. El 80% del impacto de un video se define en el guion, no en la produccion.", "Guionista y Producer de Contenido Digital con experiencia en video corto para redes (100M+ views acumulados) y storytelling visual.", """Guion de video corto:\n1. Hook en primeros 3 segundos (sin introduccion)\n2. Arco narrativo con timestamps por seccion\n3. Script: narracion/dialogo palabra por palabra\n4. Direcciones de camara/visual por escena\n5. Sugerencias de musica/sonido\n6. CTA final""", "Metodo:\n- Hook-first: los primeros 3 segundos deciden todo\n- Platform-native: optimizar para el algoritmo de {{PLATAFORMA}}\n- Retention curve: picos de interes cada 15-30 segundos\n- CTA integration: el CTA es parte de la narrativa, no un add-on", "Formato: guion con timestamps, narracion, direcciones visuales, CTA. Tono: dinamico, adaptado a {{PLATAFORMA}}. Audiencia: espectador de {{PLATAFORMA}} con 3 segundos de atencion. Accion: producir el video esta semana.", ["El hook funciona en los primeros 3 segundos", "Cada seccion tiene timestamp y duracion", "Las direcciones visuales son ejecutables", "El CTA esta integrado en la narrativa"], [{'name': 'TEMA', 'desc': 'Tema o mensaje del video'}, {'name': 'PLATAFORMA', 'desc': 'Plataforma destino (YouTube, Instagram, TikTok, LinkedIn)'}, {'name': 'DURACION', 'desc': 'Duracion objetivo'}])

qspec("visual_infografia_ejecutiva", "Para transformar datos complejos en infografias visuales que comuniquen en 10 segundos lo que un reporte comunica en 10 minutos.", "Disenador de Informacion Visual con experiencia en infografias ejecutivas para reportes corporativos y presentaciones a boards.", """Infografia ejecutiva:\n1. Mensaje principal: que debe entender quien la ve en 10 seg\n2. Datos clave: max 5 cifras protagonistas\n3. Jerarquia visual: que se ve primero, segundo, tercero\n4. Paleta: max 3 colores + neutros\n5. Layout: estructura (horizontal/vertical, secciones)\n6. Spec para disenador o herramienta IA""", "Metodo:\n- Less is more: cada elemento visual debe ganarse su lugar\n- Data-ink ratio: maximizar datos, minimizar decoracion\n- Visual hierarchy: tamano > color > posicion\n- 10-second test: si no se entiende en 10 seg, redisenar", "Formato: spec de infografia con layout + contenido + paleta.\nTono: visual-ejecutivo.\nAudiencia: {{AUDIENCIA}}.\nAccion: producir la infografia.", ["El mensaje principal se entiende en 10 segundos", "Max 5 cifras protagonistas", "La jerarquia visual es clara", "La spec es ejecutable por un disenador"], [{'name': 'DATOS', 'desc': 'Datos a visualizar'}, {'name': 'AUDIENCIA', 'desc': 'Quien vera la infografia'}, {'name': 'FORMATO', 'desc': 'Formato (digital, impreso, redes)', 'opt': True}])

qspec("visual_presentacion_slide_deck", "Para disenar un slide deck donde cada slide comunica 1 idea con impacto visual. Las mejores presentaciones tienen pocas palabras y mucha intencion.", "Presentation Designer con experiencia en diseño de keynotes para conferencias TEDx, Fortune 500 y startups.", """Slide deck:\n1. Estructura narrativa: arco de la presentacion\n2. Slide-by-slide: titulo + contenido + nota del speaker\n3. Visual per slide: grafico, imagen, diagrama o statement\n4. Transiciones: como conectar una slide con la siguiente\n5. Master slide styles: title, content, data, quote, section\n6. Brand alignment: colores, fonts, tono visual""", "Metodo:\n- 1 idea per slide: si hay 2, dividir\n- Duarte method: what is > what could be > call to action\n- Visual > text: la slide soporta, el speaker cuenta\n- Takahashi method: numeros grandes, pocas palabras", "Formato: outline slide-by-slide + notas + visual specs.\nTono: visual, de impacto.\nAudiencia: {{AUDIENCIA}}.\nAccion: disenar las slides.", ["Cada slide tiene 1 sola idea", "Las notas del speaker estan completas", "La narrativa tiene arco (setup > tension > resolution)", "El diseño es consistente con la marca"], [{'name': 'TEMA', 'desc': 'Tema de la presentacion'}, {'name': 'AUDIENCIA', 'desc': 'Audiencia'}, {'name': 'SLIDES', 'desc': 'Numero aproximado de slides'}, {'name': 'DURACION', 'desc': 'Duracion de la presentacion', 'opt': True}])

qspec("visual_moodboard_direccion_arte", "Para crear un moodboard que alinee la vision creativa de un proyecto antes de producir. El moodboard es el contrato visual — previene 'no era lo que imaginaba'.", "Directora de Arte con experiencia en direccion visual para campanas publicitarias, branding y produccion de contenido digital.", """Moodboard:\n1. Concepto en 3 palabras (adjetivos que definen la estetica)\n2. Paleta de colores: 5 colores con hex codes y razon\n3. Tipografia: 2-3 fonts con jerarquia\n4. Imagenes de referencia: 8-12 con explicacion de que aporta cada una\n5. Texturas y patrones si aplican\n6. Anti-references: que NO queremos (tan importante como lo que si)\n7. Aplicacion: como se ve esto en los entregables reales""", "Metodo:\n- 3-word brief: condensar la vision en 3 adjetivos\n- Reference > description: mostrar es mejor que explicar\n- Anti-references: lo que no queremos clarifica tanto como lo que si\n- Consistency test: todas las referencias cuentan la misma historia", "Formato: moodboard descriptivo con paleta + fonts + referencias.\nTono: creativo-preciso.\nAudiencia: equipo creativo o disenador.\nAccion: usar como guia para toda la produccion visual.", ["El concepto de 3 palabras es claro y diferenciado", "La paleta tiene hex codes y justificacion", "Las anti-references estan incluidas", "La aplicacion muestra como se traduce a entregables"], [{'name': 'PROYECTO', 'desc': 'Proyecto o marca'}, {'name': 'CONTEXTO', 'desc': 'Tipo de proyecto (web, campana, branding, contenido)'}])

qspec("visual_diagrama_arquitectura", "Para crear diagramas de arquitectura claros que comuniquen sistemas complejos. Un buen diagrama arquitectonico ahorra 100 emails de explicacion.", "Arquitecto de Soluciones con experiencia en diagramas C4, UML y visualizacion de sistemas para stakeholders tecnicos y no tecnicos.", """Diagrama de arquitectura:\n1. Nivel de abstraccion: contexto (C1), contenedores (C2), componentes (C3)\n2. Elementos: sistemas, servicios, bases de datos, usuarios\n3. Relaciones: flujos de datos, dependencias, protocolos\n4. Leyenda: que significa cada forma y color\n5. Codigo Mermaid o PlantUML listo para renderizar\n6. Version simplificada para audiencia no-tecnica""", "Metodo:\n- C4 Model de Simon Brown: 4 niveles de zoom\n- Context first: el sistema en su entorno antes del detalle\n- 2 versions: tecnica y ejecutiva del mismo sistema\n- Living diagram: actualizar con cada cambio arquitectonico", "Formato: diagrama en Mermaid/PlantUML + version simplificada.\nTono: tecnico-claro.\nAudiencia: equipo tecnico + stakeholders.\nAccion: renderizar y compartir.", ["El nivel de abstraccion es apropiado para la audiencia", "La leyenda explica toda la notacion", "El codigo es renderizable sin edicion", "Existe version simplificada para no-tecnicos"], [{'name': 'SISTEMA', 'desc': 'Sistema a diagramar'}, {'name': 'NIVEL', 'desc': 'Nivel de detalle (contexto, contenedores, componentes)'}, {'name': 'AUDIENCIA', 'desc': 'Audiencia principal del diagrama'}])

qspec("visual_brand_kit_personal", "Para crear un kit visual de marca personal consistente que te haga reconocible en todos los canales. Tu marca personal es tu reputacion visual.", "Brand Designer con experiencia en identidad visual para emprendedores, speakers y profesionales independientes.", """Brand Kit Personal:\n1. Logo/marca visual: concepto, variantes, uso minimo\n2. Paleta de colores: primarios, secundarios, neutros (hex codes)\n3. Tipografia: 2 fonts con jerarquia y uso\n4. Estilo fotografico: que tipo de imagenes usar y cuales evitar\n5. Templates: social media, presentaciones, email signature\n6. Do's and Don'ts: reglas de uso de la marca""", "Metodo:\n- Consistency > creativity: la repeticion crea reconocimiento\n- Less is more: 2 colores + 2 fonts es suficiente\n- Cross-platform: el kit debe funcionar en todas las plataformas\n- Document everything: si no esta escrito, no se cumple", "Formato: brand kit completo con specs + templates.\nTono: creativo-profesional.\nAudiencia: tu mismo + cualquier disenador que trabaje contigo.\nAccion: aplicar la paleta y fonts a todos tus canales.", ["La paleta tiene max 5 colores con hex codes", "Las 2 fonts tienen jerarquia clara", "Los templates cubren al menos 3 canales", "Los Do's and Don'ts previenen errores comunes"], [{'name': 'NOMBRE', 'desc': 'Tu nombre o marca personal'}, {'name': 'VALORES', 'desc': '3 valores o atributos de tu marca'}, {'name': 'CANALES', 'desc': 'Canales donde tienes presencia', 'opt': True}])

qspec("visual_storyboard_campana", "Para planificar visualmente una campana de contenido o marketing antes de producir. El storyboard es el guion visual — previene produccion sin proposito.", "Creative Director con experiencia en planificacion de campanas multimedia para marcas de consumo y B2B.", """Storyboard de campana:\n1. Concepto creativo: la gran idea en 1 oracion\n2. Piezas: lista de contenido a producir por canal\n3. Storyboard por pieza: visual + copy + CTA\n4. Calendario de publicacion: que pieza, cuando, donde\n5. Consistencia: como todas las piezas cuentan la misma historia\n6. Metricas: que medir por pieza y por campana""", "Metodo:\n- Big idea first: una idea, multiples ejecuciones\n- Channel-native: adaptar, no copiar entre canales\n- Content calendar: la consistencia requiere calendario\n- Measure what matters: engagement > reach", "Formato: storyboard + calendario + metricas.\nTono: creativo-estrategico.\nAudiencia: equipo de marketing/contenido.\nAccion: producir la primera pieza.", ["El concepto creativo cabe en 1 oracion", "Cada pieza tiene visual + copy + CTA", "El calendario tiene fechas y canales", "Las metricas son especificas por pieza"], [{'name': 'CAMPANA', 'desc': 'Objetivo de la campana'}, {'name': 'CANALES', 'desc': 'Canales disponibles'}, {'name': 'DURACION', 'desc': 'Duracion de la campana'}])

qspec("visual_thumbnail_redes_sociales", "Para crear thumbnails que generen clicks sin ser clickbait. El thumbnail es el pitch visual — tienes 0.5 segundos para convencer.", "Creative Strategist de YouTube con experiencia en thumbnails de alto CTR (>10%) para canales educativos y de negocio.", """Thumbnail specs:\n1. Concepto: que emocion o curiosidad debe generar\n2. Composicion: regla de tercios, punto focal, espacio negativo\n3. Texto: max 4 palabras, legible en mobile (tamaño minimo)\n4. Expresion facial: si aplica, que emocion transmite\n5. Colores: contraste con el feed (analizar competencia)\n6. 3 variantes para A/B test\n7. Specs tecnicos: resolucion, formato, tamano""", "Metodo:\n- Contrast with feed: destacar entre lo que rodea\n- Emotion > information: el thumbnail vende la emocion, no el contenido\n- Mobile-first: si no se lee en mobile, no funciona\n- Test: siempre 3 variantes", "Formato: specs de 3 thumbnails con concepto + composicion + texto.\nTono: creativo-estrategico.\nAudiencia: creador de contenido.\nAccion: disenar o generar los 3 thumbnails.", ["El concepto genera curiosidad o emocion", "El texto tiene max 4 palabras legibles en mobile", "Las 3 variantes son genuinamente diferentes", "Los specs tecnicos estan completos"], [{'name': 'CONTENIDO', 'desc': 'Video o post para el que es el thumbnail'}, {'name': 'PLATAFORMA', 'desc': 'Plataforma (YouTube, Instagram, LinkedIn)'}])

qspec("visual_data_viz_interactiva", "Para disenar visualizaciones de datos interactivas que permitan al usuario explorar y descubrir insights por si mismo. Lo interactivo convierte al espectador en analista.", "Data Visualization Engineer con experiencia en D3.js, Plotly y dashboards interactivos para productos data-driven.", """Data Viz Interactiva:\n1. Datos: que dataset y que historia cuenta\n2. Tipo de interaccion: filtrar, zoom, hover, drill-down\n3. Vista default: que ve el usuario al llegar\n4. Vista exploratoria: que puede descubrir interactuando\n5. Responsive: como se adapta a mobile\n6. Spec tecnica: herramienta, formato, performance""", "Metodo:\n- Overview first, zoom and filter, details on demand (Shneiderman)\n- Default view = the story: la vista inicial cuenta la narrativa principal\n- Exploration = empowerment: la interaccion revela matices\n- Performance: max 2 seg de carga", "Formato: spec de visualizacion interactiva + wireframes.\nTono: tecnico-creativo.\nAudiencia: developer o disenador que implementara.\nAccion: implementar el prototipo.", ["La vista default cuenta la historia principal", "Las interacciones agregan valor (no solo decoracion)", "Es responsive", "La spec es implementable con la herramienta elegida"], [{'name': 'DATOS', 'desc': 'Dataset a visualizar'}, {'name': 'HISTORIA', 'desc': 'Que historia quieres que cuente'}, {'name': 'HERRAMIENTA', 'desc': 'Herramienta (D3, Plotly, Tableau, etc.)', 'opt': True}])

qspec("visual_contenido_educativo_visual", "Para crear contenido educativo visual que enseñe conceptos complejos de forma simple y memorable. Lo visual reduce el tiempo de aprendizaje en 60%.", "Disenador Instruccional Visual con experiencia en creacion de contenido educativo para universidades y programas corporativos.", """Contenido educativo visual:\n1. Concepto a ensenar: descomponer en 3-5 ideas clave\n2. Formato optimo por idea: diagrama, analogia visual, proceso, comparacion\n3. Progresion pedagogica: de lo simple a lo complejo\n4. Scaffolding visual: cada imagen construye sobre la anterior\n5. Evaluacion visual: quiz o ejercicio que valide comprension\n6. Adaptabilidad: como se usa en clase, en autoestudio, en redes""", "Metodo:\n- Dual coding: texto + visual = retencion 6x mayor\n- Chunking: max 5 ideas por pieza visual\n- Progressive disclosure: revelar complejidad gradualmente\n- Visual metaphor: anclar lo abstracto en lo concreto", "Formato: set de 3-5 piezas visuales educativas + guia de uso.\nTono: pedagogico-visual.\nAudiencia: estudiantes o profesionales aprendiendo {{TEMA}}.\nAccion: usar en la proxima sesion educativa.", ["Cada pieza cubre 1 idea clave", "La progresion va de simple a complejo", "Las metaforas visuales son claras y memorables", "El formato es adaptable a multiples contextos"], [{'name': 'TEMA', 'desc': 'Concepto o tema a ensenar'}, {'name': 'AUDIENCIA', 'desc': 'Nivel de la audiencia (principiante, intermedio, avanzado)'}])

qspec("visual_motion_graphics_spec", "Para especificar motion graphics que comuniquen datos, procesos o conceptos con animacion. Lo que se mueve captura atencion 5x mas que lo estatico.", "Motion Graphics Designer con experiencia en produccion de animaciones explicativas para SaaS, educacion y redes sociales.", """Motion Graphics Spec:\n1. Concepto: que se comunica y en cuanto tiempo\n2. Script: narracion o texto on-screen por escena\n3. Storyboard: keyframes principales (6-12 escenas)\n4. Estilo visual: flat, isometrico, 3D, mixed media\n5. Transiciones: como se conectan las escenas\n6. Audio: musica, SFX, voice-over (si aplica)\n7. Specs tecnicos: duracion, resolucion, formato de entrega""", "Metodo:\n- Story-first: la narrativa guia la animacion, no al reves\n- Keyframe clarity: si los keyframes no cuentan la historia solos, rehacer\n- Pacing: ritmo visual que mantiene atencion\n- Loop-friendly: para redes, disenar para autoplay", "Formato: spec completa con script + storyboard + estilo.\nTono: creativo-tecnico.\nAudiencia: motion designer o studio.\nAccion: producir la animacion.", ["El script es claro y temporizado", "Los keyframes cubren toda la narrativa", "El estilo visual esta definido con referencias", "Los specs tecnicos estan completos"], [{'name': 'MENSAJE', 'desc': 'Que quieres comunicar'}, {'name': 'DURACION', 'desc': 'Duracion objetivo'}, {'name': 'ESTILO', 'desc': 'Estilo visual preferido', 'opt': True}])

qspec("visual_ui_wireframe_spec", "Para especificar wireframes de interfaz de usuario que comuniquen estructura, flujo e interaccion sin ambiguedad. El wireframe es el plano del arquitecto digital.", "UX Designer Senior con experiencia en wireframing para aplicaciones web, mobile y SaaS (Figma, Balsamiq).", """Wireframe Spec:\n1. Pantallas clave: lista con proposito de cada una\n2. Layout por pantalla: estructura, componentes, jerarquia\n3. Flujo de usuario: como navega entre pantallas\n4. Interacciones: que pasa al hacer click/tap en cada elemento\n5. Estados: default, hover, active, error, empty, loading\n6. Responsive: como se adapta de desktop a mobile\n7. Anotaciones: notas para el developer""", "Metodo:\n- Structure before beauty: wireframe = estructura, no diseño visual\n- User flow first: el flujo guia las pantallas, no al reves\n- States coverage: cada componente en todos sus estados\n- Developer handoff: las anotaciones deben ser implementables", "Formato: wireframes descriptivos por pantalla + flujo + anotaciones.\nTono: tecnico-preciso.\nAudiencia: disenador UI o developer.\nAccion: implementar en Figma o codigo.", ["Cada pantalla tiene proposito claro", "El flujo de usuario es completo (sin dead ends)", "Los estados estan cubiertos (no solo el happy path)", "Las anotaciones son claras para el developer"], [{'name': 'PRODUCTO', 'desc': 'Producto o feature'}, {'name': 'PANTALLAS', 'desc': 'Pantallas clave a wireframear'}, {'name': 'PLATAFORMA', 'desc': 'Web, mobile, o ambos'}])

# ─── AGENTES (M8) — 25 prompts ───
qspec("agentes_disenar_custom_gpt", "Para crear un asistente de IA especializado que produzca resultados consistentes. Un Custom GPT bien disenado es un empleado que nunca duerme, nunca olvida y siempre sigue el proceso.", "Arquitecto de Agentes IA con experiencia en diseno de system prompts, Custom GPTs y Gemini Gems para operaciones empresariales.", """Custom GPT completo:\n1. Scope: que hace y que NO hace (boundaries explicitos)\n2. System prompt con personalidad, reglas y formato\n3. Formato de output esperado por tipo de interaccion\n4. 5 few-shot examples de interaccion ideal\n5. Edge cases y respuestas de fallback\n6. Plan de pruebas (10 queries de test)""", "Metodo:\n- Scope-first: definir boundaries antes de capabilities\n- Persona > prompt: la personalidad calibra todo lo demas\n- Few-shot > instruction: mostrar es mas potente que explicar\n- Edge case coverage: que pasa cuando el usuario se sale del scope", "Formato: system prompt listo para copiar + 5 examples + plan de pruebas. Tono: tecnico-practico. Audiencia: profesional que va a crear el GPT. Accion: crear el Custom GPT hoy.", ["El scope tiene boundaries claros (que SI y que NO)", "El system prompt tiene personalidad coherente", "Los 5 examples cubren el rango de uso tipico", "Los edge cases tienen respuestas de fallback"], [{'name': 'TAREA', 'desc': 'Tarea especifica que debe resolver el agente'}, {'name': 'AUDIENCIA', 'desc': 'Quien usara este agente'}, {'name': 'TONO', 'desc': 'Personalidad/tono del agente'}])

qspec("agentes_comite_operativo_artificial", "Para orquestar multiples agentes de IA coordinados que produzcan entregables de excelencia a traves de iteracion sistematica. Tu eres el Director; ellos son el Critico, el Editor, el Analista.", "Orquestador de Sistemas Multi-Agente con experiencia en diseno de workflows multi-agente, quality loops y escalamiento de operaciones con IA.", """Comite Operativo Artificial:\n1. Definicion de roles: nombre, responsabilidad, personalidad por agente\n2. Flujo de trabajo: creacion > critica > refinamiento > validacion\n3. System prompt por agente (listo para copiar)\n4. Rubrica de calidad compartida (criterios y scoring)\n5. Protocolo de convergencia: cuando se detiene el loop\n6. Plan de implementacion paso a paso""", "Metodo:\n- Separation of concerns: cada agente tiene UN rol\n- Adversarial collaboration: el critico genuinamente desafia\n- Quality gate: cada ronda debe mejorar el score o el loop se detiene\n- Convergence criteria: si el score no mejora en 2 rondas, entregar", "Formato: configuracion completa del comite con system prompts + flujo + rubrica. Tono: tecnico. Audiencia: profesional que va a implementar el sistema. Accion: configurar el primer agente hoy.", ["Cada agente tiene system prompt y rol claros", "El flujo de trabajo tiene 4+ etapas con gates", "La rubrica tiene criterios y scoring numerico", "El protocolo de convergencia evita loops infinitos"], [{'name': 'ENTREGABLE', 'desc': 'Tipo de entregable a producir'}, {'name': 'ESTANDAR', 'desc': 'Estandar de calidad (profesional, ejecutivo, publicacion)'}])

qspec("agentes_system_prompt_gem_nlm", "Para configurar la personalidad de un Gemini Gem o asistente NLM que responda de forma consistente y especializada.", "Disenador de Conversational AI con experiencia en configuracion de Gemini Gems, NotebookLM y sistemas conversacionales para empresas.", """System Prompt de Gem/NLM:\n1. Identidad: nombre, personalidad, tono de voz\n2. Scope: que hace, que NO hace (boundaries)\n3. Conocimiento: de que temas es experto\n4. Formato default de respuesta\n5. Reglas de interaccion: como saluda, como maneja lo que no sabe, como cierra\n6. 5 interacciones de ejemplo (few-shot)\n7. Triggers de escalacion: cuando pasar a un humano""", "Metodo:\n- Personality > rules: la personalidad calibra mejor que las reglas\n- Boundary clarity: lo que NO hace es tan importante como lo que hace\n- Few-shot > zero-shot: los ejemplos valen mas que las instrucciones\n- Failure gracefully: que hacer cuando no sabe", "Formato: system prompt listo para copiar + 5 examples.\nTono: tecnico-creativo.\nAudiencia: quien configura el asistente.\nAccion: crear el Gem hoy.", ["La identidad tiene personalidad diferenciada", "Los boundaries son explicitos", "Los 5 examples cubren casos tipicos", "La escalacion a humano esta definida"], [{'name': 'FUNCION', 'desc': 'Funcion principal del asistente'}, {'name': 'AUDIENCIA', 'desc': 'Quien interactuara con el asistente'}, {'name': 'PERSONALIDAD', 'desc': 'Tono y personalidad deseada'}])

qspec("agentes_chain_prompts_workflow", "Para disenar un flujo de prompts encadenados donde el output de uno es el input del siguiente. Chaining convierte tareas complejas en pipelines automatizables.", "Prompt Engineer Senior con experiencia en diseno de cadenas de prompts para automatizacion de workflows complejos.", """Chain de prompts:\n1. Tarea completa: que se logra al final del chain\n2. Descomposicion: subtareas en orden secuencial\n3. Prompt por subtarea: input, instruccion, output esperado\n4. Handoff: como el output de cada paso alimenta el siguiente\n5. Quality gates: donde validar antes de continuar\n6. Error handling: que hacer si un paso falla""", "Metodo:\n- Decompose > chain: dividir la tarea compleja en pasos simples\n- Clear handoffs: el output de cada paso es un input limpio para el siguiente\n- Gate-driven: no avanzar si un paso produce output subpar\n- Modular: cada prompt funciona solo Y en cadena", "Formato: diagrama de chain + prompt por paso + gates.\nTono: tecnico.\nAudiencia: prompt engineer o automation designer.\nAccion: implementar el chain.", ["Cada paso tiene input/output claros", "Los handoffs entre pasos son limpios", "Los quality gates previenen propagacion de errores", "El chain produce el resultado final esperado"], [{'name': 'TAREA', 'desc': 'Tarea completa a automatizar'}, {'name': 'HERRAMIENTA', 'desc': 'Herramienta IA para ejecutar (ChatGPT, Claude, Gemini)', 'opt': True}])

qspec("agentes_knowledge_base_privada", "Para disenar una knowledge base privada que funcione como cerebro externo consultable. Tu conocimiento capturado + IA = experto disponible 24/7.", "Arquitecto de Knowledge Management con experiencia en diseno de knowledge bases corporativas con RAG y sistemas de busqueda semantica.", """Knowledge Base Privada:\n1. Inventario de conocimiento: que fuentes capturar (docs, wikis, notas, procesos)\n2. Taxonomia: como organizar el conocimiento (categorias, tags)\n3. Formato de ingesta: como preparar documentos para la KB\n4. Protocolo de consulta: como preguntar y que esperar\n5. Actualizacion: cadencia y responsable de mantener actualizada\n6. Governance: quien puede agregar, editar, eliminar""", "Metodo:\n- RAG (Retrieval Augmented Generation): buscar antes de generar\n- Chunking strategy: tamano optimo de fragmentos para retrieval\n- Source attribution: cada respuesta cita su fuente\n- Freshness: conocimiento caduco es peor que no tener conocimiento", "Formato: spec de KB + taxonomia + protocolo de ingesta.\nTono: tecnico-practico.\nAudiencia: equipo que va a construir y usar la KB.\nAccion: crear la taxonomia e ingestar las primeras 10 fuentes.", ["La taxonomia cubre las areas de conocimiento criticas", "El formato de ingesta es claro y reproducible", "El protocolo de consulta produce respuestas con fuente", "La governance tiene roles claros"], [{'name': 'DOMINIO', 'desc': 'Area de conocimiento a capturar'}, {'name': 'FUENTES', 'desc': 'Tipos de fuentes disponibles'}, {'name': 'USUARIOS', 'desc': 'Quienes consultaran la KB'}])

qspec("agentes_evaluacion_asistente_qa", "Para evaluar la calidad de un asistente IA existente de forma sistematica. Sin QA, no sabes si tu GPT esta ayudando o ensenando mal.", "QA Specialist de IA Conversacional con experiencia en testing de chatbots, evaluacion de LLMs y diseno de rubrics de calidad.", """QA de Asistente IA:\n1. Test suite: 20 queries de test (tipicas + edge cases + adversariales)\n2. Rubrica de evaluacion: precision, completitud, tono, formato, safety\n3. Ejecucion: correr cada query y evaluar contra rubrica\n4. Scoring: score por criterio por query + score global\n5. Failure analysis: donde falla y por que\n6. Mejoras: recomendaciones al system prompt\n7. Regression plan: como re-testear despues de mejoras""", "Metodo:\n- Black box testing: evaluar outputs sin ver el system prompt\n- Edge case coverage: lo que el creador no penso\n- Adversarial testing: intentar que falle o se salga del scope\n- Regression: cada mejora puede romper algo que funcionaba", "Formato: test suite + resultados + mejoras recomendadas.\nTono: tecnico, riguroso.\nAudiencia: creador del asistente.\nAccion: implementar las 3 mejoras de mayor impacto.", ["La test suite tiene 20+ queries variadas", "La rubrica tiene min. 5 criterios con escala", "Los failures tienen root cause analysis", "Las mejoras son accionables en el system prompt"], [{'name': 'ASISTENTE', 'desc': 'Nombre o link del asistente a evaluar'}, {'name': 'SCOPE', 'desc': 'Que deberia hacer el asistente'}])

qspec("agentes_automatizar_proceso_recurrente", "Para convertir un proceso manual recurrente en un flujo asistido por IA. Cada tarea que repites mas de 3 veces es candidata a automatizacion con agentes.", "Automation Architect con experiencia en diseno de flujos de automatizacion con IA para procesos de negocio recurrentes.", """Automatizacion con agente:\n1. Proceso actual: pasos manuales, tiempos, frecuencia\n2. Candidatos de automatizacion: que pasos puede hacer un agente\n3. Diseno del agente: inputs, proceso, outputs, validaciones\n4. Human-in-the-loop: donde se necesita aprobacion humana\n5. Setup: como configurar el agente (prompt + herramienta)\n6. ROI: tiempo ahorrado × frecuencia × valor/hora""", "Metodo:\n- Map before automate: entender el proceso antes de automatizar\n- 80/20: automatizar el 80% que es repetitivo, mantener humano el 20% que es juicio\n- Start simple: automatizar 1 paso, validar, luego el siguiente\n- Measure: si no mides el ahorro, no sabes si funciona", "Formato: mapa de proceso + diseno de agente + ROI.\nTono: practico.\nAudiencia: profesional que ejecuta el proceso.\nAccion: configurar el agente para el paso #1.", ["El proceso actual esta mapeado con tiempos", "Los pasos automatizables estan justificados", "Los human-in-the-loop estan definidos", "El ROI esta cuantificado"], [{'name': 'PROCESO', 'desc': 'Proceso recurrente a automatizar'}, {'name': 'FRECUENCIA', 'desc': 'Con que frecuencia se ejecuta'}, {'name': 'HERRAMIENTAS', 'desc': 'Herramientas disponibles'}])

qspec("agentes_prompt_library_personal", "Para construir tu propia biblioteca de prompts personalizada — los que REALMENTE usas, organizados para acceso instantaneo.", "Prompt Librarian con experiencia en curaduria de bibliotecas de prompts para equipos de productividad y operaciones.", """Biblioteca personal de prompts:\n1. Inventario: que prompts usas regularmente (recolectar de historial)\n2. Clasificacion: por tipo (creacion, analisis, comunicacion, meta)\n3. Formato estandar: cada prompt con nombre, descripcion, parametros, ejemplo\n4. Naming convention: que permita busqueda rapida\n5. Storage: donde guardar (text expander, Notion, JSON, etc.)\n6. Mantenimiento: ritual mensual de actualizacion (agregar, mejorar, eliminar)""", "Metodo:\n- Start from history: tus mejores prompts ya estan en tu historial\n- Standardize: mismo formato para todos (facilita busqueda)\n- Parameterize: convertir prompts fijos en templates con {{variables}}\n- Prune: eliminar los que no usas hace 30 dias", "Formato: guia de creacion de biblioteca + template + naming convention.\nTono: practico.\nAudiencia: profesional que usa IA diariamente.\nAccion: recopilar los 10 prompts que mas usas.", ["Los prompts estan estandarizados en formato comun", "La naming convention es consistente y buscable", "El storage es accesible rapidamente (text expander ideal)", "El ritual de mantenimiento esta calendarizado"], [{'name': 'HERRAMIENTAS', 'desc': 'Herramientas IA que usas (ChatGPT, Claude, Gemini, etc.)'}, {'name': 'TEMAS', 'desc': 'Areas donde usas IA mas frecuentemente'}])

qspec("agentes_escalera_agentica_roadmap", "Para disenar tu roadmap personal en la Escalera Agentica: de usuario basico a disenador de sistemas. Cada nivel multiplica tu capacidad.", "Coach de Evolucion Agentica con experiencia en adopcion progresiva de IA para profesionales no-tecnicos.", """Escalera Agentica — Tu Roadmap:\n1. Diagnostico: en que nivel estas hoy (Asistente/Agente/Pristino/Ecosistema)\n2. Nivel 1 - Asistente: usar chat con prompts de alto rendimiento\n3. Nivel 2 - Agente: usar Custom GPTs y Gems pre-construidos\n4. Nivel 3 - Pristino: orquestar multiples agentes coordinados\n5. Nivel 4 - Ecosistema: construir tus propios agentes y sistemas\n6. Plan: que hacer en los proximos 30 dias para subir 1 nivel\n7. Metricas: como saber que subiste de nivel""", "Metodo:\n- Progressive mastery: dominar un nivel antes de subir\n- Use case driven: cada nivel se aprende resolviendo un problema real\n- Build on success: lo que funciona en un nivel se escala en el siguiente\n- Community: aprender con otros acelera la progresion", "Formato: diagnostico + roadmap de 30 dias + metricas.\nTono: pedagogico-motivador.\nAudiencia: profesional que quiere escalar su uso de IA.\nAccion: completar el diagnostico y empezar el plan de 30 dias.", ["El diagnostico es honesto (no auto-sobreestimacion)", "El plan de 30 dias tiene acciones concretas por semana", "Las metricas de nivel son medibles", "El roadmap es progresivo (no heroico)"], [{'name': 'NIVEL_ACTUAL', 'desc': 'Tu nivel actual de uso de IA'}, {'name': 'OBJETIVO', 'desc': 'Que quieres lograr con IA en los proximos 90 dias'}])

# ─── AUTOMATIZACION (M10) ───
qspec("automatizacion_workflow_nocode", "Para automatizar procesos manuales recurrentes sin escribir codigo. Cada hora automatizada es una hora liberada para trabajo de alto valor.", "Arquitecto de Automatizaciones No-Code con experiencia en Make, Zapier, n8n, Power Automate y diseno de workflows para equipos de 5-500 personas.", """Workflow automatizado:\n1. Mapeo del proceso manual paso a paso (as-is)\n2. Identificacion de trigger, acciones y condiciones\n3. Seleccion de plataforma de automatizacion optima con justificacion\n4. Diseno del flujo con manejo de errores\n5. Guia de implementacion paso a paso\n6. ROI estimado (horas/semana ahorradas x valor/hora)""", "Metodo:\n- As-is before to-be: mapear antes de redisenar\n- Error-first design: que pasa cuando algo falla\n- Start simple: automatizar el 80% primero, iterar despues\n- ROI honesto: incluir tiempo de setup y mantenimiento", "Formato: diagrama de flujo + guia de implementacion + ROI. Tono: practico, paso a paso. Audiencia: profesional sin experiencia tecnica. Accion: configurar la primera automatizacion esta semana.", ["El proceso manual esta mapeado completamente", "La plataforma esta seleccionada con justificacion", "El manejo de errores esta disenado", "El ROI incluye costos de setup y mantenimiento"], [{'name': 'PROCESO', 'desc': 'Proceso manual a automatizar'}, {'name': 'HERRAMIENTAS', 'desc': 'Herramientas que ya usas'}, {'name': 'FRECUENCIA', 'desc': 'Frecuencia del proceso'}])

# ─── META-PROMPTING ───
qspec("meta_crear_spec_alto_rendimiento", "Para disenar un SPEC de alto rendimiento desde cero, usando el formato MetodologIA. El meta-prompting es la habilidad multiplicadora: un buen prompt crea valor una vez; un buen meta-prompt crea valor infinitas veces.", "Ingeniero de Prompts Senior y Disenador de Sistemas Conversacionales con experiencia en creacion de bibliotecas de prompts empresariales y optimizacion de LLMs.", """Taller de co-diseno de SPEC:\n1. Definir objetivo del nuevo SPEC con precision\n2. Seleccionar arquetipo experto con justificacion\n3. Disenar la seccion S (Situacion prospectiva)\n4. Disenar la seccion P (Pedido con componentes)\n5. Disenar la seccion E (Ejecucion con metodo)\n6. Disenar la seccion C (Criterio medible)\n7. Crear [inputs] parametrizados con {{placeholders}}\n8. Crear [checklist] de auto-auditoria\n9. Test: ejecutar el SPEC y evaluar output""", "Metodo:\n- Formato SPEC: Situacion (Para que) + Pedido (Que) + Ejecucion (Como) + Criterio (Medida)\n- Parametric design: cada variable en {{DOBLE_LLAVE}}\n- Test-driven: ejecutar el SPEC 3 veces para validar consistencia\n- Specificity > generality: un SPEC para un tipo de entregable", "Formato: SPEC completo listo para agregar a la biblioteca + reporte de test. Tono: tecnico-pedagogico. Audiencia: el autor del SPEC. Accion: publicar el SPEC en su text expander.", ["El SPEC tiene las 4 secciones SPEC completas", "Los parametros son claros y tienen ejemplos", "El checklist tiene min. 4 criterios verificables", "El SPEC fue testeado al menos 1 vez con resultado satisfactorio"], [{'name': 'OBJETIVO', 'desc': 'Que debe producir este nuevo SPEC'}, {'name': 'CONTEXTO', 'desc': 'Contexto de negocio o dominio', 'opt': True}, {'name': 'COMPLEJIDAD', 'desc': 'Nivel (simple, medio, avanzado)', 'opt': True}])

qspec("meta_optimizar_spec_existente", "Para mejorar significativamente un SPEC que ya existe pero produce resultados inconsistentes. La optimizacion de prompts es ingenieria iterativa, no magia.", "Prompt Optimization Specialist con experiencia en A/B testing de prompts, analisis de output quality y mejora sistematica de instrucciones para LLMs.", """Optimizacion de SPEC:\n1. Diagnostico: ejecutar el SPEC 3 veces y analizar variabilidad\n2. Identificar secciones debiles (donde la IA se devia)\n3. Reforzar con mayor especificidad, ejemplos o restricciones\n4. Eliminar ambiguedades y instrucciones contradictorias\n5. A/B test: version original vs optimizada (3 ejecuciones cada una)\n6. Documentar mejoras con antes/despues""", "Metodo:\n- Consistency test: 3 ejecuciones, mismos inputs, evaluar varianza\n- Failure mode analysis: donde y por que se devia\n- Specificity injection: agregar restricciones donde hay desviacion\n- Simplify: a veces el prompt necesita menos instrucciones, no mas", "Formato: SPEC optimizado + reporte de mejora con antes/despues. Tono: analitico. Audiencia: autor del SPEC original. Accion: reemplazar la version anterior con la optimizada.", ["El diagnostico tiene 3+ ejecuciones analizadas", "Las secciones debiles estan identificadas con evidencia", "El A/B test muestra mejora medible", "El SPEC optimizado es mas corto o igual (no mas largo sin razon)"], [{'name': 'SPEC_ACTUAL', 'desc': 'El SPEC actual que quieres optimizar'}, {'name': 'PROBLEMA', 'desc': 'Que falla o es inconsistente en los resultados'}])

# ═══════════════════════════════════════════════════════════════
# EXPANSION: Import remaining SPECs from expansion_v4.py
# ═══════════════════════════════════════════════════════════════

try:
    from expansion_v4 import register_expansion
    register_expansion(qspec)
    print("Expansion A loaded.")
except ImportError:
    print("Warning: expansion_v4.py not found.")

try:
    from expansion_v4b import register_expansion_b
    register_expansion_b(qspec)
    print("Expansion B loaded.")
except ImportError:
    print("Warning: expansion_v4b.py not found.")

try:
    from expansion_v4c import register_expansion_c
    register_expansion_c(qspec)
    print("Expansion C loaded.")
except ImportError:
    print("Warning: expansion_v4c.py not found.")

try:
    from expansion_v4d import register_expansion_d
    register_expansion_d(qspec)
    print("Expansion D loaded.")
except ImportError:
    print("Warning: expansion_v4d.py not found.")

try:
    from expansion_v4e import register_expansion_e
    register_expansion_e(qspec)
    print("Expansion E loaded.")
except ImportError:
    print("Warning: expansion_v4e.py not found.")

# ═══════════════════════════════════════════════════════════════
# ASSEMBLY: Build the final JSON
# ═══════════════════════════════════════════════════════════════

def main():
    library = {}

    # Layer 1: Letters
    library.update(LETTERS)
    print(f"Letters: {len(LETTERS)}")

    # Layer 2: Digits
    library.update(DIGITS)
    print(f"Digits: {len(DIGITS)}")

    # Layer 3: Words
    library.update(WORDS)
    print(f"Words: {len(WORDS)}")

    # Layer 4: SPECs
    library.update(SPECS)
    print(f"SPECs: {len(SPECS)}")

    print(f"\nTotal: {len(library)}")
    print(f"Target: 443 (gap: {443 - len(library)})")

    # Write output
    out_path = os.path.join(SCRIPT_DIR, 'prompts_universales_v4.json')
    with open(out_path, 'w', encoding='utf-8') as f:
        json.dump(library, f, ensure_ascii=False, indent=2)
    print(f"\nSaved to: {out_path}")

    # Category breakdown
    cats = {}
    for k in SPECS:
        cat = k.split('_')[0]
        cats[cat] = cats.get(cat, 0) + 1
    print("\nSPEC categories:")
    for c, n in sorted(cats.items(), key=lambda x: -x[1]):
        print(f"  {c}: {n}")

if __name__ == '__main__':
    main()

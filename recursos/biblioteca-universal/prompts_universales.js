window.promptsUniversales = [
  {
    "id": "0",
    "label_title": "0 — PRIMING — Setear Contexto",
    "category": "pipeline",
    "type": "digit",
    "content": "PRIMING — Setear Contexto\n\n1. Lee todo lo que comparto (texto, adjuntos, contexto). NO ejecutes nada.\n2. Reformula en tus palabras: quien soy, que hacemos, que restricciones hay.\n3. Pregunta max 3 ambiguedades criticas.\n\nSi el priming es correcto, todo fluye. Si no, todo es desperdicio.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "1",
    "label_title": "1 — ENTENDER — Comprender la Necesidad",
    "category": "pipeline",
    "type": "digit",
    "content": "ENTENDER — Comprender la Necesidad\n\n1. Escucha mi idea/tarea/problema (puede ser vago).\n2. Reformula en 1 oracion: Que + Para Que + Para Quien.\n3. Identifica lo que falta para actuar con precision.\n4. Presenta tu comprension para validacion ANTES de continuar.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "2",
    "label_title": "2 — DEFINIR — Construir el SPEC",
    "category": "pipeline",
    "type": "digit",
    "content": "DEFINIR — Construir el SPEC\n\n1. S: Para que? Que se desbloquea? Contexto y restricciones.\n2. P: Arquetipo experto + entregable concreto + alcance (SI/NO incluye).\n3. E: Metodo, fases, decisiones que requieren mi validacion.\n4. C: Formato, audiencia, tono, medida de exito.\n\nPresenta el SPEC completo para aprobacion. Es el contrato.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "3",
    "label_title": "3 — PLANIFICAR — Plan de Accion",
    "category": "pipeline",
    "type": "digit",
    "content": "PLANIFICAR — Plan de Accion\n\n1. Descompone en fases secuenciales: que produces, que necesitas.\n2. Identifica dependencias y riesgos.\n3. Presenta el plan para aprobacion.\n\nNo ejecutes sin plan aprobado.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "4",
    "label_title": "4 — EJECUTAR — Primera Version",
    "category": "pipeline",
    "type": "digit",
    "content": "EJECUTAR — Primera Version\n\n1. Sigue el SPEC (paso 2) y el Plan (paso 3).\n2. Completitud > perfeccion. Es un draft.\n3. Marca [PENDIENTE] y [VERIFICAR] donde aplique.\n4. Entrega COMPLETO, no parcial.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "5",
    "label_title": "5 — ROBUSTECER — Agregar Sustancia",
    "category": "pipeline",
    "type": "digit",
    "content": "ROBUSTECER — Agregar Sustancia\n\n1. Datos, fuentes, estadisticas verificables.\n2. Ejemplos concretos y casos reales.\n3. Resuelve todos los [PENDIENTE] y [VERIFICAR].\n\nMas solido, no mas largo.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "6",
    "label_title": "6 — SIMPLIFICAR — Destilar Valor",
    "category": "pipeline",
    "type": "digit",
    "content": "SIMPLIFICAR — Destilar Valor\n\n1. Duplicados > queda uno. Pasivos > activos. Relleno > eliminado.\n2. Si quitarlo no empeora el resultado, quitarlo.\n3. El output DEBE ser mas corto que el input.\n\nSimplificar es destilar. Lo que sobrevive es diamante.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "7",
    "label_title": "7 — VALIDAR — Verificar Calidad",
    "category": "pipeline",
    "type": "digit",
    "content": "VALIDAR — Verificar Calidad\n\n1. Ejecuta [checklist] punto por punto: OK / AJUSTE / FALLA.\n2. Verifica coherencia y soporte de afirmaciones.\n3. Si FALLA: volver a paso 5 o 6. Si AJUSTE: corregir y avanzar.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "8",
    "label_title": "8 — ENTREGAR — Formato Final",
    "category": "pipeline",
    "type": "digit",
    "content": "ENTREGAR — Formato Final\n\n1. Aplica tono y formato del Criterio (C).\n2. Verifica: usable sin edicion por la audiencia destino.\n3. Test: si lo recibe alguien exigente, lo aceptaria tal cual?",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "9",
    "label_title": "9 — CRISTALIZAR — Ingenieria Inversa",
    "category": "pipeline",
    "type": "digit",
    "content": "CRISTALIZAR — Ingenieria Inversa\n\nAnaliza el historial completo. Genera 2 prompts reutilizables:\n\nA) Priming (max 200 palabras): contexto + rol + restricciones.\nB) SPEC de Alto Rendimiento: [inputs]/[prompt] S-P-E-C/[checklist] que produzca el resultado en 1 paso.\n\nEl proceso de hoy construye el atajo de manana.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "a",
    "label_title": "A",
    "category": "comando",
    "type": "letter",
    "content": "Aprobado. Proceder con el plan presentado. Repasa los insights clave antes de avanzar con lo operativo.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "b",
    "label_title": "B",
    "category": "comando",
    "type": "letter",
    "content": "Busca informacion adicional. Investiga fuentes complementarias, datos recientes y perspectivas alternas. Presenta hallazgos como briefing ejecutivo con fuentes.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "c",
    "label_title": "C",
    "category": "comando",
    "type": "letter",
    "content": "Corrige y mejora: ortografia, gramatica, coherencia, tono y claridad. Entrega version limpia sin marcas de cambio. Si hay ambiguedades, resuelve a favor de la claridad.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "d",
    "label_title": "D",
    "category": "comando",
    "type": "letter",
    "content": "Desglosa en partes. Descompone en componentes fundamentales. Cada parte con: definicion, relevancia y dependencias. Presenta como arbol o mapa.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "e",
    "label_title": "E",
    "category": "comando",
    "type": "letter",
    "content": "Bucle de Excelencia. Define rubrica interna con 10 criterios: fundamento, veracidad, calidad, densidad, simplicidad, claridad, precision, profundidad, coherencia y valor. Evalua 1-10 por criterio. Itera hasta alcanzar 10/10 en todos. Entrega SOLO la version final — sin trazas del proceso. Guarda versiones intermedias en documento separado.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "f",
    "label_title": "F",
    "category": "comando",
    "type": "letter",
    "content": "Formatea profesionalmente. Aplica headers, bullets, tablas, negritas, separadores logicos. El resultado debe ser escaneable y ejecutivo en 5 segundos.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "g",
    "label_title": "G",
    "category": "comando",
    "type": "letter",
    "content": "Genera 5+ alternativas. Cada una con: nombre descriptivo, enfoque, ventaja principal, trade-off. Presenta en tabla comparativa.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "h",
    "label_title": "H",
    "category": "comando",
    "type": "letter",
    "content": "Haz checklist accionable. Cada item: accion concreta, verificable, con responsable implicito y resultado esperado. Ordena por prioridad de impacto.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "i",
    "label_title": "I",
    "category": "comando",
    "type": "letter",
    "content": "Identifica contexto completo de esta conversacion. Resume: objetivo principal, decisiones tomadas, temas abiertos, supuestos activos, proximos pasos. Formato: briefing de continuidad.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "j",
    "label_title": "J",
    "category": "comando",
    "type": "letter",
    "content": "Justifica con evidencia. Cada afirmacion o recomendacion debe tener: dato, fuente, marco teorico, caso de referencia o razonamiento logico explicito.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "k",
    "label_title": "K",
    "category": "comando",
    "type": "letter",
    "content": "Key takeaways. Extrae 5-7 insights mas importantes. Cada uno: insight + implicacion + accion sugerida. Formato escaneable.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "l",
    "label_title": "L",
    "category": "comando",
    "type": "letter",
    "content": "Lista pros y contras. Evalua objetivamente ventajas y desventajas. Incluye ponderacion de impacto (alto/medio/bajo) por punto. Cierra con recomendacion.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "m",
    "label_title": "M",
    "category": "comando",
    "type": "letter",
    "content": "Mejora significativamente. Toma el ultimo entregable y elevalo: mas profundidad, mejor estructura, datos mas solidos, redaccion mas precisa. Entrega solo la version mejorada.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "n",
    "label_title": "N",
    "category": "comando",
    "type": "letter",
    "content": "Next step. Identifica la accion inmediata mas valiosa. Describe: que, quien, cuando, con que recursos, resultado esperado. Maxima concrecion.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "o",
    "label_title": "O",
    "category": "comando",
    "type": "letter",
    "content": "Organiza cronologicamente. Crea timeline o secuencia ordenada. Incluye hitos, dependencias y fechas estimadas cuando sea posible.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "p",
    "label_title": "P",
    "category": "comando",
    "type": "letter",
    "content": "Profundiza. Expande con mayor detalle, ejemplos concretos, datos de soporte, casos reales y matices no explorados. Nivel: experto senior.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "q",
    "label_title": "Q",
    "category": "comando",
    "type": "letter",
    "content": "Pregunta lo que falta. Identifica preguntas criticas NO formuladas. Brechas de informacion que podrian cambiar conclusiones o mejorar significativamente el resultado.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "r",
    "label_title": "R",
    "category": "comando",
    "type": "letter",
    "content": "Resume ejecutivo. Max 3 parrafos. Parrafo 1: conclusion y recomendacion. Parrafo 2: evidencia y fundamento. Parrafo 3: proximos pasos concretos.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "s",
    "label_title": "S",
    "category": "comando",
    "type": "letter",
    "content": "Sintetiza opciones abiertas. Consolida la mejor solucion integrando fortalezas de todas las alternativas y mitigando debilidades de cada una.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "t",
    "label_title": "T",
    "category": "comando",
    "type": "letter",
    "content": "Traduce al otro idioma manteniendo tono, intencion y matices culturales. Espanol a ingles profesional o viceversa. Solo la traduccion, sin explicaciones.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "u",
    "label_title": "U",
    "category": "comando",
    "type": "letter",
    "content": "Unifica y consolida. De multiples fragmentos o versiones, crea documento unico coherente. Elimina redundancias, resuelve contradicciones, asegura flujo narrativo.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "v",
    "label_title": "V",
    "category": "comando",
    "type": "letter",
    "content": "Valida veracidad y consistencia. Marca cada afirmacion: OK / Requiere confirmacion / Potencialmente incorrecto. Sugiere correcciones donde aplique.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "w",
    "label_title": "W",
    "category": "comando",
    "type": "letter",
    "content": "What if. Genera 3 escenarios: optimista, pesimista, mas probable. Cada uno con: condiciones de activacion, impacto esperado, acciones recomendadas.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "x",
    "label_title": "X",
    "category": "comando",
    "type": "letter",
    "content": "Extrae datos clave en formato estructurado. Nombres, fechas, cifras, metricas, compromisos, decisiones. Presenta en tabla o JSON segun sea mas util.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "y",
    "label_title": "Y",
    "category": "comando",
    "type": "letter",
    "content": "Ya casi — revision final pre-entrega. Verifica: completitud, consistencia, formato, ortografia, parametros resueltos, listo para uso inmediato.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "z",
    "label_title": "Z",
    "category": "comando",
    "type": "letter",
    "content": "Zoom out. Perspectiva estrategica. Conecta con el panorama general: objetivos de largo plazo, implicaciones sistemicas, que estamos pasando por alto.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "compara",
    "label_title": "Compara",
    "category": "acelerador",
    "type": "word",
    "content": "Tabla comparativa estructurada. Columnas: criterios clave. Filas: opciones. Scoring numerico (1-5) por criterio. Totales ponderados. Recomendacion fundamentada al final.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "prioriza",
    "label_title": "Prioriza",
    "category": "acelerador",
    "type": "word",
    "content": "Ordena por impacto real. Top 3 con justificacion explicita. Usa criterios: impacto (alto/medio/bajo), esfuerzo (alto/medio/bajo), urgencia. Presenta como matriz o lista priorizada.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "reformula",
    "label_title": "Reformula",
    "category": "acelerador",
    "type": "word",
    "content": "Reescribe con claridad profesional. Mismo mensaje, mejor forma. Activa verbos pasivos, elimina ambiguedades, mejora flujo logico. Entrega solo la version mejorada.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "debate",
    "label_title": "Debate",
    "category": "acelerador",
    "type": "word",
    "content": "Debate socratico. Presenta 3 perspectivas confrontadas sobre el tema: a favor, en contra, y una tercera via. Cada perspectiva con argumentos solidos. Cierra con sintesis que integre lo mejor de las tres.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "investiga",
    "label_title": "Investiga",
    "category": "acelerador",
    "type": "word",
    "content": "Investigacion estructurada con fuentes verificables. Formato: hallazgos clave + evidencia + gaps identificados + implicaciones. Cada hallazgo con [FUENTE]. Cero afirmaciones sin soporte.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "documenta",
    "label_title": "Documenta",
    "category": "acelerador",
    "type": "word",
    "content": "Formaliza en documento profesional con: titulo, fecha, autor, estructura con secciones numeradas, metadata relevante. Listo para archivar o compartir sin edicion.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "diagrama",
    "label_title": "Diagrama",
    "category": "acelerador",
    "type": "word",
    "content": "Crea representacion visual del concepto: diagrama de flujo, mapa mental, matriz, timeline o arquitectura segun aplique. Usa texto estructurado o pseudocodigo de Mermaid/PlantUML.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "evalua",
    "label_title": "Evalua",
    "category": "acelerador",
    "type": "word",
    "content": "Evaluacion sistematica con rubrica explicita. Define criterios, escala (1-5 o 1-10), evalua cada dimension, presenta scoring total y recomendacion fundamentada.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "optimiza",
    "label_title": "Optimiza",
    "category": "acelerador",
    "type": "word",
    "content": "Identifica ineficiencias, cuellos de botella y desperdicios. Propone mejoras concretas con impacto estimado. Prioriza por ratio beneficio/esfuerzo. Formato: problema > solucion > impacto.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "automatiza",
    "label_title": "Automatiza",
    "category": "acelerador",
    "type": "word",
    "content": "Identifica lo automatizable en el proceso descrito. Para cada oportunidad: que automatizar, con que herramienta, ROI estimado (horas/semana ahorradas), complejidad de implementacion. Prioriza por quick wins.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "desafia",
    "label_title": "Desafia",
    "category": "acelerador",
    "type": "word",
    "content": "Challenge mode. Ataca la propuesta desde 3 angulos: viabilidad tecnica, viabilidad financiera, viabilidad operativa. Busca fallas, supuestos no validados y riesgos ocultos. Se constructivo pero implacable.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "calibra",
    "label_title": "Calibra",
    "category": "acelerador",
    "type": "word",
    "content": "Ajusta tono, profundidad y formato a la audiencia especificada. Si la audiencia es C-level: conciso, estrategico, orientado a decision. Si es tecnica: detallado, preciso, con evidencia. Si es general: accesible, con ejemplos.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "resume",
    "label_title": "Resume",
    "category": "acelerador",
    "type": "word",
    "content": "Resume en formato ejecutivo: max 3 parrafos. Parrafo 1: conclusion y recomendacion principal. Parrafo 2: evidencia y fundamento clave. Parrafo 3: proximos pasos concretos con responsable y fecha.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "traduce",
    "label_title": "Traduce",
    "category": "acelerador",
    "type": "word",
    "content": "Traduce al otro idioma manteniendo tono, intencion y matices culturales. Espanol a ingles profesional. Ingles a espanol latinoamericano profesional. Preserva terminos tecnicos. Solo la traduccion.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "profundiza",
    "label_title": "Profundiza",
    "category": "acelerador",
    "type": "word",
    "content": "Expande con nivel de experto senior: datos, ejemplos concretos, casos de estudio, matices no explorados, perspectivas contrarias. 3x mas valor que el contenido actual.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "simplifica",
    "label_title": "Simplifica",
    "category": "acelerador",
    "type": "word",
    "content": "Reduce a lo esencial. Cada palabra debe ganarse su lugar. Elimina redundancias. Si se puede decir en 1 oracion, no uses 3. El resultado debe ser mas corto que el input.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "contextualiza",
    "label_title": "Contextualiza",
    "category": "acelerador",
    "type": "word",
    "content": "Situa en contexto: antecedentes historicos, marco teorico, tendencias relevantes, y por que importa AHORA. Conecta con el panorama general sin perder foco en lo especifico.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "cuantifica",
    "label_title": "Cuantifica",
    "category": "acelerador",
    "type": "word",
    "content": "Convierte lo cualitativo en cuantitativo. Cada afirmacion con numero, porcentaje, rango o estimacion fundamentada. Si no hay dato exacto, proporciona orden de magnitud.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "visualiza",
    "label_title": "Visualiza",
    "category": "acelerador",
    "type": "word",
    "content": "Describe como representar visualmente: que tipo de grafico, mapa, diagrama o infografia. Especifica layout, paleta, jerarquia. El visual debe comunicar sin texto adicional.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "personaliza",
    "label_title": "Personaliza",
    "category": "acelerador",
    "type": "word",
    "content": "Adapta a mi contexto profesional especifico. No respuestas genericas — cada recomendacion debe considerar mi rol, sector, equipo, herramientas y restricciones reales.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "estructura",
    "label_title": "Estructura",
    "category": "acelerador",
    "type": "word",
    "content": "Organiza en estructura piramidal: conclusion primero, argumentos de soporte despues, evidencia al final. Cada nivel responde al 'por que' del nivel superior. MECE.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "argumenta",
    "label_title": "Argumenta",
    "category": "acelerador",
    "type": "word",
    "content": "Construye argumento solido: tesis clara, 3 puntos de soporte con evidencia, anticipacion de contra-argumentos, conclusion. Cada afirmacion con dato o razonamiento explicito.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "predice",
    "label_title": "Predice",
    "category": "acelerador",
    "type": "word",
    "content": "Proyecta 3 escenarios basados en la informacion actual: optimista, probable, pesimista. Cada uno con condiciones, probabilidad estimada e implicaciones. No adivinar — extrapolar con fundamento.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "mapea",
    "label_title": "Mapea",
    "category": "acelerador",
    "type": "word",
    "content": "Crea un mapa visual del concepto: elementos, relaciones, jerarquias, dependencias, flujos. Formato: texto estructurado compatible con Mermaid o diagrama ASCII.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "pareto",
    "label_title": "Pareto",
    "category": "acelerador",
    "type": "word",
    "content": "Aplica principio 80/20: identifica el 20% de acciones/factores que producen el 80% del resultado. Presenta como lista priorizada con justificacion por item.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "verifica",
    "label_title": "Verifica",
    "category": "acelerador",
    "type": "word",
    "content": "Verifica cada afirmacion contra fuentes. Marca: verificado / requiere fuente / potencialmente incorrecto. Para lo no verificable, indica nivel de confianza (alto/medio/bajo).",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "operacionaliza",
    "label_title": "Operacionaliza",
    "category": "acelerador",
    "type": "word",
    "content": "Convierte el plan abstracto en operaciones concretas: quien hace que, cuando, con que, como se mide, donde se documenta. Cero ambiguedad. Todo ejecutable manana.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "sintetiza",
    "label_title": "Sintetiza",
    "category": "acelerador",
    "type": "word",
    "content": "De multiples fuentes o inputs, produce 1 documento unificado. Solo lo que importa. Elimina redundancias, resuelve contradicciones, mantiene la esencia. Max 1 pagina.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "segmenta",
    "label_title": "Segmenta",
    "category": "acelerador",
    "type": "word",
    "content": "Divide en segmentos manejables con criterio logico. Cada segmento: nombre, alcance, dependencias, entregable parcial. Presenta como plan de trabajo segmentado.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "escenarios",
    "label_title": "Escenarios",
    "category": "acelerador",
    "type": "word",
    "content": "Genera 3 escenarios alternativos para la situacion: conservador, base, agresivo. Para cada uno: supuestos, implicaciones, acciones recomendadas, probabilidad estimada.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "prototipa",
    "label_title": "Prototipa",
    "category": "acelerador",
    "type": "word",
    "content": "Version minima viable. Lo suficiente para validar la idea o concepto. Rapido, funcional, descartable. Identifica: que valida este prototipo y que NO valida.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "escala",
    "label_title": "Escala",
    "category": "acelerador",
    "type": "word",
    "content": "Toma lo que funciona y disenalo para 10x volumen. Identifica: que se rompe al escalar, que necesita cambiar, que automatizar. Presenta plan de escalamiento progresivo.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "aterriza",
    "label_title": "Aterriza",
    "category": "acelerador",
    "type": "word",
    "content": "De lo abstracto a lo concreto. Cada concepto se traduce en: accion especifica, fecha, responsable, entregable medible. Cero generalidades.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "conecta",
    "label_title": "Conecta",
    "category": "acelerador",
    "type": "word",
    "content": "Encuentra relaciones entre conceptos aparentemente separados. Mapea conexiones, patrones transversales y sinergias. Presenta como mapa de relaciones o insight de segundo orden.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "auditoria",
    "label_title": "Auditoria",
    "category": "acelerador",
    "type": "word",
    "content": "Revision exhaustiva y sistematica. Marca cada elemento: completo / faltante / incorrecto. Presenta hallazgos ordenados por severidad. Incluye recomendaciones de correccion.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "narrativa",
    "label_title": "Narrativa",
    "category": "acelerador",
    "type": "word",
    "content": "Transforma datos, hechos o analisis en historia con arco narrativo: situacion > tension > resolucion. Conecta con emociones y acciones. El dato cuenta la historia, la historia mueve a la accion.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "benchmark",
    "label_title": "Benchmark",
    "category": "acelerador",
    "type": "word",
    "content": "Compara contra mejores practicas del sector o industria. Identifica gaps, oportunidades de mejora y quick wins. Formato: metrica > tu estado > mejor practica > gap > accion.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "diagnostica",
    "label_title": "Diagnostica",
    "category": "acelerador",
    "type": "word",
    "content": "Analisis de situacion actual. Fortalezas (que funciona), debilidades (que falla), sintomas (que se observa), causas (por que pasa). Formato: diagnostico + prescripcion.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "estrategia",
    "label_title": "Estrategia",
    "category": "acelerador",
    "type": "word",
    "content": "Vision de largo plazo. Define: objetivo estrategico, palancas clave, trade-offs, riesgos, timeline. Conecta con recursos disponibles y restricciones reales.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "feedback",
    "label_title": "Feedback",
    "category": "acelerador",
    "type": "word",
    "content": "Feedback SBI estructurado: Situacion (cuando/donde), Comportamiento (que observaste, hechos), Impacto (que efecto tuvo). Cierra con pedido de cambio concreto y espacio para dialogo.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "reversa",
    "label_title": "Reversa",
    "category": "acelerador",
    "type": "word",
    "content": "Ingenieria inversa. Analiza el historial completo de esta sesion. Genera: 1 prompt de priming (contexto + rol) + 1 SPEC de alto rendimiento (que produzca el mismo resultado en 1 paso). Listos para copiar a text expander.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "defiende",
    "label_title": "Defiende",
    "category": "acelerador",
    "type": "word",
    "content": "Prepara argumentos defensivos para la posicion actual. Anticipa 5 objeciones probables. Para cada una: objecion, respuesta fundamentada, evidencia de soporte. Formato: tabla de objeciones-respuestas.",
    "paramCount": 0,
    "keywords": []
  },
  {
    "id": "productividad_disenar_ritual_matutino",
    "label_title": "Disenar Ritual Matutino",
    "category": "productividad",
    "type": "spec",
    "content": "[inputs]\n- PROFESION: {{PROFESION}} > Tu profesion o rol actual\n- HORA_DESPERTAR: {{HORA_DESPERTAR}} > Hora habitual de despertar\n- ENERGIA_ACTUAL: {{ENERGIA_ACTUAL}} > (opcional) Nivel de energia al despertar (bajo/medio/alto)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara maximizar energia, claridad y enfoque desde el inicio del dia. Un ritual matutino bien disenado desbloquea 2-3 horas de deep work diarias que hoy se pierden en arranque lento. Profesion: {{PROFESION}}. Hora de despertar: {{HORA_DESPERTAR}}.\n\n--- P | PEDIDO ---\n\nArquetipo: Coach de Alto Rendimiento con certificacion ICF PCC y especializacion en neurociencia aplicada a la productividad (10+ anos).\n\nDisenar ritual matutino personalizado:\n1. Version minima viable (15 min) para dias de alta carga\n2. Version expandida (45 min) para dias de deep work\n3. Secuencia basada en cronobiologia: cuerpo > mente > enfoque\n4. Triggers de activacion y transicion entre fases\n5. Checklist imprimible para seguimiento diario\n6. Protocolo de recuperacion: que hacer cuando se rompe la racha\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Evaluar demandas energeticas del rol profesional\n- Disenar secuencia basada en ciclos ultradianos\n- Incluir: activacion fisica, priming mental, intencion del dia\n- Cada componente con duracion, instruccion y variante express\n\n--- C | CRITERIO ---\n\nFormato: guia personal con ambas versiones. Tono: directo, motivador sin ser cursi. Audiencia: profesional que necesita resultados, no filosofia. Accion: implementar manana.\n\n[checklist]\n- [ ] Las dos versiones (15 y 45 min) estan completas\n- [ ] Cada componente tiene instruccion concreta y duracion\n- [ ] Incluye protocolo de recuperacion ante fallas\n- [ ] El ritual es sostenible a largo plazo, no heroico",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "productividad_auditar_tiempo_semanal",
    "label_title": "Auditar Tiempo Semanal",
    "category": "productividad",
    "type": "spec",
    "content": "[inputs]\n- ACTIVIDADES: {{ACTIVIDADES}} > Lista de actividades principales de tu semana tipica\n- HORAS_TRABAJO: {{HORAS_TRABAJO}} > Horas de trabajo semanales totales\n- OBJETIVO: {{OBJETIVO}} > (opcional) Tu objetivo profesional principal actual\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara identificar donde se fuga el tiempo y redirigirlo a actividades de alto impacto. La mayoria de profesionales opera con 70% shallow work y 30% deep work. El objetivo es invertir esa proporcion.\n\n--- P | PEDIDO ---\n\nArquetipo: Consultor de Productividad Personal con certificacion GTD (Getting Things Done) y experiencia en coaching ejecutivo de C-levels (15+ anos).\n\nAuditoria completa del tiempo semanal:\n1. Inventario de actividades con horas estimadas\n2. Clasificacion: deep work vs shallow work vs admin vs desperdicio\n3. Identificacion de las 3 mayores fugas de tiempo\n4. Ratio actual deep/shallow y ratio objetivo\n5. Semana tipo rediseñada con time blocks optimizados\n6. Top 5 acciones inmediatas de mejora (implementables esta semana)\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Inventario completo de actividades por categoria\n- Matriz Eisenhower para priorización\n- Analisis de interrupciones y context switching\n- Time blocking basado en picos de energia\n- Principio Pareto: 20% actividades que generan 80% resultados\n\n--- C | CRITERIO ---\n\nFormato: diagnostico visual + plan de accion. Max 3 paginas. Tono: analitico y directo. Audiencia: el profesional mismo. Accion: implementar rediseno esta semana.\n\n[checklist]\n- [ ] Todas las actividades semanales estan inventariadas\n- [ ] Las 3 mayores fugas estan cuantificadas en horas\n- [ ] La semana rediseñada es realista (no heroica)\n- [ ] Las 5 acciones inmediatas son ejecutables esta semana",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "productividad_sistema_captura_inbox_cero",
    "label_title": "Sistema Captura Inbox Cero",
    "category": "productividad",
    "type": "spec",
    "content": "[inputs]\n- HERRAMIENTAS: {{HERRAMIENTAS}} > Herramientas que usas (email, chat, notas, etc.)\n- VOLUMEN: {{VOLUMEN}} > Volumen aproximado de inputs diarios\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara eliminar la carga cognitiva de gestionar informacion entrante dispersa en multiples canales. Cada buzón sin procesar es deuda cognitiva que reduce capacidad de deep work.\n\n--- P | PEDIDO ---\n\nArquetipo: Arquitecto de Sistemas de Productividad Personal con certificacion GTD y experiencia en diseno de workflows de informacion para equipos remotos.\n\nSistema de captura e inbox zero:\n1. Mapa de todos los puntos de entrada de informacion\n2. Flujo unificado: captura > procesamiento > organizacion > accion\n3. Criterios de accion inmediata (regla de 2 minutos) vs diferida\n4. Ritual de procesamiento con frecuencia optima\n5. Configuracion recomendada por herramienta\n6. Metricas de salud del sistema (como saber si funciona)\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Auditar todos los canales de entrada (email, chat, notas, tareas)\n- Aplicar metodologia GTD: capturar, clarificar, organizar, reflexionar, comprometer\n- Disenar filtros y reglas de automatizacion por canal\n- Principio: un solo sistema de gestion, multiples puntos de entrada\n\n--- C | CRITERIO ---\n\nFormato: diagrama de flujo + guia de configuracion por herramienta. Tono: practico, paso a paso. Audiencia: profesional con 50+ inputs diarios. Accion: configurar hoy.\n\n[checklist]\n- [ ] Todos los canales de entrada estan mapeados\n- [ ] El flujo de procesamiento tiene menos de 5 pasos\n- [ ] Incluye configuracion especifica por herramienta\n- [ ] El ritual de procesamiento es sostenible (max 30 min/dia)",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "productividad_calcular_roi_personal",
    "label_title": "Calcular Roi Personal",
    "category": "productividad",
    "type": "spec",
    "content": "[inputs]\n- INICIATIVA: {{INICIATIVA}} > Herramienta, habito o metodologia a evaluar\n- HORAS_SEMANALES: {{HORAS_SEMANALES}} > Horas semanales dedicadas a la tarea afectada\n- VALOR_HORA: {{VALOR_HORA}} > (opcional) Tu valor por hora estimado\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara cuantificar el retorno de invertir tiempo en una nueva herramienta, habito o metodologia. Las decisiones de adopcion deben basarse en datos, no en entusiasmo.\n\n--- P | PEDIDO ---\n\nArquetipo: Analista de ROI y Economia del Comportamiento con MBA y experiencia en cuantificacion de productividad en consultoria (10+ anos).\n\nAnalisis de ROI personal:\n1. Linea base actual: horas, calidad, costo de la tarea afectada\n2. Estimacion de mejora con la nueva iniciativa\n3. Calculo de horas recuperadas por semana/mes/ano\n4. Monetizacion del impacto (valor/hora x horas recuperadas)\n5. Periodo de retorno (payback period)\n6. Escenarios: conservador, probable, optimista\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Cuantificar estado actual con precision\n- Estimar mejoras basadas en benchmarks o evidencia\n- ROI = (Ganancia - Inversion) / Inversion\n- Incluir costos ocultos: curva de aprendizaje, migracion, riesgo\n- Analisis de sensibilidad: que pasa si la mejora es solo 50% de lo esperado\n\n--- C | CRITERIO ---\n\nFormato: tabla comparativa antes/despues + calculo financiero. Tono: analitico. Audiencia: profesional que necesita justificar la inversion de tiempo. Accion: tomar decision de adopcion informada.\n\n[checklist]\n- [ ] La linea base esta cuantificada con numeros reales\n- [ ] El calculo incluye costos ocultos (aprendizaje, migracion)\n- [ ] Los 3 escenarios son realistas (no solo el optimista)\n- [ ] La recomendacion es clara: adoptar, posponer o descartar",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "productividad_disenar_sistema_habitos",
    "label_title": "Disenar Sistema Habitos",
    "category": "productividad",
    "type": "spec",
    "content": "[inputs]\n- OBJETIVO: {{OBJETIVO}} > Objetivo profesional a lograr en 90 dias\n- HABITOS_ACTUALES: {{HABITOS_ACTUALES}} > Habitos actuales (buenos y malos)\n- TIEMPO_DIARIO: {{TIEMPO_DIARIO}} > (opcional) Tiempo diario disponible para nuevos habitos\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara construir un stack de habitos que se refuercen mutuamente y generen resultados compuestos en 90 dias. Los habitos aislados fallan; los sistemas de habitos persisten.\n\n--- P | PEDIDO ---\n\nArquetipo: Disenador de Sistemas de Comportamiento con formacion en psicologia conductual y experiencia en coaching de habitos para ejecutivos (Atomic Habits certified).\n\nSistema de habitos progresivo:\n1. Identidad profesional objetivo (quien quieres ser, no solo que quieres lograr)\n2. Auditoria de habitos actuales: cuales conservar, cuales eliminar\n3. Habit stack disenado con triggers, rutinas y recompensas\n4. Aplicacion de las 4 leyes: obvio, atractivo, facil, satisfactorio\n5. Calendario de implementacion de 90 dias con milestones\n6. Sistema de tracking simple y protocolo de recuperacion\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Framework Atomic Habits de James Clear\n- Habit stacking: anclar nuevos habitos a existentes\n- Implementation intentions: cuando X ocurra, hare Y\n- Two-minute rule: cada habito empieza en su version de 2 minutos\n- Never miss twice: protocolo de recuperacion ante fallas\n\n--- C | CRITERIO ---\n\nFormato: plan de 90 dias + tracker + protocolo de recuperacion. Tono: motivador y practico. Audiencia: profesional que ha fallado antes con habitos. Accion: empezar manana con el habito mas pequeno.\n\n[checklist]\n- [ ] La identidad objetivo esta definida antes que los habitos\n- [ ] Cada habito tiene trigger, rutina y recompensa explicita\n- [ ] El calendario de 90 dias tiene milestones verificables\n- [ ] El protocolo de recuperacion es realista (no heroico)",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "productividad_optimizar_entorno_digital",
    "label_title": "Optimizar Entorno Digital",
    "category": "productividad",
    "type": "spec",
    "content": "[inputs]\n- DISPOSITIVO: {{DISPOSITIVO}} > Dispositivo principal (Mac/Windows/Linux)\n- HERRAMIENTAS: {{HERRAMIENTAS}} > Top 5 herramientas que mas usas\n- FRUSTRACIONES: {{FRUSTRACIONES}} > (opcional) Las 3 mayores fricciones digitales actuales\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara eliminar fricciones digitales que consumen 30-60 minutos diarios en micro-interrupciones, busquedas y navegacion ineficiente. El entorno digital debe servir, no distraer.\n\n--- P | PEDIDO ---\n\nArquetipo: Ingeniero de Productividad Digital con experiencia en ergonomia cognitiva, diseno de workspaces digitales y optimizacion de herramientas para equipos de alto rendimiento.\n\nOptimizacion del entorno digital:\n1. Auditoria del navegador: pestanas, marcadores, extensiones\n2. Optimizacion de notificaciones (eliminar ruido, preservar senal)\n3. Atajos de teclado para las 10 acciones mas frecuentes\n4. Sistema de organizacion de archivos (naming, estructura, busqueda)\n5. Ritual de higiene digital semanal (15 min max)\n6. Stack minimo recomendado vs actual\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Inventario de herramientas con frecuencia de uso\n- Eliminar antes de optimizar (menos herramientas > mejor configuradas)\n- Principio de friccion minima: cada accion frecuente a max 2 clicks\n- Notificaciones: solo urgente + importante, todo lo demas en batch\n\n--- C | CRITERIO ---\n\nFormato: guia paso a paso por herramienta. Tono: tecnico-practico. Audiencia: profesional que usa computadora 8+ horas diarias. Accion: implementar configuracion base en 1 hora.\n\n[checklist]\n- [ ] Las notificaciones estan auditadas y reducidas\n- [ ] Los 10 atajos principales estan documentados\n- [ ] El sistema de archivos tiene naming convention clara\n- [ ] El ritual de higiene semanal cabe en 15 minutos",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "productividad_energia_no_tiempo",
    "label_title": "Energia No Tiempo",
    "category": "productividad",
    "type": "spec",
    "content": "[inputs]\n- CRONOTIPO: {{CRONOTIPO}} > Tu cronotipo (madrugador/intermedio/nocturno)\n- TAREAS_CRITICAS: {{TAREAS_CRITICAS}} > Tus 3-5 tareas de mayor impacto\n- AGENDA_ACTUAL: {{AGENDA_ACTUAL}} > (opcional) Descripcion de tu agenda diaria actual\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara alinear tareas de alto impacto con picos de energia natural. Gestionar el tiempo sin gestionar la energia es optimizar el contenedor pero no el contenido.\n\n--- P | PEDIDO ---\n\nArquetipo: Especialista en Performance Humano con formacion en cronobiologia y diseno de jornadas de alto rendimiento para atletas corporativos.\n\nAgenda basada en gestion de energia:\n1. Perfil energetico personal: picos, valles, transiciones\n2. Clasificacion de tareas por demanda cognitiva (alta/media/baja)\n3. Alineacion: tareas de alta demanda en picos de energia\n4. Bloques de recuperacion estrategicos (no opcionales)\n5. Agenda tipo diaria con 3 variantes (dia ligero, normal, intenso)\n6. Indicadores de alerta de sobreexigencia\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Mapeo de curva de energia personal (90-min ultradian cycles)\n- Power of Full Engagement de Loehr/Schwartz\n- Categorizar tareas: crear, decidir, comunicar, administrar\n- Regla: deep work en picos, admin en valles, nada en transiciones\n\n--- C | CRITERIO ---\n\nFormato: 3 agendas tipo + perfil energetico visual. Tono: cientifico-practico. Audiencia: profesional que siente que trabaja mucho pero rinde poco. Accion: probar la agenda del dia normal manana.\n\n[checklist]\n- [ ] El perfil energetico tiene picos y valles identificados\n- [ ] Las tareas estan clasificadas por demanda cognitiva\n- [ ] Las 3 variantes de agenda son realistas\n- [ ] Los bloques de recuperacion estan integrados (no opcionales)",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "productividad_weekly_review_sistema",
    "label_title": "Weekly Review Sistema",
    "category": "productividad",
    "type": "spec",
    "content": "[inputs]\n- OBJETIVOS_TRIMESTRE: {{OBJETIVOS_TRIMESTRE}} > Tus 3 objetivos principales este trimestre\n- HERRAMIENTAS: {{HERRAMIENTAS}} > Donde gestionas tareas y calendario\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara garantizar que la actividad diaria esta alineada con los objetivos trimestrales. Sin revision semanal, el dia a dia consume el largo plazo.\n\n--- P | PEDIDO ---\n\nArquetipo: Facilitador de Revision Estrategica Personal con certificacion GTD y experiencia en coaching de OKRs para equipos de alto rendimiento.\n\nSistema de Weekly Review:\n1. Template de revision semanal con secciones fijas\n2. Preguntas de reflexion (max 7, enfocadas en aprendizaje)\n3. Tablero de seguimiento de objetivos trimestrales\n4. Proceso de planificacion de la proxima semana (top 3 prioridades)\n5. Ritual completo en max 45 minutos\n6. Metricas personales de salud productiva\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- GTD Weekly Review: vaciar, revisar, planificar\n- OKR personal: 3 objetivos trimestrales con key results medibles\n- Retrospectiva agil adaptada: que funciono, que no, que cambio\n- Principio: si no se revisa, no se gestiona\n\n--- C | CRITERIO ---\n\nFormato: template de revision + tablero de OKRs. Tono: reflexivo-practico. Audiencia: profesional que quiere coherencia entre dia a dia y largo plazo. Accion: hacer la primera revision este fin de semana.\n\n[checklist]\n- [ ] El template cabe en 45 minutos o menos\n- [ ] Las preguntas de reflexion son concretas (no filosoficas)\n- [ ] El tablero de OKRs tiene max 3 objetivos con key results medibles\n- [ ] El proceso es reproducible cada semana sin esfuerzo extra",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "productividad_deep_work_protocolo",
    "label_title": "Deep Work Protocolo",
    "category": "productividad",
    "type": "spec",
    "content": "[inputs]\n- CONTEXTO: {{CONTEXTO}} > Tu entorno de trabajo (oficina, remoto, hibrido)\n- INTERRUPCIONES: {{INTERRUPCIONES}} > Las 3 interrupciones mas frecuentes\n- HORAS_DW_ACTUAL: {{HORAS_DW_ACTUAL}} > (opcional) Horas de deep work semanales actuales (estimacion)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara proteger bloques de trabajo profundo en un entorno de interrupciones constantes. El deep work es la habilidad mas valiosa de la economia del conocimiento y la mas amenazada.\n\n--- P | PEDIDO ---\n\nArquetipo: Experto en Deep Work y Atencion Focalizada con formacion en neurociencia cognitiva y diseno de entornos de concentracion para profesionales de tecnologia.\n\nProtocolo de Deep Work personalizado:\n1. Diagnostico de interrupciones actuales (internas y externas)\n2. Diseno de bloques de deep work: duracion, frecuencia, ubicacion\n3. Protocolo de entrada: como activar el estado de concentracion\n4. Protocolo de salida: como cerrar y transicionar\n5. Comunicacion con equipo: como proteger los bloques sin aislarte\n6. Metricas de deep work (horas/semana, calidad de output)\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Cal Newport Deep Work framework\n- Pomodoro adaptado (bloques de 52/17 o 90/20 segun cronobiologia)\n- Environment design: eliminar triggers de distraccion\n- Shutdown ritual: cierre cognitivo del bloque\n- Tracking: horas de deep work como KPI personal\n\n--- C | CRITERIO ---\n\nFormato: protocolo imprimible + calendario semanal con bloques. Tono: directo, basado en evidencia. Audiencia: profesional en open office con muchas reuniones. Accion: bloquear 2 horas de deep work en el calendario de manana.\n\n[checklist]\n- [ ] Las interrupciones principales estan diagnosticadas\n- [ ] Los bloques de deep work tienen duracion y frecuencia definidas\n- [ ] El protocolo de entrada y salida es reproducible\n- [ ] La comunicacion con equipo preserva los bloques sin generar friccion",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "productividad_decision_rapida_framework",
    "label_title": "Decision Rapida Framework",
    "category": "productividad",
    "type": "spec",
    "content": "[inputs]\n- CONTEXTO: {{CONTEXTO}} > Tu rol y nivel de autonomia en decisiones\n- DECISION_EJEMPLO: {{DECISION_EJEMPLO}} > (opcional) Una decision pendiente para probar el framework\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara tomar decisiones de calidad en menos tiempo. La mayoria de decisiones profesionales son reversibles y no justifican analisis extenso. Decidir rapido y bien es una habilidad entrenada.\n\n--- P | PEDIDO ---\n\nArquetipo: Decision Coach Ejecutivo con experiencia en toma de decisiones bajo incertidumbre y frameworks de Jeff Bezos (Type 1/Type 2) y Daniel Kahneman.\n\nFramework de decision rapida:\n1. Clasificacion de la decision: reversible (Type 2) vs irreversible (Type 1)\n2. Template de 5 minutos para decisiones reversibles\n3. Template de 30 minutos para decisiones irreversibles\n4. Criterios de cuando escalar vs decidir solo\n5. Protocolo de documentacion minima de decisiones\n6. Registro: decision, fecha, razonamiento, resultado esperado\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Bezos Type 1/Type 2 decision framework\n- Satisficing vs maximizing (Herbert Simon)\n- Regla 70%: decide cuando tengas el 70% de la informacion\n- Decision journal: registrar para aprender, no para arrepentirse\n\n--- C | CRITERIO ---\n\nFormato: 2 templates (5 min y 30 min) + arbol de decision de cuando usar cada uno. Tono: pragmatico. Audiencia: profesional que posterga por paralisis de analisis. Accion: usar el template de 5 minutos con la proxima decision pendiente.\n\n[checklist]\n- [ ] Los 2 templates son usables en los tiempos indicados\n- [ ] El arbol de clasificacion es claro (reversible vs irreversible)\n- [ ] El protocolo de documentacion es minimo (max 3 campos)\n- [ ] Incluye criterios claros de cuando NO decidir solo",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "productividad_delegar_tarea_efectivamente",
    "label_title": "Delegar Tarea Efectivamente",
    "category": "productividad",
    "type": "spec",
    "content": "[inputs]\n- TAREA: {{TAREA}} > Tarea o responsabilidad a delegar\n- RECEPTOR: {{RECEPTOR}} > Persona o equipo receptor\n- EXPERIENCIA: {{EXPERIENCIA}} > Nivel de experiencia del receptor con esta tarea\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara liberar tiempo de alto valor delegando tareas correctamente. Delegar mal cuesta mas que hacerlo uno mismo. Delegar bien multiplica capacidad.\n\n--- P | PEDIDO ---\n\nArquetipo: Coach de Gestion y Delegacion con experiencia en Situational Leadership y desarrollo de equipos autonomos (15+ anos).\n\nDelegacion efectiva:\n1. Resultado esperado con criterios de aceptacion medibles\n2. Nivel de delegacion apropiado (informar/consultar/decidir/actuar)\n3. Recursos y autoridad necesarios para ejecutar\n4. Checkpoints de seguimiento sin micromanagement\n5. Protocolo de escalacion ante bloqueos\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- RACI: responsable, accountable, consultado, informado\n- Situational Leadership: nivel de delegacion segun madurez del receptor\n- Intent-based leadership: comunicar intencion, no pasos\n\n--- C | CRITERIO ---\n\nFormato: plan de delegacion en 1 pagina.\nTono: directo, orientado a accion.\nAudiencia: lider que delega.\nAccion: delegar la tarea hoy con el plan listo.\n\n[checklist]\n- [ ] El resultado esperado tiene criterios medibles\n- [ ] El nivel de delegacion es apropiado al receptor\n- [ ] Los checkpoints no son micromanagement\n- [ ] El protocolo de escalacion esta definido",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "productividad_reducir_reuniones_50",
    "label_title": "Reducir Reuniones 50",
    "category": "productividad",
    "type": "spec",
    "content": "[inputs]\n- REUNIONES: {{REUNIONES}} > Lista de reuniones semanales recurrentes\n- ROL: {{ROL}} > Tu rol y nivel de autonomia sobre tu agenda\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara recuperar horas semanales eliminando o comprimiendo reuniones de bajo valor. El profesional promedio pasa 23 horas/semana en reuniones; el 50% son innecesarias.\n\n--- P | PEDIDO ---\n\nArquetipo: Consultor de Eficiencia Organizacional con experiencia en rediseno de cadencias de comunicacion para equipos de alto rendimiento.\n\nReduccion de reuniones:\n1. Auditoria de reuniones actuales (nombre, frecuencia, duracion, asistentes, valor)\n2. Clasificacion: eliminar / comprimir / convertir a async / mantener\n3. Templates de comunicacion asincrona que reemplacen reuniones\n4. Cadencia optima: cuales reuniones SI son necesarias y por que\n5. Script para declinar reuniones sin generar friccion\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Meeting audit: listar todas, evaluar valor real vs percibido\n- Principio de Amazon: no meeting sin documento previo de 6 paginas\n- Async-first: si puede ser un email, Loom o doc, no es reunion\n- Decision tree: necesita reunion? > necesita MI presencia?\n\n--- C | CRITERIO ---\n\nFormato: auditoria + recomendaciones + templates async.\nTono: pragmatico.\nAudiencia: profesional con agenda saturada.\nAccion: eliminar o convertir 3 reuniones esta semana.\n\n[checklist]\n- [ ] Cada reunion tiene clasificacion justificada\n- [ ] Min. 3 templates async listos para usar\n- [ ] El script de declinacion es diplomatico y efectivo\n- [ ] La cadencia propuesta libera min. 5 horas/semana",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "productividad_email_cero_friccion",
    "label_title": "Email Cero Friccion",
    "category": "productividad",
    "type": "spec",
    "content": "[inputs]\n- VOLUMEN: {{VOLUMEN}} > Emails diarios aproximados\n- HERRAMIENTA: {{HERRAMIENTA}} > Cliente de email (Gmail, Outlook, etc.)\n- RESPUESTAS_COMUNES: {{RESPUESTAS_COMUNES}} > (opcional) Tipos de emails que mas respondes\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara procesar email en batches eficientes en lugar de modo reactivo. El email es el mayor ladron de deep work: cada check interrumpe 23 minutos de concentracion.\n\n--- P | PEDIDO ---\n\nArquetipo: Especialista en Comunicacion Digital Eficiente con experiencia en diseno de workflows de email para ejecutivos C-level.\n\nSistema de email de cero friccion:\n1. Reglas de filtrado automatico (por remitente, asunto, urgencia)\n2. Batches de procesamiento: frecuencia, duracion, ritual\n3. Templates para las 5 respuestas mas comunes\n4. Protocolo de triaje: actuar (<2min) / delegar / agendar / archivar\n5. Metricas: inbox count al final del dia\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- GTD email processing: capturar, clarificar, organizar, comprometer\n- 2-minute rule: si toma menos de 2 min, hacerlo ahora\n- Batch processing: 3 ventanas de 20 min (manana, mediodia, tarde)\n- Zero notification: desactivar alertas, procesar por bloques\n\n--- C | CRITERIO ---\n\nFormato: guia de configuracion + 5 templates + ritual.\nTono: practico, paso a paso.\nAudiencia: profesional con 50+ emails/dia.\nAccion: configurar filtros y templates hoy.\n\n[checklist]\n- [ ] Los filtros cubren 80% del volumen de email\n- [ ] Los 5 templates son reutilizables inmediatamente\n- [ ] El ritual de batches cabe en 60 min diarios total\n- [ ] Las metricas de salud son simples y medibles",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "productividad_shutdown_ritual_cierre",
    "label_title": "Shutdown Ritual Cierre",
    "category": "productividad",
    "type": "spec",
    "content": "[inputs]\n- HORA_CIERRE: {{HORA_CIERRE}} > Hora a la que quieres terminar de trabajar\n- HERRAMIENTAS: {{HERRAMIENTAS}} > Donde gestionas tareas y calendario\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara cerrar la jornada laboral con un ritual que asegure: nada se olvida, manana empieza con claridad, y la mente se desconecta del trabajo. Sin cierre, el trabajo invade la vida.\n\n--- P | PEDIDO ---\n\nArquetipo: Experto en Psicologia del Rendimiento con especialidad en transicion trabajo-vida y prevencion de burnout.\n\nShutdown Ritual:\n1. Checklist de cierre diario (max 10 min)\n2. Revision de tareas: que se completo, que queda, que se mueve a manana\n3. Captura de loose ends: nada queda en la cabeza, todo queda en el sistema\n4. Planificacion del dia siguiente (top 3 prioridades)\n5. Frase o accion de corte psicologico (shutdown complete)\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Cal Newport Shutdown Complete ritual\n- Zeigarnik effect: las tareas incompletas ocupan mente; capturarlas la libera\n- Implementation intentions: manana a las X hare Y\n- Transition buffer: actividad entre trabajo y vida personal\n\n--- C | CRITERIO ---\n\nFormato: checklist imprimible + guia de 1 pagina.\nTono: sereno, sin urgencia.\nAudiencia: profesional que no logra desconectar.\nAccion: ejecutar el ritual hoy al terminar de trabajar.\n\n[checklist]\n- [ ] El ritual cabe en 10 minutos o menos\n- [ ] Incluye captura de todos los loose ends\n- [ ] Tiene la planificacion del dia siguiente\n- [ ] Incluye accion de corte psicologico explicita",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "productividad_sprint_personal_semanal",
    "label_title": "Sprint Personal Semanal",
    "category": "productividad",
    "type": "spec",
    "content": "[inputs]\n- OBJETIVO_SEMANA: {{OBJETIVO_SEMANA}} > Lo mas importante a lograr esta semana\n- CONTEXTO: {{CONTEXTO}} > Restricciones de la semana (viajes, reuniones, deadlines)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara aplicar metodologia agil a la productividad personal: sprints semanales con objetivo claro, foco y retrospectiva. La semana es la unidad minima de cambio medible.\n\n--- P | PEDIDO ---\n\nArquetipo: Agile Coach Personal con certificacion CSM y experiencia en adaptacion de Scrum para productividad individual y equipos pequenos.\n\nSprint Personal Semanal:\n1. Sprint Goal: 1 objetivo semanal que importa (no 10)\n2. Sprint Backlog: max 5 tareas que soportan el goal\n3. Daily standup personal (2 min): que hice, que hare, que me bloquea\n4. Friday retro personal: que funciono, que no, 1 mejora para la proxima semana\n5. Velocity tracking: cuantos goals completados en 4 semanas\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Scrum adaptado a 1 persona: sprint de 5 dias\n- WIP limit: max 3 tareas en progreso simultaneo\n- Sprint goal > task list: el objetivo guia, las tareas sirven\n- Retro semanal: la mejora continua es el superpoder\n\n--- C | CRITERIO ---\n\nFormato: template de sprint + daily + retro.\nTono: motivador-practico.\nAudiencia: profesional que quiere estructura sin burocracia.\nAccion: planificar el sprint de esta semana.\n\n[checklist]\n- [ ] El sprint goal es 1 y es medible\n- [ ] El backlog tiene max 5 tareas\n- [ ] El daily standup cabe en 2 minutos\n- [ ] La retro produce 1 mejora concreta",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "productividad_batch_processing_tareas",
    "label_title": "Batch Processing Tareas",
    "category": "productividad",
    "type": "spec",
    "content": "[inputs]\n- TAREAS_RECURRENTES: {{TAREAS_RECURRENTES}} > Lista de tareas que haces regularmente\n- HORARIO: {{HORARIO}} > Tu horario de trabajo semanal\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara agrupar tareas similares y procesarlas en lote, eliminando el costo cognitivo del context switching. Cada cambio de contexto cuesta 23 minutos de recuperacion.\n\n--- P | PEDIDO ---\n\nArquetipo: Ingeniero de Procesos Personales con experiencia en Lean Manufacturing aplicado a trabajo del conocimiento.\n\nSistema de Batch Processing:\n1. Inventario de tareas recurrentes por tipo (email, llamadas, admin, creacion)\n2. Agrupacion en batches por similitud cognitiva\n3. Calendario semanal con bloques de batch asignados\n4. Protocolo de transicion entre batches (2 min buffer)\n5. Metricas: tiempo en batch vs tiempo en switching\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Task batching: agrupar por tipo cognitivo, no por proyecto\n- Context cost: calcular el costo real del switching\n- Time blocking: asignar bloques fijos a cada tipo de batch\n- Buffer zones: 2-5 min de transicion entre tipos\n\n--- C | CRITERIO ---\n\nFormato: calendario semanal con batches + guia de implementacion.\nTono: tecnico-practico.\nAudiencia: profesional multitarea.\nAccion: implementar 2 batches esta semana.\n\n[checklist]\n- [ ] Las tareas estan agrupadas por tipo cognitivo\n- [ ] El calendario tiene bloques asignados\n- [ ] Los buffers de transicion estan integrados\n- [ ] El ahorro estimado en horas esta cuantificado",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "productividad_brain_dump_estructurado",
    "label_title": "Brain Dump Estructurado",
    "category": "productividad",
    "type": "spec",
    "content": "[inputs]\n- HERRAMIENTAS: {{HERRAMIENTAS}} > Donde gestionas tareas y notas\n- CONTEXTO: {{CONTEXTO}} > (opcional) Que esta generando la sobrecarga actual\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara vaciar la mente de forma estructurada cuando la carga cognitiva es alta. Todo lo que esta en tu cabeza y no en un sistema es deuda cognitiva que reduce rendimiento.\n\n--- P | PEDIDO ---\n\nArquetipo: Facilitador de Productividad con certificacion GTD y especialidad en reduccion de carga cognitiva para profesionales de alto rendimiento.\n\nBrain Dump Estructurado:\n1. Captura libre: escribir TODO sin filtro (5 min)\n2. Clasificacion: tareas / ideas / preocupaciones / compromisos / pendientes\n3. Procesamiento: para cada item, definir proxima accion concreta\n4. Asignacion: cada item a su sistema (calendario, lista, nota, delegar, eliminar)\n5. Validacion: mente vacia, todo capturado\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- GTD Mind Sweep: vaciado completo de loops abiertos\n- Trigger list: categorias para asegurar que nada se escape\n- 2-minute rule: si se puede hacer en 2 min, hacerlo ahora\n- Resultado: cero items en la cabeza, 100% en sistemas\n\n--- C | CRITERIO ---\n\nFormato: guia paso a paso + trigger list + template de clasificacion.\nTono: calmado, sin prisa.\nAudiencia: profesional con sensacion de caos.\nAccion: hacer el brain dump ahora mismo.\n\n[checklist]\n- [ ] La trigger list cubre min. 10 categorias\n- [ ] Cada item capturado tiene proxima accion definida\n- [ ] Cada item esta asignado a un sistema especifico\n- [ ] La guia es ejecutable en 15 minutos",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "productividad_kanban_personal_flujo",
    "label_title": "Kanban Personal Flujo",
    "category": "productividad",
    "type": "spec",
    "content": "[inputs]\n- ROL: {{ROL}} > Tu rol profesional\n- HERRAMIENTA: {{HERRAMIENTA}} > (opcional) Herramienta para el tablero (Trello, Notion, fisico)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara visualizar todo el trabajo en progreso y limitar el WIP (Work In Progress). Sin visualizacion, es imposible gestionar el flujo. Con Kanban, ves los cuellos de botella.\n\n--- P | PEDIDO ---\n\nArquetipo: Practitioner de Kanban con certificacion KMP y experiencia en aplicacion de sistemas de flujo para productividad personal.\n\nKanban Personal:\n1. Diseno del tablero: columnas (Backlog / En Curso / Bloqueado / Listo)\n2. WIP limits por columna (recomendacion basada en rol)\n3. Politicas de movimiento: cuando mover una tarea de columna\n4. Ritual diario: revision del tablero (2 min)\n5. Metricas: cycle time, throughput, WIP ratio\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Kanban Method de David Anderson\n- WIP limit: el constraint que crea flujo\n- Pull system: no empezar nuevo hasta que haya capacidad\n- Visualize > Limit > Manage > Improve\n\n--- C | CRITERIO ---\n\nFormato: diseno de tablero + reglas + metricas.\nTono: practico.\nAudiencia: profesional visual que necesita ver su flujo.\nAccion: crear el tablero hoy.\n\n[checklist]\n- [ ] El tablero tiene max 5 columnas\n- [ ] Los WIP limits estan definidos y justificados\n- [ ] Las politicas de movimiento son claras\n- [ ] Las metricas son automatizables",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "productividad_friction_audit_eliminar",
    "label_title": "Friction Audit Eliminar",
    "category": "productividad",
    "type": "spec",
    "content": "[inputs]\n- CONTEXTO: {{CONTEXTO}} > Tu entorno de trabajo (herramientas, equipo, dinamica)\n- FRUSTRACIONES: {{FRUSTRACIONES}} > (opcional) Lo que mas te frustra de tu flujo actual\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara identificar y eliminar las fricciones invisibles que consumen 30-60 minutos diarios. Las fricciones pequenas se acumulan: 5 min de friccion × 20 veces/dia = 100 min perdidos.\n\n--- P | PEDIDO ---\n\nArquetipo: Ingeniero de Experiencia Laboral con formacion en UX Design aplicado a workflows de trabajo del conocimiento.\n\nFriction Audit:\n1. Registro de fricciones durante 1 dia (tipo, frecuencia, tiempo perdido)\n2. Clasificacion: eliminar / automatizar / simplificar / aceptar\n3. Top 5 fricciones por impacto (tiempo × frecuencia)\n4. Plan de eliminacion para cada una del top 5\n5. Estimacion de tiempo recuperado por semana\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Friction logging: anotar cada vez que algo te frena\n- Pareto: el 20% de fricciones causa el 80% del tiempo perdido\n- UX del trabajo: cada accion frecuente deberia ser un click o menos\n- Automation-first: si se repite, automatizar\n\n--- C | CRITERIO ---\n\nFormato: registro + top 5 + plan de eliminacion.\nTono: analitico.\nAudiencia: profesional que siente que pierde tiempo en tonterias.\nAccion: hacer el registro de fricciones manana.\n\n[checklist]\n- [ ] El registro captura tipo, frecuencia y tiempo por friccion\n- [ ] El top 5 esta ordenado por impacto real (tiempo × frecuencia)\n- [ ] Cada friccion del top 5 tiene plan de eliminacion concreto\n- [ ] El tiempo recuperado esta cuantificado por semana",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "productividad_template_system_entregables",
    "label_title": "Template System Entregables",
    "category": "productividad",
    "type": "spec",
    "content": "[inputs]\n- ENTREGABLES: {{ENTREGABLES}} > Tipos de entregables que produces regularmente\n- HERRAMIENTAS: {{HERRAMIENTAS}} > Donde creas tus entregables (Docs, Notion, etc.)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara no empezar de cero cada vez que produces un entregable recurrente. Un sistema de templates reduce el tiempo de creacion en 60% y asegura consistencia de calidad.\n\n--- P | PEDIDO ---\n\nArquetipo: Disenador de Sistemas de Productividad con experiencia en estandarizacion de entregables para equipos de consultoria y creacion de contenido.\n\nSistema de Templates:\n1. Inventario de entregables recurrentes (tipo, frecuencia, tiempo actual)\n2. Template para cada uno: estructura, secciones, placeholders\n3. Checklist de calidad por template\n4. Nomenclatura y organizacion de templates\n5. Ritual de actualizacion trimestral\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- 80/20: los 5 entregables mas frecuentes primero\n- Template = estructura + placeholders + checklist\n- Living documents: templates se mejoran con cada uso\n- Naming convention: TIPO_FECHA_VERSION\n\n--- C | CRITERIO ---\n\nFormato: biblioteca de templates + guia de uso + ritual de mantenimiento.\nTono: sistematico.\nAudiencia: profesional que produce los mismos tipos de entregable repetidamente.\nAccion: crear el primer template hoy.\n\n[checklist]\n- [ ] Los 5 entregables mas frecuentes estan inventariados\n- [ ] Cada template tiene estructura + placeholders + checklist\n- [ ] La nomenclatura es consistente y busqueda-friendly\n- [ ] El ritual de actualizacion esta calendarizado",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "productividad_accountability_system",
    "label_title": "Accountability System",
    "category": "productividad",
    "type": "spec",
    "content": "[inputs]\n- OBJETIVOS: {{OBJETIVOS}} > Objetivos en los que necesitas accountability\n- HORIZONTE: {{HORIZONTE}} > Horizonte temporal (mensual, trimestral, anual)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara mantener consistencia en objetivos de largo plazo cuando la motivacion fluctua. La accountability externa es el multiplicador mas infravalorado de la productividad personal.\n\n--- P | PEDIDO ---\n\nArquetipo: Coach de Accountability y Rendimiento con experiencia en coaching ejecutivo y diseno de sistemas de seguimiento para profesionales independientes.\n\nSistema de Accountability:\n1. Definicion de objetivos con formato SMART y deadline\n2. Buddy system o accountability partner (criterios de seleccion)\n3. Cadencia de check-ins: frecuencia, formato, duracion\n4. Dashboard personal de progreso (simple, visual)\n5. Protocolo de recuperacion ante desvios\n6. Rewards and consequences (internos y externos)\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Public commitment: compartir objetivos aumenta completion rate 65%\n- Check-in cadence: semanal para metas mensuales, mensual para trimestrales\n- Progress > perfection: medir avance, no resultado final\n- Failure protocol: no castigar, analizar y ajustar\n\n--- C | CRITERIO ---\n\nFormato: sistema completo con dashboard + cadencia + protocolo.\nTono: motivador-estructurado.\nAudiencia: profesional que empieza fuerte pero pierde momentum.\nAccion: identificar accountability partner y agendar primer check-in.\n\n[checklist]\n- [ ] Los objetivos son SMART y tienen deadline\n- [ ] Los criterios para el accountability partner son claros\n- [ ] La cadencia de check-ins es realista y sostenible\n- [ ] El protocolo de recuperacion es compasivo pero firme",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "productividad_context_switching_minimizar",
    "label_title": "Context Switching Minimizar",
    "category": "productividad",
    "type": "spec",
    "content": "[inputs]\n- ENTORNO: {{ENTORNO}} > Entorno de trabajo (oficina, remoto, hibrido)\n- INTERRUPCIONES: {{INTERRUPCIONES}} > Las 3 interrupciones mas frecuentes\n- HERRAMIENTAS: {{HERRAMIENTAS}} > (opcional) Herramientas de comunicacion del equipo\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara reducir el context switching que destruye la productividad. Cada interrupcion cuesta 23 minutos de recuperacion. Con 10 switches diarios, pierdes 3.8 horas.\n\n--- P | PEDIDO ---\n\nArquetipo: Neurocientifica Aplicada a Productividad con investigacion en atencion sostenida y diseno de entornos de trabajo de baja interrupcion.\n\nPlan anti-context-switching:\n1. Diagnostico: cuantos switches por dia y cuales son evitables\n2. Clasificacion de interrupciones: internas (mente) vs externas (otros)\n3. Estrategias por tipo: timeboxing, batching, notification management\n4. Diseno de 'modo focus': que activar/desactivar al entrar en deep work\n5. Comunicacion con equipo: como proteger focus sin aislarse\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Attention residue: el cerebro sigue procesando la tarea anterior\n- Notification audit: eliminar el 80% de notificaciones\n- Focus mode: configuracion de herramientas para silencio selectivo\n- Proactive communication: avisar cuando estas en deep work\n\n--- C | CRITERIO ---\n\nFormato: diagnostico + plan de accion + configuracion de herramientas.\nTono: basado en ciencia.\nAudiencia: profesional en entorno de alta interrupcion.\nAccion: configurar modo focus y comunicar a equipo esta semana.\n\n[checklist]\n- [ ] Los switches diarios estan cuantificados\n- [ ] Las interrupciones estan clasificadas como internas/externas\n- [ ] El modo focus tiene configuracion concreta por herramienta\n- [ ] La comunicacion con equipo preserva relaciones",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "productividad_procrastinacion_protocolo",
    "label_title": "Procrastinacion Protocolo",
    "category": "productividad",
    "type": "spec",
    "content": "[inputs]\n- TAREA: {{TAREA}} > Tarea que estas procrastinando\n- TIEMPO_BLOQUEADO: {{TIEMPO_BLOQUEADO}} > (opcional) Cuanto tiempo llevas posponiendola\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara desbloquear la ejecucion cuando la procrastinacion paraliza. La procrastinacion no es pereza — es aversion al malestar emocional asociado a la tarea. Se trata con protocolo, no con fuerza de voluntad.\n\n--- P | PEDIDO ---\n\nArquetipo: Psicologo Conductual especializado en procrastinacion y autoregulacion, con experiencia en Terapia Cognitivo-Conductual aplicada a rendimiento profesional.\n\nProtocolo anti-procrastinacion:\n1. Diagnostico: que tarea procrastinas y que emocion la bloquea\n2. Tecnica de 2 minutos: empezar con la version mas pequena posible\n3. Implementation intentions: cuando X ocurra, hare Y\n4. Temptation bundling: combinar tarea dificil con algo agradable\n5. Accountability trigger: quien sabra si no lo hago\n6. Recompensa inmediata por completar\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Emotion regulation: la procrastinacion es avoidance emocional\n- Tiny habits: hacer la version de 2 minutos primero\n- Pre-commitment: eliminar opciones de escape\n- Self-compassion: castigarse empeora la procrastinacion\n\n--- C | CRITERIO ---\n\nFormato: protocolo paso a paso + diagnostico emocional.\nTono: compasivo pero firme.\nAudiencia: profesional que sabe que deberia pero no puede.\nAccion: ejecutar los primeros 2 minutos de la tarea bloqueada AHORA.\n\n[checklist]\n- [ ] La emocion bloqueante esta identificada\n- [ ] La version de 2 minutos es genuinamente ejecutable\n- [ ] El implementation intention es especifico\n- [ ] La recompensa es inmediata, no diferida",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "productividad_meeting_note_to_action",
    "label_title": "Meeting Note To Action",
    "category": "productividad",
    "type": "spec",
    "content": "[inputs]\n- NOTAS: {{NOTAS}} > Notas de la reunion (texto o transcripcion)\n- PARTICIPANTES: {{PARTICIPANTES}} > Quienes asistieron\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara convertir notas de reunion desordenadas en acciones concretas en 5 minutos. El 80% del valor de una reunion se pierde si no se captura y distribuye en las primeras 2 horas.\n\n--- P | PEDIDO ---\n\nArquetipo: Facilitador de Reuniones con experiencia en captura de decisiones, action items y knowledge management para equipos agiles.\n\nDe notas a acciones:\n1. Extraer decisiones tomadas (que, quien, cuando)\n2. Extraer action items (tarea, responsable, deadline)\n3. Extraer preguntas abiertas que requieren seguimiento\n4. Extraer insights o informacion nueva relevante\n5. Generar resumen ejecutivo de 5 lineas para los que no asistieron\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Quad-Doc: decisiones + tareas + riesgos + preguntas\n- Action item format: VERBO + OBJETO + RESPONSABLE + FECHA\n- 2-hour rule: distribuir resumen dentro de 2 horas de la reunion\n- If no action items, the meeting was an email\n\n--- C | CRITERIO ---\n\nFormato: Quad-Doc (4 tablas) + resumen de 5 lineas.\nTono: preciso, sin narrativa.\nAudiencia: asistentes + stakeholders que no asistieron.\nAccion: distribuir dentro de 2 horas de la reunion.\n\n[checklist]\n- [ ] Cada decision tiene owner y fecha\n- [ ] Cada action item tiene responsable y deadline\n- [ ] Las preguntas abiertas tienen quien las resuelve\n- [ ] El resumen permite entender sin haber asistido",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "productividad_pomodoro_avanzado_personalizado",
    "label_title": "Pomodoro Avanzado Personalizado",
    "category": "productividad",
    "type": "spec",
    "content": "[inputs]\n- TIPO_TRABAJO: {{TIPO_TRABAJO}} > Tu tipo de trabajo predominante (creativo, analitico, comunicacion)\n- ATENCION_ACTUAL: {{ATENCION_ACTUAL}} > (opcional) Cuanto tiempo puedes concentrarte sin distraccion actualmente\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara implementar un sistema Pomodoro personalizado a tu cronobiologia y tipo de trabajo. El Pomodoro clasico (25/5) no es optimo para todos — la neurociencia sugiere adaptar los ciclos.\n\n--- P | PEDIDO ---\n\nArquetipo: Especialista en Tecnicas de Atencion Focalizada con conocimiento en neurociencia de la atencion y ciclos ultradianos.\n\nPomodoro Personalizado:\n1. Diagnostico de attention span actual (estimacion)\n2. Ciclo optimo recomendado segun tipo de trabajo:\n   - Deep work creativo: bloques de 52/17 o 90/20\n   - Deep work analitico: bloques de 45/10\n   - Shallow work: bloques de 25/5 clasico\n3. Protocolo de inicio de sesion (ritual de 1 min)\n4. Protocolo entre sesiones (que hacer en el descanso)\n5. Tracking: sesiones/dia como KPI de productividad\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Ultradian rhythm: ciclos naturales de 90 min\n- Progressive overload: empezar con ciclos cortos, ir extendiendo\n- Active rest: descansos con movimiento, no con pantalla\n- Deep work hours/day: medir como atleta mide km\n\n--- C | CRITERIO ---\n\nFormato: tabla de ciclos por tipo de trabajo + protocolos.\nTono: cientifico-practico.\nAudiencia: profesional que ya conoce Pomodoro pero lo abandono.\nAccion: probar el ciclo recomendado manana.\n\n[checklist]\n- [ ] Los ciclos estan personalizados por tipo de trabajo\n- [ ] Los protocolos de inicio y descanso son concretos\n- [ ] El tracking es simple (no requiere app compleja)\n- [ ] La progresion es gradual, no heroica",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "productividad_morning_planning_5min",
    "label_title": "Morning Planning 5min",
    "category": "productividad",
    "type": "spec",
    "content": "[inputs]\n- HORA: {{HORA}} > Hora a la que empiezas a trabajar\n- HERRAMIENTAS: {{HERRAMIENTAS}} > Donde gestionas calendario y tareas\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara empezar cada dia con intencion en lugar de reactividad. 5 minutos de planificacion matutina ahorran 60 minutos de improvisacion durante el dia.\n\n--- P | PEDIDO ---\n\nArquetipo: Coach de Planificacion Diaria con metodologia Ivy Lee y experiencia en diseno de rituales matutinos para profesionales de alto rendimiento.\n\nPlanificacion Matutina de 5 minutos:\n1. Revisar calendario: que es inamovible hoy\n2. Top 3 prioridades: si solo logro 3 cosas, cuales importan mas\n3. Time blocking: asignar las 3 prioridades a bloques del dia\n4. Anticipar fricciones: que podria desviarme y como prevenirlo\n5. Intencion del dia: como quiero sentirme al terminar\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Ivy Lee method: 6 tareas max, ordenadas por prioridad\n- MIT (Most Important Tasks): las 3 que mueven la aguja\n- Eat the frog: la tarea mas dificil primero\n- Intention setting: claridad de proposito antes de accion\n\n--- C | CRITERIO ---\n\nFormato: template de 5 minutos imprimible.\nTono: energizante y claro.\nAudiencia: profesional que empieza el dia revisando email.\nAccion: usar el template manana a las {{HORA}}.\n\n[checklist]\n- [ ] El template es completable en 5 minutos reales\n- [ ] Las top 3 prioridades estan vinculadas a time blocks\n- [ ] La anticipacion de fricciones es especifica\n- [ ] La intencion del dia es personal y motivadora",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "productividad_async_communication_protocol",
    "label_title": "Async Communication Protocol",
    "category": "productividad",
    "type": "spec",
    "content": "[inputs]\n- EQUIPO: {{EQUIPO}} > Tamano y distribucion del equipo\n- HERRAMIENTAS: {{HERRAMIENTAS}} > Herramientas de comunicacion actuales (Slack, Teams, email, etc.)\n- ZONA_HORARIA: {{ZONA_HORARIA}} > (opcional) Zonas horarias del equipo\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara comunicarte de forma asincrona efectiva, reduciendo reuniones y maximizando el tiempo de deep work del equipo. Async-first es el nuevo default del trabajo remoto e hibrido.\n\n--- P | PEDIDO ---\n\nArquetipo: Disenador de Comunicacion Asincrona con experiencia en equipos distribuidos globalmente y culturas de trabajo remote-first (GitLab, Automattic style).\n\nProtocolo de Comunicacion Asincrona:\n1. Decision tree: cuando async vs sync (flowchart)\n2. Formato estandar para updates async (contexto, pedido, deadline)\n3. Templates: status update, decision request, FYI, escalation\n4. SLA de respuesta por tipo de mensaje (urgente: 2h, normal: 24h, FYI: 48h)\n5. Herramientas recomendadas por tipo de comunicacion\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Async-first: todo es async por default, sync solo cuando es necesario\n- Write things down: si no esta escrito, no existe\n- Low-context communication: asume que el receptor no tiene contexto\n- Decision records: toda decision async queda documentada\n\n--- C | CRITERIO ---\n\nFormato: protocolo + decision tree + 4 templates.\nTono: profesional, clear-writing.\nAudiencia: equipo que transiciona a async.\nAccion: adoptar el decision tree y 1 template esta semana.\n\n[checklist]\n- [ ] El decision tree async/sync es claro y accionable\n- [ ] Los 4 templates cubren el 80% de comunicaciones\n- [ ] Los SLAs son realistas para el contexto del equipo\n- [ ] El protocolo no genera mas burocracia que la que elimina",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "productividad_energia_mapping_semanal",
    "label_title": "Energia Mapping Semanal",
    "category": "productividad",
    "type": "spec",
    "content": "[inputs]\n- TIPO_TRABAJO: {{TIPO_TRABAJO}} > Tu tipo de trabajo predominante\n- HORARIO: {{HORARIO}} > Tu horario laboral tipico\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara mapear tu energia real a lo largo de la semana e identificar patrones que te permitan colocar trabajo de alto valor en momentos de alta energia. No todos los dias son iguales.\n\n--- P | PEDIDO ---\n\nArquetipo: Analista de Rendimiento Personal con formacion en cronobiologia y ciencia del rendimiento aplicada al trabajo del conocimiento.\n\nEnergy Mapping Semanal:\n1. Registro de energia por hora durante 5 dias (escala 1-5)\n2. Identificacion de patrones: picos, valles, transiciones por dia\n3. Mapa semanal: que dias son mejores para que tipo de trabajo\n4. Recomendacion de distribucion de tareas por dia/hora\n5. Factores que afectan energia: sueno, comida, ejercicio, reuniones\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Energy audit: registrar nivel de energia cada 2 horas por 5 dias\n- Pattern recognition: buscar consistencias entre dias\n- Task-energy alignment: tareas de alta demanda en picos\n- Energy management > time management\n\n--- C | CRITERIO ---\n\nFormato: mapa semanal visual + recomendaciones.\nTono: cientifico-personal.\nAudiencia: profesional que quiere trabajar CON su energia, no contra ella.\nAccion: empezar el registro de energia manana.\n\n[checklist]\n- [ ] El registro cubre al menos 5 dias laborales\n- [ ] Los patrones estan identificados (no solo datos crudos)\n- [ ] La recomendacion de distribucion es especifica por dia\n- [ ] Los factores que afectan energia estan mapeados",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "pensamiento_piramide_minto_estructura",
    "label_title": "Piramide Minto Estructura",
    "category": "pensamiento",
    "type": "spec",
    "content": "[inputs]\n- TEMA: {{TEMA}} > Tema o mensaje a estructurar\n- AUDIENCIA: {{AUDIENCIA}} > Audiencia objetivo\n- FORMATO: {{FORMATO}} > (opcional) Formato de salida (email, presentacion, memo)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara comunicar con claridad ejecutiva: conclusion primero, evidencia despues. La piramide de Minto elimina el 70% de malentendidos en comunicacion profesional.\n\n--- P | PEDIDO ---\n\nArquetipo: Consultor Senior de McKinsey-style Structured Communication con experiencia en presentaciones a boards y comites ejecutivos (15+ anos).\n\nEstructurar mensaje usando Piramide de Minto:\n1. Situacion, Complicacion y Pregunta clave (SCQ)\n2. Respuesta/conclusion principal en 1 oracion\n3. Argumentos de soporte agrupados logicamente (MECE)\n4. Evidencia por argumento con nivel de confianza\n5. Adaptacion al formato solicitado: {{FORMATO}}\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Barbara Minto Pyramid Principle\n- MECE: Mutuamente Excluyente, Colectivamente Exhaustivo\n- Top-down communication: conclusion > argumentos > evidencia\n- Cada nivel responde al \"por que\" del nivel superior\n\n--- C | CRITERIO ---\n\nFormato: {{FORMATO}} (email/presentacion/memo/documento). Tono: ejecutivo, directo. Audiencia: {{AUDIENCIA}}. Accion: que la audiencia entienda el mensaje y actue sin reuniones adicionales.\n\n[checklist]\n- [ ] La conclusion principal cabe en 1 oracion\n- [ ] Los argumentos son MECE\n- [ ] Cada nivel soporta el superior\n- [ ] Adaptado a la audiencia especificada",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "pensamiento_issue_tree_problema",
    "label_title": "Issue Tree Problema",
    "category": "pensamiento",
    "type": "spec",
    "content": "[inputs]\n- PROBLEMA: {{PROBLEMA}} > Problema o pregunta a descomponer\n- CONTEXTO: {{CONTEXTO}} > Contexto relevante del problema\n- PROFUNDIDAD: {{PROFUNDIDAD}} > (opcional) Niveles de profundidad (2-4)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara descomponer problemas complejos en partes analizables. Sin estructura, los problemas complejos paralizan. Con issue tree, cada rama es una hipotesis testable.\n\n--- P | PEDIDO ---\n\nArquetipo: Consultor Estrategico Senior con experiencia en problem-solving estructurado para Fortune 500 y metodologia hypothesis-driven.\n\nIssue Tree MECE:\n1. Problema reformulado como pregunta accionable\n2. Primer nivel de descomposicion MECE (3-5 ramas)\n3. Profundizar hasta hipotesis testables (3+ niveles)\n4. Priorizar ramas por impacto potencial\n5. Datos necesarios para validar cada hipotesis\n6. Plan de investigacion por rama priorizada\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Hypothesis-driven problem solving\n- MECE decomposition (sin solapamiento, sin vacios)\n- 80/20: priorizar las ramas de mayor impacto\n- Test-and-learn: cada hipotesis con metodo de validacion\n\n--- C | CRITERIO ---\n\nFormato: arbol de issues con 3+ niveles + tabla de priorizacion. Tono: analitico. Audiencia: equipo que necesita resolver el problema. Accion: comenzar validacion por la rama de mayor impacto.\n\n[checklist]\n- [ ] El problema esta formulado como pregunta accionable\n- [ ] La descomposicion es MECE verificable\n- [ ] Las hipotesis son testables con datos disponibles\n- [ ] Las ramas estan priorizadas por impacto",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "pensamiento_primeros_principios",
    "label_title": "Primeros Principios",
    "category": "pensamiento",
    "type": "spec",
    "content": "[inputs]\n- SUPOSICION: {{SUPOSICION}} > Creencia o practica a cuestionar\n- INDUSTRIA: {{INDUSTRIA}} > Industria o contexto\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara cuestionar suposiciones arraigadas y reconstruir soluciones desde verdades fundamentales. La innovacion real viene de preguntarse 'que es verdad' en lugar de 'que es habitual'.\n\n--- P | PEDIDO ---\n\nArquetipo: Pensador de Primeros Principios con formacion en fisica teorica y experiencia en innovacion disruptiva (estilo Elon Musk / Richard Feynman).\n\nAnalisis de primeros principios:\n1. Listar todas las suposiciones detras de la practica actual\n2. Cuestionar cada suposicion: verdad fundamental o convencion?\n3. Identificar las 3-5 verdades fundamentales e inmutables\n4. Reconstruir solucion desde esas verdades (ignorando convenciones)\n5. Comparar solucion reconstruida vs practica convencional\n6. Evaluar viabilidad de la solucion reconstruida\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Razonamiento de primeros principios: deconstruir > cuestionar > reconstruir\n- Distinguir: leyes fisicas vs convenciones sociales vs habitos industriales\n- Pensamiento contrafactual: que haria alguien que empieza de cero\n- Reality check: la solucion es mejor O solo diferente\n\n--- C | CRITERIO ---\n\nFormato: tabla de suposiciones cuestionadas + solucion reconstruida + comparacion. Tono: retador pero riguroso. Audiencia: innovadores y tomadores de decision. Accion: evaluar si la solucion reconstruida merece un piloto.\n\n[checklist]\n- [ ] Cada suposicion esta clasificada (verdad vs convencion)\n- [ ] La solucion reconstruida es genuinamente diferente\n- [ ] La comparacion es honesta (incluye trade-offs)\n- [ ] La evaluacion de viabilidad es realista",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "pensamiento_modelos_mentales_latticework",
    "label_title": "Modelos Mentales Latticework",
    "category": "pensamiento",
    "type": "spec",
    "content": "[inputs]\n- SITUACION: {{SITUACION}} > Situacion o decision a analizar\n- DOMINIO: {{DOMINIO}} > Dominio principal (negocios, tech, personal)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara analizar situaciones complejas usando multiples lentes. Un solo modelo mental es un martillo buscando clavos. Multiples modelos revelan patrones invisibles.\n\n--- P | PEDIDO ---\n\nArquetipo: Estratega Multidisciplinario con formacion en economia conductual, sistemas complejos y toma de decisiones (estilo Charlie Munger).\n\nAnalisis multi-modelo:\n1. Seleccionar 3-5 modelos mentales relevantes para la situacion\n2. Aplicar cada modelo como lente de analisis\n3. Mapear convergencias entre modelos (patrones confirmados)\n4. Mapear divergencias (tensiones no resueltas)\n5. Identificar puntos ciegos que un solo modelo no cubre\n6. Sintetizar insight integrado con recomendacion\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nModelos mentales disponibles:\n- Inversion (pensar al reves), Second-order thinking, Circle of competence\n- Opportunity cost, Margin of safety, Comparative advantage\n- Network effects, Feedback loops, Regression to the mean\n- Sunk cost fallacy, Survivorship bias, Dunning-Kruger\n- Seleccionar los mas relevantes para la situacion\n\n--- C | CRITERIO ---\n\nFormato: analisis por modelo + tabla de convergencias/divergencias + insight final. Tono: analitico-reflexivo. Audiencia: decision-maker que necesita perspectiva profunda. Accion: tomar decision informada con multiples lentes.\n\n[checklist]\n- [ ] Minimo 3 modelos aplicados con rigor\n- [ ] Las convergencias revelan patrones reales\n- [ ] Los puntos ciegos estan identificados\n- [ ] El insight integrado es accionable",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "pensamiento_socratico_examinar",
    "label_title": "Socratico Examinar",
    "category": "pensamiento",
    "type": "spec",
    "content": "[inputs]\n- IDEA: {{IDEA}} > Idea, propuesta o supuesto a examinar\n- OBJETIVO: {{OBJETIVO}} > Que buscas (validar, mejorar, desafiar, profundizar)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara examinar criticamente ideas propias o ajenas mediante preguntas sistematicas. El metodo socratico revela supuestos ocultos, contradicciones y fortalezas no articuladas.\n\n--- P | PEDIDO ---\n\nArquetipo: Facilitador Socratico y Pensador Critico con formacion filosofica y experiencia en facilitacion de debates estrategicos para equipos directivos.\n\nExamen socratico completo:\n1. Clarificar la idea tal como esta expresada\n2. Identificar supuestos implicitos (minimo 5)\n3. Cuestionar la evidencia de cada supuesto\n4. Explorar perspectivas alternativas (minimo 3)\n5. Evaluar implicaciones y consecuencias\n6. Formular la idea refinada post-examen o rechazarla con fundamento\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo socratico — 6 tipos de preguntas:\n- Clarificacion: que quieres decir exactamente con...\n- Supuestos: que estas dando por sentado...\n- Evidencia: que datos soportan esto...\n- Perspectiva: como lo veria alguien que...\n- Implicaciones: si esto es cierto, entonces...\n- Meta-pregunta: por que es importante esta pregunta...\n\n--- C | CRITERIO ---\n\nFormato: 10+ preguntas socraticas aplicadas + supuestos revelados + idea refinada. Tono: retador pero constructivo. Audiencia: el autor de la idea. Accion: decidir si la idea se fortalece, se ajusta o se descarta.\n\n[checklist]\n- [ ] Minimo 5 supuestos implicitos identificados\n- [ ] Minimo 3 perspectivas alternativas exploradas\n- [ ] La idea post-examen es mas solida (o descartada con fundamento)\n- [ ] Las preguntas son genuinamente desafiantes, no cosmeticas",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "pensamiento_segundo_orden_consecuencias",
    "label_title": "Segundo Orden Consecuencias",
    "category": "pensamiento",
    "type": "spec",
    "content": "[inputs]\n- DECISION: {{DECISION}} > Decision o accion a analizar\n- HORIZONTE: {{HORIZONTE}} > Horizonte temporal de analisis\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara ir mas alla del impacto inmediato y descubrir efectos cascada. Las decisiones de primer orden son obvias; el valor estrategico esta en las consecuencias de segundo y tercer orden.\n\n--- P | PEDIDO ---\n\nArquetipo: Analista de Sistemas Complejos con formacion en pensamiento sistemico (Donella Meadows) y estrategia de largo plazo (Howard Marks).\n\nAnalisis de consecuencias de segundo orden:\n1. Efectos de primer orden: impactos inmediatos y obvios\n2. Efectos de segundo orden: consecuencias de las consecuencias\n3. Efectos de tercer orden: impactos sistemicos y emergentes\n4. Loops de retroalimentacion: positivos y negativos\n5. Riesgos sistemicos y oportunidades ocultas\n6. Mapa visual de cascada de consecuencias\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- And then what? (repetir para cada consecuencia)\n- Feedback loop analysis: que se refuerza, que se amortigua\n- Unintended consequences checklist\n- Pre-mortem: si esto sale mal en segundo orden, que paso\n\n--- C | CRITERIO ---\n\nFormato: mapa de consecuencias en 3 niveles + loops identificados + oportunidades/riesgos. Tono: estrategico. Audiencia: decision-maker que necesita ver mas alla. Accion: ajustar la decision con perspectiva de largo plazo.\n\n[checklist]\n- [ ] Los 3 niveles de consecuencias estan articulados\n- [ ] Los feedback loops estan identificados\n- [ ] Las oportunidades ocultas son genuinamente no-obvias\n- [ ] Los riesgos sistemicos tienen mitigacion propuesta",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "pensamiento_pre_mortem_proyecto",
    "label_title": "Pre Mortem Proyecto",
    "category": "pensamiento",
    "type": "spec",
    "content": "[inputs]\n- PROYECTO: {{PROYECTO}} > Proyecto o iniciativa a analizar\n- PLAZO: {{PLAZO}} > Plazo estimado del proyecto\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara identificar causas de fallo ANTES de que ocurran. Es mas facil prevenir un incendio que apagarlo. El pre-mortem invierte la flecha temporal: imagina el fracaso, trabaja hacia atras.\n\n--- P | PEDIDO ---\n\nArquetipo: Facilitador de Pre-Mortem y Gestion de Riesgos con metodologia de Gary Klein y experiencia en planificacion de contingencias para proyectos criticos.\n\nPre-Mortem completo:\n1. Imaginar: el proyecto fallo completamente. Es un desastre.\n2. Generar las 10 causas mas probables de fallo\n3. Clasificar por probabilidad (1-5) e impacto (1-5)\n4. Disenar mitigaciones para las top 5 causas\n5. Crear plan de contingencia con triggers de activacion\n6. Definir early warning indicators\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Gary Klein Pre-Mortem technique\n- Prospective hindsight: imaginar el futuro fallo aumenta la precision del analisis en 30%\n- Inversion: no que puede salir bien, sino que PUEDE salir mal\n- Each risk gets: trigger, mitigation, contingency, owner\n\n--- C | CRITERIO ---\n\nFormato: matriz de riesgos + plan de mitigacion + early warnings. Tono: pragmatico, sin alarmismo. Audiencia: lider del proyecto. Accion: implementar las 3 mitigaciones de mayor impacto esta semana.\n\n[checklist]\n- [ ] Las 10 causas de fallo son plausibles (no genericas)\n- [ ] La clasificacion probabilidad x impacto usa datos reales\n- [ ] Las mitigaciones para top 5 son accionables\n- [ ] Los early warning indicators son observables",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "pensamiento_analisis_causal_fishbone",
    "label_title": "Analisis Causal Fishbone",
    "category": "pensamiento",
    "type": "spec",
    "content": "[inputs]\n- PROBLEMA: {{PROBLEMA}} > Problema o efecto a analizar\n- CONTEXTO: {{CONTEXTO}} > Contexto donde ocurre\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara identificar TODAS las causas de un problema, no solo la mas obvia. El diagrama de Ishikawa revela causas ocultas organizadas por categoria.\n\n--- P | PEDIDO ---\n\nArquetipo: Ingeniero de Calidad Senior con certificacion Six Sigma Black Belt y experiencia en analisis de causa raiz para operaciones criticas.\n\nAnalisis causal (Ishikawa/Fishbone):\n1. Definir el efecto/problema en la cabeza del pescado\n2. Categorias de causas: Personas, Procesos, Tecnologia, Medicion, Entorno, Materiales\n3. Brainstorm de causas por categoria (min. 3 por cada una)\n4. 5 Whys en las 3 causas mas probables\n5. Causa raiz confirmada con evidencia\n6. Plan de accion correctiva\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Ishikawa diagram: efecto > categorias > causas > sub-causas\n- 5 Whys: profundizar hasta la causa raiz real\n- Validacion: la causa raiz, al corregirse, elimina el efecto\n\n--- C | CRITERIO ---\n\nFormato: diagrama Ishikawa (texto) + 5 Whys + plan correctivo.\nTono: analitico, riguroso.\nAudiencia: equipo que necesita resolver el problema.\nAccion: implementar la correccion de la causa raiz principal.\n\n[checklist]\n- [ ] Min. 3 causas por categoria\n- [ ] 5 Whys aplicados a top 3 causas\n- [ ] Causa raiz tiene evidencia, no es suposicion\n- [ ] Plan correctivo tiene responsable y fecha",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "pensamiento_analogia_transferir_solucion",
    "label_title": "Analogia Transferir Solucion",
    "category": "pensamiento",
    "type": "spec",
    "content": "[inputs]\n- PROBLEMA: {{PROBLEMA}} > Problema a resolver\n- DOMINIO: {{DOMINIO}} > Dominio donde ocurre el problema\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara resolver un problema transfiriendo soluciones de dominios completamente diferentes. Las mejores innovaciones vienen de aplicar lo que funciona en un campo a otro donde nadie lo ha intentado.\n\n--- P | PEDIDO ---\n\nArquetipo: Pensador Analogico y Consultor de Innovacion Lateral con experiencia en transferencia de conocimiento cross-industry.\n\nPensamiento por analogia:\n1. Definir el problema con precision\n2. Abstraer: cual es la estructura profunda del problema (no la superficie)\n3. Buscar analogias en 3+ dominios diferentes (naturaleza, tecnologia, arte, deportes, etc.)\n4. Para cada analogia: como se resolvio en ese dominio\n5. Transferir la solucion al contexto original\n6. Evaluar viabilidad de cada transferencia\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Analogical reasoning: estructura profunda > similitud superficial\n- Cross-domain transfer: las mejores ideas vienen de lejos\n- Biomimicry: la naturaleza ya resolvio la mayoria de problemas\n- Forced connections: conectar lo aparentemente inconectable\n\n--- C | CRITERIO ---\n\nFormato: 3+ analogias con solucion transferida + evaluacion de viabilidad.\nTono: creativo-analitico.\nAudiencia: innovador o problem-solver.\nAccion: prototipar la analogia mas viable.\n\n[checklist]\n- [ ] Min. 3 analogias de dominios genuinamente diferentes\n- [ ] La estructura profunda del problema esta articulada\n- [ ] Cada transferencia tiene evaluacion de viabilidad\n- [ ] Al menos 1 analogia es no-obvia y prometedora",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "pensamiento_inversion_pensar_al_reves",
    "label_title": "Inversion Pensar Al Reves",
    "category": "pensamiento",
    "type": "spec",
    "content": "[inputs]\n- OBJETIVO: {{OBJETIVO}} > Objetivo que quieres lograr\n- CONTEXTO: {{CONTEXTO}} > Contexto donde persigues este objetivo\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara descubrir soluciones pensando al reves: en vez de 'como logro X', preguntar 'como garantizo que X falle'. Invertir el problema revela riesgos y soluciones invisibles desde el enfoque directo.\n\n--- P | PEDIDO ---\n\nArquetipo: Estratega de Inversion Mental con formacion en teoria de decisiones y resolucion de problemas contraintuitivos (estilo Charlie Munger).\n\nInversion:\n1. Definir el objetivo positivo: que quieres lograr\n2. Invertir: como GARANTIZARIAS que falle?\n3. Listar las 10 formas mas seguras de fracasar\n4. Para cada una: es algo que estas haciendo actualmente?\n5. Invertir de nuevo: que acciones previenen cada fracaso\n6. Plan: priorizar las prevenciones de mayor impacto\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Charlie Munger: 'Dime donde voy a morir para nunca ir ahi'\n- Inversion thinking: el camino al exito se ve mas claro desde el fracaso\n- Anti-goals: definir que NO hacer es tan valioso como definir que SI\n\n--- C | CRITERIO ---\n\nFormato: lista de fracasos + inversiones + plan preventivo.\nTono: contraintuitivo, revelador.\nAudiencia: decision-maker.\nAccion: eliminar la causa de fracaso #1 esta semana.\n\n[checklist]\n- [ ] Las 10 formas de fracasar son plausibles\n- [ ] Al menos 3 son cosas que se estan haciendo actualmente\n- [ ] Las prevenciones son accionables\n- [ ] El plan esta priorizado por impacto",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "pensamiento_steel_man_fortalecer_argumento",
    "label_title": "Steel Man Fortalecer Argumento",
    "category": "pensamiento",
    "type": "spec",
    "content": "[inputs]\n- POSICION: {{POSICION}} > Posicion o argumento a fortalecer\n- CONTEXTO: {{CONTEXTO}} > Contexto del debate o decision\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara fortalecer una posicion construyendo la version mas fuerte posible del argumento contrario. Si puedes defender la posicion opuesta mejor que tu oponente, realmente entiendes el problema.\n\n--- P | PEDIDO ---\n\nArquetipo: Debatedor Profesional y Analista de Argumentacion con experiencia en debate competitivo y analisis de politicas publicas.\n\nSteel Man:\n1. Presenta la posicion original\n2. Construye el MEJOR argumento posible de la posicion contraria (steel man)\n3. Identifica donde el steel man tiene razon genuina\n4. Identifica donde el steel man falla a pesar de ser fuerte\n5. Fortalece la posicion original incorporando las verdades del steel man\n6. Presenta la posicion final — mas robusta que la original\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Steel man > straw man: fortalecer al oponente, no debilitarlo\n- Ideological Turing test: puedes defender la otra posicion tan bien que convenza al otro lado?\n- Integration > refutation: incorporar verdades del oponente\n\n--- C | CRITERIO ---\n\nFormato: posicion original > steel man > analisis > posicion fortalecida.\nTono: intelectualmente honesto.\nAudiencia: decision-maker o debatedor.\nAccion: presentar la posicion fortalecida con confianza.\n\n[checklist]\n- [ ] El steel man es genuinamente fuerte (no una caricatura)\n- [ ] Las verdades del oponente estan reconocidas\n- [ ] La posicion final incorpora insights del steel man\n- [ ] El resultado es mas robusto que la posicion original",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "pensamiento_red_team_atacar_plan",
    "label_title": "Red Team Atacar Plan",
    "category": "pensamiento",
    "type": "spec",
    "content": "[inputs]\n- PLAN: {{PLAN}} > Plan, propuesta o estrategia a atacar\n- ADVERSARIO: {{ADVERSARIO}} > (opcional) Quien o que es el principal adversario/riesgo\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara encontrar vulnerabilidades en un plan, propuesta o estrategia ANTES de que el mercado o la realidad las encuentre por ti. Mejor fallar en la simulacion que en la ejecucion.\n\n--- P | PEDIDO ---\n\nArquetipo: Red Team Leader con experiencia en war gaming estrategico, analisis de vulnerabilidades y stress testing de planes de negocio.\n\nRed Team Analysis:\n1. Recibir el plan/propuesta a atacar\n2. Asumir el rol del adversario: competidor, mercado, regulador, Murphy's Law\n3. Identificar 10 vectores de ataque (debilidades explotables)\n4. Simular 3 escenarios de ataque (como destruirias este plan si fueras competidor)\n5. Clasificar vulnerabilidades por severidad (critica/alta/media/baja)\n6. Recomendar defensas para las top 5 vulnerabilidades\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Red teaming: pensar como el adversario\n- Assume breach: asumir que algo va a salir mal\n- Cascading failures: como un fallo pequeno se convierte en grande\n- Mitigation > prevention: no puedes prevenir todo, pero puedes prepararte\n\n--- C | CRITERIO ---\n\nFormato: 10 vulnerabilidades + 3 escenarios de ataque + defensas.\nTono: adversarial pero constructivo.\nAudiencia: lider del plan.\nAccion: implementar las defensas de las 3 vulnerabilidades criticas.\n\n[checklist]\n- [ ] Los 10 vectores de ataque son plausibles\n- [ ] Los escenarios son realistas, no catastrofistas\n- [ ] Las vulnerabilidades estan clasificadas por severidad\n- [ ] Las defensas son implementables con recursos actuales",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "pensamiento_design_thinking_problema",
    "label_title": "Design Thinking Problema",
    "category": "pensamiento",
    "type": "spec",
    "content": "[inputs]\n- PROBLEMA: {{PROBLEMA}} > Problema u oportunidad a abordar\n- USUARIO: {{USUARIO}} > Quien tiene el problema (perfil)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara abordar problemas complejos centrados en el usuario con el proceso de Design Thinking: empatizar, definir, idear, prototipar, testear.\n\n--- P | PEDIDO ---\n\nArquetipo: Design Thinker Senior con certificacion de IDEO/Stanford d.school y experiencia en facilitacion de procesos de innovacion centrada en el usuario.\n\nDesign Thinking aplicado:\n1. Empatizar: quien tiene el problema? que siente? que necesita realmente?\n2. Definir: reformular el problema como 'How Might We...' (HMW)\n3. Idear: generar 20+ soluciones sin filtro (diverger)\n4. Converger: seleccionar top 3 por deseabilidad × viabilidad × factibilidad\n5. Prototipar: definir el MVP mas rapido para validar la idea #1\n6. Testear: como y con quien validar el prototipo\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Stanford d.school 5-step process\n- HMW (How Might We): reformular problemas como oportunidades\n- Diverge then converge: primero cantidad, despues calidad\n- Fail fast: prototipar rapido para aprender rapido\n\n--- C | CRITERIO ---\n\nFormato: proceso completo con HMW + 20 ideas + top 3 + plan de prototipo.\nTono: creativo-estructurado.\nAudiencia: equipo de innovacion o profesional que enfrenta problema complejo.\nAccion: lanzar el prototipo de la idea #1.\n\n[checklist]\n- [ ] El usuario del problema esta perfilado con empatia\n- [ ] El HMW es abierto pero accionable\n- [ ] Hay 20+ ideas generadas (divergencia real)\n- [ ] El prototipo es buildable en 1 semana o menos",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "pensamiento_systems_thinking_mapa",
    "label_title": "Systems Thinking Mapa",
    "category": "pensamiento",
    "type": "spec",
    "content": "[inputs]\n- SISTEMA: {{SISTEMA}} > Sistema a analizar (organizacion, proceso, mercado, etc.)\n- PROBLEMA: {{PROBLEMA}} > Problema sistemico que se manifiesta\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara ver el sistema completo en lugar de partes aisladas. Los problemas mas dificiles son sistemicos: no se resuelven arreglando una pieza, sino entendiendo las conexiones.\n\n--- P | PEDIDO ---\n\nArquetipo: Analista de Sistemas Complejos con formacion en dinamica de sistemas (Donella Meadows, Peter Senge) y modelado de sistemas socio-tecnicos.\n\nSystems Map:\n1. Identificar los elementos clave del sistema\n2. Mapear relaciones causales entre elementos (A causa B, B refuerza C)\n3. Identificar feedback loops: positivos (refuerzo) y negativos (balance)\n4. Encontrar leverage points: donde una intervencion pequena tiene impacto grande\n5. Identificar delays: donde el efecto tarda en manifestarse\n6. Recomendar intervenciones en los leverage points\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Causal loop diagrams: visualizar relaciones causa-efecto\n- Stock and flow: que se acumula, que fluye\n- Donella Meadows' 12 leverage points\n- The Fifth Discipline: mental models, shared vision, systems thinking\n\n--- C | CRITERIO ---\n\nFormato: mapa de sistema (texto) + loops + leverage points + intervenciones.\nTono: sistemico, no reduccionista.\nAudiencia: lider que necesita ver el big picture.\nAccion: intervenir en el leverage point #1.\n\n[checklist]\n- [ ] Los elementos clave del sistema estan identificados\n- [ ] Los feedback loops son explicitos\n- [ ] Los leverage points estan priorizados\n- [ ] Las intervenciones son en los puntos de apalancamiento, no en los sintomas",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "pensamiento_six_hats_perspectivas",
    "label_title": "Six Hats Perspectivas",
    "category": "pensamiento",
    "type": "spec",
    "content": "[inputs]\n- TEMA: {{TEMA}} > Tema, decision o situacion a analizar\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara analizar una situacion desde 6 perspectivas distintas de forma estructurada. Los Six Thinking Hats de De Bono eliminan la confusion de mezclar logica con emociones con creatividad.\n\n--- P | PEDIDO ---\n\nArquetipo: Facilitador de Pensamiento Paralelo con certificacion en Six Thinking Hats de Edward de Bono y experiencia en facilitacion de decisiones para comites directivos.\n\nSix Thinking Hats:\n1. Blanco (Datos): que sabemos? que falta? solo hechos.\n2. Rojo (Emociones): que sentimos? intuiciones, temores, entusiasmo. Sin justificar.\n3. Negro (Critica): que puede salir mal? riesgos, debilidades, peligros.\n4. Amarillo (Optimismo): que puede salir bien? beneficios, oportunidades.\n5. Verde (Creatividad): que alternativas existen? ideas nuevas, provocaciones.\n6. Azul (Control): resumen, proximos pasos, decision.\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Edward de Bono Six Hats: pensamiento paralelo, no adversarial\n- Cada hat por separado: no mezclar perspectivas\n- Secuencia recomendada: Azul > Blanco > Rojo > Negro > Amarillo > Verde > Azul\n- Tiempo: 5 min por hat\n\n--- C | CRITERIO ---\n\nFormato: analisis por hat + sintesis final con decision.\nTono: estructurado, cada seccion con su lente.\nAudiencia: equipo de decision.\nAccion: tomar la decision basada en las 6 perspectivas.\n\n[checklist]\n- [ ] Los 6 hats estan cubiertos con profundidad\n- [ ] Cada hat se mantiene en su perspectiva (no mezcla)\n- [ ] El hat rojo incluye emociones reales (no las ignora)\n- [ ] La sintesis azul tiene decision y proximos pasos",
    "paramCount": 2,
    "keywords": []
  },
  {
    "id": "pensamiento_ooda_loop_decision_rapida",
    "label_title": "Ooda Loop Decision Rapida",
    "category": "pensamiento",
    "type": "spec",
    "content": "[inputs]\n- SITUACION: {{SITUACION}} > Situacion que requiere decision rapida\n- PRESION: {{PRESION}} > (opcional) Tipo de presion (tiempo, competencia, crisis)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara tomar decisiones en entornos de alta velocidad y ambiguedad. El OODA Loop (Observar, Orientar, Decidir, Actuar) del coronel Boyd permite decidir mas rapido que la competencia.\n\n--- P | PEDIDO ---\n\nArquetipo: Estratega de Decision Rapida con formacion militar en OODA Loop y experiencia en entornos de alta presion (trading, crisis management, startups).\n\nOODA Loop:\n1. Observar: que esta pasando REALMENTE? datos crudos, sin interpretacion\n2. Orientar: que significa? contexto, mental models, experiencia previa\n3. Decidir: cual es la mejor accion dado lo que se ahora?\n4. Actuar: ejecutar rapidamente y volver a Observar\n5. Meta: en que paso del loop estoy atascado?\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- John Boyd OODA Loop: velocidad de decision > calidad perfecta\n- Tempo: quien cicla el OODA mas rapido, gana\n- Orientation is key: los sesgos viven en la orientacion\n- Implicit guidance: con practica, el loop se vuelve automatico\n\n--- C | CRITERIO ---\n\nFormato: analisis OODA aplicado + recomendacion de accion.\nTono: directo, sin analisis-paralisis.\nAudiencia: decision-maker bajo presion.\nAccion: ejecutar la decision ahora, iterar despues.\n\n[checklist]\n- [ ] La observacion es de datos reales (no suposiciones)\n- [ ] La orientacion identifica sesgos propios\n- [ ] La decision es clara y ejecutable\n- [ ] El ciclo tiene punto de re-evaluacion definido",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "pensamiento_bayesiano_actualizar_creencias",
    "label_title": "Bayesiano Actualizar Creencias",
    "category": "pensamiento",
    "type": "spec",
    "content": "[inputs]\n- CREENCIA: {{CREENCIA}} > Creencia o estimacion actual a actualizar\n- EVIDENCIA: {{EVIDENCIA}} > Nueva evidencia que acaba de llegar\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara actualizar creencias y estimaciones cuando llega nueva evidencia, en lugar de aferrarse a la primera impresion. El pensamiento bayesiano es la herramienta contra el sesgo de confirmacion.\n\n--- P | PEDIDO ---\n\nArquetipo: Analista Bayesiano con formacion en estadistica y teoria de decisiones bajo incertidumbre.\n\nActualizacion Bayesiana:\n1. Prior: cual es mi creencia/estimacion ANTES de la nueva evidencia? (probabilidad)\n2. Nueva evidencia: que dato nuevo acaba de llegar?\n3. Likelihood: que tan probable es esta evidencia SI mi creencia es correcta?\n4. Likelihood alternativa: que tan probable es esta evidencia SI mi creencia es incorrecta?\n5. Posterior: cual es mi creencia actualizada DESPUES de la evidencia?\n6. Decision: cambia mi accion basada en la creencia actualizada?\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Bayes' Theorem: P(H|E) = P(E|H) * P(H) / P(E)\n- Calibration: que tan bien calibradas estan tus probabilidades?\n- Update incrementally: no flip-flop, ajusta gradualmente\n- Base rates matter: no ignores la frecuencia base del evento\n\n--- C | CRITERIO ---\n\nFormato: tabla prior > evidencia > posterior + recomendacion.\nTono: analitico, probabilistico.\nAudiencia: decision-maker que enfrenta incertidumbre.\nAccion: ajustar decision basada en el posterior actualizado.\n\n[checklist]\n- [ ] El prior esta cuantificado (no vago)\n- [ ] La evidencia esta evaluada por calidad\n- [ ] El posterior es diferente del prior (hubo actualizacion real)\n- [ ] La decision refleja el posterior, no la primera impresion",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "pensamiento_occam_razor_solucion_simple",
    "label_title": "Occam Razor Solucion Simple",
    "category": "pensamiento",
    "type": "spec",
    "content": "[inputs]\n- PROBLEMA: {{PROBLEMA}} > Problema a resolver\n- OPCIONES: {{OPCIONES}} > (opcional) Soluciones consideradas (si ya las tienes)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara elegir la solucion mas simple que resuelve el problema. La complejidad innecesaria es el mayor enemigo de la ejecucion. Si dos soluciones funcionan igual, elige la simple.\n\n--- P | PEDIDO ---\n\nArquetipo: Consultor de Simplificacion Estrategica con experiencia en reduccion de complejidad operativa para empresas en crecimiento.\n\nNavaja de Occam aplicada:\n1. Listar todas las soluciones posibles al problema\n2. Para cada una: cuantas suposiciones requiere? cuantas partes moviles tiene?\n3. Ordenar por complejidad (menos suposiciones = mas simple)\n4. Evaluar: la solucion simple resuelve el 80% del problema?\n5. Si si: elegir la simple. Si no: agregar SOLO la complejidad necesaria.\n6. Regla: la carga de la prueba esta en la complejidad, no en la simplicidad.\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Occam's Razor: entre explicaciones equivalentes, la mas simple gana\n- KISS: Keep It Stupidly Simple\n- Complexity budget: cada pieza compleja debe justificar su existencia\n- MVP thinking: resolver el 80% con el 20% del esfuerzo\n\n--- C | CRITERIO ---\n\nFormato: opciones rankeadas por complejidad + recomendacion + justificacion.\nTono: pragmatico.\nAudiencia: decision-maker que tiende a sobrecomplicar.\nAccion: implementar la solucion simple.\n\n[checklist]\n- [ ] Las opciones estan rankeadas por numero de suposiciones\n- [ ] La solucion simple resuelve el problema core\n- [ ] La complejidad adicional (si existe) esta justificada\n- [ ] La recomendacion es clara y accionable",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "pensamiento_dialectico_tesis_antitesis",
    "label_title": "Dialectico Tesis Antitesis",
    "category": "pensamiento",
    "type": "spec",
    "content": "[inputs]\n- POSICION_A: {{POSICION_A}} > Primera posicion o tesis\n- POSICION_B: {{POSICION_B}} > Posicion opuesta o antitesis\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara generar comprension profunda confrontando dos posiciones opuestas y creando una sintesis que integre lo mejor de ambas. La verdad rara vez esta en un extremo.\n\n--- P | PEDIDO ---\n\nArquetipo: Facilitador de Pensamiento Dialectico con formacion filosofica y experiencia en mediacion de conflictos estrategicos.\n\nProceso dialectico:\n1. Tesis: la posicion A con sus mejores argumentos\n2. Antitesis: la posicion B (opuesta) con sus mejores argumentos\n3. Tensiones: donde se contradicen genuinamente (no superficialmente)\n4. Verdades compartidas: que tienen en comun en el fondo\n5. Sintesis: posicion C que integra las verdades de A y B y resuelve las tensiones\n6. Evaluacion: la sintesis es mejor que A o B por separado?\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Hegel: tesis > antitesis > sintesis\n- Steel man both sides: ambas posiciones en su version mas fuerte\n- Integration > compromise: sintesis no es 50/50, es algo nuevo\n- Productive tension: la contradiccion es el motor del progreso\n\n--- C | CRITERIO ---\n\nFormato: tesis > antitesis > tensiones > sintesis.\nTono: filosofico-practico.\nAudiencia: pensador que necesita resolver una tension aparentemente irreconciliable.\nAccion: presentar la sintesis como nueva posicion.\n\n[checklist]\n- [ ] Ambas posiciones estan en su version mas fuerte\n- [ ] Las tensiones son genuinas (no artificiales)\n- [ ] La sintesis es nueva (no un compromiso diluido)\n- [ ] La sintesis es verificablemente mejor que las partes",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "pensamiento_lateral_provocacion",
    "label_title": "Lateral Provocacion",
    "category": "pensamiento",
    "type": "spec",
    "content": "[inputs]\n- PROBLEMA: {{PROBLEMA}} > Problema o area donde necesitas ideas nuevas\n- PATRON_ACTUAL: {{PATRON_ACTUAL}} > Como se resuelve normalmente este tipo de problema\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara escapar del pensamiento lineal y generar ideas genuinamente nuevas usando provocaciones deliberadas. El pensamiento lateral de De Bono rompe patrones establecidos.\n\n--- P | PEDIDO ---\n\nArquetipo: Facilitador de Pensamiento Lateral con certificacion en tecnicas de Edward de Bono y experiencia en innovacion de producto.\n\nPensamiento Lateral:\n1. Definir el patron de pensamiento actual (como se resuelve normalmente)\n2. Provocacion: crear una afirmacion absurda o imposible (PO: ...)\n3. Movimiento: desde la provocacion, que ideas nuevas surgen?\n4. Random entry: elegir una palabra aleatoria y conectarla con el problema\n5. Challenge: cuestionar por que se hace asi (no para criticar, para reimaginar)\n6. Seleccionar las 3 ideas mas prometedoras nacidas del proceso\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Edward de Bono Lateral Thinking\n- PO (Provocative Operation): afirmaciones deliberadamente absurdas\n- Random entry: palabra aleatoria como catalizador\n- Movement: no juzgar la provocacion, moverse DESDE ella\n\n--- C | CRITERIO ---\n\nFormato: provocaciones + ideas generadas + top 3 seleccionadas.\nTono: provocador, jugueton-serio.\nAudiencia: equipo creativo o innovador.\nAccion: prototipar la idea lateral mas prometedora.\n\n[checklist]\n- [ ] Min. 3 provocaciones genuinamente absurdas\n- [ ] Las ideas son genuinamente diferentes al patron actual\n- [ ] El top 3 es viable a pesar de nacer de lo absurdo\n- [ ] El proceso es reproducible (no depende de inspiracion)",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "pensamiento_abstraction_laddering",
    "label_title": "Abstraction Laddering",
    "category": "pensamiento",
    "type": "spec",
    "content": "[inputs]\n- PROBLEMA: {{PROBLEMA}} > Problema como se plantea actualmente\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara subir y bajar en el nivel de abstraccion de un problema hasta encontrar el nivel correcto para resolverlo. Muchos problemas se resuelven en un nivel diferente al que se plantean.\n\n--- P | PEDIDO ---\n\nArquetipo: Consultor de Estrategia con experiencia en reframing de problemas y analisis multi-nivel (operativo, tactico, estrategico).\n\nAbstraction Laddering:\n1. Nivel actual: como se plantea el problema hoy\n2. Subir (Why?): por que es esto un problema? Que problema mas grande alimenta? (repetir 3x)\n3. Bajar (How?): como se manifiesta concretamente? Que sub-problemas tiene? (repetir 3x)\n4. Mapa de niveles: desde el mas abstracto al mas concreto\n5. Nivel optimo: en cual nivel resolverlo tiene mas impacto?\n6. Reformular el problema en el nivel optimo\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Abstraction laddering: Why (sube) / How (baja) / What (nivel actual)\n- Right level of abstraction: ni tan abstracto que sea inaccionable, ni tan concreto que sea un parche\n- Root problem vs symptom: el nivel correcto es donde vive la causa, no el sintoma\n\n--- C | CRITERIO ---\n\nFormato: mapa de niveles (abstracto a concreto) + nivel optimo + problema reformulado.\nTono: analitico-reflexivo.\nAudiencia: problem-solver.\nAccion: resolver el problema en el nivel correcto.\n\n[checklist]\n- [ ] El mapa tiene min. 3 niveles hacia arriba y 3 hacia abajo\n- [ ] El nivel optimo esta justificado\n- [ ] El problema reformulado es accionable\n- [ ] El reformulado es diferente (y mejor) que el planteamiento original",
    "paramCount": 2,
    "keywords": []
  },
  {
    "id": "pensamiento_assumption_mapping",
    "label_title": "Assumption Mapping",
    "category": "pensamiento",
    "type": "spec",
    "content": "[inputs]\n- PLAN: {{PLAN}} > Plan, estrategia o decision a analizar\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara hacer explicitas TODAS las suposiciones detras de un plan, estrategia o decision. Las suposiciones no validadas son minas terrestres. Mapearlas las desactiva.\n\n--- P | PEDIDO ---\n\nArquetipo: Analista de Riesgos Estrategicos con experiencia en validacion de supuestos para planes de inversion y estrategia corporativa.\n\nAssumption Map:\n1. Listar TODAS las suposiciones del plan (min. 15)\n2. Clasificar cada una: critica (si falla, el plan falla) vs nice-to-have\n3. Clasificar por confianza: alta (tengo evidencia) / media (creo que si) / baja (no se)\n4. Matriz 2×2: criticidad × confianza\n5. Cuadrante peligroso: criticas + baja confianza = validar PRIMERO\n6. Plan de validacion para cada suposicion del cuadrante peligroso\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Assumption mapping: hacer visible lo invisible\n- Riskiest Assumption Test: validar primero lo que puede matarte\n- Confidence calibration: cuanta evidencia realmente tienes?\n- Validation experiments: como probar la suposicion rapido y barato\n\n--- C | CRITERIO ---\n\nFormato: lista de suposiciones + matriz 2x2 + plan de validacion.\nTono: riguroso, sin complacencia.\nAudiencia: lider del plan.\nAccion: validar la suposicion mas peligrosa esta semana.\n\n[checklist]\n- [ ] Min. 15 suposiciones identificadas\n- [ ] La clasificacion criticidad/confianza es honesta\n- [ ] El cuadrante peligroso tiene plan de validacion\n- [ ] Las validaciones son ejecutables (no 'investigar mas')",
    "paramCount": 2,
    "keywords": []
  },
  {
    "id": "pensamiento_decision_journal_registro",
    "label_title": "Decision Journal Registro",
    "category": "pensamiento",
    "type": "spec",
    "content": "[inputs]\n- TIPO_DECISIONES: {{TIPO_DECISIONES}} > Tipo de decisiones que quieres trackear (inversiones, hiring, estrategia, etc.)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara aprender de tus propias decisiones a lo largo del tiempo. Un Decision Journal captura: que decidiste, por que, que esperabas, y que paso realmente. Es el gym del juicio profesional.\n\n--- P | PEDIDO ---\n\nArquetipo: Coach de Decision-Making con experiencia en decision journals para traders, ejecutivos y emprendedores.\n\nDecision Journal:\n1. Template de entrada: fecha, decision, contexto, opciones consideradas\n2. Razonamiento: por que elegiste esta opcion (argumentos reales, no justificacion post-hoc)\n3. Prediccion: que esperas que pase? con que probabilidad?\n4. Estado emocional: como te sentias al decidir? (influye mas de lo que crees)\n5. Review cadence: revisar decisiones pasadas cada 30 dias\n6. Metricas: calibration score (prediccion vs realidad)\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Decision journal de Daniel Kahneman / Annie Duke\n- Resulting: no juzgues la decision por el resultado (buena decision puede dar mal resultado)\n- Calibration: mejorar la precision de tus predicciones con el tiempo\n- Process > outcome: enfocarse en la calidad del proceso de decision\n\n--- C | CRITERIO ---\n\nFormato: template de decision journal + ritual de review mensual.\nTono: reflexivo, sin auto-juicio.\nAudiencia: profesional que quiere mejorar su juicio.\nAccion: registrar la proxima decision importante con este template.\n\n[checklist]\n- [ ] El template captura contexto, opciones, razonamiento y prediccion\n- [ ] El estado emocional esta incluido (no ignorado)\n- [ ] El ritual de review es mensual y sostenible\n- [ ] Las metricas miden calibracion, no solo aciertos",
    "paramCount": 2,
    "keywords": []
  },
  {
    "id": "pensamiento_cognitive_bias_audit",
    "label_title": "Cognitive Bias Audit",
    "category": "pensamiento",
    "type": "spec",
    "content": "[inputs]\n- DECISION: {{DECISION}} > Decision o analisis a auditar\n- CONTEXTO: {{CONTEXTO}} > Contexto de la decision\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara identificar los sesgos cognitivos que estan influyendo en una decision o analisis actual. No podemos eliminar los sesgos, pero podemos detectarlos y compensar.\n\n--- P | PEDIDO ---\n\nArquetipo: Psicologa Cognitiva con especializacion en sesgos de decision y experiencia en debiasing para equipos de estrategia corporativa.\n\nCognitive Bias Audit:\n1. Describir la decision/analisis actual\n2. Checklist de sesgos comunes aplicados a ESTE caso:\n   - Confirmation bias: estoy buscando solo evidencia que confirme?\n   - Anchoring: estoy anclado al primer numero/dato que vi?\n   - Sunk cost: estoy considerando lo ya invertido que no se puede recuperar?\n   - Availability: estoy sobrevalorando lo reciente o lo dramatico?\n   - Dunning-Kruger: estoy seguro sin tener suficiente expertise?\n   - Status quo: estoy favoreciendo no cambiar por comodidad?\n3. Para cada sesgo detectado: como esta distorsionando el analisis\n4. Estrategia de compensacion por sesgo\n5. Decision ajustada post-audit\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Kahneman System 1/System 2: los sesgos viven en System 1\n- Checklist approach: revisar sistematicamente, no depender de auto-deteccion\n- Pre-mortem como debiasing: imaginar fallo activa pensamiento critico\n- Red team: pedir que otro ataque tu razonamiento\n\n--- C | CRITERIO ---\n\nFormato: checklist de sesgos + deteccion por caso + compensaciones + decision ajustada.\nTono: honesto, auto-critico.\nAudiencia: decision-maker que quiere decidir mejor.\nAccion: ajustar la decision basada en los sesgos detectados.\n\n[checklist]\n- [ ] Min. 6 sesgos evaluados contra el caso especifico\n- [ ] Al menos 2 sesgos detectados como activos\n- [ ] Las compensaciones son concretas (no 'ser mas consciente')\n- [ ] La decision ajustada es diferente a la pre-audit (si no, el audit fallo)",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "pensamiento_reframing_cambiar_perspectiva",
    "label_title": "Reframing Cambiar Perspectiva",
    "category": "pensamiento",
    "type": "spec",
    "content": "[inputs]\n- SITUACION: {{SITUACION}} > Problema o situacion a reframear\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara transformar un problema cambiando el marco desde el que se observa. El mismo hecho se ve completamente diferente desde otro marco. Reframing no cambia la realidad — cambia lo que es posible.\n\n--- P | PEDIDO ---\n\nArquetipo: Facilitador de Reframing con formacion en PNL, terapia narrativa y estrategia creativa.\n\nReframing en 5 lentes:\n1. Frame actual: como se ve el problema/situacion hoy\n2. Lente de oportunidad: donde esta la oportunidad escondida?\n3. Lente temporal: como se vera esto en 5 anos? que cambia?\n4. Lente del usuario: como lo ve la persona mas afectada?\n5. Lente de recurso: que tengo que otros no tienen para resolver esto?\n6. Mejor reframe: cual lente revela la perspectiva mas util y accionable?\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Reframing: cambiar el marco, no los hechos\n- Multiple perspectives: min. 5 lentes diferentes\n- Is this a problem or a constraint? Constraints enable creativity\n- 'Yes, and...' (improv): construir sobre la realidad, no negarla\n\n--- C | CRITERIO ---\n\nFormato: frame actual + 5 lentes + mejor reframe + accion.\nTono: revelador, expansivo.\nAudiencia: profesional atascado en un problema.\nAccion: abordar la situacion desde el mejor reframe.\n\n[checklist]\n- [ ] El frame actual esta articulado con precision\n- [ ] Las 5 lentes son genuinamente diferentes (no variaciones)\n- [ ] El mejor reframe abre posibilidades que el frame original cerraba\n- [ ] La accion es diferente bajo el nuevo frame",
    "paramCount": 2,
    "keywords": []
  },
  {
    "id": "investigacion_protocolo_3_fases",
    "label_title": "Protocolo 3 Fases",
    "category": "investigacion",
    "type": "spec",
    "content": "[inputs]\n- TEMA: {{TEMA}} > Tema o entidad a investigar\n- OBJETIVO: {{OBJETIVO}} > Para que necesitas esta informacion\n- FUENTES: {{FUENTES}} > (opcional) Tipos de fuentes preferidas\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara producir inteligencia verificable en 3 fases: exploracion amplia, analisis focalizado, validacion cruzada. La investigacion sin protocolo produce opiniones; con protocolo, produce evidencia.\n\n--- P | PEDIDO ---\n\nArquetipo: Analista de Inteligencia OSINT Senior con experiencia en investigacion de fuentes abiertas, verificacion de hechos y analisis para consultoria estrategica (15+ anos).\n\nInvestigacion en 3 fases:\n1. Fase 1 — Exploracion: busqueda amplia en fuentes diversas (min. 10 fuentes)\n2. Fase 2 — Analisis: profundizacion en hallazgos clave, cruce de perspectivas\n3. Fase 3 — Validacion: cruce con min. 3 fuentes independientes por hallazgo\n4. Clasificacion de informacion por nivel de confiabilidad (alta/media/baja)\n5. Identificacion de vacios de informacion y sesgos potenciales\n6. Dossier ejecutivo con hallazgos, fuentes y gaps\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- OSINT tradecraft: recoleccion > procesamiento > analisis > diseminacion\n- Source evaluation: fiabilidad de fuente + veracidad de informacion\n- Triangulacion: cada hallazgo clave validado por 3+ fuentes independientes\n- Admission of uncertainty: marcar lo que NO sabemos\n\n--- C | CRITERIO ---\n\nFormato: dossier ejecutivo con resumen + hallazgos clasificados + fuentes + gaps. Max 5 paginas. Tono: objetivo, basado en evidencia. Audiencia: decision-maker. Accion: tomar decision informada con nivel de confianza explicitado.\n\n[checklist]\n- [ ] Minimo 10 fuentes consultadas\n- [ ] Cada hallazgo clave tiene 3+ fuentes cruzadas\n- [ ] Los vacios de informacion estan explicitados\n- [ ] El nivel de confianza es honesto (no todo es 'alta confiabilidad')",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "investigacion_factcheck_afirmacion",
    "label_title": "Factcheck Afirmacion",
    "category": "investigacion",
    "type": "spec",
    "content": "[inputs]\n- AFIRMACION: {{AFIRMACION}} > Afirmacion o dato a verificar\n- CONTEXTO: {{CONTEXTO}} > Donde encontraste esta afirmacion\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara verificar la veracidad de una afirmacion antes de usarla en un entregable o tomar una decision basada en ella. En la era de la desinformacion, el fact-checking es higiene profesional.\n\n--- P | PEDIDO ---\n\nArquetipo: Fact-Checker Profesional con metodologia de Reuters y AP, especializado en verificacion de datos corporativos y estadisticas de mercado.\n\nProtocolo de fact-checking:\n1. Aislar la afirmacion verificable exacta\n2. Rastrear la fuente original (no la que la cita)\n3. Buscar min. 3 fuentes independientes\n4. Verificar fecha, contexto y completitud del dato\n5. Buscar contra-evidencia o interpretaciones alternativas\n6. Veredicto: Verdadero / Parcialmente Verdadero / Enganoso / Falso / No Verificable\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Source tracing: llegar a la fuente primaria, no la secundaria\n- Contexto completo: el dato sin contexto puede ser enganoso\n- Steel-man the opposition: buscar la mejor contra-evidencia\n- Transparency: explicar el proceso de verificacion\n\n--- C | CRITERIO ---\n\nFormato: reporte de verificacion con afirmacion, fuentes, veredicto y explicacion. Tono: neutral, riguroso. Audiencia: profesional que necesita certeza. Accion: usar o descartar la afirmacion con confianza.\n\n[checklist]\n- [ ] La fuente original fue rastreada\n- [ ] Min. 3 fuentes independientes consultadas\n- [ ] El veredicto tiene explicacion transparente\n- [ ] La contra-evidencia fue buscada activamente",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "investigacion_tendencias_sector",
    "label_title": "Tendencias Sector",
    "category": "investigacion",
    "type": "spec",
    "content": "[inputs]\n- SECTOR: {{SECTOR}} > Sector o industria\n- HORIZONTE: {{HORIZONTE}} > Horizonte temporal (1, 3, 5 anos)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara mapear tendencias emergentes y senales debiles que afectaran a {{SECTOR}} en los proximos {{HORIZONTE}}. Quien ve las tendencias primero, decide primero.\n\n--- P | PEDIDO ---\n\nArquetipo: Analista de Tendencias y Futuros con experiencia en horizon scanning, analisis de senales debiles y consultoria de futuros para empresas multinacionales.\n\nMapa de tendencias:\n1. Mega-tendencias globales que afectan al sector\n2. Senales debiles y tendencias emergentes (no mainstream todavia)\n3. Analisis STEEP: Social, Tecnologico, Economico, Ecologico, Politico\n4. Oportunidades por horizonte temporal (corto, medio, largo plazo)\n5. Amenazas y disrupciones potenciales\n6. Top 5 oportunidades estrategicas priorizadas\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Horizon scanning: 3 horizontes (H1: 1 ano, H2: 3 anos, H3: 5+ anos)\n- STEEP analysis por dimension\n- Weak signal detection: que esta pasando en los margenes\n- Scenario planning: cruzar tendencias para imaginar futuros\n\n--- C | CRITERIO ---\n\nFormato: mapa de tendencias por horizonte + analisis STEEP + top 5 oportunidades. Tono: estrategico. Audiencia: director de estrategia. Accion: incorporar al menos 1 tendencia en la planificacion actual.\n\n[checklist]\n- [ ] Las mega-tendencias estan diferenciadas de las senales debiles\n- [ ] El analisis STEEP cubre las 5 dimensiones\n- [ ] Las oportunidades estan priorizadas con criterio\n- [ ] Al menos 2 senales debiles son genuinamente no-obvias",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "investigacion_dossier_empresa",
    "label_title": "Dossier Empresa",
    "category": "investigacion",
    "type": "spec",
    "content": "[inputs]\n- EMPRESA: {{EMPRESA}} > Nombre de la empresa a investigar\n- OBJETIVO: {{OBJETIVO}} > Para que (reunion, inversion, partnership, competencia)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara tener inteligencia completa sobre una empresa antes de una reunion, negociacion, partnership o decision de inversion. La preparacion es la ventaja competitiva mas infravalorada.\n\n--- P | PEDIDO ---\n\nArquetipo: Analista de Inteligencia Corporativa con experiencia en due diligence, perfilamiento organizacional y analisis competitivo para fondos de inversion.\n\nDossier corporativo:\n1. Perfil: historia, estructura, governance, tamano, ubicaciones\n2. Posicion financiera: ingresos, crecimiento, salud (si es publica)\n3. Equipo directivo: decisores clave, trayectoria, red de influencia\n4. Posicion competitiva: market share, diferenciadores, debilidades\n5. Movimientos estrategicos recientes: adquisiciones, lanzamientos, pivotes\n6. Evaluacion: fortalezas, riesgos y oportunidades para TI\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Open source intelligence (OSINT) sobre fuentes publicas\n- Analisis de red: conexiones entre directivos y ecosistema\n- Financial health indicators: revenue growth, margins, debt\n- Competitive positioning: Porter's, market share, differentiation\n\n--- C | CRITERIO ---\n\nFormato: dossier ejecutivo max 5 paginas. Tono: analitico-objetivo. Audiencia: profesional que se reunira con esta empresa. Accion: llegar preparado con informacion que la contraparte no espera que tengas.\n\n[checklist]\n- [ ] Perfil corporativo cubre estructura y governance\n- [ ] Equipo directivo tiene al menos 3 perfiles clave\n- [ ] La evaluacion final es honesta (no solo positiva)\n- [ ] Las fuentes son citadas y verificables",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "investigacion_sintesis_multiples_fuentes",
    "label_title": "Sintesis Multiples Fuentes",
    "category": "investigacion",
    "type": "spec",
    "content": "[inputs]\n- TEMA: {{TEMA}} > Tema de la investigacion\n- FUENTES: {{FUENTES}} > Fuentes a sintetizar (titulos, URLs o resumenes)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara convertir multiples documentos, papers o reportes en un unico documento ejecutivo coherente. La abundancia de informacion sin sintesis es ruido.\n\n--- P | PEDIDO ---\n\nArquetipo: Investigador Senior especializado en revisiones sistematicas, meta-analisis y sintesis de literatura para consultoria estrategica.\n\nSintesis ejecutiva:\n1. Extraer hallazgos clave de cada fuente\n2. Mapear consensos entre fuentes\n3. Mapear contradicciones y tensiones\n4. Identificar vacios (que ninguna fuente cubre)\n5. Sintetizar en narrative review ejecutiva\n6. Traducir hallazgos a recomendaciones practicas\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Systematic review approach: extraccion > clasificacion > sintesis\n- Evidence mapping: consenso, contradiccion, vacio\n- Strength of evidence: fuentes primarias > secundarias > opinion\n- So-what test: cada hallazgo debe tener implicacion practica\n\n--- C | CRITERIO ---\n\nFormato: sintesis ejecutiva con tabla de hallazgos por fuente, mapa de consensos/contradicciones, gaps y recomendaciones. Tono: objetivo. Audiencia: decision-maker con poco tiempo. Accion: tomar decisiones informadas sin leer todas las fuentes.\n\n[checklist]\n- [ ] Todas las fuentes estan representadas en la sintesis\n- [ ] Los consensos y contradicciones estan mapeados\n- [ ] Los vacios de informacion estan explicitados\n- [ ] Las recomendaciones conectan con los hallazgos (no son opiniones sueltas)",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "investigacion_benchmark_competitivo",
    "label_title": "Benchmark Competitivo",
    "category": "investigacion",
    "type": "spec",
    "content": "[inputs]\n- SECTOR: {{SECTOR}} > Tu sector o industria\n- METRICAS: {{METRICAS}} > Metricas clave a comparar\n- COMPETIDORES: {{COMPETIDORES}} > (opcional) Competidores a incluir\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara comparar tu rendimiento contra los mejores del sector con rigor metodologico. Sin benchmark, 'estamos bien' es una opinion. Con benchmark, es un hecho.\n\n--- P | PEDIDO ---\n\nArquetipo: Analista de Benchmarking con certificacion en APQC Benchmarking y experiencia en estudios comparativos para consultoria estrategica.\n\nBenchmark competitivo:\n1. Definir metricas clave a comparar (5-10)\n2. Identificar benchmark partners: competidores directos + best-in-class de otros sectores\n3. Recopilar datos comparativos (publicos, estimados, proxy)\n4. Tabla: metrica > tu valor > promedio sector > best-in-class > gap\n5. Root cause: por que existen los gaps mas grandes\n6. Plan de cierre para top 3 gaps\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- APQC benchmarking methodology\n- Fuentes: reportes de industria, earnings calls, LinkedIn, press releases\n- Gap analysis: cuantificar la distancia al mejor\n- Actionable gaps only: solo los que valen la pena cerrar\n\n--- C | CRITERIO ---\n\nFormato: tabla comparativa + gap analysis + plan de cierre.\nTono: analitico, basado en datos.\nAudiencia: director de estrategia.\nAccion: comenzar a cerrar el gap #1.\n\n[checklist]\n- [ ] Las metricas son comparables (misma definicion)\n- [ ] Min. 3 benchmark partners identificados\n- [ ] Los gaps estan cuantificados\n- [ ] El plan de cierre tiene acciones concretas",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "investigacion_due_diligence_rapida",
    "label_title": "Due Diligence Rapida",
    "category": "investigacion",
    "type": "spec",
    "content": "[inputs]\n- ENTIDAD: {{ENTIDAD}} > Empresa, persona o proyecto a evaluar\n- TIPO: {{TIPO}} > Tipo de oportunidad (inversion, partnership, proveedor, cliente)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara evaluar rapidamente una oportunidad (inversion, partnership, proveedor) con un due diligence estructurado. Rapido no significa superficial — significa enfocado en lo que importa.\n\n--- P | PEDIDO ---\n\nArquetipo: Analista de Due Diligence con experiencia en evaluacion de oportunidades para fondos de inversion y decisiones de partnership.\n\nDue Diligence rapida:\n1. Perfil de la entidad: que es, tamano, historia, reputacion\n2. Red flags check: litigios, noticias negativas, cambios de liderazgo\n3. Salud financiera: ingresos, crecimiento, deuda (si aplica)\n4. Capacidad: pueden cumplir lo que prometen?\n5. Riesgo: que puede salir mal y con que probabilidad\n6. Veredicto: proceed / proceed with caution / avoid\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Structured OSINT: fuentes publicas verificables\n- Red flag checklist: litigios, regulatorios, reputacionales\n- Reference check: que dice el mercado sobre ellos\n- Risk-adjusted evaluation: no solo upside, sino downside\n\n--- C | CRITERIO ---\n\nFormato: ficha de DD en max 3 paginas.\nTono: objetivo, basado en hechos.\nAudiencia: decision-maker que evalua la oportunidad.\nAccion: tomar decision go/no-go.\n\n[checklist]\n- [ ] Perfil cubre los 5 puntos criticos\n- [ ] Red flags buscados activamente (no solo positivos)\n- [ ] Veredicto tiene justificacion y nivel de confianza\n- [ ] Fuentes son verificables",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "investigacion_mapa_stakeholders",
    "label_title": "Mapa Stakeholders",
    "category": "investigacion",
    "type": "spec",
    "content": "[inputs]\n- INICIATIVA: {{INICIATIVA}} > Proyecto o iniciativa a mapear\n- CONTEXTO: {{CONTEXTO}} > Contexto organizacional\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara mapear todos los stakeholders de una iniciativa con su nivel de influencia, interes y postura. Sin mapa de stakeholders, no sabes a quien convencer primero.\n\n--- P | PEDIDO ---\n\nArquetipo: Consultor de Gestion de Stakeholders con experiencia en mapeo de poder e influencia para proyectos de transformacion organizacional.\n\nStakeholder Map:\n1. Identificar todos los stakeholders (directos e indirectos)\n2. Clasificar por: poder (alto/bajo) × interes (alto/bajo)\n3. Postura actual: aliado / neutral / resistente\n4. Preocupacion principal de cada stakeholder\n5. Estrategia de engagement por cuadrante\n6. Top 5 stakeholders criticos con plan personalizado\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Power-Interest matrix de Mendelow\n- Stakeholder salience: poder × legitimidad × urgencia\n- Engagement strategy: manage closely / keep satisfied / keep informed / monitor\n- Influence network: quien influye a quien\n\n--- C | CRITERIO ---\n\nFormato: matriz poder-interes + tabla de stakeholders + estrategia.\nTono: estrategico.\nAudiencia: lider de la iniciativa.\nAccion: ejecutar plan de engagement con los top 5.\n\n[checklist]\n- [ ] Todos los stakeholders estan identificados (no solo los obvios)\n- [ ] La clasificacion poder/interes esta justificada\n- [ ] Cada stakeholder tiene estrategia de engagement\n- [ ] Los top 5 tienen plan personalizado",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "investigacion_analisis_competitivo_5_fuerzas",
    "label_title": "Analisis Competitivo 5 Fuerzas",
    "category": "investigacion",
    "type": "spec",
    "content": "[inputs]\n- SECTOR: {{SECTOR}} > Sector o industria a analizar\n- EMPRESA: {{EMPRESA}} > (opcional) Tu empresa o posicion en el sector\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara evaluar el atractivo y la dinamica competitiva de un sector usando las 5 Fuerzas de Porter. Entender la estructura del juego antes de jugar.\n\n--- P | PEDIDO ---\n\nArquetipo: Estratega Competitivo con formacion en estrategia empresarial (Porter, Mintzberg) y experiencia en analisis sectorial para consultoria.\n\n5 Fuerzas de Porter:\n1. Rivalidad entre competidores: intensidad, diferenciacion, concentracion\n2. Amenaza de nuevos entrantes: barreras de entrada, capital, regulacion\n3. Poder de proveedores: concentracion, costo de cambio, alternativas\n4. Poder de compradores: concentracion, sensibilidad a precio, alternativas\n5. Amenaza de sustitutos: disponibilidad, relacion precio-rendimiento\n6. Conclusion: atractivo del sector (alto/medio/bajo) + implicaciones estrategicas\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Michael Porter Competitive Forces\n- Scoring 1-5 por fuerza para cuantificar\n- Dynamic analysis: como estan cambiando las fuerzas\n- Strategic implications: que posicion tomar dado el analisis\n\n--- C | CRITERIO ---\n\nFormato: analisis por fuerza + scoring + conclusion estrategica.\nTono: analitico.\nAudiencia: director de estrategia.\nAccion: ajustar estrategia segun las fuerzas dominantes.\n\n[checklist]\n- [ ] Las 5 fuerzas tienen scoring cuantitativo\n- [ ] El analisis incluye dinamica (como estan cambiando)\n- [ ] La conclusion tiene implicaciones estrategicas accionables\n- [ ] Las fuentes de datos estan citadas",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "investigacion_pestel_entorno_macro",
    "label_title": "Pestel Entorno Macro",
    "category": "investigacion",
    "type": "spec",
    "content": "[inputs]\n- ORGANIZACION: {{ORGANIZACION}} > Tu organizacion o sector\n- PAIS: {{PAIS}} > Pais o region de operacion\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara analizar el entorno macro que afecta a tu organizacion o sector. PESTEL revela fuerzas externas que no controlas pero debes anticipar.\n\n--- P | PEDIDO ---\n\nArquetipo: Analista de Entorno Macro con formacion en economia politica y experiencia en analisis PESTEL para planificacion estrategica.\n\nAnalisis PESTEL:\n1. Politico: regulaciones, estabilidad, politicas comerciales\n2. Economico: inflacion, tipo de cambio, crecimiento, empleo\n3. Social: demografia, tendencias culturales, estilos de vida\n4. Tecnologico: innovaciones, adopcion digital, disrupcion\n5. Ecologico: sostenibilidad, regulaciones ambientales, cambio climatico\n6. Legal: legislacion laboral, propiedad intelectual, compliance\n7. Impacto: para cada factor, impacto en MI organizacion (alto/medio/bajo)\n8. Oportunidades y amenazas priorizadas\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- PESTEL framework con scoring de impacto\n- Horizon scanning: fuentes de prensa, think tanks, reguladores\n- So-what: cada factor con implicacion concreta para la organizacion\n- Time horizon: corto (1 ano), medio (3 anos), largo (5+ anos)\n\n--- C | CRITERIO ---\n\nFormato: tabla PESTEL con scoring + oportunidades/amenazas priorizadas.\nTono: estrategico-analitico.\nAudiencia: equipo de planificacion estrategica.\nAccion: incorporar top 3 factores en la planificacion actual.\n\n[checklist]\n- [ ] Las 6 dimensiones estan cubiertas con datos\n- [ ] Cada factor tiene impacto cuantificado\n- [ ] Las oportunidades y amenazas son especificas a la organizacion\n- [ ] El horizonte temporal esta diferenciado",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "investigacion_voice_of_customer",
    "label_title": "Voice Of Customer",
    "category": "investigacion",
    "type": "spec",
    "content": "[inputs]\n- PRODUCTO: {{PRODUCTO}} > Producto o servicio a investigar\n- SEGMENTOS: {{SEGMENTOS}} > Segmentos de clientes a investigar\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara capturar y estructurar la voz del cliente de forma que informe decisiones de producto, servicio o estrategia. El cliente sabe lo que duele — tu trabajo es escuchar con estructura.\n\n--- P | PEDIDO ---\n\nArquetipo: Investigadora de UX Senior con experiencia en voice-of-customer programs, customer discovery y Jobs-to-be-Done methodology.\n\nVoice of Customer:\n1. Definir preguntas de investigacion (que necesitas saber)\n2. Segmentar clientes: actuales, potenciales, perdidos\n3. Guia de entrevista: 10 preguntas abiertas + 5 de sondeo\n4. Framework de analisis: temas, frecuencia, intensidad\n5. Customer quotes textuales (no interpretaciones)\n6. Insights priorizados por impacto en negocio\n7. Recomendaciones con conexion directa a quotes\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Jobs-to-be-Done: que trabajo contrata el cliente\n- Pain/Gain analysis: que duele, que valoran\n- Verbatim quotes: las palabras exactas del cliente pesan mas que interpretaciones\n- Triangulation: cruzar lo que dicen, lo que hacen, lo que sienten\n\n--- C | CRITERIO ---\n\nFormato: reporte VOC con quotes, insights y recomendaciones.\nTono: centrado en el cliente.\nAudiencia: equipo de producto o estrategia.\nAccion: actuar sobre el insight #1.\n\n[checklist]\n- [ ] Las preguntas de investigacion son claras\n- [ ] Los insights tienen quotes textuales como evidencia\n- [ ] Los segmentos de clientes estan representados\n- [ ] Las recomendaciones conectan directamente con quotes",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "investigacion_analisis_swot_estrategico",
    "label_title": "Analisis Swot Estrategico",
    "category": "investigacion",
    "type": "spec",
    "content": "[inputs]\n- ORGANIZACION: {{ORGANIZACION}} > Organizacion o unidad a analizar\n- SECTOR: {{SECTOR}} > Sector o industria\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara producir un SWOT que no sea un ejercicio generico sino una herramienta de decision estrategica. El SWOT bueno cruza fortalezas con oportunidades y debilidades con amenazas.\n\n--- P | PEDIDO ---\n\nArquetipo: Consultor de Estrategia con experiencia en TOWS Matrix y formulacion estrategica basada en SWOT cruzado.\n\nSWOT Estrategico:\n1. Fortalezas: que haces mejor que la competencia (con evidencia)\n2. Debilidades: donde eres vulnerable (honestamente)\n3. Oportunidades: tendencias externas que puedes capitalizar\n4. Amenazas: fuerzas externas que pueden danarte\n5. TOWS Matrix: cruzar S×O, S×T, W×O, W×T para generar estrategias\n6. Top 3 iniciativas estrategicas priorizadas\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- SWOT + TOWS Matrix: el cruce es donde esta el valor\n- SO strategies: usar fortalezas para capitalizar oportunidades\n- WT strategies: minimizar debilidades ante amenazas\n- Evidence-based: cada punto con dato o ejemplo concreto\n\n--- C | CRITERIO ---\n\nFormato: SWOT visual + TOWS matrix + 3 iniciativas priorizadas.\nTono: estrategico.\nAudiencia: equipo directivo.\nAccion: lanzar la iniciativa #1.\n\n[checklist]\n- [ ] Cada cuadrante tiene min. 4 puntos con evidencia\n- [ ] La TOWS matrix genera estrategias concretas por cruce\n- [ ] Las 3 iniciativas son accionables\n- [ ] Las debilidades son honestas (no cosmeticas)",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "investigacion_analisis_sentimiento_marca",
    "label_title": "Analisis Sentimiento Marca",
    "category": "investigacion",
    "type": "spec",
    "content": "[inputs]\n- MARCA: {{MARCA}} > Marca, producto o servicio a analizar\n- PERIODO: {{PERIODO}} > Periodo de analisis\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara entender como percibe el mercado tu marca, producto o servicio analizando fuentes publicas. La percepcion es la realidad del cliente.\n\n--- P | PEDIDO ---\n\nArquetipo: Analista de Brand Intelligence con experiencia en social listening, analisis de sentimiento y reputacion digital.\n\nAnalisis de sentimiento:\n1. Fuentes: redes sociales, resenas, foros, prensa, Glassdoor\n2. Volumen: cuantas menciones, con que frecuencia\n3. Sentimiento: positivo, neutro, negativo (distribucion %)\n4. Temas recurrentes: que se dice mas (word cloud tematico)\n5. Comparacion con competidores (si hay datos)\n6. Alertas: temas negativos que requieren accion inmediata\n7. Recomendaciones por tema\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Social listening frameworks\n- Sentiment classification: positivo/neutro/negativo + intensidad\n- Topic clustering: agrupar por temas recurrentes\n- Competitive share of voice: como te mencionan vs competencia\n\n--- C | CRITERIO ---\n\nFormato: dashboard de sentimiento + temas + alertas + recomendaciones.\nTono: analitico, basado en datos.\nAudiencia: equipo de marketing o reputacion.\nAccion: responder a las alertas criticas.\n\n[checklist]\n- [ ] Las fuentes cubren min. 3 canales diferentes\n- [ ] El sentimiento esta cuantificado (%)\n- [ ] Los temas recurrentes estan agrupados\n- [ ] Las alertas tienen nivel de urgencia",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "investigacion_market_sizing_tam_sam_som",
    "label_title": "Market Sizing Tam Sam Som",
    "category": "investigacion",
    "type": "spec",
    "content": "[inputs]\n- OPORTUNIDAD: {{OPORTUNIDAD}} > Producto, servicio o mercado a dimensionar\n- GEOGRAFIA: {{GEOGRAFIA}} > Region geografica\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara estimar el tamano de mercado de una oportunidad con rigor: TAM (total), SAM (al que puedes acceder), SOM (que puedes capturar realistamente).\n\n--- P | PEDIDO ---\n\nArquetipo: Analista de Mercados con experiencia en market sizing para startups, fondos de inversion y planificacion estrategica corporativa.\n\nMarket Sizing TAM/SAM/SOM:\n1. TAM: mercado total disponible (top-down + bottom-up)\n2. SAM: mercado accesible por tu modelo de negocio\n3. SOM: mercado capturabel realistamente en 1-3 anos\n4. Metodologia top-down: fuentes macro + filtros\n5. Metodologia bottom-up: unidades × precio × penetracion\n6. Triangulacion: comparar ambos metodos\n7. Sensibilidad: que pasa si las suposiciones cambian +/-20%\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Top-down: mercado total → filtros → segmento\n- Bottom-up: clientes potenciales × ticket promedio × frecuencia\n- Triangulation: ambos metodos deben converger\n- Cite sources: cada numero con fuente verificable\n\n--- C | CRITERIO ---\n\nFormato: estimacion TAM/SAM/SOM con metodologia + sensibilidad.\nTono: analitico, conservador.\nAudiencia: inversores o comite de estrategia.\nAccion: decidir si la oportunidad justifica inversion.\n\n[checklist]\n- [ ] TAM tiene calculo top-down Y bottom-up\n- [ ] Los filtros de TAM a SAM estan justificados\n- [ ] El SOM es realista (no optimista)\n- [ ] El analisis de sensibilidad muestra rango",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "investigacion_patent_landscape",
    "label_title": "Patent Landscape",
    "category": "investigacion",
    "type": "spec",
    "content": "[inputs]\n- TECNOLOGIA: {{TECNOLOGIA}} > Area tecnologica a investigar\n- EMPRESA: {{EMPRESA}} > (opcional) Tu empresa o contexto\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara mapear el panorama de patentes en un area tecnologica y detectar tendencias de innovacion, espacios en blanco y posibles infractores.\n\n--- P | PEDIDO ---\n\nArquetipo: Analista de Patentes con formacion en propiedad intelectual y experiencia en patent landscaping para equipos de I+D y estrategia de IP.\n\nPatent Landscape:\n1. Busqueda por keywords, clasificacion IPC/CPC, assignees\n2. Volumen de patentes por ano (tendencia de actividad)\n3. Top assignees (quien esta patentando mas)\n4. Clusters tecnologicos (areas de concentracion)\n5. White spaces: areas sin patentes (oportunidad)\n6. Patentes relevantes para {{TECNOLOGIA}} (lista de top 10)\n7. Implicaciones para tu estrategia de IP\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Patent database search: Google Patents, Espacenet, USPTO\n- IPC/CPC classification analysis\n- Citation analysis: patentes mas influyentes\n- Freedom-to-operate: areas sin restriccion de IP\n\n--- C | CRITERIO ---\n\nFormato: reporte de patent landscape + graficos de tendencia + white spaces.\nTono: tecnico-estrategico.\nAudiencia: equipo de I+D o estrategia de IP.\nAccion: priorizar white spaces para innovacion.\n\n[checklist]\n- [ ] La busqueda cubre las bases de datos principales\n- [ ] Las tendencias temporales estan visualizadas\n- [ ] Los white spaces estan identificados\n- [ ] Las implicaciones son estrategicas, no solo descriptivas",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "investigacion_caso_estudio_analisis",
    "label_title": "Caso Estudio Analisis",
    "category": "investigacion",
    "type": "spec",
    "content": "[inputs]\n- CASO: {{CASO}} > Caso de estudio a analizar (empresa, evento, decision)\n- CONTEXTO: {{CONTEXTO}} > Tu contexto al que quieres transferir las lecciones\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara descomponer un caso de estudio (exito o fracaso) y extraer lecciones transferibles a tu contexto. Aprender de otros es el atajo mas barato hacia la sabiduria.\n\n--- P | PEDIDO ---\n\nArquetipo: Analista de Casos de Estudio con formacion en Harvard Case Method y experiencia en creacion de case studies para escuelas de negocio.\n\nAnalisis de Caso:\n1. Contexto: que empresa, cuando, que sector, que tamano\n2. Situacion: que problema o oportunidad enfrentaban\n3. Decision: que decidieron hacer y por que\n4. Ejecucion: como lo implementaron\n5. Resultado: que paso (metricas si hay)\n6. Lecciones: que se puede generalizar\n7. Transferencia: como aplica esto a {{CONTEXTO}}\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Harvard Case Method: situacion > decision > resultado > leccion\n- Survivorship bias check: tambien analizar fracasos\n- Contextual transfer: la leccion es universal o dependio del contexto?\n- Actionable lessons: cada leccion con 'esto significa que TU deberias...'\n\n--- C | CRITERIO ---\n\nFormato: analisis de caso + lecciones + transferencia a tu contexto.\nTono: analitico-pedagogico.\nAudiencia: decision-maker que quiere aprender de otros.\nAccion: aplicar la leccion #1 a tu situacion.\n\n[checklist]\n- [ ] El contexto del caso esta completo\n- [ ] El resultado tiene metricas o evidencia\n- [ ] Las lecciones son genuinamente transferibles\n- [ ] La conexion con tu contexto es explicita",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "investigacion_regulatory_scan",
    "label_title": "Regulatory Scan",
    "category": "investigacion",
    "type": "spec",
    "content": "[inputs]\n- INICIATIVA: {{INICIATIVA}} > Producto, servicio o iniciativa a evaluar\n- JURISDICCION: {{JURISDICCION}} > Pais o jurisdiccion aplicable\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara mapear el entorno regulatorio que afecta una iniciativa, producto o mercado. Lo que no sabes de regulacion puede matar tu proyecto mas rapido que la competencia.\n\n--- P | PEDIDO ---\n\nArquetipo: Analista Regulatorio con experiencia en compliance, evaluacion de impacto regulatorio y navegacion de marcos legales multijurisdiccionales.\n\nScan regulatorio:\n1. Marco regulatorio actual: leyes, normas, estandares aplicables\n2. Regulaciones en proceso: proyectos de ley, consultaciones publicas\n3. Precedentes: como se han interpretado las regulaciones existentes\n4. Riesgos de compliance: donde podrias estar en incumplimiento\n5. Oportunidades regulatorias: incentivos, subsidios, sandbox\n6. Mapa: regulacion × impacto en tu iniciativa × timeline\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Regulatory scanning: fuentes oficiales, gacetas, parlamentos\n- Impact assessment: como cada regulacion afecta tu operacion\n- Compliance gap analysis: donde estas vs donde deberias estar\n- Regulatory horizon: que viene en los proximos 12-24 meses\n\n--- C | CRITERIO ---\n\nFormato: mapa regulatorio + riesgos + oportunidades.\nTono: tecnico-legal, accesible.\nAudiencia: lider del proyecto + equipo legal.\nAccion: cerrar el gap de compliance de mayor riesgo.\n\n[checklist]\n- [ ] Las regulaciones vigentes estan mapeadas con fuente\n- [ ] Las regulaciones en proceso estan identificadas\n- [ ] Los riesgos de compliance estan cuantificados\n- [ ] Las oportunidades regulatorias son concretas",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "investigacion_literature_review",
    "label_title": "Literature Review",
    "category": "investigacion",
    "type": "spec",
    "content": "[inputs]\n- TEMA: {{TEMA}} > Tema de investigacion\n- ALCANCE: {{ALCANCE}} > (opcional) Alcance (ultimos 5 anos, area especifica, etc.)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara producir una revision de literatura estructurada sobre un tema, identificando el estado del arte, los debates abiertos y los vacios de conocimiento.\n\n--- P | PEDIDO ---\n\nArquetipo: Investigador Academico Senior con experiencia en revisiones sistematicas (PRISMA framework) y publicacion en journals indexados.\n\nLiterature Review:\n1. Pregunta de investigacion\n2. Estrategia de busqueda: bases de datos, keywords, criterios de inclusion/exclusion\n3. Seleccion: cuantos papers encontrados vs incluidos\n4. Extraccion: hallazgos clave por paper (tabla)\n5. Sintesis: que dice la evidencia en su conjunto\n6. Debates abiertos: donde la evidencia es contradictoria\n7. Vacios: que no se ha investigado todavia\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Systematic review light (no full PRISMA pero con rigor)\n- Evidence hierarchy: meta-analisis > RCT > observacional > opinion\n- Narrative synthesis: contar la historia que cuenta la evidencia\n- Critical appraisal: no toda evidencia pesa igual\n\n--- C | CRITERIO ---\n\nFormato: tabla de papers + sintesis narrativa + debates + vacios.\nTono: academico-accesible.\nAudiencia: profesional que necesita base de evidencia solida.\nAccion: usar la sintesis como fundamento para decisiones.\n\n[checklist]\n- [ ] La estrategia de busqueda es reproducible\n- [ ] La tabla de extraccion cubre los papers clave\n- [ ] Los debates abiertos estan articulados\n- [ ] Los vacios son oportunidades de investigacion",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "investigacion_analisis_redes_influencia",
    "label_title": "Analisis Redes Influencia",
    "category": "investigacion",
    "type": "spec",
    "content": "[inputs]\n- ECOSISTEMA: {{ECOSISTEMA}} > Ecosistema o industria a mapear\n- OBJETIVO: {{OBJETIVO}} > Que quieres lograr en este ecosistema\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara mapear redes de influencia en un ecosistema: quien influye a quien, donde estan los nodos de poder y como fluye la informacion.\n\n--- P | PEDIDO ---\n\nArquetipo: Analista de Redes Sociales con formacion en network science y experiencia en mapeo de ecosistemas de influencia para estrategia de negocios.\n\nAnalisis de Red:\n1. Identificar actores clave del ecosistema (min. 20)\n2. Mapear relaciones: quien influye a quien, tipo de relacion\n3. Nodos de poder: actores con mas conexiones (hubs)\n4. Bridges: actores que conectan sub-comunidades\n5. Clusters: grupos densos de relaciones mutuas\n6. Implicaciones estrategicas: a quien acercarse, a traves de quien\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Network analysis: centralidad, betweenness, clustering\n- Influence mapping: formal (jerarquia) + informal (relaciones)\n- Structural holes: donde hay gaps que puedes llenar\n- Strategy: acceder al cluster correcto a traves del bridge correcto\n\n--- C | CRITERIO ---\n\nFormato: mapa de red (texto o diagrama) + analisis de nodos + estrategia.\nTono: estrategico.\nAudiencia: profesional que necesita navegar un ecosistema.\nAccion: conectar con el bridge mas estrategico.\n\n[checklist]\n- [ ] Min. 20 actores identificados\n- [ ] Los tipos de relacion estan diferenciados\n- [ ] Los hubs y bridges estan senalados\n- [ ] La estrategia de acceso es concreta",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "investigacion_scenario_planning_futuros",
    "label_title": "Scenario Planning Futuros",
    "category": "investigacion",
    "type": "spec",
    "content": "[inputs]\n- PREGUNTA: {{PREGUNTA}} > Pregunta estrategica sobre el futuro\n- HORIZONTE: {{HORIZONTE}} > Horizonte temporal (3, 5, 10 anos)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara construir escenarios plausibles del futuro que permitan tomar decisiones robustas ante la incertidumbre. No predecir el futuro — prepararse para varios.\n\n--- P | PEDIDO ---\n\nArquetipo: Futurista y Scenario Planner con formacion en prospectiva estrategica (Shell method) y experiencia en talleres de escenarios para comites directivos.\n\nScenario Planning:\n1. Focal question: que necesitamos decidir?\n2. Driving forces: fuerzas que moldean el futuro del tema (STEEP)\n3. Critical uncertainties: las 2 fuerzas mas inciertas y de mayor impacto\n4. 4 escenarios: cruce de las 2 incertidumbres en una matriz 2×2\n5. Narrativa por escenario: nombre, historia, como se siente vivir ahi\n6. Implicaciones: que harias diferente en cada escenario\n7. Decisiones robustas: que acciones son buenas en TODOS los escenarios\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Shell/GBN scenario planning method\n- 2×2 matrix: cruzar las 2 incertidumbres mas criticas\n- Wind-tunneling: testear decisiones contra los 4 escenarios\n- No-regret moves: acciones robustas en cualquier futuro\n\n--- C | CRITERIO ---\n\nFormato: 4 escenarios + narrativas + decisiones robustas.\nTono: estrategico, imaginativo pero riguroso.\nAudiencia: equipo de estrategia.\nAccion: implementar las decisiones no-regret.\n\n[checklist]\n- [ ] Las 2 incertidumbres criticas estan justificadas\n- [ ] Los 4 escenarios son plausibles y diferenciados\n- [ ] Las narrativas son vividas (no solo descriptivas)\n- [ ] Las decisiones robustas funcionan en los 4 escenarios",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "investigacion_data_collection_plan",
    "label_title": "Data Collection Plan",
    "category": "investigacion",
    "type": "spec",
    "content": "[inputs]\n- PREGUNTA: {{PREGUNTA}} > Que necesitas saber\n- RECURSOS: {{RECURSOS}} > (opcional) Presupuesto y tiempo disponible\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar un plan de recoleccion de datos que garantice informacion util, confiable y accionable. Recolectar datos sin plan es acumular ruido.\n\n--- P | PEDIDO ---\n\nArquetipo: Investigador de Mercado con experiencia en diseno de estudios, metodologia de encuestas y analisis cuantitativo/cualitativo.\n\nPlan de recoleccion de datos:\n1. Pregunta de investigacion: que necesitas saber EXACTAMENTE\n2. Tipo de dato: cuantitativo, cualitativo, mixto\n3. Fuentes: primarias (encuestas, entrevistas) vs secundarias (reportes, bases)\n4. Muestra: quien, cuantos, como seleccionarlos\n5. Instrumento: cuestionario, guia, protocolo\n6. Timeline: cuando recolectar, cuanto tiempo\n7. Analisis previsto: como vas a analizar ANTES de recolectar\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Research design: la pregunta determina el metodo, no al reves\n- Sample design: representatividad > volumen\n- Instrument design: preguntas que produzcan datos analizables\n- Pre-mortem: que puede salir mal en la recoleccion\n\n--- C | CRITERIO ---\n\nFormato: plan de investigacion completo + instrumento borrador.\nTono: metodologico.\nAudiencia: equipo de investigacion.\nAccion: lanzar la recoleccion segun el plan.\n\n[checklist]\n- [ ] La pregunta de investigacion es especifica y contestable\n- [ ] El metodo es apropiado para la pregunta\n- [ ] La muestra esta justificada\n- [ ] El analisis previsto esta definido ANTES de recolectar",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "investigacion_media_monitoring_alertas",
    "label_title": "Media Monitoring Alertas",
    "category": "investigacion",
    "type": "spec",
    "content": "[inputs]\n- TEMA: {{TEMA}} > Tema, empresa o sector a monitorear\n- COMPETIDORES: {{COMPETIDORES}} > (opcional) Competidores a incluir en benchmark\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara monitorear sistematicamente la cobertura mediatica de un tema, empresa o sector. Lo que no monitoreas, te sorprende.\n\n--- P | PEDIDO ---\n\nArquetipo: Especialista en Media Intelligence con experiencia en monitoreo de medios, analisis de cobertura y crisis communications.\n\nMedia Monitoring:\n1. Keywords y queries de busqueda configurados\n2. Fuentes: medios nacionales, internacionales, especializados, blogs, podcasts\n3. Dashboard: volumen, sentimiento, medios, tono\n4. Alertas: triggers automaticos para cobertura critica\n5. Analisis semanal: que se dijo, que importa, que hacer\n6. Benchmark: tu cobertura vs competidores (share of voice)\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Media monitoring best practices\n- Sentiment analysis: positivo/neutro/negativo por fuente\n- Share of voice: tu presencia vs competencia\n- Tiered alerting: critico (inmediato) / importante (diario) / FYI (semanal)\n\n--- C | CRITERIO ---\n\nFormato: configuracion de monitoreo + template de reporte semanal.\nTono: operativo.\nAudiencia: equipo de comunicaciones o PR.\nAccion: configurar alertas hoy.\n\n[checklist]\n- [ ] Los keywords cubren variantes y contextos\n- [ ] Las fuentes son diversas (no solo un tipo)\n- [ ] Las alertas tienen niveles de severidad\n- [ ] El benchmark incluye competidores",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "investigacion_expert_interview_guide",
    "label_title": "Expert Interview Guide",
    "category": "investigacion",
    "type": "spec",
    "content": "[inputs]\n- EXPERTO: {{EXPERTO}} > Nombre y perfil del experto a entrevistar\n- TEMA: {{TEMA}} > Tema de la entrevista\n- OBJETIVO: {{OBJETIVO}} > Que necesitas saber que solo este experto puede decirte\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara preparar una entrevista con un experto que extraiga maximo conocimiento en minimo tiempo. El arte de la entrevista no es hacer preguntas — es hacer las preguntas correctas.\n\n--- P | PEDIDO ---\n\nArquetipo: Entrevistadora Senior con experiencia en entrevistas de expertos para consultoria estrategica, periodismo investigativo y customer discovery.\n\nGuia de entrevista con experto:\n1. Background research: lo que YA se sabe (no perder tiempo preguntando lo googleable)\n2. Objetivo: que 3 cosas NECESITO saber que solo este experto puede decirme\n3. Preguntas de apertura: generar confianza (2-3 min)\n4. Preguntas core: las 5-7 que importan (abiertas, no dirigidas)\n5. Preguntas de sondeo: para profundizar en respuestas clave\n6. Pregunta de cierre: que no le pregunte que deberia haberle preguntado?\n7. Template de notas: como capturar durante la entrevista\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Funnel approach: de lo amplio a lo especifico\n- Open questions: el experto habla, tu escuchas\n- Laddering: por que > como > ejemplo concreto\n- Silence is a question: dejar espacio para que piense\n\n--- C | CRITERIO ---\n\nFormato: guia de entrevista + background brief + template de notas.\nTono: preparado, profesional.\nAudiencia: quien va a hacer la entrevista.\nAccion: agendar la entrevista con esta guia lista.\n\n[checklist]\n- [ ] El background research esta hecho (no se pregunta lo googleable)\n- [ ] Las 5-7 preguntas core son abiertas y no dirigidas\n- [ ] Las preguntas de sondeo profundizan\n- [ ] La pregunta de cierre captura lo imprevisto",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "investigacion_competitive_intelligence_continua",
    "label_title": "Competitive Intelligence Continua",
    "category": "investigacion",
    "type": "spec",
    "content": "[inputs]\n- EMPRESA: {{EMPRESA}} > Tu empresa\n- COMPETIDORES: {{COMPETIDORES}} > Competidores principales a monitorear\n- SECTOR: {{SECTOR}} > Sector de operacion\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar un sistema de inteligencia competitiva continua, no un ejercicio one-shot. La inteligencia que caduca no es inteligencia — es historia.\n\n--- P | PEDIDO ---\n\nArquetipo: Director de Inteligencia Competitiva con certificacion SCIP y experiencia en programas de CI continua para empresas multinacionales.\n\nSistema de CI continua:\n1. Competidores a monitorear: directos + indirectos + potenciales\n2. Dimensiones de monitoreo: producto, pricing, marketing, hiring, IP, partnerships\n3. Fuentes por competidor: website, redes, job boards, patents, press, earnings\n4. Cadencia: que monitorear diario / semanal / mensual / trimestral\n5. Dashboard de CI: indicadores clave por competidor\n6. Alertas: triggers que requieren accion inmediata\n7. Distribucion: quien recibe que informacion y cuando\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- SCIP CI cycle: plan > collect > analyze > disseminate\n- Early warning system: detectar movimientos antes que sean publicos\n- War gaming: simular que haria cada competidor\n- Intelligence products: different reports for different audiences\n\n--- C | CRITERIO ---\n\nFormato: sistema completo de CI + dashboard + cadencia.\nTono: estrategico-operativo.\nAudiencia: equipo de estrategia.\nAccion: activar el monitoreo con el competidor #1.\n\n[checklist]\n- [ ] Los competidores cubren directos e indirectos\n- [ ] Las dimensiones de monitoreo son exhaustivas\n- [ ] La cadencia es realista y sostenible\n- [ ] Las alertas tienen triggers concretos",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "escritura_brand_voice_document",
    "label_title": "Brand Voice Document",
    "category": "escritura",
    "type": "spec",
    "content": "[inputs]\n- MARCA: {{MARCA}} > Nombre de la marca\n- AUDIENCIA: {{AUDIENCIA}} > Audiencia principal\n- VALORES: {{VALORES}} > 3-5 valores fundamentales de la marca\n- REFERENCIAS: {{REFERENCIAS}} > (opcional) Marcas cuyo tono admiras\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara definir la voz de marca que hace que cada comunicacion sea reconocible, consistente y memorizable. Sin Brand Voice, cada pieza de contenido es de alguien diferente.\n\n--- P | PEDIDO ---\n\nArquetipo: Director Creativo y Estratega de Marca con experiencia en definicion de brand voice para marcas premium en LatAm y Europa.\n\nBrand Voice Document completo:\n1. Arquetipos de marca y personalidad (3 rasgos core)\n2. Espectro tonal: formal/informal, tecnico/accesible, serio/cercano\n3. Vocabulario: palabras que usamos vs palabras que evitamos\n4. Guias por formato (email, redes, presentaciones, web)\n5. 10 ejemplos antes/despues\n6. Anti-patterns: errores comunes a evitar\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Arquetipos de Jung aplicados a marca\n- Tone-of-voice spectrum por contexto\n- Brand dictionary: terms to use / avoid / own\n- Real examples > abstract guidelines\n\n--- C | CRITERIO ---\n\nFormato: documento de referencia con secciones visuales. Tono: profesional con personalidad. Audiencia: cualquier persona que escriba en nombre de la marca. Accion: usar como referencia antes de cada pieza de comunicacion.\n\n[checklist]\n- [ ] Los 3 rasgos de personalidad son claros y diferenciados\n- [ ] El vocabulario tiene min. 20 palabras en usar/evitar\n- [ ] Los 10 ejemplos antes/despues son concretos\n- [ ] Las guias por formato cubren al menos 4 canales",
    "paramCount": 5,
    "keywords": []
  },
  {
    "id": "escritura_reescribir_profesional",
    "label_title": "Reescribir Profesional",
    "category": "escritura",
    "type": "spec",
    "content": "[inputs]\n- TEXTO: {{TEXTO}} > Texto original a reescribir\n- TONO: {{TONO}} > (opcional) Tono deseado (ejecutivo, inspirador, tecnico)\n- AUDIENCIA: {{AUDIENCIA}} > (opcional) Audiencia objetivo\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara elevar un texto a nivel profesional/ejecutivo sin perder el mensaje original. La diferencia entre un borrador y un entregable es la edicion.\n\n--- P | PEDIDO ---\n\nArquetipo: Editor Ejecutivo Senior con experiencia en publicaciones de alto impacto (HBR, MIT Sloan, McKinsey Quarterly) y coaching de escritura para C-levels.\n\nReescritura profesional:\n1. Preservar mensaje central intacto\n2. Eliminar redundancias y relleno\n3. Activar verbos pasivos > activos\n4. Mejorar estructura y flujo logico\n5. Elevar vocabulario sin sacrificar accesibilidad\n6. Presentar antes/despues de las 3 mejoras mas significativas\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Read aloud test: si suena pesado, reescribir\n- One idea per paragraph: estructura clara\n- Strong verbs over adverbs\n- Cut 20%: si el texto mejora al cortar, cortarlo\n\n--- C | CRITERIO ---\n\nFormato: texto reescrito + lista de mejoras aplicadas. Tono: {{TONO}}. Audiencia: {{AUDIENCIA}}. Accion: usar la version reescrita directamente.\n\n[checklist]\n- [ ] El mensaje central se preserva intacto\n- [ ] El texto es min. 20% mas corto\n- [ ] Los verbos pasivos fueron activados\n- [ ] La version final no necesita edicion adicional",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "escritura_storytelling_datos",
    "label_title": "Storytelling Datos",
    "category": "escritura",
    "type": "spec",
    "content": "[inputs]\n- DATOS: {{DATOS}} > Datos o estadisticas a narrar\n- AUDIENCIA: {{AUDIENCIA}} > Audiencia objetivo\n- ACCION: {{ACCION}} > Accion que quieres que tome la audiencia\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara convertir numeros en narrativas que muevan a la accion. Los datos sin historia son ignorados; las historias sin datos son ignoradas. La combinacion es irresistible.\n\n--- P | PEDIDO ---\n\nArquetipo: Data Storyteller Senior con experiencia en periodismo de datos, visualizacion narrativa y presentaciones ejecutivas basadas en evidencia para consultoria.\n\nData storytelling:\n1. Identificar el insight principal que revelan los datos\n2. Crear arco narrativo: contexto > tension > resolucion\n3. Seleccionar las 3-5 cifras mas impactantes\n4. Disenar orden de revelacion para maximo impacto\n5. Sugerir formato visual por tipo de dato\n6. Conectar insight con call to action\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Knaflic Storytelling with Data\n- Find the 'so what': que cambia este dato\n- Declutter: cada elemento visual debe ganarse su lugar\n- Guided attention: el ojo del lector sigue un camino deliberado\n\n--- C | CRITERIO ---\n\nFormato: narrativa + sugerencias de visualizacion + CTA. Tono: persuasivo con base en datos. Audiencia: {{AUDIENCIA}}. Accion: que la audiencia actue basada en la evidencia presentada.\n\n[checklist]\n- [ ] El insight principal esta articulado en 1 oracion\n- [ ] Las 3-5 cifras estan contextualizadas (no sueltas)\n- [ ] El arco narrativo tiene tension y resolucion\n- [ ] La conexion datos > accion es explicita",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "escritura_email_alto_impacto",
    "label_title": "Email Alto Impacto",
    "category": "escritura",
    "type": "spec",
    "content": "[inputs]\n- OBJETIVO: {{OBJETIVO}} > Que necesitas que pase despues de este email\n- DESTINATARIO: {{DESTINATARIO}} > Quien recibe el email y su perfil\n- CONTEXTO: {{CONTEXTO}} > Contexto relevante para el email\n- TONO: {{TONO}} > (opcional) Tono (formal, cercano, urgente)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara escribir emails que se lean, se entiendan y generen la accion deseada en el primer envio. El 60% de emails profesionales no logran su objetivo porque estan mal escriturados.\n\n--- P | PEDIDO ---\n\nArquetipo: Comunicador Ejecutivo con experiencia en email writing para C-levels, negociaciones de alto impacto y comunicacion corporativa.\n\nEmail de alto impacto:\n1. Subject line: maximo 7 palabras, accionable\n2. Primera linea: la conclusion o pedido (no contexto)\n3. Cuerpo: evidencia o contexto minimo necesario\n4. CTA: accion especifica, deadline, formato de respuesta esperado\n5. Version A (3 parrafos) y Version B (5 bullets)\n6. Timing recomendado de envio\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Inverted pyramid: conclusion primero\n- One ask per email: un email, un pedido\n- Scannable formatting: bullets > parrafos densos\n- Subject line = mini-conclusion\n\n--- C | CRITERIO ---\n\nFormato: email listo para copiar/pegar + 2 variantes de subject line. Tono: {{TONO}}. Audiencia: {{DESTINATARIO}}. Accion: obtener la respuesta/accion deseada en 24-48h.\n\n[checklist]\n- [ ] El subject line cabe en 7 palabras\n- [ ] La primera linea contiene el pedido\n- [ ] El CTA tiene accion + deadline + formato esperado\n- [ ] El email no requiere scroll en mobile",
    "paramCount": 5,
    "keywords": []
  },
  {
    "id": "escritura_linkedin_thought_leadership",
    "label_title": "Linkedin Thought Leadership",
    "category": "escritura",
    "type": "spec",
    "content": "[inputs]\n- TEMA: {{TEMA}} > Tema o insight sobre el que quieres escribir\n- EXPERIENCIA: {{EXPERIENCIA}} > Tu experiencia relevante con este tema\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara posicionarte como referente en tu campo a traves de contenido que genere engagement genuino y oportunidades profesionales. LinkedIn premia el valor, no la autopromocion.\n\n--- P | PEDIDO ---\n\nArquetipo: Estratega de LinkedIn y Personal Branding con experiencia en construccion de audiencia B2B (50K+ seguidores) y contenido viral profesional.\n\nPost LinkedIn thought leadership:\n1. Hook irresistible en primeras 2 lineas (scroll-stopper)\n2. Insight original basado en experiencia real\n3. Evidencia: ejemplo concreto, dato o historia\n4. Reflexion que invite a pensar diferente\n5. Cierre con pregunta que genere comentarios\n6. 3 variantes de hook + hashtags recomendados\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Hook formula: pattern interrupt + curiosity gap\n- Insight > opinion: aportar perspectiva unica basada en experiencia\n- Engagement loop: el post invita a conversar, no a consumir\n- Algorithm awareness: estructura que maximiza dwell time\n\n--- C | CRITERIO ---\n\nFormato: post listo para publicar + 3 variantes de hook + hashtags. Tono: autentico, profesional sin ser corporativo. Audiencia: red profesional. Accion: publicar hoy.\n\n[checklist]\n- [ ] El hook detiene el scroll (no es clickbait)\n- [ ] El insight es original (no un lugar comun)\n- [ ] La pregunta de cierre invita respuestas genuinas\n- [ ] El post funciona sin imagenes",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "escritura_secuencia_email_nurturing",
    "label_title": "Secuencia Email Nurturing",
    "category": "escritura",
    "type": "spec",
    "content": "[inputs]\n- PRODUCTO: {{PRODUCTO}} > Producto o servicio que promueves\n- AUDIENCIA: {{AUDIENCIA}} > Perfil del prospecto ideal\n- OBJECION: {{OBJECION}} > La objecion principal de la audiencia\n- TONO: {{TONO}} > (opcional) Tono (formal, cercano, experto)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar una secuencia de emails que guie al prospecto desde interes inicial hasta conversion. El email nurturing bien disenado convierte a desconocidos en clientes sin llamadas en frio.\n\n--- P | PEDIDO ---\n\nArquetipo: Copywriter de Email Marketing con especializacion en secuencias de nurturing, psicologia de persuasion y conversion B2B/B2C.\n\nSecuencia de nurturing (5-7 emails):\n1. Journey del prospecto: awareness > consideration > decision\n2. Email por etapa con objetivo especifico\n3. Subject lines con >30% open rate potencial\n4. Body copy con framework de persuasion (PAS, AIDA, BAB)\n5. CTAs progresivos por email\n6. Timing recomendado entre emails\n7. Variantes A/B del email de conversion\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- PAS: Problem > Agitate > Solve\n- AIDA: Attention > Interest > Desire > Action\n- Reciprocity first: da valor antes de pedir\n- One CTA per email: claridad de accion\n\n--- C | CRITERIO ---\n\nFormato: 5-7 emails completos + timing + A/B del email de conversion.\nTono: {{TONO}}.\nAudiencia: {{AUDIENCIA}}.\nAccion: programar la secuencia en el ESP.\n\n[checklist]\n- [ ] Cada email tiene objetivo y CTA claros\n- [ ] Los subject lines son especificos y no genericos\n- [ ] La progresion del journey es logica\n- [ ] Las variantes A/B del email clave estan listas",
    "paramCount": 5,
    "keywords": []
  },
  {
    "id": "escritura_copy_landing_page",
    "label_title": "Copy Landing Page",
    "category": "escritura",
    "type": "spec",
    "content": "[inputs]\n- PRODUCTO: {{PRODUCTO}} > Producto o servicio\n- AUDIENCIA: {{AUDIENCIA}} > Perfil del visitante ideal\n- PROPUESTA_VALOR: {{PROPUESTA_VALOR}} > Propuesta de valor principal\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara escribir el copy de una landing page que convierta visitantes en leads o clientes. Cada seccion tiene un trabajo: el hero captura, el body convence, el CTA convierte.\n\n--- P | PEDIDO ---\n\nArquetipo: Conversion Copywriter con experiencia en landing pages de alto rendimiento (>10% conversion rate) para SaaS, educacion y servicios.\n\nCopy de Landing Page:\n1. Hero: headline + subheadline + CTA principal (above the fold)\n2. Pain points: 3-4 problemas que el visitante reconoce como propios\n3. Solucion: como tu producto/servicio resuelve cada pain point\n4. Social proof: testimonios, logos, numeros, casos\n5. Features > Benefits: que incluye y por que importa\n6. Objeciones: FAQ que anticipa y resuelve dudas\n7. CTA final: urgencia + claridad + bajo riesgo\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- AIDA: Attention (hero) > Interest (pain) > Desire (solution) > Action (CTA)\n- One page, one offer, one CTA\n- Specificity > generality: numeros concretos, no adjetivos vagos\n- Risk reversal: garantia, trial, cancela cuando quieras\n\n--- C | CRITERIO ---\n\nFormato: copy seccion por seccion listo para implementar.\nTono: persuasivo sin ser agresivo.\nAudiencia: {{AUDIENCIA}}.\nAccion: implementar el copy en la landing.\n\n[checklist]\n- [ ] El headline comunica el beneficio principal en <10 palabras\n- [ ] Los pain points son reconocibles por la audiencia\n- [ ] El social proof es concreto (numeros, nombres)\n- [ ] El CTA tiene claridad + urgencia + bajo riesgo",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "escritura_caso_exito_cliente",
    "label_title": "Caso Exito Cliente",
    "category": "escritura",
    "type": "spec",
    "content": "[inputs]\n- CLIENTE: {{CLIENTE}} > Nombre o perfil del cliente\n- RESULTADO: {{RESULTADO}} > Principal resultado logrado\n- DETALLES: {{DETALLES}} > Detalles del proyecto o engagement\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara documentar un caso de exito que sirva como herramienta de ventas. Un buen caso de exito no es un testimonio — es una historia que el prospecto ve como espejo de su propia situacion.\n\n--- P | PEDIDO ---\n\nArquetipo: Storyteller Corporativo con experiencia en redaccion de case studies para empresas B2B de tecnologia y consultoria.\n\nCaso de exito:\n1. Headline con resultado cuantificable\n2. Perfil del cliente: empresa, sector, tamano, rol del contacto\n3. Desafio: que problema enfrentaba (con detalle)\n4. Solucion: que se hizo y por que esa solucion\n5. Implementacion: como se ejecuto (timeline)\n6. Resultados: metricas antes/despues (cuantificables)\n7. Quote del cliente (textual)\n8. Llamado a accion\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Situation > Challenge > Solution > Results (SCSR)\n- Show, don't tell: metricas > adjetivos\n- Mirror effect: el prospecto debe verse reflejado\n- Permission: verificar con el cliente antes de publicar\n\n--- C | CRITERIO ---\n\nFormato: caso de exito de 1-2 paginas listo para ventas.\nTono: profesional, basado en resultados.\nAudiencia: prospectos similares al cliente del caso.\nAccion: usar en el proximo pitch de ventas.\n\n[checklist]\n- [ ] El headline tiene resultado cuantificable\n- [ ] El desafio es especifico (no generico)\n- [ ] Los resultados tienen metricas antes/despues\n- [ ] Incluye quote textual del cliente",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "escritura_propuesta_comercial",
    "label_title": "Propuesta Comercial",
    "category": "escritura",
    "type": "spec",
    "content": "[inputs]\n- CLIENTE: {{CLIENTE}} > Empresa o persona a quien va la propuesta\n- PROBLEMA: {{PROBLEMA}} > Problema principal del cliente\n- SOLUCION: {{SOLUCION}} > Tu solucion a alto nivel\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara escribir una propuesta comercial que cierre. La propuesta no es un catalogo — es un documento de decision que le dice al cliente: entiendo tu problema, tengo la solucion, y esto es lo que sigue.\n\n--- P | PEDIDO ---\n\nArquetipo: Consultor de Desarrollo de Negocio con experiencia en redaccion de propuestas ganadoras para consultoria, tecnologia y servicios profesionales.\n\nPropuesta comercial:\n1. Resumen ejecutivo: problema, solucion, impacto en 1 pagina\n2. Entendimiento del problema: demostrar que entiendes su dolor\n3. Solucion propuesta: que, como, con quien\n4. Metodologia: fases, timeline, entregables por fase\n5. Equipo: quienes trabajaran y por que son los indicados\n6. Inversion: pricing con opciones (basico/estandar/premium)\n7. Proximos pasos: como arrancar (low-friction)\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Lead with understanding: demostrar que entiendes antes de proponer\n- Value-based pricing: precio conectado a valor, no a costo\n- Options architecture: 3 opciones (el 80% elige la del medio)\n- Easy next step: que el paso siguiente sea simple\n\n--- C | CRITERIO ---\n\nFormato: propuesta de 5-10 paginas, profesional.\nTono: consultivo, no vendedor.\nAudiencia: decision-maker del cliente.\nAccion: cerrar el deal.\n\n[checklist]\n- [ ] El resumen ejecutivo permite decidir sin leer mas\n- [ ] El entendimiento del problema demuestra escucha\n- [ ] Las opciones de pricing son claras y justificadas\n- [ ] El proximo paso es de baja friccion",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "escritura_newsletter_engagement",
    "label_title": "Newsletter Engagement",
    "category": "escritura",
    "type": "spec",
    "content": "[inputs]\n- NEWSLETTER: {{NEWSLETTER}} > Nombre o tema de tu newsletter\n- AUDIENCIA: {{AUDIENCIA}} > Perfil de tu suscriptor\n- TEMA: {{TEMA}} > Tema de esta edicion\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara escribir newsletters que la gente abra, lea y espere con anticipacion. El 80% de newsletters se ignoran porque son listas de links. La tuya sera una experiencia.\n\n--- P | PEDIDO ---\n\nArquetipo: Editor de Newsletter con experiencia en newsletters de alto engagement (>40% open rate) para comunidades profesionales.\n\nNewsletter de alto engagement:\n1. Subject line: curiosidad + beneficio en <50 caracteres\n2. Intro hook: 2 lineas que enganchan (historia, dato, pregunta)\n3. Contenido principal: 1 tema profundo (no 10 superficiales)\n4. Formato scannable: bullets, bold, subheadings\n5. CTA: 1 accion clara al final\n6. Personal touch: voz humana, no corporativa\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- One big idea: cada newsletter sobre 1 tema, no 10\n- Value upfront: el valor esta en el email, no en links externos\n- Consistent format: el lector sabe que esperar\n- Reply trigger: invitar respuesta para crear comunidad\n\n--- C | CRITERIO ---\n\nFormato: newsletter lista para enviar.\nTono: personal, como si escribieras a un amigo inteligente.\nAudiencia: suscriptores de {{NEWSLETTER}}.\nAccion: enviar.\n\n[checklist]\n- [ ] El subject line genera curiosidad genuina\n- [ ] El contenido aporta valor sin requerir clicks\n- [ ] El formato es scannable en 30 segundos\n- [ ] El CTA es 1 y es claro",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "escritura_presentacion_ejecutiva_script",
    "label_title": "Presentacion Ejecutiva Script",
    "category": "escritura",
    "type": "spec",
    "content": "[inputs]\n- TEMA: {{TEMA}} > Tema de la presentacion\n- AUDIENCIA: {{AUDIENCIA}} > Audiencia (board, inversores, equipo, clientes)\n- DURACION: {{DURACION}} > Duracion disponible\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara escribir el guion de una presentacion ejecutiva que persuada y mueva a la accion. El script no son las slides — es lo que DICES mientras las slides soportan visualmente.\n\n--- P | PEDIDO ---\n\nArquetipo: Coach de Presentaciones Ejecutivas con experiencia en preparacion de C-levels para boards, inversores y keynotes.\n\nScript de presentacion:\n1. Opening hook: historia, dato o pregunta que capture en 30 seg\n2. Problema: por que estamos aqui (tension)\n3. Solucion: tu propuesta (resolucion)\n4. Evidencia: datos que soportan cada afirmacion\n5. Call to action: que quieres que hagan\n6. Closing: frase memorable que resuene\n7. Notas por slide: que decir, cuanto tiempo, transicion\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Duarte Resonate: what is > what could be > call to action\n- 10-20-30: max 10 slides, 20 min, font 30pt\n- Storytelling arc: setup > conflict > resolution\n- Practice rule: 1 hora de practica por 10 min de presentacion\n\n--- C | CRITERIO ---\n\nFormato: guion completo con notas por slide + timing.\nTono: ejecutivo, persuasivo.\nAudiencia: {{AUDIENCIA}}.\nAccion: presentar con confianza.\n\n[checklist]\n- [ ] El opening hook funciona en 30 segundos\n- [ ] Cada slide tiene nota de lo que decir\n- [ ] El timing total cabe en el tiempo asignado\n- [ ] El CTA es 1 y es inequivoco",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "escritura_informe_ejecutivo",
    "label_title": "Informe Ejecutivo",
    "category": "escritura",
    "type": "spec",
    "content": "[inputs]\n- TEMA: {{TEMA}} > Tema del informe\n- DATOS: {{DATOS}} > Datos o hallazgos principales\n- AUDIENCIA: {{AUDIENCIA}} > Quien lee este informe\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara producir un informe ejecutivo que un C-level pueda leer en 5 minutos y tomar decisiones. El informe ejecutivo no es un resumen — es una herramienta de decision.\n\n--- P | PEDIDO ---\n\nArquetipo: Redactor Ejecutivo Senior con experiencia en reportes para boards y comites directivos de empresas multinacionales.\n\nInforme ejecutivo:\n1. Headline: conclusion principal en 1 oracion\n2. Resumen ejecutivo: 5 bullets con lo esencial\n3. Contexto: por que este tema importa ahora\n4. Hallazgos: datos clave organizados por relevancia\n5. Opciones: 2-3 caminos posibles con pros/contras\n6. Recomendacion: que hacer y por que\n7. Proximos pasos: acciones, responsables, fechas\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Piramide de Minto: conclusion primero\n- Bullet-first: cada seccion empieza con lo clave\n- Data-backed: cada afirmacion con evidencia\n- Decision-ready: el lector puede decidir sin leer mas\n\n--- C | CRITERIO ---\n\nFormato: max 2 paginas. Tablas y bullets > parrafos.\nTono: ejecutivo, directo.\nAudiencia: C-level o comite directivo.\nAccion: tomar la decision recomendada.\n\n[checklist]\n- [ ] La conclusion cabe en 1 oracion\n- [ ] El resumen tiene max 5 bullets\n- [ ] Las opciones tienen pros/contras cuantificados\n- [ ] Los proximos pasos tienen responsable y fecha",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "escritura_comunicado_interno",
    "label_title": "Comunicado Interno",
    "category": "escritura",
    "type": "spec",
    "content": "[inputs]\n- CAMBIO: {{CAMBIO}} > Que esta cambiando\n- AUDIENCIA: {{AUDIENCIA}} > Quien recibe el comunicado\n- TIMELINE: {{TIMELINE}} > Cuando entra en vigor\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara redactar un comunicado interno que sea leido, entendido y actuado. El 60% de comunicados internos se ignoran porque no respetan el tiempo del lector.\n\n--- P | PEDIDO ---\n\nArquetipo: Directora de Comunicacion Interna con experiencia en change management y comunicacion corporativa para empresas de 500+ empleados.\n\nComunicado interno:\n1. Subject: accion requerida + tema en <10 palabras\n2. TL;DR: que cambia y que debo hacer en 2 lineas\n3. Contexto: por que se toma esta decision\n4. Que cambia: antes > despues (tabla)\n5. Que debo hacer: acciones concretas por audiencia\n6. Timeline: cuando empieza, cuando completo\n7. Soporte: a quien preguntar si tengo dudas\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- TL;DR first: respetar el tiempo del lector\n- Before/after table: visualizar el cambio\n- Audience-specific actions: no todos deben hacer lo mismo\n- FAQ preemptive: anticipar las 5 preguntas mas comunes\n\n--- C | CRITERIO ---\n\nFormato: comunicado listo para enviar. Max 1 pagina.\nTono: claro, respetuoso, sin corporate-speak.\nAudiencia: equipo o empresa completa.\nAccion: que el 80% actue sin necesidad de reunion explicativa.\n\n[checklist]\n- [ ] El TL;DR cabe en 2 lineas\n- [ ] La tabla antes/despues es clara\n- [ ] Las acciones son especificas por audiencia\n- [ ] Incluye a quien preguntar para dudas",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "escritura_articulo_blog_seo",
    "label_title": "Articulo Blog Seo",
    "category": "escritura",
    "type": "spec",
    "content": "[inputs]\n- KEYWORD: {{KEYWORD}} > Keyword principal objetivo\n- AUDIENCIA: {{AUDIENCIA}} > Perfil del lector\n- LONGITUD: {{LONGITUD}} > (opcional) Longitud objetivo (1500, 2500, 4000 palabras)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara escribir un articulo de blog que rankee en Google Y sea valioso para el lector. SEO sin valor es spam. Valor sin SEO es invisible.\n\n--- P | PEDIDO ---\n\nArquetipo: Content Strategist y SEO Writer con experiencia en contenido que rankea top 3 en nichos competitivos.\n\nArticulo de blog SEO:\n1. Keyword research: keyword principal + 5 keywords secundarias\n2. Title: keyword + benefit en <60 caracteres\n3. Meta description: hook + keyword en <160 caracteres\n4. H2/H3 structure: outline con keywords naturalmente integradas\n5. Intro: hook + promesa + credibilidad (100 palabras)\n6. Body: contenido sustancial por seccion (no relleno)\n7. CTA: que hacer despues de leer\n8. Internal/external links: min. 3 + 2\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Keyword-first outline: la estructura sigue las busquedas\n- E-E-A-T: Experience, Expertise, Authority, Trust\n- Skyscraper: mejor que todo lo que ya esta rankeando\n- Reader-first: escribe para personas, optimiza para Google\n\n--- C | CRITERIO ---\n\nFormato: articulo listo para publicar + metadata SEO.\nTono: experto accesible.\nAudiencia: personas buscando {{KEYWORD}}.\nAccion: publicar y monitorear posicionamiento.\n\n[checklist]\n- [ ] El keyword principal esta en titulo, H2 y primeras 100 palabras\n- [ ] El contenido es sustancialmente mejor que los top 3 actuales\n- [ ] La estructura de H2/H3 es logica y scannable\n- [ ] Los links internos y externos estan incluidos",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "escritura_speech_motivacional",
    "label_title": "Speech Motivacional",
    "category": "escritura",
    "type": "spec",
    "content": "[inputs]\n- TEMA: {{TEMA}} > Tema o mensaje central\n- AUDIENCIA: {{AUDIENCIA}} > Audiencia del discurso\n- DURACION: {{DURACION}} > Duracion (5, 10, 15, 20 min)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara escribir un discurso que inspire accion. Un buen speech no informa — transforma. El publico debe irse diferente de como llego.\n\n--- P | PEDIDO ---\n\nArquetipo: Speechwriter con experiencia en redaccion de discursos para CEOs, candidatos politicos y speakers de TEDx.\n\nSpeech motivacional:\n1. Opening: historia personal que conecte emocionalmente (60 seg)\n2. Problema compartido: algo que la audiencia reconoce como propio\n3. Turning point: el momento de cambio (tu experiencia o caso)\n4. Framework: el modelo o principio que cambia todo\n5. Evidencia: 2-3 ejemplos que demuestren que funciona\n6. Call to action: 1 cosa que pueden hacer HOY\n7. Closing: frase que resuene y se recuerde\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Hero's journey: ordinary world > challenge > transformation > return\n- Vulnerability: la autenticidad conecta mas que la perfeccion\n- Rule of 3: 3 ejemplos, 3 puntos, 3 acciones\n- Callback: cerrar con referencia al opening (full circle)\n\n--- C | CRITERIO ---\n\nFormato: guion completo con timing por seccion.\nTono: autentico, vulnerable, inspirador.\nAudiencia: {{AUDIENCIA}}.\nAccion: que el publico haga 1 cosa diferente manana.\n\n[checklist]\n- [ ] El opening es una historia personal (no una estadistica)\n- [ ] El problema compartido es universal para la audiencia\n- [ ] El CTA es 1 y es ejecutable manana\n- [ ] El closing referencia el opening (full circle)",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "escritura_white_paper_autoridad",
    "label_title": "White Paper Autoridad",
    "category": "escritura",
    "type": "spec",
    "content": "[inputs]\n- TEMA: {{TEMA}} > Tema del white paper\n- FRAMEWORK: {{FRAMEWORK}} > (opcional) Tu framework o perspectiva unica\n- SECTOR: {{SECTOR}} > Sector de tu audiencia\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara producir un white paper que posicione tu organizacion como autoridad en un tema. El white paper no vende — educa. Y al educar, genera confianza que se convierte en negocio.\n\n--- P | PEDIDO ---\n\nArquetipo: Content Strategist Senior con experiencia en white papers B2B para empresas de tecnologia, consultoria y servicios financieros.\n\nWhite Paper:\n1. Titulo: beneficio + tema especifico\n2. Resumen ejecutivo: problema, hallazgos, recomendacion (1 pag)\n3. Introduccion: por que este tema importa ahora\n4. Problema: diagnostico profundo basado en datos\n5. Solucion/Framework: tu perspectiva unica (aqui esta la autoridad)\n6. Evidencia: casos, datos, investigacion\n7. Recomendaciones: pasos accionables\n8. Sobre nosotros: 1 parrafo, no un brochure\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Educate, don't sell: el 90% es valor, el 10% es posicionamiento\n- Original research > compiled research: datos propios pesan mas\n- Framework propio: nombra tu metodologia (esto genera autoridad)\n- Gate it: el white paper es el incentivo para capturar leads\n\n--- C | CRITERIO ---\n\nFormato: white paper de 8-15 paginas, disenado profesionalmente.\nTono: autoritativo, educativo.\nAudiencia: decision-makers y early adopters del sector.\nAccion: descargar genera lead, leer genera confianza.\n\n[checklist]\n- [ ] El framework/perspectiva es genuinamente unico\n- [ ] Los datos y evidencia son solidos\n- [ ] El tono es educativo, no comercial\n- [ ] El call to action es sutil y de valor",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "escritura_thread_twitter_viral",
    "label_title": "Thread Twitter Viral",
    "category": "escritura",
    "type": "spec",
    "content": "[inputs]\n- TEMA: {{TEMA}} > Tema del thread\n- INSIGHTS: {{INSIGHTS}} > Insights o datos clave a incluir\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara escribir un thread de Twitter/X que genere alcance y engagement. Un buen thread es un blog post condensado con la tension de una serie de TV.\n\n--- P | PEDIDO ---\n\nArquetipo: Growth Writer con experiencia en threads virales (100K+ impressions) y construccion de audiencia en Twitter/X.\n\nThread viral:\n1. Tweet 1 (hook): promesa + curiosidad en <280 chars\n2. Tweet 2-3: contexto del problema (tension)\n3. Tweet 4-8: contenido principal (valor, frameworks, datos)\n4. Tweet 9-10: ejemplos o casos concretos\n5. Tweet 11: resumen de takeaways\n6. Tweet 12: CTA + retweet ask\n7. Alt hook: 2 variantes del tweet 1\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Hook > Value > CTA: estructura de todo hilo\n- 1 idea per tweet: claridad maxima\n- Lists and frameworks: contenido que se guarda\n- Self-contained: cada tweet debe funcionar solo\n\n--- C | CRITERIO ---\n\nFormato: thread completo tweet por tweet + 2 hooks alternativos.\nTono: conversacional, valor-denso.\nAudiencia: profesionales de tu nicho.\nAccion: publicar en hora optima.\n\n[checklist]\n- [ ] El hook genera curiosidad sin ser clickbait\n- [ ] Cada tweet aporta valor standalone\n- [ ] El contenido es framework/lista (guardable)\n- [ ] El CTA es natural, no forzado",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "escritura_copy_producto_features",
    "label_title": "Copy Producto Features",
    "category": "escritura",
    "type": "spec",
    "content": "[inputs]\n- PRODUCTO: {{PRODUCTO}} > Producto o servicio\n- FEATURES: {{FEATURES}} > Lista de features a traducir\n- CLIENTE: {{CLIENTE}} > Perfil del cliente ideal\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara transformar features tecnicas en beneficios que el cliente entienda y desee. El cliente no compra caracteristicas — compra transformaciones.\n\n--- P | PEDIDO ---\n\nArquetipo: Product Copywriter con experiencia en SaaS copywriting, product marketing y conversion de features a benefits.\n\nFeature-to-Benefit Copy:\n1. Lista de features del producto\n2. Para cada feature: 'So what?' test (por que le importa al cliente)\n3. Beneficio: traduccion a lenguaje del cliente\n4. Headline por feature: beneficio en 1 linea\n5. Microcopy: descripcion de 2-3 lineas\n6. Social proof por feature (si existe)\n7. Jerarquia: features ordenadas por importancia para el cliente\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Features tell, benefits sell\n- So what? test: repetir hasta llegar al beneficio real\n- Jobs-to-be-Done: que trabajo contrata el cliente\n- Voice of Customer: usar las palabras del cliente\n\n--- C | CRITERIO ---\n\nFormato: tabla Feature > Benefit > Headline > Microcopy.\nTono: claro, centrado en el cliente.\nAudiencia: potenciales compradores.\nAccion: actualizar la pagina de producto.\n\n[checklist]\n- [ ] Cada feature tiene beneficio explicitado\n- [ ] Los beneficios usan lenguaje del cliente, no tecnico\n- [ ] La jerarquia refleja prioridades del cliente\n- [ ] Los headlines son concretos, no genericos",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "escritura_guion_podcast",
    "label_title": "Guion Podcast",
    "category": "escritura",
    "type": "spec",
    "content": "[inputs]\n- PODCAST: {{PODCAST}} > Nombre y tema del podcast\n- TEMA_EPISODIO: {{TEMA_EPISODIO}} > Tema de este episodio\n- DURACION: {{DURACION}} > Duracion objetivo del episodio\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara producir un guion de podcast que mantenga la atencion del oyente de principio a fin. El audio es implacable: si pierdes la atencion, el oyente se va y no vuelve.\n\n--- P | PEDIDO ---\n\nArquetipo: Producer de Podcasts con experiencia en produccion de podcasts top 10 en Spotify LatAm para marcas y creadores independientes.\n\nGuion de podcast:\n1. Cold open: 15 segundos que enganchan (dato, pregunta, historia)\n2. Intro: bienvenida + que va a aprender el oyente\n3. Segmento 1: setup del tema (contexto + por que importa)\n4. Segmento 2: contenido principal (insights, datos, historias)\n5. Segmento 3: aplicacion practica (que puede hacer el oyente)\n6. Cierre: resumen + CTA + preview del proximo episodio\n7. Timestamps para edicion\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Open loop: crear curiosidad que se resuelve mas adelante\n- Variety: alternar entre datos, historias, y takeaways\n- Pacing: cambiar ritmo cada 5-7 minutos\n- Conversational: escribir como hablas, no como escribes\n\n--- C | CRITERIO ---\n\nFormato: guion con timestamps + notas de produccion.\nTono: conversacional, como si hablaras con un amigo inteligente.\nAudiencia: oyentes de {{PODCAST}}.\nAccion: grabar el episodio.\n\n[checklist]\n- [ ] El cold open funciona en 15 segundos\n- [ ] Los segmentos alternan entre informar y entretener\n- [ ] El contenido tiene takeaways accionables\n- [ ] Los timestamps permiten edicion precisa",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "escritura_micro_contenido_redes",
    "label_title": "Micro Contenido Redes",
    "category": "escritura",
    "type": "spec",
    "content": "[inputs]\n- PERFIL: {{PERFIL}} > Tu perfil de redes y nicho\n- TEMA: {{TEMA}} > Tema del contenido\n- PLATAFORMA: {{PLATAFORMA}} > Plataforma destino (Instagram, TikTok, LinkedIn)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara producir piezas de micro-contenido (carruseles, stories, reels scripts) que generen engagement en redes sociales. En redes, menos es mas y rapido gana.\n\n--- P | PEDIDO ---\n\nArquetipo: Social Media Content Creator con experiencia en contenido viral para Instagram, TikTok y LinkedIn (10M+ reach mensual).\n\nMicro-contenido para redes:\n1. Formato optimo segun plataforma y mensaje\n2. Hook visual/textual en 1-2 segundos\n3. Contenido: 1 idea, no mas\n4. Estructura: problema > solucion > CTA (en <60 seg o <10 slides)\n5. Captions: con hook propio + hashtags estrategicos\n6. 3 variantes del mismo contenido para A/B\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Platform-native: cada red tiene su lenguaje\n- Save > like: contenido que se guarda (listas, frameworks, tips)\n- Pattern interrupt: romper el scroll con algo inesperado\n- Repurpose: 1 idea grande = 5 piezas de micro-contenido\n\n--- C | CRITERIO ---\n\nFormato: 3 piezas de micro-contenido listas para publicar.\nTono: nativo de la plataforma.\nAudiencia: seguidores de {{PERFIL}}.\nAccion: publicar la pieza #1 hoy.\n\n[checklist]\n- [ ] El hook funciona en 2 segundos o menos\n- [ ] Cada pieza tiene 1 sola idea clara\n- [ ] El formato es nativo de la plataforma\n- [ ] Las 3 variantes son genuinamente diferentes",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "escritura_resumen_libro_accionable",
    "label_title": "Resumen Libro Accionable",
    "category": "escritura",
    "type": "spec",
    "content": "[inputs]\n- LIBRO: {{LIBRO}} > Titulo y autor del libro\n- CONTEXTO: {{CONTEXTO}} > Tu contexto profesional para la aplicacion\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara producir un resumen de libro que no sea Wikipedia sino una herramienta de aplicacion. El resumen bueno te ahorra leer el libro Y te permite implementar las ideas.\n\n--- P | PEDIDO ---\n\nArquetipo: Book Reviewer y Knowledge Synthesizer con experiencia en resumenes ejecutivos de libros de negocio para C-levels.\n\nResumen accionable de libro:\n1. Thesis: la idea central del libro en 1 oracion\n2. Framework: el modelo o metodologia del autor (visual)\n3. Top 5 ideas con explicacion (2-3 oraciones cada una)\n4. Quotes clave: las 3 frases mas poderosas del libro\n5. Critica: donde el libro falla o es debil\n6. Aplicacion: como aplico las 3 ideas principales a MI contexto\n7. Decision: leer el libro completo SI/NO y por que\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Thesis-first: la gran idea antes que los detalles\n- Visual framework: si el autor tiene un modelo, visualizarlo\n- Actionable extraction: cada idea con 'esto significa que puedo...'\n- Honest critique: no todo libro merece 5 estrellas\n\n--- C | CRITERIO ---\n\nFormato: resumen de 2 paginas + framework visual + aplicacion personal.\nTono: analitico, personal.\nAudiencia: profesional que quiere el 80% del valor en 20% del tiempo.\nAccion: implementar la idea #1 esta semana.\n\n[checklist]\n- [ ] La thesis cabe en 1 oracion\n- [ ] El framework del autor esta visualizado\n- [ ] La critica es honesta\n- [ ] La aplicacion personal es concreta y accionable",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "escritura_faq_completa_producto",
    "label_title": "Faq Completa Producto",
    "category": "escritura",
    "type": "spec",
    "content": "[inputs]\n- PRODUCTO: {{PRODUCTO}} > Producto o servicio\n- PREGUNTAS_COMUNES: {{PREGUNTAS_COMUNES}} > (opcional) Preguntas frecuentes que ya recibes\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear una FAQ que anticipe y resuelva el 80% de las dudas antes de que las pregunten. Una buena FAQ es ventas + soporte + educacion en un solo documento.\n\n--- P | PEDIDO ---\n\nArquetipo: UX Writer con experiencia en documentacion de producto, help centers y reduccion de tickets de soporte.\n\nFAQ completa:\n1. Categorias: pre-compra, uso, troubleshooting, facturacion, otros\n2. Top 20 preguntas reales (no inventadas)\n3. Respuesta por pregunta: directa, sin rodeos, con ejemplo si aplica\n4. Links a recursos adicionales donde aplique\n5. Formato scannable: la respuesta en 1 linea + expansion si se necesita\n6. Preguntas que llevan a conversion (CTA integrado)\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Real questions: extraer de soporte, ventas, chat, reviews\n- Answer first: la respuesta en la primera oracion\n- Objection handling: las preguntas de pre-compra son objeciones disfrazadas\n- Living document: actualizar con cada pregunta nueva recurrente\n\n--- C | CRITERIO ---\n\nFormato: FAQ organizada por categorias, scannable.\nTono: claro, util, sin jerga.\nAudiencia: clientes actuales y potenciales.\nAccion: publicar y reducir tickets de soporte.\n\n[checklist]\n- [ ] Las preguntas son reales (no genericas)\n- [ ] Las respuestas son directas (primera oracion responde)\n- [ ] Las categorias facilitan la navegacion\n- [ ] Las preguntas de pre-compra tienen CTA sutil",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "escritura_elevator_pitch",
    "label_title": "Elevator Pitch",
    "category": "escritura",
    "type": "spec",
    "content": "[inputs]\n- EMPRESA: {{EMPRESA}} > Tu empresa o proyecto\n- PROPUESTA: {{PROPUESTA}} > Tu propuesta de valor\n- AUDIENCIA: {{AUDIENCIA}} > Audiencia principal del pitch\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara condensar tu propuesta de valor en 30 segundos que generen interes genuino. El elevator pitch no cierra ventas — abre conversaciones.\n\n--- P | PEDIDO ---\n\nArquetipo: Coach de Comunicacion Ejecutiva con experiencia en pitch coaching para startups YCombinator y Techstars.\n\nElevator Pitch:\n1. Hook: 1 oracion que genere curiosidad (dato, pregunta, afirmacion sorprendente)\n2. Problema: para quien y que dolor resuelves\n3. Solucion: que haces, en terminos simples\n4. Diferenciacion: por que tu y no otro\n5. Prueba: 1 dato o caso que demuestre que funciona\n6. CTA: que quieres que pase despues de este pitch\n7. 3 versiones: 15 seg, 30 seg, 60 seg\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Problem > Solution > Proof > CTA\n- Jargon-free: si tu abuela no lo entiende, reescribir\n- Curiosity > comprehension: genera interes, no explicacion completa\n- Practice: el pitch natural requiere 50+ repeticiones\n\n--- C | CRITERIO ---\n\nFormato: 3 versiones (15/30/60 seg) listas para memorizar.\nTono: natural, seguro, no vendedor.\nAudiencia: inversores, clientes, networking.\nAccion: practicar 10 veces hoy.\n\n[checklist]\n- [ ] Las 3 versiones tienen diferente profundidad pero mismo mensaje\n- [ ] El hook genera curiosidad (no confusion)\n- [ ] El lenguaje es libre de jerga\n- [ ] El CTA es claro y de baja friccion",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "escritura_contenido_onboarding",
    "label_title": "Contenido Onboarding",
    "category": "escritura",
    "type": "spec",
    "content": "[inputs]\n- PRODUCTO: {{PRODUCTO}} > Producto, servicio o empresa\n- AUDIENCIA: {{AUDIENCIA}} > Nuevos clientes o empleados\n- AHA_MOMENT: {{AHA_MOMENT}} > Primer momento de valor para el nuevo usuario\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara escribir el contenido del onboarding de un cliente o empleado nuevo. Las primeras 48 horas determinan si alguien se queda comprometido o se pierde.\n\n--- P | PEDIDO ---\n\nArquetipo: Disenador de Experiencias de Onboarding con experiencia en customer success y employee onboarding para SaaS y empresas de servicios.\n\nContenido de Onboarding:\n1. Welcome email: tono calido + que esperar + primer paso\n2. Quick start guide: del zero al primer resultado en <15 min\n3. Secuencia de emails dia 1, 3, 7, 14, 30\n4. FAQ de nuevos: las 10 preguntas que todos hacen al inicio\n5. Milestones: que logros deberia alcanzar en cada semana\n6. Escalation: que hacer si se atasca\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Time to value: minimizar tiempo entre registro y primer resultado\n- Aha moment: disenar el camino hacia la primera experiencia de valor\n- Progressive disclosure: no abrumar con todo, revelar gradualmente\n- Check-in cadence: preguntar como va, no solo enviar contenido\n\n--- C | CRITERIO ---\n\nFormato: secuencia completa de contenido con emails + guia + FAQ.\nTono: calido, util, sin abrumar.\nAudiencia: nuevos clientes o empleados.\nAccion: implementar la secuencia.\n\n[checklist]\n- [ ] El quick start lleva al primer resultado en <15 min\n- [ ] La secuencia de emails tiene cadencia y proposito\n- [ ] Los milestones son medibles por semana\n- [ ] El path de escalation es claro",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "data_analisis_exploratorio_dataset",
    "label_title": "Analisis Exploratorio Dataset",
    "category": "data",
    "type": "spec",
    "content": "[inputs]\n- DATASET: {{DATASET}} > Descripcion del dataset (columnas, filas, tipo)\n- PREGUNTA: {{PREGUNTA}} > Pregunta de negocio a responder\n- HERRAMIENTA: {{HERRAMIENTA}} > (opcional) Herramienta preferida (Excel, Python, Code Interpreter)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara obtener una vision completa de un dataset antes de hacer analisis avanzado. El EDA revela la historia que los datos quieren contar.\n\n--- P | PEDIDO ---\n\nArquetipo: Data Analyst Senior con experiencia en analisis exploratorio, estadistica descriptiva y comunicacion de hallazgos para stakeholders no tecnicos.\n\nAnalisis exploratorio completo:\n1. Auditoria de calidad: missing values, duplicados, tipos de datos\n2. Estadisticas descriptivas por variable\n3. Distribuciones y deteccion de outliers\n4. Correlaciones entre variables\n5. Top 5 insights con implicacion practica\n6. Recomendaciones de analisis profundo\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Data quality assessment primero: garbage in = garbage out\n- Descriptive stats: media, mediana, std, percentiles\n- Visual exploration: histogramas, scatter, boxplots (descritos en texto)\n- So-what: cada hallazgo con implicacion de negocio\n\n--- C | CRITERIO ---\n\nFormato: reporte EDA con estadisticas, hallazgos y recomendaciones. Tono: analitico-accesible. Audiencia: equipo que tomara decisiones con estos datos. Accion: priorizar las lineas de analisis profundo sugeridas.\n\n[checklist]\n- [ ] La calidad de datos esta auditada (nulls, duplicados, tipos)\n- [ ] Las distribuciones de variables clave estan descritas\n- [ ] Los 5 insights tienen implicacion practica\n- [ ] Las recomendaciones de analisis profundo son accionables",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "data_dashboard_metricas_disenar",
    "label_title": "Dashboard Metricas Disenar",
    "category": "data",
    "type": "spec",
    "content": "[inputs]\n- PROCESO: {{PROCESO}} > Proceso o area a medir\n- AUDIENCIA: {{AUDIENCIA}} > Quien consumira el dashboard\n- HERRAMIENTA: {{HERRAMIENTA}} > (opcional) Herramienta de BI disponible\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar un dashboard que cuente la historia correcta a la audiencia correcta. Un buen dashboard permite decidir en 30 segundos.\n\n--- P | PEDIDO ---\n\nArquetipo: Business Intelligence Analyst y Dashboard Designer con experiencia en diseno de dashboards ejecutivos para empresas Fortune 500.\n\nDashboard de metricas:\n1. Definir 5-7 KPIs mas relevantes con formula y fuente\n2. Disenar layout con jerarquia visual clara (piramide)\n3. Seleccionar tipo de visualizacion optimo por metrica\n4. Definir frecuencia de actualizacion y ownership\n5. Configurar alertas y thresholds\n6. Wireframe del dashboard\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Information hierarchy: lo mas importante arriba-izquierda\n- 5-second rule: el dashboard debe contar su historia en 5 seg\n- Chart selection: bar for comparison, line for trends, number for KPIs\n- No vanity metrics: cada KPI debe informar una decision\n\n--- C | CRITERIO ---\n\nFormato: wireframe + definicion de KPIs + guia de visualizacion. Tono: tecnico-practico. Audiencia: {{AUDIENCIA}}. Accion: implementar el dashboard en la herramienta elegida.\n\n[checklist]\n- [ ] Los 5-7 KPIs tienen formula y fuente definidas\n- [ ] El wireframe muestra jerarquia visual clara\n- [ ] Cada tipo de grafico esta justificado\n- [ ] Las alertas tienen thresholds concretos",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "data_limpiar_transformar_datos",
    "label_title": "Limpiar Transformar Datos",
    "category": "data",
    "type": "spec",
    "content": "[inputs]\n- DATOS: {{DATOS}} > Descripcion de los datos y sus problemas\n- FORMATO_DESTINO: {{FORMATO_DESTINO}} > Formato deseado para el analisis\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara convertir datos desordenados en datos listos para analisis. El 80% del trabajo de data science es limpieza. Hazlo bien una vez y automatiza para siempre.\n\n--- P | PEDIDO ---\n\nArquetipo: Data Engineer con experiencia en ETL, data wrangling y preparacion de datos para analytics y machine learning.\n\nLimpieza y transformacion:\n1. Diagnostico de calidad: nulls, formatos, duplicados, tipos incorrectos\n2. Plan de limpieza priorizado por impacto en el analisis\n3. Instrucciones/codigo de transformacion por problema\n4. Validacion post-limpieza: integridad, completitud, consistencia\n5. Documentacion de transformaciones aplicadas\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Quality-first: no analizar datos sucios\n- Reproducible: cada transformacion documentada para repetir\n- Validation: contar registros antes y despues\n- Automate: si se repite, crear script\n\n--- C | CRITERIO ---\n\nFormato: guia paso a paso + codigo/formulas + validaciones.\nTono: tecnico-practico.\nAudiencia: analista que va a trabajar con estos datos.\nAccion: ejecutar la limpieza.\n\n[checklist]\n- [ ] Los problemas de calidad estan diagnosticados\n- [ ] Las transformaciones son reproducibles\n- [ ] La validacion post-limpieza verifica integridad\n- [ ] La documentacion permite repetir el proceso",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "data_kpi_framework_definir",
    "label_title": "Kpi Framework Definir",
    "category": "data",
    "type": "spec",
    "content": "[inputs]\n- NEGOCIO: {{NEGOCIO}} > Tipo de negocio o producto\n- OBJETIVO: {{OBJETIVO}} > Objetivo de negocio principal\n- HERRAMIENTA: {{HERRAMIENTA}} > (opcional) Herramienta de tracking disponible\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara definir un framework de KPIs que mida lo que importa y no lo que es facil de medir. Las vanity metrics distraen; los KPIs correctos guian decisiones.\n\n--- P | PEDIDO ---\n\nArquetipo: Head of Analytics con experiencia en definicion de frameworks de metricas para startups y empresas en crecimiento.\n\nFramework de KPIs:\n1. Objetivo de negocio: que resultado buscamos\n2. North Star Metric: la metrica que mejor representa valor para el usuario\n3. Input metrics: que palancas mueven la North Star\n4. Health metrics: que NO debe empeorar mientras optimizamos\n5. Definicion por KPI: formula, fuente, frecuencia, owner, target\n6. Dashboard mockup: como visualizar los KPIs\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- North Star > vanity: 1 metrica que importa sobre todas\n- Input metrics: las palancas que podemos accionar\n- AARRR (pirate metrics): Acquisition, Activation, Retention, Revenue, Referral\n- Leading > lagging: medir lo que predice, no solo lo que ya paso\n\n--- C | CRITERIO ---\n\nFormato: framework + tabla de KPIs + mockup de dashboard.\nTono: estrategico-analitico.\nAudiencia: equipo de producto/estrategia.\nAccion: implementar el tracking de la North Star.\n\n[checklist]\n- [ ] La North Star conecta con valor real para el usuario\n- [ ] Los input metrics son accionables\n- [ ] Cada KPI tiene formula, fuente y owner\n- [ ] Las health metrics previenen optimizacion destructiva",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "data_encuesta_disenar_analizar",
    "label_title": "Encuesta Disenar Analizar",
    "category": "data",
    "type": "spec",
    "content": "[inputs]\n- OBJETIVO: {{OBJETIVO}} > Que decision depende de esta encuesta\n- POBLACION: {{POBLACION}} > A quienes encuestar\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar una encuesta que produzca datos analizables y accionables, no opiniones vagas. El 90% de encuestas fallan porque las preguntas estan mal disenadas.\n\n--- P | PEDIDO ---\n\nArquetipo: Investigadora de Mercados con especializacion en diseno de encuestas y analisis cuantitativo (certificacion MRS).\n\nEncuesta completa:\n1. Objetivo: que decision depende de estos datos\n2. Poblacion y muestra: a quienes encuestar y cuantos\n3. Preguntas: max 15, cada una justificada por el objetivo\n4. Tipos de pregunta: escala, opcion multiple, abierta (mix optimo)\n5. Flujo logico: orden que minimiza sesgo\n6. Pre-test: 5 personas para validar comprension\n7. Plan de analisis: como vas a analizar ANTES de lanzar\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Objective-first: la pregunta de investigacion guia todo\n- Double-barrel test: cada pregunta mide 1 sola cosa\n- Scale consistency: misma escala a lo largo de la encuesta\n- Leading question check: cero preguntas que sugieran la respuesta\n\n--- C | CRITERIO ---\n\nFormato: cuestionario listo + plan de analisis.\nTono: metodologico.\nAudiencia: equipo de investigacion.\nAccion: hacer pre-test con 5 personas.\n\n[checklist]\n- [ ] Cada pregunta esta justificada por el objetivo\n- [ ] No hay preguntas leading o double-barrel\n- [ ] El plan de analisis esta definido ANTES del lanzamiento\n- [ ] La muestra esta justificada",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "data_ab_test_disenar",
    "label_title": "Ab Test Disenar",
    "category": "data",
    "type": "spec",
    "content": "[inputs]\n- CAMBIO: {{CAMBIO}} > Que quieres testear\n- METRICA: {{METRICA}} > Metrica principal\n- TRAFICO: {{TRAFICO}} > (opcional) Trafico diario aproximado\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar un A/B test riguroso que produzca resultados confiables. Un A/B test mal disenado es peor que no testear — te da falsa confianza.\n\n--- P | PEDIDO ---\n\nArquetipo: Growth Data Scientist con experiencia en experimentacion y A/B testing para productos digitales (1000+ experimentos).\n\nA/B Test:\n1. Hipotesis: si cambio X, entonces Y mejora porque Z\n2. Metrica primaria: que mido exactamente\n3. Tamano de muestra: cuantos usuarios necesito (calculo de poder estadistico)\n4. Duracion: cuanto tiempo correr el test (min. 2 ciclos del negocio)\n5. Segmentacion: en que usuarios correr el test\n6. Guardrail metrics: que NO debe empeorar\n7. Decision criteria: a que p-value actuo\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Hypothesis-first: no testear sin hipotesis explicita\n- Power analysis: calcular muestra ANTES de lanzar\n- One change at a time: aislar la variable\n- Novelty effect: esperar min. 2 semanas antes de concluir\n\n--- C | CRITERIO ---\n\nFormato: protocolo de A/B test completo.\nTono: cientifico-practico.\nAudiencia: equipo de producto/growth.\nAccion: lanzar el test.\n\n[checklist]\n- [ ] La hipotesis es falsificable\n- [ ] El tamano de muestra esta calculado\n- [ ] La duracion minima esta justificada\n- [ ] Los guardrail metrics estan definidos",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "data_cohort_analysis",
    "label_title": "Cohort Analysis",
    "category": "data",
    "type": "spec",
    "content": "[inputs]\n- PRODUCTO: {{PRODUCTO}} > Producto o servicio\n- METRICA: {{METRICA}} > Metrica principal (retencion, revenue, etc.)\n- DATOS: {{DATOS}} > Descripcion de los datos disponibles\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara entender el comportamiento de usuarios a lo largo del tiempo agrupandolos por cohorte. El promedio miente; las cohortes revelan la verdad.\n\n--- P | PEDIDO ---\n\nArquetipo: Product Analyst con experiencia en cohort analysis, retention curves y behavioral analytics para SaaS y marketplaces.\n\nCohort Analysis:\n1. Definir cohorte: por que agrupar (fecha de registro, canal, plan)\n2. Metrica de seguimiento: retencion, revenue, actividad\n3. Tabla de cohortes: filas = cohortes, columnas = periodos\n4. Curvas de retencion/metrica por cohorte\n5. Comparacion: que cohortes son mejores y por que\n6. Insights: que explica las diferencias entre cohortes\n7. Acciones: como mejorar las cohortes futuras\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Cohort > average: los promedios esconden tendencias\n- Retention curves: la forma de la curva cuenta la historia\n- Vintage analysis: cohortes mas recientes vs antiguas\n- Actionable segmentation: agrupar por variable que puedes influir\n\n--- C | CRITERIO ---\n\nFormato: tabla de cohortes + curvas + insights + acciones.\nTono: analitico.\nAudiencia: equipo de producto/growth.\nAccion: optimizar para mejorar la proxima cohorte.\n\n[checklist]\n- [ ] La definicion de cohorte esta justificada\n- [ ] La tabla cubre min. 6 periodos\n- [ ] Las diferencias entre cohortes estan explicadas\n- [ ] Las acciones son especificas y ejecutables",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "data_forecast_proyeccion",
    "label_title": "Forecast Proyeccion",
    "category": "data",
    "type": "spec",
    "content": "[inputs]\n- METRICA: {{METRICA}} > Que proyectar (ventas, usuarios, revenue, etc.)\n- DATOS_HISTORICOS: {{DATOS_HISTORICOS}} > Data historica disponible\n- HORIZONTE: {{HORIZONTE}} > Horizonte de proyeccion\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara producir proyecciones basadas en datos historicos con rangos de confianza. Proyectar no es adivinar — es cuantificar lo probable y lo posible.\n\n--- P | PEDIDO ---\n\nArquetipo: Analista de Forecasting con experiencia en modelos de proyeccion para finanzas, ventas y operaciones.\n\nProyeccion/Forecast:\n1. Data historica: tendencia, estacionalidad, ciclos\n2. Metodo de proyeccion seleccionado con justificacion\n3. Escenario base: proyeccion central\n4. Escenario optimista y pesimista (rangos de confianza)\n5. Supuestos clave que afectan la proyeccion\n6. Sensibilidad: que pasa si los supuestos cambian\n7. Plan de actualizacion: cada cuanto recalibrar\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Historical decomposition: tendencia + estacionalidad + ruido\n- Multiple scenarios: base + optimista + pesimista\n- Assumption transparency: cada supuesto explicito\n- Forecast ≠ target: la proyeccion describe, el target aspira\n\n--- C | CRITERIO ---\n\nFormato: proyeccion con 3 escenarios + supuestos + sensibilidad.\nTono: analitico, conservador.\nAudiencia: CFO o equipo de planificacion.\nAccion: usar el escenario base para presupuesto.\n\n[checklist]\n- [ ] La data historica esta analizada (tendencia, estacionalidad)\n- [ ] Los 3 escenarios son plausibles\n- [ ] Los supuestos clave estan explicitos\n- [ ] La sensibilidad muestra que supuestos importan mas",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "data_regression_analysis_simple",
    "label_title": "Regression Analysis Simple",
    "category": "data",
    "type": "spec",
    "content": "[inputs]\n- PREGUNTA: {{PREGUNTA}} > Que quieres explicar o predecir\n- VARIABLES: {{VARIABLES}} > Variables disponibles\n- DATOS: {{DATOS}} > Descripcion del dataset\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara identificar relaciones entre variables y cuantificar su impacto. No es suficiente decir 'X afecta Y' — hay que decir 'X aumenta Y en Z por cada unidad'.\n\n--- P | PEDIDO ---\n\nArquetipo: Estadistica Aplicada con experiencia en analisis de regresion para decisiones de negocio en marketing, pricing y operaciones.\n\nAnalisis de regresion:\n1. Variable dependiente (Y): que quiero explicar/predecir\n2. Variables independientes (X): que factores la afectan\n3. Verificacion de supuestos: linealidad, normalidad, homocedasticidad\n4. Modelo: coeficientes, R², significancia\n5. Interpretacion: en lenguaje de negocio, no estadistico\n6. Limitaciones: que NO puede concluir este analisis\n7. Recomendaciones basadas en los hallazgos\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Correlation ≠ causation: siempre disclaimer\n- Practical significance > statistical significance\n- Residual analysis: el modelo captura la senyal, no el ruido\n- Business interpretation: cada coeficiente en terminos de impacto\n\n--- C | CRITERIO ---\n\nFormato: modelo + interpretacion en lenguaje de negocio + limitaciones.\nTono: tecnico-accesible.\nAudiencia: decision-maker no-estadistico.\nAccion: actuar sobre la variable de mayor impacto.\n\n[checklist]\n- [ ] La variable dependiente esta justificada\n- [ ] Los supuestos estan verificados\n- [ ] La interpretacion esta en lenguaje de negocio\n- [ ] Las limitaciones son honestas",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "data_sql_query_compleja",
    "label_title": "Sql Query Compleja",
    "category": "data",
    "type": "spec",
    "content": "[inputs]\n- PREGUNTA: {{PREGUNTA}} > Pregunta de negocio a responder\n- TABLAS: {{TABLAS}} > Tablas disponibles y su estructura\n- BASE_DATOS: {{BASE_DATOS}} > (opcional) Tipo de base de datos (PostgreSQL, MySQL, BigQuery)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara construir queries SQL complejas que extraigan exactamente la informacion que necesitas. SQL es el lenguaje universal de los datos — dominarlo es superpoder.\n\n--- P | PEDIDO ---\n\nArquetipo: Data Analyst Senior con experiencia en SQL avanzado (window functions, CTEs, subqueries) para bases de datos de produccion.\n\nSQL Query compleja:\n1. Pregunta de negocio en lenguaje natural\n2. Identificar tablas y relaciones necesarias\n3. Construir query paso a paso (CTE approach)\n4. Optimizacion: indexes, partitions, performance\n5. Validacion: query de verificacion para confirmar resultados\n6. Documentacion: comentarios inline explicando la logica\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- CTE-first: construir por bloques, no en 1 query monolitica\n- Test incrementally: cada CTE verificado antes de agregar el siguiente\n- Explain plan: verificar que el query es eficiente\n- Business validation: el resultado tiene sentido para el negocio?\n\n--- C | CRITERIO ---\n\nFormato: SQL query completa + documentacion + query de verificacion.\nTono: tecnico.\nAudiencia: data analyst o developer.\nAccion: ejecutar la query.\n\n[checklist]\n- [ ] La query esta construida con CTEs legibles\n- [ ] Cada CTE tiene comentario explicativo\n- [ ] La query de verificacion confirma resultados\n- [ ] La performance esta considerada",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "data_excel_modelo_financiero",
    "label_title": "Excel Modelo Financiero",
    "category": "data",
    "type": "spec",
    "content": "[inputs]\n- NEGOCIO: {{NEGOCIO}} > Tipo de negocio o proyecto\n- HORIZONTE: {{HORIZONTE}} > Horizonte de proyeccion (3, 5, 10 anos)\n- METRICAS: {{METRICAS}} > (opcional) Metricas financieras clave\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara construir un modelo financiero en Excel que sea auditable, flexible y confiable. Un buen modelo financiero es una maquina de escenarios, no una hoja llena de numeros.\n\n--- P | PEDIDO ---\n\nArquetipo: Analista Financiero Senior con certificacion CFA Level II y experiencia en financial modeling para valuaciones, proyecciones y business cases.\n\nModelo financiero en Excel:\n1. Estructura: inputs (azul) / calculos (negro) / outputs (verde)\n2. Supuestos clave en una hoja separada (facil de modificar)\n3. Estado de resultados proyectado (3-5 anos)\n4. Flujo de caja proyectado\n5. Analisis de sensibilidad (2 variables)\n6. Escenarios: base, optimista, pesimista\n7. Dashboard resumen con KPIs clave\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Color coding: inputs azul, formulas negro, outputs verde\n- One formula per column: no formulas diferentes en la misma fila\n- No hardcoded numbers in formulas: todo referencia a inputs\n- Circular reference: evitar siempre\n\n--- C | CRITERIO ---\n\nFormato: especificacion completa del modelo + instrucciones de construccion.\nTono: tecnico-financiero.\nAudiencia: analista que va a construir el modelo.\nAccion: construir la estructura base del modelo.\n\n[checklist]\n- [ ] La estructura inputs/calculos/outputs es clara\n- [ ] Los supuestos estan centralizados\n- [ ] El analisis de sensibilidad cubre las variables clave\n- [ ] Los 3 escenarios son plausibles",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "data_customer_segmentation",
    "label_title": "Customer Segmentation",
    "category": "data",
    "type": "spec",
    "content": "[inputs]\n- CLIENTES: {{CLIENTES}} > Tipo de clientes y datos disponibles\n- VARIABLES: {{VARIABLES}} > Variables de segmentacion disponibles\n- OBJETIVO: {{OBJETIVO}} > Para que segmentar (retencion, upsell, adquisicion)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara segmentar clientes por comportamiento real, no por suposiciones. Los segmentos buenos son accionables — cada uno recibe una estrategia diferente.\n\n--- P | PEDIDO ---\n\nArquetipo: Customer Analytics Manager con experiencia en segmentacion comportamental para e-commerce, SaaS y servicios financieros.\n\nSegmentacion de clientes:\n1. Variables de segmentacion: RFM (Recency, Frequency, Monetary) u otras\n2. Numero optimo de segmentos (3-5 manejables)\n3. Perfil por segmento: caracteristicas, tamano, valor\n4. Nombre descriptivo por segmento (memorable)\n5. Estrategia diferenciada por segmento\n6. KPIs por segmento\n7. Plan de implementacion\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- RFM analysis: Recency × Frequency × Monetary\n- Behavioral > demographic: lo que hacen importa mas que quienes son\n- Actionable segments: si no puedes actuar diferente por segmento, no sirve\n- 80/20: el 20% de clientes genera el 80% del valor\n\n--- C | CRITERIO ---\n\nFormato: perfiles de segmento + estrategia por segmento + KPIs.\nTono: analitico-estrategico.\nAudiencia: equipo de marketing/ventas.\nAccion: lanzar campana diferenciada por segmento.\n\n[checklist]\n- [ ] Los segmentos son mutuamente excluyentes\n- [ ] Cada segmento tiene perfil y tamano\n- [ ] La estrategia es diferente por segmento (no generica)\n- [ ] Los KPIs permiten medir exito por segmento",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "data_roi_calculo_proyecto",
    "label_title": "Roi Calculo Proyecto",
    "category": "data",
    "type": "spec",
    "content": "[inputs]\n- PROYECTO: {{PROYECTO}} > Proyecto o inversion a evaluar\n- INVERSION: {{INVERSION}} > Monto de inversion estimado\n- HORIZONTE: {{HORIZONTE}} > Horizonte de evaluacion\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara calcular el ROI de un proyecto o inversion con rigor financiero. Sin ROI cuantificado, toda inversion es un acto de fe.\n\n--- P | PEDIDO ---\n\nArquetipo: Analista de ROI con experiencia en business case development, analisis de inversiones y cuantificacion de beneficios intangibles.\n\nCalculo de ROI:\n1. Inversion total: costos directos + indirectos + oportunidad\n2. Beneficios: tangibles (ahorro, revenue) + intangibles (cuantificados)\n3. Timeline: cuando se materializan costos y beneficios\n4. ROI = (Beneficio Neto / Inversion) × 100\n5. Payback period: cuando se recupera la inversion\n6. NPV y TIR si aplica\n7. Escenarios: conservador, probable, optimista\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Total Cost of Ownership: no solo el precio, sino todo el costo\n- Benefit quantification: traducir intangibles a numeros\n- Time value of money: descuento para horizontes >1 ano\n- Conservative bias: mejor sorprenderse positivamente\n\n--- C | CRITERIO ---\n\nFormato: modelo de ROI con 3 escenarios + payback + resumen ejecutivo.\nTono: financiero, conservador.\nAudiencia: decision-maker de inversion.\nAccion: aprobar o rechazar la inversion.\n\n[checklist]\n- [ ] La inversion incluye costos ocultos\n- [ ] Los beneficios intangibles estan cuantificados\n- [ ] Los 3 escenarios son realistas\n- [ ] El payback period esta calculado",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "data_funnel_conversion_analisis",
    "label_title": "Funnel Conversion Analisis",
    "category": "data",
    "type": "spec",
    "content": "[inputs]\n- PRODUCTO: {{PRODUCTO}} > Producto o servicio\n- ETAPAS: {{ETAPAS}} > Etapas del funnel actual\n- DATOS: {{DATOS}} > Datos de conversion disponibles\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara diagnosticar donde se pierden usuarios/clientes en el funnel de conversion. Cada punto de caida es dinero que se va. Encontrar el leak mas grande = quick win mas valioso.\n\n--- P | PEDIDO ---\n\nArquetipo: Growth Analyst con experiencia en funnel optimization para SaaS, e-commerce y lead generation.\n\nFunnel Analysis:\n1. Definir etapas del funnel: awareness > consideration > conversion > retention\n2. Volumen por etapa: cuantos entran y cuantos salen\n3. Tasa de conversion entre etapas\n4. Benchmark: como se compara con el sector\n5. Identificar el biggest leak: donde se pierde mas valor\n6. Hipotesis de por que ocurre cada drop\n7. Experimentos propuestos para cerrar cada leak\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Funnel math: conversion rate entre cada par de etapas\n- Biggest leak first: optimizar donde mas se pierde\n- Qualitative + quantitative: los numeros dicen donde, la investigacion dice por que\n- Experiment velocity: testear rapido, iterar rapido\n\n--- C | CRITERIO ---\n\nFormato: funnel visual con metricas + diagnostico + plan de experimentos.\nTono: analitico-pragmatico.\nAudiencia: equipo de growth/marketing.\nAccion: lanzar experimento para cerrar el leak #1.\n\n[checklist]\n- [ ] El funnel tiene metricas reales por etapa\n- [ ] El biggest leak esta identificado y cuantificado\n- [ ] Las hipotesis de drop son testables\n- [ ] Los experimentos tienen metrica de exito definida",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "data_pricing_analysis",
    "label_title": "Pricing Analysis",
    "category": "data",
    "type": "spec",
    "content": "[inputs]\n- PRODUCTO: {{PRODUCTO}} > Producto o servicio\n- PRICING_ACTUAL: {{PRICING_ACTUAL}} > Estructura de precios actual\n- COMPETIDORES: {{COMPETIDORES}} > (opcional) Competidores y sus precios\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara analizar y optimizar el pricing de un producto o servicio basado en datos. El precio es la palanca de mayor impacto en profitabilidad — 1% de mejora en precio = 11% en profits.\n\n--- P | PEDIDO ---\n\nArquetipo: Pricing Analyst con experiencia en price optimization, conjoint analysis y pricing strategy para SaaS y servicios.\n\nAnalisis de pricing:\n1. Pricing actual: estructura, niveles, metricas de uso\n2. Competitive pricing: como cobran los competidores\n3. Value metric: por que unidad deberia cobrar (usuarios, uso, valor)\n4. Willingness to pay: que pagaria el cliente (Van Westendorp si hay datos)\n5. Price sensitivity: como cambia demanda con precio\n6. Recomendacion: precio optimo con justificacion\n7. Implementacion: como migrar sin perder clientes\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Value-based pricing > cost-plus > competitive matching\n- Price metric: cobrar por la unidad que mide valor para el cliente\n- Van Westendorp PSM: too cheap / cheap / expensive / too expensive\n- Anchoring: el precio se percibe relativo a algo\n\n--- C | CRITERIO ---\n\nFormato: analisis completo con recomendacion + plan de implementacion.\nTono: estrategico-analitico.\nAudiencia: equipo de producto/revenue.\nAccion: implementar el ajuste de pricing.\n\n[checklist]\n- [ ] El competitive analysis tiene min. 5 competidores\n- [ ] La value metric esta justificada\n- [ ] La recomendacion tiene impacto estimado en revenue\n- [ ] El plan de migracion minimiza churn",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "data_churn_diagnostico",
    "label_title": "Churn Diagnostico",
    "category": "data",
    "type": "spec",
    "content": "[inputs]\n- PRODUCTO: {{PRODUCTO}} > Producto o servicio\n- CHURN_ACTUAL: {{CHURN_ACTUAL}} > Churn rate actual y tendencia\n- DATOS: {{DATOS}} > Datos de comportamiento disponibles\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara diagnosticar por que se van los clientes y disenar intervenciones para retenerlos. Retener 1 cliente cuesta 5x menos que adquirir uno nuevo.\n\n--- P | PEDIDO ---\n\nArquetipo: Customer Success Analyst con experiencia en churn prediction, retention programs y customer lifecycle management.\n\nDiagnostico de churn:\n1. Churn rate actual: como se calcula y como ha evolucionado\n2. Segmentacion de churn: quienes se van (perfil)\n3. Leading indicators: senales antes del churn (behavioral triggers)\n4. Root cause analysis: por que se van (data + entrevistas)\n5. Cohort analysis: churn por cohorte de ingreso\n6. Interventions: estrategias de retencion por trigger\n7. Impact model: cuanto revenue se recupera por punto de churn reducido\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Churn segmentation: no todos se van por la misma razon\n- Leading indicators > lagging: detectar ANTES de que se vayan\n- Win-back vs prevention: prevenir es mejor que recuperar\n- Revenue impact: cada punto de churn en dolares\n\n--- C | CRITERIO ---\n\nFormato: diagnostico + leading indicators + interventions + impact model.\nTono: analitico, orientado a accion.\nAudiencia: equipo de customer success/producto.\nAccion: implementar la intervencion para el trigger #1.\n\n[checklist]\n- [ ] El churn rate esta correctamente calculado\n- [ ] Los leading indicators son detectables con datos actuales\n- [ ] Las interventions son especificas por trigger\n- [ ] El impact model cuantifica el valor de reducir churn",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "data_visualization_best_practice",
    "label_title": "Visualization Best Practice",
    "category": "data",
    "type": "spec",
    "content": "[inputs]\n- TIPO_DATOS: {{TIPO_DATOS}} > (opcional) Tipo de datos que manejas\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara elegir y disenar la visualizacion correcta para cada tipo de dato. El grafico equivocado no solo no comunica — desinforma.\n\n--- P | PEDIDO ---\n\nArquetipo: Data Visualization Specialist con experiencia en diseno de visualizaciones para reportes ejecutivos y dashboards (principios de Edward Tufte).\n\nGuia de visualizacion:\n1. Tipo de dato: comparacion, tendencia, composicion, distribucion, relacion\n2. Grafico recomendado por tipo con justificacion\n3. Design principles: data-ink ratio, no 3D, no pie charts (casi nunca)\n4. Color strategy: accesible, consistente, con proposito\n5. Annotation: titulos, labels, call-outs que cuentan la historia\n6. Anti-patterns: graficos que mienten o confunden\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Tufte principles: maximize data-ink ratio, minimize chartjunk\n- Choose chart by question: comparison > bar, trend > line, part-of-whole > stacked\n- Color with purpose: highlight, categorize, or show magnitude\n- Alt text: toda visualizacion debe funcionar en texto tambien\n\n--- C | CRITERIO ---\n\nFormato: guia de seleccion de graficos + design principles + anti-patterns.\nTono: tecnico-didactico.\nAudiencia: cualquier profesional que presenta datos.\nAccion: redisenar la proxima presentacion de datos con estos principios.\n\n[checklist]\n- [ ] La guia cubre los 5 tipos principales de dato\n- [ ] Los anti-patterns estan ilustrados con ejemplos\n- [ ] La paleta de colores es accesible (color-blind friendly)\n- [ ] Cada grafico tiene alternativa en texto",
    "paramCount": 2,
    "keywords": []
  },
  {
    "id": "data_automated_report_disenar",
    "label_title": "Automated Report Disenar",
    "category": "data",
    "type": "spec",
    "content": "[inputs]\n- REPORTE: {{REPORTE}} > Que reporte quieres automatizar\n- FUENTE: {{FUENTE}} > Fuente de datos\n- HERRAMIENTA: {{HERRAMIENTA}} > (opcional) Herramienta de BI/automatizacion\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar un reporte automatizado que se genere solo y se envie a los stakeholders correctos. El reporte manual es trabajo que la maquina deberia hacer.\n\n--- P | PEDIDO ---\n\nArquetipo: BI Engineer con experiencia en automatizacion de reportes para equipos de operaciones, finanzas y marketing.\n\nReporte automatizado:\n1. Contenido del reporte: metricas, comparaciones, alertas\n2. Fuente de datos: de donde vienen los numeros\n3. Frecuencia: diario/semanal/mensual\n4. Formato de salida: email, Slack, dashboard, PDF\n5. Logica de alertas: cuando el reporte debe gritar\n6. Distribucion: quien recibe que version\n7. Especificacion tecnica para implementar\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Define content BEFORE automation: que vale la pena automatizar\n- Exception reporting: el reporte perfecto solo muestra lo anormal\n- Audience-specific: el CEO no ve lo mismo que el analista\n- Self-service: el reporte responde preguntas sin reunion adicional\n\n--- C | CRITERIO ---\n\nFormato: especificacion de reporte + logica de alertas + distribucion.\nTono: tecnico.\nAudiencia: BI engineer o data analyst.\nAccion: implementar la automatizacion.\n\n[checklist]\n- [ ] El contenido esta justificado por decision que informa\n- [ ] Las alertas tienen thresholds cuantificados\n- [ ] La distribucion diferencia por audiencia\n- [ ] La especificacion es implementable con las herramientas disponibles",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "visual_brief_creativo_imagen_ia",
    "label_title": "Brief Creativo Imagen Ia",
    "category": "visual",
    "type": "spec",
    "content": "[inputs]\n- CONCEPTO: {{CONCEPTO}} > Que quieres visualizar\n- USO: {{USO}} > Uso final (web, redes, presentacion, impresion)\n- ESTILO: {{ESTILO}} > (opcional) Estilo visual preferido\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara obtener resultados profesionales y consistentes al generar imagenes con IA. El prompt visual es direccion de arte — no es un pedido vago.\n\n--- P | PEDIDO ---\n\nArquetipo: Director de Arte y Prompt Engineer Visual con experiencia en produccion de contenido visual con IA para marcas premium.\n\nBrief creativo para imagen IA:\n1. Concepto visual en 1 oracion\n2. Composicion: encuadre, perspectiva, punto focal\n3. Estilo: fotorrealista, ilustracion, minimalista, etc.\n4. Iluminacion: natural, dramatica, flat, etc.\n5. Paleta de colores: primarios y acentos\n6. 3 prompts optimizados (DALL-E, Midjourney, Stable Diffusion)\n7. Negative prompts (que evitar)\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Art direction antes de prompt: vision > palabras\n- Specificity kills ambiguity: cada adjetivo importa\n- Technical params: aspect ratio, style weight, quality\n- Iteration: el primer resultado es el punto de partida\n\n--- C | CRITERIO ---\n\nFormato: brief creativo + 3 prompts listos para copiar + negative prompts. Tono: tecnico-creativo. Audiencia: creador de contenido visual. Accion: generar la imagen inmediatamente.\n\n[checklist]\n- [ ] El concepto visual esta articulado en 1 oracion\n- [ ] Los 3 prompts son especificos para cada plataforma\n- [ ] Incluye negative prompts\n- [ ] La paleta de colores es concreta (hex codes si aplica)",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "visual_guion_video_corto",
    "label_title": "Guion Video Corto",
    "category": "visual",
    "type": "spec",
    "content": "[inputs]\n- TEMA: {{TEMA}} > Tema o mensaje del video\n- PLATAFORMA: {{PLATAFORMA}} > Plataforma destino (YouTube, Instagram, TikTok, LinkedIn)\n- DURACION: {{DURACION}} > Duracion objetivo\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara producir video corto con estructura narrativa profesional. El 80% del impacto de un video se define en el guion, no en la produccion.\n\n--- P | PEDIDO ---\n\nArquetipo: Guionista y Producer de Contenido Digital con experiencia en video corto para redes (100M+ views acumulados) y storytelling visual.\n\nGuion de video corto:\n1. Hook en primeros 3 segundos (sin introduccion)\n2. Arco narrativo con timestamps por seccion\n3. Script: narracion/dialogo palabra por palabra\n4. Direcciones de camara/visual por escena\n5. Sugerencias de musica/sonido\n6. CTA final\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Hook-first: los primeros 3 segundos deciden todo\n- Platform-native: optimizar para el algoritmo de {{PLATAFORMA}}\n- Retention curve: picos de interes cada 15-30 segundos\n- CTA integration: el CTA es parte de la narrativa, no un add-on\n\n--- C | CRITERIO ---\n\nFormato: guion con timestamps, narracion, direcciones visuales, CTA. Tono: dinamico, adaptado a {{PLATAFORMA}}. Audiencia: espectador de {{PLATAFORMA}} con 3 segundos de atencion. Accion: producir el video esta semana.\n\n[checklist]\n- [ ] El hook funciona en los primeros 3 segundos\n- [ ] Cada seccion tiene timestamp y duracion\n- [ ] Las direcciones visuales son ejecutables\n- [ ] El CTA esta integrado en la narrativa",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "visual_infografia_ejecutiva",
    "label_title": "Infografia Ejecutiva",
    "category": "visual",
    "type": "spec",
    "content": "[inputs]\n- DATOS: {{DATOS}} > Datos a visualizar\n- AUDIENCIA: {{AUDIENCIA}} > Quien vera la infografia\n- FORMATO: {{FORMATO}} > (opcional) Formato (digital, impreso, redes)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara transformar datos complejos en infografias visuales que comuniquen en 10 segundos lo que un reporte comunica en 10 minutos.\n\n--- P | PEDIDO ---\n\nArquetipo: Disenador de Informacion Visual con experiencia en infografias ejecutivas para reportes corporativos y presentaciones a boards.\n\nInfografia ejecutiva:\n1. Mensaje principal: que debe entender quien la ve en 10 seg\n2. Datos clave: max 5 cifras protagonistas\n3. Jerarquia visual: que se ve primero, segundo, tercero\n4. Paleta: max 3 colores + neutros\n5. Layout: estructura (horizontal/vertical, secciones)\n6. Spec para disenador o herramienta IA\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Less is more: cada elemento visual debe ganarse su lugar\n- Data-ink ratio: maximizar datos, minimizar decoracion\n- Visual hierarchy: tamano > color > posicion\n- 10-second test: si no se entiende en 10 seg, redisenar\n\n--- C | CRITERIO ---\n\nFormato: spec de infografia con layout + contenido + paleta.\nTono: visual-ejecutivo.\nAudiencia: {{AUDIENCIA}}.\nAccion: producir la infografia.\n\n[checklist]\n- [ ] El mensaje principal se entiende en 10 segundos\n- [ ] Max 5 cifras protagonistas\n- [ ] La jerarquia visual es clara\n- [ ] La spec es ejecutable por un disenador",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "visual_presentacion_slide_deck",
    "label_title": "Presentacion Slide Deck",
    "category": "visual",
    "type": "spec",
    "content": "[inputs]\n- TEMA: {{TEMA}} > Tema de la presentacion\n- AUDIENCIA: {{AUDIENCIA}} > Audiencia\n- SLIDES: {{SLIDES}} > Numero aproximado de slides\n- DURACION: {{DURACION}} > (opcional) Duracion de la presentacion\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar un slide deck donde cada slide comunica 1 idea con impacto visual. Las mejores presentaciones tienen pocas palabras y mucha intencion.\n\n--- P | PEDIDO ---\n\nArquetipo: Presentation Designer con experiencia en diseño de keynotes para conferencias TEDx, Fortune 500 y startups.\n\nSlide deck:\n1. Estructura narrativa: arco de la presentacion\n2. Slide-by-slide: titulo + contenido + nota del speaker\n3. Visual per slide: grafico, imagen, diagrama o statement\n4. Transiciones: como conectar una slide con la siguiente\n5. Master slide styles: title, content, data, quote, section\n6. Brand alignment: colores, fonts, tono visual\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- 1 idea per slide: si hay 2, dividir\n- Duarte method: what is > what could be > call to action\n- Visual > text: la slide soporta, el speaker cuenta\n- Takahashi method: numeros grandes, pocas palabras\n\n--- C | CRITERIO ---\n\nFormato: outline slide-by-slide + notas + visual specs.\nTono: visual, de impacto.\nAudiencia: {{AUDIENCIA}}.\nAccion: disenar las slides.\n\n[checklist]\n- [ ] Cada slide tiene 1 sola idea\n- [ ] Las notas del speaker estan completas\n- [ ] La narrativa tiene arco (setup > tension > resolution)\n- [ ] El diseño es consistente con la marca",
    "paramCount": 5,
    "keywords": []
  },
  {
    "id": "visual_moodboard_direccion_arte",
    "label_title": "Moodboard Direccion Arte",
    "category": "visual",
    "type": "spec",
    "content": "[inputs]\n- PROYECTO: {{PROYECTO}} > Proyecto o marca\n- CONTEXTO: {{CONTEXTO}} > Tipo de proyecto (web, campana, branding, contenido)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear un moodboard que alinee la vision creativa de un proyecto antes de producir. El moodboard es el contrato visual — previene 'no era lo que imaginaba'.\n\n--- P | PEDIDO ---\n\nArquetipo: Directora de Arte con experiencia en direccion visual para campanas publicitarias, branding y produccion de contenido digital.\n\nMoodboard:\n1. Concepto en 3 palabras (adjetivos que definen la estetica)\n2. Paleta de colores: 5 colores con hex codes y razon\n3. Tipografia: 2-3 fonts con jerarquia\n4. Imagenes de referencia: 8-12 con explicacion de que aporta cada una\n5. Texturas y patrones si aplican\n6. Anti-references: que NO queremos (tan importante como lo que si)\n7. Aplicacion: como se ve esto en los entregables reales\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- 3-word brief: condensar la vision en 3 adjetivos\n- Reference > description: mostrar es mejor que explicar\n- Anti-references: lo que no queremos clarifica tanto como lo que si\n- Consistency test: todas las referencias cuentan la misma historia\n\n--- C | CRITERIO ---\n\nFormato: moodboard descriptivo con paleta + fonts + referencias.\nTono: creativo-preciso.\nAudiencia: equipo creativo o disenador.\nAccion: usar como guia para toda la produccion visual.\n\n[checklist]\n- [ ] El concepto de 3 palabras es claro y diferenciado\n- [ ] La paleta tiene hex codes y justificacion\n- [ ] Las anti-references estan incluidas\n- [ ] La aplicacion muestra como se traduce a entregables",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "visual_diagrama_arquitectura",
    "label_title": "Diagrama Arquitectura",
    "category": "visual",
    "type": "spec",
    "content": "[inputs]\n- SISTEMA: {{SISTEMA}} > Sistema a diagramar\n- NIVEL: {{NIVEL}} > Nivel de detalle (contexto, contenedores, componentes)\n- AUDIENCIA: {{AUDIENCIA}} > Audiencia principal del diagrama\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear diagramas de arquitectura claros que comuniquen sistemas complejos. Un buen diagrama arquitectonico ahorra 100 emails de explicacion.\n\n--- P | PEDIDO ---\n\nArquetipo: Arquitecto de Soluciones con experiencia en diagramas C4, UML y visualizacion de sistemas para stakeholders tecnicos y no tecnicos.\n\nDiagrama de arquitectura:\n1. Nivel de abstraccion: contexto (C1), contenedores (C2), componentes (C3)\n2. Elementos: sistemas, servicios, bases de datos, usuarios\n3. Relaciones: flujos de datos, dependencias, protocolos\n4. Leyenda: que significa cada forma y color\n5. Codigo Mermaid o PlantUML listo para renderizar\n6. Version simplificada para audiencia no-tecnica\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- C4 Model de Simon Brown: 4 niveles de zoom\n- Context first: el sistema en su entorno antes del detalle\n- 2 versions: tecnica y ejecutiva del mismo sistema\n- Living diagram: actualizar con cada cambio arquitectonico\n\n--- C | CRITERIO ---\n\nFormato: diagrama en Mermaid/PlantUML + version simplificada.\nTono: tecnico-claro.\nAudiencia: equipo tecnico + stakeholders.\nAccion: renderizar y compartir.\n\n[checklist]\n- [ ] El nivel de abstraccion es apropiado para la audiencia\n- [ ] La leyenda explica toda la notacion\n- [ ] El codigo es renderizable sin edicion\n- [ ] Existe version simplificada para no-tecnicos",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "visual_brand_kit_personal",
    "label_title": "Brand Kit Personal",
    "category": "visual",
    "type": "spec",
    "content": "[inputs]\n- NOMBRE: {{NOMBRE}} > Tu nombre o marca personal\n- VALORES: {{VALORES}} > 3 valores o atributos de tu marca\n- CANALES: {{CANALES}} > (opcional) Canales donde tienes presencia\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear un kit visual de marca personal consistente que te haga reconocible en todos los canales. Tu marca personal es tu reputacion visual.\n\n--- P | PEDIDO ---\n\nArquetipo: Brand Designer con experiencia en identidad visual para emprendedores, speakers y profesionales independientes.\n\nBrand Kit Personal:\n1. Logo/marca visual: concepto, variantes, uso minimo\n2. Paleta de colores: primarios, secundarios, neutros (hex codes)\n3. Tipografia: 2 fonts con jerarquia y uso\n4. Estilo fotografico: que tipo de imagenes usar y cuales evitar\n5. Templates: social media, presentaciones, email signature\n6. Do's and Don'ts: reglas de uso de la marca\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Consistency > creativity: la repeticion crea reconocimiento\n- Less is more: 2 colores + 2 fonts es suficiente\n- Cross-platform: el kit debe funcionar en todas las plataformas\n- Document everything: si no esta escrito, no se cumple\n\n--- C | CRITERIO ---\n\nFormato: brand kit completo con specs + templates.\nTono: creativo-profesional.\nAudiencia: tu mismo + cualquier disenador que trabaje contigo.\nAccion: aplicar la paleta y fonts a todos tus canales.\n\n[checklist]\n- [ ] La paleta tiene max 5 colores con hex codes\n- [ ] Las 2 fonts tienen jerarquia clara\n- [ ] Los templates cubren al menos 3 canales\n- [ ] Los Do's and Don'ts previenen errores comunes",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "visual_storyboard_campana",
    "label_title": "Storyboard Campana",
    "category": "visual",
    "type": "spec",
    "content": "[inputs]\n- CAMPANA: {{CAMPANA}} > Objetivo de la campana\n- CANALES: {{CANALES}} > Canales disponibles\n- DURACION: {{DURACION}} > Duracion de la campana\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara planificar visualmente una campana de contenido o marketing antes de producir. El storyboard es el guion visual — previene produccion sin proposito.\n\n--- P | PEDIDO ---\n\nArquetipo: Creative Director con experiencia en planificacion de campanas multimedia para marcas de consumo y B2B.\n\nStoryboard de campana:\n1. Concepto creativo: la gran idea en 1 oracion\n2. Piezas: lista de contenido a producir por canal\n3. Storyboard por pieza: visual + copy + CTA\n4. Calendario de publicacion: que pieza, cuando, donde\n5. Consistencia: como todas las piezas cuentan la misma historia\n6. Metricas: que medir por pieza y por campana\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Big idea first: una idea, multiples ejecuciones\n- Channel-native: adaptar, no copiar entre canales\n- Content calendar: la consistencia requiere calendario\n- Measure what matters: engagement > reach\n\n--- C | CRITERIO ---\n\nFormato: storyboard + calendario + metricas.\nTono: creativo-estrategico.\nAudiencia: equipo de marketing/contenido.\nAccion: producir la primera pieza.\n\n[checklist]\n- [ ] El concepto creativo cabe en 1 oracion\n- [ ] Cada pieza tiene visual + copy + CTA\n- [ ] El calendario tiene fechas y canales\n- [ ] Las metricas son especificas por pieza",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "visual_thumbnail_redes_sociales",
    "label_title": "Thumbnail Redes Sociales",
    "category": "visual",
    "type": "spec",
    "content": "[inputs]\n- CONTENIDO: {{CONTENIDO}} > Video o post para el que es el thumbnail\n- PLATAFORMA: {{PLATAFORMA}} > Plataforma (YouTube, Instagram, LinkedIn)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear thumbnails que generen clicks sin ser clickbait. El thumbnail es el pitch visual — tienes 0.5 segundos para convencer.\n\n--- P | PEDIDO ---\n\nArquetipo: Creative Strategist de YouTube con experiencia en thumbnails de alto CTR (>10%) para canales educativos y de negocio.\n\nThumbnail specs:\n1. Concepto: que emocion o curiosidad debe generar\n2. Composicion: regla de tercios, punto focal, espacio negativo\n3. Texto: max 4 palabras, legible en mobile (tamaño minimo)\n4. Expresion facial: si aplica, que emocion transmite\n5. Colores: contraste con el feed (analizar competencia)\n6. 3 variantes para A/B test\n7. Specs tecnicos: resolucion, formato, tamano\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Contrast with feed: destacar entre lo que rodea\n- Emotion > information: el thumbnail vende la emocion, no el contenido\n- Mobile-first: si no se lee en mobile, no funciona\n- Test: siempre 3 variantes\n\n--- C | CRITERIO ---\n\nFormato: specs de 3 thumbnails con concepto + composicion + texto.\nTono: creativo-estrategico.\nAudiencia: creador de contenido.\nAccion: disenar o generar los 3 thumbnails.\n\n[checklist]\n- [ ] El concepto genera curiosidad o emocion\n- [ ] El texto tiene max 4 palabras legibles en mobile\n- [ ] Las 3 variantes son genuinamente diferentes\n- [ ] Los specs tecnicos estan completos",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "visual_data_viz_interactiva",
    "label_title": "Data Viz Interactiva",
    "category": "visual",
    "type": "spec",
    "content": "[inputs]\n- DATOS: {{DATOS}} > Dataset a visualizar\n- HISTORIA: {{HISTORIA}} > Que historia quieres que cuente\n- HERRAMIENTA: {{HERRAMIENTA}} > (opcional) Herramienta (D3, Plotly, Tableau, etc.)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar visualizaciones de datos interactivas que permitan al usuario explorar y descubrir insights por si mismo. Lo interactivo convierte al espectador en analista.\n\n--- P | PEDIDO ---\n\nArquetipo: Data Visualization Engineer con experiencia en D3.js, Plotly y dashboards interactivos para productos data-driven.\n\nData Viz Interactiva:\n1. Datos: que dataset y que historia cuenta\n2. Tipo de interaccion: filtrar, zoom, hover, drill-down\n3. Vista default: que ve el usuario al llegar\n4. Vista exploratoria: que puede descubrir interactuando\n5. Responsive: como se adapta a mobile\n6. Spec tecnica: herramienta, formato, performance\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Overview first, zoom and filter, details on demand (Shneiderman)\n- Default view = the story: la vista inicial cuenta la narrativa principal\n- Exploration = empowerment: la interaccion revela matices\n- Performance: max 2 seg de carga\n\n--- C | CRITERIO ---\n\nFormato: spec de visualizacion interactiva + wireframes.\nTono: tecnico-creativo.\nAudiencia: developer o disenador que implementara.\nAccion: implementar el prototipo.\n\n[checklist]\n- [ ] La vista default cuenta la historia principal\n- [ ] Las interacciones agregan valor (no solo decoracion)\n- [ ] Es responsive\n- [ ] La spec es implementable con la herramienta elegida",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "visual_contenido_educativo_visual",
    "label_title": "Contenido Educativo Visual",
    "category": "visual",
    "type": "spec",
    "content": "[inputs]\n- TEMA: {{TEMA}} > Concepto o tema a ensenar\n- AUDIENCIA: {{AUDIENCIA}} > Nivel de la audiencia (principiante, intermedio, avanzado)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear contenido educativo visual que enseñe conceptos complejos de forma simple y memorable. Lo visual reduce el tiempo de aprendizaje en 60%.\n\n--- P | PEDIDO ---\n\nArquetipo: Disenador Instruccional Visual con experiencia en creacion de contenido educativo para universidades y programas corporativos.\n\nContenido educativo visual:\n1. Concepto a ensenar: descomponer en 3-5 ideas clave\n2. Formato optimo por idea: diagrama, analogia visual, proceso, comparacion\n3. Progresion pedagogica: de lo simple a lo complejo\n4. Scaffolding visual: cada imagen construye sobre la anterior\n5. Evaluacion visual: quiz o ejercicio que valide comprension\n6. Adaptabilidad: como se usa en clase, en autoestudio, en redes\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Dual coding: texto + visual = retencion 6x mayor\n- Chunking: max 5 ideas por pieza visual\n- Progressive disclosure: revelar complejidad gradualmente\n- Visual metaphor: anclar lo abstracto en lo concreto\n\n--- C | CRITERIO ---\n\nFormato: set de 3-5 piezas visuales educativas + guia de uso.\nTono: pedagogico-visual.\nAudiencia: estudiantes o profesionales aprendiendo {{TEMA}}.\nAccion: usar en la proxima sesion educativa.\n\n[checklist]\n- [ ] Cada pieza cubre 1 idea clave\n- [ ] La progresion va de simple a complejo\n- [ ] Las metaforas visuales son claras y memorables\n- [ ] El formato es adaptable a multiples contextos",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "visual_motion_graphics_spec",
    "label_title": "Motion Graphics Spec",
    "category": "visual",
    "type": "spec",
    "content": "[inputs]\n- MENSAJE: {{MENSAJE}} > Que quieres comunicar\n- DURACION: {{DURACION}} > Duracion objetivo\n- ESTILO: {{ESTILO}} > (opcional) Estilo visual preferido\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara especificar motion graphics que comuniquen datos, procesos o conceptos con animacion. Lo que se mueve captura atencion 5x mas que lo estatico.\n\n--- P | PEDIDO ---\n\nArquetipo: Motion Graphics Designer con experiencia en produccion de animaciones explicativas para SaaS, educacion y redes sociales.\n\nMotion Graphics Spec:\n1. Concepto: que se comunica y en cuanto tiempo\n2. Script: narracion o texto on-screen por escena\n3. Storyboard: keyframes principales (6-12 escenas)\n4. Estilo visual: flat, isometrico, 3D, mixed media\n5. Transiciones: como se conectan las escenas\n6. Audio: musica, SFX, voice-over (si aplica)\n7. Specs tecnicos: duracion, resolucion, formato de entrega\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Story-first: la narrativa guia la animacion, no al reves\n- Keyframe clarity: si los keyframes no cuentan la historia solos, rehacer\n- Pacing: ritmo visual que mantiene atencion\n- Loop-friendly: para redes, disenar para autoplay\n\n--- C | CRITERIO ---\n\nFormato: spec completa con script + storyboard + estilo.\nTono: creativo-tecnico.\nAudiencia: motion designer o studio.\nAccion: producir la animacion.\n\n[checklist]\n- [ ] El script es claro y temporizado\n- [ ] Los keyframes cubren toda la narrativa\n- [ ] El estilo visual esta definido con referencias\n- [ ] Los specs tecnicos estan completos",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "visual_ui_wireframe_spec",
    "label_title": "Ui Wireframe Spec",
    "category": "visual",
    "type": "spec",
    "content": "[inputs]\n- PRODUCTO: {{PRODUCTO}} > Producto o feature\n- PANTALLAS: {{PANTALLAS}} > Pantallas clave a wireframear\n- PLATAFORMA: {{PLATAFORMA}} > Web, mobile, o ambos\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara especificar wireframes de interfaz de usuario que comuniquen estructura, flujo e interaccion sin ambiguedad. El wireframe es el plano del arquitecto digital.\n\n--- P | PEDIDO ---\n\nArquetipo: UX Designer Senior con experiencia en wireframing para aplicaciones web, mobile y SaaS (Figma, Balsamiq).\n\nWireframe Spec:\n1. Pantallas clave: lista con proposito de cada una\n2. Layout por pantalla: estructura, componentes, jerarquia\n3. Flujo de usuario: como navega entre pantallas\n4. Interacciones: que pasa al hacer click/tap en cada elemento\n5. Estados: default, hover, active, error, empty, loading\n6. Responsive: como se adapta de desktop a mobile\n7. Anotaciones: notas para el developer\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Structure before beauty: wireframe = estructura, no diseño visual\n- User flow first: el flujo guia las pantallas, no al reves\n- States coverage: cada componente en todos sus estados\n- Developer handoff: las anotaciones deben ser implementables\n\n--- C | CRITERIO ---\n\nFormato: wireframes descriptivos por pantalla + flujo + anotaciones.\nTono: tecnico-preciso.\nAudiencia: disenador UI o developer.\nAccion: implementar en Figma o codigo.\n\n[checklist]\n- [ ] Cada pantalla tiene proposito claro\n- [ ] El flujo de usuario es completo (sin dead ends)\n- [ ] Los estados estan cubiertos (no solo el happy path)\n- [ ] Las anotaciones son claras para el developer",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "agentes_disenar_custom_gpt",
    "label_title": "Disenar Custom Gpt",
    "category": "agentes",
    "type": "spec",
    "content": "[inputs]\n- TAREA: {{TAREA}} > Tarea especifica que debe resolver el agente\n- AUDIENCIA: {{AUDIENCIA}} > Quien usara este agente\n- TONO: {{TONO}} > Personalidad/tono del agente\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear un asistente de IA especializado que produzca resultados consistentes. Un Custom GPT bien disenado es un empleado que nunca duerme, nunca olvida y siempre sigue el proceso.\n\n--- P | PEDIDO ---\n\nArquetipo: Arquitecto de Agentes IA con experiencia en diseno de system prompts, Custom GPTs y Gemini Gems para operaciones empresariales.\n\nCustom GPT completo:\n1. Scope: que hace y que NO hace (boundaries explicitos)\n2. System prompt con personalidad, reglas y formato\n3. Formato de output esperado por tipo de interaccion\n4. 5 few-shot examples de interaccion ideal\n5. Edge cases y respuestas de fallback\n6. Plan de pruebas (10 queries de test)\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Scope-first: definir boundaries antes de capabilities\n- Persona > prompt: la personalidad calibra todo lo demas\n- Few-shot > instruction: mostrar es mas potente que explicar\n- Edge case coverage: que pasa cuando el usuario se sale del scope\n\n--- C | CRITERIO ---\n\nFormato: system prompt listo para copiar + 5 examples + plan de pruebas. Tono: tecnico-practico. Audiencia: profesional que va a crear el GPT. Accion: crear el Custom GPT hoy.\n\n[checklist]\n- [ ] El scope tiene boundaries claros (que SI y que NO)\n- [ ] El system prompt tiene personalidad coherente\n- [ ] Los 5 examples cubren el rango de uso tipico\n- [ ] Los edge cases tienen respuestas de fallback",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "agentes_comite_operativo_artificial",
    "label_title": "Comite Operativo Artificial",
    "category": "agentes",
    "type": "spec",
    "content": "[inputs]\n- ENTREGABLE: {{ENTREGABLE}} > Tipo de entregable a producir\n- ESTANDAR: {{ESTANDAR}} > Estandar de calidad (profesional, ejecutivo, publicacion)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara orquestar multiples agentes de IA coordinados que produzcan entregables de excelencia a traves de iteracion sistematica. Tu eres el Director; ellos son el Critico, el Editor, el Analista.\n\n--- P | PEDIDO ---\n\nArquetipo: Orquestador de Sistemas Multi-Agente con experiencia en diseno de workflows multi-agente, quality loops y escalamiento de operaciones con IA.\n\nComite Operativo Artificial:\n1. Definicion de roles: nombre, responsabilidad, personalidad por agente\n2. Flujo de trabajo: creacion > critica > refinamiento > validacion\n3. System prompt por agente (listo para copiar)\n4. Rubrica de calidad compartida (criterios y scoring)\n5. Protocolo de convergencia: cuando se detiene el loop\n6. Plan de implementacion paso a paso\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Separation of concerns: cada agente tiene UN rol\n- Adversarial collaboration: el critico genuinamente desafia\n- Quality gate: cada ronda debe mejorar el score o el loop se detiene\n- Convergence criteria: si el score no mejora en 2 rondas, entregar\n\n--- C | CRITERIO ---\n\nFormato: configuracion completa del comite con system prompts + flujo + rubrica. Tono: tecnico. Audiencia: profesional que va a implementar el sistema. Accion: configurar el primer agente hoy.\n\n[checklist]\n- [ ] Cada agente tiene system prompt y rol claros\n- [ ] El flujo de trabajo tiene 4+ etapas con gates\n- [ ] La rubrica tiene criterios y scoring numerico\n- [ ] El protocolo de convergencia evita loops infinitos",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "agentes_system_prompt_gem_nlm",
    "label_title": "System Prompt Gem Nlm",
    "category": "agentes",
    "type": "spec",
    "content": "[inputs]\n- FUNCION: {{FUNCION}} > Funcion principal del asistente\n- AUDIENCIA: {{AUDIENCIA}} > Quien interactuara con el asistente\n- PERSONALIDAD: {{PERSONALIDAD}} > Tono y personalidad deseada\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara configurar la personalidad de un Gemini Gem o asistente NLM que responda de forma consistente y especializada.\n\n--- P | PEDIDO ---\n\nArquetipo: Disenador de Conversational AI con experiencia en configuracion de Gemini Gems, NotebookLM y sistemas conversacionales para empresas.\n\nSystem Prompt de Gem/NLM:\n1. Identidad: nombre, personalidad, tono de voz\n2. Scope: que hace, que NO hace (boundaries)\n3. Conocimiento: de que temas es experto\n4. Formato default de respuesta\n5. Reglas de interaccion: como saluda, como maneja lo que no sabe, como cierra\n6. 5 interacciones de ejemplo (few-shot)\n7. Triggers de escalacion: cuando pasar a un humano\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Personality > rules: la personalidad calibra mejor que las reglas\n- Boundary clarity: lo que NO hace es tan importante como lo que hace\n- Few-shot > zero-shot: los ejemplos valen mas que las instrucciones\n- Failure gracefully: que hacer cuando no sabe\n\n--- C | CRITERIO ---\n\nFormato: system prompt listo para copiar + 5 examples.\nTono: tecnico-creativo.\nAudiencia: quien configura el asistente.\nAccion: crear el Gem hoy.\n\n[checklist]\n- [ ] La identidad tiene personalidad diferenciada\n- [ ] Los boundaries son explicitos\n- [ ] Los 5 examples cubren casos tipicos\n- [ ] La escalacion a humano esta definida",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "agentes_chain_prompts_workflow",
    "label_title": "Chain Prompts Workflow",
    "category": "agentes",
    "type": "spec",
    "content": "[inputs]\n- TAREA: {{TAREA}} > Tarea completa a automatizar\n- HERRAMIENTA: {{HERRAMIENTA}} > (opcional) Herramienta IA para ejecutar (ChatGPT, Claude, Gemini)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar un flujo de prompts encadenados donde el output de uno es el input del siguiente. Chaining convierte tareas complejas en pipelines automatizables.\n\n--- P | PEDIDO ---\n\nArquetipo: Prompt Engineer Senior con experiencia en diseno de cadenas de prompts para automatizacion de workflows complejos.\n\nChain de prompts:\n1. Tarea completa: que se logra al final del chain\n2. Descomposicion: subtareas en orden secuencial\n3. Prompt por subtarea: input, instruccion, output esperado\n4. Handoff: como el output de cada paso alimenta el siguiente\n5. Quality gates: donde validar antes de continuar\n6. Error handling: que hacer si un paso falla\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Decompose > chain: dividir la tarea compleja en pasos simples\n- Clear handoffs: el output de cada paso es un input limpio para el siguiente\n- Gate-driven: no avanzar si un paso produce output subpar\n- Modular: cada prompt funciona solo Y en cadena\n\n--- C | CRITERIO ---\n\nFormato: diagrama de chain + prompt por paso + gates.\nTono: tecnico.\nAudiencia: prompt engineer o automation designer.\nAccion: implementar el chain.\n\n[checklist]\n- [ ] Cada paso tiene input/output claros\n- [ ] Los handoffs entre pasos son limpios\n- [ ] Los quality gates previenen propagacion de errores\n- [ ] El chain produce el resultado final esperado",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "agentes_knowledge_base_privada",
    "label_title": "Knowledge Base Privada",
    "category": "agentes",
    "type": "spec",
    "content": "[inputs]\n- DOMINIO: {{DOMINIO}} > Area de conocimiento a capturar\n- FUENTES: {{FUENTES}} > Tipos de fuentes disponibles\n- USUARIOS: {{USUARIOS}} > Quienes consultaran la KB\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar una knowledge base privada que funcione como cerebro externo consultable. Tu conocimiento capturado + IA = experto disponible 24/7.\n\n--- P | PEDIDO ---\n\nArquetipo: Arquitecto de Knowledge Management con experiencia en diseno de knowledge bases corporativas con RAG y sistemas de busqueda semantica.\n\nKnowledge Base Privada:\n1. Inventario de conocimiento: que fuentes capturar (docs, wikis, notas, procesos)\n2. Taxonomia: como organizar el conocimiento (categorias, tags)\n3. Formato de ingesta: como preparar documentos para la KB\n4. Protocolo de consulta: como preguntar y que esperar\n5. Actualizacion: cadencia y responsable de mantener actualizada\n6. Governance: quien puede agregar, editar, eliminar\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- RAG (Retrieval Augmented Generation): buscar antes de generar\n- Chunking strategy: tamano optimo de fragmentos para retrieval\n- Source attribution: cada respuesta cita su fuente\n- Freshness: conocimiento caduco es peor que no tener conocimiento\n\n--- C | CRITERIO ---\n\nFormato: spec de KB + taxonomia + protocolo de ingesta.\nTono: tecnico-practico.\nAudiencia: equipo que va a construir y usar la KB.\nAccion: crear la taxonomia e ingestar las primeras 10 fuentes.\n\n[checklist]\n- [ ] La taxonomia cubre las areas de conocimiento criticas\n- [ ] El formato de ingesta es claro y reproducible\n- [ ] El protocolo de consulta produce respuestas con fuente\n- [ ] La governance tiene roles claros",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "agentes_evaluacion_asistente_qa",
    "label_title": "Evaluacion Asistente Qa",
    "category": "agentes",
    "type": "spec",
    "content": "[inputs]\n- ASISTENTE: {{ASISTENTE}} > Nombre o link del asistente a evaluar\n- SCOPE: {{SCOPE}} > Que deberia hacer el asistente\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara evaluar la calidad de un asistente IA existente de forma sistematica. Sin QA, no sabes si tu GPT esta ayudando o ensenando mal.\n\n--- P | PEDIDO ---\n\nArquetipo: QA Specialist de IA Conversacional con experiencia en testing de chatbots, evaluacion de LLMs y diseno de rubrics de calidad.\n\nQA de Asistente IA:\n1. Test suite: 20 queries de test (tipicas + edge cases + adversariales)\n2. Rubrica de evaluacion: precision, completitud, tono, formato, safety\n3. Ejecucion: correr cada query y evaluar contra rubrica\n4. Scoring: score por criterio por query + score global\n5. Failure analysis: donde falla y por que\n6. Mejoras: recomendaciones al system prompt\n7. Regression plan: como re-testear despues de mejoras\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Black box testing: evaluar outputs sin ver el system prompt\n- Edge case coverage: lo que el creador no penso\n- Adversarial testing: intentar que falle o se salga del scope\n- Regression: cada mejora puede romper algo que funcionaba\n\n--- C | CRITERIO ---\n\nFormato: test suite + resultados + mejoras recomendadas.\nTono: tecnico, riguroso.\nAudiencia: creador del asistente.\nAccion: implementar las 3 mejoras de mayor impacto.\n\n[checklist]\n- [ ] La test suite tiene 20+ queries variadas\n- [ ] La rubrica tiene min. 5 criterios con escala\n- [ ] Los failures tienen root cause analysis\n- [ ] Las mejoras son accionables en el system prompt",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "agentes_automatizar_proceso_recurrente",
    "label_title": "Automatizar Proceso Recurrente",
    "category": "agentes",
    "type": "spec",
    "content": "[inputs]\n- PROCESO: {{PROCESO}} > Proceso recurrente a automatizar\n- FRECUENCIA: {{FRECUENCIA}} > Con que frecuencia se ejecuta\n- HERRAMIENTAS: {{HERRAMIENTAS}} > Herramientas disponibles\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara convertir un proceso manual recurrente en un flujo asistido por IA. Cada tarea que repites mas de 3 veces es candidata a automatizacion con agentes.\n\n--- P | PEDIDO ---\n\nArquetipo: Automation Architect con experiencia en diseno de flujos de automatizacion con IA para procesos de negocio recurrentes.\n\nAutomatizacion con agente:\n1. Proceso actual: pasos manuales, tiempos, frecuencia\n2. Candidatos de automatizacion: que pasos puede hacer un agente\n3. Diseno del agente: inputs, proceso, outputs, validaciones\n4. Human-in-the-loop: donde se necesita aprobacion humana\n5. Setup: como configurar el agente (prompt + herramienta)\n6. ROI: tiempo ahorrado × frecuencia × valor/hora\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Map before automate: entender el proceso antes de automatizar\n- 80/20: automatizar el 80% que es repetitivo, mantener humano el 20% que es juicio\n- Start simple: automatizar 1 paso, validar, luego el siguiente\n- Measure: si no mides el ahorro, no sabes si funciona\n\n--- C | CRITERIO ---\n\nFormato: mapa de proceso + diseno de agente + ROI.\nTono: practico.\nAudiencia: profesional que ejecuta el proceso.\nAccion: configurar el agente para el paso #1.\n\n[checklist]\n- [ ] El proceso actual esta mapeado con tiempos\n- [ ] Los pasos automatizables estan justificados\n- [ ] Los human-in-the-loop estan definidos\n- [ ] El ROI esta cuantificado",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "agentes_prompt_library_personal",
    "label_title": "Prompt Library Personal",
    "category": "agentes",
    "type": "spec",
    "content": "[inputs]\n- HERRAMIENTAS: {{HERRAMIENTAS}} > Herramientas IA que usas (ChatGPT, Claude, Gemini, etc.)\n- TEMAS: {{TEMAS}} > Areas donde usas IA mas frecuentemente\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara construir tu propia biblioteca de prompts personalizada — los que REALMENTE usas, organizados para acceso instantaneo.\n\n--- P | PEDIDO ---\n\nArquetipo: Prompt Librarian con experiencia en curaduria de bibliotecas de prompts para equipos de productividad y operaciones.\n\nBiblioteca personal de prompts:\n1. Inventario: que prompts usas regularmente (recolectar de historial)\n2. Clasificacion: por tipo (creacion, analisis, comunicacion, meta)\n3. Formato estandar: cada prompt con nombre, descripcion, parametros, ejemplo\n4. Naming convention: que permita busqueda rapida\n5. Storage: donde guardar (text expander, Notion, JSON, etc.)\n6. Mantenimiento: ritual mensual de actualizacion (agregar, mejorar, eliminar)\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Start from history: tus mejores prompts ya estan en tu historial\n- Standardize: mismo formato para todos (facilita busqueda)\n- Parameterize: convertir prompts fijos en templates con {{variables}}\n- Prune: eliminar los que no usas hace 30 dias\n\n--- C | CRITERIO ---\n\nFormato: guia de creacion de biblioteca + template + naming convention.\nTono: practico.\nAudiencia: profesional que usa IA diariamente.\nAccion: recopilar los 10 prompts que mas usas.\n\n[checklist]\n- [ ] Los prompts estan estandarizados en formato comun\n- [ ] La naming convention es consistente y buscable\n- [ ] El storage es accesible rapidamente (text expander ideal)\n- [ ] El ritual de mantenimiento esta calendarizado",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "agentes_escalera_agentica_roadmap",
    "label_title": "Escalera Agentica Roadmap",
    "category": "agentes",
    "type": "spec",
    "content": "[inputs]\n- NIVEL_ACTUAL: {{NIVEL_ACTUAL}} > Tu nivel actual de uso de IA\n- OBJETIVO: {{OBJETIVO}} > Que quieres lograr con IA en los proximos 90 dias\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar tu roadmap personal en la Escalera Agentica: de usuario basico a disenador de sistemas. Cada nivel multiplica tu capacidad.\n\n--- P | PEDIDO ---\n\nArquetipo: Coach de Evolucion Agentica con experiencia en adopcion progresiva de IA para profesionales no-tecnicos.\n\nEscalera Agentica — Tu Roadmap:\n1. Diagnostico: en que nivel estas hoy (Asistente/Agente/Pristino/Ecosistema)\n2. Nivel 1 - Asistente: usar chat con prompts de alto rendimiento\n3. Nivel 2 - Agente: usar Custom GPTs y Gems pre-construidos\n4. Nivel 3 - Pristino: orquestar multiples agentes coordinados\n5. Nivel 4 - Ecosistema: construir tus propios agentes y sistemas\n6. Plan: que hacer en los proximos 30 dias para subir 1 nivel\n7. Metricas: como saber que subiste de nivel\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Progressive mastery: dominar un nivel antes de subir\n- Use case driven: cada nivel se aprende resolviendo un problema real\n- Build on success: lo que funciona en un nivel se escala en el siguiente\n- Community: aprender con otros acelera la progresion\n\n--- C | CRITERIO ---\n\nFormato: diagnostico + roadmap de 30 dias + metricas.\nTono: pedagogico-motivador.\nAudiencia: profesional que quiere escalar su uso de IA.\nAccion: completar el diagnostico y empezar el plan de 30 dias.\n\n[checklist]\n- [ ] El diagnostico es honesto (no auto-sobreestimacion)\n- [ ] El plan de 30 dias tiene acciones concretas por semana\n- [ ] Las metricas de nivel son medibles\n- [ ] El roadmap es progresivo (no heroico)",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "automatizacion_workflow_nocode",
    "label_title": "Workflow Nocode",
    "category": "automatizacion",
    "type": "spec",
    "content": "[inputs]\n- PROCESO: {{PROCESO}} > Proceso manual a automatizar\n- HERRAMIENTAS: {{HERRAMIENTAS}} > Herramientas que ya usas\n- FRECUENCIA: {{FRECUENCIA}} > Frecuencia del proceso\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara automatizar procesos manuales recurrentes sin escribir codigo. Cada hora automatizada es una hora liberada para trabajo de alto valor.\n\n--- P | PEDIDO ---\n\nArquetipo: Arquitecto de Automatizaciones No-Code con experiencia en Make, Zapier, n8n, Power Automate y diseno de workflows para equipos de 5-500 personas.\n\nWorkflow automatizado:\n1. Mapeo del proceso manual paso a paso (as-is)\n2. Identificacion de trigger, acciones y condiciones\n3. Seleccion de plataforma de automatizacion optima con justificacion\n4. Diseno del flujo con manejo de errores\n5. Guia de implementacion paso a paso\n6. ROI estimado (horas/semana ahorradas x valor/hora)\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- As-is before to-be: mapear antes de redisenar\n- Error-first design: que pasa cuando algo falla\n- Start simple: automatizar el 80% primero, iterar despues\n- ROI honesto: incluir tiempo de setup y mantenimiento\n\n--- C | CRITERIO ---\n\nFormato: diagrama de flujo + guia de implementacion + ROI. Tono: practico, paso a paso. Audiencia: profesional sin experiencia tecnica. Accion: configurar la primera automatizacion esta semana.\n\n[checklist]\n- [ ] El proceso manual esta mapeado completamente\n- [ ] La plataforma esta seleccionada con justificacion\n- [ ] El manejo de errores esta disenado\n- [ ] El ROI incluye costos de setup y mantenimiento",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "meta_crear_spec_alto_rendimiento",
    "label_title": "Crear Spec Alto Rendimiento",
    "category": "meta",
    "type": "spec",
    "content": "[inputs]\n- OBJETIVO: {{OBJETIVO}} > Que debe producir este nuevo SPEC\n- CONTEXTO: {{CONTEXTO}} > (opcional) Contexto de negocio o dominio\n- COMPLEJIDAD: {{COMPLEJIDAD}} > (opcional) Nivel (simple, medio, avanzado)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar un SPEC de alto rendimiento desde cero, usando el formato MetodologIA. El meta-prompting es la habilidad multiplicadora: un buen prompt crea valor una vez; un buen meta-prompt crea valor infinitas veces.\n\n--- P | PEDIDO ---\n\nArquetipo: Ingeniero de Prompts Senior y Disenador de Sistemas Conversacionales con experiencia en creacion de bibliotecas de prompts empresariales y optimizacion de LLMs.\n\nTaller de co-diseno de SPEC:\n1. Definir objetivo del nuevo SPEC con precision\n2. Seleccionar arquetipo experto con justificacion\n3. Disenar la seccion S (Situacion prospectiva)\n4. Disenar la seccion P (Pedido con componentes)\n5. Disenar la seccion E (Ejecucion con metodo)\n6. Disenar la seccion C (Criterio medible)\n7. Crear [inputs] parametrizados con {{placeholders}}\n8. Crear [checklist] de auto-auditoria\n9. Test: ejecutar el SPEC y evaluar output\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Formato SPEC: Situacion (Para que) + Pedido (Que) + Ejecucion (Como) + Criterio (Medida)\n- Parametric design: cada variable en {{DOBLE_LLAVE}}\n- Test-driven: ejecutar el SPEC 3 veces para validar consistencia\n- Specificity > generality: un SPEC para un tipo de entregable\n\n--- C | CRITERIO ---\n\nFormato: SPEC completo listo para agregar a la biblioteca + reporte de test. Tono: tecnico-pedagogico. Audiencia: el autor del SPEC. Accion: publicar el SPEC en su text expander.\n\n[checklist]\n- [ ] El SPEC tiene las 4 secciones SPEC completas\n- [ ] Los parametros son claros y tienen ejemplos\n- [ ] El checklist tiene min. 4 criterios verificables\n- [ ] El SPEC fue testeado al menos 1 vez con resultado satisfactorio",
    "paramCount": 5,
    "keywords": []
  },
  {
    "id": "meta_optimizar_spec_existente",
    "label_title": "Optimizar Spec Existente",
    "category": "meta",
    "type": "spec",
    "content": "[inputs]\n- SPEC_ACTUAL: {{SPEC_ACTUAL}} > El SPEC actual que quieres optimizar\n- PROBLEMA: {{PROBLEMA}} > Que falla o es inconsistente en los resultados\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara mejorar significativamente un SPEC que ya existe pero produce resultados inconsistentes. La optimizacion de prompts es ingenieria iterativa, no magia.\n\n--- P | PEDIDO ---\n\nArquetipo: Prompt Optimization Specialist con experiencia en A/B testing de prompts, analisis de output quality y mejora sistematica de instrucciones para LLMs.\n\nOptimizacion de SPEC:\n1. Diagnostico: ejecutar el SPEC 3 veces y analizar variabilidad\n2. Identificar secciones debiles (donde la IA se devia)\n3. Reforzar con mayor especificidad, ejemplos o restricciones\n4. Eliminar ambiguedades y instrucciones contradictorias\n5. A/B test: version original vs optimizada (3 ejecuciones cada una)\n6. Documentar mejoras con antes/despues\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Consistency test: 3 ejecuciones, mismos inputs, evaluar varianza\n- Failure mode analysis: donde y por que se devia\n- Specificity injection: agregar restricciones donde hay desviacion\n- Simplify: a veces el prompt necesita menos instrucciones, no mas\n\n--- C | CRITERIO ---\n\nFormato: SPEC optimizado + reporte de mejora con antes/despues. Tono: analitico. Audiencia: autor del SPEC original. Accion: reemplazar la version anterior con la optimizada.\n\n[checklist]\n- [ ] El diagnostico tiene 3+ ejecuciones analizadas\n- [ ] Las secciones debiles estan identificadas con evidencia\n- [ ] El A/B test muestra mejora medible\n- [ ] El SPEC optimizado es mas corto o igual (no mas largo sin razon)",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "visual_paleta_colores_profesional",
    "label_title": "Paleta Colores Profesional",
    "category": "visual",
    "type": "spec",
    "content": "[inputs]\n- MARCA: {{MARCA}} > Marca o proyecto\n- PERSONALIDAD: {{PERSONALIDAD}} > 3 adjetivos que definen la marca\n- SECTOR: {{SECTOR}} > (opcional) Sector o industria\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara seleccionar una paleta de colores que comunique la personalidad correcta y funcione en todos los medios. El color es el primer mensaje que recibe tu audiencia.\n\n--- P | PEDIDO ---\n\nArquetipo: Disenador de Color y Brand Strategist con experiencia en color psychology aplicada a marcas premium y sistemas de diseno.\n\nPaleta profesional:\n1. Analizar personalidad de marca: que emociones comunicar\n2. Color primario: 1 color protagonista con justificacion psicologica\n3. Color secundario: 1 complemento con contraste optimo\n4. Acentos: 1-2 colores de enfasis para CTAs y highlights\n5. Neutros: gama de grises para texto, fondos, bordes\n6. Accesibilidad: verificar ratios WCAG AA/AAA\n7. Paleta completa con hex, RGB, HSL\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Color psychology: red=urgencia, blue=confianza, gold=premium\n- 60-30-10 rule: 60% neutro, 30% primario, 10% acento\n- Contrast checker: WCAG AA minimo (4.5:1 para texto)\n- Cross-media: la paleta debe funcionar en screen, print, y dark mode\n\n--- C | CRITERIO ---\n\nFormato: paleta completa con codigos + guia de uso + accesibilidad.\nTono: creativo-tecnico.\nAudiencia: disenador o profesional que define su identidad visual.\nAccion: aplicar la paleta a todos los canales.\n\n[checklist]\n- [ ] El color primario tiene justificacion psicologica\n- [ ] Los ratios de contraste pasan WCAG AA\n- [ ] La paleta tiene max 6 colores (no 20)\n- [ ] Funciona en light mode y dark mode",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "visual_diseno_social_media_kit",
    "label_title": "Diseno Social Media Kit",
    "category": "visual",
    "type": "spec",
    "content": "[inputs]\n- MARCA: {{MARCA}} > Marca o perfil\n- PLATAFORMAS: {{PLATAFORMAS}} > Redes sociales activas\n- PALETA: {{PALETA}} > (opcional) Colores de marca (hex codes)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear un kit de templates para redes sociales que mantenga consistencia visual en todas las publicaciones. La consistencia visual es reconocimiento de marca.\n\n--- P | PEDIDO ---\n\nArquetipo: Social Media Designer con experiencia en creacion de kits visuales para marcas B2B y B2C en Instagram, LinkedIn y TikTok.\n\nSocial Media Kit:\n1. Grid de formatos: post (1080x1080), story (1080x1920), carousel, reel cover\n2. Template por tipo de contenido: quote, tip, dato, case, CTA\n3. Guia tipografica: fonts, tamanos, jerarquias\n4. Paleta aplicada: como se usan los colores en cada formato\n5. Elementos recurrentes: marcos, iconos, watermark\n6. Specs para herramienta de diseno (Canva, Figma)\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Template > freestyle: la consistencia gana al genio esporadico\n- Platform-native sizes: cada red tiene sus formatos\n- Brand recognition: 3 elementos recurrentes que hagan reconocible\n- Batch-friendly: templates pensados para produccion rapida\n\n--- C | CRITERIO ---\n\nFormato: specs de templates por formato + guia de uso.\nTono: creativo-sistematico.\nAudiencia: community manager o creador de contenido.\nAccion: crear los templates en Canva o Figma.\n\n[checklist]\n- [ ] Los formatos cubren las 3 plataformas principales\n- [ ] Los templates cubren 5+ tipos de contenido\n- [ ] La guia tipografica tiene jerarquia clara\n- [ ] Los specs son implementables en la herramienta elegida",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "visual_presentacion_minimalista",
    "label_title": "Presentacion Minimalista",
    "category": "visual",
    "type": "spec",
    "content": "[inputs]\n- TEMA: {{TEMA}} > Tema de la presentacion\n- AUDIENCIA: {{AUDIENCIA}} > Audiencia\n- DURACION: {{DURACION}} > Duracion en minutos\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear presentaciones donde cada slide dice mas con menos. El minimalismo en presentaciones no es vacio — es enfoque absoluto en el mensaje.\n\n--- P | PEDIDO ---\n\nArquetipo: Presentation Minimalist con experiencia en keynotes de alto impacto (estilo Apple, TED) donde cada pixel tiene proposito.\n\nPresentacion minimalista:\n1. 1 idea por slide — sin excepciones\n2. Max 10 palabras por slide (el speaker dice el resto)\n3. Visual dominante: imagen, numero o diagrama que cuenta la historia\n4. Fondo limpio: max 2 colores por slide\n5. Transiciones: corte seco (no dissolve, no fly-in)\n6. Slide-by-slide spec con visual + nota del speaker\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Apple keynote style: imagen grande, texto minimo\n- Takahashi method: 1 numero o 1 palabra por slide\n- Signal-to-noise: eliminar todo lo que no amplifica el mensaje\n- Rehearsal: si necesitas leer la slide, tiene demasiado texto\n\n--- C | CRITERIO ---\n\nFormato: outline slide-by-slide + notas del speaker.\nTono: minimalista, de alto impacto.\nAudiencia: {{AUDIENCIA}}.\nAccion: disenar las slides.\n\n[checklist]\n- [ ] Ninguna slide tiene mas de 10 palabras\n- [ ] Cada slide tiene 1 sola idea\n- [ ] Las notas del speaker estan completas\n- [ ] Las transiciones son corte seco",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "visual_html_autocontenido_dashboard",
    "label_title": "Html Autocontenido Dashboard",
    "category": "visual",
    "type": "spec",
    "content": "[inputs]\n- DATOS: {{DATOS}} > Datos a visualizar en el dashboard\n- AUDIENCIA: {{AUDIENCIA}} > Quien vera el dashboard\n- MARCA: {{MARCA}} > (opcional) Colores y fonts de marca\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara generar un dashboard HTML autocontenido que funcione offline, sin dependencias externas. Abre en cualquier browser, imprimible, compartible por email.\n\n--- P | PEDIDO ---\n\nArquetipo: Full-Stack Data Visualizer con experiencia en dashboards HTML self-contained para reportes ejecutivos y presentaciones offline.\n\nHTML Dashboard:\n1. KPIs principales: numeros grandes arriba\n2. Graficos: bars, lines, pies (usando CSS puro o SVG inline)\n3. Tablas de datos: responsivas, escaneables\n4. Insights: 3-5 bullet points con lo que importa\n5. Responsive: funciona en desktop, tablet, mobile\n6. Specs: fonts inline, CSS inline, zero external dependencies\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Self-contained: todo inline (CSS, fonts base64, SVG)\n- KPI hierarchy: lo mas importante arriba y grande\n- Progressive disclosure: resumen > detalle > datos crudos\n- Print-friendly: @media print stylesheet incluido\n\n--- C | CRITERIO ---\n\nFormato: especificacion HTML completa o codigo listo.\nTono: tecnico.\nAudiencia: desarrollador o creador que genera el HTML.\nAccion: generar el dashboard.\n\n[checklist]\n- [ ] Zero dependencias externas\n- [ ] Responsive (desktop + mobile)\n- [ ] KPIs visibles sin scroll\n- [ ] Print-friendly",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "visual_before_after_transformacion",
    "label_title": "Before After Transformacion",
    "category": "visual",
    "type": "spec",
    "content": "[inputs]\n- METRICA: {{METRICA}} > Que estas comparando\n- BEFORE: {{BEFORE}} > Datos o estado anterior\n- AFTER: {{AFTER}} > Datos o estado actual\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear comparaciones visuales antes/despues que demuestren impacto de forma innegable. El before/after es la prueba visual mas poderosa.\n\n--- P | PEDIDO ---\n\nArquetipo: Visual Storyteller con experiencia en case studies visuales y demostraciones de impacto para ventas y marketing.\n\nBefore/After Visual:\n1. Seleccionar la metrica o aspecto a comparar\n2. Before: capturar el estado anterior con datos/visual concreto\n3. After: mostrar el estado actual con los mismos parametros\n4. Delta: cuantificar la diferencia (%, absoluto, x veces)\n5. Formato: lado a lado o timeline\n6. Caption: 1 oracion que cuente la historia del cambio\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Same parameters: comparar manzanas con manzanas\n- Quantify the delta: numeros > adjetivos\n- Let the visual speak: minimal text, maximal contrast\n- Honest comparison: no cherry-pick el mejor after vs peor before\n\n--- C | CRITERIO ---\n\nFormato: spec de before/after con datos y layout.\nTono: factual, visual.\nAudiencia: stakeholders o prospectos.\nAccion: usar en la proxima presentacion de resultados.\n\n[checklist]\n- [ ] Los parametros de comparacion son identicos\n- [ ] El delta esta cuantificado\n- [ ] La comparacion es honesta\n- [ ] La caption cuenta la historia en 1 oracion",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "visual_mapa_mental_concepto",
    "label_title": "Mapa Mental Concepto",
    "category": "visual",
    "type": "spec",
    "content": "[inputs]\n- CONCEPTO: {{CONCEPTO}} > Concepto a mapear\n- PROPOSITO: {{PROPOSITO}} > Para que necesitas el mapa (estudiar, planificar, comunicar)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear un mapa mental que descomponga un concepto complejo en partes navegables. El mapa mental es el GPS del pensamiento — muestra la estructura que la mente no puede sostener sola.\n\n--- P | PEDIDO ---\n\nArquetipo: Knowledge Architect con experiencia en visualizacion de conocimiento y mapas mentales para planificacion estrategica y educacion.\n\nMapa mental:\n1. Nodo central: concepto principal en 3 palabras max\n2. Ramas nivel 1: 5-7 dimensiones principales (MECE)\n3. Ramas nivel 2: sub-temas por dimension\n4. Relaciones cruzadas: conexiones entre ramas\n5. Color coding: una familia de color por rama\n6. Formato: texto estructurado para Mermaid mindmap o XMind\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Central > branches > leaves: de lo general a lo especifico\n- MECE branches: mutuamente excluyentes, colectivamente exhaustivas\n- Cross-links: las conexiones entre ramas revelan insights\n- Limit depth: max 3 niveles para mantener legibilidad\n\n--- C | CRITERIO ---\n\nFormato: mapa mental en texto estructurado o Mermaid.\nTono: visual-analitico.\nAudiencia: quien necesita entender la estructura del concepto.\nAccion: usar como guia de navegacion del tema.\n\n[checklist]\n- [ ] El nodo central cabe en 3 palabras\n- [ ] Las ramas nivel 1 son MECE\n- [ ] Las relaciones cruzadas estan identificadas\n- [ ] Max 3 niveles de profundidad",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "visual_icon_system_coherente",
    "label_title": "Icon System Coherente",
    "category": "visual",
    "type": "spec",
    "content": "[inputs]\n- PROYECTO: {{PROYECTO}} > Proyecto o producto\n- ESTILO: {{ESTILO}} > (opcional) Estilo preferido (outlined, filled, duotone)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar un sistema de iconos coherente para una interfaz, presentacion o documento. Los iconos son el micro-lenguaje visual — inconsistencia aqui grita amateur.\n\n--- P | PEDIDO ---\n\nArquetipo: UI/Icon Designer con experiencia en sistemas de iconografia para productos digitales y documentacion corporativa.\n\nSistema de iconos:\n1. Estilo: outlined, filled, duotone (elegir 1, mantener consistencia)\n2. Grid: tamano base (24px, 32px), stroke width, corner radius\n3. Catalogo: icono por concepto clave del proyecto (min 20)\n4. Naming convention: nombre descriptivo en ingles\n5. Fuente: libreria recomendada (Lucide, Phosphor, Heroicons, custom)\n6. Uso: guia de cuando usar cual icono\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Consistency > creativity: 1 estilo, sin mezclar\n- Semantic clarity: el icono debe entenderse sin label\n- Grid-based: todos los iconos en la misma grid\n- Test: 5-second recognition test con usuarios\n\n--- C | CRITERIO ---\n\nFormato: catalogo de iconos + guia de estilo + fuente.\nTono: tecnico-visual.\nAudiencia: disenador o developer.\nAccion: implementar el sistema de iconos.\n\n[checklist]\n- [ ] Todos los iconos son del mismo estilo\n- [ ] La grid es consistente\n- [ ] El catalogo cubre los conceptos clave\n- [ ] La naming convention es clara",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "agentes_gemini_gem_especializado",
    "label_title": "Gemini Gem Especializado",
    "category": "agentes",
    "type": "spec",
    "content": "[inputs]\n- FUNCION: {{FUNCION}} > Funcion principal del Gem\n- AUDIENCIA: {{AUDIENCIA}} > Quien usara el Gem\n- SOURCES: {{SOURCES}} > (opcional) Documentos o URLs para alimentar el Gem\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear un Gemini Gem que funcione como asistente especializado con personalidad y scope definidos.\n\n--- P | PEDIDO ---\n\nArquetipo: Disenador de Gems con experiencia en configuracion de asistentes Gemini para productividad empresarial.\n\nGemini Gem:\n1. Nombre y personalidad del Gem\n2. Instrucciones de sistema con scope y boundaries\n3. Knowledge sources: que documentos o URLs alimentan al Gem\n4. Formato default de respuesta\n5. 5 examples de interaccion ideal\n6. Testing plan: 10 queries de prueba\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Scope-first: que hace y que NO hace\n- Knowledge-grounded: respuestas basadas en sources, no en alucinacion\n- Personality calibration: tono y estilo consistentes\n- Test before publish\n\n--- C | CRITERIO ---\n\nFormato: instrucciones completas del Gem + examples + test plan.\nTono: tecnico.\nAudiencia: creador del Gem.\nAccion: crear el Gem en Gemini.\n\n[checklist]\n- [ ] Las instrucciones tienen scope y boundaries\n- [ ] Los knowledge sources estan definidos\n- [ ] Los 5 examples son representativos\n- [ ] El test plan cubre edge cases",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "agentes_notebooklm_cuaderno",
    "label_title": "Notebooklm Cuaderno",
    "category": "agentes",
    "type": "spec",
    "content": "[inputs]\n- TEMA: {{TEMA}} > Tema del cuaderno\n- FUENTES: {{FUENTES}} > Tipo de fuentes disponibles\n- OUTPUTS: {{OUTPUTS}} > Que tipo de outputs necesitas (audio, slides, texto)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara configurar un cuaderno de NotebookLM que funcione como base de conocimiento consultable y generador de contenido multimedia.\n\n--- P | PEDIDO ---\n\nArquetipo: Producer de NotebookLM con experiencia en curaduria de cuadernos para investigacion, educacion y produccion de contenido.\n\nCuaderno NLM:\n1. Objetivo del cuaderno: que preguntas debe poder responder\n2. Fuentes: seleccion y curaduria (max 50, calidad > cantidad)\n3. Organizacion: naming convention de sources\n4. Prompt de chat: como configurar la conversacion\n5. Outputs multimedia: audio overview, slides, infografia\n6. Mantenimiento: cuando agregar/remover sources\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Curate > dump: seleccionar fuentes con intencion\n- Source quality: la calidad del output = calidad de los inputs\n- Structured queries: preguntas especificas producen mejores respuestas\n- Multimedia pipeline: sources > chat > audio/slides/infographic\n\n--- C | CRITERIO ---\n\nFormato: plan de cuaderno + lista de sources + prompts de chat.\nTono: practico.\nAudiencia: profesional que usa NLM.\nAccion: crear el cuaderno con las primeras 10 sources.\n\n[checklist]\n- [ ] Las fuentes estan curadas (no dumped)\n- [ ] El objetivo del cuaderno es especifico\n- [ ] Los prompts de chat son efectivos\n- [ ] El plan de mantenimiento esta definido",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "agentes_text_expander_biblioteca",
    "label_title": "Text Expander Biblioteca",
    "category": "agentes",
    "type": "spec",
    "content": "[inputs]\n- HERRAMIENTA: {{HERRAMIENTA}} > Text expander elegido (Espanso, TextExpander, Alfred)\n- DISPOSITIVOS: {{DISPOSITIVOS}} > Dispositivos a sincronizar\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara configurar un text expander (Espanso, TextExpander, Alfred) con tu biblioteca de prompts para acceso instantaneo.\n\n--- P | PEDIDO ---\n\nArquetipo: Productivity Engineer con experiencia en configuracion de text expanders para workflows de alto rendimiento con IA.\n\nText Expander Setup:\n1. Herramienta seleccionada: Espanso (free) vs TextExpander vs Alfred\n2. Naming convention: prefijo + categoria + accion (ej: ;prod-ritual)\n3. Top 20 prompts a configurar primero (los que mas usas)\n4. Variables fill-in: {{campos}} que el usuario completa al expandir\n5. Organizacion: carpetas/grupos por categoria\n6. Sync: como sincronizar entre dispositivos\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Start with 20: los mas usados primero, no los 365\n- Consistent triggers: ;categoria-accion (facil de recordar)\n- Fill-in fields: para parametros que cambian por uso\n- Monthly review: agregar, mejorar, eliminar snippets\n\n--- C | CRITERIO ---\n\nFormato: guia de setup + 20 snippets configurados + naming convention.\nTono: tecnico paso a paso.\nAudiencia: profesional que quiere acceso instantaneo a prompts.\nAccion: instalar y configurar los primeros 10 snippets hoy.\n\n[checklist]\n- [ ] La naming convention es consistente y memorable\n- [ ] Los 20 snippets son los de mayor frecuencia de uso\n- [ ] Los fill-in fields cubren los parametros variables\n- [ ] La guia de sync esta incluida",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "agentes_priming_contexto_sesion",
    "label_title": "Priming Contexto Sesion",
    "category": "agentes",
    "type": "spec",
    "content": "[inputs]\n- ROL: {{ROL}} > Tu rol profesional\n- SECTOR: {{SECTOR}} > Tu sector o industria\n- PREFERENCIAS: {{PREFERENCIAS}} > Como prefieres que la IA te responda\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear un prompt de priming que configure al asistente con tu contexto profesional al inicio de cada sesion. El priming ahorra 10 minutos de contexto cada vez.\n\n--- P | PEDIDO ---\n\nArquetipo: Prompt Architect con experiencia en diseno de system prompts y session priming para profesionales que usan IA diariamente.\n\nPrompt de Priming:\n1. Quien eres: rol, empresa, sector, experiencia\n2. Como trabajas: herramientas, preferencias, restricciones\n3. Tono preferido: como quieres que te hable la IA\n4. Formato default: como prefieres recibir outputs\n5. Reglas: que debe hacer siempre / que nunca\n6. Contexto actual: proyecto o foco de este periodo\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Max 200 palabras: denso, no verbose\n- Update quarterly: el contexto cambia\n- Test: el priming debe producir primera respuesta calibrada sin correccion\n- Portable: funciona en ChatGPT, Claude, Gemini\n\n--- C | CRITERIO ---\n\nFormato: prompt de priming listo para copiar (max 200 palabras).\nTono: profesional.\nAudiencia: tu yo futuro que inicia una sesion nueva.\nAccion: pegar al inicio de cada sesion nueva.\n\n[checklist]\n- [ ] Cabe en 200 palabras\n- [ ] Cubre rol, tono, formato y reglas\n- [ ] Funciona cross-platform\n- [ ] No requiere edicion para uso diario",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "agentes_workflow_multimodelo",
    "label_title": "Workflow Multimodelo",
    "category": "agentes",
    "type": "spec",
    "content": "[inputs]\n- TAREAS: {{TAREAS}} > Tipos de tareas que haces con IA\n- MODELOS: {{MODELOS}} > Modelos/herramientas IA que tienes acceso\n- PRESUPUESTO: {{PRESUPUESTO}} > (opcional) Presupuesto mensual en IA\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar un workflow que use el modelo correcto para cada tarea: GPT para creatividad, Claude para analisis, Gemini para research, Perplexity para busqueda.\n\n--- P | PEDIDO ---\n\nArquetipo: AI Workflow Architect con experiencia en orquestacion multi-modelo y seleccion de LLMs para tareas especificas.\n\nWorkflow multi-modelo:\n1. Inventario de tareas por tipo (creacion, analisis, busqueda, codigo, visual)\n2. Fortaleza por modelo: GPT, Claude, Gemini, Perplexity, Copilot\n3. Asignacion: modelo optimo por tipo de tarea\n4. Handoff: como pasar output de un modelo a otro\n5. Cost optimization: cuando usar modelo caro vs barato\n6. Workflow diagramado: que modelo en que momento\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Right model for right job: no usar GPT-4 para todo\n- Specialized > general: cada modelo tiene fortalezas\n- Cost-aware: usar modelos baratos para tareas simples\n- Pipeline: output de uno = input del siguiente\n\n--- C | CRITERIO ---\n\nFormato: workflow diagramado + tabla modelo/tarea + guia de handoff.\nTono: tecnico-estrategico.\nAudiencia: profesional que usa multiples IAs.\nAccion: implementar el workflow esta semana.\n\n[checklist]\n- [ ] La asignacion modelo-tarea esta justificada\n- [ ] Los handoffs entre modelos estan definidos\n- [ ] La optimizacion de costos esta considerada\n- [ ] El workflow es ejecutable con herramientas actuales",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "agentes_quality_rubric_outputs",
    "label_title": "Quality Rubric Outputs",
    "category": "agentes",
    "type": "spec",
    "content": "[inputs]\n- TIPO_OUTPUT: {{TIPO_OUTPUT}} > Tipo de output a evaluar (texto, analisis, presentacion, etc.)\n- ESTANDAR: {{ESTANDAR}} > Nivel de calidad requerido (profesional, ejecutivo, publicacion)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear una rubrica de calidad para evaluar outputs de IA de forma consistente y objetiva. Sin rubrica, 'esta bueno' es opinion; con rubrica, es medicion.\n\n--- P | PEDIDO ---\n\nArquetipo: QA Specialist de Contenido con experiencia en diseno de rubricas de evaluacion para outputs de LLMs y contenido editorial.\n\nRubrica de calidad:\n1. Dimensiones de calidad: precision, completitud, claridad, formato, tono, accionabilidad\n2. Escala por dimension: 1-10 con descriptores por nivel\n3. Peso por dimension: no todas pesan igual\n4. Score minimo aceptable: umbral de aprobacion\n5. Ejemplo de output 10/10 vs 5/10 vs 2/10\n6. Protocolo de evaluacion: como aplicar la rubrica en <2 min\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Measurable criteria: cada dimension con descriptores claros\n- Weighted scoring: precision pesa mas que formato\n- Calibration: evaluar 3 outputs con la rubrica para calibrar\n- Speed: si toma mas de 2 min evaluar, la rubrica es muy compleja\n\n--- C | CRITERIO ---\n\nFormato: rubrica completa + ejemplos por nivel + protocolo.\nTono: tecnico.\nAudiencia: profesional que evalua outputs de IA regularmente.\nAccion: evaluar los proximos 5 outputs con esta rubrica.\n\n[checklist]\n- [ ] Las dimensiones son medibles (no subjetivas)\n- [ ] Los descriptores por nivel son claros\n- [ ] Los pesos estan justificados\n- [ ] El protocolo de evaluacion cabe en 2 minutos",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "stack_auditar_herramientas_personal",
    "label_title": "Auditar Herramientas Personal",
    "category": "stack",
    "type": "spec",
    "content": "[inputs]\n- HERRAMIENTAS: {{HERRAMIENTAS}} > Lista de herramientas que usas\n- PRESUPUESTO: {{PRESUPUESTO}} > (opcional) Gasto mensual actual en herramientas\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara auditar tu stack de herramientas y eliminar redundancias. El profesional promedio paga por 8 herramientas y usa 3. Las otras 5 son desperdicio.\n\n--- P | PEDIDO ---\n\nArquetipo: Consultor de Productividad Digital con experiencia en stack optimization para equipos remotos y profesionales independientes.\n\nStack Audit:\n1. Inventario completo: herramienta, costo, frecuencia de uso, valor aportado\n2. Clasificacion: esencial / util / redundante / abandonada\n3. Mapa de solapamientos: que herramientas hacen lo mismo\n4. Stack optimo: consolidar a las minimas necesarias\n5. Migration plan: como migrar de las eliminadas\n6. Ahorro estimado: dinero + horas de gestion\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Inventory first: no puedes optimizar lo que no conoces\n- Usage audit: frecuencia real, no percibida\n- Consolidation: 1 herramienta buena > 3 mediocres\n- Total cost: licencia + tiempo de aprendizaje + mantenimiento\n\n--- C | CRITERIO ---\n\nFormato: inventario + mapa de solapamiento + stack optimo + ahorro.\nTono: analitico.\nAudiencia: profesional o equipo.\nAccion: cancelar la primera herramienta redundante.\n\n[checklist]\n- [ ] Todas las herramientas estan inventariadas con costo\n- [ ] Los solapamientos estan identificados\n- [ ] El stack optimo es min. 30% mas pequeno\n- [ ] El ahorro esta cuantificado",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "stack_seleccionar_herramienta",
    "label_title": "Seleccionar Herramienta",
    "category": "stack",
    "type": "spec",
    "content": "[inputs]\n- NECESIDAD: {{NECESIDAD}} > Que problema resuelve la herramienta\n- CANDIDATAS: {{CANDIDATAS}} > Herramientas a comparar\n- PRESUPUESTO: {{PRESUPUESTO}} > (opcional) Presupuesto disponible\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara evaluar y seleccionar la herramienta correcta cuando tienes multiples opciones. La decision de herramienta no es tecnica — es estrategica.\n\n--- P | PEDIDO ---\n\nArquetipo: Technology Evaluator con experiencia en seleccion de herramientas para equipos y organizaciones.\n\nEvaluacion de herramienta:\n1. Requisitos: must-have vs nice-to-have (no mas de 10)\n2. Candidatas: 3-5 opciones a evaluar\n3. Criterios: funcionalidad, precio, UX, integraciones, soporte, escalabilidad\n4. Scoring: tabla comparativa (1-5 por criterio ponderado)\n5. Trial plan: como probar la top 2 antes de decidir\n6. Decision + justificacion\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Requirements-first: saber que necesitas antes de comparar\n- Weighted scoring: no todos los criterios pesan igual\n- Trial > demo: usar la herramienta, no solo verla\n- Total cost: no solo precio, sino costo de cambio y aprendizaje\n\n--- C | CRITERIO ---\n\nFormato: tabla comparativa + scoring + recomendacion.\nTono: analitico-pragmatico.\nAudiencia: decision-maker.\nAccion: iniciar trial de la herramienta ganadora.\n\n[checklist]\n- [ ] Los requisitos son especificos (no genericos)\n- [ ] La tabla tiene scoring ponderado\n- [ ] El trial plan es ejecutable en 1 semana\n- [ ] La decision incluye justificacion y riesgos",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "stack_integraciones_mapa",
    "label_title": "Integraciones Mapa",
    "category": "stack",
    "type": "spec",
    "content": "[inputs]\n- HERRAMIENTAS: {{HERRAMIENTAS}} > Herramientas en tu stack\n- FLUJOS: {{FLUJOS}} > Flujos de trabajo principales\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara mapear como se conectan tus herramientas entre si e identificar gaps de integracion que causan trabajo manual innecesario.\n\n--- P | PEDIDO ---\n\nArquetipo: Integration Architect con experiencia en diseno de ecosistemas de herramientas conectadas para equipos de operaciones.\n\nMapa de integraciones:\n1. Diagrama: como fluyen los datos entre herramientas\n2. Integraciones activas: que esta conectado y como\n3. Gaps: donde hay transferencia manual (copiar/pegar entre apps)\n4. Oportunidades: integraciones nativas disponibles pero no configuradas\n5. Automatizaciones posibles: con Zapier, Make, n8n\n6. Plan de implementacion: priorizado por horas ahorradas\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Data flow mapping: de donde sale el dato, a donde llega\n- Gap = manual transfer: cada copiar/pegar es un gap\n- Native > third-party: preferir integraciones nativas\n- ROI per integration: horas ahorradas / horas de setup\n\n--- C | CRITERIO ---\n\nFormato: diagrama de integraciones + gaps + plan.\nTono: tecnico-practico.\nAudiencia: equipo de operaciones o profesional.\nAccion: configurar la integracion de mayor ROI.\n\n[checklist]\n- [ ] El diagrama cubre todas las herramientas principales\n- [ ] Los gaps de transferencia manual estan identificados\n- [ ] Las oportunidades de integracion son concretas\n- [ ] El plan esta priorizado por ROI",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "automatizacion_ritual_productivo_semiautomatico",
    "label_title": "Ritual Productivo Semiautomatico",
    "category": "automatizacion",
    "type": "spec",
    "content": "[inputs]\n- RITUAL: {{RITUAL}} > Ritual o rutina a automatizar\n- FRICCIONES: {{FRICCIONES}} > Puntos de mayor friccion\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara convertir un ritual productivo manual en un flujo semi-automatizado que reduzca fricciones y asegure consistencia.\n\n--- P | PEDIDO ---\n\nArquetipo: Disenador de Rituales Automatizados con experiencia en behavioural design y automatizacion personal.\n\nRitual semi-automatizado:\n1. Mapear el ritual actual: pasos, tiempos, puntos de friccion\n2. Clasificar: automatizable vs humano necesario\n3. Disenar triggers automaticos para cada paso\n4. Crear fallbacks para cuando la automatizacion falle\n5. Medir: mejora en consistencia y tiempo\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Friction-first: automatizar los puntos de mayor friccion\n- Human-in-the-loop: el humano decide, la maquina ejecuta\n- Graceful degradation: si falla la automatizacion, el ritual sigue\n- Measure: antes vs despues en tiempo y consistencia\n\n--- C | CRITERIO ---\n\nFormato: mapa del ritual + automatizaciones + metricas.\nTono: practico.\nAudiencia: profesional que tiene rituales productivos.\nAccion: automatizar el punto de mayor friccion.\n\n[checklist]\n- [ ] El ritual actual esta mapeado con tiempos\n- [ ] Los puntos automatizables estan justificados\n- [ ] Los fallbacks estan disenados\n- [ ] La mejora esta cuantificada",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "automatizacion_zapier_make_receta",
    "label_title": "Zapier Make Receta",
    "category": "automatizacion",
    "type": "spec",
    "content": "[inputs]\n- PROCESO: {{PROCESO}} > Proceso a automatizar\n- PLATAFORMA: {{PLATAFORMA}} > Zapier o Make\n- APPS: {{APPS}} > Apps involucradas en el flujo\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar una receta de automatizacion en Zapier o Make con triggers, acciones, filtros y manejo de errores.\n\n--- P | PEDIDO ---\n\nArquetipo: Automation Specialist con experiencia en Zapier y Make para procesos de marketing, ventas y operaciones.\n\nReceta de automatizacion:\n1. Trigger: que evento inicia el flujo\n2. Filtros: condiciones para continuar o detenerse\n3. Acciones: pasos secuenciales del flujo\n4. Transformaciones de datos entre pasos\n5. Error handling: que pasa si falla\n6. Testing: como probar antes de activar en produccion\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Trigger > Filter > Action: la estructura basica\n- Test with real data: no solo con datos de prueba\n- Error notification: siempre saber cuando algo falla\n- Start simple: 3 pasos max, luego iterar\n\n--- C | CRITERIO ---\n\nFormato: receta paso a paso lista para implementar.\nTono: tecnico paso a paso.\nAudiencia: profesional configurando su primera automatizacion.\nAccion: crear la automatizacion hoy.\n\n[checklist]\n- [ ] El trigger esta correctamente definido\n- [ ] Los filtros previenen ejecuciones innecesarias\n- [ ] El error handling esta configurado\n- [ ] El testing plan esta incluido",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "engine_asistente_corporativo_privado",
    "label_title": "Asistente Corporativo Privado",
    "category": "engine",
    "type": "spec",
    "content": "[inputs]\n- ORGANIZACION: {{ORGANIZACION}} > Tipo y tamano de organizacion\n- SCOPE: {{SCOPE}} > Que debe poder responder el asistente\n- FUENTES: {{FUENTES}} > Fuentes de conocimiento disponibles\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar un asistente corporativo privado alimentado con el conocimiento de tu organizacion. Tu propio ChatGPT, entrenado con TU informacion.\n\n--- P | PEDIDO ---\n\nArquetipo: Arquitecto de AI Corporativa con experiencia en despliegue de asistentes privados con RAG para empresas de 50-5000 empleados.\n\nAsistente corporativo:\n1. Scope: que preguntas debe poder responder\n2. Knowledge base: documentos, wikis, procesos a ingestar\n3. Acceso: quien puede usarlo, roles, permisos\n4. Personalidad: tono, formato, reglas de interaccion\n5. Seguridad: que NO puede decir o compartir\n6. Metricas de adopcion: como medir uso y satisfaccion\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- RAG architecture: retrieval augmented generation\n- Security-first: el asistente no puede filtrar info confidencial\n- User adoption: si no lo usan, no sirve\n- Iterative improvement: mejorar con feedback real\n\n--- C | CRITERIO ---\n\nFormato: spec del asistente + KB plan + seguridad + metricas.\nTono: tecnico-estrategico.\nAudiencia: equipo de IT o innovacion.\nAccion: definir el scope y empezar la curaduria de KB.\n\n[checklist]\n- [ ] El scope es claro y acotado\n- [ ] La seguridad esta disenada (no como afterthought)\n- [ ] El plan de adopcion existe\n- [ ] Las metricas son medibles",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "engine_chatbot_ventas_calificacion",
    "label_title": "Chatbot Ventas Calificacion",
    "category": "engine",
    "type": "spec",
    "content": "[inputs]\n- PRODUCTO: {{PRODUCTO}} > Producto o servicio que vendes\n- ICP: {{ICP}} > Perfil del cliente ideal\n- CRM: {{CRM}} > (opcional) CRM actual\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear un chatbot que califique leads automaticamente antes de pasarlos a ventas. El chatbot hace las preguntas correctas para que ventas solo hable con prospectos calificados.\n\n--- P | PEDIDO ---\n\nArquetipo: Sales Operations Architect con experiencia en chatbots de calificacion para pipelines B2B de alto volumen.\n\nChatbot de calificacion:\n1. Preguntas de calificacion: BANT (Budget, Authority, Need, Timeline)\n2. Flujo conversacional: arbol de decisiones con respuestas\n3. Scoring: puntuacion automatica por respuesta\n4. Handoff: criterios para pasar a ventas vs seguir en nurturing\n5. CRM integration: como se registra la informacion\n6. Personalidad: tono, estilo, velocidad de respuesta\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- BANT framework: Budget, Authority, Need, Timeline\n- Progressive qualification: no todas las preguntas al inicio\n- Conversational > form: el chatbot debe sentirse como conversacion\n- Threshold scoring: solo leads con score > X pasan a ventas\n\n--- C | CRITERIO ---\n\nFormato: flujo conversacional + scoring + handoff rules.\nTono: tecnico-comercial.\nAudiencia: equipo de ventas/marketing.\nAccion: implementar el chatbot.\n\n[checklist]\n- [ ] Las preguntas cubren BANT\n- [ ] El scoring es automatico y transparente\n- [ ] Los criterios de handoff son claros\n- [ ] El flujo es conversacional (no un formulario disfrazado)",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "presentacion_deck_inversores",
    "label_title": "Deck Inversores",
    "category": "presentacion",
    "type": "spec",
    "content": "[inputs]\n- STARTUP: {{STARTUP}} > Tu startup o proyecto\n- RONDA: {{RONDA}} > Tipo de ronda (seed, Series A, etc.)\n- METRICAS: {{METRICAS}} > Metricas de traction actuales\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear un pitch deck que convenza inversores. El deck no es un resumen del negocio — es una narrativa de oportunidad con evidencia.\n\n--- P | PEDIDO ---\n\nArquetipo: Startup Advisor con experiencia en pitch decks exitosos para rondas de inversion Serie A-C en LatAm y USA.\n\nPitch Deck para inversores:\n1. Problem: dolor real, cuantificado, no teorico\n2. Solution: tu solucion en 1 oracion\n3. Market: TAM/SAM/SOM con fuentes\n4. Product: demo o screenshots\n5. Traction: metricas de crecimiento\n6. Business model: como ganas dinero\n7. Team: por que ESTE equipo\n8. Ask: cuanto levantas y para que\n9. Max 12 slides\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Sequoia format: problem > solution > market > product > traction > team > ask\n- Show don't tell: graficos > texto\n- Traction is king: numeros hablan mas fuerte que promesas\n- 12 slides max: respeta el tiempo del inversor\n\n--- C | CRITERIO ---\n\nFormato: 12 slides con contenido + notas del speaker.\nTono: confiado, basado en datos.\nAudiencia: inversores.\nAccion: presentar en la proxima reunion.\n\n[checklist]\n- [ ] El problem es cuantificado (no anecdotico)\n- [ ] El market size tiene fuentes\n- [ ] La traction tiene numeros reales\n- [ ] El ask es claro (monto + uso)",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "comunicacion_escalacion_profesional",
    "label_title": "Escalacion Profesional",
    "category": "comunicacion",
    "type": "spec",
    "content": "[inputs]\n- PROBLEMA: {{PROBLEMA}} > Que necesitas escalar\n- DESTINATARIO: {{DESTINATARIO}} > A quien va dirigida la escalacion\n- IMPACTO: {{IMPACTO}} > Impacto si no se resuelve\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara escalar un problema de forma que genere accion sin generar friccion. La escalacion profesional preserva relaciones mientras resuelve bloqueos.\n\n--- P | PEDIDO ---\n\nArquetipo: Consultor de Comunicacion Organizacional con experiencia en escalaciones en entornos corporativos de alta presion.\n\nEmail de escalacion:\n1. Subject: [ESCALACION] + tema en 7 palabras\n2. TL;DR: que necesitas y para cuando (2 lineas)\n3. Contexto: que se intento y por que no funciono\n4. Impacto: que pasa si no se resuelve (cuantificado)\n5. Opciones: 2-3 alternativas para resolver\n6. Ask: decision o accion requerida del destinatario\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Facts > emotions: escalar con datos, no con frustracion\n- Options > complaints: siempre ofrecer soluciones\n- Impact quantification: el costo de no actuar\n- Respect the chain: escalar al nivel correcto, no saltar niveles\n\n--- C | CRITERIO ---\n\nFormato: email listo para enviar.\nTono: profesional, firme sin ser agresivo.\nAudiencia: decision-maker que puede desbloquear.\nAccion: enviar y obtener respuesta en 24h.\n\n[checklist]\n- [ ] El TL;DR cabe en 2 lineas\n- [ ] El impacto esta cuantificado\n- [ ] Ofrece opciones (no solo queja)\n- [ ] El tono preserva la relacion",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "comunicacion_feedback_positivo_refuerzo",
    "label_title": "Feedback Positivo Refuerzo",
    "category": "comunicacion",
    "type": "spec",
    "content": "[inputs]\n- PERSONA: {{PERSONA}} > Persona a reconocer\n- COMPORTAMIENTO: {{COMPORTAMIENTO}} > Que hizo bien (hechos observables)\n- IMPACTO: {{IMPACTO}} > Que impacto positivo tuvo\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara dar feedback positivo que refuerce comportamientos deseados con la misma estructura que el feedback constructivo. El reconocimiento estructurado es 3x mas efectivo que el generico.\n\n--- P | PEDIDO ---\n\nArquetipo: Coach de Desarrollo de Equipos con experiencia en positive reinforcement y cultura de reconocimiento en organizaciones de alto rendimiento.\n\nFeedback positivo SBI:\n1. Situacion: cuando/donde ocurrio\n2. Comportamiento: que hizo exactamente (observable)\n3. Impacto: que efecto positivo tuvo (cuantificado si es posible)\n4. Refuerzo: por que quieres que siga haciendolo\n5. Conexion: como conecta con los valores del equipo/organizacion\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- SBI (Situation-Behavior-Impact): igual que el constructivo\n- Specific > generic: 'buen trabajo' no sirve; 'la forma en que...' si\n- Timely: dar el feedback lo antes posible\n- Public when appropriate: el reconocimiento publico multiplica el efecto\n\n--- C | CRITERIO ---\n\nFormato: script de feedback listo para dar.\nTono: genuino, especifico.\nAudiencia: la persona que hizo algo bien.\nAccion: dar el feedback hoy.\n\n[checklist]\n- [ ] La situacion es especifica (no vaga)\n- [ ] El comportamiento es observable (no interpretacion)\n- [ ] El impacto esta cuantificado o es concreto\n- [ ] El refuerzo conecta con valores",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "decision_framework_rapido_5min",
    "label_title": "Framework Rapido 5min",
    "category": "decision",
    "type": "spec",
    "content": "[inputs]\n- DECISION: {{DECISION}} > Decision pendiente\n- CONTEXTO: {{CONTEXTO}} > Contexto relevante\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara tomar decisiones reversibles en 5 minutos sin paralisis de analisis. El 80% de las decisiones profesionales no necesitan mas de 5 minutos de analisis.\n\n--- P | PEDIDO ---\n\nArquetipo: Decision Coach con experiencia en frameworks de decision rapida para ejecutivos y emprendedores.\n\nDecision en 5 minutos:\n1. Reversible o irreversible? Si reversible: decide rapido.\n2. Que es lo peor que puede pasar? Es tolerable?\n3. Tengo el 70% de la informacion? Si: decide.\n4. Cual es el costo de NO decidir hoy?\n5. Decision + 1 razon + proxima accion\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Bezos Type 2: si es reversible, no pierdas tiempo\n- 70% rule: decide con 70% de info, el 100% nunca llega\n- Regret minimization: que decisión lamentaré más NO haber tomado?\n- Document: registrar la decision y su razonamiento\n\n--- C | CRITERIO ---\n\nFormato: decision en 1 linea + razonamiento + accion.\nTono: directo, sin rodeos.\nAudiencia: decision-maker paralizado.\nAccion: decidir AHORA.\n\n[checklist]\n- [ ] La decision esta clasificada (reversible/irreversible)\n- [ ] El peor escenario es tolerable\n- [ ] La decision tiene razonamiento documentado\n- [ ] La proxima accion es inmediata",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "decision_matriz_ponderada",
    "label_title": "Matriz Ponderada",
    "category": "decision",
    "type": "spec",
    "content": "[inputs]\n- OPCIONES: {{OPCIONES}} > Alternativas a comparar\n- CRITERIOS: {{CRITERIOS}} > Factores de evaluacion\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara tomar decisiones complejas con multiples criterios de forma objetiva y transparente. La matriz ponderada reemplaza intuicion con estructura.\n\n--- P | PEDIDO ---\n\nArquetipo: Analista de Decisiones con experiencia en MCDA (Multi-Criteria Decision Analysis) para inversiones y estrategia.\n\nMatriz de decision ponderada:\n1. Opciones: 3-5 alternativas a comparar\n2. Criterios: 5-8 factores de evaluacion\n3. Pesos: importancia relativa de cada criterio (total = 100%)\n4. Scoring: evaluar cada opcion por criterio (1-5)\n5. Score ponderado: score × peso por celda\n6. Ranking: total ponderado por opcion\n7. Sensitivity: que pasa si cambio los pesos\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- MCDA: Multi-Criteria Decision Analysis\n- Separate weighting from scoring: primero pesos, despues scores\n- Sensitivity analysis: la decision es robusta o depende de 1 peso?\n- Document: la transparencia de la decision es tan valiosa como la decision misma\n\n--- C | CRITERIO ---\n\nFormato: tabla de decision + sensitivity + recomendacion.\nTono: analitico.\nAudiencia: equipo de decision.\nAccion: tomar la decision basada en el ranking.\n\n[checklist]\n- [ ] Los criterios son relevantes y no redundantes\n- [ ] Los pesos suman 100%\n- [ ] El scoring es consistente entre opciones\n- [ ] El sensitivity analysis muestra robustez",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "liderazgo_conversacion_dificil",
    "label_title": "Conversacion Dificil",
    "category": "liderazgo",
    "type": "spec",
    "content": "[inputs]\n- SITUACION: {{SITUACION}} > Situacion que requiere la conversacion\n- PERSONA: {{PERSONA}} > Con quien es la conversacion\n- OBJETIVO: {{OBJETIVO}} > Que resultado quieres\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara preparar una conversacion dificil que preserve la relacion y logre el resultado. Las conversaciones que evitas son las que mas necesitas tener.\n\n--- P | PEDIDO ---\n\nArquetipo: Coach de Comunicacion Dificil con experiencia en Crucial Conversations y mediacion de conflictos en entornos corporativos.\n\nPreparacion para conversacion dificil:\n1. Objetivo: que quiero que pase como resultado\n2. Hechos: datos observables (no interpretaciones)\n3. Impacto: como me afecta a mi y al equipo\n4. Apertura: frase de inicio que no ponga a la defensiva\n5. Escucha: preguntas para entender su perspectiva\n6. Acuerdo: propuesta de camino a seguir\n7. Ensayo: practicar la apertura 3 veces\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Crucial Conversations: start with heart, learn to look, make it safe\n- Facts first: hechos observables, no juicios\n- And stance: mi perspectiva AND tu perspectiva (no or)\n- Desired outcome: empezar con el fin en mente\n\n--- C | CRITERIO ---\n\nFormato: guia de preparacion + script de apertura + preguntas de escucha.\nTono: firme, empatico.\nAudiencia: lider que enfrenta la conversacion.\nAccion: tener la conversacion esta semana.\n\n[checklist]\n- [ ] El objetivo esta claro antes de hablar\n- [ ] Los hechos son observables (no interpretaciones)\n- [ ] La apertura no pone a la defensiva\n- [ ] El camino a seguir es concreto",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "liderazgo_one_on_one_efectivo",
    "label_title": "One On One Efectivo",
    "category": "liderazgo",
    "type": "spec",
    "content": "[inputs]\n- EQUIPO: {{EQUIPO}} > Tamano y perfil de tu equipo\n- FRECUENCIA: {{FRECUENCIA}} > Frecuencia actual de 1:1s\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara conducir one-on-ones que desarrollen personas, no solo revisen tareas. El 1:1 es la herramienta de liderazgo mas poderosa y mas desperdiciada.\n\n--- P | PEDIDO ---\n\nArquetipo: Leadership Coach con experiencia en coaching de managers para empresas de tecnologia en hipercrecimiento.\n\nOne-on-One efectivo:\n1. Agenda del reportee: el 70% lo define el, no tu\n2. Check-in: como estas? (genuino, no protocolar)\n3. Progreso: que has logrado? que te bloquea?\n4. Desarrollo: que estas aprendiendo? que necesitas?\n5. Feedback bidireccional: que puedo hacer mejor como lider?\n6. Cierre: 1 accion concreta cada uno\n7. Frecuencia: semanal 30 min > mensual 2 horas\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Their agenda: el 1:1 es PARA ellos, no para ti\n- Ask > tell: preguntar mas que instruir\n- Career conversations: hablar de desarrollo, no solo de tareas\n- Follow through: lo que se compromete se cumple\n\n--- C | CRITERIO ---\n\nFormato: template de 1:1 + preguntas + cadencia.\nTono: humano, coaching.\nAudiencia: manager que lidera personas.\nAccion: reprogramar el proximo 1:1 con este formato.\n\n[checklist]\n- [ ] La agenda es 70% del reportee\n- [ ] Hay espacio para feedback bidireccional\n- [ ] Hay conversacion de desarrollo (no solo tareas)\n- [ ] Cada 1:1 cierra con 1 accion por persona",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "aprendizaje_feynman_explicar",
    "label_title": "Feynman Explicar",
    "category": "aprendizaje",
    "type": "spec",
    "content": "[inputs]\n- CONCEPTO: {{CONCEPTO}} > Concepto a dominar\n- NIVEL_ACTUAL: {{NIVEL_ACTUAL}} > Tu nivel actual de comprension\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara dominar un concepto explicandolo con simplicidad. Si no puedes explicarlo simple, no lo entiendes. La Tecnica Feynman convierte confusion en dominio.\n\n--- P | PEDIDO ---\n\nArquetipo: Educador y Simplificador de Conocimiento con la filosofia de Richard Feynman: la complejidad es falta de comprension.\n\nTecnica Feynman:\n1. Explica el concepto como si fuera para alguien de 12 anos\n2. Identifica donde la explicacion falla (gap de comprension)\n3. Vuelve a la fuente para llenar el gap\n4. Crea una analogia que ancle el entendimiento\n5. Entrega 3 niveles: simple (12 anos), intermedio (colega), profundo (experto)\n6. Mapa de conceptos relacionados\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Feynman Technique: explain > identify gaps > relearn > simplify\n- Analogy is king: anclar lo abstracto en lo concreto\n- If you can't explain it simply: you don't understand it\n- 3 levels: asegura que puedes adaptar a cualquier audiencia\n\n--- C | CRITERIO ---\n\nFormato: explicacion en 3 niveles + analogias + mapa de conceptos.\nTono: pedagogico, claro.\nAudiencia: tu mismo (para aprender) o tu audiencia (para ensenar).\nAccion: explicar el concepto a alguien hoy.\n\n[checklist]\n- [ ] La explicacion simple funciona para alguien de 12 anos\n- [ ] Los gaps de comprension estan identificados\n- [ ] Las analogias son memorables y precisas\n- [ ] Los 3 niveles cubren simple a profundo",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "aprendizaje_plan_90_dias_competencia",
    "label_title": "Plan 90 Dias Competencia",
    "category": "aprendizaje",
    "type": "spec",
    "content": "[inputs]\n- COMPETENCIA: {{COMPETENCIA}} > Skill a desarrollar\n- NIVEL_ACTUAL: {{NIVEL_ACTUAL}} > Tu nivel actual\n- HORAS_SEMANALES: {{HORAS_SEMANALES}} > Horas semanales disponibles\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara adquirir una nueva competencia profesional en 90 dias con plan estructurado. 90 dias es el tiempo minimo para pasar de novato a operativo.\n\n--- P | PEDIDO ---\n\nArquetipo: Learning Designer con experiencia en diseno de programas de upskilling acelerado para profesionales.\n\nPlan de 90 dias:\n1. Competencia target y nivel objetivo (novato > operativo)\n2. Recursos curados: top 3 libros, top 5 cursos, top 3 practicantes a seguir\n3. Progresion semanal con milestones verificables\n4. Proyectos practicos: min 3 proyectos reales (no ejercicios)\n5. Accountability: como medir progreso\n6. Ajuste: review quincenal para recalibrar\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Project-based learning: aprender haciendo, no leyendo\n- 70-20-10: 70% practica, 20% mentores, 10% teoria\n- Public learning: compartir lo que aprendes acelera la retencion\n- Milestone-driven: si no puedes demostrar progreso, recalibrar\n\n--- C | CRITERIO ---\n\nFormato: plan de 12 semanas + recursos + proyectos.\nTono: motivador-estructurado.\nAudiencia: profesional que quiere upskill.\nAccion: empezar semana 1 hoy.\n\n[checklist]\n- [ ] Los recursos estan curados (no un dump de links)\n- [ ] Los milestones son verificables\n- [ ] Los proyectos son reales (no toy problems)\n- [ ] El review quincenal esta calendarizado",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "negociacion_preparar_conversacion",
    "label_title": "Preparar Conversacion",
    "category": "negociacion",
    "type": "spec",
    "content": "[inputs]\n- CONTEXTO: {{CONTEXTO}} > Contexto de la negociacion\n- OBJETIVO: {{OBJETIVO}} > Tu objetivo ideal\n- CONTRAPARTE: {{CONTRAPARTE}} > Perfil de la contraparte\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara llegar preparado a cualquier negociacion con BATNA, ZOPA e intereses claros. La negociacion se gana en la preparacion, no en la mesa.\n\n--- P | PEDIDO ---\n\nArquetipo: Negociador Senior con formacion en Harvard Negotiation Project (Getting to Yes) y experiencia en negociaciones de alto impacto.\n\nPreparacion de negociacion:\n1. Mis intereses: que necesito realmente (no solo mi posicion)\n2. Sus intereses: que necesita la contraparte\n3. BATNA: mi mejor alternativa si no hay acuerdo\n4. ZOPA: zona de posible acuerdo entre ambos\n5. Concesiones: 3-5 cosas de bajo costo para mi, alto valor para ellos\n6. Apertura: estrategia de anclaje y primera oferta\n7. Respuestas a 5 tacticas comunes\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Harvard Principled Negotiation: interests > positions\n- BATNA: tu poder en la negociacion = tu alternativa\n- ZOPA: si no existe, no hay deal posible\n- Value creation: expand the pie before dividing it\n\n--- C | CRITERIO ---\n\nFormato: brief de negociacion + analisis BATNA/ZOPA + estrategia.\nTono: estrategico.\nAudiencia: quien va a negociar.\nAccion: ir preparado a la proxima reunion.\n\n[checklist]\n- [ ] Los intereses de ambas partes estan identificados\n- [ ] El BATNA esta calculado\n- [ ] Las concesiones son de bajo costo/alto valor\n- [ ] Las respuestas a tacticas estan ensayadas",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "creatividad_scamper_innovar",
    "label_title": "Scamper Innovar",
    "category": "creatividad",
    "type": "spec",
    "content": "[inputs]\n- OBJETO: {{OBJETO}} > Producto, servicio o proceso a innovar\n- RESTRICCIONES: {{RESTRICCIONES}} > (opcional) Restricciones conocidas\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara generar innovacion sistematica sobre un producto, servicio o proceso usando SCAMPER. La creatividad con estructura produce mas ideas que la inspiracion sola.\n\n--- P | PEDIDO ---\n\nArquetipo: Facilitador de Innovacion con certificacion en Design Thinking y experiencia en talleres de ideacion para equipos de producto.\n\nSCAMPER aplicado:\n1. Sustituir: que puedo reemplazar?\n2. Combinar: que puedo juntar?\n3. Adaptar: que puedo copiar de otro dominio?\n4. Modificar/Magnificar: que puedo exagerar o cambiar?\n5. Poner otro uso: para que mas podria servir?\n6. Eliminar: que puedo quitar?\n7. Reorganizar/Revertir: que pasa si invierto el orden?\n8. Top 5 ideas priorizadas\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- SCAMPER: 7 tecnicas de innovacion sistematica\n- 3+ ideas por tecnica: forzar cantidad antes de calidad\n- Cross-pollination: las mejores ideas vienen de combinar tecnicas\n- Feasibility filter: de 21+ ideas, seleccionar top 5 por viabilidad × impacto\n\n--- C | CRITERIO ---\n\nFormato: 21+ ideas organizadas por tecnica + top 5 priorizadas.\nTono: creativo-estructurado.\nAudiencia: innovador o equipo de producto.\nAccion: prototipar la idea #1.\n\n[checklist]\n- [ ] Min. 3 ideas por tecnica SCAMPER\n- [ ] Las ideas son genuinamente diferentes entre si\n- [ ] El top 5 tiene evaluacion de viabilidad\n- [ ] Al menos 1 idea es no-obvia",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "bienestar_protocolo_anti_burnout",
    "label_title": "Protocolo Anti Burnout",
    "category": "bienestar",
    "type": "spec",
    "content": "[inputs]\n- ROL: {{ROL}} > Tu rol profesional\n- DRAINS: {{DRAINS}} > Las 3 cosas que mas te drenan\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar un protocolo personal que prevenga el burnout antes de que ocurra. El burnout no es un evento — es una acumulacion que se puede detectar y prevenir.\n\n--- P | PEDIDO ---\n\nArquetipo: Coach de Bienestar Ejecutivo con especializacion en prevencion de burnout y gestion de energia para profesionales de alto rendimiento.\n\nProtocolo anti-burnout:\n1. Early warning indicators: 5 senales personales de que te acercas al burnout\n2. Energy drains: las 3 actividades que mas te drenan\n3. Energy sources: las 3 actividades que mas te recargan\n4. Boundaries: limites no negociables (hora de cierre, dias off, etc.)\n5. Recovery protocol: que hacer cuando detectas las senales\n6. Check-in semanal: 3 preguntas de auto-diagnostico (2 min)\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Prevention > recovery: detectar antes de que sea tarde\n- Personal indicators: cada persona tiene senales diferentes\n- Energy management > time management\n- Non-negotiable boundaries: proteger antes de necesitar\n\n--- C | CRITERIO ---\n\nFormato: protocolo personal + check-in semanal + recovery plan.\nTono: sereno, compasivo.\nAudiencia: profesional de alto rendimiento.\nAccion: hacer el primer check-in hoy.\n\n[checklist]\n- [ ] Los early warning indicators son personales (no genericos)\n- [ ] Los boundaries son especificos y no negociables\n- [ ] El recovery protocol es ejecutable en 24h\n- [ ] El check-in semanal cabe en 2 minutos",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "estrategia_vision_3_horizontes",
    "label_title": "Vision 3 Horizontes",
    "category": "estrategia",
    "type": "spec",
    "content": "[inputs]\n- CONTEXTO: {{CONTEXTO}} > Tu organizacion o carrera\n- HORIZONTE: {{HORIZONTE}} > Horizonte temporal a planificar\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara definir tu estrategia personal o de negocio en 3 horizontes temporales: mantener, crecer, explorar. El futuro no se predice, se disena.\n\n--- P | PEDIDO ---\n\nArquetipo: Estratega de Innovacion con experiencia en Three Horizons Framework de McKinsey para empresas en transformacion.\n\n3 Horizontes:\n1. H1 — Mantener (0-12 meses): que funciona y hay que proteger\n2. H2 — Crecer (1-3 anos): que oportunidades explorar para escalar\n3. H3 — Explorar (3-5 anos): que apuestas disruptivas hacer\n4. Resource allocation: % de tiempo/dinero por horizonte (recomendado: 70-20-10)\n5. Metricas por horizonte: como medir progreso en cada uno\n6. Decision: que iniciar, que escalar, que matar\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- McKinsey Three Horizons: manage, grow, explore\n- 70-20-10: la mayoria del recurso en H1, la apuesta en H3\n- H3 kills H1: las disrupciones futuras reemplazan el core actual\n- Portfolio thinking: no todo tiene que funcionar, pero hay que apostar\n\n--- C | CRITERIO ---\n\nFormato: mapa de 3 horizontes + resource allocation + metricas.\nTono: estrategico, visionario.\nAudiencia: lider de estrategia o profesional planificando su carrera.\nAccion: definir 1 apuesta por horizonte.\n\n[checklist]\n- [ ] Los 3 horizontes tienen contenido concreto\n- [ ] El resource allocation esta definido\n- [ ] Las metricas son diferentes por horizonte\n- [ ] Hay al menos 1 apuesta disruptiva en H3",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "estrategia_okr_personal_trimestral",
    "label_title": "Okr Personal Trimestral",
    "category": "estrategia",
    "type": "spec",
    "content": "[inputs]\n- VISION: {{VISION}} > Tu vision a 1 ano\n- TRIMESTRE: {{TRIMESTRE}} > Trimestre a planificar\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara definir OKRs personales que conecten tu dia a dia con tus objetivos de largo plazo. Sin OKRs, trabajas duro sin saber si avanzas.\n\n--- P | PEDIDO ---\n\nArquetipo: OKR Coach con experiencia en implementacion de OKRs a nivel individual y de equipo para startups y corporaciones.\n\nOKR Personal Trimestral:\n1. Vision: donde quiero estar en 1 ano\n2. Objetivos (max 3): cualitativos, inspiradores, ambiciosos\n3. Key Results (2-3 por objetivo): cuantitativos, medibles, verificables\n4. Iniciativas: acciones concretas para mover cada KR\n5. Weekly check: como medir progreso semanal\n6. Scoring: como evaluar al final del trimestre (0.0-1.0)\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Objective = inspiracional: que quiero lograr\n- Key Result = medible: como se que lo logre\n- 70% achievement = sweet spot: si logras 100%, eran poco ambiciosos\n- Alignment: mis OKRs conectan con la vision de largo plazo\n\n--- C | CRITERIO ---\n\nFormato: OKRs formateados + weekly check + scoring guide.\nTono: motivador-estructurado.\nAudiencia: profesional que quiere direccion.\nAccion: definir los OKRs de este trimestre.\n\n[checklist]\n- [ ] Max 3 objetivos\n- [ ] Cada KR es numerico y verificable\n- [ ] Las iniciativas son accionables (no vagas)\n- [ ] El weekly check cabe en 5 minutos",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "meta_reverse_engineer_conversacion",
    "label_title": "Reverse Engineer Conversacion",
    "category": "meta",
    "type": "spec",
    "content": "[inputs]\n- SESION: {{SESION}} > Describe la sesion a reverse-engineer o pega el historial\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara hacer ingenieria inversa de una conversacion con IA y extraer un SPEC reutilizable. El proceso de hoy construye el atajo de manana.\n\n--- P | PEDIDO ---\n\nArquetipo: Meta-Prompt Engineer con experiencia en extraccion de patrones de conversaciones para crear prompts reutilizables.\n\nIngenieria inversa:\n1. Analizar historial completo de la sesion\n2. Identificar: objetivo real, inputs clave, decisiones, formato final\n3. Extraer el patron: que tipo de tarea fue, que metodo funciono\n4. Generar PROMPT A (Priming, max 200 palabras): contexto + rol + restricciones\n5. Generar PROMPT B (SPEC completo): [inputs] / [prompt] S-P-E-C / [checklist]\n6. Formatear ambos para copiar a text expander\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Pattern extraction: encontrar la estructura reutilizable\n- Generalize: convertir el caso especifico en template parametrico\n- Test: el SPEC generado debe producir resultados comparables\n- Iterate: mejorar el SPEC con cada uso\n\n--- C | CRITERIO ---\n\nFormato: 2 prompts listos para text expander.\nTono: tecnico.\nAudiencia: tu yo futuro que necesitara hacer lo mismo.\nAccion: guardar ambos prompts en tu text expander.\n\n[checklist]\n- [ ] El SPEC captura el patron (no el caso especifico)\n- [ ] Los parametros permiten reusar en diferentes contextos\n- [ ] El priming cabe en 200 palabras\n- [ ] El SPEC tiene las 4 secciones completas",
    "paramCount": 2,
    "keywords": []
  },
  {
    "id": "meta_auditar_mis_prompts",
    "label_title": "Auditar Mis Prompts",
    "category": "meta",
    "type": "spec",
    "content": "[inputs]\n- PROMPTS: {{PROMPTS}} > Pega tus 10 prompts mas usados o describe lo que haces con IA\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara evaluar la calidad de tus propios prompts y mejorarlos sistematicamente. La mayoria de prompts que escribes estan al 40% de su potencial.\n\n--- P | PEDIDO ---\n\nArquetipo: Prompt Quality Auditor con experiencia en evaluacion y mejora sistematica de bibliotecas de prompts empresariales.\n\nAuditoria de prompts:\n1. Seleccionar 10 prompts que mas usas\n2. Evaluar cada uno contra la rubrica SPEC:\n   - Tiene Situacion clara? (contexto prospectivo)\n   - Tiene Pedido especifico? (arquetipo + entregable)\n   - Tiene Ejecucion definida? (metodo + protocolo)\n   - Tiene Criterio medible? (formato + exito)\n3. Score 1-10 por dimension\n4. Top 3 prompts a mejorar (mayor gap vs potencial)\n5. Versiones mejoradas de cada uno\n6. Before/after comparison\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- SPEC rubric: S + P + E + C como dimensiones de calidad\n- 80/20: mejorar el 20% de prompts que usas el 80% del tiempo\n- Before/after: la mejora debe ser medible\n- Test: ejecutar ambas versiones y comparar output\n\n--- C | CRITERIO ---\n\nFormato: auditoria de 10 prompts + 3 versiones mejoradas.\nTono: analitico, constructivo.\nAudiencia: tu mismo.\nAccion: reemplazar los 3 prompts mejorados en tu text expander.\n\n[checklist]\n- [ ] Los 10 prompts mas usados estan evaluados\n- [ ] El score por dimension es honesto\n- [ ] Los 3 mejorados son significativamente mejores\n- [ ] El before/after es evidente",
    "paramCount": 2,
    "keywords": []
  },
  {
    "id": "meta_crear_system_prompt_agente",
    "label_title": "Crear System Prompt Agente",
    "category": "meta",
    "type": "spec",
    "content": "[inputs]\n- AGENTE: {{AGENTE}} > Nombre y funcion del agente\n- AUDIENCIA: {{AUDIENCIA}} > Quien usara el agente\n- AUTONOMIA: {{AUTONOMIA}} > Nivel de autonomia (semi, alto, total)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear un system prompt robusto para un agente de IA que opera con autonomia. El system prompt es la constitucion del agente — define quien es, que puede y que jamas debe hacer.\n\n--- P | PEDIDO ---\n\nArquetipo: AI Agent Architect con experiencia en diseno de agentes autonomos con guardrails para operaciones empresariales.\n\nSystem Prompt de Agente:\n1. Identity: nombre, rol, personalidad, tono\n2. Capabilities: que puede hacer (scope positivo)\n3. Boundaries: que jamas debe hacer (scope negativo)\n4. Knowledge: de donde obtiene informacion\n5. Interaction protocol: como interactua con el usuario\n6. Output format: formato default de respuestas\n7. Guardrails: reglas de seguridad y etica\n8. Escalation: cuando pasar a un humano\n9. 5 few-shot examples\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Constitution first: boundaries antes que capabilities\n- Personality calibration: el tono afecta la percepcion de competencia\n- Few-shot > instruction: mostrar el comportamiento deseado\n- Adversarial testing: intentar romper el agente antes de publicar\n\n--- C | CRITERIO ---\n\nFormato: system prompt completo listo para copiar.\nTono: tecnico.\nAudiencia: developer o prompt engineer.\nAccion: implementar el agente.\n\n[checklist]\n- [ ] Las boundaries son explicitas y no negociables\n- [ ] Los guardrails cubren safety y ethics\n- [ ] Los 5 examples son representativos del uso real\n- [ ] La escalacion a humano esta definida",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "meta_taxonomia_prompts_organizar",
    "label_title": "Taxonomia Prompts Organizar",
    "category": "meta",
    "type": "spec",
    "content": "[inputs]\n- BIBLIOTECA: {{BIBLIOTECA}} > Descripcion de la biblioteca a organizar\n- TAMANO: {{TAMANO}} > Numero aproximado de prompts\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear una taxonomia que organice cualquier biblioteca de prompts de forma navegable y escalable.\n\n--- P | PEDIDO ---\n\nArquetipo: Information Architect con experiencia en taxonomias de contenido y sistemas de clasificacion para bibliotecas digitales.\n\nTaxonomia de prompts:\n1. Categorias principales: max 10 (agrupacion por dominio)\n2. Sub-categorias: max 5 por categoria\n3. Tags transversales: dificultad, tipo de output, modelo recomendado\n4. Naming convention: formato consistente para claves\n5. Metadata por prompt: categoria, tags, params count, estimated tokens\n6. Navigation: como un usuario encuentra el prompt que necesita\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- MECE categories: mutuamente excluyentes, colectivamente exhaustivas\n- Flat > deep: max 2 niveles de profundidad\n- User-centric: organizar por lo que el usuario busca, no por como se creo\n- Scalable: la taxonomia debe funcionar con 100 y con 1000 prompts\n\n--- C | CRITERIO ---\n\nFormato: taxonomia completa + naming convention + navigation guide.\nTono: sistematico.\nAudiencia: curador de la biblioteca.\nAccion: aplicar la taxonomia a la biblioteca existente.\n\n[checklist]\n- [ ] Las categorias son MECE\n- [ ] Max 2 niveles de profundidad\n- [ ] La naming convention es consistente\n- [ ] La navegacion es intuitiva para un usuario nuevo",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "investigacion_analisis_bibliometrico",
    "label_title": "Analisis Bibliometrico",
    "category": "investigacion",
    "type": "spec",
    "content": "[inputs]\n- CAMPO: {{CAMPO}} > Campo o tema de investigacion\n- PERIODO: {{PERIODO}} > Periodo de analisis (ultimos 5, 10, 20 anos)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara mapear el panorama academico de un campo: quienes investigan, que publican, donde se concentra la produccion, y cuales son las fronteras del conocimiento.\n\n--- P | PEDIDO ---\n\nArquetipo: Bibliometrista con experiencia en analisis de produccion cientifica, redes de citacion y mapeo de fronteras de conocimiento.\n\nAnalisis bibliometrico:\n1. Definir campo y periodo de analisis\n2. Volumen de publicaciones por ano (tendencia)\n3. Top autores y sus redes de colaboracion\n4. Top journals y conferencias\n5. Keyword co-occurrence: temas emergentes\n6. Citation analysis: papers mas influyentes\n7. Research gaps: que NO se esta investigando\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Bibliometrics: cuantificar la produccion cientifica\n- Co-citation analysis: papers que se citan juntos = relacion tematica\n- Keyword emergence: temas cuya frecuencia crece aceleradamente\n- White spaces: donde hay poca publicacion = oportunidad\n\n--- C | CRITERIO ---\n\nFormato: panorama bibliometrico con graficos + top papers + gaps.\nTono: academico-estrategico.\nAudiencia: investigador o decision-maker que necesita state-of-the-art.\nAccion: usar como base para tu investigacion.\n\n[checklist]\n- [ ] El volumen temporal muestra tendencia\n- [ ] Los top autores y journals estan identificados\n- [ ] Los temas emergentes estan senalados\n- [ ] Los research gaps son oportunidades concretas",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "escritura_manual_procedimientos",
    "label_title": "Manual Procedimientos",
    "category": "escritura",
    "type": "spec",
    "content": "[inputs]\n- PROCEDIMIENTO: {{PROCEDIMIENTO}} > Procedimiento a documentar\n- AUDIENCIA: {{AUDIENCIA}} > Quien ejecutara este procedimiento\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara documentar un procedimiento operativo de forma que cualquier persona pueda seguirlo sin ambiguedad. El mejor manual es el que no necesita explicacion adicional.\n\n--- P | PEDIDO ---\n\nArquetipo: Technical Writer Senior con experiencia en documentacion de procesos para ISO 9001 y equipos de operaciones.\n\nManual de procedimientos:\n1. Titulo y version\n2. Proposito: por que existe este procedimiento\n3. Alcance: cuando aplica y cuando NO\n4. Prerequisitos: que necesitas antes de empezar\n5. Pasos: numerados, con 1 accion por paso\n6. Decision points: si X, ir a paso Y; si no, ir a paso Z\n7. Screenshots o diagramas donde aplique\n8. Troubleshooting: 5 problemas comunes y solucion\n9. Responsable de actualizacion\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- 1 action per step: nunca 2 acciones en 1 paso\n- Show don't tell: screenshots > descripciones largas\n- Test with novice: alguien sin experiencia debe poder seguirlo\n- Version control: cada cambio tiene fecha y responsable\n\n--- C | CRITERIO ---\n\nFormato: manual listo para publicar internamente.\nTono: claro, sin ambiguedad.\nAudiencia: cualquier persona que deba ejecutar este procedimiento.\nAccion: publicar y testear con alguien nuevo.\n\n[checklist]\n- [ ] Cada paso tiene 1 sola accion\n- [ ] Los decision points estan claros\n- [ ] El troubleshooting cubre los 5 problemas mas comunes\n- [ ] Un novato puede seguirlo sin ayuda",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "data_pivot_table_analisis",
    "label_title": "Pivot Table Analisis",
    "category": "data",
    "type": "spec",
    "content": "[inputs]\n- PREGUNTA: {{PREGUNTA}} > Pregunta de negocio\n- DATOS: {{DATOS}} > Columnas y tipo de datos disponibles\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar y ejecutar analisis con tablas pivote que revelen patrones ocultos en los datos. La pivot table es el microscopio del analista.\n\n--- P | PEDIDO ---\n\nArquetipo: Data Analyst con experiencia en Excel avanzado y pivot table analysis para reporting financiero y operacional.\n\nPivot Table Analysis:\n1. Pregunta de negocio a responder\n2. Dataset: que columnas, que filas, que tipo de datos\n3. Configuracion: filas, columnas, valores, filtros\n4. Agregaciones: suma, promedio, conteo, % del total\n5. Top insights: que patrones revela la pivot\n6. Drill-down: donde profundizar basado en los hallazgos\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Question-first: la pregunta define la configuracion, no al reves\n- Start simple: 2 dimensiones, 1 metrica. Luego agregar complejidad\n- Compare: meses, regiones, productos lado a lado\n- So-what: cada patron con implicacion de negocio\n\n--- C | CRITERIO ---\n\nFormato: configuracion de pivot + insights + drill-down recommendations.\nTono: analitico.\nAudiencia: analista o decision-maker.\nAccion: crear la pivot y extraer insights.\n\n[checklist]\n- [ ] La configuracion responde la pregunta de negocio\n- [ ] Los insights son accionables\n- [ ] El drill-down identifica donde profundizar\n- [ ] La pivot es reproducible con los datos disponibles",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "data_anomaly_detection_manual",
    "label_title": "Anomaly Detection Manual",
    "category": "data",
    "type": "spec",
    "content": "[inputs]\n- DATASET: {{DATASET}} > Descripcion del dataset\n- VARIABLES: {{VARIABLES}} > Variables a analizar\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara identificar anomalias y outliers en un dataset sin herramientas complejas. Los outliers son o errores (limpiar) o insights (investigar).\n\n--- P | PEDIDO ---\n\nArquetipo: Estadistica Aplicada con experiencia en deteccion de anomalias para fraude, calidad de datos y analisis operacional.\n\nDeteccion de anomalias:\n1. Definir que es 'normal' para cada variable (baseline)\n2. Metodos de deteccion: Z-score, IQR, visual (boxplot descrito)\n3. Clasificar anomalias: error de datos / evento real / fraude potencial\n4. Para cada anomalia: investigar causa\n5. Decision: limpiar, conservar, o escalar\n6. Automated alerts: criterios para deteccion futura\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Statistical: Z-score > 3 o IQR × 1.5\n- Visual: boxplot para identificar, scatter para contextualizar\n- Domain knowledge: lo estadisticamente anomalo puede ser normal en el dominio\n- Classification: error vs insight vs investigar\n\n--- C | CRITERIO ---\n\nFormato: lista de anomalias + clasificacion + acciones.\nTono: analitico.\nAudiencia: analista de datos.\nAccion: investigar las anomalias tipo 'evento real'.\n\n[checklist]\n- [ ] El baseline de normalidad esta definido\n- [ ] Las anomalias estan clasificadas por tipo\n- [ ] Cada anomalia tiene causa investigada\n- [ ] Los criterios de alerta automatica estan definidos",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "data_storytelling_presentation",
    "label_title": "Storytelling Presentation",
    "category": "data",
    "type": "spec",
    "content": "[inputs]\n- DATOS: {{DATOS}} > Datos o hallazgos a presentar\n- AUDIENCIA: {{AUDIENCIA}} > Quien ve la presentacion\n- DECISION: {{DECISION}} > Que decision debe tomarse\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara construir una presentacion donde los datos cuentan una historia que persuade y mueve a la accion. Los datos sin narrativa son ignorados.\n\n--- P | PEDIDO ---\n\nArquetipo: Data Storytelling Expert con experiencia en presentaciones basadas en datos para C-levels y boards.\n\nData Storytelling Presentation:\n1. Insight principal: la conclusion en 1 oracion\n2. Arco narrativo: contexto > descubrimiento > implicacion > accion\n3. Cifras protagonistas: 3-5 numeros que soportan la historia\n4. Visualizaciones: 1 grafico por insight (tipo optimo por dato)\n5. Comparaciones: benchmark, antes/despues, proyeccion\n6. Call to action: que decision tomar basada en los datos\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Start with insight, not with data\n- 1 chart per insight: cada grafico cuenta 1 cosa\n- Annotate: el grafico sin anotacion es ambiguo\n- So-what: cada slide responde 'y esto que significa para nosotros?'\n\n--- C | CRITERIO ---\n\nFormato: outline de presentacion con visualizaciones + notas.\nTono: persuasivo, basado en evidencia.\nAudiencia: {{AUDIENCIA}}.\nAccion: tomar la decision que los datos soportan.\n\n[checklist]\n- [ ] El insight principal cabe en 1 oracion\n- [ ] Cada visualizacion tiene anotaciones\n- [ ] Las comparaciones dan contexto a los numeros\n- [ ] El CTA es claro y fundamentado",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "data_sql_basico_consulta",
    "label_title": "Sql Basico Consulta",
    "category": "data",
    "type": "spec",
    "content": "[inputs]\n- PREGUNTA: {{PREGUNTA}} > Que quieres saber de los datos\n- TABLAS: {{TABLAS}} > Tablas y columnas disponibles\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara construir queries SQL basicas que extraigan la informacion que necesitas sin depender de un data analyst. SQL basico es la alfabetizacion de datos.\n\n--- P | PEDIDO ---\n\nArquetipo: Data Analyst con experiencia en SQL didactico para profesionales no-tecnicos que necesitan acceso a datos.\n\nSQL Query basica:\n1. Pregunta en lenguaje natural: que quiero saber\n2. Tablas involucradas y sus columnas relevantes\n3. Query paso a paso:\n   - SELECT: que columnas quiero ver\n   - FROM: de que tabla\n   - WHERE: que filtros aplico\n   - GROUP BY: como agrupo\n   - ORDER BY: como ordeno\n   - LIMIT: cuantos registros\n4. Explicacion linea por linea\n5. Variantes para preguntas relacionadas\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Natural language > SQL: primero la pregunta, despues la query\n- Build incrementally: SELECT primero, luego WHERE, luego GROUP BY\n- Verify: query de conteo para validar que los filtros son correctos\n- Comment: cada seccion con comentario explicativo\n\n--- C | CRITERIO ---\n\nFormato: query SQL + explicacion + variantes.\nTono: pedagogico.\nAudiencia: profesional no-tecnico.\nAccion: ejecutar la query.\n\n[checklist]\n- [ ] La query responde la pregunta de negocio\n- [ ] Cada linea tiene explicacion\n- [ ] Las variantes cubren preguntas relacionadas\n- [ ] La query de verificacion esta incluida",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "agentes_prompt_testing_framework",
    "label_title": "Prompt Testing Framework",
    "category": "agentes",
    "type": "spec",
    "content": "[inputs]\n- PROMPT: {{PROMPT}} > Prompt a testear\n- SCOPE: {{SCOPE}} > Que deberia producir el prompt\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara testear prompts de forma sistematica antes de publicarlos. Un prompt sin testing es como codigo sin tests — funciona hasta que no.\n\n--- P | PEDIDO ---\n\nArquetipo: QA Engineer de Prompts con experiencia en testing sistematico de LLMs y evaluacion de consistencia de outputs.\n\nFramework de testing:\n1. Test cases: 10 inputs variados (tipicos + edge cases)\n2. Expected outputs: que deberia producir cada input\n3. Evaluation criteria: precision, formato, tono, completitud\n4. Run tests: ejecutar 3 veces cada test case\n5. Consistency score: varianza entre ejecuciones\n6. Pass/fail report + mejoras recomendadas\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Input variety: easy, medium, hard, edge, adversarial\n- 3x execution: cada test 3 veces para medir consistencia\n- Rubric scoring: no 'se ve bien', sino criterios medibles\n- Regression: re-testear despues de cada cambio\n\n--- C | CRITERIO ---\n\nFormato: test suite + resultados + recomendaciones.\nTono: tecnico.\nAudiencia: prompt author.\nAccion: ejecutar la test suite.\n\n[checklist]\n- [ ] 10+ test cases cubren el rango de uso\n- [ ] La consistencia esta medida (3x por test)\n- [ ] El pass/fail es basado en rubrica\n- [ ] Las mejoras son accionables",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "agentes_migrar_gpt_a_gem",
    "label_title": "Migrar Gpt A Gem",
    "category": "agentes",
    "type": "spec",
    "content": "[inputs]\n- AGENTE_ORIGINAL: {{AGENTE_ORIGINAL}} > Agente a migrar (link o instrucciones)\n- PLATAFORMA_DESTINO: {{PLATAFORMA_DESTINO}} > Plataforma destino (Gemini, Claude, etc.)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara migrar un Custom GPT a Gemini Gem (o viceversa) manteniendo funcionalidad y personalidad.\n\n--- P | PEDIDO ---\n\nArquetipo: Cross-Platform AI Architect con experiencia en portabilidad de agentes entre ChatGPT, Gemini, Claude y otras plataformas.\n\nMigracion de agente:\n1. Extraer: scope, personalidad, reglas, formato del agente original\n2. Mapear: equivalencias entre plataformas (instructions vs system prompt)\n3. Adaptar: ajustar syntax y capacidades a la plataforma destino\n4. Knowledge: migrar o recrear la knowledge base\n5. Test: ejecutar los mismos 10 queries en ambas plataformas\n6. Compare: scoring de calidad original vs migrado\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Feature mapping: que puede la plataforma destino que la original no\n- Personality preservation: el tono debe ser identico\n- Knowledge portability: no todo migra automaticamente\n- Parity testing: mismos inputs, comparar outputs\n\n--- C | CRITERIO ---\n\nFormato: guia de migracion + mapeo de equivalencias + test results.\nTono: tecnico.\nAudiencia: creador del agente.\nAccion: migrar y testear.\n\n[checklist]\n- [ ] El mapeo de equivalencias es completo\n- [ ] La personalidad se preserva\n- [ ] Los 10 queries producen resultados comparables\n- [ ] Las diferencias estan documentadas",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "agentes_monitorear_rendimiento",
    "label_title": "Monitorear Rendimiento",
    "category": "agentes",
    "type": "spec",
    "content": "[inputs]\n- AGENTE: {{AGENTE}} > Agente a monitorear\n- METRICAS: {{METRICAS}} > (opcional) Metricas actuales disponibles\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara monitorear el rendimiento de tus agentes IA en produccion. Sin monitoreo, no sabes si tu agente esta ayudando o confundiendo.\n\n--- P | PEDIDO ---\n\nArquetipo: AI Operations Analyst con experiencia en monitoreo de chatbots y agentes en produccion para empresas de servicio.\n\nMonitoreo de agente:\n1. Metricas: uso (queries/dia), satisfaccion, precision, fallbacks\n2. Dashboard: que monitorear diario vs semanal vs mensual\n3. Alertas: triggers de degradacion de calidad\n4. Feedback loop: como capturar feedback del usuario\n5. Improvement cycle: cada cuanto revisar y mejorar\n6. Retirement criteria: cuando descontinuar un agente\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Usage analytics: quien usa, cuanto, para que\n- Quality sampling: revisar 10% de interacciones semanalmente\n- User feedback: pulgar arriba/abajo como minimo\n- Continuous improvement: sprint mensual de mejoras\n\n--- C | CRITERIO ---\n\nFormato: dashboard de monitoreo + alertas + improvement plan.\nTono: operativo.\nAudiencia: owner del agente.\nAccion: configurar el dashboard.\n\n[checklist]\n- [ ] Las metricas cubren uso Y calidad\n- [ ] Las alertas tienen thresholds\n- [ ] El feedback loop esta disenado\n- [ ] El improvement cycle esta calendarizado",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "agentes_documentar_asistente",
    "label_title": "Documentar Asistente",
    "category": "agentes",
    "type": "spec",
    "content": "[inputs]\n- AGENTE: {{AGENTE}} > Agente a documentar\n- AUDIENCIA: {{AUDIENCIA}} > Usuarios del agente\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara documentar un agente IA de forma que cualquier persona pueda entenderlo, usarlo y mantenerlo. La documentacion es el seguro de vida del agente.\n\n--- P | PEDIDO ---\n\nArquetipo: Technical Writer de AI con experiencia en documentacion de productos de IA para usuarios finales y administradores.\n\nDocumentacion de agente:\n1. Ficha tecnica: nombre, plataforma, scope, owner, fecha\n2. Guia de usuario: como usarlo paso a paso con ejemplos\n3. Guia de administrador: como modificar, actualizar, troubleshoot\n4. System prompt documentado con explicacion de cada seccion\n5. FAQ: 10 preguntas que los usuarios hacen\n6. Changelog: historial de cambios con fecha\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- User-first: la guia de usuario es lo primero\n- Show don't explain: screenshots y ejemplos > texto largo\n- Maintenance docs: sin docs de admin, el agente muere cuando el creador se va\n- Living doc: actualizar con cada cambio\n\n--- C | CRITERIO ---\n\nFormato: documentacion completa del agente.\nTono: claro, accesible.\nAudiencia: usuarios + administradores.\nAccion: publicar y compartir con el equipo.\n\n[checklist]\n- [ ] La ficha tecnica esta completa\n- [ ] La guia de usuario tiene ejemplos\n- [ ] La guia de admin permite mantenimiento sin el creador\n- [ ] El changelog esta al dia",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "agentes_curar_knowledge_sources",
    "label_title": "Curar Knowledge Sources",
    "category": "agentes",
    "type": "spec",
    "content": "[inputs]\n- AGENTE: {{AGENTE}} > Agente que usara las fuentes\n- DOMINIO: {{DOMINIO}} > Dominio de conocimiento\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara seleccionar y preparar las fuentes de conocimiento que alimentan un agente IA. Garbage in = garbage out.\n\n--- P | PEDIDO ---\n\nArquetipo: Knowledge Curator con experiencia en seleccion de fuentes para RAG y knowledge bases corporativas.\n\nCuraduria de knowledge sources:\n1. Inventario de fuentes candidatas\n2. Evaluacion: relevancia, actualidad, confiabilidad, formato\n3. Seleccion: top 20-50 fuentes (calidad > cantidad)\n4. Preparacion: limpiar, formatear, chunking\n5. Organizacion: taxonomia y naming\n6. Schedule: cadencia de actualizacion\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Quality filter: relevancia × actualidad × confiabilidad\n- Less is more: 30 fuentes curadas > 300 dumped\n- Format matters: el formato afecta la calidad del retrieval\n- Freshness: fuentes caducas producen respuestas caducas\n\n--- C | CRITERIO ---\n\nFormato: inventario evaluado + seleccion + plan de preparacion.\nTono: metodico.\nAudiencia: creador del agente.\nAccion: preparar las primeras 10 fuentes.\n\n[checklist]\n- [ ] Las fuentes estan evaluadas (no solo listadas)\n- [ ] La seleccion prioriza calidad\n- [ ] El formato de preparacion esta definido\n- [ ] La cadencia de actualizacion esta planificada",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "agentes_conversational_ux_disenar",
    "label_title": "Conversational Ux Disenar",
    "category": "agentes",
    "type": "spec",
    "content": "[inputs]\n- AGENTE: {{AGENTE}} > Agente a disenar\n- AUDIENCIA: {{AUDIENCIA}} > Usuarios del agente\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar la experiencia conversacional de un agente: como saluda, como responde, como maneja errores, como cierra. La UX conversacional ES la percepcion del agente.\n\n--- P | PEDIDO ---\n\nArquetipo: Conversational UX Designer con experiencia en diseno de dialogos para chatbots y asistentes virtuales.\n\nUX Conversacional:\n1. Greeting: como saluda y establece expectativas\n2. Happy path: flujo de interaccion ideal\n3. Error handling: como responde cuando no sabe o no entiende\n4. Clarification: como pide mas informacion sin frustrar\n5. Closure: como cierra la interaccion\n6. Personality consistency: tono en todas las situaciones\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Dialog flow mapping: visualizar todas las rutas\n- Error-first: disenar los casos de error ANTES del happy path\n- Tone consistency: la personalidad no cambia con los errores\n- User testing: 5 usuarios reales probando el flujo\n\n--- C | CRITERIO ---\n\nFormato: dialog flows + scripts por situacion + testing plan.\nTono: centrado en el usuario.\nAudiencia: creador del agente.\nAccion: implementar los dialog flows.\n\n[checklist]\n- [ ] El greeting establece expectativas claras\n- [ ] El error handling es graceful (no frustrante)\n- [ ] La personalidad es consistente en todos los escenarios\n- [ ] El flujo fue testeado con usuarios reales",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "agentes_security_guardrails",
    "label_title": "Security Guardrails",
    "category": "agentes",
    "type": "spec",
    "content": "[inputs]\n- AGENTE: {{AGENTE}} > Agente a proteger\n- DATOS: {{DATOS}} > Tipo de datos que maneja el agente\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar los guardrails de seguridad de un agente IA: que nunca debe decir, compartir, o hacer. Sin guardrails, un agente es un riesgo.\n\n--- P | PEDIDO ---\n\nArquetipo: AI Security Specialist con experiencia en red-teaming de chatbots y diseno de guardrails para agentes empresariales.\n\nSecurity Guardrails:\n1. Data classification: que info es publica, interna, confidencial\n2. Prohibited outputs: que el agente NUNCA debe decir\n3. Prompt injection defense: como prevenir manipulacion\n4. PII protection: como manejar datos personales\n5. Escalation triggers: cuando el agente debe callar y pasar a humano\n6. Adversarial testing: 10 intentos de romper los guardrails\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Assume adversarial users: disenar para el peor caso\n- Deny by default: prohibir todo, luego permitir lo necesario\n- Test adversarially: intentar romper antes de que otros lo hagan\n- Log everything: cada interaccion debe ser auditable\n\n--- C | CRITERIO ---\n\nFormato: guardrails spec + adversarial test results.\nTono: tecnico-seguridad.\nAudiencia: owner del agente + equipo de seguridad.\nAccion: implementar los guardrails antes de publicar.\n\n[checklist]\n- [ ] Los datos estan clasificados por nivel\n- [ ] Los prohibited outputs son explicitos\n- [ ] Los adversarial tests estan ejecutados\n- [ ] La escalacion a humano esta definida",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "agentes_roi_calcular_asistente",
    "label_title": "Roi Calcular Asistente",
    "category": "agentes",
    "type": "spec",
    "content": "[inputs]\n- AGENTE: {{AGENTE}} > Agente a evaluar\n- PROCESO: {{PROCESO}} > Proceso que automatiza\n- COSTO: {{COSTO}} > (opcional) Costo mensual del agente\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara calcular el ROI de un agente IA: cuanto tiempo ahorra, cuanto cuesta, y cuando se paga solo. Sin ROI, el agente es un juguete.\n\n--- P | PEDIDO ---\n\nArquetipo: Business Analyst de AI con experiencia en cuantificacion de valor de agentes y automatizaciones.\n\nROI de agente IA:\n1. Costo: desarrollo + plataforma + mantenimiento mensual\n2. Ahorro: horas/semana × valor/hora × semanas/ano\n3. Calidad: mejora medible en outputs (si aplica)\n4. Payback: cuando se recupera la inversion\n5. Escenarios: conservador, probable, optimista\n6. Recomendacion: go / no-go\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Total cost of ownership: no solo suscripcion, sino todo el costo\n- Conservative bias: mejor sorprenderse positivamente\n- Intangibles: mejora en calidad y consistencia tambien vale\n- Monitor: medir el ROI real despues de 90 dias\n\n--- C | CRITERIO ---\n\nFormato: modelo ROI + payback + recomendacion.\nTono: financiero.\nAudiencia: decision-maker.\nAccion: aprobar o rechazar la inversion.\n\n[checklist]\n- [ ] El costo total esta calculado (no solo la suscripcion)\n- [ ] El ahorro es medible y conservador\n- [ ] El payback period esta cuantificado\n- [ ] La recomendacion es clara",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "agentes_onboarding_equipo_ia",
    "label_title": "Onboarding Equipo Ia",
    "category": "agentes",
    "type": "spec",
    "content": "[inputs]\n- AGENTE: {{AGENTE}} > Agente a adoptar\n- EQUIPO: {{EQUIPO}} > Tamano y perfil del equipo\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar el onboarding de un equipo a un nuevo agente IA. La adopcion depende del onboarding — si la primera experiencia es mala, no vuelven.\n\n--- P | PEDIDO ---\n\nArquetipo: Change Management Specialist con experiencia en adopcion de herramientas de IA en equipos de 10-100 personas.\n\nOnboarding de equipo a agente IA:\n1. Comunicacion: por que este agente, que resuelve, que NO hace\n2. Demo: sesion de 15 min mostrando los 3 use cases principales\n3. Quick start: del zero al primer resultado en 5 min\n4. Templates: los 5 prompts listos para copiar y usar\n5. Support: a quien preguntar cuando algo no funciona\n6. Feedback: como reportar problemas o sugerir mejoras\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Show value fast: time-to-first-result < 5 min\n- 3 use cases: no 20, solo los 3 que mas valor aportan\n- Templates > training: dar prompts listos, no explicar teoria\n- Champion: 1 persona por equipo que ayude a los demas\n\n--- C | CRITERIO ---\n\nFormato: plan de onboarding + materiales + timeline.\nTono: motivador-practico.\nAudiencia: equipo que adoptara el agente.\nAccion: ejecutar el onboarding.\n\n[checklist]\n- [ ] El time-to-first-result es < 5 min\n- [ ] Los 3 use cases son los de mayor valor\n- [ ] Los templates estan listos para copiar\n- [ ] El champion esta identificado",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "agentes_iterative_improvement_cycle",
    "label_title": "Iterative Improvement Cycle",
    "category": "agentes",
    "type": "spec",
    "content": "[inputs]\n- AGENTE: {{AGENTE}} > Agente a mejorar\n- METRICAS_ACTUALES: {{METRICAS_ACTUALES}} > (opcional) Metricas actuales disponibles\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara mejorar sistematicamente un agente basandote en uso real. Los mejores agentes no se lanzan perfectos — se mejoran con datos.\n\n--- P | PEDIDO ---\n\nArquetipo: AI Product Manager con experiencia en mejora iterativa de productos de IA basada en analytics y feedback.\n\nCiclo de mejora:\n1. Metricas: que medir (uso, satisfaccion, precision, fallbacks)\n2. Feedback: como capturar input del usuario (thumbs, comments, tickets)\n3. Analysis: identificar los 3 mayores pain points\n4. Improvement: disenar mejoras para cada pain point\n5. Test: A/B test o before/after de las mejoras\n6. Deploy: implementar mejoras con versionado\n7. Repeat: cadencia mensual\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Data-driven: no mejorar por intuicion, sino por datos\n- Top 3 pain points: no 20, solo los que mas impactan\n- Version control: cada mejora es una version\n- Regression check: la mejora no rompe lo que ya funcionaba\n\n--- C | CRITERIO ---\n\nFormato: ciclo de mejora + metricas + cadencia.\nTono: operativo.\nAudiencia: owner del agente.\nAccion: ejecutar el primer ciclo.\n\n[checklist]\n- [ ] Las metricas cubren uso y calidad\n- [ ] Los pain points estan priorizados por impacto\n- [ ] El testing confirma mejora\n- [ ] El versionado esta implementado",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "automatizacion_email_filtros_reglas",
    "label_title": "Email Filtros Reglas",
    "category": "automatizacion",
    "type": "spec",
    "content": "[inputs]\n- HERRAMIENTA: {{HERRAMIENTA}} > Gmail o Outlook\n- VOLUMEN: {{VOLUMEN}} > Emails diarios aproximados\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara configurar filtros y reglas que procesen automaticamente el 70% de tu email. El email que se procesa solo no roba atencion.\n\n--- P | PEDIDO ---\n\nArquetipo: Email Productivity Specialist con experiencia en configuracion de filtros avanzados para Gmail y Outlook.\n\nFiltros de email:\n1. Categorizar: newsletters, notificaciones, accionables, FYI\n2. Reglas por categoria: archivar, etiquetar, mover, marcar\n3. VIP list: remitentes que siempre van a inbox principal\n4. Snooze rules: emails que vuelven a aparecer cuando importan\n5. Unsubscribe batch: limpiar suscripciones inutiles\n6. Testing: verificar que los filtros funcionan 1 semana\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- 80/20: el 80% de emails caen en 5 categorias\n- VIP inbox: solo personas importantes llegan directo\n- Auto-archive: newsletters y notificaciones nunca tocan inbox\n- Weekly audit: revisar filtros cada semana por 1 mes\n\n--- C | CRITERIO ---\n\nFormato: lista de filtros/reglas listas para configurar.\nTono: practico.\nAudiencia: profesional con email saturado.\nAccion: configurar los filtros hoy.\n\n[checklist]\n- [ ] Los filtros cubren el 80% del volumen\n- [ ] La VIP list esta definida\n- [ ] Las newsletters estan auto-archivadas\n- [ ] El testing plan es de 1 semana",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "automatizacion_reportes_automaticos",
    "label_title": "Reportes Automaticos",
    "category": "automatizacion",
    "type": "spec",
    "content": "[inputs]\n- REPORTE: {{REPORTE}} > Reporte a automatizar\n- HERRAMIENTA: {{HERRAMIENTA}} > Herramienta disponible\n- FRECUENCIA: {{FRECUENCIA}} > Frecuencia del reporte\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara automatizar la generacion de reportes recurrentes. El reporte manual es trabajo que una maquina deberia hacer.\n\n--- P | PEDIDO ---\n\nArquetipo: BI Automation Engineer con experiencia en automatizacion de reportes para equipos de operaciones y finanzas.\n\nReportes automaticos:\n1. Reporte a automatizar: contenido, frecuencia, audiencia\n2. Fuente de datos: de donde vienen los numeros\n3. Logica de calculo: formulas y transformaciones\n4. Formato de salida: email, PDF, dashboard, Slack\n5. Alertas: cuando el reporte debe gritar (thresholds)\n6. Implementacion: paso a paso en la herramienta elegida\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Define content first: que vale la pena automatizar\n- Exception reporting: solo mostrar lo anormal\n- Multi-audience: diferentes versiones para diferentes roles\n- Reliability: el reporte debe llegar siempre, no solo cuando funciona\n\n--- C | CRITERIO ---\n\nFormato: spec de automatizacion + implementacion paso a paso.\nTono: tecnico.\nAudiencia: analista o administrador.\nAccion: implementar la automatizacion.\n\n[checklist]\n- [ ] El contenido del reporte esta definido\n- [ ] Las fuentes de datos estan identificadas\n- [ ] Las alertas tienen thresholds\n- [ ] La implementacion es paso a paso",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "automatizacion_onboarding_empleado",
    "label_title": "Onboarding Empleado",
    "category": "automatizacion",
    "type": "spec",
    "content": "[inputs]\n- EMPRESA: {{EMPRESA}} > Tipo de empresa\n- ROL: {{ROL}} > Tipo de rol a onboardear\n- HERRAMIENTAS: {{HERRAMIENTAS}} > Herramientas de HR/Ops disponibles\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara automatizar el flujo de onboarding de nuevos empleados. El onboarding manual es inconsistente y olvidadizo.\n\n--- P | PEDIDO ---\n\nArquetipo: People Ops Specialist con experiencia en diseno de flujos automatizados de onboarding para empresas tech.\n\nOnboarding automatizado:\n1. Checklist de tareas por dia (D1, D3, D7, D14, D30)\n2. Emails automaticos: bienvenida, recursos, check-ins\n3. Access provisioning: cuentas y herramientas automaticas\n4. Buddy assignment: emparejamiento automatico\n5. Feedback: encuesta automatica en D7 y D30\n6. Escalation: alertas si algo no se completa\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Day-based triggers: cada dia tiene su set de acciones\n- No-touch ideal: el admin solo interviene en excepciones\n- Feedback-driven: mejorar con cada cohorte de nuevos\n- Measure: time-to-productivity como KPI\n\n--- C | CRITERIO ---\n\nFormato: flujo automatizado + emails + checklist.\nTono: operativo.\nAudiencia: equipo de People Ops.\nAccion: implementar el flujo.\n\n[checklist]\n- [ ] El checklist cubre D1 a D30\n- [ ] Los emails automaticos estan escritos\n- [ ] Las alertas de escalacion estan configuradas\n- [ ] La feedback survey esta disenada",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "automatizacion_social_media_scheduling",
    "label_title": "Social Media Scheduling",
    "category": "automatizacion",
    "type": "spec",
    "content": "[inputs]\n- CANALES: {{CANALES}} > Redes sociales activas\n- FRECUENCIA: {{FRECUENCIA}} > Posts por semana por canal\n- HERRAMIENTA: {{HERRAMIENTA}} > (opcional) Herramienta de scheduling\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar un sistema de scheduling de contenido en redes que mantenga consistencia sin esfuerzo diario.\n\n--- P | PEDIDO ---\n\nArquetipo: Social Media Manager con experiencia en scheduling de contenido para marcas con 5+ canales activos.\n\nSocial scheduling:\n1. Content calendar: plantilla mensual con temas por semana\n2. Batching: crear contenido de 1 semana en 1 sesion\n3. Scheduling: herramienta + mejores horarios por plataforma\n4. Repurpose: 1 pieza larga = 5 piezas cortas\n5. Engagement windows: cuando responder comentarios\n6. Analytics review: que medir y cada cuanto\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Batch create > daily create: 1 sesion semanal, no diario\n- Best times: publicar cuando tu audiencia esta activa\n- Repurpose > create: maximizar cada pieza de contenido\n- 80/20 scheduling: 80% programado, 20% reactivo/real-time\n\n--- C | CRITERIO ---\n\nFormato: content calendar template + scheduling guide.\nTono: practico.\nAudiencia: community manager o solopreneur.\nAccion: crear y programar el contenido de esta semana.\n\n[checklist]\n- [ ] El calendar tiene estructura semanal clara\n- [ ] El batching reduce a 1 sesion semanal\n- [ ] Los mejores horarios estan identificados\n- [ ] El framework de repurpose esta definido",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "automatizacion_crm_pipeline_flujo",
    "label_title": "Crm Pipeline Flujo",
    "category": "automatizacion",
    "type": "spec",
    "content": "[inputs]\n- CRM: {{CRM}} > CRM actual\n- PROCESO_VENTAS: {{PROCESO_VENTAS}} > Proceso de ventas actual\n- EQUIPO: {{EQUIPO}} > Tamano del equipo de ventas\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara automatizar el flujo de un pipeline de ventas en CRM: desde lead hasta cierre con triggers, tareas y notificaciones.\n\n--- P | PEDIDO ---\n\nArquetipo: Sales Operations Manager con experiencia en automatizacion de pipelines de ventas en HubSpot, Salesforce y Pipedrive.\n\nCRM Pipeline automatizado:\n1. Stages del pipeline: definicion + criterios de movimiento\n2. Triggers por stage: que pasa automaticamente al entrar\n3. Tareas automaticas: follow-ups, reminders, escalations\n4. Notificaciones: quien se entera de que, cuando\n5. Lead scoring: calificacion automatica\n6. Reporting: metricas automaticas por stage\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Stage clarity: cada stage tiene criterios de entrada y salida\n- Auto-tasks: nunca depender de la memoria del vendedor\n- Lead scoring: calificar con datos, no con intuicion\n- Pipeline hygiene: alertas para deals estancados\n\n--- C | CRITERIO ---\n\nFormato: spec de pipeline + triggers + automatizaciones.\nTono: tecnico-comercial.\nAudiencia: equipo de ventas/ops.\nAccion: configurar el pipeline.\n\n[checklist]\n- [ ] Los stages tienen criterios claros\n- [ ] Los triggers generan tareas automaticas\n- [ ] El lead scoring es automatico\n- [ ] Las alertas de deals estancados estan configuradas",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "automatizacion_notificaciones_inteligentes",
    "label_title": "Notificaciones Inteligentes",
    "category": "automatizacion",
    "type": "spec",
    "content": "[inputs]\n- APPS: {{APPS}} > Apps que envian notificaciones\n- DISPOSITIVOS: {{DISPOSITIVOS}} > Dispositivos (phone, laptop, tablet)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara reemplazar el spam de notificaciones por un sistema inteligente que solo te avisa de lo que importa.\n\n--- P | PEDIDO ---\n\nArquetipo: Digital Wellness Engineer con experiencia en diseno de sistemas de notificacion que respetan la atencion.\n\nNotificaciones inteligentes:\n1. Inventario: todas las fuentes de notificacion actuales\n2. Clasificacion: critica / importante / FYI / ruido\n3. Reglas: que llega inmediato, que en batch, que silenciado\n4. DND schedule: horarios sin notificaciones\n5. VIP channels: personas/temas que siempre pasan\n6. Implementacion: configuracion por app y dispositivo\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Default: silenciado. Solo lo critico interrumpe.\n- Batch: FYI y no-urgente en 2-3 ventanas diarias\n- VIP: 5-10 personas que siempre llegan\n- Audit weekly: cada viernes, revisar si los filtros funcionan\n\n--- C | CRITERIO ---\n\nFormato: configuracion por app + reglas + DND schedule.\nTono: practico.\nAudiencia: profesional interrumpido.\nAccion: configurar hoy.\n\n[checklist]\n- [ ] Todas las fuentes estan inventariadas\n- [ ] Las reglas cubren 4 niveles de prioridad\n- [ ] El DND schedule esta definido\n- [ ] La configuracion es por app especifica",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "automatizacion_backup_datos_personal",
    "label_title": "Backup Datos Personal",
    "category": "automatizacion",
    "type": "spec",
    "content": "[inputs]\n- DATOS: {{DATOS}} > Tipo de datos criticos\n- HERRAMIENTAS: {{HERRAMIENTAS}} > Herramientas de storage actuales\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara automatizar el backup de tus datos criticos: documentos, notas, fotos, passwords. Lo que no tiene backup no existe.\n\n--- P | PEDIDO ---\n\nArquetipo: Systems Administrator con experiencia en estrategias de backup personal y empresarial.\n\nBackup automatizado:\n1. Inventario: que datos son criticos (irremplazables)\n2. Estrategia 3-2-1: 3 copias, 2 medios, 1 offsite\n3. Herramientas: cloud sync + backup local + offsite\n4. Schedule: frecuencia por tipo de dato\n5. Test: como verificar que el backup funciona\n6. Recovery: como restaurar en caso de desastre\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- 3-2-1 rule: 3 copias, 2 medios, 1 offsite\n- Automate: si depende de ti recordar, fallara\n- Test restores: el backup que no se prueba no existe\n- Encrypt: los backups deben estar cifrados\n\n--- C | CRITERIO ---\n\nFormato: plan de backup + configuracion + test schedule.\nTono: tecnico-personal.\nAudiencia: profesional que valora sus datos.\nAccion: configurar el primer backup automatico hoy.\n\n[checklist]\n- [ ] Los datos criticos estan identificados\n- [ ] La estrategia 3-2-1 se cumple\n- [ ] El test de restauracion esta programado\n- [ ] Los backups estan cifrados",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "automatizacion_meeting_prep_auto",
    "label_title": "Meeting Prep Auto",
    "category": "automatizacion",
    "type": "spec",
    "content": "[inputs]\n- CALENDARIO: {{CALENDARIO}} > Herramienta de calendario\n- REUNIONES_SEMANA: {{REUNIONES_SEMANA}} > Numero de reuniones semanales\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara automatizar la preparacion de reuniones: agenda, contexto, documentos, preguntas — todo listo antes de que empiece.\n\n--- P | PEDIDO ---\n\nArquetipo: Meeting Efficiency Specialist con experiencia en diseno de pre-meeting workflows para ejecutivos.\n\nPre-meeting automatizado:\n1. Trigger: invitacion aceptada en calendario\n2. Auto-research: buscar contexto del tema/persona\n3. Auto-agenda: template de agenda por tipo de reunion\n4. Auto-docs: compilar documentos relevantes\n5. Auto-questions: 3 preguntas clave para la reunion\n6. Delivery: paquete listo 30 min antes\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Template by meeting type: 1:1, status, decision, brainstorm\n- Context automation: CRM data, LinkedIn, notas previas\n- 3 questions: la preparacion minima viable\n- 30-min delivery: suficiente tiempo para revisar, no para procrastinar\n\n--- C | CRITERIO ---\n\nFormato: workflow de pre-meeting + templates por tipo.\nTono: operativo.\nAudiencia: profesional con 5+ reuniones diarias.\nAccion: configurar el workflow para manana.\n\n[checklist]\n- [ ] El trigger esta conectado al calendario\n- [ ] Los templates cubren los 4 tipos principales de reunion\n- [ ] Las 3 preguntas son relevantes (no genericas)\n- [ ] El paquete llega 30 min antes",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "automatizacion_invoice_tracking",
    "label_title": "Invoice Tracking",
    "category": "automatizacion",
    "type": "spec",
    "content": "[inputs]\n- VOLUMEN: {{VOLUMEN}} > Facturas por mes\n- HERRAMIENTA: {{HERRAMIENTA}} > Herramienta de facturacion o contabilidad\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara automatizar el seguimiento de facturas y pagos. El cobro manual es tiempo que podrias invertir en generar valor.\n\n--- P | PEDIDO ---\n\nArquetipo: Finance Operations Specialist con experiencia en automatizacion de procesos de facturacion para freelancers y pymes.\n\nInvoice tracking automatizado:\n1. Template de factura estandar\n2. Trigger de envio: automatico al completar entregable\n3. Seguimiento: recordatorio automatico a los 7, 14, 21 dias\n4. Registro: tabla de facturas con status (enviada/pagada/vencida)\n5. Alertas: notificacion cuando vence o se paga\n6. Reporte mensual: resumen de facturacion automatico\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Automate the chase: el seguimiento manual es degradante\n- Professional templates: la factura ES tu marca\n- 3-touch reminder: amable a 7d, firme a 14d, formal a 21d\n- Dashboard: siempre saber cuanto te deben\n\n--- C | CRITERIO ---\n\nFormato: sistema de tracking + templates + automatizaciones.\nTono: profesional.\nAudiencia: freelancer o pyme.\nAccion: configurar el sistema.\n\n[checklist]\n- [ ] El template de factura es profesional\n- [ ] Los recordatorios estan automatizados\n- [ ] El tracking tiene status por factura\n- [ ] El reporte mensual es automatico",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "automatizacion_content_repurposing",
    "label_title": "Content Repurposing",
    "category": "automatizacion",
    "type": "spec",
    "content": "[inputs]\n- CONTENIDO: {{CONTENIDO}} > Pieza madre a repurpose\n- CANALES: {{CANALES}} > Canales destino\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara automatizar la transformacion de 1 pieza de contenido larga en multiples piezas cortas para diferentes canales.\n\n--- P | PEDIDO ---\n\nArquetipo: Content Repurposing Strategist con experiencia en maximizacion de ROI de contenido para marcas multi-canal.\n\nContent repurposing:\n1. Pieza madre: blog post, video, podcast, presentacion\n2. Atomizacion: descomponer en fragmentos reutilizables\n3. Formato por canal: Twitter thread, LinkedIn post, carousel, reel, newsletter\n4. Adaptacion: ajustar tono y formato a cada plataforma\n5. Scheduling: calendario de publicacion por pieza\n6. Workflow: pipeline de repurposing paso a paso\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- 1 > many: 1 blog = thread + 3 posts + 1 carousel + 1 newsletter\n- Platform-native: adaptar, no copiar\n- Stagger: no publicar todo el mismo dia\n- Analytics: que formato funciona mejor por plataforma\n\n--- C | CRITERIO ---\n\nFormato: workflow de repurposing + ejemplos por canal.\nTono: creativo-sistematico.\nAudiencia: creador de contenido.\nAccion: repurpose la ultima pieza de contenido.\n\n[checklist]\n- [ ] La atomizacion produce 5+ piezas de 1\n- [ ] Cada pieza es nativa de su plataforma\n- [ ] El calendario de staggering esta definido\n- [ ] El workflow es repetible",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "automatizacion_password_security",
    "label_title": "Password Security",
    "category": "automatizacion",
    "type": "spec",
    "content": "[inputs]\n- VOLUMEN: {{VOLUMEN}} > Numero aproximado de cuentas online\n- ACTUAL: {{ACTUAL}} > Como gestionas passwords actualmente\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara implementar un sistema de gestion de passwords seguro y automatizado. Passwords debiles o repetidos son la puerta de entrada #1 para ataques.\n\n--- P | PEDIDO ---\n\nArquetipo: Cybersecurity Specialist con experiencia en gestion de identidades y password hygiene para profesionales.\n\nPassword management:\n1. Password manager: seleccion (1Password, Bitwarden, etc.)\n2. Migracion: importar passwords existentes\n3. Audit: identificar passwords debiles, repetidos, comprometidos\n4. 2FA: activar en todas las cuentas criticas\n5. Emergency access: plan B si pierdes acceso al manager\n6. Habito: como integrar el password manager en tu flujo diario\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- 1 master password: fuerte, memorable, unico\n- Unique per service: cada cuenta un password diferente\n- 2FA everywhere: SMS < TOTP < hardware key\n- Breach monitoring: alertas si tus passwords aparecen en leaks\n\n--- C | CRITERIO ---\n\nFormato: plan de implementacion paso a paso.\nTono: tecnico-accesible.\nAudiencia: profesional que aun usa el mismo password.\nAccion: instalar el password manager hoy.\n\n[checklist]\n- [ ] El password manager esta seleccionado\n- [ ] Los passwords debiles estan identificados\n- [ ] 2FA esta activado en cuentas criticas\n- [ ] El emergency access esta configurado",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "engine_faq_bot_automatico",
    "label_title": "Faq Bot Automatico",
    "category": "engine",
    "type": "spec",
    "content": "[inputs]\n- FUENTE: {{FUENTE}} > De donde vienen las preguntas frecuentes\n- PLATAFORMA: {{PLATAFORMA}} > Donde se desplegara el bot\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear un bot de FAQ que responda las preguntas repetitivas de clientes o empleados automaticamente.\n\n--- P | PEDIDO ---\n\nArquetipo: Customer Support Automation Specialist con experiencia en diseno de FAQ bots para empresas de servicio.\n\nFAQ Bot:\n1. Top 20 preguntas mas frecuentes (de tickets, chat, email)\n2. Respuesta por pregunta: directa, precisa, con link si aplica\n3. Flujo conversacional: como navega entre temas\n4. Fallback: que hacer cuando no sabe la respuesta\n5. Handoff: cuando escalar a humano\n6. Analytics: que medir (resolution rate, satisfaction)\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Data-driven FAQ: las preguntas vienen de datos reales (no inventadas)\n- Resolution rate: el bot debe resolver 60%+ sin humano\n- Graceful fallback: 'no se' es mejor que una respuesta incorrecta\n- Continuous learning: agregar nuevas preguntas cada semana\n\n--- C | CRITERIO ---\n\nFormato: FAQ + flujo + fallback + metricas.\nTono: util, amigable.\nAudiencia: equipo de soporte.\nAccion: implementar el bot.\n\n[checklist]\n- [ ] Las 20 preguntas son reales (de datos)\n- [ ] Las respuestas son precisas y verificadas\n- [ ] El fallback a humano es seamless\n- [ ] Las metricas de exito estan definidas",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "engine_content_generator_marca",
    "label_title": "Content Generator Marca",
    "category": "engine",
    "type": "spec",
    "content": "[inputs]\n- MARCA: {{MARCA}} > Tu marca\n- CONTENIDO: {{CONTENIDO}} > Tipos de contenido que produces\n- BRAND_VOICE: {{BRAND_VOICE}} > (opcional) Tu Brand Voice Document\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear un engine de generacion de contenido alineado a tu marca que produzca borradores consistentes.\n\n--- P | PEDIDO ---\n\nArquetipo: Content Operations Lead con experiencia en sistemas de generacion de contenido a escala para marcas.\n\nContent Engine:\n1. Brand Voice integrado: tono, vocabulario, estilo\n2. Templates por tipo de contenido: blog, social, email, web\n3. Input protocol: que informacion necesita para generar\n4. Quality gate: criterios de revision antes de publicar\n5. Workflow: input > draft > review > publish\n6. Training: como mejorar el engine con feedback\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Brand Voice as constraint: el engine produce dentro de la voz de marca\n- Template-driven: consistencia por estructura, no por suerte\n- Human review: el engine genera, el humano aprueba\n- Feedback loop: cada correccion mejora el engine\n\n--- C | CRITERIO ---\n\nFormato: spec del engine + templates + workflow.\nTono: tecnico-creativo.\nAudiencia: equipo de contenido.\nAccion: configurar el engine con los primeros 3 templates.\n\n[checklist]\n- [ ] El Brand Voice esta integrado como constraint\n- [ ] Los templates cubren 3+ tipos de contenido\n- [ ] El quality gate tiene criterios medibles\n- [ ] El feedback loop esta disenado",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "engine_analisis_automatizado_datos",
    "label_title": "Analisis Automatizado Datos",
    "category": "engine",
    "type": "spec",
    "content": "[inputs]\n- DATOS: {{DATOS}} > Fuente y tipo de datos\n- METRICAS: {{METRICAS}} > Metricas a calcular\n- FRECUENCIA: {{FRECUENCIA}} > Frecuencia de ejecucion\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear un pipeline de analisis automatizado que procese datos y produzca insights sin intervencion manual cada vez.\n\n--- P | PEDIDO ---\n\nArquetipo: Analytics Engineer con experiencia en pipelines de datos automatizados para equipos de BI.\n\nPipeline de analisis:\n1. Input: fuente de datos + formato + frecuencia\n2. Limpieza: transformaciones automaticas\n3. Analisis: metricas calculadas automaticamente\n4. Insights: reglas para detectar anomalias y tendencias\n5. Output: reporte/dashboard automatico\n6. Alertas: triggers para hallazgos importantes\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- ELT pipeline: Extract, Load, Transform\n- Anomaly detection: reglas estadisticas automaticas\n- Scheduled runs: cada hora/dia/semana segun necesidad\n- Self-documenting: cada transformacion documentada\n\n--- C | CRITERIO ---\n\nFormato: spec del pipeline + implementacion.\nTono: tecnico.\nAudiencia: data engineer o analista.\nAccion: implementar el primer stage del pipeline.\n\n[checklist]\n- [ ] El pipeline cubre de input a output\n- [ ] Las transformaciones son reproducibles\n- [ ] Las alertas tienen thresholds\n- [ ] La documentacion es automatica",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "engine_lead_scoring_modelo",
    "label_title": "Lead Scoring Modelo",
    "category": "engine",
    "type": "spec",
    "content": "[inputs]\n- PRODUCTO: {{PRODUCTO}} > Producto o servicio\n- ICP: {{ICP}} > Perfil del cliente ideal\n- CRM: {{CRM}} > (opcional) CRM actual\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear un modelo de lead scoring que priorice automaticamente los prospectos mas valiosos.\n\n--- P | PEDIDO ---\n\nArquetipo: Revenue Operations Analyst con experiencia en lead scoring predictivo para pipelines B2B.\n\nLead Scoring:\n1. Criteria: demografico (fit) + comportamental (engagement)\n2. Scoring: puntos por criterio (total 0-100)\n3. Thresholds: MQL (>40), SQL (>70), Hot (>90)\n4. Data sources: CRM, website, email, social\n5. Modelo: como calcular el score automaticamente\n6. Calibracion: revisar y ajustar trimestralmente\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Fit + engagement: el lead perfecto tiene ambos\n- Point-based: simple y transparente\n- Negative scoring: descontar por inactividad\n- Calibrate with closed-won: el scoring debe predecir cierre\n\n--- C | CRITERIO ---\n\nFormato: modelo de scoring + thresholds + implementacion.\nTono: tecnico-comercial.\nAudiencia: equipo de ventas/marketing.\nAccion: implementar en el CRM.\n\n[checklist]\n- [ ] Los criterios cubren fit Y engagement\n- [ ] Los thresholds estan definidos\n- [ ] El negative scoring esta incluido\n- [ ] La calibracion trimestral esta planificada",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "engine_workflow_aprobaciones",
    "label_title": "Workflow Aprobaciones",
    "category": "engine",
    "type": "spec",
    "content": "[inputs]\n- PROCESO: {{PROCESO}} > Tipo de aprobaciones a automatizar\n- HERRAMIENTA: {{HERRAMIENTA}} > Herramienta disponible (Forms, Slack, custom)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara automatizar un flujo de aprobaciones que elimine cuellos de botella sin perder control.\n\n--- P | PEDIDO ---\n\nArquetipo: Process Automation Architect con experiencia en diseno de workflows de aprobacion para empresas.\n\nWorkflow de aprobaciones:\n1. Tipos de solicitud: cada tipo con su flujo\n2. Criterios de aprobacion: quien aprueba que, basado en que\n3. Escalation: que pasa si no se aprueba en X tiempo\n4. Delegation: backup cuando el aprobador no esta\n5. Audit trail: registro de quien aprobo que, cuando\n6. SLA: tiempos maximos de respuesta por tipo\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Exception-based: auto-aprobar lo rutinario, escalar lo excepcional\n- Parallel when possible: multiples aprobaciones simultaneas\n- SLA-driven: tiempos de respuesta con consecuencias\n- Audit trail: todo queda registrado\n\n--- C | CRITERIO ---\n\nFormato: diagrama de flujo + reglas + SLAs.\nTono: operativo.\nAudiencia: equipo de operaciones.\nAccion: implementar el flujo.\n\n[checklist]\n- [ ] Los tipos de solicitud estan clasificados\n- [ ] Los criterios de aprobacion son claros\n- [ ] La escalacion tiene tiempos definidos\n- [ ] El audit trail es completo",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "presentacion_pitch_cliente",
    "label_title": "Pitch Cliente",
    "category": "presentacion",
    "type": "spec",
    "content": "[inputs]\n- PRODUCTO: {{PRODUCTO}} > Tu producto o servicio\n- CLIENTE: {{CLIENTE}} > Perfil del prospecto\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear un pitch comercial que convierta prospectos en clientes.\n\n--- P | PEDIDO ---\n\nArquetipo: Sales Presenter con experiencia en presentaciones comerciales de alto cierre.\n\nPitch comercial:\n1. Hook: dato/pregunta que capture en 30 seg\n2. Pain: su problema, en sus palabras\n3. Solution: tu solucion en 1 slide\n4. Proof: 3 casos/datos de evidencia\n5. Offer: que incluye, que cuesta, que obtienen\n6. CTA: proximo paso de baja friccion\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Problem > solution > proof > offer > CTA\n- Their language: usar sus palabras, no las tuyas\n- 3 proof points: credibilidad minima\n- Easy next step: demo, trial, reunion\n\n--- C | CRITERIO ---\n\nFormato: deck de 10 slides + notas.\nTono: consultivo.\nAudiencia: prospecto.\nAccion: cerrar la reunion con compromiso.\n\n[checklist]\n- [ ] El pain es en sus palabras\n- [ ] Los 3 proof points son verificables\n- [ ] El CTA es de baja friccion\n- [ ] El deck tiene max 10 slides",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "presentacion_quarterly_review",
    "label_title": "Quarterly Review",
    "category": "presentacion",
    "type": "spec",
    "content": "[inputs]\n- EQUIPO: {{EQUIPO}} > Tu equipo o area\n- PERIODO: {{PERIODO}} > Trimestre a revisar\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear una presentacion de revision trimestral que comunique resultados, aprendizajes y direccion.\n\n--- P | PEDIDO ---\n\nArquetipo: Business Review Facilitator con experiencia en QBR para equipos ejecutivos.\n\nQuarterly Review:\n1. Resultados vs objetivos (scoring)\n2. Top wins: 3 logros del trimestre\n3. Top learnings: 3 aprendizajes\n4. Blockers: que nos freno\n5. Next quarter: prioridades y OKRs\n6. Ask: que necesitamos del liderazgo\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Results first: numeros antes que narrativa\n- Honest assessment: no maquillar\n- Forward-looking: 60% futuro, 40% pasado\n- Specific ask: que necesitas, no quejas generales\n\n--- C | CRITERIO ---\n\nFormato: presentacion de 15 slides max.\nTono: ejecutivo, honesto.\nAudiencia: liderazgo.\nAccion: aprobar prioridades del proximo trimestre.\n\n[checklist]\n- [ ] Resultados vs objetivos estan cuantificados\n- [ ] Los learnings son accionables\n- [ ] Las prioridades del proximo Q estan claras\n- [ ] El ask es especifico",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "presentacion_ted_style_talk",
    "label_title": "Ted Style Talk",
    "category": "presentacion",
    "type": "spec",
    "content": "[inputs]\n- IDEA: {{IDEA}} > Tu idea worth spreading\n- DURACION: {{DURACION}} > Duracion (10, 15, 18 min)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar una charla estilo TED que transforme a la audiencia en 15 minutos.\n\n--- P | PEDIDO ---\n\nArquetipo: TEDx Speaker Coach con experiencia en preparacion de speakers para TEDx y conferencias internacionales.\n\nTED Talk:\n1. 1 idea worth spreading (1 sola idea)\n2. Opening: historia personal que conecte emocionalmente\n3. Problem: por que esto importa para ELLOS\n4. Framework: tu modelo/solucion en 3 partes\n5. Evidence: 2-3 historias/datos de soporte\n6. Call to action: 1 cosa que pueden hacer HOY\n7. Closing: callback al opening\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- 1 idea only: si no cabe en 1 oracion, son 2 charlas\n- Story > statistics: las historias se recuerdan\n- Rule of 3: 3 puntos, 3 historias, 3 acciones\n- Full circle: cerrar con referencia al inicio\n\n--- C | CRITERIO ---\n\nFormato: guion completo con timing.\nTono: autentico, vulnerable, inspirador.\nAudiencia: audiencia general.\nAccion: practicar 10 veces.\n\n[checklist]\n- [ ] La idea cabe en 1 oracion\n- [ ] El opening es una historia personal\n- [ ] El framework tiene 3 partes claras\n- [ ] El callback cierra el circulo",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "comunicacion_mensaje_dificil_escrito",
    "label_title": "Mensaje Dificil Escrito",
    "category": "comunicacion",
    "type": "spec",
    "content": "[inputs]\n- TEMA: {{TEMA}} > Tema sensible a comunicar\n- RECEPTOR: {{RECEPTOR}} > Quien recibe el mensaje\n- CANAL: {{CANAL}} > Canal (email, chat, presencial)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara redactar un mensaje escrito sobre un tema sensible que comunique con claridad y empatia.\n\n--- P | PEDIDO ---\n\nArquetipo: Comunicador Ejecutivo especializado en crisis communication y mensajes sensibles.\n\nMensaje dificil:\n1. Objetivo: que necesitas comunicar exactamente\n2. Empatia: reconocer el impacto en el receptor\n3. Hechos: solo datos verificables\n4. Decision/cambio: que cambia y por que\n5. Soporte: que ayuda hay disponible\n6. Proximos pasos: que sigue\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Lead with empathy: reconocer antes de informar\n- Facts > opinions: solo lo verificable\n- Forward-looking: que sigue (no quedarse en lo malo)\n- Review: hacer que alguien mas lo lea antes de enviar\n\n--- C | CRITERIO ---\n\nFormato: mensaje listo para enviar.\nTono: empatico, directo, respetuoso.\nAudiencia: receptor del mensaje.\nAccion: enviar despues de una revision.\n\n[checklist]\n- [ ] La empatia es genuina (no formulaica)\n- [ ] Los hechos son verificables\n- [ ] El soporte disponible esta claro\n- [ ] Los proximos pasos son concretos",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "comunicacion_update_stakeholders",
    "label_title": "Update Stakeholders",
    "category": "comunicacion",
    "type": "spec",
    "content": "[inputs]\n- PROYECTO: {{PROYECTO}} > Proyecto o iniciativa\n- STAKEHOLDERS: {{STAKEHOLDERS}} > A quienes va dirigido\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara comunicar progreso a stakeholders de forma que genere confianza y evite micro-management.\n\n--- P | PEDIDO ---\n\nArquetipo: Project Communicator con experiencia en stakeholder management para proyectos criticos.\n\nStakeholder Update:\n1. TL;DR: status en 1 oracion (on track / at risk / blocked)\n2. Progress: que se logro esta semana (3 bullets)\n3. Next: que sigue la proxima semana (3 bullets)\n4. Risks: que podria salir mal + mitigacion\n5. Decisions: si necesitas algo del stakeholder\n6. Metricas: 2-3 numeros que muestren progreso\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Traffic light: verde/amarillo/rojo al inicio\n- Bad news early: los stakeholders odian las sorpresas\n- Numbers > narrativa: las metricas hablan solas\n- Decision-ready: si necesitas algo, pedirlo claramente\n\n--- C | CRITERIO ---\n\nFormato: update de 1 pagina max.\nTono: profesional, transparente.\nAudiencia: stakeholders.\nAccion: enviar semanalmente.\n\n[checklist]\n- [ ] El status cabe en 1 oracion\n- [ ] Los riesgos tienen mitigacion\n- [ ] Las decisions requeridas son claras\n- [ ] Las metricas muestran tendencia",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "decision_analizar_trade_offs",
    "label_title": "Analizar Trade Offs",
    "category": "decision",
    "type": "spec",
    "content": "[inputs]\n- OPCIONES: {{OPCIONES}} > Alternativas a comparar\n- CONTEXTO: {{CONTEXTO}} > Contexto de la decision\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara analizar trade-offs cuando no hay opcion perfecta. En decisiones reales, siempre ganas algo y pierdes algo — el arte es elegir que perder.\n\n--- P | PEDIDO ---\n\nArquetipo: Decision Analyst con experiencia en analisis de trade-offs para decisiones estrategicas bajo incertidumbre.\n\nTrade-off Analysis:\n1. Opciones: las alternativas reales (no ideales)\n2. Dimensiones: en que ejes se comparan (costo, tiempo, calidad, riesgo)\n3. Ganancia por opcion: que ganas con cada una\n4. Costo por opcion: que pierdes o sacrificas\n5. Peso: que dimension importa MAS en este contexto\n6. Recomendacion: la mejor opcion imperfecta + por que\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- No perfect option: aceptar que todo tiene trade-off\n- Make trade-offs explicit: lo que no se dice, se lamenta\n- Weight by context: los pesos cambian segun la situacion\n- Decide > optimize: mejor una buena decision hoy que una perfecta nunca\n\n--- C | CRITERIO ---\n\nFormato: tabla de trade-offs + recomendacion.\nTono: pragmatico.\nAudiencia: decision-maker.\nAccion: tomar la decision.\n\n[checklist]\n- [ ] Las opciones son reales (no teoricas)\n- [ ] Los trade-offs son explicitos\n- [ ] Los pesos estan justificados\n- [ ] La recomendacion acepta la imperfeccion",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "decision_kill_project",
    "label_title": "Kill Project",
    "category": "decision",
    "type": "spec",
    "content": "[inputs]\n- PROYECTO: {{PROYECTO}} > Proyecto a evaluar\n- METRICAS: {{METRICAS}} > Metricas actuales vs originales\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara decidir objetivamente si un proyecto debe continuar, pivotar o ser cancelado. Matar proyectos a tiempo es tan valioso como lanzarlos.\n\n--- P | PEDIDO ---\n\nArquetipo: Portfolio Manager con experiencia en decisiones de go/no-go y project termination para empresas de tecnologia.\n\nKill/Pivot/Continue Decision:\n1. Metricas actuales vs targets originales\n2. Sunk cost check: estoy decidiendo por lo invertido o por el futuro?\n3. Opportunity cost: que podria hacer con estos recursos en otro lado?\n4. Pivot options: hay forma de redirigir sin empezar de cero?\n5. Kill criteria: bajo que condiciones se cancela\n6. Decision: kill / pivot / continue + justificacion\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Sunk cost fallacy: lo invertido no se recupera, no influya\n- Opportunity cost: los recursos tienen usos alternativos\n- Pre-defined kill criteria: decidir en frio, no cuando estas emocional\n- Graceful exit: matar un proyecto bien tambien tiene valor\n\n--- C | CRITERIO ---\n\nFormato: analisis + decision + comunicacion.\nTono: objetivo, sin apego.\nAudiencia: sponsor del proyecto.\nAccion: tomar la decision esta semana.\n\n[checklist]\n- [ ] Las metricas vs targets son honestas\n- [ ] El sunk cost no influye en la decision\n- [ ] El opportunity cost esta cuantificado\n- [ ] La decision tiene justificacion clara",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "liderazgo_vision_equipo",
    "label_title": "Vision Equipo",
    "category": "liderazgo",
    "type": "spec",
    "content": "[inputs]\n- EQUIPO: {{EQUIPO}} > Tu equipo\n- CONTEXTO: {{CONTEXTO}} > Situacion actual del equipo\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara articular una vision de equipo que inspire, alinee y de direccion. Sin vision compartida, cada persona rema en una direccion diferente.\n\n--- P | PEDIDO ---\n\nArquetipo: Leadership Coach con experiencia en facilitacion de vision para equipos de alto rendimiento.\n\nVision de equipo:\n1. Purpose: por que existimos como equipo\n2. Vision: donde queremos estar en 12 meses (vivida, no generica)\n3. Values: 3-5 valores que guian como trabajamos\n4. Strategic priorities: las 3 cosas que importan este trimestre\n5. Success metrics: como medimos si vamos bien\n6. Ritual: como mantener la vision viva en el dia a dia\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Vivid vision: tan clara que se puede sentir, no solo leer\n- Co-created: el equipo co-crea, no solo recibe\n- 3 priorities max: si todo es prioridad, nada lo es\n- Living document: revisar y refrescar trimestralmente\n\n--- C | CRITERIO ---\n\nFormato: 1-pager de vision + ritual de mantenimiento.\nTono: inspirador, concreto.\nAudiencia: el equipo.\nAccion: facilitar sesion de co-creacion.\n\n[checklist]\n- [ ] La vision es vivida (no corporativa generica)\n- [ ] Las prioridades son max 3\n- [ ] Las metricas son medibles\n- [ ] El ritual de mantenimiento esta calendarizado",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "liderazgo_desarrollar_talento",
    "label_title": "Desarrollar Talento",
    "category": "liderazgo",
    "type": "spec",
    "content": "[inputs]\n- PERSONA: {{PERSONA}} > Persona a desarrollar\n- ROL_ACTUAL: {{ROL_ACTUAL}} > Rol actual\n- ASPIRACION: {{ASPIRACION}} > Hacia donde quiere crecer\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear un plan de desarrollo individual que acelere el crecimiento de un miembro del equipo.\n\n--- P | PEDIDO ---\n\nArquetipo: Talent Development Manager con experiencia en coaching de carrera y planes de desarrollo para profesionales tech.\n\nPlan de desarrollo:\n1. Assessment: fortalezas, areas de mejora, aspiraciones\n2. Goal: donde quiere estar en 6-12 meses\n3. Gap analysis: que necesita aprender/mejorar\n4. Actions: 70% on-the-job, 20% mentoring, 10% formacion\n5. Milestones: checkpoints verificables cada 30 dias\n6. Support: que necesita de ti como lider\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- 70-20-10: la mayoria del desarrollo ocurre trabajando\n- Strengths-based: potenciar fortalezas > arreglar debilidades\n- Stretch assignments: proyectos que lo saquen de su zona de comfort\n- Regular check-ins: cada 2 semanas, no cada 6 meses\n\n--- C | CRITERIO ---\n\nFormato: plan de desarrollo + milestones + check-in schedule.\nTono: coaching, orientado al crecimiento.\nAudiencia: el miembro del equipo.\nAccion: co-crear el plan en el proximo 1:1.\n\n[checklist]\n- [ ] El assessment es honesto y basado en datos\n- [ ] Los goals son del individuo (no tuyos)\n- [ ] Las acciones son 70% on-the-job\n- [ ] Los milestones son cada 30 dias",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "aprendizaje_skill_stack_personal",
    "label_title": "Skill Stack Personal",
    "category": "aprendizaje",
    "type": "spec",
    "content": "[inputs]\n- SKILLS_ACTUALES: {{SKILLS_ACTUALES}} > Tus habilidades principales\n- INDUSTRIA: {{INDUSTRIA}} > Tu industria o mercado\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar tu skill stack personal: la combinacion unica de habilidades que te hace invaluable.\n\n--- P | PEDIDO ---\n\nArquetipo: Career Strategist con experiencia en personal skill stacking y competitive positioning para profesionales.\n\nSkill Stack:\n1. Core skills: 2-3 habilidades donde eres top 20%\n2. Adjacent skills: 2-3 complementarias que multiplican tu core\n3. Unique combination: que hace UNICA tu combinacion\n4. Market value: cuanto vale tu stack en el mercado\n5. Gap: que habilidad agregaria mas valor si la dominaras\n6. Plan: como cerrar ese gap en 90 dias\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Scott Adams: no ser el #1 en 1 cosa, sino top 25% en 3 que se combinan unicamente\n- T-shaped: profundo en 1-2, ancho en varias\n- Market-driven: el stack debe resolver problemas que pagan\n- Combinacion > especializacion: el valor esta en la interseccion\n\n--- C | CRITERIO ---\n\nFormato: mapa de skill stack + gap + plan de 90 dias.\nTono: estrategico-personal.\nAudiencia: tu mismo.\nAccion: identificar y empezar a cerrar el gap #1.\n\n[checklist]\n- [ ] Los core skills estan validados (no solo autopercepcion)\n- [ ] La combinacion unica esta articulada\n- [ ] El gap esta priorizado por valor de mercado\n- [ ] El plan de 90 dias es ejecutable",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "aprendizaje_zettelkasten_sistema",
    "label_title": "Zettelkasten Sistema",
    "category": "aprendizaje",
    "type": "spec",
    "content": "[inputs]\n- HERRAMIENTA: {{HERRAMIENTA}} > Herramienta de notas elegida\n- OBJETIVO: {{OBJETIVO}} > Para que quieres el sistema (investigacion, escritura, proyectos)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara implementar un sistema Zettelkasten de notas que convierta tu lectura en conocimiento conectado y reutilizable.\n\n--- P | PEDIDO ---\n\nArquetipo: Knowledge Management Practitioner con experiencia en Zettelkasten y systems de personal knowledge management.\n\nZettelkasten:\n1. Herramienta: Obsidian, Notion, o fisico\n2. Tipos de nota: fleeting, literature, permanent\n3. Conexiones: como linkar notas entre si\n4. Naming: convention para titulos de notas\n5. Workflow: de la lectura a la nota permanente\n6. Review: ritual semanal de conexion de notas\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Niklas Luhmann Zettelkasten: notas atomicas, densamente conectadas\n- Atomic notes: 1 idea por nota, en tus propias palabras\n- Links > folders: las conexiones son mas valiosas que las categorias\n- Write to think: la nota es pensamiento, no copia\n\n--- C | CRITERIO ---\n\nFormato: setup guide + workflow + templates de nota.\nTono: pedagogico.\nAudiencia: profesional que lee mucho pero retiene poco.\nAccion: crear las primeras 10 notas permanentes.\n\n[checklist]\n- [ ] Los 3 tipos de nota estan diferenciados\n- [ ] El workflow de lectura-a-nota es claro\n- [ ] Las conexiones entre notas estan promovidas\n- [ ] El review semanal esta calendarizado",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "negociacion_contrato_revisar",
    "label_title": "Contrato Revisar",
    "category": "negociacion",
    "type": "spec",
    "content": "[inputs]\n- CONTRATO: {{CONTRATO}} > Tipo de contrato o pega el texto\n- ROL: {{ROL}} > Tu rol (vendedor, comprador, empleado, freelancer)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara revisar un contrato e identificar riesgos, clausulas desfavorables y puntos de negociacion antes de firmar.\n\n--- P | PEDIDO ---\n\nArquetipo: Contract Analyst con experiencia en revision de contratos comerciales para pymes y freelancers.\n\nRevision de contrato:\n1. Terminos clave: precio, alcance, duracion, renovacion\n2. Red flags: clausulas desfavorables o abusivas\n3. Missing clauses: que deberia estar y no esta\n4. Negociables: clausulas que puedes intentar cambiar\n5. Non-negotiables: clausulas que debes aceptar o rechazar\n6. Counter-proposal: redaccion alternativa para los puntos criticos\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Risk-focused: leer buscando que puede salir mal\n- Balance check: el contrato es equilibrado o favorece a una parte?\n- Exit clauses: siempre verificar como se sale\n- Get advice: para montos grandes, consultar abogado\n\n--- C | CRITERIO ---\n\nFormato: analisis de contrato + red flags + counter-proposals.\nTono: analitico, protector.\nAudiencia: quien va a firmar.\nAccion: enviar counter-proposal antes de firmar.\n\n[checklist]\n- [ ] Los terminos clave estan extraidos\n- [ ] Los red flags estan senalados con explicacion\n- [ ] Las clausulas faltantes estan identificadas\n- [ ] Los counter-proposals estan redactados",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "creatividad_brainstorm_100_ideas",
    "label_title": "Brainstorm 100 Ideas",
    "category": "creatividad",
    "type": "spec",
    "content": "[inputs]\n- DESAFIO: {{DESAFIO}} > Problema u oportunidad\n- RESTRICCIONES: {{RESTRICCIONES}} > (opcional) Restricciones conocidas\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara generar 100 ideas en 30 minutos usando tecnicas de ideacion forzada. La cantidad produce calidad — las mejores ideas aparecen despues de la idea #50.\n\n--- P | PEDIDO ---\n\nArquetipo: Facilitador de Ideacion con experiencia en brainstorming de alto volumen para equipos de innovacion.\n\nBrainstorm 100:\n1. Desafio: reformular como pregunta HMW (How Might We)\n2. Warmup: 10 ideas en 3 min (sin filtro)\n3. Tecnicas: random word, worst idea, reverse, SCAMPER\n4. Volumen: 100 ideas en 30 min (no evaluar mientras generas)\n5. Cluster: agrupar por afinidad\n6. Select top 10: evaluar por viabilidad × innovacion × impacto\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Quantity > quality: evaluar despues, no durante\n- Build on ideas: 'yes, and...' (no 'yes, but...')\n- Wild ideas welcome: las ideas absurdas inspiran las geniales\n- Post-it method: 1 idea per note, no censurar\n\n--- C | CRITERIO ---\n\nFormato: 100 ideas + clusters + top 10 evaluadas.\nTono: energetico, sin filtro.\nAudiencia: equipo creativo.\nAccion: prototipar la idea #1.\n\n[checklist]\n- [ ] 100 ideas generadas (no 20)\n- [ ] Las tecnicas de ideacion estan aplicadas\n- [ ] Los clusters revelan patrones\n- [ ] El top 10 esta evaluado con criterios",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "bienestar_gestion_estres_agudo",
    "label_title": "Gestion Estres Agudo",
    "category": "bienestar",
    "type": "spec",
    "content": "[inputs]\n- CONTEXTO: {{CONTEXTO}} > (opcional) Tipo de situaciones que te estresan\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara manejar un episodio de estres agudo en tiempo real con un protocolo de 5 minutos. No puedes eliminar el estres, pero puedes cambiar tu respuesta.\n\n--- P | PEDIDO ---\n\nArquetipo: Psicologo del Rendimiento con experiencia en gestion de estres para atletas y ejecutivos bajo presion.\n\nProtocolo anti-estres (5 min):\n1. Parar: reconocer que estas en estres (1 min)\n2. Respirar: 4-7-8 breathing (inhala 4, sostiene 7, exhala 8) x3 (1 min)\n3. Nombrar: que emocion exacta siento? ponerle nombre reduce intensidad 50% (1 min)\n4. Reframe: esto es una amenaza o un desafio? (1 min)\n5. Accion: cual es la 1 cosa mas util que puedo hacer AHORA? (1 min)\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Physiological first: el cuerpo antes que la mente\n- Name it to tame it: nombrar la emocion reduce su poder\n- Reframe: amenaza > desafio cambia la respuesta fisiologica\n- Tiny action: 1 paso util rompe la paralisis\n\n--- C | CRITERIO ---\n\nFormato: protocolo de 5 min memorizable.\nTono: calmo, directo.\nAudiencia: profesional bajo presion.\nAccion: memorizar y usar la proxima vez que sientas estres agudo.\n\n[checklist]\n- [ ] Los 5 pasos caben en 5 minutos reales\n- [ ] La tecnica de respiracion es precisa\n- [ ] El reframe es practico (no motivacional)\n- [ ] La accion es 1 y es ejecutable inmediatamente",
    "paramCount": 2,
    "keywords": []
  },
  {
    "id": "estrategia_north_star_metric",
    "label_title": "North Star Metric",
    "category": "estrategia",
    "type": "spec",
    "content": "[inputs]\n- PRODUCTO: {{PRODUCTO}} > Producto o servicio\n- VALOR: {{VALOR}} > Que valor entregas a tu usuario\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara definir tu North Star Metric: la unica metrica que mejor captura el valor que entregas. Si solo pudieras medir 1 cosa, que seria?\n\n--- P | PEDIDO ---\n\nArquetipo: Growth Strategist con experiencia en definicion de North Star Metrics para startups y equipos de producto.\n\nNorth Star Metric:\n1. Valor: que valor real entregas a tu usuario/cliente\n2. Candidatas: 3-5 metricas que podrian ser la North Star\n3. Criterios: cual refleja mejor valor + es accionable + es medible\n4. Input metrics: que palancas mueven la North Star\n5. Dashboard: como visualizar y monitorear\n6. Cadencia: cada cuanto revisar y recalibrar\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- 1 metric that matters most: no 10 KPIs, 1 North Star\n- Value-based: la metrica refleja valor PARA EL USUARIO, no para ti\n- Leading > lagging: preferir metricas que predicen, no que reportan\n- Input metrics: las palancas que puedes accionar\n\n--- C | CRITERIO ---\n\nFormato: North Star + input metrics + dashboard.\nTono: estrategico.\nAudiencia: equipo de producto/estrategia.\nAccion: implementar el tracking.\n\n[checklist]\n- [ ] La North Star refleja valor para el usuario\n- [ ] Las input metrics son accionables\n- [ ] La seleccion esta justificada vs alternativas\n- [ ] La cadencia de revision esta definida",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "estrategia_competitive_moat",
    "label_title": "Competitive Moat",
    "category": "estrategia",
    "type": "spec",
    "content": "[inputs]\n- EMPRESA: {{EMPRESA}} > Tu empresa o producto\n- COMPETIDORES: {{COMPETIDORES}} > Competidores principales\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara identificar y fortalecer tu ventaja competitiva sostenible. Sin moat, cualquier exito es temporal.\n\n--- P | PEDIDO ---\n\nArquetipo: Estratega Competitivo con experiencia en analisis de moats para empresas de tecnologia y servicios.\n\nCompetitive Moat:\n1. Moat actual: que te protege de la competencia\n2. Tipo: network effects, switching costs, brand, scale, IP, data\n3. Durabilidad: cuanto tiempo resiste sin inversion\n4. Amenazas: que podria erosionar tu moat\n5. Fortalecimiento: como hacer el moat mas profundo\n6. Plan: 3 acciones para fortalecer el moat este trimestre\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Buffett moat analysis: wide/narrow/none\n- Moat types: 7 tipos fundamentales\n- Dynamic moats: los moats se erosionan si no se fortalecen\n- Compound moats: multiples moats juntos son mas fuertes\n\n--- C | CRITERIO ---\n\nFormato: analisis de moat + plan de fortalecimiento.\nTono: estrategico.\nAudiencia: equipo de estrategia.\nAccion: implementar las 3 acciones.\n\n[checklist]\n- [ ] El moat actual esta identificado con evidencia\n- [ ] Las amenazas son realistas\n- [ ] El plan tiene 3 acciones concretas\n- [ ] Las acciones son ejecutables este trimestre",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "meta_prompt_chain_disenar",
    "label_title": "Prompt Chain Disenar",
    "category": "meta",
    "type": "spec",
    "content": "[inputs]\n- OUTPUT: {{OUTPUT}} > Entregable final de la cadena\n- HERRAMIENTA: {{HERRAMIENTA}} > (opcional) Herramienta IA para ejecutar\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar una cadena de prompts que produzca entregables complejos en pasos simples. El chaining es la programacion del prompting.\n\n--- P | PEDIDO ---\n\nArquetipo: Prompt Chain Architect con experiencia en diseno de pipelines de prompts para automatizacion de entregables complejos.\n\nPrompt Chain:\n1. Output final: que produce la cadena completa\n2. Descomposicion: pasos simples que producen el output complejo\n3. Prompt por paso: input > instruccion > output esperado\n4. Handoff: como el output de cada paso alimenta el siguiente\n5. Quality gate: donde validar antes de continuar\n6. Error recovery: que hacer si un paso falla\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Decompose first: el output complejo = suma de outputs simples\n- Clean handoffs: cada output es un input limpio para el siguiente\n- Gate-driven: no avanzar si un paso es subpar\n- Modular: cada prompt funciona solo Y en cadena\n\n--- C | CRITERIO ---\n\nFormato: diagrama de chain + prompt por paso + gates.\nTono: tecnico.\nAudiencia: prompt engineer.\nAccion: implementar la cadena.\n\n[checklist]\n- [ ] El output final esta claro\n- [ ] Cada paso tiene input/output definidos\n- [ ] Los quality gates previenen errores en cascada\n- [ ] El error recovery esta disenado",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "meta_excellence_rubric_crear",
    "label_title": "Excellence Rubric Crear",
    "category": "meta",
    "type": "spec",
    "content": "[inputs]\n- TIPO_OUTPUT: {{TIPO_OUTPUT}} > Tipo de output que evaluas regularmente\n- ESTANDAR: {{ESTANDAR}} > Nivel de calidad objetivo\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear una rubrica de excelencia personalizada que eleve la calidad de tus outputs de IA. La rubrica es el estandar — sin estandar, todo parece bueno.\n\n--- P | PEDIDO ---\n\nArquetipo: Quality Standards Designer con experiencia en diseno de rubricas de evaluacion para contenido y entregables profesionales.\n\nRubrica de excelencia:\n1. Dimensiones: 5-8 criterios de calidad relevantes para TU tipo de output\n2. Escala: 1-10 con descriptor por nivel (que es 3, que es 7, que es 10)\n3. Pesos: importancia relativa por dimension\n4. Benchmark: ejemplo de output 10/10 vs 5/10\n5. Speed: aplicable en <3 minutos\n6. Evolution: como mejorar la rubrica con el tiempo\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Custom > generic: la rubrica debe ser para TU tipo de trabajo\n- Descriptors matter: '7' sin descriptor es subjetivo\n- Calibrate: evaluar 5 outputs reales para afinar la rubrica\n- Evolve: cada trimestre, ajustar pesos y descriptors\n\n--- C | CRITERIO ---\n\nFormato: rubrica + benchmark examples + guia de calibracion.\nTono: tecnico.\nAudiencia: tu mismo y tu equipo.\nAccion: evaluar los proximos 5 outputs con esta rubrica.\n\n[checklist]\n- [ ] Las dimensiones son relevantes para tu trabajo\n- [ ] Los descriptors por nivel son claros\n- [ ] El benchmark tiene ejemplo de 10/10 y 5/10\n- [ ] La rubrica se aplica en <3 minutos",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "automatizacion_google_sheets_formulas",
    "label_title": "Google Sheets Formulas",
    "category": "automatizacion",
    "type": "spec",
    "content": "[inputs]\n- PROCESO: {{PROCESO}} > Proceso manual en Sheets\n- DATOS: {{DATOS}} > Tipo de datos que manejas\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear formulas y automatizaciones avanzadas en Google Sheets que reemplacen procesos manuales.\n\n--- P | PEDIDO ---\n\nArquetipo: Sheets Power User con experiencia en automatizacion de procesos con formulas avanzadas, Apps Script y connected sheets.\n\nSheets automation:\n1. Proceso manual a automatizar\n2. Formulas: QUERY, IMPORTRANGE, ARRAYFORMULA, VLOOKUP/INDEX-MATCH\n3. Conditional formatting: alertas visuales automaticas\n4. Data validation: prevenir errores de entrada\n5. Apps Script: si las formulas no alcanzan\n6. Template: hoja lista para replicar\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Formula-first: resolver con formulas antes de Apps Script\n- QUERY function: SQL dentro de Sheets\n- ARRAYFORMULA: 1 formula para toda la columna\n- Template it: si funciona, hacerlo replicable\n\n--- C | CRITERIO ---\n\nFormato: hoja modelo + formulas documentadas.\nTono: tecnico-practico.\nAudiencia: profesional que vive en Sheets.\nAccion: implementar las formulas.\n\n[checklist]\n- [ ] Las formulas resuelven el proceso manual\n- [ ] La documentacion explica cada formula\n- [ ] La data validation previene errores\n- [ ] El template es replicable",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "automatizacion_notion_database_workflow",
    "label_title": "Notion Database Workflow",
    "category": "automatizacion",
    "type": "spec",
    "content": "[inputs]\n- EQUIPO: {{EQUIPO}} > Tamano y tipo de equipo\n- PROCESOS: {{PROCESOS}} > Procesos a gestionar en Notion\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar un workflow automatizado en Notion usando databases, relations, rollups y automations.\n\n--- P | PEDIDO ---\n\nArquetipo: Notion Power User con experiencia en diseno de workspaces productivos para equipos de 5-50 personas.\n\nNotion workflow:\n1. Database structure: properties, types, relations\n2. Views: tabla, kanban, calendario, galeria por use case\n3. Templates: entries pre-configurados para creacion rapida\n4. Relations: como se conectan las databases entre si\n5. Rollups: metricas calculadas automaticamente\n6. Automations: triggers y acciones automaticas\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Database-first: todo es una database (no paginas sueltas)\n- Relations > duplication: conectar, no copiar\n- Views per audience: cada persona ve lo que necesita\n- Templates: estandarizar la creacion de entries\n\n--- C | CRITERIO ---\n\nFormato: spec de workspace + databases + views + automations.\nTono: tecnico.\nAudiencia: admin de Notion del equipo.\nAccion: crear la primera database.\n\n[checklist]\n- [ ] Las databases tienen structure definida\n- [ ] Las views cubren los use cases principales\n- [ ] Las relations conectan sin duplicar\n- [ ] Las automations reducen trabajo manual",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "automatizacion_calendar_blocking_auto",
    "label_title": "Calendar Blocking Auto",
    "category": "automatizacion",
    "type": "spec",
    "content": "[inputs]\n- HORARIO: {{HORARIO}} > Tu horario laboral\n- PRIORIDADES: {{PRIORIDADES}} > Tus 3 prioridades semanales recurrentes\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara automatizar el time blocking en tu calendario basado en prioridades y energia.\n\n--- P | PEDIDO ---\n\nArquetipo: Calendar Optimization Specialist con experiencia en diseno de calendarios productivos para ejecutivos.\n\nCalendar blocking:\n1. Bloques recurrentes: deep work, batches, reuniones, buffer\n2. Reglas de proteccion: que bloques son innegociables\n3. Auto-scheduling: criterios para mover lo flexible\n4. Color coding: visual rapido del tipo de actividad\n5. Weekly prep: 15 min domingos para planificar la semana\n6. Emergency protocol: cuando romper los bloques\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Block before fill: primero los bloques de deep work, luego lo demas\n- Color = type: visual instantaneo de como se ve la semana\n- Buffer zones: 15 min entre reuniones consecutivas\n- Say no by default: el calendario lleno es un no automatico\n\n--- C | CRITERIO ---\n\nFormato: template de semana tipo + reglas + color coding.\nTono: practico.\nAudiencia: profesional con agenda saturada.\nAccion: bloquear la proxima semana hoy.\n\n[checklist]\n- [ ] Los bloques de deep work estan protegidos\n- [ ] El color coding es consistente\n- [ ] Los buffers entre reuniones estan integrados\n- [ ] El weekly prep cabe en 15 min",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "automatizacion_ai_daily_briefing",
    "label_title": "Ai Daily Briefing",
    "category": "automatizacion",
    "type": "spec",
    "content": "[inputs]\n- FUENTES: {{FUENTES}} > Herramientas de donde sacar info (Calendar, Todoist, Gmail, etc.)\n- SECTOR: {{SECTOR}} > Tu sector para noticias relevantes\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara configurar un briefing diario automatico generado por IA que te prepare para el dia en 2 minutos.\n\n--- P | PEDIDO ---\n\nArquetipo: AI Productivity Architect con experiencia en diseno de briefings automaticos para C-levels.\n\nDaily AI Briefing:\n1. Calendar: reuniones del dia con contexto\n2. Tasks: top 3 prioridades pendientes\n3. Emails: resumen de los 5 mas importantes\n4. News: 3 noticias relevantes de tu sector\n5. Reminder: 1 accion pendiente de ayer\n6. Delivery: donde y cuando recibes el briefing\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Aggregation: consolidar multiples fuentes en 1 briefing\n- Priority-based: solo lo que importa, no todo\n- 2-minute read: si toma mas, es demasiado\n- Actionable: cada item con accion clara\n\n--- C | CRITERIO ---\n\nFormato: spec del briefing + fuentes + delivery.\nTono: operativo.\nAudiencia: profesional que quiere empezar el dia informado.\nAccion: configurar el briefing.\n\n[checklist]\n- [ ] El briefing se lee en 2 minutos\n- [ ] Las fuentes cubren calendario, tareas y email\n- [ ] La entrega es automatica (no manual)\n- [ ] Los items son accionables",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "stack_migrar_herramienta",
    "label_title": "Migrar Herramienta",
    "category": "stack",
    "type": "spec",
    "content": "[inputs]\n- HERRAMIENTA_VIEJA: {{HERRAMIENTA_VIEJA}} > Herramienta actual\n- HERRAMIENTA_NUEVA: {{HERRAMIENTA_NUEVA}} > Herramienta destino\n- DATOS: {{DATOS}} > Tipo de datos a migrar\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara migrar de una herramienta a otra sin perder datos, flujos ni productividad.\n\n--- P | PEDIDO ---\n\nArquetipo: Migration Specialist con experiencia en migraciones de herramientas para equipos sin downtime.\n\nPlan de migracion:\n1. Inventario: que datos/flujos migrar\n2. Mapping: equivalencias entre herramienta vieja y nueva\n3. Data export: como extraer los datos\n4. Data import: como importar en la nueva\n5. Testing: verificar que todo migro correctamente\n6. Cutover: cuando y como hacer el switch\n7. Rollback: plan B si algo sale mal\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Map before migrate: saber que se mueve y a donde\n- Test with subset: migrar 10% primero\n- Parallel run: usar ambas 1 semana antes de cortar\n- Communicate: avisar al equipo antes, durante y despues\n\n--- C | CRITERIO ---\n\nFormato: plan de migracion + mapping + timeline.\nTono: operativo.\nAudiencia: admin de herramientas.\nAccion: ejecutar la migracion.\n\n[checklist]\n- [ ] El mapping de equivalencias esta completo\n- [ ] El test con subset fue exitoso\n- [ ] El rollback plan existe\n- [ ] La comunicacion al equipo esta planificada",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "stack_evaluar_ia_herramienta",
    "label_title": "Evaluar Ia Herramienta",
    "category": "stack",
    "type": "spec",
    "content": "[inputs]\n- HERRAMIENTA: {{HERRAMIENTA}} > Herramienta IA a evaluar\n- PROBLEMA: {{PROBLEMA}} > Problema que deberia resolver\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara evaluar una nueva herramienta de IA antes de adoptarla. No toda herramienta que brilla es oro.\n\n--- P | PEDIDO ---\n\nArquetipo: AI Tool Evaluator con experiencia en assessment de herramientas de IA para adopcion empresarial.\n\nEvaluacion de herramienta IA:\n1. Problema: que problema resuelve (no que features tiene)\n2. Test: probar con 3 tareas reales de tu trabajo\n3. Quality: comparar output con tu estandar\n4. Cost: precio total (licencia + tiempo + integracion)\n5. ROI: horas ahorradas vs costo mensual\n6. Verdict: adoptar / trial 30 dias / descartar\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Problem-first: la herramienta resuelve TU problema?\n- Real tasks: probar con trabajo real, no con demos\n- 80% rule: si resuelve el 80% del problema, es suficiente\n- TCO: total cost incluyendo tiempo de aprendizaje\n\n--- C | CRITERIO ---\n\nFormato: evaluacion + test results + recomendacion.\nTono: analitico.\nAudiencia: decision-maker.\nAccion: decidir adoptar o descartar.\n\n[checklist]\n- [ ] El problema esta definido antes de evaluar\n- [ ] Las 3 tareas de test son reales\n- [ ] El costo total esta calculado\n- [ ] El veredicto tiene justificacion",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "stack_keyboard_shortcuts_mapear",
    "label_title": "Keyboard Shortcuts Mapear",
    "category": "stack",
    "type": "spec",
    "content": "[inputs]\n- HERRAMIENTAS: {{HERRAMIENTAS}} > Herramientas principales\n- DISPOSITIVO: {{DISPOSITIVO}} > Mac o Windows\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara mapear y optimizar atajos de teclado en tus herramientas principales. Cada click que reemplazas con un atajo son 2 segundos × 50 veces/dia = 100 segundos libres.\n\n--- P | PEDIDO ---\n\nArquetipo: Keyboard Efficiency Expert con experiencia en optimizacion de workflows basados en atajos para power users.\n\nKeyboard Shortcuts:\n1. Top 10 acciones mas frecuentes por herramienta\n2. Atajos existentes para cada accion\n3. Custom shortcuts: para acciones sin atajo nativo\n4. Cheat sheet: imprimible con los atajos esenciales\n5. Practice plan: como memorizar 3 nuevos atajos por semana\n6. Cross-app consistency: mismos atajos donde sea posible\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Frequency × time: priorizar atajos por uso real\n- 3 per week: no aprender 50 de golpe\n- Muscle memory: se necesitan 21 repeticiones para automatizar\n- Cheat sheet visible: pegarlo al monitor 2 semanas\n\n--- C | CRITERIO ---\n\nFormato: cheat sheet por herramienta + plan de aprendizaje.\nTono: practico.\nAudiencia: profesional que quiere ser mas rapido.\nAccion: aprender los 3 primeros atajos hoy.\n\n[checklist]\n- [ ] Los atajos cubren el 80% de acciones frecuentes\n- [ ] El cheat sheet es imprimible\n- [ ] El plan de aprendizaje es progresivo (3/semana)\n- [ ] Los custom shortcuts estan configurados",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "stack_digital_minimalism_plan",
    "label_title": "Digital Minimalism Plan",
    "category": "stack",
    "type": "spec",
    "content": "[inputs]\n- HERRAMIENTAS: {{HERRAMIENTAS}} > Todas tus herramientas y apps actuales\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara reducir tu stack digital al minimo viable sin perder funcionalidad. Menos herramientas = menos distracciones = mas deep work.\n\n--- P | PEDIDO ---\n\nArquetipo: Digital Minimalism Coach con la filosofia de Cal Newport y experiencia en simplificacion de stacks para profesionales.\n\nDigital Minimalism:\n1. Inventario completo: apps, suscripciones, plugins, extensiones\n2. Joy/value test: cada herramienta aporta valor real o es habito?\n3. Eliminacion: herramientas que puedes dejar sin impacto\n4. Consolidacion: 2-3 herramientas que reemplazan 7-8\n5. Trial: 30 dias sin las eliminadas para verificar\n6. Savings: dinero y atencion recuperados\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Cal Newport: solo las herramientas que soportan tus valores\n- 30-day trial: eliminar y ver si las extanas\n- Attention cost: cada app tiene un costo de atencion oculto\n- Consolidate: preferir 1 herramienta que haga 3 cosas vs 3 separadas\n\n--- C | CRITERIO ---\n\nFormato: inventario + plan de eliminacion + savings.\nTono: reflexivo-practico.\nAudiencia: profesional con app fatigue.\nAccion: eliminar las primeras 3 apps innecesarias.\n\n[checklist]\n- [ ] El inventario es completo\n- [ ] El test de valor es honesto\n- [ ] El trial de 30 dias esta planificado\n- [ ] Los savings estan cuantificados",
    "paramCount": 2,
    "keywords": []
  },
  {
    "id": "engine_email_responder_automatico",
    "label_title": "Email Responder Automatico",
    "category": "engine",
    "type": "spec",
    "content": "[inputs]\n- VOLUMEN: {{VOLUMEN}} > Emails diarios\n- TIPOS: {{TIPOS}} > Tipos de email mas frecuentes\n- TONO: {{TONO}} > Tu tono de email\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear un engine que genere borradores de respuesta a emails basado en tu estilo y contexto.\n\n--- P | PEDIDO ---\n\nArquetipo: Email AI Automation Designer con experiencia en engines de respuesta automatica para ejecutivos.\n\nEmail Responder:\n1. Brand Voice: tu estilo de email (tono, largo, firma)\n2. Templates por tipo: aceptar, declinar, delegar, informar, solicitar\n3. Context injection: como el engine accede al historial\n4. Draft > auto-send: siempre revision humana antes de enviar\n5. Learning: como mejorar con cada correccion\n6. Integration: como conectar con tu email\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Draft mode: el engine sugiere, tu apruebas\n- Template-based: types frecuentes pre-configurados\n- Voice consistency: cada borrador suena como tu\n- Human-in-the-loop: siempre revision antes de enviar\n\n--- C | CRITERIO ---\n\nFormato: spec del engine + templates + workflow.\nTono: tecnico.\nAudiencia: profesional con alto volumen de email.\nAccion: configurar el primer template.\n\n[checklist]\n- [ ] Los templates cubren los 5 tipos mas comunes\n- [ ] La Brand Voice esta capturada\n- [ ] El human review esta integrado (no auto-send)\n- [ ] El learning loop esta disenado",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "engine_propuesta_generator",
    "label_title": "Propuesta Generator",
    "category": "engine",
    "type": "spec",
    "content": "[inputs]\n- SERVICIO: {{SERVICIO}} > Servicio o producto que vendes\n- CLIENTE_TIPO: {{CLIENTE_TIPO}} > Perfil de cliente tipico\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear un engine que genere propuestas comerciales semi-automaticamente a partir de inputs estructurados.\n\n--- P | PEDIDO ---\n\nArquetipo: Sales Enablement Architect con experiencia en automatizacion de propuestas para equipos de ventas B2B.\n\nProposal Generator:\n1. Inputs requeridos: cliente, problema, solucion, pricing\n2. Template base: estructura de propuesta estandar\n3. Content blocks: secciones reutilizables por tipo de cliente/servicio\n4. Personalizacion: que se customiza por propuesta\n5. Quality gate: checklist de revision antes de enviar\n6. Metrics: win rate por tipo de propuesta\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Template × content blocks = propuesta personalizada\n- 80% reutilizable, 20% custom por propuesta\n- Time target: de input a draft en 30 min (no 3 dias)\n- Win rate tracking: que tipo de propuesta convierte mas\n\n--- C | CRITERIO ---\n\nFormato: spec del engine + template + content blocks.\nTono: comercial-tecnico.\nAudiencia: equipo de ventas.\nAccion: crear el template base.\n\n[checklist]\n- [ ] El template cubre la estructura completa\n- [ ] Los content blocks son reutilizables\n- [ ] El time-to-draft es <30 min\n- [ ] El quality gate tiene checklist",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "engine_meeting_summarizer",
    "label_title": "Meeting Summarizer",
    "category": "engine",
    "type": "spec",
    "content": "[inputs]\n- HERRAMIENTA: {{HERRAMIENTA}} > Herramienta de grabacion/transcripcion\n- FRECUENCIA: {{FRECUENCIA}} > Reuniones por semana\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear un engine que procese grabaciones o notas de reuniones y produzca resumen + action items automaticamente.\n\n--- P | PEDIDO ---\n\nArquetipo: Meeting Intelligence Designer con experiencia en engines de procesamiento de reuniones para equipos remotos.\n\nMeeting Summarizer:\n1. Input: transcripcion, grabacion, o notas manuales\n2. Extraction: decisiones, action items, preguntas abiertas\n3. Format: Quad-Doc (decisiones + tareas + riesgos + keywords)\n4. Distribution: a quien enviar que parte del resumen\n5. Integration: como conectar con task manager\n6. SLA: resumen entregado en <2h post-reunion\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Quad-Doc: 4 secciones estandar para toda reunion\n- Action items format: VERBO + OBJETO + RESPONSABLE + FECHA\n- Auto-distribute: cada participante recibe sus action items\n- 2-hour SLA: si tarda mas, pierde valor\n\n--- C | CRITERIO ---\n\nFormato: spec del engine + Quad-Doc template + workflow.\nTono: operativo.\nAudiencia: equipo.\nAccion: procesar la proxima reunion con el engine.\n\n[checklist]\n- [ ] El Quad-Doc cubre decisiones, tareas, riesgos, keywords\n- [ ] Los action items tienen responsable y fecha\n- [ ] La distribucion es automatica\n- [ ] El SLA de 2h es alcanzable",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "engine_data_storytelling_auto",
    "label_title": "Data Storytelling Auto",
    "category": "engine",
    "type": "spec",
    "content": "[inputs]\n- DATOS: {{DATOS}} > Tipo de datos que procesas\n- AUDIENCIA: {{AUDIENCIA}} > Quien lee los reportes\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear un engine que transforme datos crudos en narrativas ejecutivas automaticamente.\n\n--- P | PEDIDO ---\n\nArquetipo: Data Narrative Engineer con experiencia en engines de storytelling automatizado para dashboards y reportes.\n\nData Storytelling Engine:\n1. Input: dataset o metricas\n2. Pattern detection: tendencias, anomalias, comparaciones\n3. Narrative generation: insight en lenguaje natural\n4. Visualization suggestion: grafico optimo por insight\n5. Executive summary: 3 bullets que resumen todo\n6. Call to action: que decision tomar basada en los datos\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Pattern > insight > narrative > action\n- Auto-detect: tendencias, anomalias, cambios significativos\n- Natural language: datos traducidos a oraciones claras\n- Decision-ready: cada narrativa lleva a una accion\n\n--- C | CRITERIO ---\n\nFormato: spec del engine + template de narrativa.\nTono: tecnico.\nAudiencia: equipo de analytics.\nAccion: conectar con el primer dataset.\n\n[checklist]\n- [ ] La deteccion de patrones funciona\n- [ ] Las narrativas son en lenguaje natural\n- [ ] Las visualizaciones son apropiadas\n- [ ] El CTA es accionable",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "solucion_proyecto_integrador_plan",
    "label_title": "Proyecto Integrador Plan",
    "category": "solucion",
    "type": "spec",
    "content": "[inputs]\n- COMPETENCIAS: {{COMPETENCIAS}} > Competencias a demostrar\n- CONTEXTO: {{CONTEXTO}} > Tu contexto profesional real\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar un proyecto integrador que demuestre tus competencias combinadas. El proyecto no es un ejercicio — es tu portafolio viviente.\n\n--- P | PEDIDO ---\n\nArquetipo: Project-Based Learning Designer con experiencia en diseno de proyectos integradores para programas de certificacion.\n\nProyecto integrador:\n1. Objetivo: que competencias demuestra\n2. Scope: alcance realista (4-8 semanas)\n3. Entregables: lista de outputs concretos\n4. Metodologia: como se ejecuta paso a paso\n5. Rubrica: como se evalua\n6. Presentacion: como se presenta ante pares\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Real-world: el proyecto usa un caso tuyo real\n- Multi-competency: integra min. 3 habilidades\n- Portfolio-worthy: el output es presentable profesionalmente\n- Peer review: la presentacion ante pares fortalece\n\n--- C | CRITERIO ---\n\nFormato: plan de proyecto + rubrica + timeline.\nTono: pedagogico-profesional.\nAudiencia: participante del programa.\nAccion: iniciar el proyecto esta semana.\n\n[checklist]\n- [ ] El proyecto integra min. 3 competencias\n- [ ] El scope es realista (4-8 semanas)\n- [ ] Los entregables son concretos y presentables\n- [ ] La rubrica es transparente",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "solucion_portafolio_evidencia",
    "label_title": "Portafolio Evidencia",
    "category": "solucion",
    "type": "spec",
    "content": "[inputs]\n- ROL: {{ROL}} > Tu rol profesional\n- OBJETIVO: {{OBJETIVO}} > Para que es el portafolio (empleo, clientes, certificacion)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear un portafolio de evidencia profesional que demuestre tus capacidades con entregables reales, no con CVs.\n\n--- P | PEDIDO ---\n\nArquetipo: Portfolio Strategist con experiencia en diseno de portafolios profesionales para knowledge workers.\n\nPortafolio de evidencia:\n1. Seleccion: 5-7 entregables que demuestran tus mejores capacidades\n2. Contexto por pieza: que problema, que hiciste, que resultado\n3. Formato: como presentar cada pieza (PDF, link, demo)\n4. Narrativa: la historia que cuenta tu portafolio en su conjunto\n5. Audience-specific: versiones para diferentes audiencias\n6. Update: ritual trimestral de actualizacion\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Quality > quantity: 5 piezas excelentes > 20 mediocres\n- STAR format: Situacion, Tarea, Accion, Resultado\n- Show results: metricas de impacto, no solo descripcion\n- Living portfolio: actualizar cada trimestre\n\n--- C | CRITERIO ---\n\nFormato: portafolio estructurado + narrativa.\nTono: profesional.\nAudiencia: clientes, empleadores, pares.\nAccion: seleccionar las primeras 5 piezas.\n\n[checklist]\n- [ ] Las 5-7 piezas son de alta calidad\n- [ ] Cada pieza tiene contexto + resultado medible\n- [ ] La narrativa general es coherente\n- [ ] El ritual de actualizacion esta calendarizado",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "solucion_caso_real_resolver",
    "label_title": "Caso Real Resolver",
    "category": "solucion",
    "type": "spec",
    "content": "[inputs]\n- PROBLEMA: {{PROBLEMA}} > Problema real de tu trabajo\n- COMPETENCIAS: {{COMPETENCIAS}} > Competencias que quieres aplicar\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara resolver un caso real de tu contexto profesional usando las competencias del programa. La prueba definitiva es resolver TU problema, no uno teorico.\n\n--- P | PEDIDO ---\n\nArquetipo: Case Method Facilitator con experiencia en Harvard Case Method adaptado a problemas profesionales reales.\n\nCaso real:\n1. Definir el problema: en tu trabajo, que necesitas resolver\n2. Diagnostico: analizar la situacion actual con frameworks\n3. Opciones: 3 alternativas de solucion evaluadas\n4. Solucion: la mejor opcion con plan de implementacion\n5. Ejecucion: implementar (o al menos prototipar)\n6. Resultado: medir impacto vs baseline\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Your problem: el caso es tu realidad, no una simulacion\n- Framework-driven: usar modelos mentales y herramientas del programa\n- Evidence of impact: medir antes/despues\n- Documented: el proceso queda como referencia\n\n--- C | CRITERIO ---\n\nFormato: caso documentado con diagnostico, solucion, resultado.\nTono: profesional, basado en evidencia.\nAudiencia: pares y evaluadores.\nAccion: resolver el caso y documentar.\n\n[checklist]\n- [ ] El problema es real (no inventado)\n- [ ] Los frameworks estan aplicados\n- [ ] La solucion fue implementada (o prototipada)\n- [ ] El impacto esta medido",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "decision_eisenhower_priorizar",
    "label_title": "Eisenhower Priorizar",
    "category": "decision",
    "type": "spec",
    "content": "[inputs]\n- TAREAS: {{TAREAS}} > Lista de tareas pendientes\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara priorizar tareas usando la Matriz Eisenhower: urgente/importante. Lo urgente grita, lo importante susurra — la matriz te devuelve la perspectiva.\n\n--- P | PEDIDO ---\n\nArquetipo: Productivity Strategist con experiencia en priorizacion para ejecutivos con agendas sobrecargadas.\n\nMatriz Eisenhower:\n1. Listar todas las tareas pendientes\n2. Clasificar: urgente+importante (hacer), importante+no urgente (planificar), urgente+no importante (delegar), ni urgente ni importante (eliminar)\n3. Accion por cuadrante\n4. Top 3 del cuadrante hacer\n5. Schedule para cuadrante planificar\n6. Delegacion para cuadrante delegar\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Eisenhower Matrix: 2×2 urgencia × importancia\n- Important = aligned with long-term goals\n- Urgent = has a deadline\n- Q2 (important, not urgent) is where the gold is\n\n--- C | CRITERIO ---\n\nFormato: matriz visual + acciones por cuadrante.\nTono: directo.\nAudiencia: profesional abrumado.\nAccion: ejecutar el top 3 de 'hacer'.\n\n[checklist]\n- [ ] Todas las tareas estan clasificadas\n- [ ] El cuadrante 'hacer' tiene max 3 tareas\n- [ ] El cuadrante 'planificar' tiene schedule\n- [ ] El cuadrante 'eliminar' libera tiempo",
    "paramCount": 2,
    "keywords": []
  },
  {
    "id": "decision_cost_benefit_rapido",
    "label_title": "Cost Benefit Rapido",
    "category": "decision",
    "type": "spec",
    "content": "[inputs]\n- DECISION: {{DECISION}} > Decision a evaluar\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara hacer un analisis costo-beneficio rapido que permita decidir en 15 minutos.\n\n--- P | PEDIDO ---\n\nArquetipo: Business Analyst con experiencia en analisis de costo-beneficio express para decisiones operativas.\n\nCost-Benefit Express:\n1. Beneficios: listar y cuantificar (tangibles + intangibles)\n2. Costos: listar y cuantificar (directos + indirectos + oportunidad)\n3. Net benefit: beneficios - costos\n4. Payback: cuando se recupera\n5. Risk factor: que podria cambiar el calculo\n6. Go/No-Go\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Quantify everything: incluso intangibles (estimar)\n- Include opportunity cost: que podrias hacer en su lugar\n- Conservative: mejor sorprenderse positivamente\n- 80% accuracy: no buscar perfeccion, buscar direccion\n\n--- C | CRITERIO ---\n\nFormato: tabla costo-beneficio + decision.\nTono: pragmatico.\nAudiencia: decision-maker.\nAccion: decidir.\n\n[checklist]\n- [ ] Los beneficios estan cuantificados\n- [ ] Los costos incluyen oportunidad\n- [ ] El net benefit es claro\n- [ ] El risk factor esta identificado",
    "paramCount": 2,
    "keywords": []
  },
  {
    "id": "decision_6_sombreros_rapido",
    "label_title": "6 Sombreros Rapido",
    "category": "decision",
    "type": "spec",
    "content": "[inputs]\n- DECISION: {{DECISION}} > Decision a analizar\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara analizar una decision desde 6 perspectivas en 15 minutos usando Six Thinking Hats de De Bono.\n\n--- P | PEDIDO ---\n\nArquetipo: Decision Facilitator con experiencia en Six Thinking Hats para equipos de decision.\n\nSix Hats Express:\n1. Blanco: datos puros\n2. Rojo: emociones e intuicion\n3. Negro: riesgos y problemas\n4. Amarillo: beneficios y oportunidades\n5. Verde: alternativas creativas\n6. Azul: conclusion y siguiente paso\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- 2 min por hat: no mas\n- No mixing: cada hat por separado\n- Red hat is valid: las emociones cuentan\n- Blue hat decides: el resumen guia la accion\n\n--- C | CRITERIO ---\n\nFormato: analisis por hat + decision final.\nTono: estructurado.\nAudiencia: decision-maker.\nAccion: tomar la decision.\n\n[checklist]\n- [ ] Los 6 hats estan cubiertos\n- [ ] Cada hat tiene su perspectiva sin mezclar\n- [ ] El hat rojo es honesto\n- [ ] El azul tiene decision clara",
    "paramCount": 2,
    "keywords": []
  },
  {
    "id": "decision_regret_minimization",
    "label_title": "Regret Minimization",
    "category": "decision",
    "type": "spec",
    "content": "[inputs]\n- DECISION: {{DECISION}} > Decision de vida o carrera\n- OPCIONES: {{OPCIONES}} > Opciones que consideras\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara tomar decisiones de vida y carrera usando el Regret Minimization Framework de Jeff Bezos.\n\n--- P | PEDIDO ---\n\nArquetipo: Career Decision Coach con el framework de Bezos para decisiones irreversibles de alto impacto.\n\nRegret Minimization:\n1. Proyectarte a los 80 anos\n2. Mirando hacia atras, de cual opcion me arrepentiria MAS de no haber tomado?\n3. De cual me arrepentiria MENOS?\n4. Que estoy evitando por miedo que no es riesgo real?\n5. Decision basada en minimizar arrepentimiento futuro\n6. Plan de accion\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Long-term lens: la perspectiva de 80 anos elimina el ruido\n- Regret of omission > regret of commission: lamentar no hacer > lamentar hacer\n- Fear audit: separar miedo de riesgo real\n- Action bias: en duda, act\n\n--- C | CRITERIO ---\n\nFormato: analisis de regret + decision + plan.\nTono: reflexivo.\nAudiencia: persona ante decision de vida.\nAccion: decidir y empezar.\n\n[checklist]\n- [ ] La perspectiva de largo plazo esta aplicada\n- [ ] El miedo esta separado del riesgo\n- [ ] La decision minimiza arrepentimiento\n- [ ] El plan de accion es inmediato",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "liderazgo_retrospectiva_equipo",
    "label_title": "Retrospectiva Equipo",
    "category": "liderazgo",
    "type": "spec",
    "content": "[inputs]\n- EQUIPO: {{EQUIPO}} > Tamano del equipo\n- PERIODO: {{PERIODO}} > Periodo a revisar\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara facilitar una retrospectiva de equipo que produzca 1 mejora concreta implementable.\n\n--- P | PEDIDO ---\n\nArquetipo: Agile Coach con experiencia en facilitacion de retrospectivas para equipos de alto rendimiento.\n\nRetrospectiva:\n1. Check-in: como se siente el equipo (1 palabra)\n2. What went well: celebrar 3+ cosas\n3. What didn't: 3+ oportunidades de mejora\n4. Root cause: profundizar en la mejora mas votada\n5. Action: 1 mejora concreta + responsable + fecha\n6. Check-out: energia para el proximo sprint\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Safety first: todos deben poder hablar sin miedo\n- 1 action item: no 10, solo 1 pero que se implemente\n- Celebrate wins: el reconocimiento precede la critica\n- Follow up: verificar en la proxima retro que se implemento\n\n--- C | CRITERIO ---\n\nFormato: guia de facilitacion + template.\nTono: seguro, constructivo.\nAudiencia: equipo.\nAccion: facilitar la retro esta semana.\n\n[checklist]\n- [ ] El check-in mide safety\n- [ ] Los wins estan celebrados\n- [ ] La accion es 1 y tiene responsable\n- [ ] El follow-up esta planificado",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "liderazgo_hiring_scorecard",
    "label_title": "Hiring Scorecard",
    "category": "liderazgo",
    "type": "spec",
    "content": "[inputs]\n- ROL: {{ROL}} > Rol a contratar\n- EQUIPO: {{EQUIPO}} > Equipo al que se suma\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear un scorecard de contratacion que evalúe candidatos con criterios objetivos y reduzca bias.\n\n--- P | PEDIDO ---\n\nArquetipo: Talent Acquisition Strategist con experiencia en hiring frameworks basados en evidencia para empresas tech.\n\nHiring Scorecard:\n1. Role definition: que necesita lograr en los primeros 90 dias\n2. Competencies: 5-7 competencias clave con descriptors\n3. Interview questions: 2 preguntas por competencia (behavioral)\n4. Scoring: escala 1-5 por competencia con calibracion\n5. Culture fit vs add: que aporta al equipo, no si encaja\n6. Debrief: formato de discusion post-entrevista\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Who method: define the outcome, then find the person\n- Behavioral questions: 'Tell me about a time when...'\n- Scorecard > gut feeling: datos sobre intuicion\n- Culture add > culture fit: diversidad fortalece\n\n--- C | CRITERIO ---\n\nFormato: scorecard + preguntas + debrief template.\nTono: profesional.\nAudiencia: hiring manager.\nAccion: usar en la proxima entrevista.\n\n[checklist]\n- [ ] Las competencias son relevantes para los 90 dias\n- [ ] Las preguntas son behavioral\n- [ ] El scoring tiene calibracion\n- [ ] El debrief es estructurado",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "liderazgo_cultura_equipo_disenar",
    "label_title": "Cultura Equipo Disenar",
    "category": "liderazgo",
    "type": "spec",
    "content": "[inputs]\n- EQUIPO: {{EQUIPO}} > Tu equipo\n- ESTADO_ACTUAL: {{ESTADO_ACTUAL}} > Cultura actual (lo bueno y lo malo)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar intencionalmente la cultura de tu equipo en lugar de dejar que se forme por defecto.\n\n--- P | PEDIDO ---\n\nArquetipo: Organizational Culture Designer con experiencia en construccion de culturas de equipo para startups y equipos remotos.\n\nDiseno de cultura:\n1. Valores: 3-5 valores que guian como trabajamos\n2. Behaviors: conductas observables por valor\n3. Rituales: practicas recurrentes que refuerzan la cultura\n4. Norms: reglas no escritas hechas explicitas\n5. Anti-patterns: que comportamientos no toleramos\n6. Onboarding cultural: como se transmite a los nuevos\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Intentional > default: la cultura se disena o se hereda\n- Behaviors > posters: lo que se hace importa mas que lo que se dice\n- Rituals reinforce: los rituales hacen tangible la cultura\n- Model it: el lider modela la cultura, no la declara\n\n--- C | CRITERIO ---\n\nFormato: 1-pager de cultura + rituales + anti-patterns.\nTono: inspirador-practico.\nAudiencia: el equipo.\nAccion: co-crear con el equipo.\n\n[checklist]\n- [ ] Los valores son max 5 y memorables\n- [ ] Cada valor tiene conductas observables\n- [ ] Los rituales estan calendarizados\n- [ ] Los anti-patterns son claros",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "aprendizaje_spaced_repetition",
    "label_title": "Spaced Repetition",
    "category": "aprendizaje",
    "type": "spec",
    "content": "[inputs]\n- MATERIAL: {{MATERIAL}} > Que necesitas recordar\n- HERRAMIENTA: {{HERRAMIENTA}} > (opcional) Herramienta preferida\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar un sistema de repaso espaciado que convierta informacion en conocimiento permanente.\n\n--- P | PEDIDO ---\n\nArquetipo: Learning Scientist con experiencia en spaced repetition y memoria a largo plazo para aprendizaje profesional.\n\nSpaced Repetition:\n1. Material: que necesitas recordar a largo plazo\n2. Formato: flashcards con pregunta/respuesta concisa\n3. Schedule: intervalos de repaso (1d, 3d, 7d, 14d, 30d)\n4. Herramienta: Anki, Brainscape, o manual\n5. Ritual: 10 min diarios de repaso\n6. Metricas: retention rate por tema\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Ebbinghaus curve: olvidamos 80% en 24h sin repaso\n- Active recall > re-reading: preguntar > releer\n- Spacing effect: 5 repasos espaciados > 50 re-lecturas\n- Minimum effective dose: 10 min/dia es suficiente\n\n--- C | CRITERIO ---\n\nFormato: sistema + flashcards iniciales + schedule.\nTono: pedagogico.\nAudiencia: profesional que necesita retener informacion.\nAccion: crear las primeras 20 flashcards.\n\n[checklist]\n- [ ] Las flashcards tienen formato pregunta/respuesta\n- [ ] Los intervalos de repaso estan definidos\n- [ ] El ritual diario cabe en 10 min\n- [ ] Las metricas de retencion se trackean",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "aprendizaje_teach_to_learn",
    "label_title": "Teach To Learn",
    "category": "aprendizaje",
    "type": "spec",
    "content": "[inputs]\n- CONCEPTO: {{CONCEPTO}} > Concepto a aprender ensenando\n- AUDIENCIA: {{AUDIENCIA}} > A quien ensenas\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara aprender ensenando: preparar una mini-sesion de 15 min que consolide tu conocimiento enseandolo a otros.\n\n--- P | PEDIDO ---\n\nArquetipo: Learning-by-Teaching Facilitator con evidencia en que ensenar produce 90% de retencion vs 10% de lectura.\n\nTeach to Learn:\n1. Concepto: que quieres aprender ensenando\n2. Audiencia: a quien le ensenas (real o imaginario)\n3. Estructura: 3 puntos clave en 15 min\n4. Analogia: 1 analogia que haga click\n5. Ejercicio: 1 actividad que verifique comprension\n6. Feedback: como mejorar para la proxima vez\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Learning pyramid: ensenar = 90% retencion\n- 3 points max: si no cabe en 3, no lo entiendes\n- Analogies: lo abstracto se ancla en lo concreto\n- Teach to a beginner: si el principiante entiende, tu dominas\n\n--- C | CRITERIO ---\n\nFormato: outline de mini-sesion de 15 min.\nTono: pedagogico.\nAudiencia: tu mismo (para aprender).\nAccion: ensenar el concepto a alguien esta semana.\n\n[checklist]\n- [ ] Los 3 puntos clave estan claros\n- [ ] La analogia es memorable\n- [ ] El ejercicio verifica comprension\n- [ ] La sesion cabe en 15 min",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "negociacion_salary_raise",
    "label_title": "Salary Raise",
    "category": "negociacion",
    "type": "spec",
    "content": "[inputs]\n- ROL: {{ROL}} > Tu rol actual\n- EXPERIENCIA: {{EXPERIENCIA}} > Anos de experiencia\n- LOGROS: {{LOGROS}} > Principales logros del ultimo periodo\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara preparar una negociacion de aumento salarial con datos, timing y estrategia. No pides un aumento — presentas un business case.\n\n--- P | PEDIDO ---\n\nArquetipo: Career Negotiation Coach con experiencia en negociacion salarial para profesionales tech en LatAm.\n\nNegociacion salarial:\n1. Market data: cuanto paga el mercado por tu rol y experiencia\n2. Value delivered: tus logros cuantificados en el ultimo periodo\n3. Timing: cuando es el mejor momento para pedir\n4. Anchoring: tu numero target (ligeramente por encima)\n5. BATNA: tu mejor alternativa si dicen no\n6. Script: como abrir la conversacion\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Data-driven: market salary + your contributions\n- Business case: no es 'merezco mas', es 'aqui esta el valor que aporto'\n- Anchoring: el primero que da un numero ancla la negociacion\n- Walk-away point: saber tu minimo aceptable\n\n--- C | CRITERIO ---\n\nFormato: brief de negociacion + script + data.\nTono: confiado, profesional.\nAudiencia: tu mismo.\nAccion: agendar la conversacion.\n\n[checklist]\n- [ ] El market data es de fuentes confiables\n- [ ] Los logros estan cuantificados\n- [ ] El BATNA esta calculado\n- [ ] El script de apertura esta ensayado",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "negociacion_precio_servicio",
    "label_title": "Precio Servicio",
    "category": "negociacion",
    "type": "spec",
    "content": "[inputs]\n- SERVICIO: {{SERVICIO}} > Servicio a negociar\n- PRESUPUESTO: {{PRESUPUESTO}} > Tu presupuesto disponible\n- PROVEEDOR: {{PROVEEDOR}} > Perfil del proveedor\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara negociar el precio de un servicio o contrato preservando la relacion y maximizando valor.\n\n--- P | PEDIDO ---\n\nArquetipo: Procurement Negotiator con experiencia en negociacion de contratos de servicios para empresas.\n\nNegociacion de precio:\n1. Investigacion: precio de mercado para este servicio\n2. Valor: que valor real aporta este servicio a tu operacion\n3. Palancas: volumen, duracion, exclusividad, timing\n4. Counter-offer: tu propuesta con justificacion\n5. Concesiones: que puedes ofrecer a cambio de mejor precio\n6. Walk-away: hasta donde llegas\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Know the market: nunca negociar sin benchmark\n- Value-based: pagar por valor, no por costo\n- Creative concessions: mas alla del precio (plazo, scope, exclusividad)\n- Win-win: la relacion importa mas que $100\n\n--- C | CRITERIO ---\n\nFormato: brief de negociacion + counter-offer + script.\nTono: profesional, colaborativo.\nAudiencia: tu mismo.\nAccion: enviar la counter-offer.\n\n[checklist]\n- [ ] El benchmark de mercado esta investigado\n- [ ] Las palancas estan identificadas\n- [ ] La counter-offer tiene justificacion\n- [ ] El walk-away point esta definido",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "creatividad_constraint_driven_design",
    "label_title": "Constraint Driven Design",
    "category": "creatividad",
    "type": "spec",
    "content": "[inputs]\n- PROBLEMA: {{PROBLEMA}} > Problema creativo a resolver\n- RESTRICCIONES: {{RESTRICCIONES}} > Restricciones reales\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara usar restricciones como catalizador creativo. Las restricciones no limitan la creatividad — la potencian.\n\n--- P | PEDIDO ---\n\nArquetipo: Innovation Designer con experiencia en constraint-driven design para desarrollo de productos y servicios.\n\nCreatividad con restricciones:\n1. Definir las restricciones reales (tiempo, dinero, recursos)\n2. Reframe: la restriccion es un filtro, no un muro\n3. Constraint-first ideation: generar ideas DENTRO de las restricciones\n4. Elegant solutions: las que resuelven con menos\n5. Top 3 ideas que abrazan la restriccion\n6. Prototipo de la mas elegante\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Constraints enable creativity: mas libertad ≠ mas creatividad\n- Dr. Seuss approach: 50 palabras para un libro completo\n- Haiku thinking: belleza en la limitacion\n- Less > more: la solucion elegante usa menos, no mas\n\n--- C | CRITERIO ---\n\nFormato: restricciones + ideas + solucion elegante.\nTono: creativo.\nAudiencia: equipo creativo.\nAccion: prototipar la solucion elegante.\n\n[checklist]\n- [ ] Las restricciones son reales (no autoimpuestas)\n- [ ] Las ideas abrazan la restriccion (no la ignoran)\n- [ ] La solucion elegante es genuinamente elegante\n- [ ] El prototipo es buildable",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "creatividad_random_input_technique",
    "label_title": "Random Input Technique",
    "category": "creatividad",
    "type": "spec",
    "content": "[inputs]\n- PROBLEMA: {{PROBLEMA}} > Problema que necesita ideas frescas\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara generar ideas inesperadas usando inputs aleatorios que rompen patrones de pensamiento.\n\n--- P | PEDIDO ---\n\nArquetipo: Creative Thinking Facilitator con experiencia en random stimuli techniques para equipos de innovacion.\n\nRandom Input:\n1. Problema a resolver\n2. Palabra/imagen/objeto aleatorio (sin relacion con el problema)\n3. Forzar 10 conexiones entre el random input y el problema\n4. De las 10, seleccionar 3 ideas genuinamente nuevas\n5. Desarrollar la mas prometedora como concepto\n6. Test: mostrarlo a alguien — sorprende?\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- De Bono random entry: forzar conexiones imposibles\n- Forced connections > free association: estructura > caos\n- 10 connections minimum: las buenas aparecen despues del #5\n- Surprise test: si no sorprende, no es suficientemente nueva\n\n--- C | CRITERIO ---\n\nFormato: random input + 10 conexiones + top 3 + concepto.\nTono: jugueton-serio.\nAudiencia: innovador.\nAccion: implementar la idea mas prometedora.\n\n[checklist]\n- [ ] Las 10 conexiones son forzadas (no obvias)\n- [ ] Las 3 ideas son genuinamente nuevas\n- [ ] El concepto esta desarrollado\n- [ ] El surprise test esta aplicado",
    "paramCount": 2,
    "keywords": []
  },
  {
    "id": "bienestar_digital_detox_plan",
    "label_title": "Digital Detox Plan",
    "category": "bienestar",
    "type": "spec",
    "content": "[inputs]\n- SCREEN_TIME: {{SCREEN_TIME}} > Screen time diario actual (estimacion)\n- APPS_PROBLEMA: {{APPS_PROBLEMA}} > Apps que mas distraen\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar un plan de detox digital que restaure tu atencion sin desconectarte del trabajo. El detox no es apagar todo — es recuperar el control.\n\n--- P | PEDIDO ---\n\nArquetipo: Digital Wellness Coach con experiencia en programas de detox digital para profesionales tech-dependent.\n\nDigital Detox Plan:\n1. Audit: horas de screen time actual por app\n2. Identifies: que apps drenan atencion sin aportar valor\n3. Rules: horarios sin dispositivos (comidas, pre-sleep, primera hora)\n4. Replacements: que haces en lugar de scrollear\n5. Gradual: semana 1 (facil), semana 2 (medio), semana 3 (full)\n6. Metrics: screen time semanal como KPI\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Awareness first: medir antes de cambiar\n- Replace > remove: llenar el vacio con algo mejor\n- Gradual > cold turkey: reducir no es todo-o-nada\n- Environment design: cargar el telefono fuera del cuarto\n\n--- C | CRITERIO ---\n\nFormato: plan de 3 semanas + reglas + metricas.\nTono: compasivo, no extremista.\nAudiencia: profesional pegado al telefono.\nAccion: activar screen time tracking hoy.\n\n[checklist]\n- [ ] El audit de screen time esta hecho\n- [ ] Las reglas son especificas y graduales\n- [ ] Los reemplazos son atractivos\n- [ ] Las metricas se trackean semanalmente",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "bienestar_energy_management_daily",
    "label_title": "Energy Management Daily",
    "category": "bienestar",
    "type": "spec",
    "content": "[inputs]\n- HORARIO: {{HORARIO}} > Tu horario de trabajo\n- ENERGIA_ACTUAL: {{ENERGIA_ACTUAL}} > Cuando cae tu energia durante el dia\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara gestionar tu energia a lo largo del dia con microhabitos que previenen el crash de las 3pm.\n\n--- P | PEDIDO ---\n\nArquetipo: Performance Coach con experiencia en gestion de energia para atletas corporativos.\n\nEnergy Management:\n1. Morning charge: 3 acciones que cargan energia al despertar\n2. Pre-crash protocol: que hacer a las 2pm para evitar el crash\n3. Micro-breaks: 5 min cada 90 min (que hacer en esos 5 min)\n4. Nutrition timing: cuando y que comer para energia sostenida\n5. Movement snacks: 2-min movement cada hora\n6. Evening wind-down: preparar el cuerpo para descansar\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Ultradian rhythm: 90 min trabajo + 15 min descanso\n- Hydration: el 50% de la fatiga es deshidratacion\n- Movement > caffeine: mover el cuerpo es mas efectivo que el cafe\n- Sleep is non-negotiable: 7-8 horas, no 5-6\n\n--- C | CRITERIO ---\n\nFormato: protocolo diario de energia + timing.\nTono: cientifico-personal.\nAudiencia: profesional que se cansa a media tarde.\nAccion: implementar el pre-crash protocol manana.\n\n[checklist]\n- [ ] El protocolo cubre manana, mediodia y tarde\n- [ ] Los micro-breaks son concretos (que hacer)\n- [ ] El timing de nutricion esta definido\n- [ ] Los movement snacks caben en 2 min",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "estrategia_personal_roadmap",
    "label_title": "Personal Roadmap",
    "category": "estrategia",
    "type": "spec",
    "content": "[inputs]\n- VISION: {{VISION}} > Donde quieres estar en 12 meses\n- ESTADO_ACTUAL: {{ESTADO_ACTUAL}} > Donde estas hoy\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear tu roadmap profesional de 12 meses con hitos, palancas y plan de accion trimestral.\n\n--- P | PEDIDO ---\n\nArquetipo: Career Strategist con experiencia en planificacion de carrera para profesionales en transicion.\n\nRoadmap personal:\n1. Vision 12 meses: donde quiero estar\n2. Pilares: 3 areas de enfoque (skills, network, proyectos)\n3. Milestones trimestrales: hitos verificables\n4. Actions mensuales: 3 acciones por mes\n5. Metricas: como mido progreso\n6. Review: cadencia de revision y ajuste\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Backcasting: definir el destino, luego el camino\n- 3 pillars: no 10 prioridades, solo 3\n- Milestones > goals: hitos verificables en el camino\n- Monthly actions: lo suficientemente pequeno para ejecutar\n\n--- C | CRITERIO ---\n\nFormato: roadmap visual + actions + metricas.\nTono: estrategico-personal.\nAudiencia: tu mismo.\nAccion: definir los 3 pilares hoy.\n\n[checklist]\n- [ ] La vision es vivida y motivadora\n- [ ] Los 3 pilares son claros\n- [ ] Los milestones son verificables trimestralmente\n- [ ] Las acciones mensuales son ejecutables",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "estrategia_pivot_evaluar",
    "label_title": "Pivot Evaluar",
    "category": "estrategia",
    "type": "spec",
    "content": "[inputs]\n- MODELO_ACTUAL: {{MODELO_ACTUAL}} > Tu modelo/estrategia actual\n- SIGNALS: {{SIGNALS}} > Que te hace pensar en un pivot\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara evaluar si un pivot estrategico es necesario y como ejecutarlo sin destruir lo que funciona.\n\n--- P | PEDIDO ---\n\nArquetipo: Pivot Strategist con experiencia en evaluacion de pivots para startups y equipos de producto.\n\nEvaluacion de pivot:\n1. Signal check: que datos indican que necesitas pivotar\n2. Current assessment: que funciona y que no del modelo actual\n3. Pivot options: 3 direcciones posibles\n4. Preserve: que conservar del modelo actual\n5. Risk analysis: que puede salir mal con cada pivot\n6. Decision: pivot / iterate / stay + plan\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Data > intuition: los datos deciden, no el ego\n- Preserve the core: pivotar no es empezar de cero\n- Test before commit: validar la direccion antes de all-in\n- Speed matters: un pivot lento es un pivot fallido\n\n--- C | CRITERIO ---\n\nFormato: analisis + opciones + decision + plan.\nTono: estrategico, objetivo.\nAudiencia: equipo de estrategia.\nAccion: tomar la decision.\n\n[checklist]\n- [ ] Los signals de pivot estan basados en datos\n- [ ] Las 3 opciones son genuinamente diferentes\n- [ ] Lo que se preserva esta identificado\n- [ ] El plan tiene timeline y milestones",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "presentacion_demo_producto",
    "label_title": "Demo Producto",
    "category": "presentacion",
    "type": "spec",
    "content": "[inputs]\n- PRODUCTO: {{PRODUCTO}} > Producto a demostrar\n- PROSPECTO: {{PROSPECTO}} > Perfil del prospecto\n- PAIN_POINTS: {{PAIN_POINTS}} > Pain points del prospecto\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar una demo de producto que genere deseo y elimine objeciones en tiempo real.\n\n--- P | PEDIDO ---\n\nArquetipo: Product Demo Specialist con experiencia en demos de productos SaaS para equipos de ventas enterprise.\n\nDemo de producto:\n1. Pre-demo: contexto del prospecto, pain points, expectations\n2. Hook: resultado final primero (no features)\n3. Flow: 3 use cases en orden de impacto\n4. Interaction: momentos para que el prospecto participe\n5. Objection handling: anticipar y resolver en vivo\n6. CTA: siguiente paso inmediato\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Result first: mostrar el output antes que el proceso\n- Their context: usar sus datos/ejemplos si es posible\n- 3 use cases: no el tour completo, los 3 que mas impactan\n- Interactive: el prospecto toca, no solo mira\n\n--- C | CRITERIO ---\n\nFormato: guion de demo + prep sheet + CTA.\nTono: entusiasta, consultivo.\nAudiencia: prospecto.\nAccion: agendar y ejecutar la demo.\n\n[checklist]\n- [ ] El hook muestra resultado, no features\n- [ ] Los 3 use cases son relevantes para el prospecto\n- [ ] Los momentos de interaccion estan disenados\n- [ ] El CTA es de baja friccion",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "presentacion_workshop_facilitar",
    "label_title": "Workshop Facilitar",
    "category": "presentacion",
    "type": "spec",
    "content": "[inputs]\n- OBJETIVO: {{OBJETIVO}} > Output del workshop\n- PARTICIPANTES: {{PARTICIPANTES}} > Numero y perfil\n- DURACION: {{DURACION}} > Duracion disponible\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar y facilitar un workshop que produzca outputs concretos, no solo conversacion.\n\n--- P | PEDIDO ---\n\nArquetipo: Workshop Facilitator con experiencia en diseno de talleres de alto impacto para equipos de 5-30 personas.\n\nWorkshop design:\n1. Objetivo: que output concreto produce el workshop\n2. Pre-work: que deben traer los participantes\n3. Agenda: timeboxed con actividad, objetivo y formato por bloque\n4. Dinamicas: min. 2 actividades interactivas\n5. Convergence: como cerrar con decisions y actions\n6. Post-workshop: follow-up en 48h con resumen y next steps\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Output-driven: el workshop produce algo tangible, no solo ideas\n- Timebox everything: cada actividad con tiempo fijo\n- Diverge then converge: abrir primero, cerrar despues\n- Energy management: alternar high/low energy activities\n\n--- C | CRITERIO ---\n\nFormato: agenda detallada + pre-work + follow-up template.\nTono: energetico, facilitador.\nAudiencia: participantes del workshop.\nAccion: enviar pre-work y facilitar.\n\n[checklist]\n- [ ] El output del workshop es concreto\n- [ ] La agenda esta timeboxed\n- [ ] Las dinamicas son interactivas\n- [ ] El follow-up es en 48h",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "comunicacion_storytelling_personal",
    "label_title": "Storytelling Personal",
    "category": "comunicacion",
    "type": "spec",
    "content": "[inputs]\n- CONTEXTO: {{CONTEXTO}} > Para que necesitas contar tu historia\n- AUDIENCIA: {{AUDIENCIA}} > Audiencia principal\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara contar tu historia profesional de forma que conecte emocionalmente y abra puertas.\n\n--- P | PEDIDO ---\n\nArquetipo: Personal Storytelling Coach con experiencia en narrativa personal para networking, entrevistas y personal branding.\n\nTu historia profesional:\n1. Origin: de donde vienes (contexto que genera empatia)\n2. Turning point: el momento que cambio todo\n3. Journey: que aprendiste en el camino\n4. Now: que haces hoy y por que importa\n5. Future: hacia donde vas\n6. 3 versiones: 30 seg, 2 min, 5 min\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Vulnerability: la autenticidad conecta mas que la perfeccion\n- Show growth: la transformacion es la historia\n- Relevant: adaptar la historia a la audiencia\n- Practice: contar la historia 10 veces para que suene natural\n\n--- C | CRITERIO ---\n\nFormato: 3 versiones de tu historia + tips de delivery.\nTono: autentico, humano.\nAudiencia: networking, entrevistas, presentaciones.\nAccion: practicar la version de 2 min.\n\n[checklist]\n- [ ] La historia tiene turning point\n- [ ] Las 3 versiones tienen diferente profundidad\n- [ ] La vulnerabilidad es genuina\n- [ ] La historia es adaptable a diferentes audiencias",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "comunicacion_bad_news_delivery",
    "label_title": "Bad News Delivery",
    "category": "comunicacion",
    "type": "spec",
    "content": "[inputs]\n- NOTICIA: {{NOTICIA}} > Mala noticia a comunicar\n- RECEPTOR: {{RECEPTOR}} > Quien recibe la noticia\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara comunicar malas noticias de forma profesional que preserve la confianza.\n\n--- P | PEDIDO ---\n\nArquetipo: Crisis Communication Specialist con experiencia en delivery de malas noticias en entornos corporativos.\n\nDelivery de malas noticias:\n1. Preparar: hechos, contexto, opciones\n2. Opening: directo, sin rodeos (no hay forma suave)\n3. Facts: que paso, por que, datos concretos\n4. Impact: que significa para el receptor\n5. Action: que se esta haciendo al respecto\n6. Support: que ayuda hay disponible\n7. Follow-up: cuando y como seguir la conversacion\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Direct > indirect: la mala noticia primero\n- Facts > spin: no maquillar\n- Empathy: reconocer el impacto emocional\n- Forward-looking: que sigue (no solo que paso)\n\n--- C | CRITERIO ---\n\nFormato: guia de delivery + script.\nTono: directo, empatico.\nAudiencia: receptor de la mala noticia.\nAccion: comunicar con dignidad.\n\n[checklist]\n- [ ] La noticia se da directamente (sin rodeos)\n- [ ] Los hechos son verificables\n- [ ] El impacto esta reconocido\n- [ ] La accion correctiva esta comunicada",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "meta_prompt_audit_personal",
    "label_title": "Prompt Audit Personal",
    "category": "meta",
    "type": "spec",
    "content": "[inputs]\n- PROMPTS: {{PROMPTS}} > Tus prompts mas usados (o pega tu historial)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara auditar todos tus prompts actuales y crear un plan de mejora sistematico.\n\n--- P | PEDIDO ---\n\nArquetipo: Prompt Library Curator con experiencia en auditoria y mejora de bibliotecas de prompts empresariales.\n\nPrompt Audit:\n1. Recopilar: listar todos los prompts que usas regularmente\n2. Categorizar: por tipo, frecuencia, calidad\n3. Evaluar: cada prompt contra formato SPEC (S-P-E-C)\n4. Score: 1-10 por dimension\n5. Top 5 to improve: los de mayor frecuencia × menor calidad\n6. Improvement plan: versiones mejoradas de los top 5\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Frequency × quality gap = priority\n- SPEC rubric: S (situacion clara?) P (pedido concreto?) E (ejecucion definida?) C (criterio medible?)\n- Before/after: cada mejora documentada\n- Test: ejecutar ambas versiones y comparar\n\n--- C | CRITERIO ---\n\nFormato: inventario + scoring + top 5 mejorados.\nTono: analitico.\nAudiencia: tu mismo.\nAccion: mejorar el prompt #1.\n\n[checklist]\n- [ ] Todos los prompts regulares estan listados\n- [ ] La evaluacion usa rubrica SPEC\n- [ ] Los top 5 estan mejorados\n- [ ] Las mejoras estan testadas",
    "paramCount": 2,
    "keywords": []
  },
  {
    "id": "meta_system_prompt_personal_ia",
    "label_title": "System Prompt Personal Ia",
    "category": "meta",
    "type": "spec",
    "content": "[inputs]\n- ROL: {{ROL}} > Tu rol profesional\n- ESTILO: {{ESTILO}} > Como prefieres que te responda la IA\n- REGLAS: {{REGLAS}} > Que debe hacer siempre / jamas\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear tu system prompt personal que configure cualquier IA a tu estilo y necesidades desde el primer mensaje.\n\n--- P | PEDIDO ---\n\nArquetipo: AI Configuration Specialist con experiencia en personalizacion de LLMs para productividad individual.\n\nSystem Prompt Personal:\n1. Identity: tu rol, expertise, contexto profesional\n2. Communication style: como quieres que te hable la IA\n3. Output preferences: formato, largo, nivel de detalle\n4. Rules: que debe hacer siempre, que jamas\n5. Context: proyecto actual, herramientas, restricciones\n6. Max 300 palabras: denso, no verbose\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Personal > generic: la IA trabaja mejor cuando te conoce\n- Update monthly: tu contexto cambia\n- Test: el primer output debe ser calibrado sin correccion\n- Cross-platform: debe funcionar en ChatGPT, Claude, Gemini\n\n--- C | CRITERIO ---\n\nFormato: system prompt de 300 palabras listo para usar.\nTono: profesional.\nAudiencia: tu yo futuro.\nAccion: pegar al inicio de tu proxima sesion.\n\n[checklist]\n- [ ] Cabe en 300 palabras\n- [ ] Cubre identidad, estilo, reglas\n- [ ] Funciona cross-platform\n- [ ] El primer output sale calibrado",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "decision_reversible_vs_irreversible",
    "label_title": "Reversible Vs Irreversible",
    "category": "decision",
    "type": "spec",
    "content": "[inputs]\n- DECISION: {{DECISION}} > Decision a tomar\n- CONTEXTO: {{CONTEXTO}} > Contexto relevante\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara clasificar decisiones y aplicar el framework correcto: rapido para reversibles, riguroso para irreversibles.\n\n--- P | PEDIDO ---\n\nArquetipo: Decision Architect con framework de Jeff Bezos (Type 1/Type 2) y metodologia de decisiones bajo incertidumbre.\n\nClasificacion Type 1/Type 2:\n1. Clasificar: reversible (Type 2) o irreversible (Type 1)\n2. Type 2: decide con 70% de info, corrige despues\n3. Type 1: analisis profundo, multiples perspectivas\n4. Costo de revertir vs costo de no actuar\n5. Decision + razonamiento documentado\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Bezos: Type 2 = puerta de dos vias. Type 1 = puerta de una via.\n- 70% rule: no esperar el 100% de informacion\n- Speed of decision: el costo de la lentitud es invisible pero real\n- Decision journal: registrar para aprender\n\n--- C | CRITERIO ---\n\nFormato: clasificacion + decision + razonamiento.\nTono: pragmatico.\nAudiencia: decision-maker.\nAccion: decidir.\n\n[checklist]\n- [ ] La clasificacion esta justificada\n- [ ] El nivel de analisis es apropiado al tipo\n- [ ] La decision tiene razonamiento documentado\n- [ ] El costo de no actuar esta evaluado",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "decision_10_10_10_perspectiva",
    "label_title": "10 10 10 Perspectiva",
    "category": "decision",
    "type": "spec",
    "content": "[inputs]\n- DECISION: {{DECISION}} > Decision a evaluar\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara evaluar una decision desde 3 horizontes temporales: 10 minutos, 10 meses, 10 anos.\n\n--- P | PEDIDO ---\n\nArquetipo: Decision Coach con framework de Suzy Welch (10/10/10) para decisiones con componente emocional.\n\n10/10/10:\n1. En 10 minutos: como me sentire?\n2. En 10 meses: que habra cambiado?\n3. En 10 anos: importara esta decision?\n4. Donde divergen las respuestas?\n5. Decision basada en la perspectiva mas sabia\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Suzy Welch 10/10/10: descomponer el horizonte temporal\n- Short-term emotions vs long-term wisdom\n- If it won't matter in 10 years, don't spend 10 minutes worrying\n- The answer usually lives in the 10-year lens\n\n--- C | CRITERIO ---\n\nFormato: analisis 10/10/10 + decision.\nTono: reflexivo.\nAudiencia: persona ante decision emocional.\nAccion: decidir desde la perspectiva de 10 anos.\n\n[checklist]\n- [ ] Los 3 horizontes estan analizados\n- [ ] Las divergencias estan identificadas\n- [ ] La decision se toma desde el horizonte mas sabio\n- [ ] Las emociones de corto plazo no dominan",
    "paramCount": 2,
    "keywords": []
  },
  {
    "id": "decision_opportunity_cost_calcular",
    "label_title": "Opportunity Cost Calcular",
    "category": "decision",
    "type": "spec",
    "content": "[inputs]\n- OPCIONES: {{OPCIONES}} > Opciones que consideras\n- RECURSOS: {{RECURSOS}} > Recursos comprometidos (tiempo, dinero, atencion)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara cuantificar el costo de oportunidad de cada opcion. Lo que eliges NO hacer tiene un precio.\n\n--- P | PEDIDO ---\n\nArquetipo: Economista de Decisiones con experiencia en analisis de oportunidad para inversiones y asignacion de recursos.\n\nOpportunity Cost:\n1. Opcion A: que ganas + que pierdes por elegirla\n2. Opcion B: que ganas + que pierdes por elegirla\n3. Costo de oportunidad: el valor de la mejor opcion NO elegida\n4. Recursos comprometidos: tiempo, dinero, atencion\n5. Reversibilidad: puedes cambiar de opcion despues?\n6. Decision informada por costo real\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Every yes is a no: cada eleccion cierra otras puertas\n- Quantify: poner numero al costo de oportunidad\n- Time is the scarcest resource: priorizar por lo que no puedes recuperar\n- Sunk costs don't count: solo costos futuros\n\n--- C | CRITERIO ---\n\nFormato: tabla de opciones con costo de oportunidad.\nTono: analitico.\nAudiencia: decision-maker.\nAccion: elegir la opcion con menor costo de oportunidad real.\n\n[checklist]\n- [ ] Cada opcion tiene ganancia Y perdida\n- [ ] El costo de oportunidad esta cuantificado\n- [ ] Los sunk costs no influyen\n- [ ] La decision esta informada por costo real",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "decision_consensus_vs_consent",
    "label_title": "Consensus Vs Consent",
    "category": "decision",
    "type": "spec",
    "content": "[inputs]\n- DECISION: {{DECISION}} > Decision grupal a tomar\n- GRUPO: {{GRUPO}} > Tamano y perfil del grupo\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara facilitar una decision grupal eligiendo el metodo correcto: consenso (todos de acuerdo) vs consentimiento (nadie objeta).\n\n--- P | PEDIDO ---\n\nArquetipo: Facilitador de Decisiones Grupales con experiencia en sociocracy y consent-based decision making.\n\nConsenso vs Consentimiento:\n1. Tipo de decision: alto impacto = consenso, operativa = consentimiento\n2. Consenso: todos aportan, todos acuerdan (lento pero solido)\n3. Consentimiento: propuesta > objeciones > resolucion (rapido y suficiente)\n4. Facilitacion: como guiar al grupo\n5. Documentar: la decision + el razonamiento + las objeciones resueltas\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Consensus for strategy: decisiones que requieren buy-in de todos\n- Consent for execution: 'nadie tiene una objecion valida'\n- Objection ≠ preference: solo objeciones basadas en riesgo cuentan\n- Time-box: consenso con deadline evita paralisis\n\n--- C | CRITERIO ---\n\nFormato: guia de facilitacion + template de decision.\nTono: facilitador.\nAudiencia: lider de equipo.\nAccion: usar en la proxima decision grupal.\n\n[checklist]\n- [ ] El metodo es apropiado al tipo de decision\n- [ ] Las objeciones se distinguen de preferencias\n- [ ] La facilitacion tiene time-box\n- [ ] La decision esta documentada",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "decision_analisis_sensibilidad",
    "label_title": "Analisis Sensibilidad",
    "category": "decision",
    "type": "spec",
    "content": "[inputs]\n- DECISION: {{DECISION}} > Decision a testear\n- SUPUESTOS: {{SUPUESTOS}} > Supuestos principales\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara testear que tan robusta es una decision ante cambios en los supuestos. Si un supuesto cambia 20% y la decision cambia, la decision es fragil.\n\n--- P | PEDIDO ---\n\nArquetipo: Risk Analyst con experiencia en analisis de sensibilidad para decisiones de inversion y estrategia.\n\nSensitivity Analysis:\n1. Decision actual y sus supuestos clave (5-8)\n2. Para cada supuesto: que pasa si cambia +/-20%?\n3. Tornado chart: cuales supuestos tienen mas impacto\n4. Breakeven: en que punto un supuesto cambia la decision\n5. Robustez: la decision sobrevive cambios razonables?\n6. Hedging: como protegerse ante los supuestos fragiles\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- One-at-a-time: cambiar 1 supuesto, mantener los demas\n- Tornado diagram: visualizar impacto por supuesto\n- Breakeven analysis: el punto donde la decision flip\n- Robust decisions > optimal decisions\n\n--- C | CRITERIO ---\n\nFormato: tornado chart + breakeven + robustez.\nTono: analitico.\nAudiencia: decision-maker.\nAccion: implementar hedging para supuestos fragiles.\n\n[checklist]\n- [ ] Los supuestos clave estan identificados\n- [ ] El impacto de cada cambio esta cuantificado\n- [ ] Los breakeven points estan calculados\n- [ ] El hedging esta propuesto",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "decision_devil_advocate_protocolo",
    "label_title": "Devil Advocate Protocolo",
    "category": "decision",
    "type": "spec",
    "content": "[inputs]\n- PROPUESTA: {{PROPUESTA}} > Propuesta a atacar\n- CONTEXTO: {{CONTEXTO}} > Contexto de la decision\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara asignar un devil's advocate que ataque sistematicamente la propuesta antes de aprobarla.\n\n--- P | PEDIDO ---\n\nArquetipo: Strategic Decision Facilitator con experiencia en red-teaming de decisiones para comites directivos.\n\nDevil's Advocate:\n1. Propuesta a atacar\n2. Reglas: el DA ataca con datos e hipotesis, no con opinion\n3. 5 vectores de ataque: viabilidad, timing, competencia, recursos, supuestos\n4. Mejor contra-argumento por vector\n5. Defensa: la propuesta puede responder?\n6. Propuesta fortalecida o descartada\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Structured dissent: no opinion, sino hipotesis falsificables\n- 5 vectors: atacar desde multiples angulos\n- Steel-man attack: la critica mas fuerte posible\n- Strengthen or kill: la propuesta mejora o muere\n\n--- C | CRITERIO ---\n\nFormato: propuesta + ataques + defensas + veredicto.\nTono: constructivamente adversarial.\nAudiencia: equipo de decision.\nAccion: implementar la propuesta fortalecida o descartarla.\n\n[checklist]\n- [ ] Los ataques son basados en hipotesis (no opinion)\n- [ ] Los 5 vectores estan cubiertos\n- [ ] La defensa es genuina (no dismissive)\n- [ ] El veredicto es claro",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "liderazgo_onboarding_30_60_90",
    "label_title": "Onboarding 30 60 90",
    "category": "liderazgo",
    "type": "spec",
    "content": "[inputs]\n- ROL: {{ROL}} > Rol del nuevo miembro\n- EQUIPO: {{EQUIPO}} > Equipo al que se integra\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar un plan de onboarding que acelere la productividad de un nuevo miembro.\n\n--- P | PEDIDO ---\n\nArquetipo: Onboarding Designer con experiencia en planes 30-60-90 para empresas tech en hipercrecimiento.\n\nPlan 30-60-90:\n1. Dias 1-30 (Absorber): aprender cultura, procesos, personas, herramientas\n2. Dias 31-60 (Contribuir): asumir tareas, entregar primeros resultados\n3. Dias 61-90 (Liderar): operar con autonomia, proponer mejoras\n4. Milestones: entregable verificable por cada fase\n5. Buddy: persona de apoyo asignada\n6. Check-ins: D7, D14, D30, D60, D90\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Absorb > Contribute > Lead: progresion natural\n- Quick wins: primer resultado visible en semana 2\n- Social integration: conocer personas es tan importante como aprender procesos\n- Feedback: temprano y frecuente\n\n--- C | CRITERIO ---\n\nFormato: plan 30-60-90 + milestones + check-in schedule.\nTono: estructurado, acogedor.\nAudiencia: nuevo miembro + su manager.\nAccion: ejecutar desde el dia 1.\n\n[checklist]\n- [ ] Cada fase tiene milestone verificable\n- [ ] El buddy esta asignado\n- [ ] Los check-ins estan calendarizados\n- [ ] El primer quick win es en semana 2",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "liderazgo_dar_autonomia_calibrada",
    "label_title": "Dar Autonomia Calibrada",
    "category": "liderazgo",
    "type": "spec",
    "content": "[inputs]\n- PERSONA: {{PERSONA}} > Persona a calibrar\n- TAREA: {{TAREA}} > Tarea o responsabilidad especifica\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara dar autonomia proporcional a la madurez de cada persona. Ni micromanagement ni abandono.\n\n--- P | PEDIDO ---\n\nArquetipo: Situational Leadership Coach con modelo Hersey-Blanchard de liderazgo adaptativo.\n\nAutonomia calibrada:\n1. Assessment: nivel de competencia y motivacion de la persona para esta tarea\n2. S1 (Directing): baja competencia, alta motivacion = instrucciones claras\n3. S2 (Coaching): competencia creciente = guia + espacio\n4. S3 (Supporting): competente pero inseguro = apoyo emocional\n5. S4 (Delegating): competente y motivado = autonomia total\n6. Re-calibrar: el nivel cambia por tarea, no es fijo\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Hersey-Blanchard: adaptar estilo al nivel de la persona\n- Per-task, not per-person: alguien puede ser S4 en una tarea y S1 en otra\n- Progression: el objetivo es llevar a todos a S4\n- Over-manage S1: bajo-dirigir un novato es crueldad disfrazada de confianza\n\n--- C | CRITERIO ---\n\nFormato: assessment + estilo recomendado + plan de progresion.\nTono: coaching.\nAudiencia: manager.\nAccion: recalibrar el nivel de autonomia de cada reporte directo.\n\n[checklist]\n- [ ] El assessment es por tarea (no generico)\n- [ ] El estilo es apropiado al nivel\n- [ ] El plan de progresion hacia S4 existe\n- [ ] La recalibracion es periodica",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "liderazgo_remote_team_engagement",
    "label_title": "Remote Team Engagement",
    "category": "liderazgo",
    "type": "spec",
    "content": "[inputs]\n- EQUIPO: {{EQUIPO}} > Tamano y distribucion del equipo\n- HERRAMIENTAS: {{HERRAMIENTAS}} > Herramientas de comunicacion actuales\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara mantener engagement y cohesion en un equipo remoto o hibrido.\n\n--- P | PEDIDO ---\n\nArquetipo: Remote Work Strategist con experiencia en gestion de equipos distribuidos en 5+ zonas horarias.\n\nRemote Engagement:\n1. Rituales de conexion: stand-ups, coffee chats, retros\n2. Communication protocol: async-first + sync para lo importante\n3. Visibility: como hacer visible el trabajo (no la presencia)\n4. Social time: espacios no-laborales intencionados\n5. Recognition: como reconocer en remoto (publico + privado)\n6. Metrics: engagement score + retention\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Intentional > organic: en remoto, todo debe disenarse\n- Output > presence: medir resultados, no horas conectado\n- Overcommunicate: en remoto, la comunicacion nunca es demasiada\n- Regular 1:1s: la herramienta #1 de engagement\n\n--- C | CRITERIO ---\n\nFormato: playbook de engagement remoto + rituales + metricas.\nTono: humano, practico.\nAudiencia: lider de equipo remoto.\nAccion: implementar 1 ritual nuevo esta semana.\n\n[checklist]\n- [ ] Los rituales cubren conexion laboral Y social\n- [ ] El protocolo de comunicacion es claro\n- [ ] El reconocimiento es publico Y privado\n- [ ] Las metricas de engagement estan definidas",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "liderazgo_mentorar_junior",
    "label_title": "Mentorar Junior",
    "category": "liderazgo",
    "type": "spec",
    "content": "[inputs]\n- MENTEE: {{MENTEE}} > Perfil del mentee\n- OBJETIVO: {{OBJETIVO}} > Objetivo del mentoring\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara mentorar a un profesional junior de forma que acelere su crecimiento sin crear dependencia.\n\n--- P | PEDIDO ---\n\nArquetipo: Senior Mentor con experiencia en coaching de carrera y desarrollo de talento junior en tech.\n\nMentoring efectivo:\n1. Goals: que quiere lograr el mentee en 6 meses\n2. Cadencia: reuniones cada 2 semanas, 45 min\n3. Estructura: 10 min check-in, 25 min tema, 10 min plan\n4. Preguntas > respuestas: guiar con preguntas, no con instrucciones\n5. Accountability: compromisos mutuos entre sesiones\n6. Graduation: cuando el mentee ya no necesita al mentor\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Ask > tell: el mentee debe pensar, no solo escuchar\n- GROW model: Goal, Reality, Options, Way forward\n- Stretch + support: desafiar Y apoyar simultaneamente\n- Self-sufficiency: el exito es que no te necesite\n\n--- C | CRITERIO ---\n\nFormato: plan de mentoring + template de sesion.\nTono: coaching, generoso.\nAudiencia: mentor.\nAccion: agendar la primera sesion.\n\n[checklist]\n- [ ] Los goals son del mentee (no del mentor)\n- [ ] Las preguntas son mas que las respuestas\n- [ ] Los compromisos son mutuos\n- [ ] El criteria de graduation esta definido",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "liderazgo_conflict_resolution",
    "label_title": "Conflict Resolution",
    "category": "liderazgo",
    "type": "spec",
    "content": "[inputs]\n- CONFLICTO: {{CONFLICTO}} > Descripcion del conflicto\n- PARTES: {{PARTES}} > Personas involucradas\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara resolver un conflicto entre miembros del equipo antes de que escale.\n\n--- P | PEDIDO ---\n\nArquetipo: Mediador Organizacional con experiencia en resolucion de conflictos en equipos de trabajo.\n\nResolucion de conflicto:\n1. Escuchar por separado: perspectiva de cada parte sin juicio\n2. Identificar: hechos vs interpretaciones vs emociones\n3. Intereses: que necesita realmente cada parte (no su posicion)\n4. Common ground: en que estan de acuerdo\n5. Solucion: propuesta que atiende ambos intereses\n6. Acuerdo: compromiso concreto de ambas partes + follow-up\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Separate people from problem: el conflicto es el tema, no la persona\n- Interests > positions: lo que necesitan, no lo que piden\n- Mediator ≠ judge: facilitar, no decidir\n- Follow-up: verificar que el acuerdo se cumple\n\n--- C | CRITERIO ---\n\nFormato: guia de mediacion + template de acuerdo.\nTono: neutral, empatico.\nAudiencia: lider o mediador.\nAccion: hablar con cada parte por separado esta semana.\n\n[checklist]\n- [ ] Ambas perspectivas estan escuchadas\n- [ ] Los intereses (no posiciones) estan identificados\n- [ ] La solucion atiende ambos intereses\n- [ ] El follow-up esta programado",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "aprendizaje_curacion_recursos",
    "label_title": "Curacion Recursos",
    "category": "aprendizaje",
    "type": "spec",
    "content": "[inputs]\n- TEMA: {{TEMA}} > Tema a aprender\n- NIVEL: {{NIVEL}} > Tu nivel actual (principiante, intermedio, avanzado)\n- TIEMPO: {{TIEMPO}} > (opcional) Horas semanales disponibles\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara curar los mejores recursos de aprendizaje sobre un tema, eliminando el 90% de ruido.\n\n--- P | PEDIDO ---\n\nArquetipo: Learning Curator con experiencia en curaduria de contenido educativo para programas de upskilling.\n\nCuraduria de recursos:\n1. Definir criterio: que hace un recurso 'bueno' (reciente, practico, del experto)\n2. Buscar: libros, cursos, videos, podcasts, blogs, papers\n3. Evaluar: 1-5 por relevancia, calidad, actualidad, practicidad\n4. Top 5: los recursos que si valen la pena\n5. Orden: en que secuencia consumirlos\n6. Anti-recursos: cuales populares NO vale la pena consumir\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Curate > accumulate: 5 recursos excelentes > 50 mediocres\n- Practitioner > theorist: preferir autores que hacen, no solo ensenan\n- Recent > classic: excepto si el clasico sigue vigente\n- Anti-curation: saber que NO leer ahorra tanto como saber que si\n\n--- C | CRITERIO ---\n\nFormato: lista curada con scoring + orden + anti-recursos.\nTono: evaluativo, honesto.\nAudiencia: profesional que quiere aprender sin perder tiempo.\nAccion: consumir el recurso #1.\n\n[checklist]\n- [ ] La evaluacion usa criterios explicitos\n- [ ] Los top 5 estan ordenados por secuencia\n- [ ] Los anti-recursos estan identificados\n- [ ] El recurso #1 es inmediatamente accesible",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "aprendizaje_deliberate_practice",
    "label_title": "Deliberate Practice",
    "category": "aprendizaje",
    "type": "spec",
    "content": "[inputs]\n- HABILIDAD: {{HABILIDAD}} > Habilidad a desarrollar\n- NIVEL: {{NIVEL}} > Nivel actual con evidencia\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar sesiones de practica deliberada que aceleren el desarrollo de una habilidad.\n\n--- P | PEDIDO ---\n\nArquetipo: Performance Coach con experiencia en deliberate practice para musicos, atletas y profesionales.\n\nDeliberate Practice:\n1. Skill target: que habilidad especifica mejorar\n2. Current level: donde estas hoy (evidencia, no percepcion)\n3. Stretch zone: ejercicios que estan justo fuera de tu comfort\n4. Feedback: como obtener feedback inmediato\n5. Repetition: plan de sesiones (min. 3x/semana)\n6. Metrics: como medir mejora objectively\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Anders Ericsson: deliberate practice ≠ just doing it\n- Stretch zone: ni tan facil que aburra ni tan dificil que frustre\n- Immediate feedback: sin feedback no hay aprendizaje\n- 10,000 hours myth: no es cantidad, es calidad de practica\n\n--- C | CRITERIO ---\n\nFormato: plan de practica deliberada + ejercicios + metricas.\nTono: exigente, metodico.\nAudiencia: profesional que quiere maestria, no competencia.\nAccion: completar la primera sesion.\n\n[checklist]\n- [ ] El skill target es especifico y medible\n- [ ] Los ejercicios estan en la stretch zone\n- [ ] El feedback es inmediato y concreto\n- [ ] La frecuencia es min. 3x/semana",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "aprendizaje_portfolio_learning",
    "label_title": "Portfolio Learning",
    "category": "aprendizaje",
    "type": "spec",
    "content": "[inputs]\n- COMPETENCIAS: {{COMPETENCIAS}} > Competencias a demostrar\n- AUDIENCIA: {{AUDIENCIA}} > Quien vera el portfolio\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara documentar tu aprendizaje como portafolio que demuestre competencias con evidencia.\n\n--- P | PEDIDO ---\n\nArquetipo: Portfolio-Based Assessment Designer con experiencia en evaluacion por competencias para programas de certificacion.\n\nPortfolio de aprendizaje:\n1. Competencias target: que quiero demostrar que se hacer\n2. Evidencia por competencia: entregable, proyecto, resultado medible\n3. Reflexion: que aprendi, que haria diferente\n4. Formato: como presentar cada pieza (PDF, link, demo)\n5. Narrativa: la historia de tu evolucion\n6. Update cadence: agregar nuevas piezas cada mes\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Show > tell: evidencia > certificados\n- STAR per piece: Situacion, Tarea, Accion, Resultado\n- Curate: quality > quantity\n- Living portfolio: actualizar mensualmente\n\n--- C | CRITERIO ---\n\nFormato: portfolio estructurado + narrativa + update plan.\nTono: profesional, reflexivo.\nAudiencia: evaluadores, empleadores, clientes.\nAccion: seleccionar las primeras 3 piezas.\n\n[checklist]\n- [ ] Cada pieza tiene evidencia verificable\n- [ ] Las reflexiones son genuinas\n- [ ] La narrativa muestra evolucion\n- [ ] El update esta calendarizado",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "aprendizaje_retrospectiva_personal",
    "label_title": "Retrospectiva Personal",
    "category": "aprendizaje",
    "type": "spec",
    "content": "[inputs]\n- PERIODO: {{PERIODO}} > Periodo a revisar\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara hacer una retrospectiva personal que convierta experiencia en aprendizaje sistematico.\n\n--- P | PEDIDO ---\n\nArquetipo: Reflective Practice Coach con experiencia en retrospectivas personales para desarrollo profesional.\n\nRetro personal:\n1. Periodo: semana, mes o trimestre\n2. Wins: 3 cosas que salieron bien y por que\n3. Learnings: 3 cosas que aprendi (a veces del error)\n4. Patterns: que patron veo que se repite\n5. 1 change: 1 cosa que cambio para el proximo periodo\n6. Gratitude: 1 cosa por la que estoy agradecido profesionalmente\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Regular cadence: la retro es un habito, no un evento\n- Patterns > incidents: buscar lo sistemico, no lo anecdotico\n- 1 change only: no 10 resoluciones, solo 1 implementable\n- Written: escribir procesa mejor que solo pensar\n\n--- C | CRITERIO ---\n\nFormato: template de retro personal (1 pagina).\nTono: honesto, compasivo.\nAudiencia: tu mismo.\nAccion: hacer la retro este fin de semana.\n\n[checklist]\n- [ ] Los wins estan celebrados (no ignorados)\n- [ ] Los learnings tienen 'por que' explicito\n- [ ] El patron identificado es real\n- [ ] El 1 change es concreto y ejecutable",
    "paramCount": 2,
    "keywords": []
  },
  {
    "id": "estrategia_swot_personal",
    "label_title": "Swot Personal",
    "category": "estrategia",
    "type": "spec",
    "content": "[inputs]\n- ROL: {{ROL}} > Tu rol actual\n- ASPIRACION: {{ASPIRACION}} > Hacia donde quieres crecer\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara hacer un SWOT personal que guie tu estrategia de carrera con honestidad.\n\n--- P | PEDIDO ---\n\nArquetipo: Career Strategist con experiencia en analisis estrategico personal para profesionales en transicion.\n\nSWOT Personal:\n1. Strengths: en que eres genuinamente bueno (validado por otros)\n2. Weaknesses: donde eres vulnerable (honestamente)\n3. Opportunities: tendencias del mercado que puedes capitalizar\n4. Threats: fuerzas externas que te pueden afectar\n5. TOWS: cruzar S×O, S×T, W×O, W×T para estrategias\n6. Top 3 acciones estrategicas\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Honest assessment: pedir feedback de 5 personas, no solo auto-evaluar\n- External scan: las O y T vienen del mercado, no de ti\n- TOWS cross: donde esta el valor estrategico real\n- Action-oriented: el SWOT sin acciones es solo reflexion\n\n--- C | CRITERIO ---\n\nFormato: SWOT + TOWS + 3 acciones.\nTono: estrategico-personal.\nAudiencia: tu mismo.\nAccion: ejecutar la accion #1.\n\n[checklist]\n- [ ] Las fortalezas estan validadas por otros\n- [ ] Las debilidades son honestas\n- [ ] El TOWS genera estrategias concretas\n- [ ] Las 3 acciones son ejecutables",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "estrategia_blue_ocean_oportunidad",
    "label_title": "Blue Ocean Oportunidad",
    "category": "estrategia",
    "type": "spec",
    "content": "[inputs]\n- SECTOR: {{SECTOR}} > Tu sector o mercado\n- PRODUCTO: {{PRODUCTO}} > Tu producto o servicio actual\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara identificar oportunidades Blue Ocean: mercados sin competencia donde puedes crear demanda nueva.\n\n--- P | PEDIDO ---\n\nArquetipo: Innovation Strategist con framework Blue Ocean Strategy de Kim y Mauborgne.\n\nBlue Ocean:\n1. Red Ocean actual: donde compites hoy (competencia sangrienta)\n2. Strategy Canvas: factores de competencia actuales del sector\n3. Eliminate: que factores puedes eliminar sin perder valor\n4. Reduce: que puedes reducir por debajo del estandar\n5. Raise: que puedes elevar por encima del estandar\n6. Create: que nuevo puedes ofrecer que nadie ofrece\n7. Blue Ocean: donde estan los no-clientes\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Kim & Mauborgne Blue Ocean Strategy\n- ERRC grid: Eliminate, Reduce, Raise, Create\n- Non-customers: los que no compran en el sector hoy\n- Value innovation: mas valor a menor costo (no trade-off)\n\n--- C | CRITERIO ---\n\nFormato: strategy canvas + ERRC grid + oportunidad.\nTono: visionario, basado en analisis.\nAudiencia: estratega.\nAccion: prototipar la oportunidad Blue Ocean.\n\n[checklist]\n- [ ] El Red Ocean esta mapeado con datos\n- [ ] La ERRC grid genera diferenciacion real\n- [ ] Los non-customers estan identificados\n- [ ] La oportunidad es genuinamente nueva",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "estrategia_flywheel_diseno",
    "label_title": "Flywheel Diseno",
    "category": "estrategia",
    "type": "spec",
    "content": "[inputs]\n- NEGOCIO: {{NEGOCIO}} > Tu negocio o proyecto\n- CRECIMIENTO: {{CRECIMIENTO}} > Que tipo de crecimiento buscas (usuarios, revenue, impacto)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar un flywheel (volante) que genere crecimiento compuesto: cada vuelta alimenta la siguiente.\n\n--- P | PEDIDO ---\n\nArquetipo: Growth Strategist con framework de Jim Collins (flywheel effect) y experiencia en diseño de loops de crecimiento.\n\nFlywheel:\n1. Componentes: 4-6 pasos del ciclo virtuoso\n2. Conexiones: como cada paso alimenta al siguiente\n3. Motor: que hace girar el flywheel mas rapido\n4. Friccion: que lo frena\n5. Metricas: como medir la velocidad del flywheel\n6. Investment: donde invertir para acelerar\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Jim Collins Good to Great: el flywheel como modelo de crecimiento\n- Compounding: cada vuelta es mas facil que la anterior\n- Reduce friction > add force: eliminar lo que frena es mas efectivo\n- Patience: el flywheel tarda en arrancar pero es imparable\n\n--- C | CRITERIO ---\n\nFormato: diagrama del flywheel + metricas + plan de aceleracion.\nTono: estrategico.\nAudiencia: equipo de estrategia.\nAccion: identificar y reducir la friccion #1.\n\n[checklist]\n- [ ] Los 4-6 componentes forman un ciclo cerrado\n- [ ] Las conexiones son causales (no correlaciones)\n- [ ] La friccion principal esta identificada\n- [ ] La inversion de aceleracion esta priorizada",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "estrategia_jobs_to_be_done",
    "label_title": "Jobs To Be Done",
    "category": "estrategia",
    "type": "spec",
    "content": "[inputs]\n- PRODUCTO: {{PRODUCTO}} > Tu producto o servicio\n- CLIENTES: {{CLIENTES}} > Tipo de clientes a investigar\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara descubrir el 'Job' real que tu cliente contrata tu producto para hacer. El JTBD revela la demanda real, no la superficial.\n\n--- P | PEDIDO ---\n\nArquetipo: JTBD Researcher con framework de Clayton Christensen y experiencia en innovacion de producto.\n\nJobs-to-be-Done:\n1. Job funcional: que tarea necesita completar\n2. Job emocional: como quiere sentirse\n3. Job social: como quiere ser visto por otros\n4. Hiring criteria: por que contrata TU solucion y no otra\n5. Firing criteria: por que dejaria de usarla\n6. Unmet jobs: que jobs no estan siendo atendidos\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Christensen JTBD: las personas contratan productos para hacer un job\n- Switch interviews: por que cambiaron de solucion\n- Forces of progress: push (dolor actual) + pull (solucion nueva) - anxiety - habit\n- Job statement: 'Cuando [situacion], quiero [motivacion], para poder [resultado]'\n\n--- C | CRITERIO ---\n\nFormato: job map + hiring/firing criteria + unmet jobs.\nTono: centrado en el cliente.\nAudiencia: equipo de producto.\nAccion: entrevistar 5 clientes con JTBD lens.\n\n[checklist]\n- [ ] Los 3 tipos de job estan cubiertos\n- [ ] Los hiring/firing criteria son explicitos\n- [ ] Los unmet jobs son oportunidades reales\n- [ ] Los job statements estan bien formulados",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "meta_priming_universal_crear",
    "label_title": "Priming Universal Crear",
    "category": "meta",
    "type": "spec",
    "content": "[inputs]\n- ROL: {{ROL}} > Tu rol profesional\n- ESTILO: {{ESTILO}} > Tu estilo de comunicacion preferido\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear un priming prompt universal que configures al inicio de cada sesion de IA, independientemente de la tarea.\n\n--- P | PEDIDO ---\n\nArquetipo: AI Session Architect con experiencia en diseño de primings universales para profesionales de alto rendimiento.\n\nPriming Universal:\n1. Tu identidad profesional en 2 oraciones\n2. Tu forma de trabajar: rapido y directo o detallado y reflexivo\n3. Output preferences: formato, largo, estructura, idioma\n4. Reglas absolutas: que siempre, que jamas\n5. Contexto actual: en que estas enfocado este mes/trimestre\n6. Max 150 palabras: cada palabra debe ganarse su lugar\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Dense > verbose: 150 palabras que calibren toda la sesion\n- Test: una buena priming produce respuestas calibradas sin correccion\n- Update monthly: tu contexto cambia\n- Cross-platform: funciona en ChatGPT, Claude, Gemini\n\n--- C | CRITERIO ---\n\nFormato: priming de 150 palabras listo para copiar.\nTono: profesional.\nAudiencia: tu yo futuro que inicia sesion.\nAccion: pegar al inicio de tu proxima sesion.\n\n[checklist]\n- [ ] Cabe en 150 palabras\n- [ ] La identidad profesional es clara\n- [ ] Las reglas absolutas son pocas y claras\n- [ ] Funciona cross-platform",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "meta_evaluar_output_ia_rubric",
    "label_title": "Evaluar Output Ia Rubric",
    "category": "meta",
    "type": "spec",
    "content": "[inputs]\n- TIPO_OUTPUT: {{TIPO_OUTPUT}} > Tipo de output que evaluas normalmente\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara evaluar cualquier output de IA con una rubrica rapida de 6 dimensiones en menos de 2 minutos.\n\n--- P | PEDIDO ---\n\nArquetipo: AI Output Quality Specialist con experiencia en evaluacion sistematica de outputs de LLMs.\n\nQuick Rubric (2 min):\n1. Precision: la informacion es correcta? (1-5)\n2. Completitud: cubre lo pedido? (1-5)\n3. Claridad: es entendible a primera lectura? (1-5)\n4. Formato: esta en el formato solicitado? (1-5)\n5. Accionabilidad: puedo actuar con esto? (1-5)\n6. Calidad: lo usaria sin editar? (1-5)\n7. Score total: /30. Si <20: rechazar. 20-25: editar. 25+: usar.\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- 6 dimensions: cubren los aspectos criticos\n- 1-5 scale: simple y rapido\n- Threshold-based: saber cuando rechazar vs editar vs usar\n- Calibrate: evaluar 5 outputs para calibrar tu escala\n\n--- C | CRITERIO ---\n\nFormato: rubrica de bolsillo (memorizable).\nTono: tecnico, rapido.\nAudiencia: usuario de IA que necesita evaluar rapido.\nAccion: evaluar el proximo output con esta rubrica.\n\n[checklist]\n- [ ] Las 6 dimensiones son memorizables\n- [ ] La escala 1-5 es rapida de aplicar\n- [ ] Los thresholds son claros\n- [ ] La evaluacion cabe en 2 minutos",
    "paramCount": 2,
    "keywords": []
  },
  {
    "id": "presentacion_board_meeting",
    "label_title": "Board Meeting",
    "category": "presentacion",
    "type": "spec",
    "content": "[inputs]\n- EMPRESA: {{EMPRESA}} > Tu empresa\n- PERIODO: {{PERIODO}} > Periodo a reportar\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara preparar una presentacion para junta directiva que sea concisa, basada en datos y orientada a decisiones.\n\n--- P | PEDIDO ---\n\nArquetipo: Board Presentation Specialist con experiencia en preparacion de CEO/CFOs para reuniones de junta.\n\nBoard Presentation:\n1. Executive summary: 1 slide con lo que importa\n2. Financial performance: vs plan, vs anterior\n3. Strategic priorities: progreso en cada una\n4. Risks: los 3 principales con mitigacion\n5. Decisions needed: que aprobaciones necesitas\n6. Max 10 slides, 20 min\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Summary first: si el board solo ve 1 slide, cual es\n- Numbers tell: financials con variacion vs plan\n- Decisions > information: el board aprueba, no solo escucha\n- Rehearse: practicar con timer\n\n--- C | CRITERIO ---\n\nFormato: deck de 10 slides max.\nTono: ejecutivo, preciso.\nAudiencia: junta directiva.\nAccion: presentar con confianza.\n\n[checklist]\n- [ ] El executive summary cabe en 1 slide\n- [ ] Los financials tienen variacion vs plan\n- [ ] Las decisions estan claras\n- [ ] El deck tiene max 10 slides",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "presentacion_training_session",
    "label_title": "Training Session",
    "category": "presentacion",
    "type": "spec",
    "content": "[inputs]\n- HABILIDAD: {{HABILIDAD}} > Habilidad a ensenar\n- AUDIENCIA: {{AUDIENCIA}} > Perfil de los participantes\n- DURACION: {{DURACION}} > Duracion disponible\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar una sesion de training que enseñe una habilidad concreta en 60 minutos.\n\n--- P | PEDIDO ---\n\nArquetipo: Training Designer con experiencia en diseño instruccional para programas de capacitacion corporativa.\n\nTraining Session:\n1. Objetivo: que podra HACER el participante al terminar\n2. Pre-assessment: que saben ahora (2 min quiz)\n3. Teoria (15 min): solo lo esencial, no lo interesante\n4. Demo (10 min): mostrar como se hace\n5. Practica (25 min): los participantes hacen\n6. Cierre (10 min): recap + recursos + siguiente paso\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Outcome-based: el objetivo es una habilidad, no una presentacion\n- 70% practice: la gente aprende haciendo, no mirando\n- Just-in-time theory: solo la teoria necesaria para la practica\n- Immediate application: que puedan usar lo aprendido hoy\n\n--- C | CRITERIO ---\n\nFormato: guia de sesion + materiales + evaluacion.\nTono: pedagogico, energetico.\nAudiencia: participantes del training.\nAccion: facilitar la sesion.\n\n[checklist]\n- [ ] El objetivo es una habilidad (no un tema)\n- [ ] El 70% del tiempo es practica\n- [ ] La teoria es minima y just-in-time\n- [ ] El participante puede aplicar hoy",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "presentacion_webinar_engagement",
    "label_title": "Webinar Engagement",
    "category": "presentacion",
    "type": "spec",
    "content": "[inputs]\n- TEMA: {{TEMA}} > Tema del webinar\n- AUDIENCIA: {{AUDIENCIA}} > Perfil de la audiencia registrada\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar un webinar que mantenga la atencion de 100+ personas durante 60 minutos.\n\n--- P | PEDIDO ---\n\nArquetipo: Webinar Producer con experiencia en webinars de alto engagement para audiencias B2B de 100-1000 personas.\n\nWebinar de alto engagement:\n1. Pre-webinar: email de anticipacion + poll pre-evento\n2. Opening (5 min): hook + agenda + reglas de engagement\n3. Content (35 min): 3 bloques de 10 min + interaccion entre bloques\n4. Q&A (15 min): preguntas curadas + respuestas\n5. CTA (5 min): 1 accion + recurso de seguimiento\n6. Post-webinar: grabacion + resumen + CTA\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Engagement every 10 min: poll, chat, quiz, live demo\n- Content density: valor en cada minuto (no relleno)\n- Chat management: 1 persona moderando el chat\n- Follow-up: el webinar es el inicio, no el final\n\n--- C | CRITERIO ---\n\nFormato: guion + slides + engagement plan + follow-up.\nTono: energetico, profesional.\nAudiencia: 100+ registrados.\nAccion: producir el webinar.\n\n[checklist]\n- [ ] El engagement es cada 10 min\n- [ ] Los 3 bloques de contenido son densos en valor\n- [ ] El Q&A esta curado\n- [ ] El follow-up esta automatizado",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "comunicacion_thank_you_profesional",
    "label_title": "Thank You Profesional",
    "category": "comunicacion",
    "type": "spec",
    "content": "[inputs]\n- PERSONA: {{PERSONA}} > A quien agradecer\n- RAZON: {{RAZON}} > Por que exactamente\n- CANAL: {{CANAL}} > (opcional) Email, mensaje, LinkedIn\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara redactar agradecimientos profesionales que fortalezcan relaciones y abran puertas.\n\n--- P | PEDIDO ---\n\nArquetipo: Relationship Builder con experiencia en comunicacion profesional de alto impacto.\n\nThank You profesional:\n1. Especifico: agradecer por QUE exactamente (no generico)\n2. Impacto: que efecto tuvo en ti o tu trabajo\n3. Valor: reconocer la calidad de lo que hicieron\n4. Forward: que sigue o como mantener la relacion\n5. Timing: enviar dentro de 24h\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Specific > generic: 'gracias por tu ayuda con X' > 'gracias por todo'\n- Impact statement: como su accion te beneficio\n- 24-hour rule: la gratitud que tarda pierde poder\n- Channel-appropriate: email para formal, mensaje para cercano\n\n--- C | CRITERIO ---\n\nFormato: mensaje listo para enviar.\nTono: genuino, profesional.\nAudiencia: la persona a agradecer.\nAccion: enviar hoy.\n\n[checklist]\n- [ ] El agradecimiento es especifico\n- [ ] El impacto esta articulado\n- [ ] Se envio dentro de 24h\n- [ ] El tono es genuino (no formulaico)",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "comunicacion_presentar_personas",
    "label_title": "Presentar Personas",
    "category": "comunicacion",
    "type": "spec",
    "content": "[inputs]\n- PERSONA_A: {{PERSONA_A}} > Perfil de la persona A\n- PERSONA_B: {{PERSONA_B}} > Perfil de la persona B\n- RAZON: {{RAZON}} > Por que presentarlos\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara hacer presentaciones entre profesionales que generen conversaciones, no awkwardness.\n\n--- P | PEDIDO ---\n\nArquetipo: Networking Facilitator con experiencia en conexion estrategica de profesionales.\n\nPresentacion de personas:\n1. Contexto: por que los estoy presentando (el valor mutuo)\n2. Perfil A: nombre, rol, expertise relevante para B\n3. Perfil B: nombre, rol, expertise relevante para A\n4. Conexion: que tienen en comun o donde se complementan\n5. Sugerencia: un tema concreto del que podrian hablar\n6. Formato: email de doble opt-in o mensaje directo\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Double opt-in: preguntar a ambos antes de presentar\n- Value-first: explicar por que les conviene conocerse\n- One topic: sugerir 1 tema concreto de conversacion\n- Low-friction: hacer facil que conversen (no solo que se conozcan)\n\n--- C | CRITERIO ---\n\nFormato: email o mensaje de presentacion listo para enviar.\nTono: calido, profesional.\nAudiencia: las dos personas a presentar.\nAccion: enviar la presentacion.\n\n[checklist]\n- [ ] El valor mutuo esta explicado\n- [ ] Los perfiles son relevantes el uno para el otro\n- [ ] El tema de conversacion es concreto\n- [ ] Es double opt-in (no forzado)",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "negociacion_deadline_extensiones",
    "label_title": "Deadline Extensiones",
    "category": "negociacion",
    "type": "spec",
    "content": "[inputs]\n- DEADLINE: {{DEADLINE}} > Deadline original\n- PROYECTO: {{PROYECTO}} > Proyecto o entregable\n- RAZON: {{RAZON}} > Razon del retraso\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara negociar una extension de deadline sin perder credibilidad.\n\n--- P | PEDIDO ---\n\nArquetipo: Project Negotiator con experiencia en gestion de expectativas y renegociacion de plazos.\n\nExtension de deadline:\n1. Early warning: avisar ANTES de que se venza (no despues)\n2. Razon: explicar que paso (hechos, no excusas)\n3. Nuevo plan: fecha propuesta + que cambia para asegurar cumplimiento\n4. Mitigacion: que haces para minimizar el impacto del retraso\n5. Compromiso: que puedes entregar parcialmente a la fecha original\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Early > late: avisar tarde destruye confianza\n- Facts > excuses: datos sobre lo que paso\n- Solution-oriented: no solo el problema, sino el nuevo plan\n- Partial delivery: algo a tiempo es mejor que nada tarde\n\n--- C | CRITERIO ---\n\nFormato: mensaje de renegociacion listo para enviar.\nTono: profesional, responsible.\nAudiencia: stakeholder esperando el entregable.\nAccion: enviar hoy.\n\n[checklist]\n- [ ] El aviso es antes del deadline (no despues)\n- [ ] La razon son hechos (no excusas)\n- [ ] El nuevo plan tiene fecha concreta\n- [ ] La entrega parcial esta ofrecida",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "negociacion_scope_creep_defender",
    "label_title": "Scope Creep Defender",
    "category": "negociacion",
    "type": "spec",
    "content": "[inputs]\n- CAMBIO: {{CAMBIO}} > Que se esta pidiendo adicional\n- SCOPE_ORIGINAL: {{SCOPE_ORIGINAL}} > Alcance acordado originalmente\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara defender el scope de un proyecto cuando el cliente o stakeholder pide mas sin mas recursos.\n\n--- P | PEDIDO ---\n\nArquetipo: Scope Management Specialist con experiencia en proteccion de scope para proyectos de consultoria.\n\nDefensa de scope:\n1. Documentar: que se acordo originalmente (el contrato habla)\n2. Cuantificar: que implica el cambio (horas, costo, riesgo, delay)\n3. Opciones: (A) agregar scope + recursos + tiempo, (B) trade: algo nuevo entra, algo sale, (C) fase 2: lo nuevo va a un siguiente proyecto\n4. Presentar: con datos, no con frustracion\n5. Decidir juntos: el stakeholder elige con info completa\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Document first: si no esta escrito, no existe\n- Quantify the ask: el 'small change' puede ser 2 semanas de trabajo\n- Trade > accept: si algo entra, algo sale\n- Partnership: estamos del mismo lado, gestionando recursos\n\n--- C | CRITERIO ---\n\nFormato: analisis de cambio de scope + opciones.\nTono: colaborativo, firme.\nAudiencia: stakeholder que pide mas.\nAccion: presentar las opciones.\n\n[checklist]\n- [ ] El scope original esta documentado\n- [ ] El impacto del cambio esta cuantificado\n- [ ] Las opciones son viables (no solo 'no se puede')\n- [ ] La decision es del stakeholder con info completa",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "creatividad_reverse_brainstorm",
    "label_title": "Reverse Brainstorm",
    "category": "creatividad",
    "type": "spec",
    "content": "[inputs]\n- PROBLEMA: {{PROBLEMA}} > Problema a resolver creativamente\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara generar ideas resolviendo el OPUESTO del problema. Si quieres mas clientes, primero piensa como perderlos todos.\n\n--- P | PEDIDO ---\n\nArquetipo: Innovation Facilitator con experiencia en tecnicas de brainstorming inverso para equipos de producto.\n\nReverse Brainstorm:\n1. Invertir: como GARANTIZARIAS que el problema empeore\n2. Listar 10 formas de empeorar\n3. Invertir cada una: la solucion es lo opuesto\n4. Evaluar: cuales de las inversiones son ideas viables\n5. Top 3 ideas mas prometedoras\n6. Prototipar la #1\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Inversion: mas facil pensar en como destruir que como construir\n- Charlie Munger: 'tell me where I'm going to die so I never go there'\n- Every bad idea has a good inverse\n- Playfulness: el humor desbloquea creatividad\n\n--- C | CRITERIO ---\n\nFormato: 10 malas ideas + inversiones + top 3.\nTono: jugueton-serio.\nAudiencia: equipo creativo.\nAccion: prototipar la idea #1.\n\n[checklist]\n- [ ] Las 10 formas de empeorar son plausibles\n- [ ] Las inversiones son ideas genuinamente nuevas\n- [ ] El top 3 es viable\n- [ ] Al menos 1 idea es no-obvia",
    "paramCount": 2,
    "keywords": []
  },
  {
    "id": "creatividad_mashup_ideas",
    "label_title": "Mashup Ideas",
    "category": "creatividad",
    "type": "spec",
    "content": "[inputs]\n- DOMINIO_A: {{DOMINIO_A}} > Tu dominio/problema\n- DOMINIO_B: {{DOMINIO_B}} > (opcional) Un dominio completamente diferente (o aleatorio)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear algo nuevo combinando 2 conceptos aparentemente no relacionados. Las mejores ideas son combinaciones inesperadas.\n\n--- P | PEDIDO ---\n\nArquetipo: Combinatorial Creativity Coach con experiencia en ideacion por combinacion para startups.\n\nMashup creativo:\n1. Concepto A: el dominio donde tienes el problema\n2. Concepto B: un dominio completamente diferente\n3. Transferencia: que principios de B aplican a A?\n4. 5 mashups: combinaciones concretas A×B\n5. Evaluar: viabilidad e innovacion de cada mashup\n6. Desarrollar: la mashup mas prometedora como concepto\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Forced analogy: cuanto mas lejanos los dominios, mas innovador\n- Structure transfer: transferir la estructura, no la superficie\n- 'What would X do?': como resolveria Netflix/Spotify/Uber este problema\n- Quantity: 5 mashups minimo antes de evaluar\n\n--- C | CRITERIO ---\n\nFormato: 5 mashups + evaluacion + concepto desarrollado.\nTono: creativo, exploratorio.\nAudiencia: innovador.\nAccion: prototipar el mashup ganador.\n\n[checklist]\n- [ ] Los 2 dominios son genuinamente diferentes\n- [ ] Los mashups son mas que analogias superficiales\n- [ ] La evaluacion es por viabilidad e innovacion\n- [ ] El concepto ganador esta desarrollado",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "bienestar_boundaries_profesionales",
    "label_title": "Boundaries Profesionales",
    "category": "bienestar",
    "type": "spec",
    "content": "[inputs]\n- VIOLACIONES: {{VIOLACIONES}} > Donde se violan tus limites actualmente\n- ROL: {{ROL}} > Tu rol profesional\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara establecer limites profesionales saludables que protejan tu energia sin danar relaciones.\n\n--- P | PEDIDO ---\n\nArquetipo: Coach de Boundaries con experiencia en establecimiento de limites para profesionales people-pleasers.\n\nProfessional Boundaries:\n1. Audit: donde se violan tus limites actualmente\n2. Non-negotiables: 3-5 limites que no se negocian (ej: no emails despues de las 7pm)\n3. Scripts: como comunicar cada limite (frases exactas)\n4. Enforcement: que hacer cuando alguien cruza el limite\n5. Self-compassion: por que los limites no son egoismo\n6. Review: ajustar trimestralmente\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Boundaries ≠ walls: limites protegen la relacion, no la danan\n- Script it: tener la frase lista reduce la friccion de decir no\n- Consistent > perfect: un limite a veces > ningun limite\n- Model it: tus limites dan permiso a otros de poner los suyos\n\n--- C | CRITERIO ---\n\nFormato: lista de boundaries + scripts + enforcement.\nTono: firme, compasivo.\nAudiencia: profesional que dice si a todo.\nAccion: comunicar el boundary #1 esta semana.\n\n[checklist]\n- [ ] Los non-negotiables son max 5 y claros\n- [ ] Los scripts son frases listas para usar\n- [ ] El enforcement es firme pero respetuoso\n- [ ] La review trimestral esta calendarizada",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "bienestar_mindfulness_2min",
    "label_title": "Mindfulness 2min",
    "category": "bienestar",
    "type": "spec",
    "content": "[inputs]\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara practicar mindfulness en 2 minutos entre tareas, sin necesidad de app, mat o silencio.\n\n--- P | PEDIDO ---\n\nArquetipo: Mindfulness Teacher con experiencia en mindfulness para profesionales en entornos de alta presion.\n\nMindfulness 2 min:\n1. Parar: cerrar ojos o fijar mirada en un punto (5 seg)\n2. Respirar: 3 respiraciones profundas conscientes (15 seg)\n3. Escanear: donde hay tension en el cuerpo? (30 seg)\n4. Soltar: exhalar la tension intencionalmente (30 seg)\n5. Intencion: 1 palabra para los proximos 30 min (15 seg)\n6. Volver: abrir ojos, continuar con presencia (5 seg)\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Micro-practice: 2 min > 0 min. No necesitas 20.\n- Body scan express: el cuerpo guarda estres que la mente ignora\n- Intention setting: 1 palabra que ancle los proximos 30 min\n- Transition ritual: usar entre reuniones o bloques de trabajo\n\n--- C | CRITERIO ---\n\nFormato: protocolo de 2 min memorizable.\nTono: sereno.\nAudiencia: profesional estresado.\nAccion: practicar entre la proxima tarea.\n\n[checklist]\n- [ ] El protocolo cabe en 2 minutos reales\n- [ ] No requiere app ni equipo\n- [ ] La intencion ancla los siguientes 30 min\n- [ ] Es practicable en cualquier lugar",
    "paramCount": 1,
    "keywords": []
  },
  {
    "id": "stack_browser_productividad",
    "label_title": "Browser Productividad",
    "category": "stack",
    "type": "spec",
    "content": "[inputs]\n- BROWSER: {{BROWSER}} > Chrome, Firefox, Arc, Edge, etc.\n- USO: {{USO}} > Para que usas el browser principalmente\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara configurar tu browser como herramienta de productividad, no de distraccion.\n\n--- P | PEDIDO ---\n\nArquetipo: Browser Productivity Engineer con experiencia en configuracion de browsers para power users.\n\nBrowser productivo:\n1. Profiles: separar trabajo de personal\n2. Pinned tabs: solo las 3-5 apps esenciales\n3. Extensions: las 5 que realmente usas (eliminar el resto)\n4. Bookmarks: organizados por proyecto/area\n5. Tab management: extension para limitar pestanas abiertas\n6. Homepage: dashboard util, no feed de noticias\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Profiles: segregar contextos elimina distraccion\n- Less tabs: cada pestana abierta es carga cognitiva\n- Extensions audit: cada extension tiene un costo de rendimiento\n- Clean homepage: lo primero que ves calibra tu dia\n\n--- C | CRITERIO ---\n\nFormato: guia de configuracion paso a paso.\nTono: practico.\nAudiencia: profesional con 47 pestanas abiertas.\nAccion: configurar el browser hoy.\n\n[checklist]\n- [ ] Los profiles estan separados (trabajo/personal)\n- [ ] Las pinned tabs son max 5\n- [ ] Las extensions son max 5 (las utiles)\n- [ ] El homepage es productivo",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "stack_note_taking_system",
    "label_title": "Note Taking System",
    "category": "stack",
    "type": "spec",
    "content": "[inputs]\n- HERRAMIENTA: {{HERRAMIENTA}} > Herramienta de notas actual o preferida\n- VOLUMEN: {{VOLUMEN}} > Notas por semana aproximadamente\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara implementar un sistema de toma de notas que capture, organice y haga recuperable tu conocimiento.\n\n--- P | PEDIDO ---\n\nArquetipo: Knowledge Management Designer con experiencia en sistemas de notas para profesionales del conocimiento.\n\nNote-Taking System:\n1. Herramienta: seleccion (Notion, Obsidian, Apple Notes, etc.)\n2. Tipos de nota: meeting, idea, reference, project, daily\n3. Template por tipo: estructura estandar\n4. Naming convention: consistente y buscable\n5. Organization: folders vs tags vs links\n6. Capture workflow: como capturar rapido desde cualquier lugar\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Capture fast: si toma mas de 10 seg capturar, no se captura\n- Process weekly: captura rapida, organizacion semanal\n- Retrieve > organize: el sistema vale si puedes ENCONTRAR la nota\n- One system: consolidar en 1 herramienta, no 5\n\n--- C | CRITERIO ---\n\nFormato: spec del sistema + templates + capture workflow.\nTono: sistematico.\nAudiencia: profesional que pierde informacion.\nAccion: configurar templates y capture hoy.\n\n[checklist]\n- [ ] La herramienta esta seleccionada (1 sola)\n- [ ] Los templates cubren los 5 tipos de nota\n- [ ] El naming convention es consistente\n- [ ] El capture workflow es <10 segundos",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "stack_ai_tools_portfolio",
    "label_title": "Ai Tools Portfolio",
    "category": "stack",
    "type": "spec",
    "content": "[inputs]\n- HERRAMIENTAS_IA: {{HERRAMIENTAS_IA}} > Herramientas IA que usas actualmente\n- TAREAS: {{TAREAS}} > Tareas principales que haces con IA\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar tu portfolio personal de herramientas de IA, optimizando cobertura y evitando redundancia.\n\n--- P | PEDIDO ---\n\nArquetipo: AI Tools Curator con experiencia en evaluacion y adoption de herramientas IA para profesionales.\n\nAI Tools Portfolio:\n1. Inventario: que herramientas IA usas hoy\n2. Mapa de cobertura: que tipo de tarea cubre cada una\n3. Gaps: que tareas no tienen herramienta IA asignada\n4. Redundancias: donde 2+ herramientas hacen lo mismo\n5. Stack optimo: 3-5 herramientas que cubren el 80% de tus necesidades\n6. Cost vs value: lo que pagas vs lo que aporta\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Task-first: que tareas hago > que herramientas existen\n- 3-5 core tools: no 15. Less is more.\n- Free tier audit: cuantas puedes usar en free sin perder valor\n- Quarterly review: el landscape cambia cada 3 meses\n\n--- C | CRITERIO ---\n\nFormato: portfolio de IA + mapa de cobertura + costos.\nTono: estrategico.\nAudiencia: profesional que usa IA.\nAccion: eliminar 1 herramienta redundante.\n\n[checklist]\n- [ ] El mapa de cobertura es completo\n- [ ] Las redundancias estan identificadas\n- [ ] El stack optimo es 3-5 herramientas\n- [ ] El costo mensual total esta calculado",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "stack_second_brain_disenar",
    "label_title": "Second Brain Disenar",
    "category": "stack",
    "type": "spec",
    "content": "[inputs]\n- HERRAMIENTA: {{HERRAMIENTA}} > Herramienta de notas (Notion, Obsidian, etc.)\n- VOLUMEN: {{VOLUMEN}} > Cuanto contenido consumes por semana\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar tu Second Brain: sistema personal de gestion de conocimiento que captura, organiza y conecta todo lo que aprendes.\n\n--- P | PEDIDO ---\n\nArquetipo: PKM Designer con experiencia en Second Brain (Tiago Forte) y Building a Second Brain para profesionales.\n\nSecond Brain:\n1. Capture: como capturas informacion (apps, workflows)\n2. Organize: PARA method (Projects, Areas, Resources, Archive)\n3. Distill: como extraes lo esencial de lo capturado\n4. Express: como usas tu conocimiento para crear valor\n5. Weekly review: ritual de mantenimiento del sistema\n6. Tools: stack minimo para implementar\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Tiago Forte BASB: CODE (Capture, Organize, Distill, Express)\n- PARA: organizar por accionabilidad, no por tema\n- Progressive summarization: cada pasada extrae mas valor\n- Capture for your future self: no acumular, sino preparar para uso\n\n--- C | CRITERIO ---\n\nFormato: arquitectura del Second Brain + tools + rituals.\nTono: sistematico, personal.\nAudiencia: profesional que quiere externalizar su memoria.\nAccion: configurar PARA en tu herramienta de notas.\n\n[checklist]\n- [ ] Las 4 fases CODE estan cubiertas\n- [ ] La estructura PARA esta implementada\n- [ ] El ritual semanal esta calendarizado\n- [ ] El stack es minimo (no 10 apps)",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "engine_report_generator_automatico",
    "label_title": "Report Generator Automatico",
    "category": "engine",
    "type": "spec",
    "content": "[inputs]\n- REPORTE: {{REPORTE}} > Tipo de reporte a automatizar\n- DATOS: {{DATOS}} > Fuente de datos\n- FRECUENCIA: {{FRECUENCIA}} > Frecuencia del reporte\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear un engine que genere reportes automaticamente a partir de datos y templates.\n\n--- P | PEDIDO ---\n\nArquetipo: Report Automation Engineer con experiencia en engines de reporting para operaciones y finanzas.\n\nReport Generator:\n1. Template: estructura del reporte con placeholders\n2. Data source: de donde vienen los datos\n3. Logic: calculos, comparaciones, alertas\n4. Narrative: texto automatico que explica los numeros\n5. Distribution: a quien, cuando, en que formato\n6. Exceptions: cuando el reporte debe ser diferente\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Template × data = report: la formula es simple\n- Exception-based: el reporte perfecto solo muestra lo anormal\n- Auto-narrative: texto que explica numeros ahorra reuniones\n- Version control: cada reporte tiene fecha y fuente\n\n--- C | CRITERIO ---\n\nFormato: spec del engine + template + data mapping.\nTono: tecnico.\nAudiencia: data analyst o BI engineer.\nAccion: crear el template base.\n\n[checklist]\n- [ ] El template tiene placeholders claros\n- [ ] El data source esta mapeado\n- [ ] Las alertas/exceptions estan definidas\n- [ ] La narrativa automatica esta disenada",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "engine_onboarding_personalizado",
    "label_title": "Onboarding Personalizado",
    "category": "engine",
    "type": "spec",
    "content": "[inputs]\n- PRODUCTO: {{PRODUCTO}} > Producto o servicio\n- USUARIOS: {{USUARIOS}} > Tipos de usuarios\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear un engine de onboarding que adapte el contenido segun el perfil del nuevo usuario.\n\n--- P | PEDIDO ---\n\nArquetipo: Product Onboarding Engineer con experiencia en engines de onboarding personalizado para SaaS.\n\nOnboarding Engine:\n1. User segments: 3-5 perfiles de usuario con necesidades diferentes\n2. Content per segment: que mostrar a cada tipo\n3. Triggers: que activa cada paso del onboarding\n4. Milestones: hitos que marcan progreso por segmento\n5. Personalization: como adaptar mensajes y contenido\n6. Metrics: completion rate, time-to-value, retention by segment\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Segment-first: no one-size-fits-all onboarding\n- Aha moment: cada segmento tiene un aha moment diferente\n- Progressive: no abrumar, revelar gradualmente\n- Data-driven: personalizar con datos, no con suposiciones\n\n--- C | CRITERIO ---\n\nFormato: spec del engine + segments + content map.\nTono: tecnico-producto.\nAudiencia: product manager.\nAccion: definir los 3-5 segments.\n\n[checklist]\n- [ ] Los segmentos son diferenciados\n- [ ] El contenido es especifico por segmento\n- [ ] Los milestones son medibles\n- [ ] Las metricas se trackean por segmento",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "solucion_mvp_disenar",
    "label_title": "Mvp Disenar",
    "category": "solucion",
    "type": "spec",
    "content": "[inputs]\n- IDEA: {{IDEA}} > Idea o producto a validar\n- HIPOTESIS: {{HIPOTESIS}} > Hipotesis principal a validar\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar un MVP que valide tu hipotesis principal con minimo esfuerzo y maximo aprendizaje.\n\n--- P | PEDIDO ---\n\nArquetipo: Product Strategist con experiencia en diseno de MVPs para startups lean.\n\nMVP Design:\n1. Hipotesis: que suposicion estamos validando\n2. Metrica de exito: que numero nos dice si funciona\n3. Scope: lo MINIMO necesario para validar (nada mas)\n4. Build: como construirlo en max 2 semanas\n5. Measure: como medir la metrica de exito\n6. Learn: criterios de go/pivot/kill\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Lean Startup: Build-Measure-Learn\n- Minimum: si no duele quitarle mas, no es minimo\n- 1 hypothesis: un MVP valida 1 cosa, no 10\n- Time-box: si no puedes construirlo en 2 semanas, no es MVP\n\n--- C | CRITERIO ---\n\nFormato: MVP spec + metrica + criterios de decision.\nTono: lean, enfocado.\nAudiencia: equipo de producto.\nAccion: construir el MVP.\n\n[checklist]\n- [ ] La hipotesis es 1 y es falsificable\n- [ ] El scope es genuinamente minimo\n- [ ] La metrica de exito esta definida antes de construir\n- [ ] Los criterios go/pivot/kill son claros",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "solucion_business_case_crear",
    "label_title": "Business Case Crear",
    "category": "solucion",
    "type": "spec",
    "content": "[inputs]\n- PROYECTO: {{PROYECTO}} > Proyecto o inversion a justificar\n- INVERSION: {{INVERSION}} > Monto estimado de inversion\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear un business case que justifique una inversion con datos, no con entusiasmo.\n\n--- P | PEDIDO ---\n\nArquetipo: Business Case Analyst con experiencia en justificacion de inversiones para comites directivos.\n\nBusiness Case:\n1. Executive summary: oportunidad + recomendacion en 1 pagina\n2. Problema: que dolor se resuelve (cuantificado)\n3. Solucion: que propones y por que\n4. Alternativas: 2-3 opciones evaluadas\n5. Financials: inversion, beneficios, ROI, payback\n6. Riesgos: principales y mitigacion\n7. Recomendacion: go/no-go + next steps\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Problem-first: el dolor justifica la inversion, no las features\n- Alternatives: siempre comparar vs alternativas (incluyendo no hacer nada)\n- Conservative financials: mejor sorprender positivamente\n- Decision-ready: el comite puede aprobar con este documento\n\n--- C | CRITERIO ---\n\nFormato: business case de 3-5 paginas.\nTono: ejecutivo, basado en datos.\nAudiencia: comite de inversion.\nAccion: aprobar la inversion.\n\n[checklist]\n- [ ] El problema esta cuantificado\n- [ ] Las alternativas estan evaluadas\n- [ ] Los financials son conservadores\n- [ ] Los riesgos tienen mitigacion",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "solucion_pitch_interno_idea",
    "label_title": "Pitch Interno Idea",
    "category": "solucion",
    "type": "spec",
    "content": "[inputs]\n- IDEA: {{IDEA}} > Tu idea\n- AUDIENCIA: {{AUDIENCIA}} > A quien presentas\n- ASK: {{ASK}} > Que necesitas\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara vender internamente una idea a tu jefe o equipo en 5 minutos con estructura y evidencia.\n\n--- P | PEDIDO ---\n\nArquetipo: Internal Pitch Coach con experiencia en advocacy de ideas dentro de organizaciones.\n\nPitch interno:\n1. Hook: 1 dato o pregunta que capture atencion (15 seg)\n2. Problema: que duele y cuanto cuesta (30 seg)\n3. Idea: tu propuesta en 1 oracion (15 seg)\n4. Evidencia: 1 dato o caso que demuestre que funciona (30 seg)\n5. Ask: que necesitas (aprobacion, recursos, tiempo) (30 seg)\n6. Next step: proximo paso concreto de baja friccion\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- 5 minutes max: el atencion span interno es corto\n- Data > opinion: un numero vale mas que 10 adjetivos\n- Small ask: pide un piloto, no la transformacion completa\n- Low-friction next step: que sea facil decir si\n\n--- C | CRITERIO ---\n\nFormato: script de 5 minutos listo para presentar.\nTono: entusiasta, fundamentado.\nAudiencia: tu jefe o equipo.\nAccion: presentar esta semana.\n\n[checklist]\n- [ ] El hook funciona en 15 segundos\n- [ ] El problema esta cuantificado\n- [ ] El ask es pequeno y de baja friccion\n- [ ] El next step es inmediato",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "solucion_forma_trabajo_documentar",
    "label_title": "Forma Trabajo Documentar",
    "category": "solucion",
    "type": "spec",
    "content": "[inputs]\n- ROL: {{ROL}} > Tu rol profesional\n- PROCESOS: {{PROCESOS}} > Procesos clave de tu trabajo\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara documentar tu forma de trabajo como un sistema replicable y ensenab. Tu metodo personal es tu mayor activo.\n\n--- P | PEDIDO ---\n\nArquetipo: Work Method Designer con experiencia en documentacion de formas de trabajo para consultores y profesionales.\n\nForma de trabajo:\n1. Filosofia: tus principios de trabajo (3-5 max)\n2. Procesos: flujos recurrentes paso a paso\n3. Herramientas: stack que usas y para que\n4. Templates: plantillas que usas regularmente\n5. Rituales: habitos y cadencias (diarios, semanales, mensuales)\n6. Metricas: como mides tu productividad\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Codify > improvise: lo que se documenta se mejora\n- Process ≠ burocracia: un buen proceso libera, no restringe\n- Living document: actualizar trimestralmente\n- Teachable: si no puedes ensenarla, no la entiendes\n\n--- C | CRITERIO ---\n\nFormato: manual de forma de trabajo (5-10 paginas).\nTono: personal, sistematico.\nAudiencia: tu yo futuro + quien quiera aprender tu metodo.\nAccion: documentar el primer proceso.\n\n[checklist]\n- [ ] Los principios son max 5 y memorables\n- [ ] Los procesos son paso a paso (no vagos)\n- [ ] Los templates estan incluidos\n- [ ] Las metricas son medibles",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "decision_go_nogo_checklist",
    "label_title": "Go Nogo Checklist",
    "category": "decision",
    "type": "spec",
    "content": "[inputs]\n- LANZAMIENTO: {{LANZAMIENTO}} > Que se esta lanzando\n- CRITERIOS: {{CRITERIOS}} > Criterios clave de evaluacion\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear un checklist de go/no-go que estandarice decisiones de lanzamiento, publicacion o despliegue.\n\n--- P | PEDIDO ---\n\nArquetipo: Launch Decision Specialist con experiencia en go/no-go decisions para releases de producto.\n\nGo/No-Go Checklist:\n1. Criterios mandatorios: si alguno falla, es NO-GO\n2. Criterios deseables: si fallan, es GO con riesgo\n3. Score por criterio: verde/amarillo/rojo\n4. Rollback plan: si va mal, como revertir\n5. Decision: GO / NO-GO / GO-WITH-CONDITIONS\n6. Sign-off: quien aprueba\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Binary mandatory: si 1 mandatorio es rojo, es NO-GO\n- Traffic light: verde=go, amarillo=caution, rojo=stop\n- Rollback-ready: nunca GO sin rollback\n- Document: la decision queda registrada\n\n--- C | CRITERIO ---\n\nFormato: checklist + decision + sign-off.\nTono: operativo.\nAudiencia: equipo de lanzamiento.\nAccion: ejecutar el checklist antes de lanzar.\n\n[checklist]\n- [ ] Los mandatorios son binarios\n- [ ] El rollback plan existe\n- [ ] La decision es clara y documentada\n- [ ] El sign-off tiene responsable",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "decision_stakeholder_alignment",
    "label_title": "Stakeholder Alignment",
    "category": "decision",
    "type": "spec",
    "content": "[inputs]\n- DECISION: {{DECISION}} > Decision que necesita alineamiento\n- STAKEHOLDERS: {{STAKEHOLDERS}} > Stakeholders involucrados\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara alinear a multiples stakeholders con diferentes intereses hacia una decision compartida.\n\n--- P | PEDIDO ---\n\nArquetipo: Consensus Builder con experiencia en facilitacion de alineamiento para proyectos multi-stakeholder.\n\nStakeholder Alignment:\n1. Mapa: stakeholders con su posicion (a favor/neutral/en contra)\n2. Intereses: que necesita cada uno realmente\n3. Common ground: donde convergen\n4. Divergencias: donde no van a ceder\n5. Propuesta: solucion que atiende el 80% de todos\n6. 1-on-1 pre-alignment: hablar con cada uno antes de la reunion grupal\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Pre-align > group-decide: las reuniones confirman, no descubren\n- Interests > positions: buscar lo profundo\n- 80% for everyone > 100% for one\n- Coalition of the willing: empezar con los que ya estan a favor\n\n--- C | CRITERIO ---\n\nFormato: mapa de alignment + propuesta + plan de pre-alignment.\nTono: diplomatico, estrategico.\nAudiencia: lider del proyecto.\nAccion: hacer las reuniones 1-on-1.\n\n[checklist]\n- [ ] El mapa de posiciones es honesto\n- [ ] Los intereses profundos estan identificados\n- [ ] La propuesta atiende a todos (no solo a ti)\n- [ ] Los 1-on-1 estan agendados",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "decision_sunk_cost_detector",
    "label_title": "Sunk Cost Detector",
    "category": "decision",
    "type": "spec",
    "content": "[inputs]\n- PROYECTO: {{PROYECTO}} > Proyecto o inversion a evaluar\n- INVERTIDO: {{INVERTIDO}} > Cuanto se ha invertido (tiempo, dinero, esfuerzo)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara detectar cuando estas tomando una decision basada en lo ya invertido (sunk cost) en lugar de en el valor futuro.\n\n--- P | PEDIDO ---\n\nArquetipo: Behavioral Economist con experiencia en debiasing de decisiones de inversion.\n\nSunk Cost Check:\n1. Lo invertido: cuanto has gastado (tiempo, dinero, esfuerzo)\n2. Test: si NO hubieras invertido nada, tomarias esta misma decision?\n3. Forward-looking: solo costos y beneficios FUTUROS cuentan\n4. Emotional audit: te cuesta dejarlo por logica o por emocion?\n5. Decision: continuar o cortar basado solo en valor futuro\n6. Permission: esta bien perder lo invertido si el futuro no justifica\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Sunk cost fallacy: lo gastado no se recupera, no influya\n- Zero-based: decide como si empezaras de cero\n- Emotional awareness: el apego es la trampa\n- Kill your darlings: los mejores decisores matan proyectos a tiempo\n\n--- C | CRITERIO ---\n\nFormato: analisis sunk cost + decision forward-looking.\nTono: honesto, liberador.\nAudiencia: decision-maker atrapado.\nAccion: decidir mirando al futuro.\n\n[checklist]\n- [ ] Lo invertido esta cuantificado\n- [ ] El test sin inversion previa esta aplicado\n- [ ] Solo costos futuros influyen\n- [ ] La decision es forward-looking",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "decision_minimum_viable_decision",
    "label_title": "Minimum Viable Decision",
    "category": "decision",
    "type": "spec",
    "content": "[inputs]\n- DECISION: {{DECISION}} > Decision grande que te paraliza\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara tomar la decision minima viable: la mas pequena que produce aprendizaje real.\n\n--- P | PEDIDO ---\n\nArquetipo: Lean Decision Coach con experiencia en minimum viable experiments para startups y corporaciones.\n\nMVD (Minimum Viable Decision):\n1. La decision grande: que quieres decidir\n2. Descomponer: cual es la decision MAS PEQUENA que puedes tomar ahora\n3. Reversibility: es reversible? Si si, hazla ya.\n4. Learning: que aprendes con esta mini-decision\n5. Next: basado en lo aprendido, cual es la siguiente mini-decision\n6. Progression: cadena de mini-decisions que construyen hacia la grande\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Break down: toda decision grande es una cadena de pequenas\n- Learn > commit: cada paso ensena antes de comprometer\n- Reversible first: empezar por lo que se puede deshacer\n- Progress > perfection: avanzar es mejor que analizar\n\n--- C | CRITERIO ---\n\nFormato: cadena de mini-decisions + aprendizajes esperados.\nTono: pragmatico.\nAudiencia: persona paralizada por la decision grande.\nAccion: tomar la mini-decision #1 hoy.\n\n[checklist]\n- [ ] La decision grande esta descompuesta\n- [ ] La mini-decision #1 es ejecutable hoy\n- [ ] El aprendizaje esperado esta definido\n- [ ] La cadena progresa hacia la decision grande",
    "paramCount": 2,
    "keywords": []
  },
  {
    "id": "liderazgo_empowerment_framework",
    "label_title": "Empowerment Framework",
    "category": "liderazgo",
    "type": "spec",
    "content": "[inputs]\n- EQUIPO: {{EQUIPO}} > Tu equipo\n- NIVEL: {{NIVEL}} > Nivel actual de autonomia del equipo\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear un framework de empowerment que de autonomia sin perder control.\n\n--- P | PEDIDO ---\n\nArquetipo: Empowerment Designer con experiencia en delegacion de autoridad para organizaciones que escalan.\n\nEmpowerment Framework:\n1. Dominio: que areas tiene autonomia el equipo\n2. Guardrails: limites que no se cruzan\n3. Decision rights: que puede decidir solo vs que necesita aprobacion\n4. Escalation: cuando y como escalar\n5. Transparency: como reporta sus decisiones\n6. Calibration: revision trimestral del nivel de autonomia\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Intent-based leadership: dar la intencion, no los pasos\n- Guardrails > rules: limites amplios, no instrucciones estrechas\n- Earned autonomy: mas autonomia con mas competencia demostrada\n- Trust but verify: confiar Y verificar resultados\n\n--- C | CRITERIO ---\n\nFormato: framework + decision matrix + calibration plan.\nTono: leadership.\nAudiencia: lider de equipo.\nAccion: definir los guardrails.\n\n[checklist]\n- [ ] Los dominios de autonomia estan claros\n- [ ] Los guardrails son amplios (no micromanagement)\n- [ ] Los decision rights son explicitos\n- [ ] La calibracion trimestral esta planificada",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "liderazgo_succession_planning",
    "label_title": "Succession Planning",
    "category": "liderazgo",
    "type": "spec",
    "content": "[inputs]\n- POSICION: {{POSICION}} > Posicion a planificar sucesion\n- EQUIPO: {{EQUIPO}} > Equipo actual\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara preparar tu sucesion o la de un miembro clave del equipo. Si tu equipo no funciona sin ti, no eres lider — eres cuello de botella.\n\n--- P | PEDIDO ---\n\nArquetipo: Succession Planning Specialist con experiencia en planificacion de sucesion para posiciones criticas.\n\nSuccession Planning:\n1. Posicion critica: cuales roles no tienen backup\n2. Candidatos internos: quien podria asumir con desarrollo\n3. Gap analysis: que le falta a cada candidato\n4. Development plan: como cerrar los gaps en 6-12 meses\n5. Knowledge transfer: que conocimiento critico documentar\n6. Test: oportunidades para que el sucesor practique\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Bus factor: si te atropella un bus, que pasa?\n- Develop > recruit: preferir desarrollo interno\n- Document tribal knowledge: lo que esta en tu cabeza y en ningun otro lado\n- Gradual handoff: no de golpe, sino progresivamente\n\n--- C | CRITERIO ---\n\nFormato: plan de sucesion + gaps + development + timeline.\nTono: estrategico.\nAudiencia: lider senior.\nAccion: identificar la posicion mas critica.\n\n[checklist]\n- [ ] Las posiciones criticas estan identificadas\n- [ ] Los candidatos tienen gap analysis\n- [ ] El knowledge transfer esta planificado\n- [ ] El test del sucesor esta programado",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "liderazgo_town_hall_preparar",
    "label_title": "Town Hall Preparar",
    "category": "liderazgo",
    "type": "spec",
    "content": "[inputs]\n- EMPRESA: {{EMPRESA}} > Tu empresa\n- PERIODO: {{PERIODO}} > Periodo a cubrir\n- ESTADO: {{ESTADO}} > Estado actual de la empresa (bueno, desafiante, en transicion)\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara preparar un town hall o all-hands que informe, inspire y genere confianza.\n\n--- P | PEDIDO ---\n\nArquetipo: Internal Communications Leader con experiencia en town halls para empresas de 50-5000 personas.\n\nTown Hall:\n1. Opening: estado de la empresa en 3 min (transparente)\n2. Wins: celebrar logros del equipo (con nombres)\n3. Challenges: que es dificil y que estamos haciendo\n4. Strategy: hacia donde vamos (vision)\n5. Q&A: preguntas reales (no planted questions)\n6. Closing: 1 mensaje que todos recuerden\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Transparency > spin: la gente detecta el BS\n- Celebrate people: nombres y logros concretos\n- Address the elephant: hablar de lo dificil genera confianza\n- 1 takeaway: si solo recuerdan 1 cosa, cual\n\n--- C | CRITERIO ---\n\nFormato: guion de town hall + slides + Q&A prep.\nTono: transparente, inspirador.\nAudiencia: toda la organizacion.\nAccion: facilitar el town hall.\n\n[checklist]\n- [ ] Los wins tienen nombres de personas\n- [ ] Los challenges son transparentes\n- [ ] El Q&A permite preguntas reales\n- [ ] El closing es memorable",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "aprendizaje_active_recall_practice",
    "label_title": "Active Recall Practice",
    "category": "aprendizaje",
    "type": "spec",
    "content": "[inputs]\n- MATERIAL: {{MATERIAL}} > Contenido a dominar\n- OBJETIVO: {{OBJETIVO}} > Para que necesitas dominarlo\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar sesiones de active recall que fijen conocimiento en memoria de largo plazo.\n\n--- P | PEDIDO ---\n\nArquetipo: Cognitive Learning Scientist con evidencia de que active recall es 3x mas efectivo que re-lectura.\n\nActive Recall:\n1. Material: contenido a memorizar/dominar\n2. Questions: transformar el material en preguntas\n3. Self-test: responder sin mirar la fuente\n4. Check: verificar y corregir\n5. Space: repetir en intervalos crecientes\n6. Track: accuracy rate como metrica\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Recall > re-read: intentar recordar fija mas que releer\n- Question-based: transformar todo en preguntas testables\n- Desirable difficulty: si es facil de recordar, no estas aprendiendo\n- Spacing: distribuir la practica en el tiempo\n\n--- C | CRITERIO ---\n\nFormato: set de preguntas + protocolo de practica.\nTono: pedagogico.\nAudiencia: profesional que estudia.\nAccion: hacer la primera sesion de recall.\n\n[checklist]\n- [ ] Las preguntas cubren el material\n- [ ] El self-test es sin mirar la fuente\n- [ ] Los intervalos de repaso estan definidos\n- [ ] La accuracy rate se trackea",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "aprendizaje_interleaving_practice",
    "label_title": "Interleaving Practice",
    "category": "aprendizaje",
    "type": "spec",
    "content": "[inputs]\n- HABILIDADES: {{HABILIDADES}} > Habilidades a practicar\n- TIEMPO: {{TIEMPO}} > Tiempo disponible por sesion\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar practica intercalada que mezcla temas/habilidades en lugar de practicar uno a la vez.\n\n--- P | PEDIDO ---\n\nArquetipo: Learning Science Practitioner con evidencia de que interleaving mejora transferencia y retencion.\n\nInterleaving:\n1. Skills: 3-5 habilidades a practicar\n2. Mix: alternar entre habilidades en cada sesion (no bloques)\n3. Difficulty: variar la dificultad dentro de cada habilidad\n4. Connection: buscar patrones entre habilidades diferentes\n5. Schedule: sesiones de 45-60 min con mix optimizado\n6. Compare: vs blocked practice (practicar 1 a la vez)\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Interleaving > blocking: mezclar es mas dificil pero aprende mas\n- Desirable difficulty: se siente mas dificil, PERO produce mejor retencion\n- Discrimination: mezclar te obliga a distinguir entre situaciones\n- Transfer: interleaving mejora la aplicacion a casos nuevos\n\n--- C | CRITERIO ---\n\nFormato: plan de practica intercalada + schedule.\nTono: cientifico-practico.\nAudiencia: profesional que quiere aprender mejor.\nAccion: disena la proxima sesion con interleaving.\n\n[checklist]\n- [ ] Las habilidades estan mezcladas (no en bloques)\n- [ ] La dificultad varia\n- [ ] Las conexiones entre habilidades estan buscadas\n- [ ] El schedule es sostenible",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "aprendizaje_elaboration_tecnica",
    "label_title": "Elaboration Tecnica",
    "category": "aprendizaje",
    "type": "spec",
    "content": "[inputs]\n- CONCEPTO: {{CONCEPTO}} > Nuevo concepto a aprender\n- CONOCIMIENTO_PREVIO: {{CONOCIMIENTO_PREVIO}} > (opcional) Con que conocimiento existente conectar\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara usar elaboration: conectar nuevos conceptos con conocimiento existente para retencion profunda.\n\n--- P | PEDIDO ---\n\nArquetipo: Knowledge Integration Specialist con evidencia de que la elaboracion produce comprension profunda.\n\nElaboration:\n1. Nuevo concepto a aprender\n2. Conexion: como se relaciona con algo que ya se\n3. Ejemplo: crear un ejemplo propio (no el del libro)\n4. Analogia: en que se parece a algo de mi experiencia\n5. Contraste: en que se diferencia de lo que ya se\n6. Application: como lo uso en mi trabajo esta semana\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Generate > receive: crear tus propias explicaciones\n- Connect: anclar lo nuevo en lo conocido\n- Self-examples: tus ejemplos se recuerdan mejor que los ajenos\n- Apply: usar el concepto en contexto real fija el aprendizaje\n\n--- C | CRITERIO ---\n\nFormato: concepto + conexiones + ejemplo + aplicacion.\nTono: reflexivo.\nAudiencia: profesional aprendiendo.\nAccion: elaborar sobre lo ultimo que aprendiste.\n\n[checklist]\n- [ ] La conexion con conocimiento previo es explicita\n- [ ] El ejemplo es propio (no copiado)\n- [ ] La analogia es clara\n- [ ] La aplicacion es concreta y esta semana",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "aprendizaje_community_learning",
    "label_title": "Community Learning",
    "category": "aprendizaje",
    "type": "spec",
    "content": "[inputs]\n- TEMA: {{TEMA}} > Tema a aprender juntos\n- NIVEL: {{NIVEL}} > Nivel de los miembros\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar un grupo de estudio que acelere el aprendizaje de todos los miembros.\n\n--- P | PEDIDO ---\n\nArquetipo: Community Learning Designer con experiencia en diseno de comunidades de practica y grupos de estudio.\n\nGrupo de estudio:\n1. Objetivo: que aprenderemos juntos\n2. Miembros: 3-7 personas con nivel y compromiso similar\n3. Cadencia: frecuencia y duracion de sesiones\n4. Formato: presentaciones rotativas, discusion, practica conjunta\n5. Accountability: compromisos entre sesiones\n6. Resources: materiales compartidos\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Teach to learn: presentar a otros fija el conocimiento\n- Social accountability: el grupo motiva mas que la autodisciplina\n- Diverse perspectives: cada persona ve diferente\n- Small groups: 3-7 personas, mas es inmanejable\n\n--- C | CRITERIO ---\n\nFormato: charter del grupo + cadencia + formato + recursos.\nTono: colaborativo.\nAudiencia: futuros miembros del grupo.\nAccion: invitar a los 3-5 primeros miembros.\n\n[checklist]\n- [ ] El objetivo es claro y compartido\n- [ ] Los miembros son 3-7 con compromiso\n- [ ] El formato rota responsabilidades\n- [ ] La accountability es mutua",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "aprendizaje_learning_from_failure",
    "label_title": "Learning From Failure",
    "category": "aprendizaje",
    "type": "spec",
    "content": "[inputs]\n- EVENTO: {{EVENTO}} > Fracaso o error a analizar\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara extraer aprendizaje sistematico de un fracaso o error. El fracaso sin reflexion es desperdicio; con reflexion es educacion.\n\n--- P | PEDIDO ---\n\nArquetipo: Failure Analysis Coach con experiencia en post-mortems y learning from failure para equipos de innovacion.\n\nLearning from Failure:\n1. Facts: que paso exactamente (sin juicios)\n2. Expected vs actual: que esperabas vs que ocurrio\n3. Root cause: por que paso realmente (5 Whys)\n4. Lessons: que aprendi (especifico, no generico)\n5. Transferable: en que otras situaciones aplica esta leccion\n6. Changes: que cambio concretamente para que no se repita\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Blameless: analizar el sistema, no culpar a la persona\n- Facts first: cronologia de hechos antes de interpretaciones\n- 5 Whys: profundizar hasta la causa raiz\n- Forward-looking: la leccion vale mas que el lamento\n\n--- C | CRITERIO ---\n\nFormato: post-mortem estructurado + lecciones + cambios.\nTono: honesto, sin culpa.\nAudiencia: tu mismo o tu equipo.\nAccion: implementar el cambio #1.\n\n[checklist]\n- [ ] Los hechos estan separados de juicios\n- [ ] El root cause va mas alla de lo superficial\n- [ ] Las lecciones son transferibles\n- [ ] Los cambios son concretos e implementables",
    "paramCount": 2,
    "keywords": []
  },
  {
    "id": "estrategia_resource_allocation",
    "label_title": "Resource Allocation",
    "category": "estrategia",
    "type": "spec",
    "content": "[inputs]\n- RECURSOS: {{RECURSOS}} > Recursos disponibles\n- INICIATIVAS: {{INICIATIVAS}} > Iniciativas compitiendo por recursos\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara asignar recursos (tiempo, dinero, personas) de forma estrategica, no reactiva.\n\n--- P | PEDIDO ---\n\nArquetipo: Resource Allocation Strategist con experiencia en portfolio management y asignacion estrategica de recursos.\n\nResource Allocation:\n1. Inventario: recursos totales disponibles (horas, presupuesto, personas)\n2. Demandas: todas las iniciativas compitiendo por recursos\n3. Prioridad: ordenar por impacto estrategico × viabilidad\n4. Asignacion: cuanto a cada iniciativa (70-20-10 si aplica)\n5. Trade-offs: que NO se financia y por que\n6. Review: recalibrar trimestralmente\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Strategy = resource allocation: la estrategia ES donde pones tus recursos\n- 70-20-10: 70% core, 20% adjacente, 10% exploracion\n- Say no explicitly: lo que no se financia se comunica\n- Quarterly re-allocation: el mundo cambia, los recursos se reasignan\n\n--- C | CRITERIO ---\n\nFormato: tabla de asignacion + trade-offs + cadencia.\nTono: estrategico.\nAudiencia: equipo de liderazgo.\nAccion: reasignar basado en prioridades.\n\n[checklist]\n- [ ] Los recursos estan inventariados\n- [ ] Las iniciativas estan priorizadas\n- [ ] Los trade-offs son explicitos\n- [ ] La review trimestral esta calendarizada",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "estrategia_competitive_positioning",
    "label_title": "Competitive Positioning",
    "category": "estrategia",
    "type": "spec",
    "content": "[inputs]\n- PRODUCTO: {{PRODUCTO}} > Tu producto o servicio\n- COMPETIDORES: {{COMPETIDORES}} > Competidores principales\n- AUDIENCIA: {{AUDIENCIA}} > Audiencia objetivo\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara definir tu posicionamiento competitivo: como quieres ser percibido vs la competencia.\n\n--- P | PEDIDO ---\n\nArquetipo: Positioning Strategist con framework de Al Ries y Jack Trout (Positioning: The Battle for Your Mind).\n\nCompetitive Positioning:\n1. Category: en que categoria compites (definida por el cliente, no por ti)\n2. Competitors: quienes son las alternativas reales\n3. Differentiation: que haces diferente (no mejor, diferente)\n4. Value proposition: para [quien], [que ofreces] que [diferenciador]\n5. Proof: evidencia que soporta tu claim\n6. Messaging: como comunicar tu posicion en 1 oracion\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Different > better: la diferenciacion es mas sostenible que la superioridad\n- Customer-defined category: la categoria la define el comprador\n- Own a word: que 1 palabra asocian contigo\n- Consistency: repetir el mismo mensaje miles de veces\n\n--- C | CRITERIO ---\n\nFormato: positioning statement + messaging + proof points.\nTono: estrategico.\nAudiencia: equipo de marketing/estrategia.\nAccion: alinear toda comunicacion al positioning.\n\n[checklist]\n- [ ] La categoria esta definida desde el cliente\n- [ ] La diferenciacion es genuina\n- [ ] La value proposition es en 1 oracion\n- [ ] El proof soporta el claim",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "estrategia_antifragil_plan",
    "label_title": "Antifragil Plan",
    "category": "estrategia",
    "type": "spec",
    "content": "[inputs]\n- PLAN: {{PLAN}} > Plan o estrategia a hacer antifragil\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar un plan que se fortalezca con la adversidad en lugar de solo resistirla.\n\n--- P | PEDIDO ---\n\nArquetipo: Antifragility Strategist con framework de Nassim Taleb para disenar sistemas que ganan con el desorden.\n\nPlan Antifragil:\n1. Fragilities: donde tu plan se rompe bajo estres\n2. Robustez: como hacerlo resistente a shocks conocidos\n3. Antifragilidad: como disenar para GANAR con shocks\n4. Optionality: crear opciones que te beneficien si las cosas cambian\n5. Barbell: 90% seguro + 10% apuestas asimetricas\n6. Via negativa: que eliminar para reducir fragilidad\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Taleb Antifragile: fragile < robust < antifragile\n- Barbell strategy: seguro en el centro, riesgo asimetrico en los extremos\n- Via negativa: mejorar quitando, no agregando\n- Small bets: multiples apuestas pequenas con upside ilimitado\n\n--- C | CRITERIO ---\n\nFormato: mapa de fragilidades + plan antifragil + apuestas.\nTono: estrategico, contraintuitivo.\nAudiencia: estratega.\nAccion: eliminar la fragilidad #1.\n\n[checklist]\n- [ ] Las fragilidades estan mapeadas\n- [ ] La estrategia barbell esta aplicada\n- [ ] Las apuestas asimetricas estan definidas\n- [ ] La via negativa se aplico (se quito algo)",
    "paramCount": 2,
    "keywords": []
  },
  {
    "id": "estrategia_moat_personal_carrera",
    "label_title": "Moat Personal Carrera",
    "category": "estrategia",
    "type": "spec",
    "content": "[inputs]\n- ROL: {{ROL}} > Tu rol actual\n- ASPIRACION: {{ASPIRACION}} > Hacia donde va tu carrera\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara construir tu moat personal de carrera: la ventaja competitiva que hace dificil reemplazarte.\n\n--- P | PEDIDO ---\n\nArquetipo: Career Moat Builder con experiencia en desarrollo de ventajas competitivas personales para profesionales.\n\nCareer Moat:\n1. Audit: que te hace dificil de reemplazar hoy\n2. Tipo de moat: expertise, red, reputacion, combinacion unica\n3. Gaps: donde eres reemplazable facilmente\n4. Deepening: como profundizar tu moat existente\n5. Diversifying: como agregar un segundo moat complementario\n6. Plan 12 meses: acciones para fortalecer tu posicion\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Career capital: expertise + red + reputacion + posicion\n- Stacking: combinar habilidades crea unicidad\n- Reputation compounds: cada output publico construye moat\n- Unreplaceable: no se el mejor, se el unico\n\n--- C | CRITERIO ---\n\nFormato: career moat analysis + plan de fortalecimiento.\nTono: estrategico-personal.\nAudiencia: tu mismo.\nAccion: fortalecer el moat #1.\n\n[checklist]\n- [ ] El audit es honesto\n- [ ] Los gaps de reemplazabilidad estan identificados\n- [ ] El plan tiene acciones concretas por mes\n- [ ] Al menos 2 tipos de moat estan siendo construidos",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "estrategia_value_chain_personal",
    "label_title": "Value Chain Personal",
    "category": "estrategia",
    "type": "spec",
    "content": "[inputs]\n- ROL: {{ROL}} > Tu rol profesional\n- OUTPUTS: {{OUTPUTS}} > Que entregas regularmente\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara mapear tu cadena de valor personal: como transformas inputs en outputs de valor.\n\n--- P | PEDIDO ---\n\nArquetipo: Personal Strategy Consultant con framework de Michael Porter adaptado a carreras profesionales.\n\nValue Chain Personal:\n1. Inputs: que recibes (informacion, datos, briefs, requests)\n2. Transformation: que haces con esos inputs (tu proceso)\n3. Outputs: que entregas (entregables, decisiones, resultados)\n4. Value add: donde agregas mas valor en la cadena\n5. Bottlenecks: donde se frena tu cadena\n6. Optimization: como aumentar valor y reducir friccion\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Porter's value chain adaptado a personas\n- Value-add zones: donde tu contribucion es unica\n- Bottleneck = opportunity: resolver el cuello de botella da mas valor\n- Outsource low-value: delegar o automatizar lo que no agrega valor\n\n--- C | CRITERIO ---\n\nFormato: mapa de cadena de valor + optimizaciones.\nTono: analitico-personal.\nAudiencia: tu mismo.\nAccion: optimizar el bottleneck #1.\n\n[checklist]\n- [ ] La cadena input > transform > output esta mapeada\n- [ ] Las zonas de alto valor estan identificadas\n- [ ] Los bottlenecks estan cuantificados\n- [ ] Las optimizaciones son concretas",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "presentacion_project_kickoff",
    "label_title": "Project Kickoff",
    "category": "presentacion",
    "type": "spec",
    "content": "[inputs]\n- PROYECTO: {{PROYECTO}} > Proyecto a lanzar\n- EQUIPO: {{EQUIPO}} > Equipo involucrado\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar una presentacion de kickoff que alinee al equipo desde el dia 1.\n\n--- P | PEDIDO ---\n\nArquetipo: Project Kickoff Facilitator con experiencia en kickoffs que generan momentum y alineamiento.\n\nKickoff Presentation:\n1. Why: por que este proyecto importa\n2. What: scope, entregables, timeline\n3. Who: roles, responsables, escalacion\n4. How: metodologia, herramientas, cadencias\n5. Success: como se ve el exito\n6. Q&A + compromisos\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Why first: conectar con proposito antes que con tareas\n- Clear roles: cada persona sale sabiendo que hace\n- Definition of Done: alinear expectativas desde el inicio\n- Energy: el kickoff marca el tono del proyecto\n\n--- C | CRITERIO ---\n\nFormato: deck de kickoff + template de roles + DOD.\nTono: energetico, alineador.\nAudiencia: equipo del proyecto.\nAccion: facilitar el kickoff.\n\n[checklist]\n- [ ] El 'why' esta articulado\n- [ ] Los roles son claros\n- [ ] El definition of done esta definido\n- [ ] El Q&A esta preparado",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "presentacion_report_mensual",
    "label_title": "Report Mensual",
    "category": "presentacion",
    "type": "spec",
    "content": "[inputs]\n- AREA: {{AREA}} > Tu area o proyecto\n- PERIODO: {{PERIODO}} > Mes a reportar\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear un reporte mensual que comunique progreso, problemas y planes en 5 min de lectura.\n\n--- P | PEDIDO ---\n\nArquetipo: Business Reporting Specialist con experiencia en reportes mensuales para stakeholders ejecutivos.\n\nReporte mensual:\n1. TL;DR: status en 1 oracion\n2. KPIs: 3-5 metricas vs target\n3. Highlights: top 3 logros\n4. Challenges: top 3 problemas + acciones\n5. Next month: 3 prioridades\n6. Ask: que necesitas de los stakeholders\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- TL;DR first: el lector decide en 30 seg si lee mas\n- Traffic light KPIs: verde/amarillo/rojo visual\n- Bad news early: los stakeholders odian las sorpresas\n- Actionable ask: si necesitas algo, pedirlo\n\n--- C | CRITERIO ---\n\nFormato: reporte de 1-2 paginas.\nTono: profesional, transparente.\nAudiencia: stakeholders.\nAccion: enviar el primer dia del mes.\n\n[checklist]\n- [ ] El TL;DR cabe en 1 oracion\n- [ ] Los KPIs tienen target y traffic light\n- [ ] Las challenges tienen acciones\n- [ ] El ask es claro",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "presentacion_case_competition",
    "label_title": "Case Competition",
    "category": "presentacion",
    "type": "spec",
    "content": "[inputs]\n- CASO: {{CASO}} > Caso a resolver\n- DURACION: {{DURACION}} > Tiempo de presentacion\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear una presentacion de case competition que gane: estructura, storytelling y data.\n\n--- P | PEDIDO ---\n\nArquetipo: Case Competition Coach con experiencia en coaching de equipos ganadores de competencias de caso.\n\nCase Competition Deck:\n1. Framework: el modelo de analisis elegido (con justificacion)\n2. Analysis: datos + insights + so-what\n3. Recommendation: 1 recomendacion principal (no 5)\n4. Implementation: como ejecutar en 90 dias\n5. Risks: top 3 + mitigacion\n6. Ask: resumen en 1 slide + Q&A prep\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Structure wins: el framework es el 50% del puntaje\n- 1 recommendation: foco > cobertura\n- Data-backed: cada afirmacion con evidencia\n- Practice Q&A: preparar 20 preguntas posibles\n\n--- C | CRITERIO ---\n\nFormato: deck + notas + Q&A prep.\nTono: analitico, confiado.\nAudiencia: jurado.\nAccion: practicar la presentacion.\n\n[checklist]\n- [ ] El framework esta justificado\n- [ ] La recomendacion es 1 y es accionable\n- [ ] Los datos soportan cada afirmacion\n- [ ] El Q&A tiene 20 preguntas preparadas",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "presentacion_internal_proposal",
    "label_title": "Internal Proposal",
    "category": "presentacion",
    "type": "spec",
    "content": "[inputs]\n- PROPUESTA: {{PROPUESTA}} > Tu propuesta\n- AUDIENCIA: {{AUDIENCIA}} > Quien aprueba\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear una propuesta interna que consiga aprobacion y recursos.\n\n--- P | PEDIDO ---\n\nArquetipo: Internal Change Advocate con experiencia en advocacy de propuestas dentro de organizaciones.\n\nPropuesta interna:\n1. Problem: que duele (con datos, no anecdotas)\n2. Opportunity: que se gana resolviendolo\n3. Proposal: tu solucion en 3 oraciones\n4. Cost: que se necesita (tiempo, dinero, personas)\n5. ROI: que retorna vs que cuesta\n6. Ask: aprobacion + recursos + timeline\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Pain > vision: primero el dolor, luego la solucion\n- Quantify everything: numeros hablan\n- Small ask: pedir un piloto, no la transformacion\n- Decision-ready: el deck permite aprobar sin reunion adicional\n\n--- C | CRITERIO ---\n\nFormato: deck de 8 slides max.\nTono: consultivo, data-driven.\nAudiencia: decision-maker interno.\nAccion: enviar y agendar 15 min de follow-up.\n\n[checklist]\n- [ ] El problema esta cuantificado\n- [ ] El ROI esta calculado\n- [ ] El ask es de baja friccion (piloto, no full)\n- [ ] El deck permite decidir sin reunion extra",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "comunicacion_resumen_reuniones_async",
    "label_title": "Resumen Reuniones Async",
    "category": "comunicacion",
    "type": "spec",
    "content": "[inputs]\n- REUNION: {{REUNION}} > De que fue la reunion\n- ASISTENTES: {{ASISTENTES}} > Quienes asistieron\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara comunicar resultados de reuniones a quienes no asistieron en formato async eficiente.\n\n--- P | PEDIDO ---\n\nArquetipo: Async Communication Designer con experiencia en comunicacion asincrona para equipos distribuidos.\n\nResumen async:\n1. TL;DR: 1 oracion con lo mas importante\n2. Decisiones: que se decidio (con owner)\n3. Action items: que se hace, quien, cuando\n4. Open items: que quedo pendiente\n5. FYI: contexto adicional para los que no estuvieron\n6. Format: 1 mensaje, max 200 palabras\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- 200-word max: si es mas largo, nadie lo lee\n- Decisions first: lo que cambio es lo importante\n- Action items format: VERBO + OBJETO + PERSONA + FECHA\n- 2-hour SLA: enviar dentro de 2 horas o pierde valor\n\n--- C | CRITERIO ---\n\nFormato: mensaje de 200 palabras listo para enviar.\nTono: conciso, informativo.\nAudiencia: quienes no asistieron.\nAccion: enviar dentro de 2h.\n\n[checklist]\n- [ ] Cabe en 200 palabras\n- [ ] Las decisiones tienen owner\n- [ ] Los action items tienen responsable y fecha\n- [ ] Se envio dentro de 2h",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "comunicacion_cold_outreach",
    "label_title": "Cold Outreach",
    "category": "comunicacion",
    "type": "spec",
    "content": "[inputs]\n- PERSONA: {{PERSONA}} > Persona a contactar (nombre, rol, empresa)\n- OBJETIVO: {{OBJETIVO}} > Que quieres lograr con el outreach\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara escribir un cold email o mensaje que genere respuesta sin parecer spam.\n\n--- P | PEDIDO ---\n\nArquetipo: Outreach Specialist con experiencia en cold outreach con >30% response rate para ventas B2B.\n\nCold Outreach:\n1. Research: 1 dato personal del receptor que demuestre que investigaste\n2. Hook: 1 oracion que conecte tu research con su pain\n3. Value: que puedes ofrecer que le interese (no tu producto, su beneficio)\n4. Social proof: 1 dato que genere credibilidad\n5. CTA: 1 pregunta simple y facil de responder\n6. Max 100 palabras total\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Personalization: 1 dato personalizado = 3x response rate\n- Their benefit: no 'nosotros hacemos X', sino 'tu podrias lograr Y'\n- Low-friction CTA: pregunta que se responde en 1 linea\n- 100 words: mas corto = mas leido\n\n--- C | CRITERIO ---\n\nFormato: email de 100 palabras listo para enviar.\nTono: personal, no vendedor.\nAudiencia: el prospecto frio.\nAccion: enviar y medir response rate.\n\n[checklist]\n- [ ] El research es genuino (no generico)\n- [ ] El hook conecta con su pain\n- [ ] El CTA es 1 pregunta simple\n- [ ] Max 100 palabras",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "negociacion_partnership_propuesta",
    "label_title": "Partnership Propuesta",
    "category": "negociacion",
    "type": "spec",
    "content": "[inputs]\n- PARTNER: {{PARTNER}} > Partner potencial\n- OBJETIVO: {{OBJETIVO}} > Objetivo del partnership\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar una propuesta de partnership que articule el valor mutuo y los terminos claros.\n\n--- P | PEDIDO ---\n\nArquetipo: Partnership Strategist con experiencia en desarrollo de alianzas estrategicas B2B.\n\nPartnership Proposal:\n1. Fit: por que somos complementarios (no redundantes)\n2. Value mutuo: que gana cada parte (especifico)\n3. Scope: que incluye y que NO incluye el partnership\n4. Modelo: revenue share, referrals, co-creation, co-marketing\n5. Piloto: empezar con algo pequeno para validar\n6. Exit: como terminar si no funciona\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Complementarity > similarity: que cada uno aporte lo que el otro no tiene\n- Start small: piloto antes de matrimonio\n- Exit clause: definir la salida desde el inicio (como prenup)\n- Value documentation: medir si el partnership genera lo prometido\n\n--- C | CRITERIO ---\n\nFormato: propuesta de partnership + modelo + piloto.\nTono: profesional, win-win.\nAudiencia: potential partner.\nAccion: enviar la propuesta.\n\n[checklist]\n- [ ] El fit esta articulado (no es forzado)\n- [ ] El valor mutuo es especifico\n- [ ] El piloto es de bajo riesgo\n- [ ] La exit clause esta incluida",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "negociacion_objecion_handling",
    "label_title": "Objecion Handling",
    "category": "negociacion",
    "type": "spec",
    "content": "[inputs]\n- PRODUCTO: {{PRODUCTO}} > Producto o servicio\n- OBJECIONES: {{OBJECIONES}} > (opcional) Objeciones que has escuchado\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara preparar respuestas a las objeciones mas comunes en una negociacion de ventas.\n\n--- P | PEDIDO ---\n\nArquetipo: Sales Negotiation Trainer con experiencia en entrenamiento de objecion handling para equipos comerciales.\n\nObjecion Handling:\n1. Top 10 objeciones mas comunes para tu producto\n2. Root cause: que hay detras de cada objecion (miedo, presupuesto, timing)\n3. Response: respuesta fundamentada por objecion\n4. Evidence: dato, caso, o testimonio que soporta la respuesta\n5. Bridge: como reconectar con el valor despues de responder\n6. Practice: ensayar cada respuesta hasta que sea natural\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Acknowledge > respond: primero validar, luego responder\n- Root cause: 'es muy caro' puede ser 'no veo el valor'\n- Feel-Felt-Found: 'entiendo como te sientes, otros sintieron lo mismo, lo que encontraron fue...'\n- Bridge to value: toda respuesta termina en valor\n\n--- C | CRITERIO ---\n\nFormato: tabla de objeciones + respuestas + evidencia.\nTono: empatico, preparado.\nAudiencia: vendedor.\nAccion: ensayar las top 5 objeciones.\n\n[checklist]\n- [ ] Las 10 objeciones son reales (de la experiencia)\n- [ ] Las root causes estan identificadas\n- [ ] Las respuestas tienen evidencia\n- [ ] El bridge a valor esta articulado",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "creatividad_provocative_questions",
    "label_title": "Provocative Questions",
    "category": "creatividad",
    "type": "spec",
    "content": "[inputs]\n- TEMA: {{TEMA}} > Tema a innovar\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara generar innovacion con preguntas provocadoras que desafien lo establecido.\n\n--- P | PEDIDO ---\n\nArquetipo: Innovation Provocateur con experiencia en uso de preguntas disruptivas para destrabar equipos.\n\nProvocative Questions:\n1. Tema a innovar\n2. 10 preguntas provocadoras:\n   - Que si hicieramos lo OPUESTO?\n   - Que si fuera GRATIS?\n   - Que si solo tuvieramos 1 DIA?\n   - Que si lo hiciera un NINO?\n   - Que si eliminamos el paso mas importante?\n3. Para cada pregunta: 3 ideas que nacen de ella\n4. Top 5 ideas mas prometedoras\n5. Prototipar la #1\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Constraints inspire: las preguntas provocadoras crean nuevos constraints\n- Quantity: 30+ ideas antes de evaluar\n- Build on crazy: las mejores ideas suenan absurdas al principio\n- Action: el prototipo vale mas que 100 ideas en papel\n\n--- C | CRITERIO ---\n\nFormato: 10 preguntas + 30 ideas + top 5 + prototipo.\nTono: provocador, jugueton.\nAudiencia: equipo de innovacion.\nAccion: prototipar la idea #1.\n\n[checklist]\n- [ ] Las preguntas son genuinamente provocadoras\n- [ ] Min. 30 ideas generadas\n- [ ] El top 5 es viable\n- [ ] Al menos 1 idea es disruptiva",
    "paramCount": 2,
    "keywords": []
  },
  {
    "id": "creatividad_six_word_story",
    "label_title": "Six Word Story",
    "category": "creatividad",
    "type": "spec",
    "content": "[inputs]\n- CONCEPTO: {{CONCEPTO}} > Concepto a condensar\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara condensar una idea compleja en una historia de 6 palabras. Si puedes decirlo en 6, lo entiendes.\n\n--- P | PEDIDO ---\n\nArquetipo: Micro-Storyteller con experiencia en narrative compression para marketing, branding y comunicacion ejecutiva.\n\nSix-Word Story:\n1. Concepto complejo a condensar\n2. Version 1: tu primer intento de 6 palabras\n3. Version 2-5: 4 variantes mas\n4. Test: la que mas impacto genera al leerla en voz alta\n5. Expansion: 1 parrafo que elabora la historia de 6 palabras\n6. Uso: donde la usaras (tagline, opening, elevator)\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Hemingway: 'For sale: baby shoes, never worn' — 6 palabras, una historia completa\n- Compression forces clarity: si no cabe en 6, no lo entiendes\n- Multiple drafts: la version 1 nunca es la mejor\n- Read aloud: el ritmo importa tanto como el contenido\n\n--- C | CRITERIO ---\n\nFormato: 5 versiones de 6 palabras + expansion.\nTono: poetico-preciso.\nAudiencia: comunicador.\nAccion: usar la ganadora en tu proximo pitch.\n\n[checklist]\n- [ ] Las 5 versiones son genuinamente de 6 palabras\n- [ ] Al menos 2 generan emocion\n- [ ] La ganadora funciona leida en voz alta\n- [ ] La expansion conecta con la historia",
    "paramCount": 2,
    "keywords": []
  },
  {
    "id": "creatividad_world_building",
    "label_title": "World Building",
    "category": "creatividad",
    "type": "spec",
    "content": "[inputs]\n- MARCA: {{MARCA}} > Tu marca o producto\n- AUDIENCIA: {{AUDIENCIA}} > Tu audiencia\n- VALORES: {{VALORES}} > Valores de la marca\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear un 'mundo' alrededor de tu marca o producto que inspire contenido, comunidad y diferenciacion.\n\n--- P | PEDIDO ---\n\nArquetipo: Brand World Builder con experiencia en world-building para marcas de lifestyle, educacion y tecnologia.\n\nWorld Building:\n1. Universe: que mundo habitan tu marca y tu audiencia\n2. Rules: que principios gobiernan este mundo\n3. Language: vocabulario propio (palabras que solo tu usas)\n4. Rituals: practicas que los miembros del mundo comparten\n5. Artifacts: objetos, templates, herramientas del mundo\n6. Enemies: contra que lucha este mundo (el antagonista)\n7. Heroes: quienes son los heroes (tu audiencia)\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Every great brand has a world: Apple, Nike, MetodologIA\n- Vocabulary creates belonging: las palabras propias crean tribu\n- Enemy creates unity: un enemigo comun une mas que un beneficio comun\n- Artifacts are tangible: los playbooks, templates, tools SON el mundo\n\n--- C | CRITERIO ---\n\nFormato: world spec + vocabulary + rituals + enemies + heroes.\nTono: visionario-practico.\nAudiencia: equipo de marca.\nAccion: definir el vocabulary propio.\n\n[checklist]\n- [ ] El mundo es coherente y atractivo\n- [ ] El vocabulary es unico y memorable\n- [ ] El enemigo esta identificado\n- [ ] Los heroes son la audiencia (no la marca)",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "bienestar_sleep_hygiene_protocol",
    "label_title": "Sleep Hygiene Protocol",
    "category": "bienestar",
    "type": "spec",
    "content": "[inputs]\n- HORARIO_ACTUAL: {{HORARIO_ACTUAL}} > A que hora duermes y despiertas\n- PROBLEMAS: {{PROBLEMAS}} > Que problemas de sueno tienes\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara optimizar tu sueno con un protocolo de higiene del sueno basado en evidencia. El sueno es el fundamento de todo rendimiento.\n\n--- P | PEDIDO ---\n\nArquetipo: Sleep Science Practitioner con evidencia de que 1 hora mas de sueno = 2 horas mas de productividad.\n\nSleep Protocol:\n1. Schedule: misma hora de dormir y despertar (incluso fines de semana)\n2. Environment: oscuro, frio (18-20C), silencioso\n3. Wind-down: 60 min sin pantallas antes de dormir\n4. Nutrition: no cafeina despues de las 2pm, cena ligera\n5. Morning light: 10 min de luz natural al despertar\n6. Tracking: horas de sueno + calidad subjetiva como KPI\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Consistency > duration: misma hora es mas importante que 8 horas\n- Temperature: el cuerpo necesita enfriarse para dormir\n- Light hygiene: luz brillante de manana, oscuridad de noche\n- Sleep is non-negotiable: todo lo demas se construye sobre esto\n\n--- C | CRITERIO ---\n\nFormato: protocolo + checklist nocturno + tracking.\nTono: cientifico, cuidadoso.\nAudiencia: profesional que duerme mal.\nAccion: implementar 1 cambio esta noche.\n\n[checklist]\n- [ ] El horario es consistente\n- [ ] El ambiente esta optimizado\n- [ ] El wind-down de 60 min esta disenado\n- [ ] El tracking es simple y diario",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "bienestar_micro_recovery_workday",
    "label_title": "Micro Recovery Workday",
    "category": "bienestar",
    "type": "spec",
    "content": "[inputs]\n- HORARIO: {{HORARIO}} > Tu jornada laboral\n- ENTORNO: {{ENTORNO}} > Oficina, remoto, hibrido\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara integrar micro-recuperaciones en la jornada laboral que prevengan fatiga acumulada.\n\n--- P | PEDIDO ---\n\nArquetipo: Workplace Wellness Engineer con experiencia en diseno de jornadas de trabajo sostenibles.\n\nMicro-Recovery:\n1. 90-min blocks: cada 90 min, 10-15 min de recovery\n2. Movement: 2 min de movimiento cada hora\n3. Eyes: regla 20-20-20 (cada 20 min, mirar 20 seg a 20 ft)\n4. Hydration: agua cada hora\n5. Social: 1 interaccion humana no-laboral por dia\n6. Nature: 5 min de contacto con naturaleza o exterior\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Ultradian rhythm: 90 min de trabajo + recovery\n- Active recovery > passive: mover es mejor que scrollear\n- Accumulated fatigue: la fatiga se previene, no se cura\n- Micro > macro: muchas recuperaciones pequenas > 1 grande al final\n\n--- C | CRITERIO ---\n\nFormato: protocolo de micro-recovery + alarmas sugeridas.\nTono: energetico.\nAudiencia: profesional que termina el dia exhausto.\nAccion: configurar alarma cada 90 min.\n\n[checklist]\n- [ ] Los bloques de 90 min estan integrados\n- [ ] Los micro-breaks son concretos\n- [ ] La regla 20-20-20 esta incluida\n- [ ] Las alarmas/triggers estan configurados",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "solucion_demo_day_preparar",
    "label_title": "Demo Day Preparar",
    "category": "solucion",
    "type": "spec",
    "content": "[inputs]\n- PROYECTO: {{PROYECTO}} > Proyecto a demostrar\n- RESULTADOS: {{RESULTADOS}} > Principales resultados\n- AUDIENCIA: {{AUDIENCIA}} > Quien ve la demo\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara preparar una presentacion de Demo Day que demuestre tus resultados con impacto.\n\n--- P | PEDIDO ---\n\nArquetipo: Demo Day Coach con experiencia en preparacion de equipos para demos ante inversores, stakeholders y pares.\n\nDemo Day:\n1. Story arc: problema > solucion > resultado > impacto\n2. Live demo: mostrar el producto/resultado funcionando (no slides)\n3. Metrics: antes/despues con numeros reales\n4. Learnings: que aprendiste que nadie esperaba\n5. Next: que sigue despues de hoy\n6. Max 8 min + 4 min Q&A\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Show > tell: la demo en vivo vale mas que 100 slides\n- Numbers win: metricas de impacto son el climax\n- Vulnerability: compartir lo que no funciono genera credibilidad\n- Practice: ensayar 5 veces con timer\n\n--- C | CRITERIO ---\n\nFormato: guion + demo plan + metrics + Q&A prep.\nTono: confiado, autentico.\nAudiencia: inversores, stakeholders, pares.\nAccion: ensayar 5 veces.\n\n[checklist]\n- [ ] La demo es en vivo (no screenshots)\n- [ ] Las metricas son antes/despues\n- [ ] Los learnings incluyen lo inesperado\n- [ ] Cabe en 8 minutos",
    "paramCount": 4,
    "keywords": []
  },
  {
    "id": "solucion_retrospectiva_proyecto",
    "label_title": "Retrospectiva Proyecto",
    "category": "solucion",
    "type": "spec",
    "content": "[inputs]\n- PROYECTO: {{PROYECTO}} > Proyecto completado\n- DURACION: {{DURACION}} > Duracion del proyecto\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara hacer una retrospectiva de proyecto completa que extraiga aprendizajes sistematicos para el futuro.\n\n--- P | PEDIDO ---\n\nArquetipo: Project Retrospective Facilitator con experiencia en retrospectivas de cierre para proyectos de 3-12 meses.\n\nRetro de proyecto:\n1. Timeline: cronologia del proyecto con hitos\n2. Wins: que salio bien y POR QUE\n3. Misses: que salio mal y POR QUE (sin culpar)\n4. Surprises: que no esperabamos\n5. Repeats: que repetiriamos exactamente igual\n6. Changes: que hariamos diferente\n7. Lessons: 5 lecciones transferibles a otros proyectos\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Blameless: analizar sistemas, no culpar personas\n- Root cause: por que salio bien/mal (no solo que)\n- Transferable lessons: las que aplican mas alla de este proyecto\n- Document: si no se escribe, se olvida\n\n--- C | CRITERIO ---\n\nFormato: retro document + 5 lecciones + recommendations.\nTono: reflexivo, constructivo.\nAudiencia: equipo del proyecto + futuros equipos.\nAccion: documentar y compartir.\n\n[checklist]\n- [ ] La cronologia tiene hitos clave\n- [ ] Los misses son sin culpa\n- [ ] Las lecciones son transferibles\n- [ ] El documento es compartido (no archivado)",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "solucion_certificacion_portafolio",
    "label_title": "Certificacion Portafolio",
    "category": "solucion",
    "type": "spec",
    "content": "[inputs]\n- CERTIFICACION: {{CERTIFICACION}} > Programa o certificacion\n- HITOS: {{HITOS}} > Hitos requeridos\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara ensamblar tu portafolio de certificacion que demuestre competencia con evidencia tangible.\n\n--- P | PEDIDO ---\n\nArquetipo: Certification Portfolio Designer con experiencia en diseno de portafolios de evidencia para programas de certificacion.\n\nPortafolio de certificacion:\n1. Hitos requeridos: que pide la certificacion\n2. Evidencia por hito: entregable + contexto + resultado\n3. Formato: cada pieza con caratula, descripcion, output\n4. Narrativa: como las piezas cuentan tu historia de evolucion\n5. Reflexion: que aprendiste en el proceso (autoevaluacion)\n6. Presentacion: como lo presentas ante evaluadores\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Evidence-based: cada competencia tiene evidencia tangible\n- STAR per piece: Situation, Task, Action, Result\n- Quality > quantity: 5 piezas excelentes > 15 mediocres\n- Narrative thread: las piezas cuentan una historia coherente\n\n--- C | CRITERIO ---\n\nFormato: portafolio estructurado listo para evaluacion.\nTono: profesional, reflexivo.\nAudiencia: evaluadores.\nAccion: ensamblar las primeras 3 piezas.\n\n[checklist]\n- [ ] Cada hito tiene evidencia tangible\n- [ ] El formato es consistente\n- [ ] La narrativa muestra evolucion\n- [ ] La reflexion es genuina",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "stack_api_keys_organizar",
    "label_title": "Api Keys Organizar",
    "category": "stack",
    "type": "spec",
    "content": "[inputs]\n- SERVICIOS: {{SERVICIOS}} > Servicios con API keys activas\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara organizar y gestionar tus API keys y credenciales de forma segura y accesible.\n\n--- P | PEDIDO ---\n\nArquetipo: Security-Conscious Developer con experiencia en gestion de credenciales para profesionales que usan multiples SaaS.\n\nAPI Key Management:\n1. Inventario: todas las API keys activas (servicio, proposito, fecha)\n2. Storage: password manager con vault separado para API keys\n3. Rotation: calendario de rotacion por key\n4. Access: quien tiene acceso a cada key\n5. Naming: convention clara (servicio_proposito_entorno)\n6. Cleanup: keys inactivas o expiradas eliminadas\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Never in code: jamas hardcodear API keys\n- Rotate regularly: al menos cada 90 dias\n- Least privilege: cada key con permisos minimos\n- Inventory: si no sabes que keys tienes, no las controlas\n\n--- C | CRITERIO ---\n\nFormato: inventario + storage guide + rotation schedule.\nTono: tecnico-seguridad.\nAudiencia: profesional con 10+ API keys.\nAccion: migrar keys al password manager.\n\n[checklist]\n- [ ] El inventario esta completo\n- [ ] Las keys estan en password manager (no en notas)\n- [ ] La rotacion esta calendarizada\n- [ ] Las keys inactivas estan eliminadas",
    "paramCount": 2,
    "keywords": []
  },
  {
    "id": "stack_file_organization_system",
    "label_title": "File Organization System",
    "category": "stack",
    "type": "spec",
    "content": "[inputs]\n- HERRAMIENTA: {{HERRAMIENTA}} > Google Drive, OneDrive, local, etc.\n- VOLUMEN: {{VOLUMEN}} > Archivos nuevos por semana\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar un sistema de organizacion de archivos que permita encontrar cualquier cosa en 10 segundos.\n\n--- P | PEDIDO ---\n\nArquetipo: Digital Organization Specialist con experiencia en sistemas de archivos para equipos y profesionales.\n\nFile Organization:\n1. Structure: max 3 niveles de profundidad\n2. Naming convention: YYYY-MM-DD_Proyecto_Descripcion\n3. Active vs archive: separar lo activo de lo historico\n4. Quick access: shortcuts a las 5 carpetas mas usadas\n5. Cleanup ritual: 15 min semanal de organizacion\n6. Cloud sync: backup automatico\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- PARA: Projects, Areas, Resources, Archive\n- Flat > deep: max 3 niveles de carpetas\n- Date-prefix: los archivos se ordenan cronologicamente\n- 10-second test: si no lo encuentras en 10 seg, reorganizar\n\n--- C | CRITERIO ---\n\nFormato: estructura de carpetas + naming convention + ritual.\nTono: sistematico.\nAudiencia: profesional con escritorio lleno de archivos.\nAccion: crear la estructura base hoy.\n\n[checklist]\n- [ ] La estructura tiene max 3 niveles\n- [ ] El naming convention es consistente\n- [ ] El cleanup semanal esta calendarizado\n- [ ] El 10-second test funciona",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "stack_automation_personal_stack",
    "label_title": "Automation Personal Stack",
    "category": "stack",
    "type": "spec",
    "content": "[inputs]\n- PROCESOS: {{PROCESOS}} > Procesos recurrentes principales\n- HERRAMIENTAS: {{HERRAMIENTAS}} > Herramientas disponibles\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar tu stack personal de automatizacion: que herramientas, para que flujos, como se conectan.\n\n--- P | PEDIDO ---\n\nArquetipo: Personal Automation Architect con experiencia en diseno de ecosistemas de automatizacion para profesionales.\n\nPersonal Automation Stack:\n1. Processes: top 10 procesos recurrentes\n2. Automation candidates: cuales se pueden automatizar\n3. Tools: seleccion por proceso (Zapier, Make, IFTTT, Shortcuts, Scripts)\n4. Connections: como se conectan las herramientas entre si\n5. Priority: cual automatizar primero (ROI)\n6. Maintenance: revision mensual del stack\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- ROI-first: automatizar lo que ahorra mas horas/semana\n- Start simple: 1 automatizacion simple > 0 automatizaciones perfectas\n- Reliable > fancy: la automatizacion debe funcionar siempre\n- Document: cada automatizacion documentada para mantenimiento\n\n--- C | CRITERIO ---\n\nFormato: mapa de automatizaciones + prioridades + herramientas.\nTono: tecnico-practico.\nAudiencia: profesional que automatiza.\nAccion: crear la primera automatizacion.\n\n[checklist]\n- [ ] Los 10 procesos estan inventariados\n- [ ] Las herramientas estan seleccionadas por proceso\n- [ ] La prioridad es por ROI\n- [ ] La documentacion existe",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "stack_learning_environment",
    "label_title": "Learning Environment",
    "category": "stack",
    "type": "spec",
    "content": "[inputs]\n- INTERESES: {{INTERESES}} > Tus areas de interes de aprendizaje\n- HERRAMIENTAS: {{HERRAMIENTAS}} > Herramientas actuales de notas/estudio\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar tu entorno de aprendizaje digital: herramientas, fuentes, rituales y sistema de captura.\n\n--- P | PEDIDO ---\n\nArquetipo: Learning Environment Designer con experiencia en diseño de PKM systems para lifelong learners.\n\nLearning Environment:\n1. Sources: top 10 fuentes de aprendizaje (newsletters, podcasts, cursos, books)\n2. Capture: como capturas lo que aprendes (tool + workflow)\n3. Process: como conviertes capturas en conocimiento (notas, mapas, flashcards)\n4. Apply: como aplicas lo aprendido (proyectos, practica)\n5. Share: como compartes para reforzar (blog, talks, mentoring)\n6. Review: ritual mensual de revision y curaduria\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Consume > Capture > Process > Apply > Share\n- Quality sources: 10 excelentes > 50 mediocres\n- Immediate application: aprender sin aplicar es turismo intelectual\n- Share to learn: ensenar es la mejor forma de fijar\n\n--- C | CRITERIO ---\n\nFormato: blueprint del entorno + tools + rituals.\nTono: pedagogico-personal.\nAudiencia: lifelong learner.\nAccion: curar tus top 10 fuentes.\n\n[checklist]\n- [ ] Las fuentes son curadas (no acumuladas)\n- [ ] El workflow capture > process > apply esta definido\n- [ ] La aplicacion es inmediata (no 'algun dia')\n- [ ] El ritual de review esta calendarizado",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "meta_conversation_design_ia",
    "label_title": "Conversation Design Ia",
    "category": "meta",
    "type": "spec",
    "content": "[inputs]\n- TAREA: {{TAREA}} > Que quieres lograr en la sesion\n- COMPLEJIDAD: {{COMPLEJIDAD}} > Simple, medio, complejo\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar una conversacion productiva con IA antes de empezarla. El diseno de la conversacion importa tanto como el prompt.\n\n--- P | PEDIDO ---\n\nArquetipo: Conversation Designer con experiencia en diseno de interacciones productivas entre humanos e IA.\n\nConversation Design:\n1. Outcome: que quiero tener al final de esta conversacion\n2. Context: que necesita saber la IA antes de empezar\n3. Approach: iterativo (ir y venir) o directo (1 shot)\n4. Checkpoints: donde validar antes de continuar\n5. Quality criteria: como se que el resultado es bueno\n6. Session plan: secuencia de prompts planificada\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Plan the conversation: no improvisar con IA\n- Iterative > one-shot: para entregables complejos\n- Checkpoints: validar parciales antes de terminar\n- Session log: guardar la conversacion para referencia futura\n\n--- C | CRITERIO ---\n\nFormato: session plan + secuencia de prompts.\nTono: metacognitivo.\nAudiencia: usuario avanzado de IA.\nAccion: planificar la proxima sesion antes de empezar.\n\n[checklist]\n- [ ] El outcome esta definido antes de empezar\n- [ ] El approach es apropiado al tipo de tarea\n- [ ] Los checkpoints estan planificados\n- [ ] La session esta disena, no improvisada",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "meta_prompt_portfolio_review",
    "label_title": "Prompt Portfolio Review",
    "category": "meta",
    "type": "spec",
    "content": "[inputs]\n- PORTFOLIO: {{PORTFOLIO}} > Tu portfolio de prompts actual\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara hacer una revision trimestral de tu portfolio de prompts y actualizarlo.\n\n--- P | PEDIDO ---\n\nArquetipo: Prompt Portfolio Manager con experiencia en mantenimiento de bibliotecas de prompts para equipos.\n\nQuarterly Prompt Review:\n1. Usage: cuales prompts usaste, cuales no\n2. Quality: cuales producen buenos resultados consistentemente\n3. Outdated: cuales necesitan actualizacion (contexto cambio)\n4. Gaps: que prompts te faltan (que haces manualmente que podrias promptear)\n5. Improve: reescribir los top 3 mas usados para mejor calidad\n6. Prune: eliminar los que no usas hace 90 dias\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Data-driven: uso real, no percepcion\n- 80/20: el 20% de tus prompts produce el 80% del valor\n- Improve the winners: mejorar lo que ya funciona\n- Prune ruthlessly: cada prompt que no usas es ruido\n\n--- C | CRITERIO ---\n\nFormato: reporte de review + mejoras + cambios.\nTono: analitico.\nAudiencia: tu mismo.\nAccion: hacer la review trimestral.\n\n[checklist]\n- [ ] Los prompts estan evaluados por uso real\n- [ ] Los top 3 estan mejorados\n- [ ] Los no-usados estan eliminados\n- [ ] Los gaps estan identificados",
    "paramCount": 2,
    "keywords": []
  },
  {
    "id": "meta_ai_collaboration_protocol",
    "label_title": "Ai Collaboration Protocol",
    "category": "meta",
    "type": "spec",
    "content": "[inputs]\n- USO: {{USO}} > Para que usas IA principalmente\n- FRECUENCIA: {{FRECUENCIA}} > Con que frecuencia usas IA\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara establecer un protocolo de colaboracion con IA que maximice calidad y minimice iteraciones.\n\n--- P | PEDIDO ---\n\nArquetipo: Human-AI Collaboration Designer con experiencia en diseno de protocolos de trabajo humano-maquina.\n\nAI Collaboration Protocol:\n1. Pre-session: que preparar antes de hablar con IA\n2. Priming: como configurar la sesion (context + role + rules)\n3. Interaction: como iterar (feedback loops, checkpoints)\n4. Quality: como evaluar outputs (rubrica express)\n5. Post-session: como guardar, documentar, y reusar\n6. Learning: como mejorar tu colaboracion con IA cada semana\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Prepare > prompt > evaluate > iterate > save\n- The human designs, the AI executes\n- Feedback precision: 'hazlo mas corto' > 'mejoralo'\n- Session hygiene: guardar lo bueno, descartar lo mediocre\n\n--- C | CRITERIO ---\n\nFormato: protocolo de colaboracion + templates + rituals.\nTono: metacognitivo, practico.\nAudiencia: profesional que usa IA diariamente.\nAccion: implementar el protocolo en la proxima sesion.\n\n[checklist]\n- [ ] La pre-sesion esta disenada\n- [ ] El priming es consistente\n- [ ] La evaluacion tiene rubrica\n- [ ] El learning loop esta integrado",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "engine_template_generator",
    "label_title": "Template Generator",
    "category": "engine",
    "type": "spec",
    "content": "[inputs]\n- TIPO_DOC: {{TIPO_DOC}} > Tipo de documento a generar\n- DATOS: {{DATOS}} > Fuente de datos\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear un engine que genere documentos a partir de templates + data.\n\n--- P | PEDIDO ---\n\nArquetipo: Document Automation Engineer.\n\nTemplate Generator:\n1. Template: estructura con placeholders\n2. Data mapping: que dato va en que placeholder\n3. Variantes: templates por tipo de documento\n4. Quality check: validacion post-generacion\n5. Output: PDF, DOCX, HTML segun necesidad\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Template × data = document\n- Validate: cada output verificado\n- Version control: templates versionados\n\n--- C | CRITERIO ---\n\nFormato: spec del engine.\nTono: tecnico.\nAudiencia: developer.\nAccion: crear el primer template.\n\n[checklist]\n- [ ] Los templates tienen placeholders claros\n- [ ] El data mapping es completo\n- [ ] La validacion esta automatizada\n- [ ] Los outputs son multi-formato",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "engine_feedback_collector",
    "label_title": "Feedback Collector",
    "category": "engine",
    "type": "spec",
    "content": "[inputs]\n- PRODUCTO: {{PRODUCTO}} > Producto\n- CANALES: {{CANALES}} > Canales de feedback\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear un engine que recolecte, clasifique y priorice feedback de usuarios automaticamente.\n\n--- P | PEDIDO ---\n\nArquetipo: Customer Feedback Analyst.\n\nFeedback Engine:\n1. Channels: donde llega el feedback (email, chat, survey, social)\n2. Classification: bug / feature request / praise / complaint\n3. Prioritization: impacto × frecuencia\n4. Routing: a quien va cada tipo\n5. Dashboard: trends por tipo y prioridad\n6. Loop: feedback > accion > comunicacion al usuario\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Multi-channel capture\n- Auto-classify: NLP o rules\n- Close the loop: informar cuando se actua\n- Trends > individual: patrones importan mas que casos aislados\n\n--- C | CRITERIO ---\n\nFormato: spec del engine + classification rules.\nTono: tecnico.\nAudiencia: product manager.\nAccion: configurar channels.\n\n[checklist]\n- [ ] Los canales estan cubiertos\n- [ ] La clasificacion es automatica\n- [ ] La priorizacion usa datos\n- [ ] El loop se cierra con el usuario",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "presentacion_retrospective_showcase",
    "label_title": "Retrospective Showcase",
    "category": "presentacion",
    "type": "spec",
    "content": "[inputs]\n- EQUIPO: {{EQUIPO}} > Equipo\n- PERIODO: {{PERIODO}} > Periodo\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara presentar los resultados de una retrospectiva al liderazgo de forma que genere apoyo para las mejoras.\n\n--- P | PEDIDO ---\n\nArquetipo: Continuous Improvement Advocate.\n\nRetro Showcase:\n1. Context: que periodo y que equipo\n2. Wins: lo que funciono (celebrar)\n3. Learning: lo que aprendimos (humildad)\n4. Improvement: 1 cambio propuesto con ROI estimado\n5. Ask: aprobacion o recursos para el cambio\n6. Max 5 slides\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Celebrate first: las wins generan credibilidad\n- 1 improvement: foco, no lista de quejas\n- ROI: cuantificar el valor del cambio\n- Small ask: empezar con lo factible\n\n--- C | CRITERIO ---\n\nFormato: 5 slides max.\nTono: positivo, data-driven.\nAudiencia: liderazgo.\nAccion: presentar y obtener aprobacion.\n\n[checklist]\n- [ ] Las wins estan celebradas\n- [ ] El improvement es 1 y tiene ROI\n- [ ] El ask es de bajo riesgo\n- [ ] Max 5 slides",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "presentacion_elevator_visual",
    "label_title": "Elevator Visual",
    "category": "presentacion",
    "type": "spec",
    "content": "[inputs]\n- PROPUESTA: {{PROPUESTA}} > Tu propuesta o mensaje\n- METRICA: {{METRICA}} > Tu numero mas impactante\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara crear 1 slide que capture tu propuesta completa. Si solo pudieras mostrar 1 slide, cual seria?\n\n--- P | PEDIDO ---\n\nArquetipo: Visual Communication Designer.\n\n1-Slide Summary:\n1. Headline: tu propuesta en 1 oracion\n2. Key metric: 1 numero que lo diga todo\n3. Visual: 1 grafico o imagen de soporte\n4. CTA: 1 accion que pides\n5. Design: limpio, respirable, profesional\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- 1 slide = 1 idea = 1 action\n- The napkin test: si cabe en una servilleta, cabe en 1 slide\n- Visual dominance: la imagen/grafico ocupa 60% del espacio\n- No bullets: el slide no es un documento\n\n--- C | CRITERIO ---\n\nFormato: spec de 1 slide con contenido.\nTono: visual, impacto.\nAudiencia: cualquiera.\nAccion: disenar la slide.\n\n[checklist]\n- [ ] El headline es 1 oracion\n- [ ] El metric es 1 numero\n- [ ] El visual es 1 grafico/imagen\n- [ ] El CTA es 1 accion",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "comunicacion_weekly_team_update",
    "label_title": "Weekly Team Update",
    "category": "comunicacion",
    "type": "spec",
    "content": "[inputs]\n- EQUIPO: {{EQUIPO}} > Tu equipo\n- PERIODO: {{PERIODO}} > Semana\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara escribir un update semanal del equipo que informe sin generar reunion.\n\n--- P | PEDIDO ---\n\nArquetipo: Team Communication Lead.\n\nWeekly Update:\n1. TL;DR: 1 oracion\n2. Done: 3-5 cosas completadas\n3. In progress: 3-5 en curso\n4. Blocked: lo que necesita ayuda\n5. Next week: 3 prioridades\n6. Mood: como esta el equipo (emoji/1-10)\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Replace the meeting: si el update funciona, la reunion sobra\n- Consistent format: el lector sabe donde buscar cada info\n- Honest mood check: la salud del equipo importa\n- Max 200 words: respetar el tiempo del lector\n\n--- C | CRITERIO ---\n\nFormato: update de 200 palabras.\nTono: transparente.\nAudiencia: stakeholders.\nAccion: enviar cada viernes.\n\n[checklist]\n- [ ] Cabe en 200 palabras\n- [ ] El TL;DR es 1 oracion\n- [ ] Los blocked tienen ask claro\n- [ ] El mood check esta incluido",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "comunicacion_apology_profesional",
    "label_title": "Apology Profesional",
    "category": "comunicacion",
    "type": "spec",
    "content": "[inputs]\n- SITUACION: {{SITUACION}} > Que paso\n- PERSONA: {{PERSONA}} > A quien\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara redactar una disculpa profesional que repare la relacion y demuestre responsabilidad.\n\n--- P | PEDIDO ---\n\nArquetipo: Professional Communication Coach.\n\nDisculpa profesional:\n1. Acknowledge: que paso (hechos)\n2. Responsibility: tu parte sin excusas\n3. Impact: como afecto al otro\n4. Action: que haces para que no se repita\n5. Commitment: tu compromiso hacia adelante\n6. Brevedad: max 5 oraciones\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- No excuses: 'lo siento PERO' no es disculpa\n- Specific: que exactamente hiciste mal\n- Forward-looking: que cambias (no solo que lamentas)\n- Brief: las disculpas largas suenan a justificacion\n\n--- C | CRITERIO ---\n\nFormato: mensaje de 5 oraciones.\nTono: genuino, responsable.\nAudiencia: la persona afectada.\nAccion: enviar hoy.\n\n[checklist]\n- [ ] Sin excusas ni justificaciones\n- [ ] La responsabilidad es asumida\n- [ ] La accion correctiva es concreta\n- [ ] Max 5 oraciones",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "creatividad_metaphor_generator",
    "label_title": "Metaphor Generator",
    "category": "creatividad",
    "type": "spec",
    "content": "[inputs]\n- CONCEPTO: {{CONCEPTO}} > Concepto abstracto a comunicar\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara generar metaforas que hagan tangible lo abstracto. Una buena metafora comunica en 5 segundos lo que 5 parrafos no logran.\n\n--- P | PEDIDO ---\n\nArquetipo: Metaphor Craftsman.\n\nMetaphor Generator:\n1. Concepto abstracto a comunicar\n2. 10 metaforas candidatas (de diferentes dominios)\n3. Evaluacion: claridad × memorabilidad × precision\n4. Top 3 con contexto de uso\n5. Anti-metaforas: cuales son enganosas o imprecisas\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Domain crossing: las mejores metaforas vienen de lejos\n- Test with novice: si no la entiende, no funciona\n- Precision matters: la metafora debe iluminar, no confundir\n- Anti-metaphors: saber cuales evitar\n\n--- C | CRITERIO ---\n\nFormato: 10 candidatas + top 3 + anti-metaforas.\nTono: creativo.\nAudiencia: comunicador.\nAccion: usar la metafora #1 en tu proxima comunicacion.\n\n[checklist]\n- [ ] Las 10 candidatas son de dominios variados\n- [ ] El top 3 es claro Y memorable\n- [ ] Las anti-metaforas estan identificadas\n- [ ] Al menos 1 es sorprendente",
    "paramCount": 2,
    "keywords": []
  },
  {
    "id": "creatividad_idea_incubator",
    "label_title": "Idea Incubator",
    "category": "creatividad",
    "type": "spec",
    "content": "[inputs]\n- IDEA: {{IDEA}} > Idea a incubar\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara incubar una idea en lugar de ejecutarla inmediatamente. Las mejores ideas mejoran con tiempo y perspectiva.\n\n--- P | PEDIDO ---\n\nArquetipo: Innovation Incubator.\n\nIdea Incubation:\n1. Captura: documenta la idea con detalle\n2. Marinate: dejala 48-72 horas sin tocarla\n3. Fresh eyes: vuelve con perspectiva fresca\n4. Enrich: agrega 3 perspectivas nuevas\n5. Stress test: ataca la idea con devil's advocate\n6. Decide: ejecutar, pivotar, o archivar\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Incubation effect: el subconsciente procesa mientras no piensas en ello\n- Time test: si la idea sigue siendo buena en 72h, es buena\n- Diverse input: 3 perspectivas diferentes mejoran la idea\n- Kill or commit: despues de incubar, decide\n\n--- C | CRITERIO ---\n\nFormato: ficha de incubacion + decision.\nTono: paciente, reflexivo.\nAudiencia: innovador.\nAccion: incubar por 72h, luego decidir.\n\n[checklist]\n- [ ] La idea esta documentada con detalle\n- [ ] El periodo de incubacion fue respetado\n- [ ] Las 3 perspectivas estan agregadas\n- [ ] La decision es clara",
    "paramCount": 2,
    "keywords": []
  },
  {
    "id": "creatividad_lateral_connection",
    "label_title": "Lateral Connection",
    "category": "creatividad",
    "type": "spec",
    "content": "[inputs]\n- CONCEPTO_A: {{CONCEPTO_A}} > Tu tema\n- CONCEPTO_B: {{CONCEPTO_B}} > Algo completamente no relacionado\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara encontrar conexiones no obvias entre conceptos usando lateral thinking.\n\n--- P | PEDIDO ---\n\nArquetipo: Lateral Thinking Facilitator.\n\nLateral Connection:\n1. Concepto A: tu tema principal\n2. Concepto B: algo completamente no relacionado\n3. Force 5 connections: que tienen en comun (forzar)\n4. Insight: que conexion revela algo nuevo sobre A\n5. Application: como esta conexion genera una idea util\n6. Test: mostrar a alguien — sorprende?\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Forced association: cuanto mas lejano B, mas creativo el resultado\n- 5 minimum: las primeras 3 son obvias, las buenas estan en 4-5\n- Surprise test: si no sorprende, no es suficientemente lateral\n- Seed new ideas: la conexion es el inicio, no el final\n\n--- C | CRITERIO ---\n\nFormato: 5 conexiones + insight + aplicacion.\nTono: exploratorio.\nAudiencia: creativo.\nAccion: aplicar el insight.\n\n[checklist]\n- [ ] Las conexiones son forzadas (no obvias)\n- [ ] Al menos 1 es genuinamente sorprendente\n- [ ] El insight es accionable\n- [ ] La aplicacion es concreta",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "negociacion_win_win_crear",
    "label_title": "Win Win Crear",
    "category": "negociacion",
    "type": "spec",
    "content": "[inputs]\n- CONTEXTO: {{CONTEXTO}} > Contexto de la negociacion\n- INTERESES: {{INTERESES}} > Tus intereses principales\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar propuestas que expandan el valor total antes de dividirlo.\n\n--- P | PEDIDO ---\n\nArquetipo: Integrative Negotiator.\n\nWin-Win Design:\n1. My interests: que necesito realmente\n2. Their interests: que necesitan realmente\n3. Expand the pie: que podemos crear juntos que no existe\n4. Creative options: 5+ formas de satisfacer ambos intereses\n5. Trade: que puedo dar de bajo costo para mi, alto valor para ellos\n6. Package: propuesta que ambos prefieran al no-acuerdo\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Interests before positions\n- Expand before divide: crear valor nuevo\n- Asymmetric trades: lo que es barato para ti puede ser valioso para ellos\n- BATNA-informed: saber tu alternativa da poder sin agresividad\n\n--- C | CRITERIO ---\n\nFormato: mapa de intereses + opciones + propuesta win-win.\nTono: colaborativo.\nAudiencia: negociador.\nAccion: presentar la propuesta.\n\n[checklist]\n- [ ] Los intereses (no posiciones) estan mapeados\n- [ ] El pie esta expandido\n- [ ] Los trades son asimetricos\n- [ ] La propuesta es preferible al no-acuerdo",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "negociacion_email_followup",
    "label_title": "Email Followup",
    "category": "negociacion",
    "type": "spec",
    "content": "[inputs]\n- CONTEXTO: {{CONTEXTO}} > Conversacion que se estanco\n- OBJETIVO: {{OBJETIVO}} > Que quieres lograr\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara escribir emails de followup que reactiven conversaciones estancadas sin parecer desesperado.\n\n--- P | PEDIDO ---\n\nArquetipo: Sales Follow-Up Specialist.\n\nFollow-Up Email:\n1. Reference: recordar el contexto (no asumir que lo recuerdan)\n2. Value add: aportar algo nuevo (dato, recurso, insight)\n3. Easy CTA: pregunta que se responde en 1 linea\n4. Tone: util, no insistente\n5. Timing: dia y hora optimo\n6. Sequence: follow-up 1 (3 dias), 2 (7 dias), 3 (14 dias, ultimo)\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- Add value each time: cada follow-up aporta algo nuevo\n- Not 'just following up': esa frase es vacia\n- Easy CTA: reduce la friccion de responder\n- Know when to stop: 3 follow-ups max\n\n--- C | CRITERIO ---\n\nFormato: 3 emails de follow-up listos para enviar.\nTono: util, profesional.\nAudiencia: la persona que no respondio.\nAccion: enviar follow-up #1.\n\n[checklist]\n- [ ] Cada follow-up agrega valor nuevo\n- [ ] El CTA es de 1 linea\n- [ ] El tono no es desesperado\n- [ ] La secuencia de 3 esta lista",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "bienestar_focus_music_protocol",
    "label_title": "Focus Music Protocol",
    "category": "bienestar",
    "type": "spec",
    "content": "[inputs]\n- TIPO_TRABAJO: {{TIPO_TRABAJO}} > Tipo de trabajo predominante\n- PREFERENCIAS: {{PREFERENCIAS}} > (opcional) Generos musicales que te gustan\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara disenar tu protocolo de musica para focus: que escuchar para concentrarte, que para energia, que para descomprimir.\n\n--- P | PEDIDO ---\n\nArquetipo: Music Psychology Practitioner.\n\nFocus Music Protocol:\n1. Deep Work playlist: musica sin letra, 120-140 BPM, repetitiva\n2. Energy playlist: musica que activa (para tareas mecanicas)\n3. Wind-down playlist: musica lenta para descomprimir\n4. Silence zones: cuando NO escuchar musica\n5. Plataforma: Spotify, YouTube, Brain.fm\n6. Ritual: asociar playlist con tipo de trabajo (trigger)\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- No lyrics for deep work: las palabras compiten con tu pensamiento\n- BPM matters: 120-140 para focus, 80-100 para calma\n- Repetitive > novel: lo predecible no distrae\n- Pavlovian trigger: misma musica = mismo estado mental\n\n--- C | CRITERIO ---\n\nFormato: 4 playlists + reglas de uso.\nTono: personal, cientifico.\nAudiencia: profesional que trabaja con auriculares.\nAccion: crear la playlist de deep work.\n\n[checklist]\n- [ ] Deep work es sin letra y repetitiva\n- [ ] Cada playlist tiene proposito claro\n- [ ] Los silence zones estan definidos\n- [ ] El ritual de trigger esta disenado",
    "paramCount": 3,
    "keywords": []
  },
  {
    "id": "bienestar_gratitude_journal_protocol",
    "label_title": "Gratitude Journal Protocol",
    "category": "bienestar",
    "type": "spec",
    "content": "[inputs]\n- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos, URLs de referencia, o \"Sin adjuntos\"\n\n[prompt]\n\n--- S | SITUACION ---\n\nPara implementar un gratitude journal de 2 minutos diarios que mejore bienestar y perspectiva.\n\n--- P | PEDIDO ---\n\nArquetipo: Positive Psychology Coach.\n\nGratitude Journal:\n1. When: mismo momento cada dia (manana o noche)\n2. Format: 3 cosas por las que estoy agradecido hoy\n3. Specificity: concreto, no generico ('mi colega me ayudo con X' > 'mi trabajo')\n4. Variation: evitar repetir las mismas 3 cosas\n5. Streak: mantener la racha como motivacion\n6. Review: leer entries anteriores cada 30 dias\n\n--- E | EJECUCION ---\n\n>> Protocolo MetodologIA: Interpreta > Planifica > Ejecuta. No actues sin antes reformular lo que entiendes y presentar tu plan de accion.\n\nMetodo:\n- 2 minutes max: la consistencia importa mas que la profundidad\n- Specificity: los detalles concretos generan mas gratitud que las generalidades\n- Novel: buscar cosas nuevas cada dia expande la percepcion\n- Evidence: la gratitud mejora sueno, relaciones y productividad (research-backed)\n\n--- C | CRITERIO ---\n\nFormato: protocolo + template.\nTono: sereno.\nAudiencia: profesional que quiere mas perspectiva.\nAccion: escribir las 3 de hoy.\n\n[checklist]\n- [ ] El momento diario esta definido\n- [ ] Las 3 cosas son concretas (no genericas)\n- [ ] La variacion esta incentivada\n- [ ] La review mensual esta calendarizada",
    "paramCount": 1,
    "keywords": []
  }
];
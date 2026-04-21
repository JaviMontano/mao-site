# Formato SPEC — Biblioteca Universal MetodologIA v4

> "La distancia entre tu intención y un resultado valioso es un SPEC."

## Acrónimo SPEC

| Letra | Sección | 5W2H Lean | Pregunta |
|-------|---------|-----------|----------|
| **S** | Situación | Why + Where + When | ¿Para qué? (prospectivo) |
| **P** | Pedido | What + Who | ¿Qué necesito? |
| **E** | Ejecución | How | ¿Cómo se hace? |
| **C** | Criterio | How Much | ¿Cómo sé que está listo? |

**4 letras. El acrónimo ES la metodología: Spec-Driven Development.**

La IA es el nuevo colaborador: altamente escalable, competente y versátil.
El SPEC es la interfaz profesional entre tu intención y su capacidad.

---

## Filosofía: Meta-Prompting como Default

Cada SPEC trata a la IA como colaborador senior, no como herramienta pasiva.
Cada SPEC obliga a la IA a pensar antes de actuar.

**Protocolo MetodologIA** (built-in en toda E):

```
Antes de ejecutar:
1. Interpreta este SPEC — reformula lo que entiendes en 2-3 oraciones
2. Diseña un plan de acción con fases claras
3. Detalla la estrategia de ejecución por fase
4. Solicita confirmación o ajustes antes de avanzar
5. Ejecuta fase por fase, validando cada entregable parcial
```

Esto convierte cada prompt en un acto de **co-creación dirigida**, no de delegación ciega.

---

## Arquitectura de 3 Capas

| Capa | Cantidad | Clave JSON | Tipo |
|------|----------|------------|------|
| Letras (a-z) | 26 | `"a"` ... `"z"` | Micro-commands |
| Dígitos (0-9) | 10 | `"0"` ... `"9"` | Pipeline de co-creación |
| Palabras | ~30-40 | `"resume"`, `"traduce"` | Aceleradores de una palabra |
| SPECs | 365 | `"categoria_verbo_sustantivo"` | Prompts spec completos |
| **Total** | **~430** | | |

Nota: la cantidad de single-word empieza en 25-30 y crece con uso real (recomendación del debate socrático).

---

## Separadores

Basado en análisis UX cross-platform:

- **Top-level**: `[inputs]`, `[prompt]`, `[checklist]` — corchetes (universales, parseables)
- **Dentro del prompt**: `--- X | NOMBRE ---` — ASCII puro, portable
- **Parámetros**: `{{PARAM}}` — doble llave (nativo Espanso, regex-friendly)
- **Sin Unicode decorativo** (no `──`, no `↳`, no `·`) — máxima portabilidad

---

## Estructura: SPEC Completo

```
[inputs]
- PARAM_1: {{PARAM_1}} > Descripción del parámetro
- PARAM_2: {{PARAM_2}} > (opcional) Descripción
- ADJUNTOS: {{ADJUNTOS}} > Archivos anexos o "Sin adjuntos"

[prompt]

--- S | SITUACION ---

[Para qué. Hacia dónde vamos, qué se desbloquea, qué impacto tiene.
Contexto, stakeholders, restricciones. Visión prospectiva, no retrospectiva.
Sin situación, la IA inventa.]

--- P | PEDIDO ---

Arquetipo: [Título profesional real] con [credencial/experiencia real].

[Qué necesito. La especificación concreta del entregable o resultado.
Componentes, estructura, alcance. El "qué" con precisión de spec.]

--- E | EJECUCION ---

Protocolo MetodologIA:
1. Interpreta este SPEC — reformula en tus palabras lo que entiendes
2. Presenta plan de accion con fases antes de ejecutar
3. Detalla la estrategia de ejecucion por fase
4. Solicita confirmacion o ajustes
5. Ejecuta fase por fase

[Instrucciones específicas de método, pasos, frameworks a aplicar.
El "cómo" con nivel de detalle operativo.]

--- C | CRITERIO ---

[Formato, restricciones, medidas de éxito, audiencia, tono.
Todo lo que define "listo para usar sin edición".]

[checklist]
- [ ] La IA reformuló el SPEC antes de ejecutar
- [ ] El plan de acción fue presentado y ajustado
- [ ] [Criterio verificable específico del prompt]
- [ ] [Criterio verificable específico del prompt]
- [ ] El resultado está listo para uso inmediato
```

---

## Ejemplo Completo: SPEC Output-Driven

```
[inputs]
- SECTOR: {{SECTOR}} > Sector o industria a analizar
- COMPETIDORES: {{COMPETIDORES}} > (opcional) Competidores a incluir
- HORIZONTE: {{HORIZONTE}} > Ventana temporal (default: ultimos 12 meses)
- ADJUNTOS: {{ADJUNTOS}} > Reportes o URLs de referencia, o "Sin adjuntos"

[prompt]

--- S | SITUACION ---

Para tomar decisiones de posicionamiento y diferenciacion en {{SECTOR}} dentro de los proximos {{HORIZONTE}}. La inteligencia resultante desbloquea decisiones de inversion, alianzas o pivote estrategico. Sin esto, se decide con intuicion en lugar de evidencia.

{{ADJUNTOS}}

--- P | PEDIDO ---

Arquetipo: Analista Senior de Inteligencia Competitiva con experiencia en consultoria estrategica (15+ anos), frameworks Porter/PESTEL/Value Chain, y metodologia de inteligencia competitiva SCIP.

Producir un Dossier de Inteligencia Competitiva con:
1. Resumen ejecutivo (max. 300 palabras) — debe permitir decidir sin leer el resto
2. Perfil por competidor: posicion, fortalezas, debilidades, movimientos recientes
3. Tabla de positioning con scoring numerico (1-5 por dimension)
4. Tendencias del sector con impacto estimado (alto/medio/bajo)
5. Oportunidades y amenazas priorizadas
6. 5 recomendaciones estrategicas accionables (quien, que, cuando)

--- E | EJECUCION ---

Protocolo MetodologIA:
1. Interpreta este SPEC — reformula lo que entiendes del sector y la necesidad
2. Presenta tu plan de investigacion (fuentes, fases, enfoque) antes de ejecutar
3. Detalla como abordaras cada seccion del dossier
4. Solicita ajustes si detectas ambiguedades
5. Ejecuta seccion por seccion, citando fuentes

Metodo:
- Analisis de 5 Fuerzas de Porter para estructura competitiva
- PESTEL para tendencias macro
- Scoring comparativo numerico (no narrativo) por dimension clave
- Cada hallazgo con [FUENTE] verificable — cero afirmaciones sin evidencia

--- C | CRITERIO ---

Formato: max. 10 paginas equivalentes. Tablas con scoring 1-5. Espanol profesional.
Tono: ejecutivo-analitico. Publicable en comite directivo sin edicion.
Audiencia: director de estrategia o CEO.
Accion esperada: decisiones de inversion, posicionamiento o alianzas.

[checklist]
- [ ] La IA reformulo el SPEC y presento plan antes de ejecutar
- [ ] Cada competidor tiene perfil completo con scoring
- [ ] Minimo 5 fuentes verificables citadas
- [ ] Resumen ejecutivo permite decidir sin leer el resto
- [ ] Recomendaciones son accionables (quien, que, cuando)
- [ ] Cero afirmaciones sin fuente
```

---

## Ejemplo Completo: SPEC Outcome-Driven (Blueprint)

```
[inputs]
- PROCESO: {{PROCESO}} > Pipeline o flujo actual a transformar
- FRECUENCIA: {{FRECUENCIA}} > Frecuencia de ejecucion (diaria/semanal/mensual)
- HERRAMIENTAS: {{HERRAMIENTAS}} > Stack actual de herramientas
- ADJUNTOS: {{ADJUNTOS}} > Ejemplos del proceso actual o "Sin adjuntos"

[prompt]

--- S | SITUACION ---

Para liberar {{FRECUENCIA}} de ejecucion manual en el pipeline "{{PROCESO}}" y redirigir ese tiempo a trabajo de alto valor. Stack actual: {{HERRAMIENTAS}}. La transformacion desbloquea escalamiento sin agregar personas — cada ciclo automatizado multiplica capacidad.

{{ADJUNTOS}}

--- P | PEDIDO ---

Arquetipo: Arquitecta de Sistemas de Automatizacion con experiencia en diseno de pipelines (10+ anos), metodologias Lean/Six Sigma, y arquitectura de soluciones cloud.

Disenar la transformacion del pipeline de manual a semi-autonomo:
- Reduccion de tiempo: minimo 60%
- Consistencia de output: minimo 9/10
- Intervencion humana: solo en decisiones estrategicas y aprobacion final

Entregar:
1. Diagnostico del pipeline actual (bottlenecks cuantificados)
2. Arquitectura del pipeline automatizado (diagrama de flujo)
3. Definicion de agentes/componentes (rol, input, output, trigger)
4. Quality gates entre etapas
5. Plan de implementacion progresivo (4 semanas)
6. Metricas de exito y monitoreo

--- E | EJECUCION ---

Protocolo MetodologIA:
1. Interpreta el pipeline descrito — reformula los pasos que entiendes
2. Presenta diagnostico inicial y plan de transformacion antes de ejecutar
3. Detalla la estrategia por cada componente del sistema
4. Solicita validacion del diagnostico antes de disenar la solucion
5. Ejecuta entregable por entregable

Metodo:
- Value Stream Mapping para identificar desperdicios
- Clasificar pasos: automatizables vs requieren juicio humano
- Disenar con principio de minima intervencion humana
- Incluir fallbacks para cuando la automatizacion falle
- ROI estimado con breakeven point

--- C | CRITERIO ---

Formato: documento tecnico + diagrama. Cada agente con: nombre, responsabilidad, input, output, trigger.
Plan en timeline con dependencias. Espanol tecnico-practico.
Audiencia: profesional que va a implementar personalmente.
Accion esperada: comenzar implementacion en semana 1.

[checklist]
- [ ] La IA diagnostico el pipeline antes de proponer solucion
- [ ] 3+ componentes automatizados con roles claros
- [ ] Cada componente tiene input/output/trigger
- [ ] Plan ejecutable en 4 semanas con milestones
- [ ] ROI muestra breakeven en 30 dias o menos
- [ ] Quality gates previenen degradacion sin intervencion manual
```

---

## Pipeline de Co-Creacion (digitos 0-9)

Pipeline progresivo. Del input vago al output concreto.
Cada digito es un paso del proceso, un command de una tecla.

```
0 > RECEPCION
    Acabo de recibir una idea, tarea o concepto — posiblemente vago.
    1. Escucha sin juzgar. Captura TODO.
    2. Reformula en 1 oracion: Que + Para Que + Para Quien
    3. Identifica lo que falta. Haz max 3 preguntas criticas.
    4. NO avances a crear nada. Primero claridad.

1 > SITUACION
    Define la S del SPEC:
    - Para que se hace esto? Que se desbloquea? Que impacto tiene?
    - Cual es el contexto? Stakeholders, restricciones, antecedentes.
    - Que pasa si NO se hace?

2 > PEDIDO
    Define la P del SPEC:
    - Que arquetipo experto necesitamos? (profesion + experiencia)
    - Que entregable concreto se necesita? Componentes, estructura.
    - Cual es el alcance? Que SI incluye y que NO incluye.

3 > EJECUCION
    Define la E del SPEC:
    - Cual es el metodo o framework a aplicar?
    - Cuales son las fases del plan de ejecucion?
    - Que decisiones requieren validacion humana?

4 > BORRADOR
    Primera version. Velocidad > perfeccion.
    Genera el entregable completo siguiendo el SPEC definido en pasos 1-3.
    Marca con [PENDIENTE] lo que necesita mas trabajo.

5 > ROBUSTECER
    Sobre el borrador: profundizar, expandir, fundamentar.
    - Agregar datos, ejemplos, fuentes, matices
    - Eliminar afirmaciones sin soporte
    - Llenar todos los [PENDIENTE]

6 > SIMPLIFICAR
    Sobre lo robusto: simplificar. Lo que quede = solo valor.
    - Eliminar redundancias y relleno
    - Activar verbos pasivos
    - Si algo no agrega valor, eliminarlo
    - El resultado debe ser mas corto que el input de este paso

7 > VALIDAR
    Verificar completitud, veracidad, coherencia.
    - Ejecutar el [checklist] punto por punto
    - Marcar: OK / REQUIERE AJUSTE / FALLA
    - Listar gaps identificados

8 > ENTREGAR
    Formato final. Listo para la audiencia.
    - Aplicar tono y formato del C (Criterio) del SPEC
    - Verificar que es usable sin edicion
    - Empaquetar para entrega

9 > INGENIERIA INVERSA
    El entregable esta listo. Ahora, extrae inteligencia del proceso:
    1. Analiza el historial completo de esta sesion
    2. Identifica: objetivo real, inputs clave, decisiones, formato final
    3. Genera DOS prompts reutilizables:

       PROMPT A — Priming (para setear contexto en nueva sesion):
       Prompt corto que configure al asistente con contexto y rol.

       PROMPT B — SPEC de Alto Rendimiento (para ejecutar directo):
       SPEC completo que, con los inputs correctos, produzca el mismo
       resultado SIN vivir todo el proceso 0-8.

    Objetivo: la proxima vez, de la idea al resultado en 1 SPEC.
```

---

## Single-Letter Commands (a-z)

26 micro-commands. Una tecla, una accion. Friccion cero.

```
a > Aprobado. Proceder con el plan presentado.
b > Busca informacion adicional. Fuentes complementarias, datos recientes, perspectivas alternas.
c > Corrige: ortografia, gramatica, coherencia, tono, claridad. Version limpia sin marcas.
d > Desglosa en partes. Componentes fundamentales con definicion, relevancia y dependencias.
e > Bucle de Excelencia. Rubrica interna (10 criterios, 1-10). Itera hasta 10/10. Solo entrega la version final.
f > Formatea profesionalmente. Headers, bullets, tablas, negritas, separadores. Escaneable y ejecutivo.
g > Genera 5+ alternativas. Cada una con: nombre, enfoque, ventaja, trade-off.
h > Haz checklist accionable. Accion concreta, verificable, con responsable y resultado esperado.
i > Identifica contexto completo de esta conversacion. Resume: objetivo, decisiones, temas abiertos, proximos pasos.
j > Justifica con evidencia. Cada afirmacion con dato, fuente, marco teorico o razonamiento explicito.
k > Key takeaways. 5-7 insights accionables. Formato: insight + implicacion + accion sugerida.
l > Lista pros y contras. Ponderacion de impacto (alto/medio/bajo) por punto.
m > Mejora significativamente. Mas profundidad, mejor estructura, datos solidos. Solo la version mejorada.
n > Next step. La accion inmediata mas valiosa: que, quien, cuando, con que, resultado esperado.
o > Organiza cronologicamente. Timeline con hitos, dependencias, fechas estimadas.
p > Profundiza. Mayor detalle, ejemplos concretos, datos, casos reales, matices no explorados.
q > Pregunta lo que falta. Brechas criticas que podrian cambiar conclusiones o mejorar el resultado.
r > Resume ejecutivo. 3 parrafos max: conclusion, evidencia, proximos pasos.
s > Sintetiza opciones abiertas. Consolida la mejor solucion integrando fortalezas de todas.
t > Traduce al otro idioma. Mantener tono, intencion, matices. Solo la traduccion.
u > Unifica y consolida. Documento unico, coherente, sin redundancias ni contradicciones.
v > Valida veracidad. Marca: OK / Requiere confirmacion / Potencialmente incorrecto. Sugiere correcciones.
w > What if. 3 escenarios: optimista, pesimista, probable. Condiciones, impacto, acciones.
x > Extrae datos clave. Nombres, fechas, cifras, metricas, compromisos, decisiones. Tabla o JSON.
y > Ya casi — revision pre-entrega. Completitud, consistencia, formato, parametros resueltos.
z > Zoom out. Perspectiva estrategica. Panorama general, implicaciones sistemicas, que estamos pasando por alto.
```

---

## Single-Word Accelerators (~30 iniciales)

Mas que un micro-command, menos que un SPEC. Una palabra, accion directa.
Espanol-first. English alias solo donde es natural para bilingues.

```
resume      > Resume ejecutivo: max 3 parrafos. Conclusion, evidencia, proximos pasos.
traduce     > Traduce al otro idioma. Preservar tono, intencion, matices culturales.
profundiza  > Expande con detalle experto: datos, ejemplos, casos, matices.
simplifica  > Reduce a lo esencial. Cada palabra debe ganarse su lugar.
compara     > Tabla comparativa con criterios, scoring y recomendacion.
prioriza    > Ordena por impacto. Top 3 con justificacion.
reformula   > Reescribe con claridad profesional. Mismo mensaje, mejor forma.
debate      > Debate socratico. 3 perspectivas confrontadas. Sintesis final.
investiga   > Investigacion con fuentes verificables. Hallazgos + gaps.
documenta   > Formaliza en documento profesional con estructura y metadata.
diagrama    > Crea representacion visual: flujo, mapa, matriz, timeline.
evalua      > Evaluacion sistematica con rubrica y scoring.
optimiza    > Identifica ineficiencias y propone mejoras concretas.
automatiza  > Identifica lo automatizable. Propone flujo, herramienta, ROI.
desafia     > Challenge. Ataca la propuesta desde 3 angulos. Busca fallas.
calibra     > Ajusta tono, profundidad y formato a la audiencia especificada.
segmenta    > Divide en partes manejables con criterio logico.
consolida   > Unifica multiples inputs en un documento coherente.
prototipa   > Version minima viable. Lo suficiente para validar.
escala      > Toma lo que funciona y disenalo para 10x volumen.
aterriza    > De lo abstracto a lo concreto. Acciones, fechas, responsables.
conecta     > Encuentra relaciones entre conceptos aparentemente separados.
auditoria   > Revision exhaustiva. Marca: completo, faltante, incorrecto.
narrativa   > Transforma datos/hechos en historia con arco narrativo.
benchmark   > Compara contra mejores practicas del sector.
diagnostica > Analisis de situacion actual. Fortalezas, debilidades, brechas.
sintetiza   > De multiples fuentes a 1 pagina. Solo lo que importa.
estrategia  > Vision de largo plazo. Objetivos, palancas, trade-offs.
feedback    > Feedback SBI estructurado. Situacion, comportamiento, impacto.
reversa     > Ingenieria inversa. Analiza el historial y genera 1 priming + 1 SPEC reutilizable.
```

---

## JSON Schema

Cada entrada en `prompts_universales.json`:

**Para SPECs completos:**
```json
{
  "investigacion_dossier_competitivo": {
    "type": "spec",
    "mode": "deliverable",
    "category": "investigacion",
    "tags": ["Inteligencia Competitiva", "Analisis Sectorial"],
    "content": "[inputs]\n- SECTOR: {{SECTOR}} > ...\n\n[prompt]\n\n--- S | SITUACION ---\n...\n\n--- P | PEDIDO ---\n...\n\n--- E | EJECUCION ---\n...\n\n--- C | CRITERIO ---\n...\n\n[checklist]\n- [ ] ..."
  }
}
```

**Para micro-commands y accelerators:**
```json
{
  "a": "Aprobado. Proceder con el plan presentado.",
  "resume": "Resume ejecutivo: max 3 parrafos. Conclusion, evidencia, proximos pasos."
}
```

Nota: los SPECs tienen metadata como objeto; los commands/accelerators son strings planos.
Esto requiere actualizar `sync_prompts.js` para manejar ambos formatos.

---

## Reglas de Arquetipos (dentro de P | PEDIDO)

1. **Titulo profesional real** que existe en el mercado laboral
2. **Experiencia cuantificada**: anos, sector, escala
3. **Credenciales opcionales** (universidad, certificacion) — solo cuando calibran culturalmente
4. **Sin justificacion inline** — la conexion arquetipo-tarea debe ser evidente por el contexto
5. **Diversidad**: alternar genero, geografia, sector en los 365 SPECs

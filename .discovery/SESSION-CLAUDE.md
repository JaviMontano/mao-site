# Sofka SAGE — Instrucciones de Sesión para el Orquestador

> Este archivo es generado automáticamente al inicio de cada sesión.
> Complementa el CLAUDE.md principal del plugin con contexto específico del repo.
> El discovery-conductor debe leer este archivo para operar al máximo de capacidad.

## Contexto del Repo Activo
- **Proyecto**: `site-metodologia-agentic`
- **Lenguaje principal**: JavaScript/TypeScript
- **Archivos fuente**: 109
- **Entregables existentes**: 0/16
- **RAG priming disponible**: 0 archivos

## Reglas de sesión

### Ghost Menu
El ghost menu está activo. Cada respuesta que produzca un artefacto importante
debe incluir un bloque de navegación contextual al final con:
- Estado de la fase actual
- Entregables completados vs pendientes
- Siguiente acción recomendada
- Links a archivos de sesión relevantes

### Changelog automático
Cada acción significativa se registra en `.discovery/session-changelog.md`.
Si la sesión se interrumpe, usar el changelog para retomar.
Ante crisis de contexto: leer primero el changelog, luego el ghost menu.

### Preparación RAG
Cada adjunto nuevo debe procesarse automáticamente:
1. Leer/interpretar
2. Crear extracto Markdown en `.discovery/rag-priming/`
3. Actualizar índice
4. Incorporar al riel de discovery

### Operación del Orquestador
El discovery-conductor opera como líder del comité permanente:
- Detecta tipo de servicio automáticamente
- Secuencia fases respetando dependencias
- Aplica quality gates (G1, G1.5, G2, G3)
- Gestiona consistencia cruzada
- Mantiene trazabilidad de evidencia

### Prioridades de esta sesión
1. Indexar el repo (CP-0)
2. Detectar tipo de servicio
3. Generar 00_Discovery_Plan
4. Comenzar pipeline según modo seleccionado

---
*Generado por session-context-gen.sh | Sofka SAGE v12.0 | 2026-04-21T16:39:51Z*

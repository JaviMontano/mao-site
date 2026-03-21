# Data Model: Site Stabilization

## CTA Entry (cta-data.json)

```
CTA Entry
├── id: string (unique key, e.g. "beta-tester-claude")
├── email: string (target email address)
├── subject: string (pre-filled email subject)
├── body: string (pre-filled email body)
└── template: boolean (NEW — indicates body supports
    variable interpolation using {{variable}} syntax)
```

**Relationships**:
- Each CTA Entry maps to 1+ HTML elements via
  `data-cta="id"` attribute
- Every entry MUST have at least one HTML reference
- Template entries accept runtime data via
  `data-cta-params` attribute (JSON)

**Validation**:
- No duplicate IDs
- Email must be valid format
- Subject must be non-empty
- Body may be empty (for simple mailto links)

## Cotizador Session (sessionStorage)

```
Cotizador Session
├── step: number (current wizard step, 1-5)
├── horasTrabajo: number (hours/week worked)
├── horasEstudio: number (hours/week available)
├── ingresos: number (monthly income)
├── tareas: object
│   ├── simples: number (% operative tasks)
│   ├── medias: number (% analytical tasks)
│   └── altas: number (% strategic tasks)
├── programas: string[] (selected program IDs)
└── roi: object (calculated outputs)
    ├── totalInversion: number
    ├── horasLiberables: number
    └── mejoraProductividad: number
```

**State transitions**:
- Step 1 → 2: horasTrabajo validated (> 0)
- Step 2 → 3: tareas sum === 100%
- Step 3 → 4: ingresos validated (> 0)
- Step 4 → 5: at least 1 programa selected
- Step 5: ROI calculated, mailto CTA populated

## Resource Category

```
Resource Category
├── slug: string (directory name, e.g. "miniapps-claude")
├── tier: enum (free | premium)
├── title: string (display name)
├── items: ResourceItem[]
└── ctaId: string (matching cta-data.json entry)

ResourceItem
├── slug: string (file name without extension)
├── title: string
├── description: string
└── status: enum (active | coming-soon)
```

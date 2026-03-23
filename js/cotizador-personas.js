let currentStep = 1;

const STEP_NAMES = {
    0: 'Contexto',
    1: 'Línea Base',
    2: 'Diagnóstico',
    3: 'Niveles',
    4: 'Retorno (ROI)',
    5: 'Confirmación'
};

const STEP_SUBTITLES = {
    0: 'Contexto y Disclaimer',
    1: 'Empecemos por entender tu situación actual',
    2: '¿Cómo se distribuye tu trabajo?',
    3: 'Selecciona los niveles que te interesan',
    4: 'Tu retorno de inversión proyectado',
    5: 'Confirma tu interés'
};

const DELEGATION_CEILINGS = { simple: 0.80, medium: 0.33, strategic: 0.20 };

function goToStep(step) {
    [0, 1, 2, 3, 4, 5].forEach(i => {
        const el = document.getElementById(`step-${i}`);
        if (el) el.classList.add('hidden');
    });

    const target = document.getElementById(`step-${step}`);
    if (target) {
        target.classList.remove('hidden');
        target.classList.add('animate-fade-in');
    }

    const mobileNum = document.getElementById('mobile-step-num');
    const mobileName = document.getElementById('mobile-step-name');
    if (mobileNum) mobileNum.textContent = step === 0 ? 'i' : step;
    if (mobileName) mobileName.textContent = STEP_NAMES[step] || 'Paso ' + step;

    const percent = (step / 5) * 100;
    const mobileBar = document.getElementById('mobile-progress-bar');
    const desktopLine = document.getElementById('desktop-progress-line');

    if (mobileBar) mobileBar.style.width = `${Math.max(5, percent)}%`;
    if (desktopLine) desktopLine.style.width = `${percent}%`;

    // 3. Update Desktop Nodes
    document.querySelectorAll('.step-node').forEach((el) => {
        const nodeStep = parseInt(el.dataset.step);

        // Reset
        el.classList.remove('active', 'completed');
        
        if (nodeStep === step) {
            el.classList.add('active');
        } else if (nodeStep < step) {
            el.classList.add('completed');
        }
    });
    
    const subEl = document.getElementById('step-subtitle');
    if (subEl) subEl.textContent = STEP_SUBTITLES[step];
    
    currentStep = step;
    
    // Trigger calculations if needed
    if (step === 4) calculateROI();
    if (step === 5) prepareFinalSummary();
    
    // Scroll to top
    window.scrollTo({ top: 0, behavior: 'smooth' });
}

function nextStep() { goToStep(currentStep + 1); }
function prevStep() { goToStep(currentStep - 1); }

// UI Updates
function updateHorasDisplay() {
    const val = document.getElementById('horas-semana').value;
    document.getElementById('horas-display').textContent = val + 'h';
}

function updateEstudioDisplay() {
    const val = parseInt(document.getElementById('horas-estudio').value);
    document.getElementById('estudio-display').textContent = val + 'h';
    
    // Show/hide warning for less than 8h
    const warning = document.getElementById('estudio-warning');
    if (val < 8) {
        warning.classList.remove('hidden');
    } else {
        warning.classList.add('hidden');
    }
    saveToLocal();
}

function updateTareasDistribucion() {
    const simples = parseInt(document.getElementById('tareas-simples').value);
    const medias = parseInt(document.getElementById('tareas-medias').value);
    const altas = parseInt(document.getElementById('tareas-altas').value);

    document.getElementById('simples-display').textContent = simples + '%';
    document.getElementById('medias-display').textContent = medias + '%';
    document.getElementById('altas-display').textContent = altas + '%';

    const total = simples + medias + altas;
    const diff = total - 100;
    const msg = document.getElementById('validation-msg');
    const nextBtn = document.querySelector('#step-2 button[onclick*="nextStep"]');

    // Progress bar percentage (capped at 100 visually)
    const barPct = Math.min(total, 100);

    if (total === 100) {
        msg.className = 'p-4 rounded-xl bg-emerald-500/10 border border-emerald-500/20 text-center transition-all';
        msg.innerHTML = `
            <div class="flex items-center justify-center gap-3">
                <div class="w-full max-w-[200px] h-2 rounded-full bg-slate-700 overflow-hidden">
                    <div class="h-full bg-emerald-400 rounded-full transition-all duration-300" style="width:100%"></div>
                </div>
                <span class="text-sm font-bold text-emerald-400 whitespace-nowrap">✓ 100%</span>
            </div>
            <p class="text-xs text-emerald-300 mt-2">Distribución equilibrada — listo para continuar</p>
        `;
        if (nextBtn) { nextBtn.disabled = false; nextBtn.classList.remove('opacity-50', 'cursor-not-allowed'); }
    } else if (diff > 0) {
        msg.className = 'p-4 rounded-xl bg-red-500/10 border border-red-500/20 text-center transition-all';
        msg.innerHTML = `
            <div class="flex items-center justify-center gap-3">
                <div class="w-full max-w-[200px] h-2 rounded-full bg-slate-700 overflow-hidden">
                    <div class="h-full bg-red-400 rounded-full transition-all duration-300" style="width:100%"></div>
                </div>
                <span class="text-sm font-bold text-red-400 whitespace-nowrap">${total}%</span>
            </div>
            <p class="text-xs text-red-300 mt-2">Sobran <strong>${diff}%</strong> — reduce algún slider</p>
        `;
        if (nextBtn) { nextBtn.disabled = true; nextBtn.classList.add('opacity-50', 'cursor-not-allowed'); }
    } else {
        msg.className = 'p-4 rounded-xl bg-amber-500/10 border border-amber-500/20 text-center transition-all';
        msg.innerHTML = `
            <div class="flex items-center justify-center gap-3">
                <div class="w-full max-w-[200px] h-2 rounded-full bg-slate-700 overflow-hidden">
                    <div class="h-full bg-amber-400 rounded-full transition-all duration-300" style="width:${barPct}%"></div>
                </div>
                <span class="text-sm font-bold text-amber-400 whitespace-nowrap">${total}%</span>
            </div>
            <p class="text-xs text-amber-300 mt-2">Faltan <strong>${Math.abs(diff)}%</strong> — aumenta algún slider</p>
        `;
        if (nextBtn) { nextBtn.disabled = true; nextBtn.classList.add('opacity-50', 'cursor-not-allowed'); }
    }
    saveToLocal();
}

// ROI Calculation
function calculateROI() {
    // Get inputs
    const ingresos = parseInt(document.getElementById('ingresos').value) || 5000000;
    const horasSemana = parseInt(document.getElementById('horas-semana').value);
    const horasEstudioSemana = parseInt(document.getElementById('horas-estudio').value) || 8;
    const simples = parseInt(document.getElementById('tareas-simples').value) / 100;
    const medias = parseInt(document.getElementById('tareas-medias').value) / 100;
    const altas = parseInt(document.getElementById('tareas-altas').value) / 100;
    
    // Calculate value per hour (guard against zero hours)
    const horasMes = horasSemana * 4.33;
    const valorHora = horasMes > 0 ? Math.round(ingresos / horasMes) : 0;
    
    const horasSimples = horasSemana * simples * DELEGATION_CEILINGS.simple;
    const horasMedias = horasSemana * medias * DELEGATION_CEILINGS.medium;
    const horasAltas = horasSemana * altas * DELEGATION_CEILINGS.strategic;
    const potencialDelegableSemanal = horasSimples + horasMedias + horasAltas;
    
    // 2. Calculate Selection Data
    const checkboxes = document.querySelectorAll('.level-checkbox:checked');
    let totalMejora = 0;
    let totalInversionDinero = 0;
    let totalHorasEstudio = 0;
    let maxLevel = 0;
    
    checkboxes.forEach(cb => {
        totalMejora += parseInt(cb.dataset.mejora) || 0;
        totalInversionDinero += parseInt(cb.dataset.price) || 0;
        totalHorasEstudio += parseInt(cb.dataset.studyCost) || 0;
        const levelNum = parseInt(cb.dataset.name.replace(/\D/g, '')) || 0;
        if (levelNum > maxLevel) maxLevel = levelNum;
    });

    const factorLiberacion = Math.min(totalMejora, 100) / 100;
    
    // Logic: Linear Calculation (Total * %) capped by Weighted Potential
    const metaLinealSemanal = horasSemana * factorLiberacion;
    const semanalLiberadas = Math.min(metaLinealSemanal, potencialDelegableSemanal);
    const mensualLiberadas = semanalLiberadas * 4;
    
    // --- TIMELINE & STUDY IMPACT ---
    const semanasEstudio = Math.ceil(totalHorasEstudio / horasEstudioSemana) || 1;
    const mesesEstudio = Math.round((semanasEstudio / 4.3) * 10) / 10;
    const costoOportunidadTiempo = totalHorasEstudio * valorHora;
    const inversionTotalConsolidada = totalInversionDinero + costoOportunidadTiempo;

    // --- FINANCIAL MODELING ---
    const totalMonthlyImpact = mensualLiberadas * valorHora;

    // Year 1 (Accounting for learning months)
    const effectiveMonthsY1 = Math.max(0, 11.5 - mesesEstudio);
    const grossBenefitY1 = totalMonthlyImpact * effectiveMonthsY1;
    const netBenefitY1 = grossBenefitY1 - inversionTotalConsolidada;
    const roiY1 = inversionTotalConsolidada > 0 ? (netBenefitY1 / inversionTotalConsolidada) * 100 : 0;

    // Year 2 (Steady State — net ROI)
    const grossBenefitY2 = totalMonthlyImpact * 12;
    const netBenefitY2 = grossBenefitY2 - inversionTotalConsolidada;
    const roiY2 = inversionTotalConsolidada > 0 ? (netBenefitY2 / inversionTotalConsolidada) * 100 : 0;

    // Payback in Time (Weeks to recover study hours)
    const paybackSemanasTiempo = semanalLiberadas > 0 ? Math.ceil(totalHorasEstudio / semanalLiberadas) : 0;
    
    // Payback in Money (Months to recover money + time value)
    const paybackMesesDinero = totalMonthlyImpact > 0 ? Math.ceil(inversionTotalConsolidada / totalMonthlyImpact) : 0;

    // --- UPDATE UI ---
    const resultValue = document.getElementById('result-horas');
    if (resultValue) {
        if (maxLevel >= 7) {
            resultValue.textContent = "Soberanía Digital";
        } else {
            resultValue.textContent = Math.round(mensualLiberadas) + 'h/mes';
        }
    }

    document.getElementById('result-mejora').textContent = Math.min(totalMejora, 100) + '%';
    document.getElementById('result-inversion').textContent = formatCurrency(totalInversionDinero);
    
    const breakdown = document.getElementById('roi-breakdown');
    if (breakdown) {
        breakdown.innerHTML = `
            <div class="space-y-4 animate-fade-in">
                <!-- ROI Indicators -->
                <div class="grid grid-cols-2 gap-3">
                    <div class="p-3 bg-indigo-500/10 rounded-xl border border-indigo-500/20 text-center">
                        <div class="text-[10px] text-indigo-300 uppercase font-extrabold mb-1">ROI Proyectado (Año 1)</div>
                        <div class="text-2xl font-black ${roiY1 > 0 ? 'text-emerald-400' : 'text-slate-300'}">
                            ${roiY1 > 0 ? '+' + Math.round(roiY1) + '%' : 'Calculando...'}
                        </div>
                    </div>
                    <div class="p-3 bg-brand-gold/10 rounded-xl border border-brand-gold/20 text-center">
                        <div class="text-[10px] text-brand-gold uppercase font-extrabold mb-1">ROI Sostenido (Año 2)</div>
                        <div class="text-2xl font-black text-brand-gold">
                            ${roiY2 > 0 ? '+' + Math.round(roiY2) + '%' : '--'}
                        </div>
                    </div>
                </div>

                <!-- Step 1: Time Investment -->
                <div class="p-4 rounded-xl bg-white/5 border border-white/5">
                    <div class="flex justify-between items-start mb-3">
                        <div>
                            <h4 class="font-bold text-slate-100 text-sm">Fase 1: Inversión de Tiempo</h4>
                            <p class="text-[10px] text-slate-300">Esfuerzo de adopción de habilidades</p>
                        </div>
                        <span class="px-2 py-1 rounded bg-indigo-500/20 text-indigo-300 text-[10px] font-bold uppercase">${semanasEstudio} semanas</span>
                    </div>
                    <div class="space-y-2">
                        <div class="flex justify-between text-xs">
                            <span>Total horas de estudio:</span>
                            <span class="text-white font-mono">${totalHorasEstudio}h</span>
                        </div>
                        <div class="flex justify-between text-xs">
                            <span>Costo de Oportunidad (Tiempo):</span>
                            <span class="text-slate-200">${formatCurrency(costoOportunidadTiempo)}</span>
                        </div>
                        <div class="mt-2 pt-2 border-t border-white/5 flex justify-between font-bold text-indigo-300">
                            <span>Inversión Inicial Total:</span>
                            <span>${formatCurrency(inversionTotalConsolidada)}</span>
                        </div>
                    </div>
                </div>

                <!-- Step 2: Time Profit -->
                <div class="p-4 rounded-xl bg-gradient-to-r from-emerald-900/40 to-emerald-800/20 border border-emerald-500/30">
                    <div class="flex justify-between items-start mb-3">
                        <div>
                            <h4 class="font-bold text-emerald-400 text-sm">Fase 2: Retorno de Vida</h4>
                            <p class="text-[10px] text-emerald-200/70">Recuperación de capacidad instalada</p>
                        </div>
                        <span class="px-2 py-1 rounded bg-emerald-500/20 text-emerald-400 text-[10px] font-bold uppercase">ROI Positivo</span>
                    </div>
                    <div class="space-y-2">
                        <div class="flex justify-between text-xs">
                            <span>Liberación Semanal Reclamada:</span>
                            <span class="text-white font-bold">${Math.round(semanalLiberadas*10)/10}h/semana</span>
                        </div>
                        <div class="flex justify-between text-xs">
                            <span>Payback de Tiempo (Estudio):</span>
                            <span class="text-emerald-300">~${paybackSemanasTiempo} semanas de ahorro</span>
                        </div>
                         <div class="flex justify-between items-center mt-3 pt-3 border-t border-emerald-500/20">
                            <span class="text-white font-bold">Beneficio Mensual Neto:</span>
                            <span class="text-xl font-black text-white">${formatCurrency(totalMonthlyImpact)}</span>
                        </div>
                    </div>
                </div>
                <p class="text-[9px] text-slate-400 italic text-center">
                    * El cálculo de ROI consolidado incluye el valor de tu tiempo (Costo de Oportunidad) y la curva de aprendizaje proyectada.
                </p>
            </div>
        `;
    }
    
    const paybackDisplay = document.getElementById('result-payback');
    if (paybackDisplay) {
        if (totalInversionDinero > 0 && totalMonthlyImpact > 0) {
            paybackDisplay.innerHTML = `<span class="text-emerald-400">⚡ Recuperas tu inversión total en ~${paybackMesesDinero} meses</span>`;
        } else {
            paybackDisplay.textContent = 'Selecciona niveles para calcular el retorno';
        }
    }
}
function prepareFinalSummary() {
    const checkboxes = document.querySelectorAll('.level-checkbox:checked');
    const container = document.getElementById('final-summary');
    let totalInversion = 0;
    let html = '';
    
    checkboxes.forEach(cb => {
        totalInversion += parseInt(cb.dataset.price);
        html += `<div class="flex justify-between text-slate-100">
            <span>${cb.dataset.name}</span>
            <span>${formatCurrency(parseInt(cb.dataset.price))}</span>
        </div>`;
    });
    
    if (html === '') {
        html = '<div class="text-slate-200 italic">No has seleccionado ningún nivel</div>';
    }
    
    container.innerHTML = html;
    document.getElementById('final-price').textContent = formatCurrency(totalInversion);
    
    // CTA via centralized CTAHandler template system
    const mejora = document.getElementById('result-mejora').textContent;
    const horas = document.getElementById('result-horas').textContent;
    const ingresos = formatCurrency(parseInt(document.getElementById('ingresos').value));
    const horasTrabajo = document.getElementById('horas-semana').value;
    const horasEstudio = document.getElementById('horas-estudio').value;
    const simples = document.getElementById('tareas-simples').value;
    const medias = document.getElementById('tareas-medias').value;
    const altas = document.getElementById('tareas-altas').value;

    if (window.ctaHandler && window.ctaHandler.isLoaded) {
        const mailtoLink = window.ctaHandler.buildMailto('cotizador-propuesta', {
            ingresos: ingresos,
            horasTrabajo: horasTrabajo,
            horasEstudio: horasEstudio,
            simples: simples,
            medias: medias,
            altas: altas,
            seleccion: Array.from(checkboxes).map(cb => '- ' + cb.dataset.name).join('\n'),
            inversion: formatCurrency(totalInversion),
            horas: horas,
            mejora: mejora
        });
        if (mailtoLink) {
            document.getElementById('mailto-cta').href = mailtoLink;
        }
    }
}

function formatCurrency(value) {
    return '$' + value.toLocaleString('es-CO');
}

// Session Storage
function saveToLocal() {
    const data = {
        ingresos: document.getElementById('ingresos').value,
        horasSemana: document.getElementById('horas-semana').value,
        horasEstudio: document.getElementById('horas-estudio').value,
        tareasSimples: document.getElementById('tareas-simples').value,
        tareasMedias: document.getElementById('tareas-medias').value,
        tareasAltas: document.getElementById('tareas-altas').value,
        selectedLevels: Array.from(document.querySelectorAll('.level-checkbox:checked')).map(cb => cb.dataset.name)
    };
    sessionStorage.setItem('metodologia_roi_data', JSON.stringify(data));
}

function loadFromLocal() {
    const saved = sessionStorage.getItem('metodologia_roi_data');
    if (!saved) return;
    
    try {
        const data = JSON.parse(saved);
        if (data.ingresos) document.getElementById('ingresos').value = data.ingresos;
        if (data.horasSemana) {
            document.getElementById('horas-semana').value = data.horasSemana;
            updateHorasDisplay();
        }
        if (data.horasEstudio) {
            document.getElementById('horas-estudio').value = data.horasEstudio;
            updateEstudioDisplay();
        }
        if (data.tareasSimples) document.getElementById('tareas-simples').value = data.tareasSimples;
        if (data.tareasMedias) document.getElementById('tareas-medias').value = data.tareasMedias;
        if (data.tareasAltas) document.getElementById('tareas-altas').value = data.tareasAltas;
        
        // Ensure UI updates
        updateTareasDistribucion();
        
        // Restore checkboxes
        if (data.selectedLevels && data.selectedLevels.length > 0) {
            document.querySelectorAll('.level-checkbox').forEach(cb => {
                if (data.selectedLevels.includes(cb.dataset.name)) {
                    cb.checked = true;
                }
            });
        }
    } catch(e) { console.warn('Restore error:', e); }
}

// Methodology Modal — delegated to ModalSystem
function openMethodologyModal() {
    ModalSystem.open('methodology-modal');
    if (typeof icons !== 'undefined') icons.createIcons();
}
function closeMethodologyModal() {
    ModalSystem.close('methodology-modal');
}

// Journey Modal — delegated to ModalSystem
function openJourneyModal() {
    ModalSystem.open('journey-modal');
    if (typeof icons !== 'undefined') icons.createIcons();
}
function closeJourneyModal() {
    ModalSystem.close('journey-modal');
}

// Init
document.addEventListener('DOMContentLoaded', () => {
    if (typeof icons !== 'undefined') icons.createIcons();
    loadFromLocal();
    
    // Save on any input change
    document.querySelectorAll('input').forEach(input => {
        input.addEventListener('change', saveToLocal);
    });
});

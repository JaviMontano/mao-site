#!/bin/bash
# audit-adversarial.sh — Adversarial audit + auto-remediation, one HTML at a time
# Usage: bash scripts/audit-adversarial.sh [file.html]
# Without args: audits ALL pages sequentially

RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
NC='\033[0m'

ERRORS=0
WARNINGS=0
FIXES=0

audit_file() {
  local f="$1"
  local issues=0
  echo ""
  echo "════════════════════════════════════════════════════════"
  echo "  AUDITING: $f"
  echo "════════════════════════════════════════════════════════"

  # === BRAND TERMS (auto-fix) ===
  if grep -qi "gratuito\|gratis" "$f"; then
    echo -e "${RED}  ✗ BRAND: Contains 'gratuito/gratis'${NC}"
    sed -i '' 's/[Gg]ratuito/Sin Riesgo/g;s/[Gg]ratis/Abierto/g' "$f"
    echo -e "${GREEN}    → Fixed: replaced with 'Sin Riesgo/Abierto'${NC}"
    ((FIXES++))
  fi

  if grep -qi "sin compromiso" "$f"; then
    echo -e "${RED}  ✗ BRAND: Contains 'sin compromiso'${NC}"
    sed -i '' 's/[Ss]in compromiso/Sin fricción/g' "$f"
    echo -e "${GREEN}    → Fixed: replaced with 'Sin fricción'${NC}"
    ((FIXES++))
  fi

  if grep -qi "24 horas" "$f"; then
    echo -e "${RED}  ✗ BRAND: Contains '24 horas'${NC}"
    sed -i '' 's/24 horas/2 días hábiles/g' "$f"
    echo -e "${GREEN}    → Fixed: '2 días hábiles'${NC}"
    ((FIXES++))
  fi

  if grep -qi "Primera Conversación" "$f" && ! grep -qi "Primera Conversación" "$f" | grep -qi "data-cms"; then
    echo -e "${YELLOW}  ⚠ BRAND: Contains 'Primera Conversación' — should be 'Conversemos'${NC}"
    ((WARNINGS++))
  fi

  # === CSS IMPORTS ===
  if grep -q "dist/output.css\|estilos/variables.css\|estilos/base.css\|estilos/components.css" "$f"; then
    echo -e "${RED}  ✗ CSS: Old CSS imports (variables/base/components/output)${NC}"
    ((issues++))
    ((ERRORS++))
  fi

  if ! grep -q "neoswiss-system.css" "$f"; then
    echo -e "${RED}  ✗ CSS: Missing neoswiss-system.css${NC}"
    ((issues++))
    ((ERRORS++))
  fi

  if ! grep -q "triple-toggle.css" "$f"; then
    echo -e "${YELLOW}  ⚠ CSS: Missing triple-toggle.css${NC}"
    ((WARNINGS++))
  fi

  # === COMPONENTS ===
  if ! grep -q "<site-header>" "$f"; then
    echo -e "${YELLOW}  ⚠ COMPONENT: Missing <site-header>${NC}"
    ((WARNINGS++))
  fi

  if ! grep -q "<site-footer>" "$f"; then
    echo -e "${YELLOW}  ⚠ COMPONENT: Missing <site-footer>${NC}"
    ((WARNINGS++))
  fi

  if ! grep -q "<triple-toggle>" "$f"; then
    echo -e "${YELLOW}  ⚠ COMPONENT: Missing <triple-toggle>${NC}"
    ((WARNINGS++))
  fi

  if ! grep -q "bg-mesh" "$f"; then
    echo -e "${YELLOW}  ⚠ LAYOUT: Missing bg-mesh div${NC}"
    ((WARNINGS++))
  fi

  # === SHELL BOOTSTRAP ===
  if ! grep -q "initShell\|shell.js" "$f"; then
    echo -e "${RED}  ✗ JS: Missing shell.js bootstrap${NC}"
    ((issues++))
    ((ERRORS++))
  fi

  # === ANTI-FOUC ===
  if grep -q "data-theme=\"light\"" "$f" | head -1 | grep -q "html"; then
    echo -e "${YELLOW}  ⚠ THEME: Hardcoded data-theme='light' on html tag${NC}"
    ((WARNINGS++))
  fi

  # === OLD SCRIPT TAGS ===
  if grep -q '<script src=".*SiteHeader.js.*" defer>' "$f" || grep -q '<script src=".*SiteFooter.js.*" defer>' "$f"; then
    echo -e "${RED}  ✗ JS: Old defer script tags for components (should use shell.js import)${NC}"
    ((issues++))
    ((ERRORS++))
  fi

  if grep -q '<script src=".*icons.js.*" defer>' "$f"; then
    echo -e "${YELLOW}  ⚠ JS: Old icons.js defer tag${NC}"
    ((WARNINGS++))
  fi

  # === FONTS ===
  if grep -q "Inter:wght" "$f"; then
    echo -e "${RED}  ✗ FONT: Still using Inter (should be Montserrat)${NC}"
    sed -i '' 's/Inter:wght/Montserrat:wght/g' "$f"
    echo -e "${GREEN}    → Fixed: Inter → Montserrat${NC}"
    ((FIXES++))
  fi

  if grep -q "JetBrains.Mono" "$f" && ! grep -q "neoswiss-system" "$f"; then
    echo -e "${YELLOW}  ⚠ FONT: References JetBrains Mono (tertiary should be Trebuchet)${NC}"
    ((WARNINGS++))
  fi

  # === ACCESSIBILITY ===
  if ! grep -q 'lang="es"' "$f"; then
    echo -e "${YELLOW}  ⚠ A11Y: Missing lang='es' on html tag${NC}"
    ((WARNINGS++))
  fi

  if ! grep -q "viewport" "$f"; then
    echo -e "${RED}  ✗ A11Y: Missing viewport meta${NC}"
    ((issues++))
    ((ERRORS++))
  fi

  # === RESULT ===
  if [ $issues -eq 0 ]; then
    echo -e "${GREEN}  ✓ PASS — No critical issues${NC}"
  fi
}

# Main
if [ -n "$1" ]; then
  audit_file "$1"
else
  while IFS= read -r f; do
    audit_file "$f"
  done < /private/tmp/all-pages.txt
fi

echo ""
echo "════════════════════════════════════════════════════════"
echo "  AUDIT SUMMARY"
echo "════════════════════════════════════════════════════════"
echo -e "  ${RED}Errors:   $ERRORS${NC}"
echo -e "  ${YELLOW}Warnings: $WARNINGS${NC}"
echo -e "  ${GREEN}Auto-fixed: $FIXES${NC}"
echo ""

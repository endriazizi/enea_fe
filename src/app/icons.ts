// src/app/icons.ts
// ============================================================================
// Registro le Ionicons usate nell’app per evitare lazy-load a runtime
// (in Angular standalone conviene). Aggiungo anche `scan-outline` per la pagina
// NFC e correggo il mapping di `chevron-forward-outline`.
// ============================================================================

import { addIcons } from 'ionicons';
import {
  // base
  menu, logOutOutline, home, list, addCircle, grid,
  timeOutline, pulseOutline, createOutline, calendarOutline,
  // navigation
  chevronBackOutline, chevronForwardOutline,
  // misc usati in app
  personOutline, searchOutline, refreshOutline,
  // 👉 NFC / QR
  scanOutline,
  ellipsisVerticalCircleOutline,
  removeCircleOutline,
  documentTextOutline,
  funnelOutline,
  addOutline,
  printOutline,
  closeCircleOutline,
  trashOutline,
  informationCircleOutline,
  checkmarkCircleOutline,
  lockClosedOutline,
  addCircleOutline,
  close,
  cartOutline,
  peopleOutline,
} from 'ionicons/icons';

export function registerAppIcons() {
  addIcons({
    // base
    'menu': menu,
    'logout': logOutOutline,
    'home': home,
    'list': list,
    'add-circle': addCircle,
    'grid': grid,
    'time-outline': timeOutline,
    'pulse-outline': pulseOutline,
    'create-outline': createOutline,
    'calendar-outline': calendarOutline,
    'ellipsis-vertical': ellipsisVerticalCircleOutline,
    'remove-circle': removeCircleOutline,
    'document-text-outline': documentTextOutline,
    'funnel-outline': funnelOutline,
    'add-outline':addOutline,
    'print-outline': printOutline,
    'close-circle-outline':closeCircleOutline,
    'trash-outline':trashOutline,
    'checkmark-circle-outline':checkmarkCircleOutline,
    'information-circle-outline':informationCircleOutline,
    'lock-closed-outline':lockClosedOutline,
    'add-circle-outline':addCircleOutline,
    'close':close,
    'cart-outline':cartOutline,
        'people-outline':peopleOutline,
    // navigation
    'chevron-back-outline': chevronBackOutline,
    // ✅ fix: ora la forward è davvero forward
    'chevron-forward-outline': chevronForwardOutline,

    // misc
    'person-outline': personOutline,
    'search-outline': searchOutline,
    'refresh-outline': refreshOutline,

    // ✅ NFC
    'scan-outline': scanOutline,
  });
}

// src/app/icons.ts
// ============================================================================
// Registra le icone Ionicons usate nell'app per evitare fetch da CDN/404.
// Nota: aggiungo alcune icone che già compaiono nei template (chevron*, checkmark,
// mail, close, ecc.), così su iOS/desktop non hai placeholder vuoti.
// ============================================================================

import { addIcons } from 'ionicons';
import {
  home,
  list,
  addCircle,
  removeCircle,
  ellipsisVertical,
  funnelOutline,
  printOutline,
  qrCodeOutline,
  addOutline,
  calendarOutline,
  documentTextOutline,
  createOutline,
  trashOutline,
  saveOutline,
  // 👇 nuove/mancanti
  informationCircleOutline,
  trashBinOutline,
  closeOutline,
  checkmarkCircleOutline,
  mailOutline,
  refreshOutline,
  chevronBack,
  chevronForward,
  checkmark,
} from 'ionicons/icons';

export function registerAppIcons() {
  addIcons({
    home,
    list,
    'add-circle': addCircle,
    'remove-circle': removeCircle,
    'ellipsis-vertical': ellipsisVertical,
    'funnel-outline': funnelOutline,
    'print-outline': printOutline,
    'qr-code-outline': qrCodeOutline,
    'add-outline': addOutline,
    'calendar-outline': calendarOutline,
    'document-text-outline': documentTextOutline,
    'create-outline': createOutline,
    'trash-outline': trashOutline,
    'save-outline': saveOutline,
    // nuove
    'information-circle-outline': informationCircleOutline,
    'trash-bin-outline': trashBinOutline,
    'close-outline': closeOutline,
    'checkmark-circle-outline': checkmarkCircleOutline,
    'mail-outline': mailOutline,
    'refresh-outline': refreshOutline,
    'chevron-back': chevronBack,
    'chevron-forward': chevronForward,
    'checkmark': checkmark,
  });
}
  
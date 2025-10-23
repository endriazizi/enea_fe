// src/app/icons.ts
// Registra le icone usate (evita fetch da CDN e 404 in prod)
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
  documentTextOutline,   // 👈 aggiunte
  createOutline,          // 👈 aggiunte
  trashOutline,
  saveOutline
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
    'document-text-outline': documentTextOutline, // 👈 ora disponibili
    'create-outline': createOutline    ,           // 👈 ora disponibili


    'trash-outline': trashOutline,
    'save-outline': saveOutline,
  });
}

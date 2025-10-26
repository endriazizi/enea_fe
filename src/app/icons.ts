// src/app/icons.ts
import { addIcons } from 'ionicons';
import {
  home, list, addCircle, removeCircle, ellipsisVertical,
  funnelOutline, printOutline, qrCodeOutline, addOutline, calendarOutline,
  documentTextOutline, createOutline, trashOutline, saveOutline,
  callOutline, mailOutline, peopleOutline, timeOutline, searchOutline,
  checkmarkOutline, closeOutline
} from 'ionicons/icons';

export function registerAppIcons() {
  addIcons({
    home, list,
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
    'call-outline': callOutline,
    'mail-outline': mailOutline,
    'people-outline': peopleOutline,
    'time-outline': timeOutline,
    'search-outline': searchOutline,
    'checkmark-outline': checkmarkOutline,
    'close-outline': closeOutline,
  });
}

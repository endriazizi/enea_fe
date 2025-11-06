// src/app/icons.ts
import { addIcons } from 'ionicons';
import {
  home, list, addCircle, removeCircle, ellipsisVertical,
  funnelOutline, printOutline, qrCodeOutline, addOutline, calendarOutline,
  documentTextOutline, createOutline, trashOutline, saveOutline,
  callOutline, mailOutline, peopleOutline, timeOutline, searchOutline,
  checkmarkOutline, closeOutline,
  pulseOutline,
  closeCircleOutline,
  informationCircle,
  informationCircleOutline,
  gridOutline,
  addCircleOutline,
  logInOutline,
  swapHorizontalOutline
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
    'pulse-outline': pulseOutline,
    'checkmark-circle-outline': checkmarkOutline,
    'close-circle-outline': closeCircleOutline,
    'information-circle-outline':informationCircleOutline,
    'trash-bin-outline': trashOutline,
    'grid': gridOutline,
    'add-circle-outline':addCircleOutline,
    'close':closeOutline,
    'log-in-outline': logInOutline,
    'swap-horizontal-outline': swapHorizontalOutline,
    

  });
}

import {
  animate,
  state,
  style,
  transition,
  trigger,
} from '@angular/animations';

export const fade = trigger('fade', [
  state('in', style({ opacity: 1 })),
  transition(':enter', [style({ opacity: 0 }), animate(230)]),
  transition(':leave', animate(230, style({ opacity: 0 }))),
]);

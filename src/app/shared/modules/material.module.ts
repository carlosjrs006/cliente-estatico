import { NgModule } from '@angular/core';
import { CommonModule, registerLocaleData } from '@angular/common';

import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatSliderModule } from '@angular/material/slider';
import { LOCALE_ID, DEFAULT_CURRENCY_CODE } from '@angular/core';
import localePt from '@angular/common/locales/pt';
import { LayoutModule } from '@angular/cdk/layout';
import { DragDropModule } from '@angular/cdk/drag-drop';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatTooltipModule } from '@angular/material/tooltip';
import {
  MatFormFieldModule,
  MatFormFieldDefaultOptions,
  MAT_FORM_FIELD_DEFAULT_OPTIONS,
} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatMenuModule } from '@angular/material/menu';
import { MatDialogModule } from '@angular/material/dialog';
import { MatStepperModule } from '@angular/material/stepper';
import { MatBadgeModule } from '@angular/material/badge';
import { MatTableModule } from '@angular/material/table';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatBottomSheetModule } from '@angular/material/bottom-sheet';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MatSelectModule } from '@angular/material/select';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatRadioModule } from '@angular/material/radio';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatTreeModule } from '@angular/material/tree';
import { MatTabsModule } from '@angular/material/tabs';
import { MatProgressBarModule } from '@angular/material/progress-bar';
import { MatChipsModule } from '@angular/material/chips';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import { MatCheckboxModule } from '@angular/material/checkbox';

registerLocaleData(localePt, 'pt');

const appearance: MatFormFieldDefaultOptions = {
  appearance: 'outline',
};

const modules = [
  CommonModule,
  LayoutModule,
  DragDropModule,
  FormsModule,
  ReactiveFormsModule,
  MatToolbarModule,
  MatButtonModule,
  MatIconModule,
  MatMenuModule,
  MatTooltipModule,
  MatFormFieldModule,
  MatInputModule,
  MatDialogModule,
  MatStepperModule,
  MatBadgeModule,
  MatTableModule,
  MatButtonToggleModule,
  MatProgressSpinnerModule,
  MatProgressBarModule,
  MatBottomSheetModule,
  MatSnackBarModule,
  MatSelectModule,
  MatSidenavModule,
  MatListModule,
  MatRadioModule,
  MatExpansionModule,
  MatAutocompleteModule,
  MatSlideToggleModule,
  MatCardModule,
  MatGridListModule,
  FormsModule,
  MatSelectModule,
  ReactiveFormsModule,
  MatSliderModule,
  MatTreeModule,
  MatTabsModule,
  MatChipsModule,
  MatPaginatorModule,
  MatDatepickerModule,
  MatNativeDateModule,
  MatCheckboxModule,
];

@NgModule({
  declarations: [],
  imports: [...modules],
  exports: [...modules],
  providers: [
    {
      provide: MAT_FORM_FIELD_DEFAULT_OPTIONS,
      useValue: appearance,
    },
    {
      provide: LOCALE_ID,
      useValue: 'pt',
    },
    {
      provide: DEFAULT_CURRENCY_CODE,
      useValue: 'BRL',
    },
  ],
})
export class MaterialModule {}

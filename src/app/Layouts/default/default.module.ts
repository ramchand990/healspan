import { CUSTOM_ELEMENTS_SCHEMA, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from 'src/app/Shared/shared.module';
import { DefaultComponent } from './default.component';
import { RouterModule } from '@angular/router';
import { ReactiveFormsModule } from '@angular/forms';
import { HdashboardComponent } from 'src/app/Pages/hdashboard/hdashboard.component';
import { RdashboardComponent } from 'src/app/Pages/rdashboard/rdashboard.component';
import { CreatclaimComponent } from 'src/app/Pages/creatclaim/creatclaim.component';
import { ViewclaimComponent } from 'src/app/Pages/viewclaim/viewclaim.component';
import { ResetpasswordComponent } from 'src/app/Pages/resetpassword/resetpassword.component';
import { ProfileComponent } from 'src/app/Pages/profile/profile.component';
import { FormsModule } from '@angular/forms';
import {MatStepperModule} from '@angular/material/stepper';
import {MatDatepickerModule} from '@angular/material/datepicker';
import { MatNativeDateModule } from '@angular/material/core';
import {MatFormFieldModule} from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { HttpClientModule } from '@angular/common/http';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { NgMultiSelectDropDownModule } from 'ng-multiselect-dropdown';
import { MatSelectModule } from '@angular/material/select';
import { OthercostComponent } from 'src/app/Pages/creatclaim/othercost/othercost.component';
import { MatTableModule } from '@angular/material/table';
import { MatDialogModule } from '@angular/material/dialog';
import { FilterPipe } from 'src/app/Shared/Pipes/filter.pipe';
import { SortDirective } from 'src/app/Shared/Directives/sort.directive';
import { OrderbyPipe } from 'src/app/Shared/Pipes/orderby.pipe';
import { AlphabetOnlyDirective } from 'src/app/Shared/Directives/alphabet-only.directive';
import { SetTimeoutpopupComponent } from 'src/app/Shared/Components/set-timeoutpopup/set-timeoutpopup.component';
import { MatButtonModule } from '@angular/material/button';
import { AddFilePopUpComponentComponent } from 'src/app/Pages/creatclaim/add-file-pop-up-component/add-file-pop-up-component.component';

import {MatIconModule} from '@angular/material/icon';
import { AdminComponent } from 'src/app/Pages/admin/admin.component';
import { SlaStatusComponent } from 'src/app/Pages/sla-status/sla-status.component';
import {MatSnackBarModule} from '@angular/material/snack-bar';
import {MatTooltipModule} from '@angular/material/tooltip';
import { MatAutocompleteModule } from '@angular/material/autocomplete';
import { NgxSpinnerModule } from 'ngx-spinner';
import { MatTreeModule } from '@angular/material/tree';
import { NgSelectModule } from '@ng-select/ng-select';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { LoadingComponent } from 'src/app/Pages/loading/loading.component';
import { CommaseparatePipe } from 'src/app/Shared/Pipes/commaseparate.pipe';
import { SafePipe } from 'src/app/Shared/Pipes/safe.pipe';
import { ReplaceNullWithTextPipe } from 'src/app/Shared/Pipes/replace-null-with-text.pipe';
@NgModule({
  declarations: [
    DefaultComponent,
    HdashboardComponent,
    RdashboardComponent,
    CreatclaimComponent,
    ViewclaimComponent,
    ResetpasswordComponent,
    ProfileComponent,
    OthercostComponent,
    FilterPipe,
    OrderbyPipe,
    SortDirective,
    AlphabetOnlyDirective,
    SetTimeoutpopupComponent,
    AddFilePopUpComponentComponent,
    AdminComponent,
    SlaStatusComponent,
    LoadingComponent,
    CommaseparatePipe,
    SafePipe,
    ReplaceNullWithTextPipe
  ],
  imports: [
    CommonModule,
    SharedModule,
    RouterModule,
    FormsModule,
    ReactiveFormsModule,
    MatStepperModule,
    MatDatepickerModule,
    MatNativeDateModule,
    MatTooltipModule,
    MatSelectModule,
    MatInputModule,
    HttpClientModule,
    MatButtonToggleModule,
    MatTableModule ,
    MatDialogModule,
    NgMultiSelectDropDownModule.forRoot(),
    MatInputModule,
    MatButtonModule,
    MatFormFieldModule,
    MatIconModule,
    MatSnackBarModule,
    MatAutocompleteModule ,
   NgSelectModule,
    MatTreeModule ,

    NgxSpinnerModule,
    BrowserAnimationsModule


  ],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
  
})
export class DefaultModule { }


import { CUSTOM_ELEMENTS_SCHEMA, ErrorHandler, NgModule, NO_ERRORS_SCHEMA } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ReactiveFormsModule }   from '@angular/forms';
import { DefaultModule } from './Layouts/default/default.module';
import { LoginComponent } from './login/login.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import { ApiService } from './service/api.service';
import { SlaStatusComponent } from './Pages/sla-status/sla-status.component';
import { AuthenticationService } from './service/authentication.service';
import { NgxSpinnerModule } from 'ngx-spinner';
import { ModalpopupService } from './Providers/modalpopup.service';
import { ErrorIntercept } from './service/error.interceptor';
import { NgIdleKeepaliveModule } from '@ng-idle/keepalive';
import { ModalModule } from 'ngx-bootstrap/modal';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { QuerypopupComponent } from './Pages/viewclaim/querypopup/querypopup.component';
import { TpaApprovalComponent } from './Pages/viewclaim/tpa-approval/tpa-approval.component';
import { SnackbarComponent } from './Pages/snackbar/snackbar.component';
import { DatePipe } from '@angular/common';
import { AuthInterceptor, GlobalJSErrorHandler } from './service/token.interceptor';



//import { ModalModule } from 'ngx-bootstrap/modal';
@NgModule({
  declarations: [
    AppComponent,
    LoginComponent,
    
    QuerypopupComponent,
    TpaApprovalComponent,
    SnackbarComponent,
    
    
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    DefaultModule,
    MatFormFieldModule,
    HttpClientModule,
    NgxSpinnerModule,
    NgIdleKeepaliveModule.forRoot(),
    ModalModule.forRoot(), 
    MatDialogModule,
    MatButtonModule,
 
    // MatDialogModule,
    // MatTableModule ,
    // CdkTableModule
    // MatTable
  
  ],

  // { provide: LocationStrategy, useClass: HashLocationStrategy}
 
  providers: [
    ApiService,
    AuthenticationService,
    ModalpopupService,
    DatePipe,
    {provide: Window, useValue: window },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: ErrorIntercept,
      multi: true
    },
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    },
    {provide: ErrorHandler, useClass: GlobalJSErrorHandler}
  ],
  bootstrap: [AppComponent],
  schemas: [ CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule { }
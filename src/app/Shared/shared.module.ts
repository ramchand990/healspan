import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';
import { HeaderComponent } from './Components/header/header.component';
import { FooterComponent } from './Components/footer/footer.component';
import { SidebarComponent } from './Components/sidebar/sidebar.component';
import { DatePipe } from './Pipes/date.pipe';
import { ConfirmLogoutComponent } from './Components/confirm-logout/confirm-logout.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { MessageDialogComponent } from './Components/message-dialog/message-dialog.component';
import { MatBadgeModule } from '@angular/material/badge';
import {MatMenuModule} from '@angular/material/menu';



@NgModule({
  declarations: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    DatePipe,
    ConfirmLogoutComponent,
    MessageDialogComponent,
   
  
 
    //SortPipe,
    //OrderbyPipe,
    // FilterPipe,
  ],
  imports: [
    CommonModule,
    RouterModule,
    MatDialogModule,
    MatButtonModule,
    MatBadgeModule,
    MatMenuModule
  ],
  exports: [
    HeaderComponent,
    FooterComponent,
    SidebarComponent,
    
  ]
})
export class SharedModule { }

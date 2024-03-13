import { Component, ViewChild, TemplateRef, ElementRef, AfterViewInit, enableProdMode, Inject } from '@angular/core';
import { Router } from '@angular/router';

import { Idle, DEFAULT_INTERRUPTSOURCES } from '@ng-idle/core';
import { Keepalive } from '@ng-idle/keepalive';

import { BsModalService } from 'ngx-bootstrap/modal';
import { BsModalRef } from 'ngx-bootstrap/modal';
import { ModalDirective } from 'ngx-bootstrap/modal';
import { AuthenticationService } from './service/authentication.service';
import { MatDialog, MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { SetTimeoutpopupComponent } from './Shared/Components/set-timeoutpopup/set-timeoutpopup.component';
import { ConfirmDialogModel, ConfirmLogoutComponent } from './Shared/Components/confirm-logout/confirm-logout.component';
import { MessageDialogComponent, MessageDialogModel } from './Shared/Components/message-dialog/message-dialog.component';
import { environment } from 'src/environments/environment';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {

  idleState = 'Not started.';
  timedOut = false;
  lastPing?: Date;
  title = 'angular-idle-timeout';
  dialogRef!: MatDialogRef<any>;
  public modalRef: BsModalRef;
  childModal: any;

  constructor(private idle: Idle, private keepalive: Keepalive, @Inject(Window) private _window: Window,
    private router: Router, private modalService: BsModalService, private appService: AuthenticationService, private dialog: MatDialog) {
    // sets an idle timeout of 5 seconds, for testing purposes.
    idle.setIdle(1800);
    // sets a timeout period of 5 seconds. after 10 seconds of inactivity, the user will be considered timed out.
    idle.setTimeout(5);
    // sets the default interrupts, in this case, things like clicks, scrolls, touches to the document
    idle.setInterrupts(DEFAULT_INTERRUPTSOURCES);

    idle.onIdleEnd.subscribe(() => {
      this.idleState = 'No longer idle.'
     
      this.reset();
    });

    idle.onTimeout.subscribe(() => {
      this.idleState = 'Timed out!';
      this.timedOut = true;
      const message = `Session timed out!`;
      sessionStorage.clear();
      this.router.navigate(['/login']);

      const dialogData = new MessageDialogModel("Confirm Action", message);
      this.dialog.open(MessageDialogComponent, {
        data: dialogData
      });
      
    });

    idle.onIdleStart.subscribe(() => {
      this.idleState = 'You\'ve gone idle!'
      
      document.getElementById("openModalButton")?.click();

    });

    idle.onTimeoutWarning.subscribe((countdown) => {
      this.idleState = 'You will time out in ' + countdown + ' seconds!'
   
    });

    // sets the ping interval to 15 seconds
    keepalive.interval(15);

    keepalive.onPing.subscribe(() => this.lastPing = new Date());

    this.appService.getUserLoggedIn().subscribe(userLoggedIn => {
      if (userLoggedIn) {
        idle.watch()
        this.timedOut = false;
      } else {
        idle.stop();
      }
    })
  }

  ngOnInit(): void {
    if (this._window.location.hostname.includes('localhost')) {

      environment.baseUrl = `http://13.235.113.71:2023/`;
      environment.ruleBaseUrl = `http://13.235.113.71:9999/ruleengine/processRules`;

    }
    else if (this._window.location.hostname.includes('zap.healspan.com')) {
      environment.baseUrl = `https://zap.healspan.com/`;
      environment.ruleBaseUrl = `https://zap.healspan.com/ruleengine/processRules`;
    }
    else {
      environment.baseUrl = `http://${this._window.location.hostname}:2023/`;
      environment.ruleBaseUrl = `http://${this._window.location.hostname}:9999/ruleengine/processRules`;
    }



  }

  reset() {
    this.idle.watch();
    //xthis.idleState = 'Started.';
    this.timedOut = false;
  }

  hideChildModal(): void {
    this.childModal.hide();
  }

  stay() {
    this.childModal.hide();
    this.reset();
  }

  logout() {
    this.childModal.hide();
    this.appService.setUserLoggedIn(false);
    this.router.navigate(['/']);
  }


  // openDialog(): void {
  //   this.dialogRef = this.dialog.open(SetTimeoutpopupComponent, {
  //      data:  `Session timed out!`,
  //   });
  // }


}
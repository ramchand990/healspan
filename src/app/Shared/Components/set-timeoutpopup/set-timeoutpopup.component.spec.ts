import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SetTimeoutpopupComponent } from './set-timeoutpopup.component';

describe('SetTimeoutpopupComponent', () => {
  let component: SetTimeoutpopupComponent;
  let fixture: ComponentFixture<SetTimeoutpopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ SetTimeoutpopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(SetTimeoutpopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

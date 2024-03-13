import { ComponentFixture, TestBed } from '@angular/core/testing';

import { TpaApprovalComponent } from './tpa-approval.component';

describe('TpaApprovalComponent', () => {
  let component: TpaApprovalComponent;
  let fixture: ComponentFixture<TpaApprovalComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ TpaApprovalComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(TpaApprovalComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

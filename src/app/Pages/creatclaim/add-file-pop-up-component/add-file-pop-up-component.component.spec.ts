import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddFilePopUpComponentComponent } from './add-file-pop-up-component.component';

describe('AddFilePopUpComponentComponent', () => {
  let component: AddFilePopUpComponentComponent;
  let fixture: ComponentFixture<AddFilePopUpComponentComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ AddFilePopUpComponentComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(AddFilePopUpComponentComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

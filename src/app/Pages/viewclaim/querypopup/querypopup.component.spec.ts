import { ComponentFixture, TestBed } from '@angular/core/testing';

import { QuerypopupComponent } from './querypopup.component';

describe('QuerypopupComponent', () => {
  let component: QuerypopupComponent;
  let fixture: ComponentFixture<QuerypopupComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ QuerypopupComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(QuerypopupComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

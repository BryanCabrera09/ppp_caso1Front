import { ComponentFixture, TestBed } from '@angular/core/testing';

import { PlanVisitasComponent } from './plan-visitas.component';

describe('PlanVisitasComponent', () => {
  let component: PlanVisitasComponent;
  let fixture: ComponentFixture<PlanVisitasComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ PlanVisitasComponent ]
    })
    .compileComponents();

    fixture = TestBed.createComponent(PlanVisitasComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});

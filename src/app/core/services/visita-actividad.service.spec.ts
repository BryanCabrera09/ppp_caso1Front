import { TestBed } from '@angular/core/testing';

import { VisitaActividadService } from './visita-actividad.service';

describe('VisitaActividadService', () => {
  let service: VisitaActividadService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VisitaActividadService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});

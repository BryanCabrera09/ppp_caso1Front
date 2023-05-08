import { Component, OnInit } from '@angular/core';
import { Practicante } from 'src/app/core/models/practicante';

//PrimeNg Imports
import { Table } from 'primeng/table';
import { SolipracticantesService } from 'src/app/core/services/solipracticantes.service';
import { Router } from '@angular/router';

import Swal from 'sweetalert2';

@Component({
  selector: 'app-aceptacion-solicitudes',
  templateUrl: './aceptacion-solicitudes.component.html',
  styleUrls: ['./aceptacion-solicitudes.component.css']
})
export class AceptacionSolicitudesComponent implements OnInit {

  practicantes: Practicante[] = [];

  practestudiant = new Practicante;

  loading: boolean = true;
  statuses: any[] = [];

  constructor(private solicitudService: SolipracticantesService, private router: Router) { }

  ngOnInit() {
    this.obtenerSolicitudes();
  }

  clear(table: Table) {
    table.clear();
  }

  obtenerSolicitudes() {
    this.solicitudService.getPostulantes().subscribe(
      data => {
        this.practicantes = data.map(
          result => {
            let practicante = new Practicante;
            practicante.cedula = result.cedula;
            practicante.nombre = result.nombre;
            practicante.apellido = result.apellido;
            practicante.ciclo = result.ciclo;
            practicante.id = result.id;
            return practicante;
          }
        );
        this.loading = false;
      }
    );
  }

  guardarPostulacion() {
    this.solicitudService.create(this.practestudiant).subscribe(
      result => {
        console.log(result);
        Swal.fire('Aprobacion', 'Aprobacion Registrada', 'success');
        this.router.navigate(['/dashboard'])
      }
    )
  }
}

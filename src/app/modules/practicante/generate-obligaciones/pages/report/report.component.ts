import { Component, OnInit } from '@angular/core';
import { Practica } from 'src/app/core/models/practica';
import { EstudianteService } from 'src/app/core/services/estudiante.service';
import { PracticaService } from 'src/app/core/services/practica.service';
import { PracticasService } from 'src/app/core/services/practicas.service';

@Component({
  selector: 'app-report',
  templateUrl: './report.component.html',
  styleUrls: ['./report.component.css']
})
export class ReportComponent implements OnInit{
  loading: boolean = true
  estudianteId: number;
  estudiante: any;
  practicas: Practica[]=[];
  usuario: any;
  idUs: number

  ngOnInit(): void {
    this.buscarEstudiante()
  }

  constructor(private estudianteService: EstudianteService, private practicaService: PracticasService){}

  
  buscarEstudiante() {
    // Obtener el estudiante por ID de usuario
    this.usuario = JSON.parse(sessionStorage.getItem('userdetails')!);
    this.idUs = this.usuario.id;
    console.log(this.idUs)

     // Reemplazar con el ID de usuario correspondiente
    this.estudianteService.buscarxEstudainte(this.idUs).subscribe(
      (estudiante) => {
        this.estudiante = estudiante;
        this.estudianteId = estudiante.id;
        this.buscarPracticas();
      },
      (error) => {
        console.error(error);
      }
    );
  }
  buscarPracticas() {
    // Obtener las prácticas del estudiante por su ID
    this.practicaService.buscarxEstudainte(this.estudianteId).subscribe(
      data => {
        console.log(data)
        this.practicas = data.map(
          result=>{
            let practica = new Practica
            practica.id = result.id
            return practica
          }
        )
        
      },
      (error) => {
        console.error(error);
      }
    );
    this.loading = false;
  }


}

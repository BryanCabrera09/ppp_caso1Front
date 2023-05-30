import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { EstudianteService } from 'src/app/core/services/estudiante.service';
import { PracticasService } from 'src/app/core/services/practicas.service';
import { Estudiante } from 'src/app/core/models/estudiante';
import { Practica } from 'src/app/core/models/practica';
import { Usuario } from 'src/app/core/models/usuario';
import { Empresa } from 'src/app/core/models/empresa';
import { ConvocatoriaP } from 'src/app/core/models/convocatoria-p';
import { SemanaActividad } from 'src/app/core/models/semana-actividad';
import { SemanaActividadService } from 'src/app/core/services/semana-actividad.service';
import { Resultado } from 'src/app/core/models/resultado';
interface Activity {
  date: string; // Cambiado a string para facilitar la manipulación
  startTime: string;
  endTime: string;
  description: string;
  totalHours: string;
}
@Component({
  selector: 'app-anexo6-generate',
  templateUrl: './anexo6-generate.component.html',
  styleUrls: ['./anexo6-generate.component.css']
})
export class Anexo6GenerateComponent implements OnInit {

  loading: boolean = true
  estudianteId: number;
  estudiante = new Estudiante;
  practica = new Practica;
  usuario = new Usuario;
  empresa = new Empresa;
  convocatoria = new ConvocatoriaP;
  Sactvidad = new SemanaActividad
  semana: string
  totalHS: number = 0
  idUs: number;
  actividad: any[] = []
  fechaInicio: string;
  fechaFin: string;
  numeroSemana: number;


  displayEU: boolean;


  constructor(private http: HttpClient, private estudianteService: EstudianteService,
    private practicaService: PracticasService, private semanaService: SemanaActividadService) { }
  ngOnInit(): void {
    this.buscarEstudiante()
  }


  buscarEstudiante() {
    // Obtener el estudiante por ID de usuario
    this.usuario = JSON.parse(sessionStorage.getItem('userdetails')!);
    this.idUs = this.usuario.id;
    console.log(this.idUs)

    // Reemplazar con el ID de usuario correspondiente
    this.estudianteService.buscarxUsuario(this.idUs).subscribe(
      (data: Estudiante) => {
        this.estudiante.id = data.id;
        this.buscarPracticas();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  buscarPracticas() {
    // Obtener las prácticas del estudiante por su ID
    this.practicaService.buscarxEstudiante(this.estudiante.id).subscribe(
      (data: Practica) => {
        this.practica = data;
        this.empresa = data.convocatoria.solicitudEmpresa.convenio.empresa;
        this.convocatoria = data.convocatoria;
        this.Sactvidad.practica = data

      },
      (error) => {
        console.error(error);
      }
    );
    this.loading = false;
  }

  calcularSiguientesDia() {


    const fechaInicial = new Date(this.fechaInicio);
    fechaInicial.setDate(fechaInicial.getDate() + 1);

    //this.fecha = fechaSeleccionada.toISOString().substring(0, 10)
    console.log(fechaInicial)
    return fechaInicial
  }







  submitForm() {
    // Calcular el total de horas trabajadas para cada día
    const horaInicioDate = new Date(`1970-01-01T${this.Sactvidad.horaInicio}`);
    const horaFinDate = new Date(`1970-01-01T${this.Sactvidad.horaFin}`);
    const diferenciaMilisegundos = horaFinDate.getTime() - horaInicioDate.getTime();
    const horasTrabajadas = diferenciaMilisegundos / (1000 * 60 * 60);
    this.Sactvidad.totalHoras = Math.abs(horasTrabajadas);


    this.semanaService.create(this.Sactvidad).subscribe();

    const fila = {
      dia: this.Sactvidad.dia,
      horaI: this.Sactvidad.horaInicio,
      horaF: this.Sactvidad.horaFin,
      act: this.Sactvidad.actividad,
      total: this.Sactvidad.totalHoras
    };
    this.actividad.push(fila)

//Calculo de Horas Semanales
    this.totalHS = this.totalHS + fila.total
////////////////////////////////////////////////
    this.borrar()
  
  }

  borrar() {
    this.Sactvidad.dia = null
    this.Sactvidad.horaInicio = null
    this.Sactvidad.horaFin = null
    this.Sactvidad.actividad = ""
  }

}

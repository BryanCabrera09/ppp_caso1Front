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

@Component({
  selector: 'app-anexo6-generate',
  templateUrl: './anexo6-generate.component.html',
  styleUrls: ['./anexo6-generate.component.css']
})
export class Anexo6GenerateComponent implements OnInit{

  loading: boolean = true
  estudianteId: number;
  estudiante = new Estudiante;
  practica = new Practica;
  usuario = new Usuario;
  empresa = new Empresa;
  convocatoria = new ConvocatoriaP;
  Sactvidad= new SemanaActividad
  semana: string

  idUs: number;

  displayEU: boolean;


  constructor(private http: HttpClient, private estudianteService: EstudianteService,
     private practicaService: PracticasService,private semanaService: SemanaActividadService) { }
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


  // En el componente

  
fechaInicio: string;
fechaFin: string;
numeroSemana: number;
diasSemana: string[] = ['Lunes', 'Martes', 'Miércoles', 'Jueves', 'Viernes'];
actividades: any = {
  Lunes: { horaIngreso: '', horaSalida: '', detalleActividad: '' },
  Martes: { horaIngreso: '', horaSalida: '', detalleActividad: '' },
  Miércoles: { horaIngreso: '', horaSalida: '', detalleActividad: '' },
  Jueves: { horaIngreso: '', horaSalida: '', detalleActividad: '' },
  Viernes: { horaIngreso: '', horaSalida: '', detalleActividad: '' }
};

calcularTotalHoras(dia: string): number {
  const horaIngreso = this.actividades[dia].horaIngreso;
  const horaSalida = this.actividades[dia].horaSalida;

  
  this.Sactvidad.horaInicio = this.actividades[dia].horaIngreso;
  this.Sactvidad.horaFin = this.actividades[dia].horaSalida;
  this.Sactvidad.actividad = this.actividades[dia].detalleActividad

  let totalHorasDecimal:number
  // Realiza los cálculos necesarios para obtener el total de horas
  const horaIngresoParts = horaIngreso.split(':');
  const horaSalidaParts = horaSalida.split(':');
  
  const horaIngresoNum = parseInt(horaIngresoParts[0]);
  const minutoIngresoNum = parseInt(horaIngresoParts[1]);
  
  const horaSalidaNum = parseInt(horaSalidaParts[0]);
  const minutoSalidaNum = parseInt(horaSalidaParts[1]);
  
  const totalHoras = horaSalidaNum - horaIngresoNum;
  const totalMinutos = minutoSalidaNum - minutoIngresoNum;
  
  totalHorasDecimal = totalHoras + totalMinutos / 60;


  return totalHorasDecimal;
}

calcularSiguientesDias(): void {
  let siguienteDia: Date;

  const fechaInicial = new Date(this.fechaInicio);
  for (let i = 1; i <= 5; i++) {
   siguienteDia = new Date(fechaInicial);
    siguienteDia.setDate(siguienteDia.getDate() + i);
    //siguienteDia = this.Sactvidad.dia
    console.log(siguienteDia)
    this.Sactvidad.dia = siguienteDia
  }
  
 
}


calcularTotalHorasSemana(): number {
  let totalHoras = 0;

  // Itera sobre los días de la semana y suma los totales de horas
  for (const dia of this.diasSemana) {
    totalHoras += this.calcularTotalHoras(dia);
    
  }
  this.Sactvidad.totalHoras = totalHoras
  return totalHoras;
}
guardar() {
  
  //this.calcularSiguientesDias();
  // console.log(this.Sactvidad.dia)
   
  
   this.semanaService.create(this.Sactvidad).subscribe(
    (response) => {
      // Manejar la respuesta del servidor
      console.log('Datos guardados exitosamente', response);
    },
    (error) => {
      // Manejar el error en caso de que ocurra
      console.error('Error al guardar los datos', error);
    }
   );
}



}

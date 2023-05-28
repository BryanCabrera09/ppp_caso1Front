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
  

  const fechaInicial = new Date(this.fechaInicio);
  fechaInicial.setDate(fechaInicial.getDate() + 1);
  
  //this.fecha = fechaSeleccionada.toISOString().substring(0, 10)
  
 
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
//////////////////////////////////////////////////////////////////////////////////////////////

days: SemanaActividad[] =[];

addDays(fechaInicial) {
  const currentDate = new Date(fechaInicial);
  fechaInicial.setDate(currentDate.getDate() + 1);
    //this.fecha = fechaSeleccionada.toISOString().substring(0, 10)
  fechaInicial = this.Sactvidad.dia

}

private formatDate(date: Date): string {
  const year = date.getFullYear();
  const month = String(date.getMonth() + 1).padStart(2, '0');
  const day = String(date.getDate()).padStart(2, '0');
  return `${year}-${month}-${day}`;
}


submitForm() {
  // Calcular el total de horas trabajadas para cada día
  const horaInicioDate = new Date(`1970-01-01T${this.Sactvidad.horaInicio}`);
  const horaFinDate = new Date(`1970-01-01T${this.Sactvidad.horaFin}`);
  const diferenciaMilisegundos = horaFinDate.getTime() - horaInicioDate.getTime();
  const horasTrabajadas = diferenciaMilisegundos / (1000 * 60 * 60);
  this.Sactvidad.totalHoras = Math.abs(horasTrabajadas);

  // Aquí puedes enviar los datos a tu base de datos
  // Ejemplo de cómo guardar los datos en la consola
  console.log(this.days);

  
  this.semanaService.create(this.Sactvidad).subscribe();

  // Restablece los valores de los campos
 /* this.days.forEach(day => {
    day.startTime = '';
    day.endTime = '';
    day.description = '';
    day.totalHours = '';
  });*/
}

}

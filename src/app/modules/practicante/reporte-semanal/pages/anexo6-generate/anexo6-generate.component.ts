import { Component } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-anexo6-generate',
  templateUrl: './anexo6-generate.component.html',
  styleUrls: ['./anexo6-generate.component.css']
})
export class Anexo6GenerateComponent {
  constructor(private http: HttpClient) { }

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

  // Realiza los cálculos necesarios para obtener el total de horas
  const horaIngresoParts = horaIngreso.split(':');
  const horaSalidaParts = horaSalida.split(':');
  
  const horaIngresoNum = parseInt(horaIngresoParts[0]);
  const minutoIngresoNum = parseInt(horaIngresoParts[1]);
  
  const horaSalidaNum = parseInt(horaSalidaParts[0]);
  const minutoSalidaNum = parseInt(horaSalidaParts[1]);
  
  const totalHoras = horaSalidaNum - horaIngresoNum;
  const totalMinutos = minutoSalidaNum - minutoIngresoNum;
  
  const totalHorasDecimal = totalHoras + totalMinutos / 60;

  return totalHorasDecimal;
}


calcularTotalHorasSemana(): number {
  let totalHoras = 0;

  // Itera sobre los días de la semana y suma los totales de horas
  for (const dia of this.diasSemana) {
    totalHoras += this.calcularTotalHoras(dia);
  }

  return totalHoras;
}
guardar() {
  let datos: any; // Declara la variable 'datos' con el tipo 'any' o el tipo adecuado

  datos = null; // Asigna un valor a 'datos'
  
  this.http.post('https://ejemplo.com/guardar-datos', datos).subscribe(
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

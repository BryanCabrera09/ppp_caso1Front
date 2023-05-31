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
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
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
  currentDate = new Date();
  finDate = new Date()

  displayEU: boolean;
  contador: number = 0
  bandera: boolean = true
  nombre:string
  apellido:string

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
    this.nombre= this.usuario.nombre
    this.apellido = this.usuario.apellido

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
        this.practica.estudiante.nombres = data.estudiante.nombres
        alert(data.estudiante.nombres)
        this.empresa = data.convocatoria.solicitudEmpresa.convenio.empresa;
        this.convocatoria = data.convocatoria;
        this.Sactvidad.practica = data

        this.currentDate = data.inicio
        this.finDate = data.fin
        console.log(this.Sactvidad.practica.inicio)

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
    const minutosTrabajados = diferenciaMilisegundos / (1000 * 60);
    const horasTrabajadas = minutosTrabajados / 60;

    this.Sactvidad.totalHoras = parseFloat(horasTrabajadas.toFixed(2));

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
    ////////////////////////////////////////////////
    this.contador++

    if (this.contador === 5) {
      this.bandera = false
    }
    console.log(this.contador);


  }

  borrar() {
    this.Sactvidad.dia = null
    this.Sactvidad.horaInicio = null
    this.Sactvidad.horaFin = null
    this.Sactvidad.actividad = ""
  }




  // const pdfMake = require('pdfmake');

  async generarPDF() {
    // Cargar las fuentes de pdfMake
    pdfMake.vfs = pdfFonts.pdfMake.vfs;

    // Contenido del PDF
    const content = [
      { text: 'INSTITUTO SUPERIOR UNIVERSITARIO TECNOLÓGICO DEL AZUAY', style: 'header' },
      { text: this.practica.convocatoria.solicitudEmpresa.convenio.carrera.nombre, style: 'subheader' },
      { text: 'ANEXO 6', style: 'subheader' },
      { text: 'Reportes semanales de aprendizaje', style: 'subheader' },
      { text: 'Nombre estudiante: '+this.nombre+' '+this.apellido  },
      { text: 'Carrera: '+ this.practica.convocatoria.solicitudEmpresa.convenio.carrera.nombre },
      { text: 'Periodo Académico: Mayo – Octubre 2022 '+ this.practica.periodo},
      { text: 'Nombre de la empresa formadora: '+ this.practica.convocatoria.solicitudEmpresa.convenio.empresa.nombre },
      { text: 'Fecha inicio y fin de la semana de actividades: '+this.practica.inicio+' - '+this.practica.fin },
      { text: '', style: 'subheader' },
      {
        table: {
          widths: ['*', '*','*','*','*','*'],
          body: [
            ['Semana','Dia','Hora Inicio', 'Hora Fin', 'Actividades', 'Total Horas'],
            [
              'Número de semana\n '+this.numeroSemana,
              this.actividad.map(fila=>[fila.dia]) ,    
              this.actividad.map(fila=>[fila.horaI]) ,
              this.actividad.map(fila=>[fila.horaF]) ,
              this.actividad.map(fila=>[fila.act]) ,
              this.actividad.map(fila=>[fila.total]) ,

            ]
          ]
        }
      },
      { text: '\n' },
      

      {
        table: {
          widths: ['*', '*', '*'],
          body: [

            [' \n\n\n\n\n\n', ' ', ' '],

            [
              'Tutor Específico\nFirma y Sello', 'Estudiante\nFirma', 'Tutor Académico\nFirma y Sello'
            ]
          ],
          style:'table',
          aligment: 'center'
        }
      },




    ];

    // Estilos del documento
    const styles = {
      header: {
        fontSize: 16,
        bold: true,
        margin: [0, 0, 0, 10],
        alignment: 'center'
      },
      subheader: {
        fontSize: 14,
        bold: true,
        margin: [0, 10, 0, 5],
        alignment: 'center'
      },
      table:{
        blod: true
      }
    };

    // Definir el documento PDF
    const docDefinition = {
      content: content,
      styles: styles,
    };

    // Generar el PDF
    pdfMake.createPdf(docDefinition).open();

  }

}

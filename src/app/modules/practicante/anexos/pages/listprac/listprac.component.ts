import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Calificacion } from 'src/app/core/models/calificacion';
import { Estudiante } from 'src/app/core/models/estudiante';
import { Practica } from 'src/app/core/models/practica';
import { SemanaActividad } from 'src/app/core/models/semana-actividad';
import { TutorAcademico } from 'src/app/core/models/tutor-academicoRS';
import { Usuario } from 'src/app/core/models/usuario';
import { EstudianteService } from 'src/app/core/services/estudiante.service';
import { PracticasService } from 'src/app/core/services/practicas.service';
import { SemanaActividadService } from 'src/app/core/services/semana-actividad.service';
import { TutorAcademicoService } from 'src/app/core/services/tutor-academico.service';
import { NgxFileDropEntry, FileSystemFileEntry, FileSystemDirectoryEntry } from 'ngx-file-drop';
import { ToastrService } from 'ngx-toastr';



@Component({
  selector: 'app-listprac',
  templateUrl: './listprac.component.html',
  styleUrls: ['./listprac.component.css']
})
export class ListpracComponent implements OnInit{
  actividades: SemanaActividad[] = []; // Lista de actividades
  imagenesSemana: any[] = [];



  practicantes= new Estudiante;
  tutoraca =new TutorAcademico;

  estudianteId: number;
  estudiante = new Estudiante;
  practica = new Practica;
  usuario = new Usuario;

  calificacion = new Calificacion;

  calificaciones: Calificacion[];

  PracticanteList:Estudiante[]=[];
  Practicas:Practica[]=[];

  id: number;
  
  loading: boolean=true;
  idUs: any;

  constructor(private practicanteServicio :PracticasService,private userl: TutorAcademicoService, private router:Router, private estudianteService: EstudianteService,private toastr: ToastrService, private semanaService: SemanaActividadService){}
  
  ngOnInit() { 
    this.buscarEstudiante();
  }

  editarPractica(id: number, practica: Practica) {
    this.practicanteServicio.editarPractica(id, practica).subscribe(
      (response) => {
        console.log('La práctica ha sido editada con éxito');
        // Realiza las operaciones adicionales necesarias después de editar la práctica
      },
      (error) => {
        console.error('Error al editar la práctica:', error);
      }
    );
  }
  
  semanasValidas: boolean[] = [];
  getActividadesPorSemana() {
    const actividadesPorSemana = [];
    const numDiasPorSemana = 5;
    const totalSemanas = Math.ceil(this.actividades.length / numDiasPorSemana);
  
    
    this.semanasValidas = [];
  
    for (let i = 0; i < totalSemanas; i++) {
      const inicio = i * numDiasPorSemana;
      const fin = inicio + numDiasPorSemana;
      const semanaActividades = this.actividades.slice(inicio, fin);
  
      const semanaValida = this.imagenesSemana[i] !== undefined; 
      this.semanasValidas.push(semanaValida);
  
      actividadesPorSemana.push({
        semana: i + 1,
        actividades: semanaActividades
      });
    }
  
    return actividadesPorSemana;
  }

  public dropped(event: any, semanaIndex: number): void {
    const files = Array.from(event.target.files);
  
    for (const droppedFile of files) {
      if (droppedFile instanceof File) {
        const file = droppedFile as File;
        const reader = new FileReader();
        
        reader.onload = (fileReaderEvent: any) => {
          // Aquí puedes hacer cualquier procesamiento necesario con la imagen
          // Por ejemplo, puedes leer el archivo y guardarlo en la lista temporal
          this.imagenesSemana[semanaIndex] = fileReaderEvent.target.result;
        };
  
        reader.readAsDataURL(file);
      }
    }
  }
  
  
  conclusion: string = '';

  generarPDF() {
    
    if (this.semanasValidas.includes(false)) {
      this.toastr.error('Debes agregar todas las imagenes', 'Datos Incompletos');
      return;
    }
  
    if (!this.conclusion || this.conclusion.trim() === '') {
      this.toastr.error('Debes agregar una conclusión', 'Datos Incompletos');
      return;
    }


    this.practica.concluciones=this.conclusion;
    this.editarPractica(this.practica.id, this.practica);
  }

  obtenerActividades(id: number) {
    this.semanaService.listaractividades(id).subscribe(
      (data: any[]) => {
        this.actividades = data;
      },
      (error) => {
        console.error('Error al obtener las actividades', error);
      }
    );
  }

  async getBase64ImageFromAssets(imagePath: string): Promise<string> {
    const response = await fetch(imagePath);
    const blob = await response.blob();

    return new Promise<string>((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => {
        resolve(reader.result as string);
      };
      reader.onerror = () => {
        reject(reader.error);
      };
      reader.readAsDataURL(blob);
    });
  }




  buscarEstudiante() {
    this.usuario = JSON.parse(sessionStorage.getItem('userdetails')!);
    this.idUs = this.usuario.id;

    this.estudianteService.buscarxUsuario(this.idUs).subscribe(
      (data: Estudiante) => {
        this.estudiante = data;
        this.obtenerActividades(this.estudiante.id);
        this.buscarPracticas();
      },
      (error) => {
        console.error(error);
      }
    );
  }

  buscarPracticas() {
    this.practicanteServicio.buscarxEstudiante(this.estudiante.id).subscribe(
      (data: Practica) => {
        this.practica = data;
        console.log(data);
        this.practica.id = data.id;
        
      },
      (error) => {
        console.error(error);
      }
    );
    this.loading = false;
  }

}
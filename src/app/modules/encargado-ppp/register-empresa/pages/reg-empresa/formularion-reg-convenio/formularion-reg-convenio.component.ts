import { Component, OnInit } from '@angular/core';
import { CarreraMateriaService } from 'src/app/core/services/carrera-materia.service';
import { Carrera } from 'src/app/core/models/carrera';
import { TutorAcademico } from 'src/app/core/models/tutor-academicoRS';
import { TutorAcademicoService } from 'src/app/core/services/tutor-academico.service';
import { Convenio } from 'src/app/core/models/convenio';
import { NgForm } from '@angular/forms';
import { ConvenioService } from 'src/app/core/services/convenio.service';
import Swal from 'sweetalert2';
import { formatDate } from '@angular/common';
import { Empresa } from 'src/app/core/models/empresa';
import { RegEmpresaServiceService } from 'src/app/core/services/reg-empresa-service.service';
import { ActivatedRoute, Router } from '@angular/router';


@Component({
  selector: 'app-formularion-reg-convenio',
  templateUrl: './formularion-reg-convenio.component.html',
  styleUrls: ['./formularion-reg-convenio.component.css']
})
export class FormularionRegConvenioComponent implements OnInit {

  Carreras: Carrera[] = []
  TutorA: TutorAcademico[];
  Tutor: TutorAcademico[];
  ConvenioA: Convenio[];
  carrera: Carrera = new Carrera

  empresa1: Empresa = new Empresa()

  tutor: TutorAcademico = new TutorAcademico
  public convenio: Convenio = new Convenio
  selectedDate: Date;
  fechaI: Date;
  fechaF: Date;

  fechaSumada: Date;
  nombreTuttor: string;
  idtutor: number
  fechaActual: Date = new Date();

  id: number = 0
  usuario: any;
  idUs: number

  ngOnInit(): void {
    this.guardarEmpresa()
    this.guardarTutor()
    this.CapnConvenio()
  }

  constructor(private carreraService: CarreraMateriaService, private TutorAService: TutorAcademicoService, private router: Router,
    private convenioService: ConvenioService, private empresaService: RegEmpresaServiceService, private tutorService: TutorAcademicoService,
    private activatedRoute: ActivatedRoute) {
    this.carreraService.ListarCarrera().subscribe(
      Carr => this.Carreras = Carr
    )

    this.TutorAService.ListarTutor().subscribe(
      dato => { this.TutorA = dato; }
    )

    this.nombreTuttor = ''
    this.idtutor = 0
  }

  CarreraHunter(value: any) {
    this.carreraService.searchCarrera(value).subscribe(
      (data: Carrera) => {
        this.carrera = data
      }
    )
  }



  guardarTutor() {
    this.usuario = JSON.parse(sessionStorage.getItem('userdetails')!);
    this.idUs = this.usuario.id
    this.nombreTuttor = this.usuario.nombre + ' ' + this.usuario.apellido
    console.log(this.nombreTuttor)
    this.tutorService.buscarxusuario(this.idUs).subscribe(
      (data: TutorAcademico) => {
        this.tutor = data
      }

    )

  }
  
  CapnConvenio(){
   /* this.activatedRoute.params.subscribe(params=>{
      let id = params['id']*/
      
        this.convenioService.buscarxEmpresa().subscribe(
          (data:Convenio)=>{
           this.convenio.numero = data.numero + 1
            console.log(data)

          }
        )
      
    
  }

  guardarEmpresa() {

    this.activatedRoute.params.subscribe(params=>{
      let id = params['id']
      if(id){
        this.empresaService.buscarporxID1(id).subscribe(
          (data: Empresa) => {
            this.empresa1 = data
            this.convenio.empresa = this.empresa1
          }
        )
      }

    })

   

   
  }


  GuardarConvenio() {
    this.convenio.carrera = this.carrera
    this.convenio.firmaInst = this.tutor
    this.convenio.fechaInicio = this.fechaI
    this.convenio.fechaFin = this.fechaF
    console.log(this.convenio);
    this.convenioService.guardarConvenio(this.convenio).subscribe(

      (data) => {
        console.log(data);
        this.ngOnInit();
        Swal.fire('Convenio Guardado', 'Convenio Guardado con éxito en el sistema', 'success');
        this.router.navigate(['encargado-practicas/empresa/register-empresa']);
      }, (error) => {
        console.log(error);
        Swal.fire('Error', 'Nose Pudo Guardar el Convenio', 'error');
      }
    );

    localStorage.removeItem('empresa')

  }

  /* sumarUnDia() {

    if (this.fechaI instanceof Date) {
      this.fechaI.setDate(this.fechaI.getDate() + 1);
      alert(this.fechaI)
    }
  } */

  // IMAGEN
  image!: any;
  file: any = '';

  // CAPTURO EL ARCHIVO
  nombre_orignal: string = "";

  cap_nombre_archivo: any;
  selectedFile!: File;

  public imageSelected(event: any) {

    this.selectedFile = event.target.files[0];

    // mostrar imagen seleccionada
    this.image = this.selectedFile;
    const reader = new FileReader();
    reader.readAsDataURL(this.selectedFile);
    reader.onload = () => {
      this.file = reader.result;
    };

    // CAPTURAR EL NAME DE LA IMAGEN
    console.log("Seleciono una imagen: " + event.target.value);
    this.cap_nombre_archivo = event.target.value;
    console.log("Numero de datos del nombre del archivo => " + this.cap_nombre_archivo.length)
    this.nombre_orignal = this.cap_nombre_archivo.slice(12);
    console.log("Nombre imagen original => " + this.nombre_orignal);
    console.log(this.nombre_orignal);

  }

}

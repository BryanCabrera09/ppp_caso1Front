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


@Component({
  selector: 'app-formularion-reg-convenio',
  templateUrl: './formularion-reg-convenio.component.html',
  styleUrls: ['./formularion-reg-convenio.component.css']
})
export class FormularionRegConvenioComponent implements OnInit {

  Carreras: Carrera[] = []
  TutorA: TutorAcademico[];
  ConvenioA: Convenio[];
  carrera: Carrera = new Carrera

 empresa1: Empresa= new Empresa()



  tutor: TutorAcademico = new TutorAcademico
  public Convenio: Convenio = new Convenio
  selectedDate: Date;
  fechaI: Date;
  fechaF: Date = new Date;

  fechaActual: Date = new Date();

  id: number = 0

  ngOnInit(): void {
    this.guardarEmpresa()
  }


  constructor(private carreraService: CarreraMateriaService, private TutorAService: TutorAcademicoService,
    private convenioService: ConvenioService, private empresaService: RegEmpresaServiceService) {
    this.carreraService.ListarCarrera().subscribe(
      Carr => this.Carreras = Carr
    )

    this.TutorAService.ListarTutor().subscribe(
      dato => { this.TutorA = dato; }
    )


  }


  CarreraHunter(value: any) {
    alert(value)
    this.carreraService.searchCarrera(value).subscribe(
      (data: Carrera) => {
        this.carrera = data
      }
    )
  }

  TutorHunter(e: any) {
    alert(e.target.value)
    this.TutorAService.searchTutor(e.target.value).subscribe(
      (data: TutorAcademico) => {
        this.tutor = data
      }
    )
  }

  guardarEmpresa() {
    const empresa = JSON.parse(localStorage.getItem('empresa') + '');
    this.id = parseInt(empresa)


    this.empresaService.buscarporxID1(this.id).subscribe(
      (data: Empresa) => {
        this.empresa1 = data
        this.Convenio.empresa = this.empresa1
      }
    )
  }


  GuardarConvenio() {
    this.Convenio.carrera = this.carrera
    this.Convenio.firmaInst = this.tutor
    this.Convenio.fechaInicio = this.fechaI
    this.Convenio.fechaFin = this.fechaF

    this.convenioService.guardarConvenio(this.Convenio).subscribe(
      (data) => {
        console.log(data);
        this.ngOnInit();
        Swal.fire('Convenio Guardado', 'Convenio Guardado con éxito en el sistema', 'success');

      }, (error) => {
        console.log(error);
        Swal.fire('Error', 'Nose Pudo Guardar el Convenio', 'error');
      }
    );

    localStorage.removeItem('empresa')

  }

  sumarUnDia() {

    if (this.fechaI instanceof Date) {
      this.fechaI.setDate(this.fechaI.getDate() + 1);
      alert(this.fechaI)
    }
  }

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

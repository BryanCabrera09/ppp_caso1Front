import { Component, OnInit} from '@angular/core';
import { Carrera } from 'src/app/core/models/carrera';
import { Materia } from 'src/app/core/models/materia';
import { Objetivomateria } from 'src/app/core/models/objetivo-materia';
import { CarreraMateriaService } from 'src/app/core/services/carrera-materia.service';
import { ObjetivoMateriaService } from 'src/app/core/services/objetivos-materia.service';
import {MateriaService} from 'src/app/core/services/materia.service';
import { NgForm } from '@angular/forms';
import { ReactiveFormsModule } from '@angular/forms';
import Swal from 'sweetalert2';


@Component({
  selector: 'app-reg-objetivos',
  templateUrl: './reg-objetivos.component.html',
  styleUrls: ['./reg-objetivos.component.css'],
})
export class RegObjetivosComponent implements OnInit{
  
  public objetivo:Objetivomateria =new Objetivomateria();
  public materia:Materia= new Materia();
  public carrera:Carrera= new Carrera();
  Objetivomateria: Objetivomateria[]
  Carreras: Carrera[] = []
  MateriasO : Materia[]



  constructor(private objetivomateriaservice:ObjetivoMateriaService,private carreraService: CarreraMateriaService, private materiaService: MateriaService) {
    this.carreraService.ListarCarrera().subscribe(
      Carr => this.Carreras = Carr
    )
  }
  
  ngOnInit() {
    this.objetivomateriaservice.Listarob().subscribe(
      obj=> this.Objetivomateria=obj
      
    )
    
    this.materiaService.Listarmateria().subscribe(
      mat => this.MateriasO=mat
    )

    
  }
  
  displayStyle = "none";
  displayStyle2 = "none";
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
  openPopups() {
    this.displayStyle2 = "block";
  }
  closePopups() {
    this.displayStyle2 = "none";
  }


  Carreracon(e: any) {
    this.carreraService.searchCarrera(e.target.value).subscribe(
      (data: Carrera) => {
        this.carrera= data
        
        
      }
    )
  }

  Materiacon(e: any){
    this.materiaService.buscarMateria(e.target.value).subscribe(
      (data: Materia) => {
        this.materia= data
      }
    )
  }

  GuardarAsignatura(asignatura: any) {
    
    this.materia.carrera = this.carrera
    this.materiaService.guardarcar(this.materia).subscribe(
      (data)=>{
        console.log(data);
        this.ngOnInit();
        Swal.fire('Asignatura Guardado', 'Asignatura Guardado con exito en el sistema','success');

      },(error)=>{
        console.log(error);
        Swal.fire('Error','Nose Guardo la Asignatura', 'error');
      }
    );
    localStorage.removeItem('asignatura')
    this.closePopups();

  }

  GuardarObjeto(objetivo: any, prueba:string) {
    objetivo.descripcion = prueba;
    this.objetivo.materia = this.materia
    this.objetivomateriaservice.Guardarobj(this.objetivo).subscribe(
      (data)=>{
        console.log(data);
        this.ngOnInit();
        Swal.fire('Objetivo Guardado','Objetivo Guardado con Exito','success');

      },(error)=>{
        console.log(error);
        Swal.fire('Error','Objetivo no se Pudo Guardar','error');
      }
    );
      localStorage.removeItem('objetivo');
      this.closePopup();
  }

}

import { Component, OnInit} from '@angular/core';
import { Carrera } from 'src/app/core/models/carrera';
import { Materia } from 'src/app/core/models/materia';
import { Objetivomateria } from 'src/app/core/models/objetivo-materia';
import { CarreraMateriaService } from 'src/app/core/services/carrera-materia.service';
import { ObjetivoMateriaService } from 'src/app/core/services/objetivos-materia.service';
import {MateriaService} from 'src/app/core/services/materia.service';


@Component({
  selector: 'app-reg-objetivos',
  templateUrl: './reg-objetivos.component.html',
  styleUrls: ['./reg-objetivos.component.css'],
})
export class RegObjetivosComponent implements OnInit{
  
  objetivo:Objetivomateria =new Objetivomateria;
  materia:Materia= new Materia;
  carrera:Carrera= new Carrera;
  Objetivomateria: Objetivomateria[]
  Carreras: Carrera[] = []
  MateriasO : Materia[]
  public Materia: Materia=new Materia



  constructor(private objetivomateriaservice:ObjetivoMateriaService,private carreraService: CarreraMateriaService, private materiaService: MateriaService) {
    this.carreraService.ListarCarrera().subscribe(
      Carr => this.Carreras = Carr
    )
  }
  
  ngOnInit() {
    this.objetivomateriaservice.Listarob().subscribe(
      (obj)=> {this.Objetivomateria=obj
      console.log(obj)}
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

 /* GuardarAsignatura(reg: NgForm){
    this.Materia.nombre=this.nombres

  }*/

}


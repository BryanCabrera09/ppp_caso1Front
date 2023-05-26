import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Estudiante } from 'src/app/core/models/estudiante';
import { Practica } from 'src/app/core/models/practica';
import { PracticasService } from 'src/app/core/services/practicas.service';

@Component({
  selector: 'app-lispract',
  templateUrl: './lispract.component.html',
  styleUrls: ['./lispract.component.css']
})
export class LispractComponent implements OnInit {

  practicantes= new Estudiante;

  PracticanteList:Estudiante[]=[];
  Practicas:Practica[]=[];

  id: number;
  loading: boolean=true;

  constructor(private practicanteServicio :PracticasService, private router:Router){}
  
  ngOnInit() {
    this.practicanteServicio.obtenerPractica().subscribe(
      data =>{
        this.Practicas = data;
      }
      );
    this.loading = false;
  }

  traerid(id : any) {
    this.id = id
    this.router.navigate(['anexos/listapract/' + this.id]);
  }

}

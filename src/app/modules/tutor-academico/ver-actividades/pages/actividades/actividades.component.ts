import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { SemanaActividad } from 'src/app/core/models/semana-actividad';
import { SemanaActividadService } from 'src/app/core/services/semana-actividad.service';

@Component({
  selector: 'app-actividades',
  templateUrl: './actividades.component.html',
  styleUrls: ['./actividades.component.css']
})
export class ActividadesComponent implements OnInit{

  actividades: SemanaActividad[] = []
  
  ngOnInit(): void {
    this.traeract();
  }

  constructor(private semanaService: SemanaActividadService, private activatedRoute: ActivatedRoute, private router: Router){}


    traeract(){
      this.activatedRoute.params.subscribe(params=>{
        let id = params['id']
      if (id) {
        this.semanaService.listaractividades(id).subscribe(
          (response)=>{
            this.actividades = response
          }
        )
      }
      })
    }
}

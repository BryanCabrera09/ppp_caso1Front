import { Component, OnInit } from '@angular/core';
import { ConvocatoriaService } from 'src/app/core/services/convocatoria.service';

@Component({
  selector: 'app-convocatorias',
  templateUrl: './convocatorias.component.html',
  styleUrls: ['./convocatorias.component.css']
})
export class ConvocatoriasComponent implements OnInit{

  convocatorias: any[];

  constructor(private convocatoriaService: ConvocatoriaService) {}

  ngOnInit(): void {
    this.convocatoriaService.listarConvocatorias()
      .subscribe(data => {
        this.convocatorias = data.body;
        console.log(this.convocatorias);
      });
  }

}

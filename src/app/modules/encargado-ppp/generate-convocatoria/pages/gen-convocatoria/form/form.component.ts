import { Component, OnInit } from '@angular/core';

import { RegEmpresaServiceService } from 'src/app/core/services/reg-empresa-service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  ngOnInit(): void {}
  
  constructor(){}

}

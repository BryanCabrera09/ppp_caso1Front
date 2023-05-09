import { Component, OnInit } from '@angular/core';
import { empresa } from 'src/app/modules/encargado-ppp/register-empresa/empresa';
import { RegEmpresaServiceService } from 'src/app/modules/encargado-ppp/register-empresa/reg-empresa-service.service';

@Component({
  selector: 'app-form',
  templateUrl: './form.component.html',
  styleUrls: ['./form.component.css']
})
export class FormComponent implements OnInit{
  ngOnInit(): void {}
  
  constructor(){}

}

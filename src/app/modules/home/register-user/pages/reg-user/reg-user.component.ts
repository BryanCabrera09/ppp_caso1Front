import { Component, OnInit } from '@angular/core';
import { Register } from 'src/app/core/models/register';

@Component({
  selector: 'app-reg-user',
  templateUrl: './reg-user.component.html',
  styleUrls: ['./reg-user.component.css']
})
export class RegUserComponent implements OnInit {

  registro = new Register();

  ngOnInit(): void { }

}

import { Component } from '@angular/core';
import { Practicante } from 'src/app/core/models/practicante';

@Component({
  selector: 'app-lispract',
  templateUrl: './lispract.component.html',
  styleUrls: ['./lispract.component.css']
})
export class LispractComponent {

  public practicantes: Practicante = new Practicante();
  PracticanteList:Practicante[];
  


}

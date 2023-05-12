import { Component, OnInit} from '@angular/core';


@Component({
  selector: 'app-reg-objetivos',
  templateUrl: './reg-objetivos.component.html',
  styleUrls: ['./reg-objetivos.component.css'],
})
export class RegObjetivosComponent implements OnInit{
  constructor() {}
  
  ngOnInit() {}
  
  displayStyle = "none";
  
  openPopup() {
    this.displayStyle = "block";
  }
  closePopup() {
    this.displayStyle = "none";
  }
}


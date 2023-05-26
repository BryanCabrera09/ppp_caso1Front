import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Convenio } from 'src/app/core/models/convenio';
import { Empresa } from 'src/app/core/models/empresa';
import { SolicitudEmpresa } from 'src/app/core/models/solicitud-empresa';
import { ConvenioService } from 'src/app/core/services/convenio.service';
import { RegEmpresaServiceService } from 'src/app/core/services/reg-empresa-service.service';
import { SoliEmpresaService } from 'src/app/core/services/soli-empresa.service';
import { SolicitudEmpresaService } from 'src/app/core/services/solicitud-empresa.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-soli-est',
  templateUrl: './soli-est.component.html',
  styleUrls: ['./soli-est.component.css']
})
export class SoliEstComponent implements OnInit {
  public convenio:Convenio = new Convenio();
  public soliempresa:SolicitudEmpresa = new SolicitudEmpresa();
  public empresas:Empresa = new Empresa();
  SolicitudA :SolicitudEmpresa[];
  selectedDate: Date;
  fechaI:Date;
  fechaF: Date=  new Date;
  id :number = 0


  constructor( private solicitudEmService:SoliEmpresaService, private empservicio:RegEmpresaServiceService,
    private convenioService:ConvenioService){

  }

  ngOnInit() {
   this.guardaremp()
  }

  guardaremp(){
    const convenio = JSON.parse(localStorage.getItem('IdCon') + '');
    this.id = parseInt(convenio)

    this.convenioService.Buscarcon(this.id).subscribe(
      (data: Convenio) => {
        this.convenio= data
        this.soliempresa.convenio = this.convenio

        
      }
    )
  }



  Guardarsoli(reg:NgForm){
    this.soliempresa.fechaInicioTen = this.fechaI
    this.soliempresa.fechaMaxTen = this.fechaF
    this.soliempresa.estado = 1
    
    this.solicitudEmService.guardarsolicitud(this.soliempresa).subscribe(
      (data) => {
        console.log(data);
        const soliid=data.id
        console.log(soliid)
        this.ngOnInit();
        Swal.fire('Solicitud guardado','Solicitud Guadado con exito','success');
      },(error) =>{
        console.log(error);
        Swal.fire('Error', 'Solicitud no se pudo Guardar','error');
      }
    )
  };
  
}

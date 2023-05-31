import { Component, OnInit } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, ValidationErrors, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import * as pdfMake from 'pdfmake/build/pdfmake';
import * as pdfFonts from 'pdfmake/build/vfs_fonts';
import { Resultado } from 'src/app/core/models/resultado';
import { ActividadpService } from 'src/app/core/services/actividadp.service';
import { PracticasService } from 'src/app/core/services/practicas.service';
import { ResultadoCarreraService } from 'src/app/core/services/resultado-carrera.service';
import { ResultadoService } from 'src/app/core/services/resultado.service';
import Swal from 'sweetalert2';

(pdfMake as any).vfs = pdfFonts.pdfMake.vfs;

@Component({
  selector: 'app-generar-plan',
  templateUrl: './generar-plan.component.html',
  styleUrls: ['./generar-plan.component.css']
})
export class GenerarPlanComponent implements OnInit {

  columnas: number;
  semanas: number[] = [];
  mostrarTabla: boolean = false;
  horas: number;

  cargarSemanas(numero: number) {
    this.semanas = []; // Restablecer el arreglo semanas
    if (numero === 6 || numero === 12) {
      for (let i = 1; i <= numero; i++) {
        this.semanas.push(i);
      }
      this.columnas = numero;
    }
  }

  practica: any;
  resultadosCarrera: any[];
  resultados: Resultado[] = [];
  actividades: any[];


  constructor(private route: ActivatedRoute, private pracServ: PracticasService,
    private resCarServ: ResultadoCarreraService, private atcServ: ActividadpService,
    private resServ: ResultadoService, private fb: FormBuilder,
    private router: Router) { }

  ngOnInit() {
    this.route.queryParams.subscribe(params => {
      this.practica = JSON.parse(params['practica']);
      this.startForm();
      console.log(this.practica);
      this.listarResultados(this.practica.estudiante.carrera.id);
      this.listarActividades(this.practica.convocatoria.solicitudEmpresa.id)
    });
  }

  listarResultados(id: number) {
    this.resCarServ.listarPorCarreraId(id).subscribe(
      (res) => {
        this.resultadosCarrera = res;
      }
    )
  }

  listarActividades(id: number) {
    this.atcServ.obtenerActividadid(id).subscribe(
      (res) => {
        this.actividades = res;
        this.formResultado = this.fb.group({});
        this.startFormR();
        for (let i = 0; i <= this.actividades.length; i++) {
          this.formResultado.get('horas_' + i)?.valueChanges.subscribe(() => {
            this.sumarHoras();
            console.log(this.formResultado.get('horas_' + i).value)
          });
        }
      }
    )
  }

  crearResultado(value, id) {
    let resultado = new Resultado();
    let resCarrera: any = {};
    resCarrera.id = value;
    let activity: any = {};
    activity.id = id;
    resultado.id = 0;
    resultado.actividad = activity;
    resultado.resultadoMateria = resCarrera;
    resultado.practica = this.practica;
    this.resultados.push(resultado);
    console.log(this.resultados);
  }

  editarPractica() {
    console.log(this.practica)
    this.pracServ.editarPractica(this.practica.id, this.practica).subscribe(
      (res) => {
        this.gueardarResultados();
      }
    )
  }

  gueardarResultados() {
    this.resServ.crearMuchos(this.resultados).subscribe(
      (res) => {
        console.log(res)
        Swal.fire({
          position: 'center',
          icon: 'success',
          title: 'Plan de aprendizaje generado con exito',
          showConfirmButton: false,
          timer: 1500
        })
        this.router.navigate(['../tutor-academico/plan-aprendizaje/practica-tutor']);
      }
    )
  }

  formPractica?: FormGroup;

  startForm() {
    this.formPractica = this.fb.group({
      numeroSemanas: ['', [Validators.required, validarNumeroSemanas]],
      periodo: ['', Validators.required],
      inicio: ['', Validators.required],
      fin: ['', Validators.required],
      descripcion: ['', Validators.required],
      departamento: ['', Validators.required]
    });
  }

  siguientePractica(): boolean {
    if (this.formPractica.invalid) {
      this.markAllFieldsAsTouchedPractica();
      return false;
    }
    this.currentStep++;
    return true;
  }

  siguienteResultados(): boolean {
    if (this.formResultado.invalid) {
      this.markAllFieldsAsTouchedResultado();
      return false;
    }
    this.cargarSemanas(this.formPractica.get('numeroSemanas')?.value);
    // this.currentStep++;
    this.editarPractica();
    return true;
  }

  markAllFieldsAsTouchedPractica() {
    Object.values(this.formPractica.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  markAllFieldsAsTouchedResultado() {
    Object.values(this.formResultado.controls).forEach(control => {
      control.markAsTouched();
    });
  }

  // Dentro de tu clase de componente
  isInvalidFormP(controlName: string): boolean {
    const control = this.formPractica.get(controlName);
    return control?.invalid && control?.touched;
  }

  isInvalidFormR(controlName: string): boolean {
    const control = this.formResultado.get(controlName);
    return control?.invalid && control?.touched;
  }

  isInvalidSuma(): boolean {
   return this.sumarHoras === this.practica.convocatoria.solicitudEmpresa.numHoras ? false : true; 
  }

  currentStep: number = 1;

  anterior() {
    if (this.currentStep > 1) {
      this.currentStep--;
    }
  }

  formResultado?: FormGroup;
  totalHoras: number = 0;

  sumarHoras() {
    let sum = 0;
    for (let i = 0; i <= this.actividades.length; i++) {
      const horas = this.formResultado.get('horas_' + i)?.value;
      sum += horas ? parseInt(horas) : 0;
    }
    this.totalHoras = sum;
  }

  startFormR() {
    this.actividades.forEach((actividad, index) => {
      this.formResultado.addControl(`horas_${index}`, this.fb.control('', Validators.required));
    });
  }

  

}

function validarNumeroSemanas(control: AbstractControl): ValidationErrors | null {
  const valor = control.value;
  if (valor !== 6 && valor !== 12) {
    return { invalidNumeroSemanas: true };
  }
  return null;
}

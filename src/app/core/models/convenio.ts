import { Carrera } from "./carrera"
import { Empresa } from "./empresa"
import { TutorAcademico } from "./tutor-academicoRS"

export class Convenio {
    id?:number;
    numero?: string;;
    fechaInicio?: Date;
    fechaFin?: Date;
    
    empresa?:Empresa;
    carrera?: Carrera;
    firmaInst?: TutorAcademico;
}

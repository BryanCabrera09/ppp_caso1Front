import { Convocatoria } from "./convocatoria";
import { Estudiante } from "./estudiante";
import { TutorAcademico } from "./tutor-academicoRS";
import { TutorEmpresarial } from "./tutor-empresarial";

export class Practica{
    id?: number;
    periodo?:string;
    nSemanas?:number;
    inicio?:Date;
    fin?:Date;
    concluciones?:string;
    departamento?:string;

    convocatoria?: Convocatoria;
    estudiante?: Estudiante;
    tutorAcademico?: TutorAcademico;
    tutorEmpresarial?:TutorEmpresarial
}
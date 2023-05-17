import { ConvocatoriaP } from "./convocatoria-p";
import { Estudiante } from "./estudiante";
import { TutorAcademico } from "./tutor-academicoRS";
import { TutorEmpresarial } from "./tutor-empresarial";

export class Practica {
    id?: number;
    periodo?: string;
    nsemanas?: number;
    inicio?: Date;
    fin?: Date;
    concluciones?: string;
    departamento?: string;

    convocatoria?: ConvocatoriaP;
    estudiante?: Estudiante;
    tutorAcademico?: TutorAcademico;
    tutorEmpresarial?: TutorEmpresarial
}
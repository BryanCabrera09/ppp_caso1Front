import { Convenio } from "./convenio";
import { ConvocatoriaP } from "./convocatoria-p";
import { Estudiante } from "./estudiante";

export class SoliEstudiante {

    id: number
    estado: number;
    fechaEnvio: Date;

    estudiante:Estudiante
    convocatoria : ConvocatoriaP

}

import { Convocatoria } from "./convocatoria";
import { UserFenix } from "./user-fenix";
import { Usuario } from "./usuario";

export class Practicante {

    id?: number;
    cedula?: string;
    nombre?: string;
    apellido?: string;
    ciclo?: string;
    correo?: string;
    estado?: number;
    fechaEnvio?: Date;
    idConvocatoria?: number;
    usuario?: Usuario;
    estudiante?: UserFenix;
    convocatoria?: Convocatoria;
}

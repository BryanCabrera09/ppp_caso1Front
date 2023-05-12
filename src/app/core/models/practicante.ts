import { Convocatoria } from "./convocatoria";
import { Estudiante } from "./estudiante";
import { Usuario } from "./usuario";

export class Practicante {

    id?: number;
    cedula: string;
    nombre: string;
    apellido: string;
    ciclo: string;
    correo: string;
    estado: number;
    fechaEnvio: Date;
    idConvocatoria: number;
    usuario: Usuario;
    estudiante: Estudiante;
    convocatoria: Convocatoria;

}

import { Carrera } from "./carrera";
import { Usuario } from "./usuario";

export class UserFenix {

    id: number;
    nombres: string = "";
    apellidos: string = "";
    cedula: string = "";
    titulo: string = "";
    telefono: string = "";
    correo: string = "";
    estado?: boolean
    ciclo: string = '';
    tipo: string = '';
    alumno_docenteId: number;
    periodo: string = '';
    horasCumplidas: number;
    prioridad: boolean;
    idEstudiante: number;
    carrera: Carrera;
    usuario: Usuario;
}


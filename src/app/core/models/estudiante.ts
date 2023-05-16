import { Carrera } from "./carrera";
import { Usuario } from "./usuario";

export class Estudiante {

    id: number;
    nombres: string;
    apellidos: string;
    titulo: string;
    telefono: string;
    correo: string;
    ciclo: string;
    tipo: string;
    alumno_docenteId: number;
    periodo: string;
    horasCumplidas: number;
    prioridad: boolean;
    idEstudiante: number;
    carrera: Carrera;
    usuario: Usuario;
    
    
}


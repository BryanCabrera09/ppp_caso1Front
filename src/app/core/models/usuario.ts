import { UserFenix } from "./user-fenix";

export class Usuario {

    id: number;
    nombre: string = "";
    apellido: string = "";
    cedula: string = "";
    titulo: string = "";
    telefono: string = "";
    correo: string = "";
    password: string = "";
    activo: boolean;
    id_estudiante: number;
    ciclo: string = '';
    tipo: string = '';
    carrera: number;
    alumno_docenteId: number;
    periodo: string = '';
    horasCumplidas: number;
}
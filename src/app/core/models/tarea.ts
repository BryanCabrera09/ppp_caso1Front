import { Actividad } from "./actividad";
import { Materia } from "./materia";
import { Resultado } from "./resultado";

export class Tarea{
    id?: number;
    descripcion?:string;

    actividad?: Actividad;
    materia?: Materia
    resultado?: Resultado;
}
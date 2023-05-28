import { Actividad } from "./actividad";
import { Practica } from "./practica";
import { ResultadoMateria } from "./resultado-materia";

export class Resultado{

    id?: number;
    
    practica?: Practica;
    resultadoMateria?: ResultadoMateria;
    actividad?: Actividad;

}
import { Practica } from "./practica";

export class SemanaActividad{
    id?: number;
    dia?: Date;
    horaInicio?: Date;
    horaFin?: Date;
    totalHoras?: number;
    actividad?:string;

    practica?: Practica;
}
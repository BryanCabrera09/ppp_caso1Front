import { Practica } from "./practica";

export class Calificacion{
    id?:number;
    tutor?: number;
    a?: number;
    b?: number;
    c?:number;
    d?:number;
    e?:number;
    total?:number;

    practica?:Practica;
}
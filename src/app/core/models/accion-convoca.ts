import { accion } from "./accion";
import { Convocatoria } from "./convocatoria";

export class AccionConvoca{
    id?: number;
    respuesta?: string;
    
    accion?: accion;
    convocatoria?: Convocatoria;
}
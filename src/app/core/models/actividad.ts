import { Materia } from "./materia"
import { SolicitudEmpresa } from "./solicitud-empresa"

export class Actividad {

    id?: number
    descripcion?: string

    solicitudEmpresa?: SolicitudEmpresa
    materia?: Materia

}

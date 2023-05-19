import { Actividad } from "./actividad"
import { Convenio } from "./convenio"

export class SolicitudEmpresa {

    id?: number
    numPracticantes?: string
    numHoras?: string
    fechaInicioTen?: string
    estado?: boolean
    fechaMaxTen?: string

    convenio: Convenio
    actividad: Actividad

}

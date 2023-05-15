import { Actividad } from "./actividad"
import { Convenio } from "./convenio"

export class SolicitudEmpresa {

    id?: string
    numPracticante?: string
    numHoras?: string
    fechaInicioTen?: string
    estado?: boolean

    convenio: Convenio
    actividad: Actividad

}

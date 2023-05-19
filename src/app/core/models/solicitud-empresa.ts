import { Actividad } from "./actividad"
import { Convenio } from "./convenio"

export class SolicitudEmpresa {

    id?: number
    numPracticantes?: number
    numHoras?: string
    fechaInicioTen?: string
  
    fechaMaxTen?: string

    estado?:number



    convenio: Convenio
    actividad: Actividad

}

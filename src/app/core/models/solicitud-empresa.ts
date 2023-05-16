import { Convenio } from "./convenio"

export class SolicitudEmpresa {

    id?: string
    numPracticantes?: string
    numHoras?: string
    fechaInicioTen?: string
    fechaMaxTen?: string
    estado?:boolean

    convenio:Convenio

}

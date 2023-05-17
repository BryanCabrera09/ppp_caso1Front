import { Convenio } from "./convenio"

export class SolicitudEmpresa {

    id?: string
    numPracticantes?: string
    numHoras?: string
    fechaInicioTen?: string
    fechaMaxTen?: string
    estado?:number

    convenio:Convenio

}

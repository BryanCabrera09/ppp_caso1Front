import { Convenio } from "./convenio"

export class SolicitudEmpresa {

    id?: string
    numPracticantes?: string
    numHoras?: string
    fechaInicioTen?: Date
    fechaMaxTen?: Date
    estado?:number

    convenio:Convenio

}

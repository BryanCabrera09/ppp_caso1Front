import { Empresa } from "./empresa"

export class Convenio {
    id?:number
    numero?: string
    fechaInicio?: Date
    fechaFin?: Date
    
    empresa:Empresa
}

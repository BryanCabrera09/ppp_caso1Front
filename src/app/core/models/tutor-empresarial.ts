import { Empresa } from "./empresa";
import { Usuario } from "./usuario";

export class TutorEmpresarial{
    id?: number;
    cargo?: string;

    empresa?: Empresa;
    usuario?: Usuario;
}
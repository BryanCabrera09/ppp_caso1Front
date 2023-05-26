import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListarUsuariosRolesComponent } from './pages/listar-usuarios-roles/listar-usuarios-roles.component';

const routes: Routes = [
  {
    path: 'list-users',
    component: ListarUsuariosRolesComponent
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ListUsersRoutingModule { }

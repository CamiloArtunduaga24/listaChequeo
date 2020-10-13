import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListaComponent } from './pages/lista/lista.component';
import { ListasComponent } from './pages/listas/listas.component';


const routes : Routes = [
 { path: 'listas', component: ListasComponent },
 { path: 'lista/:id', component: ListaComponent },
 { path: '**', pathMatch: 'full', redirectTo: 'listas' }
];
  


@NgModule({
  imports: [ 
    RouterModule.forRoot( routes )
  ],
  exports: [
    RouterModule
  ]
})
export class AppRoutingModule { }

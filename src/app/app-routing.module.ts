import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';


/**
 * modulo de rutas padre donde se despliegan rutas de diferentes componentes los cuales son usados en la app aca es donde ocurre la magia de direcciones y rutas
 * es recomendable poner en este lugar solo los componentes que son padre y de estos se encarguen de rutas a componentes hijos
 */
const routes: Routes = [
    { path: '', loadChildren: () => import('./components/inicio/inicio.module').then(m => m.InicioModule)},
    { path: 'inicio', loadChildren: () => import('./components/inicio/inicio.module').then(m => m.InicioModule) },
    { path: 'head', loadChildren: () => import('./components/head/head.module').then(m => m.HeadModule)},
    { path: 'galeria', loadChildren: () => import('./components/galeria/galeria.module').then(m => m.GaleriaModule)},
    { path: 'tarea', loadChildren: () => import('./components/tarea/tarea.module').then(m => m.TareaModule)},
    { path: 'list-tarea', loadChildren: () => import('./components/tarea/list-tareas/list-tareas.module').then(m => m.ListTareasModule)},

    { path: '**', redirectTo: 'inicio' }
];

@NgModule({

    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
})
export class AppRoutingModule {}
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ItemComponent } from './item/item.component';
import { VideojuegoComponent } from './videojuego/videojuego.component';

const routes: Routes = [
  { path: 'items', component: ItemComponent },
  { path: 'videojuegos', component: VideojuegoComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

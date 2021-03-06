import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SportsComponent } from './sports.component';

const routes: Routes = [
  {
    path: '',
    component: SportsComponent,
    data: {
      title: 'Sports'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SportsRoutingModule {}

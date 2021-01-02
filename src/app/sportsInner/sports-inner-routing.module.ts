import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

import { SportsInnerComponent } from './sports-inner.component';

const routes: Routes = [
  {
    path: '',
    component: SportsInnerComponent,
    data: {
      title: 'Sports'
    }
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SportsInnerRoutingModule {}

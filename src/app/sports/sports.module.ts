import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SportsRoutingModule } from './sports-routing.module';
import { SportsComponent } from './sports.component';

@NgModule({
  imports: [
    FormsModule,SportsRoutingModule,
  ],
  declarations: [ SportsComponent ]
})
export class SportsModule { }

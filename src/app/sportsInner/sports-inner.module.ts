import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ModalModule } from 'ngx-bootstrap/modal';
import { ModalContentComponent } from '../modal/modal-popup';
import { SportsInnerRoutingModule } from './sports-inner-routing.module';
import { SportsInnerComponent } from './sports-inner.component';

@NgModule({
  imports: [
    FormsModule,SportsInnerRoutingModule ,CommonModule,
    ModalModule.forRoot()  ],
    // entryComponents: [ModalContentComponent],
  declarations: [ SportsInnerComponent,  ModalContentComponent],
  entryComponents: [ModalContentComponent],
})
export class SportsInnerModule { }

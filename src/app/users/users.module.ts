import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { UsersRoutingModule } from './users-routing.module';
import { UsersComponent } from './users.component';
import { UsercreateComponent } from '@app/modal/usercreate/usercreate.component';
import { PaginationComponent } from '@app/pagination/pagination.component';
import {DataTablesModule} from 'angular-datatables';
import { WdcAmountComponent } from '../modal/wdc-amount/wdc-amount.component';

@NgModule({
  declarations: [UsersComponent,UsercreateComponent,PaginationComponent, WdcAmountComponent],
  imports: [
    CommonModule,
    UsersRoutingModule,
    ReactiveFormsModule,
    DataTablesModule,
  ]
})
export class UsersModule { }

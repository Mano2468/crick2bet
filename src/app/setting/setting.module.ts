import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SettingRoutingModule } from './setting-routing.module';
import { MessageSettingComponent } from './message-setting/message-setting.component';
import { FormsModule } from '@angular/forms';
import { MatchSettingComponent } from './match-setting/match-setting.component';
import { ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [MessageSettingComponent,MatchSettingComponent],
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    SettingRoutingModule,
   
    
  ]
})
export class SettingModule { }

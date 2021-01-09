import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { MatchSettingComponent } from './match-setting/match-setting.component';
import { MessageSettingComponent } from './message-setting/message-setting.component';


const routes: Routes = [
  {
    path: '',
    data: {
      title: 'Setting'
    },
    children: [
      {
        path: '',
        redirectTo: 'message_setting'
      },
      {
        path: 'message_setting',
        component: MessageSettingComponent,
        data: {
          title: 'Message Setting'
        }
      },
      {
        path: 'match_setting',
        component: MatchSettingComponent,
        data: {
          title: 'Match Setting'
        }
      },
    ],
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class SettingRoutingModule { }

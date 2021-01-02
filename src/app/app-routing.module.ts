import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { DefaultLayoutComponent } from './containers';
import { SportsInnerModule } from './sportsInner/sports-inner.module';
import { UsersModule } from './users/users.module';
import { P404Component } from './views/error/404.component';
import { P500Component } from './views/error/500.component';
import { LoginComponent } from './views/login/login.component';
import { RegisterComponent } from './views/register/register.component';
import { AuthGuard } from './_helpers/auth.guard';
import { Role } from './_models';


const routes: Routes = [
  //   {
  //   path: '',
  //   redirectTo: 'login',
  //   pathMatch: 'full',
  // },
  {
    path: '404',
    component: P404Component,
    data: {
      title: 'Page 404'
    }
  },
  {
    path: '500',
    component: P500Component,
    data: {
      title: 'Page 500'
    }
  },
  {
    path: 'login',
    component: LoginComponent,
    data: {
      title: 'Login Page'
    }
  },
  {
    path: 'register',
    component: RegisterComponent,
    data: {
      title: 'Register Page'
    }
  },
  {
    path: '',
    component: DefaultLayoutComponent,
    data: {
      title: 'Home'
    },
    children: [
      {
        path: 'dashboard',
        loadChildren: () => import('./views/dashboard/dashboard.module').then(m => m.DashboardModule),
        canActivate: [AuthGuard]
      },
      {
        path: 'sports',
        loadChildren: () => import('./sports/sports.module').then(m => m.SportsModule),
        canActivate: [AuthGuard],
      },
      {
        path: "sports-inner",
        loadChildren: () => import('./sportsInner/sports-inner.module').then(m => SportsInnerModule)
      },
      {
        path: "users",
        loadChildren: () => import('./users/users.module').then(m => UsersModule),
        canActivate: [AuthGuard],
        data: { roles: [Role.Admin,Role.Master,Role.SuperAdmin,Role.Dealer] }
      }
      , {
        path: "",
        redirectTo: 'dashboard',
        pathMatch: 'full',
      }
    ]
  },
  { path: '**', component: P404Component }];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }

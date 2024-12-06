import {Routes} from '@angular/router';
import {AdminHomeComponent} from './views/admin/admin-home/admin-home.component';
import {LoginFormComponent} from './components/login-form/login-form.component';
import {LandingComponent} from './views/normal/landing/landing.component';
import {AuthGuard} from './shared/guards/auth/auth.guard';
import {EventPageComponent} from './components/events/event-page/event-page.component';
import {BetPageComponent} from './components/bets/bet-page/bet-page.component';
import {UserBetsPageComponent} from './components/mybets/user-bets-page/user-bets-page.component';
import {UserRoles} from './shared/emuns/endpoints.enum';
import {UserAdminComponent} from './views/admin/users/user-admin/user-admin.component';
import {EventAdminComponent} from './views/admin/events/event-admin/event-admin.component';

export const routes: Routes = [
  {
    path: '',
    component: LandingComponent
  },
  {
    path: 'admin',
    component: AdminHomeComponent,
    canActivate: [AuthGuard],
    data: {roles: [UserRoles.ADMIN]}
  },
  {
    path: 'admin/users',
    component: UserAdminComponent,
    canActivate: [AuthGuard],
    data: {roles: [UserRoles.ADMIN]}
  },
  {
    path: 'admin/events',
    component: EventAdminComponent,
    canActivate: [AuthGuard],
    data: {roles: [UserRoles.ADMIN]}
  },
  {
    path: 'login',
    component: LoginFormComponent
  },
  {
    path: 'home',
    component: LandingComponent
  },
  {
    path: 'events',
    component: EventPageComponent,
    canActivate: [AuthGuard],
    data: {roles: [UserRoles.ADMIN]}
  },
  {
    path: 'mybets',
    component: UserBetsPageComponent,
    canActivate: [AuthGuard],
    data: {roles: [UserRoles.USER]},
  },
  {
    path: 'events/:eventId',
    component: BetPageComponent,
    canActivate: [AuthGuard],
    data: {roles: [UserRoles.USER]}
  }
];

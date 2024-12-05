import { Routes } from '@angular/router';
import { LoginFormComponent } from './components/login-form/login-form.component';
import { LandingComponent } from './components/landing/landing.component';
import { AuthGuard } from './core/guards/auth/auth.guard';
import { EventPageComponent } from './components/events/event-page/event-page.component';
import { BetPageComponent } from './components/bets/bet-page/bet-page.component';
import { UserBetsPageComponent } from './components/mybets/user-bets-page/user-bets-page.component';

export const routes: Routes = [
    {
        path: '',
        component: LoginFormComponent
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
        canActivate: [AuthGuard]
    },
    {
        path: 'mybets',
        component: UserBetsPageComponent,
        canActivate: [AuthGuard]
    },
    {
        path: 'events/:eventId',
        component: BetPageComponent,
        canActivate: [AuthGuard]
    }
];
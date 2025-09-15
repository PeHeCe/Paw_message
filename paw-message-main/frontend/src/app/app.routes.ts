import { Routes } from '@angular/router';
import { MessagesContainerComponent } from './messages/message-container.component';
import { AuthenticationComponent } from './auth/authentication.component';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { AUTH_ROUTES } from './auth/auth.routers';

export const routes: Routes = [
    { path: "", redirectTo: "/mensagens", pathMatch: "full" },
    { path: "mensagens", title: "Mensagens", component: MessagesContainerComponent },
    { path: "autenticacao", title: "Autenticação", component: AuthenticationComponent, children: AUTH_ROUTES}, 
    { path: "**", component: PageNotFoundComponent }
];
 
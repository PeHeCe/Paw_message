import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive, RouterOutlet } from "@angular/router";

@Component({
    selector: 'app-authentication',
    standalone: true,
    imports: [RouterOutlet, RouterLink, RouterLinkActive],
    template: `
        <h2>Autenticação</h2>
        <header class="row spacing">
            <nav class="col-md-8 col-md-offset-2">
                <ul class="nav nav-tabs">
                    <li><a class="nav-link" [routerLink]="['signup']" routerLinkActive="active">Sign Up</a></li>
                    <li><a class="nav-link" [routerLink]="['signin']" routerLinkActive="active">Sign In</a></li>
                    <li><a class="nav-link" [routerLink]="['logout']" routerLinkActive="active">Logout</a></li>
                </ul>
            </nav>
        </header>
        <router-outlet></router-outlet>
    `,
})
export class AuthenticationComponent {

}
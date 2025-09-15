import { Component } from "@angular/core";
import { RouterLink, RouterLinkActive } from "@angular/router";

@Component({
    selector: 'app-page-not-found',
    standalone: true,
    imports: [RouterLink, RouterLinkActive],
    templateUrl: './page-not-found.component.html',
    styles: `
        div {
            text-align: center
        }

        h2 {
            color: #A31717
        }
    `
})
export class PageNotFoundComponent {

}
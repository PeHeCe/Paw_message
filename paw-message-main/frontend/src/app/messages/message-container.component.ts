import { Component } from "@angular/core";
import { MessageInputComponent } from "./message-input.component";
import { MessageListComponent } from "./message-list.component";

@Component({
    selector: 'app-messages-container',
    standalone: true,
    imports: [MessageInputComponent, MessageListComponent],
    template: `
        <div class="row">
            <app-message-input></app-message-input>
        </div>
        <div class="row">
            <app-message-list></app-message-list>
        </div>
    `
})
export class MessagesContainerComponent {

}
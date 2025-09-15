import { Component, EventEmitter, input, OnInit, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterOutlet } from "@angular/router";
import { Message } from "./message.model";
import { MessageComponent } from "./message.component";
import { MessageService } from "./message.service";

@Component({
    selector: 'app-message-list',
    standalone: true,
    imports: [FormsModule, MessageComponent],
    template: `
            <div class="col-md-8 col-md-offset-2">

                @for (msg of messages; track $index) {
                    <app-message [varMensagem]="msg" (outputMessage)="msg.content = $event" (messageDeleted)="onMessageDeleted($event)"></app-message>
                } @empty {
                    Nenhuma mensagem
                }

            </div>
    `
})

export class MessageListComponent implements OnInit {

    messages: Message[] = [ ]

    constructor (private messageService: MessageService) { }

    ngOnInit(): void {
        // this.messages = this.messageService.getMessages()

        this.messageService.getMessages().subscribe({
            next: (dadosSucesso: any) => {
                console.log(dadosSucesso.success)
                console.log({_id: dadosSucesso.messageList[0]._id, content: dadosSucesso.messageList[0].content})

                this.messages = dadosSucesso.messageList
            },
            error: (dadosErro) => {
                console.log("Erro Subscribe = ", dadosErro.info_extra)
                console.log(dadosErro)
            }
        })
    }
    
      onMessageDeleted(messageId: string) {
        this.messages = this.messages.filter(message => message.messageId !== messageId);
        console.log('Mensagem removida do array local');
      }
    
}
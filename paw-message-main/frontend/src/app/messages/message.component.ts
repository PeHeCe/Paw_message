import { Component, EventEmitter, Input, Output } from "@angular/core";
import { FormsModule } from "@angular/forms";
import { RouterOutlet } from "@angular/router";
import { Message } from "./message.model";
import { MessageService } from "./message.service";

@Component({
    selector: 'app-message',
    standalone: true,
    imports: [RouterOutlet, FormsModule],
    templateUrl: './message.component.html',
    styleUrls: ['./message.component.css']
})
export class MessageComponent {

    @Input() varMensagem = new Message("", "", "", "", ""); 

    @Output() outputMessage = new EventEmitter<string>();
    @Output() messageDeleted = new EventEmitter<string>();  

    constructor(private messageServiceObj: MessageService) { }

   
    getUserImage(userId: string): string {
        const userImages: { [key: string]: string } = {
            "Vitor": "/uploads/imagens/vitor.png",
            "Rakel": "/uploads/imagens/rakel.png",
            "Pedro": "/uploads/imagens/pedro.png",
            "Caio": "/uploads/imagens/caio.png"
        };

        return userImages[userId] || "/uploads/imagens/default.png";
    }

    onEdit() {
        const mensagemEditada = "Texto editado com sucesso";
        this.varMensagem.content = mensagemEditada;
        this.messageServiceObj.edicaoMessage(this.varMensagem).subscribe({
            next: (response) => {
                this.outputMessage.emit(mensagemEditada);
                console.log("Edição procedente", response);
            },
            error: (error) => {
                console.error("Erro ao editar a mensagem", error);
            }
        });
    }

    onDelete() {
        this.messageServiceObj.deleteMessage(this.varMensagem.messageId).subscribe({
            next: () => {
                console.log('Mensagem deletada com sucesso!');
                this.messageDeleted.emit(this.varMensagem.messageId); 
            },
            error: (error) => {
                console.error('Erro ao deletar a mensagem:', error);
            }
        });
    }
}

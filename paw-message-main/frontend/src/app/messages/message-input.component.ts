import { Component, EventEmitter, inject, Input, Output } from "@angular/core";
import { FormsModule, NgForm } from "@angular/forms";
import { MessageService } from "./message.service";
import { Message } from "./message.model";

@Component({
    selector: 'app-message-input',
    standalone: true,
    imports: [FormsModule],
    templateUrl: "./message-input.component.html",
    styles: `input.ng-invalid.ng-touched { border: 1px solid red; }`
})
export class MessageInputComponent {
    private messageService = inject(MessageService);

    onSubmit(form: NgForm) {
        console.log("MessageInputComponent: ");
        console.log(form);

        const id = localStorage.getItem("userId");
        const user = localStorage.getItem("user");

        let messAux;

        if (id && user) {
            const parsedUser = JSON.parse(user); 
            messAux = new Message("", form.value.formConteudo, JSON.parse(id), parsedUser, parsedUser + ".png");
        } else {
            messAux = new Message("", form.value.formConteudo, "", "", "default.png");
        }

        this.messageService.addMessage(messAux)
            .subscribe({
                next: (dadosSucesso: any) => {
                    console.log(dadosSucesso.success);
                    console.log({ content: dadosSucesso.messageSave.content });
                    console.log({ _id: dadosSucesso.messageSave._id });
                },
                error: (dadosErro: any) => {
                    console.log(`Erro Subscribe = ${dadosErro.info_extra}`);
                    console.log(dadosErro);
                }
            });

        form.resetForm();
    }
}

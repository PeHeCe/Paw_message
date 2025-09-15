import { Component, inject } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { User } from "./user.model";
import { UserService } from "./user.service";

@Component({
    selector: 'app-signin',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: 'signin.component.html',
})
export class SigninComponent {

    private userService = inject(UserService)
    
    myForm!: FormGroup

    onSubmit() {
        const userAux = new User(this.myForm.value.emailTS, this.myForm.value.passwordTS);

        this.userService.getUser(userAux).subscribe({
            next: (dadosSucesso: any) => {

                localStorage.setItem("userId", JSON.stringify(dadosSucesso.user._id));
                localStorage.setItem("user", JSON.stringify(dadosSucesso.user.firstName));
 
            },
            error: (dadosErro: any) => {
                console.log(`Erro Subscribe = ${dadosErro.info_extra}`)
                console.log(dadosErro)
            }
        })

        this.myForm.reset()
    }

    ngOnInit(): void {
        this.myForm = new FormGroup({
            emailTS: new FormControl(null, [Validators.required, Validators.pattern("[a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9\-\_\.]+")]),
            passwordTS: new FormControl(null, Validators.required)
        })
    }
}
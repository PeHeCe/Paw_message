import { Component, inject, OnInit } from "@angular/core";
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from "@angular/forms";
import { UserService } from "./user.service";
import { User } from "./user.model";

@Component({
    selector: 'app-signup',
    standalone: true,
    imports: [ReactiveFormsModule],
    templateUrl: 'signup.component.html',
})
export class SignupComponent implements OnInit {
    private userService = inject(UserService)

    myForm!: FormGroup

    onSubmit() {
        console.log(this.myForm.value)

        const userAux = new User(this.myForm.value.emailTS, this.myForm.value.passwordTS, this.myForm.value.firstNameTS, this.myForm.value.lastNameTS, this.myForm.value.genderTS, this.myForm.value.accountTypeTS, this.myForm.value.notificationTS)

        this.userService.addUser(userAux).subscribe({
            next: (dadosSucesso: any) => {
                console.log(dadosSucesso),
                console.log({_id: dadosSucesso.userSave._id, email: dadosSucesso.userSave.email})
                localStorage.setItem("userId", JSON.stringify(dadosSucesso.userSave._id));
                localStorage.setItem("user", JSON.stringify(dadosSucesso.userSave.firstName));
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
            firstNameTS: new FormControl(null, Validators.required),
            lastNameTS: new FormControl(null, [Validators.required, Validators.minLength(4), Validators.maxLength(16)]),
            emailTS: new FormControl(null, [Validators.required, Validators.pattern("[a-zA-Z0-9\-\_\.]+@[a-zA-Z0-9\-\_\.]+")]),
            passwordTS: new FormControl(null, Validators.required),
            genderTS: new FormControl(null, Validators.required),
            accountTypeTS: new FormControl(null, Validators.required),
            notificationTS: new FormControl(false)
        })
    }
}
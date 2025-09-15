export class User {
    constructor(public email: string, public password: string, public firstName?: string, public lastName?: string, public gender?: string, public accountType?: string, public notification?: boolean) {

    }
}
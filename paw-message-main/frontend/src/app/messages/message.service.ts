import { inject, Injectable } from "@angular/core";
import { Message } from "./message.model";
import { HttpClient } from "@angular/common/http";
import { catchError, map, Observable, throwError } from "rxjs";

@Injectable()
export class MessageService {
    private baseUrl = "http://localhost:3000"

    private messageService: Message[] = []

    private httpClient = inject(HttpClient)

    addMessage(message: Message) {
        this.messageService.push(message)
        console.log(this.messageService)

        return this.httpClient.post<any>(`${this.baseUrl}/message`, message).pipe(
            catchError((e) => this.errorHandler(e, "addMessage()"))
        )
    }

    edicaoMessage(message: Message) {
        const messageIndex = this.messageService.findIndex(m => m.messageId === message.messageId);
        if (messageIndex !== -1) {
          this.messageService[messageIndex] = message; 
        }
    
        return this.httpClient.post<any>(`${this.baseUrl}/message/${message.messageId}`, message).pipe(
          catchError((e) => this.errorHandler(e, "edicaoMessage()")),
        )
      }


    deleteMessage(messageId: string): Observable<any> {
        return this.httpClient.delete<any>(`${this.baseUrl}/message/${messageId}`).pipe(
            catchError((e) => this.errorHandler(e, "deleteMessage()"))
        );
      }
    
      
    getMessages() : Observable<any> {
        return this.httpClient.get<any>(`${this.baseUrl}/message`).pipe(
            map((response: any) => {
                console.log(response)
                // console.log({_id: response.messageList[0]._id, content: response.messageList[0].content})

                const responseMessageList = response.messageList

                let castMessageListFrontend: Message[] = []

                for (let msg of responseMessageList) {
                    console.log(msg.userDetails._id, msg.userDetails.firstName)
                    castMessageListFrontend.push(new Message(msg._id, msg.content, msg.userDetails._id, msg.userDetails.firstName,  msg.userImage))
                }

                this.messageService = [...castMessageListFrontend]
                response.messageList = this.messageService

                console.log({success: response.success})
                // console.log({_id: response.messageList[0]._id, content: response.messageList[0].content})

                return response
            }),
            catchError((e) => this.errorHandler(e, "getMessages()"))
        )
    }

    errorHandler(e: any, info: string): Observable<any> {
        throw({
            info_extra: info,
            error_SS: e, 
            error_CS: "Cliente-side Message: Ocorreu um erro!"
        })
    }
}

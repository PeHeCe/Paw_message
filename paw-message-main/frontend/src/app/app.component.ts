import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MessagesContainerComponent } from './messages/message-container.component';
import { HeaderComponent } from './header.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, MessagesContainerComponent, HeaderComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  title = 'frontend';

}

 
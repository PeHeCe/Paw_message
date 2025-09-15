import { ApplicationConfig } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { MessageService } from './messages/message.service';
import { provideHttpClient } from '@angular/common/http';
import { UserService } from './auth/user.service';

export const appConfig: ApplicationConfig = {
  providers: [provideRouter(routes), provideHttpClient(), {provide: MessageService}, {provide: UserService}]
};
 
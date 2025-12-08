import { Injectable } from '@angular/core';
import { USERS  } from '@nx/data/the';

@Injectable({
  providedIn: 'root',
})
export class Business {

  users = USERS;

}

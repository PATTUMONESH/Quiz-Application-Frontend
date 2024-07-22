import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthServiceService {

 // Replace this with real authentication logic
 isLoggedIn(): boolean {
  // Check if the user is logged in (e.g., check a token in localStorage)
  return !!localStorage.getItem('userIdFromBackEnd');
}
}

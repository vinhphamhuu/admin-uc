import { AngularFirestore } from '@angular/fire/firestore';
import { Injectable } from '@angular/core';
import { Users } from './users.model';

@Injectable({
  providedIn: 'root'
})
export class UsersService {
  formData: Users;

  constructor(private firestore: AngularFirestore) { }

  getUsers() {
    return this.firestore.collection('users').snapshotChanges();
  }
}

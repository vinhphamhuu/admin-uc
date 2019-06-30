import { AngularFirestore } from '@angular/fire/firestore';
import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/users.service';
import { Users } from 'src/app/shared/users.model';
import { ToastrService } from 'ngx-toastr';

@Component({
  selector: 'app-user-list',
  templateUrl: './user-list.component.html',
  styleUrls: ['./user-list.component.css']
})
export class UserListComponent implements OnInit {

  list: Users[];
  constructor(private service: UsersService,
    private firestore: AngularFirestore,
    private toastr:ToastrService) { }

  ngOnInit() {
    this.service.getUsers().subscribe(actionArray => {
      this.list = actionArray.map(item => {
        console.log(item.payload.doc.data());
        
        return {
          id: item.payload.doc.id,
          ...item.payload.doc.data()
        } as Users;
      })
    });
  }
  onEdit(emp: Users) {
    this.service.formData = Object.assign({}, emp);
  }

  onDelete(id: string) {
    if (confirm("Are you sure to delete this record?")) {
      this.firestore.doc('users/' + id).delete();
      this.toastr.warning('Deleted successfully','EMP. Register');
    }
  }

}

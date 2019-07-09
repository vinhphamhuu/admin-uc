import { Component, OnInit } from '@angular/core';
import { UsersService } from 'src/app/shared/users.service';
import { NgForm } from '@angular/forms';
import { AngularFirestore } from '@angular/fire/firestore';
import { ToastrService } from 'ngx-toastr';
import { log } from 'util';

@Component({
  selector: 'app-user',
  templateUrl: './user.component.html',
  styleUrls: ['./user.component.css']
})
export class UserComponent implements OnInit {

  constructor(private service: UsersService,
    private firestore: AngularFirestore,
    private toastr: ToastrService) { }


  selectedLevel = [];
  leveList = [
    { item_id: 0, name: 'safari' },
    { item_id: 1, name: 'NOTEBOOK SAFARI 1' },
    { item_id: 2, name: 'NOTEBOOK SAFARI 2' },
    { item_id: 3, name: 'NOTEBOOK SAFARI 3' },
    { item_id: 4, name: 'superkids' },
    { item_id: 5, name: 'SUPERKIDS 1' },
    { item_id: 6, name: 'SUPERKIDS 2' },
    { item_id: 7, name: 'SUPERKIDS 3' },
    { item_id: 8, name: 'SUPERKIDS 4' }
  ];
  ngOnInit() {
    this.resetFormUser();
  }
  resetFormUser(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      id: null,
      name: '',
      phone: '',
      level: null,
      checkChildren: false
    }
  }
  onSubmit(form: NgForm) {
    let data = Object.assign({}, form.value);
    console.log('user_new: ');
    console.log(data);
    console.log(this.selectedLevel);
    var levels = [];
    this.selectedLevel.forEach(element => {
      console.log(element.name)
      levels.push(element.name)
    });
    console.log(levels)
    console.log('---------------------');
    this.firestore.collection("users").doc(form.value.id).set({
      name: form.value.name,
      phone:  form.value.phone,
      level: levels
    })
      .then(function () {
        this.toastr.success('Submitted successfully', 'EMP. Register');
      })
      .catch(function (error) {
        this.toastr.success(error, 'Submitted fail');
      });
    this.resetFormUser(form);
    //this.toastr.success('Submitted successfully', 'EMP. Register');
  }

}

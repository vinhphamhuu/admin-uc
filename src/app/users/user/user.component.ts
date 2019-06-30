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

    dropdownList = [];
    selectedItems = [];
    dropdownSettings = {};


  ngOnInit() {
    this.resetFormUser();

    this.dropdownList = [
      { item_id: 0, item_text: 'safari' },
      { item_id: 1, item_text: 'NOTEBOOK SAFARI 1' },
      { item_id: 2, item_text: 'NOTEBOOK SAFARI 2' },
      { item_id: 3, item_text: 'NOTEBOOK SAFARI 3' },
      { item_id: 4, item_text: 'superkids' },
      { item_id: 5, item_text: 'SUPERKIDS 1' },
      { item_id: 6, item_text: 'SUPERKIDS 2' },
      { item_id: 7, item_text: 'SUPERKIDS 3' },
      { item_id: 8, item_text: 'SUPERKIDS 4' }


    ];
    // this.selectedItems = [
    //   { item_id: 3, item_text: 'Pune' },
    //   { item_id: 4, item_text: 'Navsari' }
    // ];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: false
    };
  }
  resetFormUser(form?: NgForm) {
    if (form != null)
      form.resetForm();
    this.service.formData = {
      id: null,
      name: '',
      phone: '',
      level: null,
    }
  }
  onSubmit(form: NgForm) {
    let data = Object.assign({}, form.value);
    console.log('user_new: ');
    console.log(data);
    console.log(this.selectedItems);

    console.log('---------------------');
    this.firestore.collection("users").doc(form.value.id).set({
      name: form.value.name,
      phone:  form.value.phone,
      level:["safari", "super kids"]
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
  onItemSelect(item: any) {
    console.log(item);
  }
  onSelectAll(items: any) {
    console.log(items);
    this.selectedItems.push(items.item_id,items.item_text);
  }
  update() {
    console.log("update level - 5");
    
    this.firestore.collection('users').doc('5').collection('level').add({ 2: 'super kids' })
  }
}

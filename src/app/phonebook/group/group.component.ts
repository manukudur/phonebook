import { Component, Inject, OnInit, OnDestroy } from "@angular/core";
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem
} from "@angular/cdk/drag-drop";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { PhonebookService } from "src/app/phonebook.service";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { Group } from "src/app/model/group.model";
import { Contact } from "src/app/model/contact.model";

@Component({
  selector: "app-group",
  templateUrl: "./group.component.html",
  styleUrls: ["./group.component.css"]
})
export class GroupComponent implements OnInit {
  public form: FormGroup;
  contacts: Contact[] = [];
  group: Contact[] = [];
  error: string;
  loading: boolean = true;
  editMode: boolean = false;

  constructor(
    public dialogRef: MatDialogRef<GroupComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { dialogType: string; group?: Group },
    private phonebookService: PhonebookService
  ) {}

  loadContacts() {
    this.phonebookService.getContacts().subscribe(contacts => {
      this.contacts = contacts;
    });
  }

  toggleEditMode() {
    this.editMode = !this.editMode;
  }

  filteredContacts() {
    // array1 = array1.filter(val => !array2.includes(val));
    let arr = this.contacts.filter(val => !this.group.includes(val));
    console.log(this.contacts);
    console.log(this.group);
    console.log(arr);
  }

  ngOnInit(): void {
    this.loadContacts();
    if (this.data.group) {
      this.editMode = true;
      let id = this.data.group._id;
      this.phonebookService.getGroup(id).subscribe(data => {
        this.group = data.contacts;
        // this.filteredContacts();
      });
      this.form = new FormGroup({
        _id: new FormControl(this.data.group._id),
        name: new FormControl(this.data.group.name, [Validators.required])
      });
    } else {
      this.editMode = false;
      this.form = new FormGroup({
        _id: new FormControl(null),
        name: new FormControl(null, [Validators.required]),
        type: new FormControl("group")
      });
    }
  }
  deleteGroup() {
    let id = this.form.get("_id").value;
    if (confirm("Are you sure to Delete this Group ?")) {
      this.phonebookService.deleteGroup(id).subscribe(data => {
        this.onNoClick(data);
      });
    }
  }
  submitGroup() {
    this.loading = false;
    let groupData = { ...this.form.value, contacts: this.group };
    if (this.data.dialogType === "Edit") {
      this.phonebookService.patchGroup(this.form.value).subscribe(
        received => {
          this.onNoClick(received);
        },
        error => {
          // this.error = error.error.message.errors.title.message;
          this.loading = true;
        }
      );
    } else {
      this.phonebookService.postGroup(groupData).subscribe(
        received => {
          this.onNoClick(received);
        },
        error => {
          this.error = error.error.errors.name.message;
          this.loading = true;
        }
      );
    }
  }
  onNoClick(data: { message: string }): void {
    this.dialogRef.close(data);
  }
  onCancleClick(): void {
    this.dialogRef.close();
  }
  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }
  }
}

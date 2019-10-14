import { Component, OnInit, Inject } from "@angular/core";
import { MatDialogRef, MAT_DIALOG_DATA } from "@angular/material/dialog";
import { Contact } from "src/app/model/contact.model";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { PhonebookService } from "src/app/phonebook.service";

@Component({
  selector: "app-contact",
  templateUrl: "./contact.component.html",
  styleUrls: ["./contact.component.css"]
})
export class ContactComponent implements OnInit {
  public form: FormGroup;
  loading: boolean = true;
  editMode: boolean = false;
  commonIn: string[] = [];
  error: string;
  loadedData;

  constructor(
    public phonebookService: PhonebookService,
    public dialogRef: MatDialogRef<ContactComponent>,
    @Inject(MAT_DIALOG_DATA)
    public data: { dialogType: string; contact?: Contact }
  ) {}

  ngOnInit(): void {
    if (this.data.contact) {
      this.editMode = true;
      this.phonebookService
        .getContact(this.data.contact._id)
        .subscribe(data => {
          this.commonIn = data.commonIn;
        });
      this.form = new FormGroup({
        _id: new FormControl(this.data.contact._id),
        name: new FormControl(this.data.contact.name, [Validators.required]),
        phone_number: new FormControl(this.data.contact.phone_number, [
          Validators.required,
          Validators.pattern(/^[6-9]\d{9}$/)
        ]),
        email_id: new FormControl(this.data.contact.email_id, [
          Validators.email,
          Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        ]),
        address: new FormControl(this.data.contact.address)
      });
    } else {
      this.form = new FormGroup({
        _id: new FormControl(null),
        name: new FormControl(null, [Validators.required]),
        phone_number: new FormControl(null, [
          Validators.required,
          Validators.pattern(/^[6-9]\d{9}$/)
        ]),
        email_id: new FormControl(null, [
          Validators.email,
          Validators.pattern(/^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/)
        ]),
        address: new FormControl(null)
      });
    }
  }
  onDeleteClick() {
    let id = this.form.get("_id").value;
    if (confirm("Are you sure to Delete this Contact ?")) {
      this.phonebookService.deleteContact(id).subscribe(data => {
        this.onNoClick(data);
      });
    }
  }
  submitForm() {
    this.loading = false;
    if (this.data.dialogType === "Edit") {
      this.phonebookService.patchContact(this.form.value).subscribe(
        received => {
          this.onNoClick(received);
        },
        error => {
          this.error = "something went wrong";
          this.loading = true;
        }
      );
    } else {
      this.phonebookService.postContact(this.form.value).subscribe(
        received => {
          this.onNoClick(received);
        },
        error => {
          this.error = "something went wrong";
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
  toggleEditMode() {
    this.editMode = !this.editMode;
  }
  commonCount() {
    return this.commonIn.length;
  }
}

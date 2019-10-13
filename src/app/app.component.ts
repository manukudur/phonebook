import { Component } from "@angular/core";

import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ContactComponent } from "./phonebook/contact/contact.component";
import { GroupComponent } from "./phonebook/group/group.component";
import { PhonebookService } from "./phonebook.service";

@Component({
  selector: "app-root",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  constructor(
    private phonebookService: PhonebookService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}
  createContactDialog() {
    const dialogRef = this.dialog.open(ContactComponent, {
      width: "500px",
      data: { dialogType: "Create" }
    });

    dialogRef.afterClosed().subscribe(received => {
      if (received) {
        this._snackBar.open(received.message, "", {
          duration: 2000
        });
        this.phonebookService.reloadBlogs.next();
      }
    });
  }
  createGroupDialog() {
    const dialogRef = this.dialog.open(GroupComponent, {
      width: "auto",
      data: { dialogType: "Create" }
    });

    dialogRef.afterClosed().subscribe(received => {
      if (received) {
        this._snackBar.open(received.message, "", {
          duration: 2000
        });
        this.phonebookService.reloadBlogs.next();
      }
    });
  }
}

import { Component, OnInit } from "@angular/core";

import { Contact } from "../model/contact.model";
import { PhonebookService } from "../phonebook.service";
import { MatTableDataSource } from "@angular/material/table";
import { Subscription } from "rxjs";
import { MatDialog } from "@angular/material/dialog";
import { MatSnackBar } from "@angular/material/snack-bar";
import { ContactComponent } from "./contact/contact.component";
import { GroupComponent } from "./group/group.component";

@Component({
  selector: "app-phonebook",
  templateUrl: "./phonebook.component.html",
  styleUrls: ["./phonebook.component.css"]
})
export class PhonebookComponent implements OnInit {
  contact: Contact[];
  displayedColumns = ["type", "name"];
  dataSource;
  initialLoading: boolean = false;
  reloadSubscription: Subscription;
  constructor(
    private phonebookService: PhonebookService,
    public dialog: MatDialog,
    private _snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.loadList();
    this.reloadSubscription = this.phonebookService.reloadBlogs.subscribe(
      () => {
        this.loadList();
      }
    );
  }
  loadList() {
    this.phonebookService.getItems().subscribe(list => {
      this.contact = list;
      this.dataSource = new MatTableDataSource(this.contact);
      this.initialLoading = true;
    });
  }
  applyFilter(filterValue: string) {
    this.dataSource.filter = filterValue.trim().toLowerCase();
  }

  selectItem(data) {
    if (data.type === "contact") {
      const dialogRef = this.dialog.open(ContactComponent, {
        width: "500px",
        height: "550px",
        data: { dialogType: "Edit", contact: data }
      });

      dialogRef.afterClosed().subscribe(received => {
        if (received) {
          this._snackBar.open(received.message, "", {
            duration: 2000
          });
          this.phonebookService.reloadBlogs.next();
        }
      });
    } else {
      const dialogRef = this.dialog.open(GroupComponent, {
        width: "auto",
        data: { dialogType: "Edit", group: data }
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
}

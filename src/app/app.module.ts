import { BrowserModule } from "@angular/platform-browser";
import { NgModule } from "@angular/core";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { HttpClientModule } from "@angular/common/http";
import { ReactiveFormsModule } from "@angular/forms";

import { DragDropModule } from "@angular/cdk/drag-drop";
import { MatButtonModule } from "@angular/material/button";
import { MatCardModule } from "@angular/material/card";
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatTooltipModule } from "@angular/material/tooltip";
import { MatTableModule } from "@angular/material/table";
import { MatFormFieldModule } from "@angular/material/form-field";
import { MatInputModule } from "@angular/material/input";
import { TextFieldModule } from "@angular/cdk/text-field";
import { MatDialogModule } from "@angular/material/dialog";
import { MatSnackBarModule } from "@angular/material/snack-bar";
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatProgressBarModule } from "@angular/material/progress-bar";
import { MatMenuModule } from "@angular/material/menu";

import { AppRoutingModule } from "./app-routing.module";
import { AppComponent } from "./app.component";
import { PhonebookComponent } from "./phonebook/phonebook.component";
import { GroupComponent } from "./phonebook/group/group.component";
import { ContactComponent } from "./phonebook/contact/contact.component";

@NgModule({
  declarations: [
    AppComponent,
    PhonebookComponent,
    GroupComponent,
    ContactComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule,
    BrowserAnimationsModule,
    MatButtonModule,
    DragDropModule,
    MatCardModule,
    MatToolbarModule,
    MatIconModule,
    MatTooltipModule,
    MatTableModule,
    HttpClientModule,
    MatFormFieldModule,
    MatInputModule,
    TextFieldModule,
    MatDialogModule,
    MatSnackBarModule,
    MatProgressSpinnerModule,
    MatProgressBarModule,
    MatMenuModule
  ],
  entryComponents: [ContactComponent, GroupComponent],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

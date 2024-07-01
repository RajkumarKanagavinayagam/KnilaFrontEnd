import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';

@Component({
  selector: 'app-deletedialog',
  templateUrl: './deletedialog.component.html',
  styleUrls: ['./deletedialog.component.css'],
})
export class DeletedialogComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: { message: string },
    public dialogRef: MatDialogRef<DeletedialogComponent>
  ) {}
  closeDialog(result: boolean) {
    //Write your stuff here
    this.dialogRef.close(result); // <- Closes the dialog
  }
}

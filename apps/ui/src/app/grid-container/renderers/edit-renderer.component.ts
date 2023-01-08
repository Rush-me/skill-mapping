import {Component} from "@angular/core";
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellRendererParams} from "ag-grid-community";

@Component({
   selector: 'app-edit-renderer-component',
   template: `<mat-icon class="icon default-icon centered-icon" title="Update row" (click)="buttonClicked()">edit_note</mat-icon>`,
   styles: [':host { height: 100%; display: flex;align-items: center; }']
})
export class EditRowRendererComponent implements ICellRendererAngularComp {
    public params: ICellRendererParams = {} as ICellRendererParams;

   // gets called once before the renderer is used
   agInit(params: ICellRendererParams): void {
       this.params = params;
   }

   // gets called whenever the cell refreshes
   refresh(params: ICellRendererParams): boolean {
    this.params = params;
       return true;
   }

   buttonClicked() {
    this.params.context.componentParent.editRow(this.params.data);
   }
}
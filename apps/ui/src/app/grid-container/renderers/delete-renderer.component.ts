import {Component} from "@angular/core";
import {ICellRendererAngularComp} from 'ag-grid-angular';
import {ICellRendererParams} from "ag-grid-community";

@Component({
   selector: 'delete-renderer-component',
   template: `<mat-icon class="icon default-icon centered-icon" title="Delete row" (click)="buttonClicked()">delete</mat-icon>`,
   styles: [':host { height: 100%; display: flex; align-items: center; }']
})
export class DeleteRowRenderer implements ICellRendererAngularComp {
    public params: ICellRendererParams = {} as ICellRendererParams;
   // gets called once before the renderer is used
   agInit(params: ICellRendererParams): void {
    this.params = params;
   }

   // gets called whenever the cell refreshes
   refresh(params: ICellRendererParams): boolean {
       // set value into cell again
       this.params = params;
       return true;
   }

   buttonClicked() {
    this.params.context.componentParent.deleteRow(this.params.data);
   }
}
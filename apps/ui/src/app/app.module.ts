import { NgModule } from '@angular/core';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { BrowserModule } from '@angular/platform-browser';
import { HeaderComponent } from './components/header/header.component';
import { AppComponent } from './app.component';
import { MaterialModule } from './material.module';
import { FiltersComponent } from './filters/filters.component';
import { AgGridModule } from 'ag-grid-angular';
import { GridContainerComponent } from './grid-container/grid-container.component';
import { GridComponent } from './components/grid/grid.component';
import { EmployeesState } from './states/employee/employee.state';
import { NgxsModule } from '@ngxs/store';
import { HttpClientModule } from '@angular/common/http';
import { EmployeePoupupComponent } from './employee-popup/employee.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { EditRowRenderer } from './grid-container/renderers/edit-renderer.component';
import { DeleteRowRenderer } from './grid-container/renderers/delete-renderer.component';
import { ConformationPopupComponent } from './components/conformation-popup/conformation-popup.component';

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    FiltersComponent,
    GridContainerComponent,
    GridComponent,
    EmployeePoupupComponent,
    EditRowRenderer,
    DeleteRowRenderer,
    ConformationPopupComponent
  ],
  imports: [
    BrowserAnimationsModule,
    BrowserModule,
    MaterialModule,
    NgxsModule.forRoot([EmployeesState]),
    AgGridModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }

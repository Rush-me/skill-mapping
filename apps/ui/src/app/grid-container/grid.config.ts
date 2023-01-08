import { DeleteRowRendererComponent } from "./renderers/delete-renderer.component";
import { EditRowRendererComponent } from "./renderers/edit-renderer.component";

export function getColumnDefinition(): Array<object> {
  return [
    {
      headerName: 'Employee ID',
      field: 'employeeId',
      sortable: true,
      width: 200
    },
    {
      headerName: 'Employee name',
      field: 'name',
      sortable: true,
      tooltipField: 'name',
      width: 250
    },
    {
      headerName: 'Skills',
      field: 'skills',
      sortable: true,
      tooltipField: 'skills'
    },
    {
      headerName: 'Experience',
      field: 'experience',
      type: 'rightAligned',
      width: 150,
      sortable: true,
    },
    {
      headerName: 'Level',
      field: 'level',
      sortable: true,
      type: 'rightAligned',
      width: 100,
    },
    {
      headerName: 'Training',
      field: 'training',
      sortable: false,
      width: 100,
    },
    {
      headerName: 'Remarks',
      field: 'remarks',
      sortable: false,
      tooltipField: 'remarks',
      width: 300,
    },
    {
      headerName: 'Edit',
      field: 'edit',
      sortable: false,
      cellRenderer: EditRowRendererComponent,
      width: 80,
    },
    {
      headerName: 'Delete',
      field: 'delete',
      sortable: false,
      cellRenderer: DeleteRowRendererComponent,
      width: 100,
    }
  ];
}

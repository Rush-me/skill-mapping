import { Employee, Filters } from "./employee.model";

export class GetAllEmployees {
  public static readonly type = '[Employee] Get All Employees';

  constructor() {}
}

export class AddNewEmployee {
  public static readonly type = '[Employee] Add new Employee';

  constructor(public employee: Employee) {}
}

export class RemoveSelectedEmployee {
  public static readonly type = '[Employee] remove selected Employee';

  constructor(public employee: Employee) {}
}

export class UpdateSelectedEmployee {
  public static readonly type = '[Employee] update selected Employee';

  constructor(public employee: Employee) {}
}

export class SetSelectedEmployee {
  public static readonly type = '[Employee] set selected Employee';

  constructor(public employee: Employee | undefined) {}
}

export class SearchByName {
  public static readonly type = '[Employee] Search by name';

  constructor(public name: string) {}
}

export class FilterData {
  public static readonly type = '[Employee] Filter by skills and level';

  constructor(public filter: Filters) {}
}

export class GetAllSkills {
  public static readonly type = '[Employee] Get All Skills';

  constructor() {}
}


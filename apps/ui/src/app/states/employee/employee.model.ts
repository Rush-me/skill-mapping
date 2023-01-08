
  export interface Employee {
    id: string,
    employeeId: string,
    name: string,
    training: number,
    experience: string,
    level: number,
    remarks: string,
    skills: string
  }

  export interface Employees {
    employees?: Employee[],
    skills: Skill[],
    selectedEmployee: Employee | undefined
  }

  export interface Filters {
    skills?: string[],
    level?: number[],
    name?: string
  }

  export interface Skill {
   id?: string,
   name: string
  }

  export interface Level {
    id?: string,
    name: number
   }
 

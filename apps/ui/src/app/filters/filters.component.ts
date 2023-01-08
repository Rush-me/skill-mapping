import { Component, OnInit } from '@angular/core';
import { Select, Store } from '@ngxs/store';
import { Observable } from 'rxjs';
import { FilterData, SearchByName } from '../states/employee/employee.action';
import { Level, Skill } from '../states/employee/employee.model';
import { EmployeesState } from '../states/employee/employee.state';

@Component({
  selector: 'app-filters',
  templateUrl: './filters.component.html',
  styleUrls: ['./filters.component.scss']
})
export class FiltersComponent implements OnInit {

  public skills: Skill[] = [];
  public levels: Level[] = [];

  private selectedLevels : number[]= [];
  private selectedSkills: string[] = [];
  private searchStr = '';

  @Select(EmployeesState.skills) skills$!: Observable<Skill[]>;

  constructor(private store: Store) {
    this.levels = [{name: 1}, {name: 2}, {name: 3}, {name: 4}]
  }

  ngOnInit(): void {
    this.skills$.subscribe(response => {

      if (response)
        this.skills = response;
    });
  }

  onSearch(data: any) {
    this.searchStr = data.target.value;
    console.log(this.searchStr, ' before')
     this.debounce(this.searchData, 500)(data);
  }

  onSkillsFilter(data: any) {
    this.selectedSkills = data.value;
    this.debounce(this.filterData, 500)(data);
 }

 onLevelFilter(data: any) {
  this.selectedLevels = data.value;
  this.debounce(this.filterData, 500)(data);
}

  private debounce(func: any, delay=100) {
    let timer: any;
    const that = this;

    return function(string: string) {
      clearTimeout(timer);

      timer = setTimeout(() => func.apply(that, [string]), delay)
    }
  }

  private searchData(data: any) {
    console.log(this.searchStr, ' after ',data.target.value)
    this.store.dispatch(new SearchByName(data.target.value));
  }

  private filterData(data: any) {
    const filter = {skills: this.selectedSkills, level: this.selectedLevels, name: this.searchStr};
    console.log(filter, ' filter');
    this.store.dispatch(new FilterData(filter));
  }

}

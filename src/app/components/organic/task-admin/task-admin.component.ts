import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-task-admin',
  imports: [],
  templateUrl: './task-admin.component.html',
  styleUrl: './task-admin.component.css'
})
export class TaskAdminComponent implements OnInit{
  ngOnInit(): void {
    this.setToday();
  }
  private readonly weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  private readonly months = [
    'January','February','March','April','May','June',
    'July','August','September','October','November','December',
  ];
  private setToday(): void {
    const now = new Date();
    this.today = {
      day: now.getDate(),
      weekday: this.weekdays[now.getDay()],
      month: this.months[now.getMonth()],
    };
  }
    today = {
    day: 0,
    weekday: '',
    month: '',
  };
  showTasks(): void {
    console.log('Show tasks clicked');
  }
}

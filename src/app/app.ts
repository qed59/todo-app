import { Component, signal } from '@angular/core';
import { RouterOutlet } from '@angular/router';

import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-root',
  imports: [CommonModule, FormsModule, ReactiveFormsModule, HttpClientModule],
  templateUrl: './app.html',
  styleUrl: './app.css'
})
export class App {
  protected readonly title = signal('todo-app');

  tasks: any = [];
  newtask = "";

  API_URL = 'https://localhost:7290/api/todo';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.get_tasks();
  }

  get_tasks() {
    this.http.get(this.API_URL).subscribe((res) => {
      this.tasks = res;
    });
  }

  add_task() {
    if (!this.newtask.trim()) {
      alert("Task cannot be empty");
      return;
    }
    let body = new FormData();
    body.append('title', this.newtask);
    body.append('isCompleted', 'false');
    this.http.post(this.API_URL, body).subscribe((res) => {
      this.newtask = "";
      this.get_tasks();
    });
  }

  delete_task(id: number) {
    this.http.delete(`${this.API_URL}/${id}`).subscribe(() => {
      this.get_tasks();
    });
  }

}

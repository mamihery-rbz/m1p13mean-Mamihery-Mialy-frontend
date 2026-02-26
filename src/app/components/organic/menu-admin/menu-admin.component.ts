import { Component } from '@angular/core';

interface User {
  name: string;
  role: string;
  avatar: string;
}

@Component({
  selector: 'app-menu-admin',
  imports: [],
  templateUrl: './menu-admin.component.html',
  styleUrl: './menu-admin.component.css'
})
export class MenuAdminComponent {
  user: User = {
    name: 'Dwayne Tatum',
    role: 'CEO Assistant',
    avatar: 'https://i.pravatar.cc/150?img=12',
  };
}

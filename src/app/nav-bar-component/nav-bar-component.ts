import { Component } from '@angular/core';

@Component({
  selector: 'app-nav-bar-component',
  standalone: false,
  templateUrl: './nav-bar-component.html',
  styleUrl: './nav-bar-component.css',
})
export class NavBarComponent {

  sidebarOpen = false;

  toggleSidebar() {
    this.sidebarOpen = !this.sidebarOpen;
  }

  toggleTheme() {
  const html = document.documentElement;
  const theme = html.getAttribute('data-bs-theme');

  html.setAttribute('data-bs-theme', theme === 'dark' ? 'light' : 'dark');
  document.documentElement.setAttribute('data-theme', 'dark');

}

}


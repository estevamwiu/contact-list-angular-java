import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Group } from '../forms/group.model';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-groups-component',
  standalone: false,
  templateUrl: './groups-component.html',
  styleUrl: './groups-component.css',
})
export class GroupsComponent implements OnInit {

  groups: Group[] = [];

  constructor(
    private groupService: GroupService,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.loadGroups();
  }

  loadGroups(): void {
    this.groupService.getAll().subscribe({
      next: (data: Group[]) => {
        this.groups = data;
      },
      error: () => alert('Erro ao carregar grupos.')
    });
  }

  editGroup(id: number): void {
    console.log("ID para editar:", id);
  this.router.navigate(['/edit-groups', id]);
}


  deleteGroup(id: number): void {
    if (!confirm('Tem certeza que deseja remover este grupo?')) return;

    this.groupService.delete(id).subscribe({
      next: () => {
        alert('Grupo removido!');
        this.loadGroups();
      },
      error: () => alert('Erro ao remover grupo.')
    });
  }
}

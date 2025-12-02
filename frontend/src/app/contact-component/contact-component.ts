import { Component } from '@angular/core';
import { Contact } from '../forms/contact.model';
import { NewContactService } from '../services/new-contact.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-contact-component',
  standalone: false,
  templateUrl: './contact-component.html',
  styleUrl: './contact-component.css',
})
export class ContactComponent {

  contacts: Contact[] = [];
  searchTerm: string = '';

  constructor(
    private service: NewContactService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loadContacts();
  }

  loadContacts() {
    this.service.getAllContacts().subscribe({
      next: data => this.contacts = data,
      error: () => alert("Erro ao carregar contatos")
    });
  }

  deleteContact(c: Contact) {
    if (confirm(`Deseja realmente excluir o contato "${c.name}"?`)) {
      this.service.delete(c.id!).subscribe({
        next: () => {
          alert("Contato excluído com sucesso!");
          this.loadContacts();
        },
        error: () => alert("Erro ao excluir contato.")
      });
    }
  }

  editContact(id: number) {
    this.router.navigate(['/new-contact', id]);
  }

  get filteredContacts() {
    const text = this.searchTerm.toLowerCase();
    return this.contacts.filter(c =>
      c.name.toLowerCase().includes(text) ||
      c.phone.includes(text)
    );
  }
}
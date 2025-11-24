import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewContactService } from '../services/new-contact.service';
import { Contact } from '../forms/contact.model';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
  selector: 'app-new-contact-component',
  standalone: false,
  templateUrl: './new-contact-component.html',
  styleUrl: './new-contact-component.css',
})
export class NewContactComponent {

  formGroupNewContactForm: FormGroup;
  editingId: number | null = null;

  constructor(
    private router: Router,
    private route: ActivatedRoute,
    private formBuilder: FormBuilder,
    private service: NewContactService,
  ) {

    this.formGroupNewContactForm = this.formBuilder.group({
      name: ['', [Validators.required, Validators.minLength(2)]],
      phone: ['', [Validators.required]],
      groupName: [''],
      email: ['', [Validators.email]],
      address: [''],
      notes: ['']
    });
  }

 ngOnInit() {
  this.route.paramMap.subscribe(params => {
    const idParam = params.get('id');
    if (idParam) {
      this.editingId = Number(idParam);
      this.loadContact(this.editingId);
    }
  });
}

loadContact(id: number) {
  this.service.getContactById(id).subscribe({
    next: c => this.formGroupNewContactForm.patchValue(c),
    error: () => alert("Erro ao carregar contato para edição.")
  });
}

saveNewContact() {
  const contact: Contact = this.formGroupNewContactForm.value;

  if (this.editingId) {
    // EDITAR
    this.service.update(this.editingId, contact).subscribe({
      next: () => {
        alert("Contato atualizado com sucesso!");
        this.router.navigate(['/contact']);
      },
      error: () => alert("Erro ao atualizar contato.")
    });
  } else {
    // CRIAR
    this.service.create(contact).subscribe({
      next: saved => {
        alert("Contato salvo com sucesso!");
        this.router.navigate(['/contact']);
      },
      error: () => alert("Erro ao salvar contato.")
    });
  }

}

cancelNewContact() {
  this.router.navigate(['/contact']);
}
}

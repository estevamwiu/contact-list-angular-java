import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NewContactService } from '../services/new-contact.service';
import { GroupService } from '../services/group.service';
import { Contact } from '../forms/contact.model';
import { ActivatedRoute, Router } from '@angular/router';
import { Group } from '../forms/group.model';

@Component({
  selector: 'app-new-contact-component',
  standalone: false,
  templateUrl: './new-contact-component.html',
  styleUrl: './new-contact-component.css',
})
export class NewContactComponent {

  formGroupNewContactForm!: FormGroup;
  groups: Group[] = [];
  editingId?: number;

  constructor(
    private fb: FormBuilder,
    private contactService: NewContactService,
    private groupService: GroupService,
    private router: Router,
    private route: ActivatedRoute
  ) {}

  ngOnInit(): void {
    this.initForm();
    this.loadGroups();

    // editar
    this.route.params.subscribe(params => {
      if (params['id']) {
        this.editingId = params['id'];
        this.loadContact(params['id']);
      }
    });
  }

  initForm() {
    this.formGroupNewContactForm = this.fb.group({
      name: ['', Validators.required],
      phone: ['', Validators.required],
      email: [''],
      address: [''],
      notes: [''],
      groupId: ['', Validators.required]
    });
  }

  loadGroups() {
    this.groupService.getAll().subscribe({
      next: data => this.groups = data,
      error: () => alert("Erro ao carregar grupos")
    });
  }

  loadContact(id: number) {
    this.contactService.getById(id).subscribe({
      next: c => {
        this.formGroupNewContactForm.patchValue({
          name: c.name,
          phone: c.phone,
          email: c.email,
          address: c.address,
          notes: c.notes,
          groupId: c.group?.id  
        });
      },
      error: () => alert("Erro ao carregar o contato.")
    });
  }

  saveNewContact() {
    if (this.formGroupNewContactForm.invalid) {
      alert("Preencha os campos obrigatórios!");
      return;
    }

    const dto: Contact = {
      id: this.editingId,
      name: this.formGroupNewContactForm.value.name,
      phone: this.formGroupNewContactForm.value.phone,
      email: this.formGroupNewContactForm.value.email,
      address: this.formGroupNewContactForm.value.address,
      notes: this.formGroupNewContactForm.value.notes,
      groupId: this.formGroupNewContactForm.value.groupId
    };

    if (this.editingId) {
      this.contactService.update(this.editingId, dto).subscribe({
        next: () => {
          alert("Contato atualizado com sucesso!");
          this.router.navigate(['/contacts']);
        },
        error: () => alert("Erro ao atualizar contato")
      });
    } else {
      this.contactService.create(dto).subscribe({
        next: () => {
          alert("Contato salvo com sucesso!");
          this.router.navigate(['/contacts']);
        },
        error: () => alert("Erro ao salvar contato")
      });
    }
  }

  cancelNewContact() {
    this.router.navigate(['/contacts']);
  }
}

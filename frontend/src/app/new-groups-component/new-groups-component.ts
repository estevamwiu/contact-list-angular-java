import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { GroupService } from '../services/group.service';

@Component({
  selector: 'app-new-groups',
  templateUrl: './new-groups-component.html',
  standalone: false,
  styleUrls: ['./new-groups-component.css']
})
export class NewGroupsComponent implements OnInit {

  formGroupNewGroupForm: FormGroup;
  id!: number;
  isEdit: boolean = false;

  constructor(
    private formBuilder: FormBuilder,
    private groupService: GroupService,
    private router: Router,
    private route: ActivatedRoute
  ) {
    this.formGroupNewGroupForm = this.formBuilder.group({
      name: ['', Validators.required],
      description: ['', Validators.required]
    });
  }

  ngOnInit(): void {
    this.id = Number(this.route.snapshot.paramMap.get('id'));

    if (this.id) {
      this.isEdit = true;

      this.groupService.getById(this.id).subscribe({
        next: (group) => {
          this.formGroupNewGroupForm.patchValue(group);
        },
        error: (err) => console.error("Erro ao carregar grupo", err)
      });
    }
  }

  save() {
    if (!this.formGroupNewGroupForm.valid) return;

    if (this.isEdit) {

      this.groupService.update(this.id, this.formGroupNewGroupForm.value)
        .subscribe({
          next: () => {
            console.log("Grupo atualizado com sucesso!");
            this.router.navigate(['/groups']);
          },
          error: (error) => console.error("Erro ao atualizar grupo", error)
        });

    } else {

      this.groupService.create(this.formGroupNewGroupForm.value)
        .subscribe({
          next: () => {
            console.log("Grupo salvo com sucesso!");
            this.router.navigate(['/groups']);
          },
          error: (error) => console.error("Erro ao salvar grupo", error)
        });
    }
  }

  cancel() {
    this.router.navigate(['/groups']);
  }
}

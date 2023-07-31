import { Component, OnInit, ViewChild } from '@angular/core';
import { AbstractControl, FormBuilder, FormControl, FormGroup, Validators } from '@angular/forms';
import { Observable } from 'rxjs';
import { ModalAvisoComponent } from 'src/app/components/modal-aviso/modal-aviso.component';
import { isValidEmail, isValidName, isValidPhone } from 'src/app/helpers/validation/validation';
import { BaseResponse } from 'src/app/model/base-reponse/base-response.model';
import { FaleConoscoInputModel } from 'src/app/model/fale-conosco/fale-conosco.model';
import { InteresseModel } from 'src/app/model/interesse/interesse.model';
import { FaleConoscoService } from 'src/app/services/fale-conosco/fale-conosco.service';
import { InteresseService } from 'src/app/services/interesse/interesse.service';
import { EmailValidator } from 'src/app/shared/validators/email-validator';
import { NomeValidator } from 'src/app/shared/validators/nome-validator';
import { TelefoneValidator } from 'src/app/shared/validators/telefone-validator';

@Component({
  selector: 'app-fale-conosco',
  templateUrl: './fale-conosco.component.html',
  styleUrls: ['./fale-conosco.component.scss'],
})
export class FaleConoscoComponent implements OnInit {
  form: FormGroup;
  modalTitle: string = 'Fale conosco';
  loading: boolean = false;
  interessesObservable$: Observable<BaseResponse<InteresseModel[]>> = this._interesseService.getInteresses();
  @ViewChild(ModalAvisoComponent) modalAviso: ModalAvisoComponent;
  constructor(
    private _formBuilder: FormBuilder,
    private _faleConoscoService: FaleConoscoService,
    private _interesseService: InteresseService
  ) {}

  formField(fieldName: string): FormControl {
    return this.form?.get(fieldName) as FormControl;
  }

  ngOnInit() {
    this.form = this._formBuilder.group({
      nome: ['', [Validators.required, NomeValidator.validar()]],
      email: ['', [Validators.required, EmailValidator.validar()]],
      telefone: ['', [Validators.required, TelefoneValidator.validar()]],
      empresa: ['', [Validators.required]],
      idInteresse: ['', Validators.required],
      mensagem: ['', Validators.required],
    });
  }

  onSubmit(value: any) {
    Object.keys(this.form.controls).forEach(field => {
      const control = this.form.get(field);
      control?.markAsTouched({ onlySelf: true });
    });

    if (this.form.valid) {
      this.loading = true;
      let faleConoscoDTO: FaleConoscoInputModel = new FaleConoscoInputModel();
      faleConoscoDTO = { ...value };
      faleConoscoDTO.telefone = parseInt(faleConoscoDTO.telefone.toString().replace(/\D/g, ''));
      this._faleConoscoService.postFaleConosco(faleConoscoDTO).subscribe({
        next: (cadastro: BaseResponse<string>) => {
          if (cadastro.sucesso) {
            this.modalAviso.exibirModal(
              this.modalTitle,
              `Mensagem enviada com sucesso!
            Em breve retornaremos no seu e-mail.`
            );
          } else {
            this.modalAviso.exibirModal(this.modalTitle, cadastro.mensagem, true);
          }
        },
        error: (err: any) => {
          this.modalAviso.exibirModal(this.modalTitle, err.error?.Mensagem, true);
        },
        complete: () => {
          this.loading = false;
        },
      });
    }
  }

  fecharModal() {
    this.form.get('nome')?.patchValue('');
    this.form.get('email')?.patchValue('');
    this.form.get('telefone')?.patchValue('');
    this.form.get('empresa')?.patchValue('');
    this.form.get('idInteresse')?.patchValue('');
    this.form.get('mensagem')?.patchValue('');
    this.form.reset();
  }
}

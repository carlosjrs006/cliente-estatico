import { E } from '@angular/cdk/keycodes';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ModalErrorComponent } from 'src/app/core/components/modal-error/modal-error.component';
import { ClienteRequest } from 'src/app/shared/interfaces/dtos/cliente';
import { ClienteService } from 'src/app/shared/services/client.service';
import { Validator } from 'src/app/shared/utils/validator';




@Component({
  selector: 'app-cliente-add',
  templateUrl: './cliente-add.component.html',
  styleUrls: ['./cliente-add.component.scss']
})
export class ClienteAddComponent implements OnInit {

  clientePFForm!: FormGroup;
  clientePJForm!: FormGroup;
  publicForm!: FormGroup;

  reqBody!: ClienteRequest;

  isDisabled: boolean = true;
  publicType: boolean = false;

  telefone: any;

  telefones!: string[];

  phones!: string[];
  private routeSubscription!: Subscription;

  constructor(
    private router: Router,
    private routeActivated: ActivatedRoute,
    private formBuilder: FormBuilder,
    private clienteService: ClienteService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    this.createForm();
  }

  openSnackBar() {
    this.snackBar.open('Operação concluída com sucesso', 'Fechar', {
      duration: 5000, // duração em milissegundos
      panelClass: ['mat-toolbar', 'mat-primary'] // classes CSS adicionais
    });
  }


  createForm() {
    this.publicForm = this.formBuilder.group({
      tipoPublico:['pessoaFisica',Validators.required]
    });

    this.publicForm.get('tipoPublico')!.valueChanges.subscribe(()=>{
      this.clientePFForm.reset('');
      this.clientePJForm.reset('');
    })

    this.clientePFForm = this.formBuilder.group({
      codCliente: [{value:'',disabled:true}],
      nome: ['',Validators.required],
      cpf: ['',[Validators.required, Validator.isValidCpf()]],
      rg: [''],
      situacao: [''],
      telefones: ['']
    });

    this.clientePJForm = this.formBuilder.group({
      codCliente: [{value:'',disabled:true}],
      nome: ['',Validators.required],
      cnpj: ['',[Validators.required,Validator.isValidCnpj()]],
      ie: [''],
      situacao: [''],
      telefones: ['']
    })

  }

  limpaFormulario(){
    this.clientePFForm.reset();
    this.clientePJForm.reset();
    this.publicForm.reset();
    this.publicForm.get('tipoPublico')?.setValue('pessoaFisica');
  }

  formTypeHandler(){
    if(this.publicForm.controls['tipoPublico'].value === 'pessoaFisica'){
      this.publicType = true;
    }else{
      return (this.publicType = false)
    }
    return this.publicType;
  }


  backNavigationHandler() {
    document.querySelector('body')?.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.router.navigate(['clientes']);
  }

  navigateToActuations() {
    document.querySelector('body')?.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.router.navigate(['clientes']);
  }

  public removerMascaraTelefones(phone: any): any{
    if(!phone) return null;


    const telefones: string[] = [];

    var listNum;

      if (phone) {
        if (typeof phone === 'string') {
          telefones.push(phone.trim());
        } else if (Array.isArray(phone)) {
          telefones.push(...phone.map((telefone: string) => telefone.trim()));
        }
      }

      listNum = telefones.map((res:string) => res.replace(/\D/g, ''));

      return listNum;
    }

  saveNewCliente() {
    if(this.publicForm.controls['tipoPublico'].value === 'pessoaFisica'){
      this.reqBody = {
        nome: this.clientePFForm.controls['nome'].value,
        cpfOrCnpj: this.clientePFForm.controls['cpf'].value,
        rgOrIe: this.clientePFForm.controls['rg'].value,
        situacao: this.clientePFForm.controls['situacao'].value,
        tipoPublico: this.publicForm.controls['tipoPublico'].value,
        telefones: this.removerMascaraTelefones(this.clientePFForm.controls['telefones'].value)
      }
    }

    if(this.publicForm.controls['tipoPublico'].value === 'pessoaJuridica'){
      this.reqBody = {
        nome: this.clientePJForm.controls['nome'].value,
        cpfOrCnpj: this.clientePJForm.controls['cnpj'].value,
        rgOrIe: this.clientePJForm.controls['ie'].value,
        situacao: this.clientePJForm.controls['situacao'].value,
        tipoPublico: this.publicForm.controls['tipoPublico'].value,
        telefones: this.removerMascaraTelefones(this.clientePJForm.controls['telefones'].value)
      }
    }

    this.clienteService.save(this.reqBody).subscribe((response) => {
      this.limpaFormulario();
      this.openSnackBar();
      this.router.navigate(['clientes']);
    },
    (error) => {
    this.dialog.open(ModalErrorComponent, {
        width: '400px', // largura da modal
        data: {
          cpfOrCnpj: this.clientePJForm.controls['cnpj'].value ? 'cnpj ja existe':'cpf ja existe'
          /* dados a serem passados para a modal */
        }
      });
    });
  }


}

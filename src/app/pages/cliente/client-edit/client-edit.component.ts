import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalErrorComponent } from 'src/app/core/components/modal-error/modal-error.component';
import { ClienteRequest, ClienteResponse } from 'src/app/shared/interfaces/dtos/cliente';
import { ClienteService } from 'src/app/shared/services/client.service';
import { Validator } from 'src/app/shared/utils/validator';

@Component({
  selector: 'app-client-edit',
  templateUrl: './client-edit.component.html',
  styleUrls: ['./client-edit.component.scss']
})
export class ClientEditComponent implements OnInit {


  clientePFForm!: FormGroup;
  clientePJForm!: FormGroup;
  publicForm!: FormGroup;

  reqBody!: ClienteRequest;
  resBody!: ClienteResponse;

  isDisabled: boolean = true;
  publicType: boolean = false;

  telefone: any;
  phones: any;

  telefones!: string[];


  constructor(
    private router: Router,
    private formBuilder: FormBuilder,
    private router2: ActivatedRoute,
    private clienteService: ClienteService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    const id = this.router2.snapshot.params['id'];

    this.clienteService.getClienteById(id).subscribe(response => {

      if(response){
        this.resBody = response;
        (this.resBody)
        this.telefones = this.resBody.telefones;
        this.createForm();
      }
    })

  }

  openSnackBar() {
    this.snackBar.open('Operação concluída com sucesso', 'Fechar', {
      duration: 5000, // duração em milissegundos
      panelClass: ['mat-toolbar', 'mat-primary'] // classes CSS adicionais
    });
  }

  createForm() {
    this.publicForm = this.formBuilder.group({
      tipoPublico:[this.resBody.tipoPublico,Validators.required]
    });

    this.publicForm.get('tipoPublico')!.valueChanges.subscribe(()=>{
      this.clientePFForm.get('cpf')?.reset('');
      this.clientePFForm.get('rg')?.reset('');
      this.clientePFForm.get('situacao')?.reset('');
      this.clientePFForm.get('telefones')?.reset('');
      this.clientePJForm.get('cnpj')?.reset('');
      this.clientePJForm.get('ie')?.reset('');
      this.clientePJForm.get('situacao')?.reset('');
      this.clientePJForm.get('telefones')?.reset('');
      this.telefones = [];
    })

    this.clientePFForm = this.formBuilder.group({
      codCliente: [{value: this.resBody.codCliente, disabled: true}],
      nome: [this.resBody.nome,Validators.required],
      cpf: [this.resBody.cpfOrCnpj,[Validators.required, Validator.isValidCpf()]],
      rg: [this.resBody.rgOrIe],
      situacao: [this.resBody.situacao],
      telefones: [this.resBody.telefones]
    });

    this.clientePJForm = this.formBuilder.group({
      codCliente: [{value:this.resBody.codCliente,disabled:true}],
      nome: [this.resBody.nome,Validators.required],
      cnpj: [this.resBody.cpfOrCnpj,[Validators.required,Validator.isValidCnpj()]],
      ie: [this.resBody.rgOrIe],
      situacao: [this.resBody.situacao],
      telefones: [this.resBody.telefones]
    })

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
    this.router.navigate(['']);
  }

  navigateToActuations() {
    document.querySelector('body')?.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.router.navigate(['']);
  }

  public removerMascaraTelefones(phone:string[]): any{

    const listNum = phone.map((res:string) => res.replace(/\D/g, ''));

    return listNum;
  }



  saveNewCliente() {
    (this.telefones)
    if(this.publicForm.controls['tipoPublico'].value === 'pessoaFisica'){
      var reqBody2:any = {
        codCliente: this.resBody.codCliente,
        nome: this.clientePFForm.controls['nome'].value,
        cpfOrCnpj: this.clientePFForm.controls['cpf'].value,
        rgOrIe: this.clientePFForm.controls['rg'].value,
        situacao: this.clientePFForm.controls['situacao'].value,
        tipoPublico: this.publicForm.controls['tipoPublico'].value,
        telefones: this.removerMascaraTelefones(this.telefones)
      }
    }

    if(this.publicForm.controls['tipoPublico'].value === 'pessoaJuridica'){
      var reqBody2:any = {
        codCliente: this.resBody.codCliente,
        nome: this.clientePJForm.controls['nome'].value,
        cpfOrCnpj: this.clientePJForm.controls['cnpj'].value,
        rgOrIe: this.clientePJForm.controls['ie'].value,
        situacao: this.clientePJForm.controls['situacao'].value,
        tipoPublico: this.publicForm.controls['tipoPublico'].value,
        telefones: this.removerMascaraTelefones(this.telefones)
      }
    }
    this.clienteService.update(reqBody2).subscribe((response) => {
      this.openSnackBar();
      this.router.navigate(['']);
    });
  }

}

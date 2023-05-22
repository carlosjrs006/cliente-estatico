import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { COMMA, ENTER } from '@angular/cdk/keycodes';
import { MatChipInputEvent } from '@angular/material/chips';

@Component({
  selector: 'app-people-form',
  templateUrl: './people-form.component.html',
  styleUrls: ['./people-form.component.scss']
})
export class PeopleFormComponent implements OnInit {

  @Input() formGroup!: FormGroup;

  @Output() saveClientePF = new EventEmitter();
  @Output() backNavigation = new EventEmitter();
  @Input() telefonesEdit: any;

  // Defina os separadores de teclado (vírgula e enter)
  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
  // Crie o FormControl para armazenar os números de telefone
  telefones: string[] = [];

  maskCPF: string = '000.000.000-00';
  CELLPHONE = '(00) 00000-0000';
  LANDLINE = '(00) 0000-0000';
  phoneMask = this.LANDLINE;
  phoneNumber = '';
  previusLength = 0;

  constructor() { }

  adicionarTelefone(event: MatChipInputEvent): void {
    const input = event.input;
    const value = event.value;

    // Adicione o número de telefone ao array
    if ((value || '').trim()) {
      this.telefones.push(value.trim());
    }

    // Limpe o campo de input
    if (input) {
      input.value = '';
    }

    // Atualize o FormControl com os números de telefone
    this.formGroup.get('telefones')?.setValue(this.telefones);
  }

  phoneKeyupMethod(){
    const phone = this.formGroup.get('telefones')?.value;
    if(phone){
      this.phoneNumber = phone;
      if(this.phoneNumber.length <= 10 && this.phoneMask === this.CELLPHONE){
        this.phoneMask= this.LANDLINE;
      }else if(this.phoneMask === this.LANDLINE && this.previusLength >= 10){
        this.phoneMask = this.CELLPHONE;
      }
      this.previusLength = this.phoneNumber.length;
    }
  }

  ngOnInit(): void {
    if(this.telefonesEdit){
      this.telefones = this.telefonesEdit;
    }
  }

  saveNewCliente(){
  	this.saveClientePF.emit();
  }

  backNavigationHandler(){
    this.backNavigation.emit();
  }

}

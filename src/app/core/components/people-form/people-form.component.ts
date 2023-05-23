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

  readonly separatorKeysCodes: number[] = [ENTER, COMMA];
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

    if ((value || '').trim()) {
      this.telefones.push(value.trim());
    }

    if (input) {
      input.value = '';
    }
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

  getmaskRg(rg: string){
    if(rg){
      if(rg.length === 9){
        return '00.000.000-0'
      }
      return'';
    }
    return'';
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

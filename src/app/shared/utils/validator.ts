import { AbstractControl, Validators } from "@angular/forms";

export class Validator {
  constructor(){}

  static isValidCpf(){
    return (control: AbstractControl): any => {
      const cpf = control.value;
      if(cpf){
        let numbers, digits, sum ,i, result, equalDigits;
        equalDigits = 1;
        if(cpf.length < 11){
          return null;
        }

        for(i = 0; i < cpf.length - 1; i++){
          if(cpf.charAt(i) !== cpf.charAt(i + 1)){
            equalDigits = 0;
            break;
          }
        }

        if(!equalDigits){
          numbers = cpf.substring(0, 9);
          digits = cpf.substring(9);
          sum = 0;
          for(i = 10; i > 1; i--){
            sum += numbers.charAt(10 - i) * i;
          }
          result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

          if(result !== Number(digits.charAt(0))){
            return {cpfNotValid: true};
          }
          numbers = cpf.substring(0,10);
          sum = 0;

          for(i = 11; i > 1; i--){
            sum += numbers.charAt(11 - i) * i;
          }
          result = sum % 11 < 2 ? 0 : 11 - (sum % 11);

          if(result !== Number(digits.charAt(1))){
            return { cpfNotValid: true};
          }
          return null;
        }else{
          return {cpfNotValid: true};
        }
      }
    };
  }

  static isValidCnpj(){
    return (control: AbstractControl): any => {
      const cnpj = control.value;

      if(cnpj == '' || cnpj == null) return null;
      if(cnpj.length != 14) return null;

      if(
        cnpj == '00000000000000' ||
        cnpj == '11111111111111' ||
        cnpj == '22222222222222' ||
        cnpj == '33333333333333' ||
        cnpj == '44444444444444' ||
        cnpj == '55555555555555' ||
        cnpj == '66666666666666' ||
        cnpj == '77777777777777' ||
        cnpj == '88888888888888' ||
        cnpj == '99999999999999'
      ){
        return { cnpjNotValid: true};
      }

      let tamanho = cnpj.length - 2;
      let numeros = cnpj.substring(0, tamanho);
      let digitos = cnpj.substring(tamanho);
      let soma = 0;
      let pos = tamanho - 7;
      for(let i = tamanho; i >= 1; i--){
        soma += numeros.charAt(tamanho - i) * pos--;
        if(pos < 2) pos = 9;
      }
      let resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if(resultado != digitos.charAt(0)) return {cnpjNotValid: true}

      tamanho = tamanho + 1;
      numeros = cnpj.substring(0,tamanho);
      soma = 0;
      pos = tamanho - 7;
      for(let i = tamanho; i >= 1; i--){
        soma += numeros.charAt(tamanho - i) * pos--;
        if(pos < 2) pos = 9;
      }
      resultado = soma % 11 < 2 ? 0 : 11 - (soma % 11);
      if(resultado != digitos.charAt(1)) return {cnpjNotValid: true};

      return null;
    }
  }

}

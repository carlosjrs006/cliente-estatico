import { FormGroup } from '@angular/forms';
import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-public-from',
  templateUrl: './public-from.component.html',
  styleUrls: ['./public-from.component.scss']
})
export class PublicFromComponent implements OnInit {

  @Input() formGroup!: FormGroup;

  labelPosition: 'pessoaFisica' | 'pessoaJuridica' = 'pessoaFisica';

  constructor() {}

  ngOnInit(): void {
  }

}

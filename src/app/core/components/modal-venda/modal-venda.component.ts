import { Component, Inject, EventEmitter, OnInit, Output } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';


@Component({
  selector: 'app-modal-venda',
  templateUrl: './modal-venda.component.html',
  styleUrls: ['./modal-venda.component.css']
})
export class ModalVendaComponent implements OnInit {
  selectedOption!: string;
  options: string[] = ['Pix', 'Dinheiro', 'Cartao Debito', 'Cartao Credito'];
  valorTotalVenda!: any;
  valorTroco!: any;
  valorPago!: any;



  finalizarVenda() {
    this.dialogRef.close({ finalizada: true, selectedOption: this.selectedOption });
  }

  constructor(@Inject(MAT_DIALOG_DATA) public data: any,private dialogRef: MatDialogRef<ModalVendaComponent>) { }

  ngOnInit(): void {
    this.calcularValorTotal();
  }

  calcularValorTotal() {
    const valorPago = parseFloat(this.valorPago);
    const valorTotalVenda = parseFloat(this.data.valorTotalVenda);
    this.valorTroco = valorPago - valorTotalVenda;
  }
}


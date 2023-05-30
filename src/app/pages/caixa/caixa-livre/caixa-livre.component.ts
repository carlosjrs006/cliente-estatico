import { Component, ElementRef, HostListener, OnInit, Renderer2, ViewChild } from '@angular/core';
import { FormControl, FormGroup, NgForm } from '@angular/forms';
import { MatAutocompleteSelectedEvent } from '@angular/material/autocomplete';
import { map, Observable, startWith, switchMap } from 'rxjs';
import { ProdutoService } from 'src/app/shared/services/produto.service';
import { VendaService } from 'src/app/shared/services/venda.service';
import { of } from 'rxjs';
import { ModalErrorComponent } from 'src/app/core/components/modal-error/modal-error.component';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ModalVendaComponent } from 'src/app/core/components/modal-venda/modal-venda.component';

@Component({
  selector: 'app-caixa-livre',
  templateUrl: './caixa-livre.component.html',
  styleUrls: ['./caixa-livre.component.scss']
})
export class CaixaLivreComponent implements OnInit {
  campoEntrada = new FormControl();
  quantidade = new FormControl();

  opcoes: any[] = [];
  opcoesFiltradas: Observable<any[]> | undefined;

  isOpenCalc: boolean = false;

  itensVenda: any[] = [];

  selectedOption: any;

  formVenda!: FormGroup;

  formaPagamento: any;

  produtos:any[] = [];


  desconto: number | null = null; // Valor inicial do desconto como null
  valorTotalVenda: number = 0;
  valorTotalSemDesconto: number = 0; // Valor total sem desconto

  calcularValorTotal() {
    if (this.desconto === null || this.desconto === 0) {
      this.valorTotalVenda = this.valorTotalSemDesconto;
    } else {
      const descontoDecimal = this.desconto / 100;
      const valorDesconto = this.valorTotalSemDesconto * descontoDecimal;
      this.valorTotalVenda = this.valorTotalSemDesconto - valorDesconto;
    }
  }

calcularValorTotalSemDesconto() {
  this.valorTotalVenda = this.itensVenda.reduce((total, item) => total + item.valorTotalItem, 0);
  this.valorTotalSemDesconto = this.valorTotalVenda;
}

cancelarVenda(){
  this.itensVenda = [];
}


fecharVenda(){
  const dialogRef =this.dialog.open(ModalVendaComponent, {
    height: '350px',
    width: '500px',
    data:{
      valorTotalVenda: this.valorTotalVenda
    }
  });

  dialogRef.afterClosed().subscribe((result) => {
    console.log(result);
    if (result && result.finalizada) {
      this.formaPagamento = result.selectedOption;
      this.executarAcaoFinalizarVenda();
    }
  });
}

executarAcaoFinalizarVenda() {
  this.itensVenda.map((item) => this.produtos.push(item.produto))
  const reqBody = {
    itens: this.itensVenda,
    valorTotalVenda: this.valorTotalVenda,
    formaPagamento: this.formaPagamento
  }
  if(reqBody.itens.length > 0 && reqBody.valorTotalVenda !== null && reqBody.formaPagamento !== null){
    this.vendaService.finalizarVenda(reqBody).subscribe((result) =>{
      this.limparCampos();
      this.openSnackBar();
    })
    console.log(reqBody);
  }
}

limparCampos(){
  this.quantidade.reset();
  this.selectedOption = null;
  this.campoEntrada.reset();
  this.itensVenda = [];
}

adiconarItem() {
  const valorTotalItem = parseFloat(this.quantidade.value) * parseFloat(this.selectedOption.valorProduto);

  const items = {
    produto: this.selectedOption,
    quantidade: this.quantidade.value,
    valorTotalItem: valorTotalItem
  };

  const itemExistente = this.itensVenda.find(item => item.produto.nomeProduto === items.produto.nomeProduto);

  if (itemExistente) {
    this.dialog.open(ModalErrorComponent, {
      width: '400px',
      data: {
        cpfOrCnpj: 'Produto já adicionado na lista de venda!'
      }
    });
  } else if (parseFloat(this.quantidade.value) > parseFloat(this.selectedOption.quantidade)) {
    this.dialog.open(ModalErrorComponent, {
      width: '400px',
      data: {
        cpfOrCnpj: 'Quantidade excedida! Verifique no seu estoque a quantidade.'
      }
    });
  } else if (parseFloat(this.quantidade.value) <= parseFloat(this.selectedOption.quantidade)) {
    this.itensVenda.push(items);
    this.quantidade.reset();
    this.selectedOption = null;
    this.campoEntrada.reset();
    this.calcularValorTotalSemDesconto(); // Atualiza o valor total sem desconto
    this.calcularValorTotal(); // Recalcula o valor total com o desconto aplicado
    console.log(this.itensVenda);
  }
}

removerItem(index: number) {
  this.itensVenda.splice(index, 1);
  this.calcularValorTotalSemDesconto(); // Atualiza o valor total sem desconto
  this.calcularValorTotal(); // Recalcula o valor total com o desconto aplicado
}

openSnackBar() {
  this.snackBar.open('Venda concluída com sucesso', 'Fechar', {
    duration: 5000, // duração em milissegundos
    panelClass: ['mat-toolbar', 'mat-primary'] // classes CSS adicionais
  });
}

ngOnInit() {
  this.calcularValorTotalSemDesconto();
}

  constructor(
    private produtoService: ProdutoService,
    private renderer: Renderer2,
    private vendaService: VendaService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {
    this.opcoesFiltradas = this.campoEntrada.valueChanges.pipe(
      startWith(''),
      switchMap(valor => {
        if (valor !== null && valor.length > 1) {
          return this.vendaService.getAllFiltroProdutos(valor);
        } else {
          return of([]);
        }
      })
    );
    this.opcoesFiltradas.subscribe(produtos => {
      this.opcoes = produtos;
    });
    this.calcularValorTotalSemDesconto();
  }


  abrirCalculadora(){
    return this.isOpenCalc = true;
  }

  fechar(){
    return this.isOpenCalc = false;
  }

  onOptionSelected(event: MatAutocompleteSelectedEvent) {
    this.selectedOption = event.option.value;
    this.campoEntrada.setValue(event.option.value.nomeProduto);
  }


}

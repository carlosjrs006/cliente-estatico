import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormControl, FormGroup } from '@angular/forms';
import { map, Observable, startWith } from 'rxjs';
import { ProdutoService } from 'src/app/shared/services/produto.service';

@Component({
  selector: 'app-caixa-livre',
  templateUrl: './caixa-livre.component.html',
  styleUrls: ['./caixa-livre.component.scss']
})
export class CaixaLivreComponent implements OnInit {


  campoEntrada = new FormControl();
  opcoes: any[] = [];
  opcoesFiltradas: Observable<any[]> | undefined;

  constructor(
    private produtoService: ProdutoService
  ) {
    console.log(this.campoEntrada.valueChanges)
    if(this.campoEntrada) {
      this.opcoesFiltradas = this.campoEntrada.valueChanges.pipe(
        startWith(''),
        map(valor => {
          this.produtoService.getAllProdutos().subscribe((produtos) => {
            this.opcoes = produtos;
          });
          return this.filtrarOpcoes(valor)
        })
      );
    }else{
      this.opcoes = [];
      this.opcoesFiltradas = undefined;
    }

  }

  ngOnInit(): void {

  }

  filtrarOpcoes(valor: string): string[] {
    const filtro = valor.toLowerCase();
    return this.opcoes.filter(opcao => opcao.nomeProduto.toLowerCase().includes(filtro));
  }
}

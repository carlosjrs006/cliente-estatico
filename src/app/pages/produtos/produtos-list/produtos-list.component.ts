import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { Router } from '@angular/router';
import { ProdutoService } from 'src/app/shared/services/produto.service';

@Component({
  selector: 'app-produtos-list',
  templateUrl: './produtos-list.component.html',
  styleUrls: ['./produtos-list.component.scss']
})
export class ProdutosListComponent implements OnInit {

  produtos: any[] = [];

  liveSearchValue: string = '';
  additionalFiltered: any;
  additionalList: any;

  displayedColumns: string[] = [
    'codProduto',
    'imagen',
    'nomeProduto',
    'quantidade',
    'situacao',
    'custoProduto',
    'valorProduto',
    'acoes'
  ];
  loading: boolean = true;

  imagens: any;

  // Variáveis de filtro
  filtroNome!: string;
  filtroSituacao!: string;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private produtoService: ProdutoService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getProdutos();
  }

  limpar(){
    this.filtroNome = '';
    this.filtroSituacao = '';
    this.getProdutos();
  }

  buscarPorFiltros(){
     if(this.filtroNome === '' && (this.filtroSituacao === undefined || this.filtroSituacao === '')){
       this.getProdutos();
    }else{
    this.produtoService.getAllFiltroProdutos(this.filtroNome, this.filtroSituacao).subscribe((res: any) => {
         this.produtos = res;
     })
     }

  }

  navigateToAddStock(){
    this.router.navigate(['produtos/cadastro-produto']);
  }

  getProdutos() {
     this.loading = true;
      this.produtoService.getAllProdutos().subscribe((res: any) => {
        if(res){
          console.log(res);
          this.produtos = res;
        }
        this.loading = false;
      })
   }

  editarItem(id: number): void {
    // Implemente a lógica de edição aqui
    this.router.navigate(['/produtos/editar-produto', id]);
  }

  excluirItem(id: number){
  // Implemente a lógica de edição aqui
  this.produtoService.deleteClienteById(id).subscribe((res) => {
    this.openSnackBar();
    this.getProdutos();
  })
  }

  openSnackBar() {
    this.snackBar.open('Produto deletado com sucesso', 'Fechar', {
      duration: 5000, // duração em milissegundos
      panelClass: ['mat-toolbar', 'mat-primary'] // classes CSS adicionais
    });
  }
}

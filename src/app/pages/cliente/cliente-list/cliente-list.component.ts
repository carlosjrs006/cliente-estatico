import { ClienteService } from 'src/app/shared/services/client.service';
import { Component, OnInit } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Router } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { interval, take } from 'rxjs';

const ELEMENT_DATA: any[] = [
  {codCliente: 1, nome: 'Hydrogen',situacao:'ativo', telefone: ['61992055814','61984878604','61992055814'], cpf: '07375900175',rg:'3197090'},
  {codCliente: 2, nome: 'Helium',situacao:'ativo', telefone: ['61992055814','61984878604'], cpf: '07375900175',rg:'3197090'},
  {codCliente: 3, nome: 'Lithium',situacao:'ativo', telefone: ['61992055814','61984878604'], cpf: '07375900175',rg:'3197090'},
  {codCliente: 4, nome: 'Beryllium',situacao:'ativo', telefone: ['61992055814','61984878604'], cpf: '07375900175',rg:'3197090'},
  {codCliente: 5, nome: 'Boron',situacao:'ativo', telefone: ['61992055814','61984878604'], cpf: '07375900175',rg:'3197090'},
  {codCliente: 6, nome: 'Carbon',situacao:'ativo', telefone: ['61992055814','61984878604'], cpf: '07375900175',rg:'3197090'},
  {codCliente: 7, nome: 'Nitrogen',situacao:'inativo', telefone: ['61992055814','61984878604'], cpf: '07375900175',rg:'3197090'},
  {codCliente: 8, nome: 'Oxygen',situacao:'inativo', telefone: ['61992055814','61984878604'], cpf: '07375900175',rg:'3197090'},
  {codCliente: 9, nome: 'Fluorine',situacao:'inativo', telefone: ['61992055814','61984878604'], cpf: '07375900175',rg:'3197090'},
  {codCliente: 10,nome: 'Neon',situacao:'ativo', telefone: ['61992055814','61984878604'], cpf: '07375900175',rg:'3197090'},
];

@Component({
  selector: 'app-cliente-list',
  templateUrl: './cliente-list.component.html',
  styleUrls: ['./cliente-list.component.scss']
})

export class ClienteListComponent implements OnInit {

  clientes: any[] = [];

  liveSearchValue: string = '';

  additionalFiltered: any;
  additionalList: any;

  dataSource = ELEMENT_DATA;

  displayedColumns: string[] = [
    'codCliente',
    'nome',
    'situacao',
    'telefone',
    'tipoPublico',
    'cpf',
    'rg',
    'dataCadastro',
    'acoes'
  ];
  loading: boolean = true;




  // Variáveis de filtro
  filtroNome!: string;
  filtroSituacao!: string;

  constructor(
    public dialog: MatDialog,
    private router: Router,
    private service: ClienteService,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    this.getClientes();
  }

  getDocMask(doc: string){
    return doc.length === 11 ? '000.000.000-00' :'00.000.000/0000-00';
  }


  limpar(){
    this.filtroNome = '';
    this.filtroSituacao = '';
    this.getClientes();
  }

  buscarPorFiltros(){
    if(this.filtroNome === '' && (this.filtroSituacao === undefined || this.filtroSituacao === '')){
      this.getClientes();
    }else{
      this.service.getAllFiltroClientes(this.filtroNome, this.filtroSituacao).subscribe(res => {
        this.clientes = res;
    })
    }

  }

  getRgOrIeMask(rgOrIeMask: string){
    return rgOrIeMask.length === 13 ? '000000000.00-00' :'00.000.000-0';
  }


  getPhoneMask(phone: string){
    return phone.length === 10 ? '(00) 0000-0000' : '(00) 00000-0000';
  }

  navigateToAddStock(){
    this.router.navigateByUrl('/cadastro-cliente');
  }

   getClientes() {
     this.loading = true;
      this.service.getAllClientes().subscribe(res => {
        if(res){
          this.clientes = res;
        }
        this.loading = false;
      })
   }

   // Função para lidar com a ação de edição
  editarItem(id: number): void {
    // Implemente a lógica de edição aqui
    this.router.navigate(['editar-cliente', id]);
  }

  excluirItem(id: number){
  // Implemente a lógica de edição aqui
  this.service.deleteClienteById(id).subscribe((res) => {
    this.openSnackBar();
    this.getClientes();
  })
  }

  openSnackBar() {
    this.snackBar.open('Cliente deletado com sucesso', 'Fechar', {
      duration: 5000, // duração em milissegundos
      panelClass: ['mat-toolbar', 'mat-primary'] // classes CSS adicionais
    });
  }

}

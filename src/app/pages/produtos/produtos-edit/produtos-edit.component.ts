import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { MatSnackBar } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { ModalErrorComponent } from 'src/app/core/components/modal-error/modal-error.component';
import { ProdutoService } from 'src/app/shared/services/produto.service';

@Component({
  selector: 'app-produtos-edit',
  templateUrl: './produtos-edit.component.html',
  styleUrls: ['./produtos-edit.component.scss']
})
export class ProdutosEditComponent implements OnInit {


  formGroup!: FormGroup

  imagen?: any;
  imagenMin?: any;

  resBody!:any;

  nomeImagem!: string;
  idImagem!: string;
  urlImagem!: string;

  mostrarTela: boolean = false;


  @ViewChild('imageInputFile') imagenFile!: ElementRef;

  constructor(
    private router: Router,
    private routeActivated: ActivatedRoute,
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) { }

  ngOnInit(): void {
    const id = this.routeActivated.snapshot.params['id'];

    this.produtoService.getClienteById(id).subscribe(response => {

      if(response){
        this.resBody = response;
        this.imagenMin = response.urlImagem;
        this.urlImagem = response.urlImagem;
        this.idImagem = response.idImagem;
        this.nomeImagem = response.nomeImagem;
        this.imagen = response.urlImagem;
        console.log(response);
        this.createForm();
        this.mostrarTela = true;
      }
    })


  }

  openSnackBar() {
    this.snackBar.open('Operação concluída com sucesso', 'Fechar', {
      duration: 5000, // duração em milissegundos
      panelClass: ['mat-toolbar', 'mat-primary'] // classes CSS adicionais
    });
  }


  saveNewProduto() {
    if (this.imagenFile.nativeElement.value) {
      this.upload();
    } else {
      this.saveProduct();
    }
  }

  saveProduct() {
    const reqBody = {
      codProduto:this.formGroup.controls['codProduto'].value,
      nomeProduto: this.formGroup.controls['nomeProduto'].value,
      custoProduto: this.formGroup.controls['custoProduto'].value,
      valorProduto: this.formGroup.controls['valorProduto'].value,
      quantidade: this.formGroup.controls['quantidade'].value,
      nomeImagem: this.nomeImagem,
      idImagem: this.idImagem,
      urlImagem: this.urlImagem
    }
    this.produtoService.update(reqBody).subscribe((data) => {
      this.limpaFormulario();
      this.openSnackBar();
      this.navigateToActuations()
    },
      (error) => {
        this.dialog.open(ModalErrorComponent, {
          width: '400px', // largura da modal
          data: {
            cpfOrCnpj: error.message
            /* dados a serem passados para a modal */
          }
        });
      });
  }

  upload() {
    if(this.urlImagem !== this.imagen || this.urlImagem !== ''){
      this.produtoService.upload(this.imagen).subscribe((data) => {
        console.log(data);
        this.idImagem = data.public_id;
        this.nomeImagem = data.original_filename;
        this.urlImagem = data.url;
        this.saveProduct();
      },
        (error) => {
          this.dialog.open(ModalErrorComponent, {
            width: '400px', // largura da modal
            data: {
              cpfOrCnpj: error.message
              /* dados a serem passados para a modal */
            }
          });
          this.resetArquivo();
        })
    }
  }

  onFileSelected(event: any) {
    this.imagen = event.target.files[0];
    // Faça algo com o arquivo selecionado
    console.log(this.imagen);
    const fr = new FileReader();
    fr.onload = (evento: any) => {
      this.imagenMin = evento.target.result;
    }
    fr.readAsDataURL(this.imagen);
  }

  resetArquivo() {
    this.imagen = null;
    this.imagenMin = null;
    this.idImagem = '';
    this.urlImagem = '';
    this.nomeImagem = '';
    this.formGroup.controls['imagen'].reset();
    this.imagenFile.nativeElement.value = '';
  }


  createForm() {
    this.formGroup = this.formBuilder.group({
      codProduto: [{ value: this.resBody.codProduto, disabled: true }],
      situacao: [{ value: this.resBody.situacao, disabled: true }],
      valorProduto: [this.resBody.valorProduto],
      quantidade: [this.resBody.quantidade],
      custoProduto: [this.resBody.custoProduto],
      imagen: [this.resBody.imagen],
      nomeProduto: [this.resBody.nomeProduto]
    });

  }

  limpaFormulario() {
    this.formGroup.reset();
    this.resetArquivo();
  }


  backNavigationHandler() {
    document.querySelector('body')?.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.router.navigate(['produtos']);
  }

  navigateToActuations() {
    document.querySelector('body')?.scroll({
      top: 0,
      left: 0,
      behavior: 'smooth',
    });
    this.router.navigate(['produtos']);
  }
}

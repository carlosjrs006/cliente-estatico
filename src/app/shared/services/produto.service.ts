import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { Imagen } from '../interfaces/dtos/imagen';



@Injectable({
  providedIn: 'root'
})
export class ProdutoService {

  apiURL: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  save(reqBody: any): Observable<any> {
    return this.http.post<any>(`${this.apiURL}produtos`, reqBody);
  }
  upload(imagen: File): Observable<any> {
    const formData = new FormData();
    formData.append('multipartFile',imagen);
    return this.http.post<any>(`${this.apiURL}storege/upload`, formData);
  }

  deleteClienteById(id: any): Observable<any>{
    return this.http.delete<any>(`${this.apiURL}storege/delete/${id}`)
  }

  getAllProdutos(): Observable<any>{
    return this.http.get<any>(`${this.apiURL}produtos`)
  }

  getAllFiltroProdutos(nomeProduto: string, situacao: string): Observable<any>{
    return this.http.get<any>(`${this.apiURL}produtos/filtros?nomeProduto=${(nomeProduto === undefined)?'': nomeProduto}&situacao=${(situacao === undefined)?'': situacao}`)
  }

}

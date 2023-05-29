import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';



@Injectable({
  providedIn: 'root'
})
export class VendaService {

  apiURL: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  getAllFiltroProdutos(nomeProduto: string): Observable<any>{
    return this.http.get<any>(`${this.apiURL}venda/filtros?nomeProduto=${(nomeProduto === undefined)?'': nomeProduto}`)
  }


}

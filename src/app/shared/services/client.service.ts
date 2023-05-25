import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ClienteRequest, ClienteResponse } from './../interfaces/dtos/cliente';



@Injectable({
  providedIn: 'root'
})
export class ClienteService {


  apiURL: string = environment.apiBaseUrl;

  headers = {
    'Access-Control-Allow-Origin': '*', // Permitir solicitações de todos os domínios
    'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE', // Métodos permitidos
    'Access-Control-Allow-Headers': '*', // Permitir todos os cabeçalhos
  };

  constructor(private http: HttpClient) {

  }

  save(cliente: ClienteRequest): Observable<any> {
    return this.http.post<any>(`${this.apiURL}clientes`, cliente,{headers:this.headers});
  }

  getAllClientes(): Observable<any>{

    return this.http.get<any>(`${this.apiURL}clientes`, {headers:this.headers})
  }

  getAllFiltroClientes(nome: string, situacao: string): Observable<any>{
    return this.http.get<any>(`${this.apiURL}clientes/filtros?nome=${(nome === undefined)?'': nome}&situacao=${(situacao === undefined)?'': situacao}`,{headers:this.headers})
  }

  deleteClienteById(id: any): Observable<any>{
    return this.http.delete<any>(`${this.apiURL}clientes/${id}`,{headers:this.headers})
  }

  getClienteById(id: any): Observable<ClienteResponse>{
    return this.http.get<ClienteResponse>(`${this.apiURL}clientes/${id}`,{headers:this.headers})
  }

  update(cliente: ClienteRequest): Observable<any>{
    return this.http.put<any>(`${this.apiURL}clientes/editar-cliente`, cliente,{headers:this.headers});
  }
}

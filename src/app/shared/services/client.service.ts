import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';

import { ClienteRequest, ClienteResponse } from './../interfaces/dtos/cliente';



@Injectable({
  providedIn: 'root'
})
export class ClienteService {

  apiURL: string = environment.apiBaseUrl;

  constructor(private http: HttpClient) { }

  save(cliente: ClienteRequest): Observable<any> {
    console.log(cliente);
    return this.http.post<any>(`${this.apiURL}clientes`, cliente);
  }

  getAllClientes(): Observable<any>{
    return this.http.get<any>(`${this.apiURL}clientes`)
  }

  getAllFiltroClientes(nome: string, situacao: string): Observable<any>{
    return this.http.get<any>(`${this.apiURL}clientes/filtros?nome=${(nome === undefined)?'': nome}&situacao=${(situacao === undefined)?'': situacao}`)
  }

  deleteClienteById(id: any): Observable<any>{
    return this.http.delete<any>(`${this.apiURL}clientes/${id}`)
  }

  getClienteById(id: any): Observable<ClienteResponse>{
    return this.http.get<ClienteResponse>(`${this.apiURL}clientes/${id}`)
  }

  update(cliente: ClienteRequest){
    return this.http.put<any>(`${this.apiURL}clientes/editar-cliente`, cliente);
  }
}

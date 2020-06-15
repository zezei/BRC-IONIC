import { Injectable, EventEmitter } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { CommonService } from './common.service';
import { Cliente, Plan, Microciclo, Entrenamiento, Ejercicio } from '../interfaces/interfaces';


const URL = environment.url;
@Injectable({
  providedIn: 'root'
})
export class AdminService {

  nuevoCliente: EventEmitter<Cliente> = new EventEmitter<Cliente>();
  planActualizado: EventEmitter<Plan> = new EventEmitter<Plan>();
  ejercicios: Ejercicio[];
  constructor(private http: HttpClient, private commonService: CommonService) { }

  getClientes(){
    return this.http.get(`${URL}/clientes?token=${this.commonService.token}`);
  }

  getCliente(id:string){
    return this.http.get(`${URL}/clientes/${id}`);
  }
  crearCliente(cliente: Cliente) {
    return new Promise( (resolve)=>{
      this.http.post(`${URL}/clientes`,cliente).subscribe((data:any) => {
          if (data.ok){
            console.log(data)
            this.nuevoCliente.emit(data.cliente);
            resolve(true);
          }
          else{
            resolve(false)
          }
        })

    })
  }

  crearPlanParaCliente(cliente: Cliente, plan: Plan ){
      return new Promise( (resolve)=>{
        this.http.post(`${URL}/clientes/${cliente.id}/planes?token=${this.commonService.token}`, plan)
          .subscribe((data: any) => {
            console.log("La data recibida es ", data)
            if (data.ok){
              cliente.planes.unshift(data.plan);
              resolve(true);
            }
            else{
              resolve(false)
            }
          })
  
      })

  }

  getPlanCliente(clienteId: string,planId: string){
    return this.http.get(`${URL}/clientes/${clienteId}/planes/${planId}`);
  }

  crearEntrenmiento(fecha: Date, microciclo: Microciclo, clienteId: string){
    return new Promise( resolve=>{
      this.http.post(`${URL}/clientes/${clienteId}/planes/${microciclo.plan_id}/microciclos/${microciclo.id}/entrenamientos?fecha=${fecha}`, '')
      .subscribe((data) => {
        console.log(data)
        if (data['ok']){
          let entreno: Entrenamiento = data['entreno']
          if (!microciclo.entrenamientos) {
            microciclo.entrenamientos = [];
          }
          microciclo.entrenamientos.unshift(entreno);
          console.log(microciclo)
          resolve(true)
        }
        else{
          resolve(false)
        }

      })
    })

  }

  obtenerEjerciciosCompletos(clienteId: string, planId: string, miercocicloId:string, entrenoId: string){
    return new Promise( resolve=>{
      this.http.get(`${URL}/clientes/${clienteId}/planes/${planId}/microciclos/${miercocicloId}/entrenamientos/${entrenoId}/ejerciciosCompletos`)
      .subscribe(data=>{
        let entreno = data['entrenoData']
        resolve(entreno)
      })

    })
  }

  obtenerEntrenamiento(clienteId: string, planId: string, miercocicloId:string, entrenoId: string){
    return new Promise( resolve=>{
      this.http.get(`${URL}/clientes/${clienteId}/planes/${planId}/microciclos/${miercocicloId}/entrenamientos/${entrenoId}`)
      .subscribe(data=>{
        let entreno = data['entreno']
        resolve(entreno)
      })

    })
  }

  actualizarEntrenamiento(clienteId: string, planId: string, miercocicloId:string, entrenoId: string, entrenamiento: Entrenamiento){
    return new Promise( resolve=>{
      this.http.put(`${URL}/clientes/${clienteId}/planes/${planId}/microciclos/${miercocicloId}/entrenamientos/${entrenoId}`, entrenamiento)
      .subscribe(data=>{
        if (data['ok']){
          resolve(true)
        }
        else{
          resolve(false)
        }
      })

    })
  }
  
  avtualizarDatosPlan(plan: Plan){
    return new Promise( resolve =>{
      this.http.put(`${URL}/clientes/${plan.cliente}/planes/${plan.id}`, plan).subscribe( data=>{
        console.log(data)
        if (data['ok']){
          this.planActualizado.emit(plan);
          resolve(true)
        }
        else{
          resolve(false)
        }
      })
    })
  }

  getCopiaEjercicios(){
    return [...this.ejercicios];
  }

  getEjercicios(){
    return new Promise<Ejercicio[]>( resolve=>{
      this.http.get(`${URL}/ejercicios`).subscribe(data => {
        this.ejercicios = data['ejerciciosData']
        console.log(this.ejercicios)
        resolve(data['ejerciciosData'])

    })
    })

  }

  crearCircuito(){
    return new Promise(resolve=>{
      this.http.post(`${URL}/bloques`,{}).subscribe(data=>{
        console.log(data)
        if (data['ok']){
          resolve(data['circuito'])
        }
      })
    })
  }
}

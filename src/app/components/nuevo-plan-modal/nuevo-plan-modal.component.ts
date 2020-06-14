import { Component, OnInit, Input } from '@angular/core';
import { Plan, Cliente } from 'src/app/interfaces/interfaces';
import { ModalController } from '@ionic/angular';
import { AdminService } from 'src/app/services/admin.service';
import { GuiService } from 'src/app/services/gui.service';


@Component({
  selector: 'app-nuevo-plan-modal',
  templateUrl: './nuevo-plan-modal.component.html',
  styleUrls: ['./nuevo-plan-modal.component.scss'],
})
export class NuevoPlanModalComponent implements OnInit {
  tiposPlan: string[] = ['Funcional', 'Trail Running', 'Amplitud de movimiento', 'Readptación']
  categorias = [
    {
      categoria: 'CORE',
      subcategorias: ["ANTIFLEXION", "ANTIEXTENSION", "ANTIROTACION", "COMBINADO"]
    }, {
      categoria: 'MMII',
      subcategorias: ["BILATERAL", "UNILATERAL", "COMBINADO"]
    },
    {categoria:'MMSS',
    subcategorias:["BILATERAL", "UNILATERAL", "COMBINADO"]
    }, 
    {
      categoria: 'COMBINADOS',
      subcategorias: ["BILATERAL", "UNILATERAL", "CONTRALATERAL"]
    },
    {
      categoria: 'COORDINACION',
      subcategorias: ["ESTABILIDAD", "CAMBIOS DE DIRECCION", "EQUILIBRIO", "RITMO", "ORIENTACION ESPACIAL"]
    }
  ]
  plan: Plan = {}
  numeroPlan;
  fechaVto;
  creando=false;
  @Input() cliente: Cliente;
  constructor(private modalCtrl: ModalController, private adminService: AdminService, private guiService: GuiService) { }

  ngOnInit() {
    console.log(this.cliente)
  }

  actualizarNumeroPlan(event){
    let planes = this.cliente.planes.filter(planData=> planData.tipo === event.detail.value);
    this.numeroPlan = planes.length + 1;
  }
  calcularFechaVto(event){
    console.log(event)
    let fechaAux = new Date(event.detail.value);
    this.fechaVto = new Date(fechaAux.setDate(fechaAux.getDate() + 28));
  }

  async crearPlan(){
    this.creando = true;
    let creado = await this.adminService.crearPlanParaCliente(this.cliente,this.plan);
    if (creado){{
      this.guiService.alertToast("El plan fue agregado exitosamente")
      this.modalCtrl.dismiss();
    }}
    else{
      this.guiService.alertToast("Error al crear el plan")

      this.creando = false;
    }
  }


  close(){
    this.modalCtrl.dismiss();
  }
}

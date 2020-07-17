import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class DataLocalService {



  zonas = [
    {
      nro: '1',
      rpe: '1-3',
      intensidad: 'Muy Suave',
      descripcion: 'Entrada en calor',
      vamMin: 0,
      vamMax: 0.40,
      fctmMin: 50,
      fctmMax: 60,
      zona: 1
    },
    {
      nro: '2',
      rpe: '3-4',
      intensidad: 'Suave',
      descripcion: 'Regenerativo',
      vamMin: 0.40,
      vamMax: 0.50,
      fctmMin: 60,
      fctmMax: 70,
    },
    {
      nro: '2-3',
      rpe: '4-5',
      intensidad: 'Moderado',
      descripcion: 'Fondo - Umbral Aero',
      vamMin: 0.50,
      vamMax: 0.60,
      fctmMin: 70,
      fctmMax: 75,
    },
    {
      nro: '3',
      rpe: '5-6',
      intensidad: 'Algo Duro',
      descripcion: 'Fat Max',
      vamMin: 0.60,
      vamMax: 0.70,
      fctmMin: 75,
      fctmMax: 82,
    },
    {
      nro: '4',
      rpe: '6-7',
      intensidad: 'Duro',
      descripcion: 'Cap.VO2mx - umbral an',
      vamMin: 0.70,
      vamMax: 0.85,
      fctmMin: 82,
      fctmMax: 89,
    },
    {
      nro: '4-5',
      rpe: '8-9',
      intensidad: 'Muy Duro',
      descripcion: 'Post .VO2mx - supra umbral',
      vamMin: 0.85,
      vamMax: 0.90,
      fctmMin: 90,
      fctmMax: 95,
    },
    {
      nro: '5',
      rpe: '10',
      intensidad: 'Muy muy Duro',
      descripcion: 'Cap. Anae - VAM',
      vamMin: 0.90,
      vamMax: 1,
      fctmMin: 95,
      fctmMax: 100,
    },
    {
      nro: '>5',
      rpe: '10',
      intensidad: 'Maximo',
      descripcion: 'Supra VoO2max - Sprint',
      vamMin: 1,
      vamMax: 1,
      fctmMin: 100,
      fctmMax: 1000,
    },
  ]

  intensidades = [
    {
      valor: 'muy_suave',
      nombre: 'Muy suave'
    },
    {
      valor: 'suave',
      nombre: 'Suave'
    },
    {
      valor: 'moderado',
      nombre: 'Moderado'
    },
    {
      valor: 'fuerte',
      nombre: 'Fuerte'
    },
    {
      valor: 'muy_fuerte',
      nombre: 'Muy fuerte'
    }
  ]

  medios = [
    {
      nombre: 'Carrera',
      terrenos: [
        {
          nombre: 'Calle'
        },
        {
          nombre: 'Trail Running'
        },
        {
          nombre: 'Cinta'
        },
        {
          nombre: 'Pista'
        },
        {
          nombre: 'Obstaculos'
        },
      ]

    },
    {
      nombre: 'Ciclismo',
      terrenos: [
        {
          nombre: 'BMX'
        },
        {
          nombre: 'MTB'
        },
        {
          nombre: 'Pista'
        },
        {
          nombre: 'Ruta'
        },
        {
          nombre: 'Indoor'
        },
        {
          nombre: 'Downhill'
        },
      ]
    },
    {
      nombre: 'Caminata',
      terrenos: [
        {
          nombre: 'Senderismo'
        },
        {
          nombre: 'Montañismo'
        },
        {
          nombre: 'Pista'
        },
        {
          nombre: 'Paseo'
        },
      ]
    },
    {
      nombre: 'Transicion',
      terrenos: [
        {
          nombre: 'Bicicleta-carrera'
        },
        {
          nombre: 'Carrera-Bicicleta'
        },
        {
          nombre: 'Natacion-Bicicleta'
        },
      ]
    },
    {
      nombre: 'Invernales',
      terrenos: [
        {
          nombre: 'Esqui de travesia'
        },
        {
          nombre: 'Esqui Alpino'
        },
        {
          nombre: 'Snowboard'
        },
        {
          nombre: 'Caminata con raquetas'
        },
      ]
    },
    {
      nombre: 'Gimnasio y Fitness',
      terrenos: [
        {
          nombre: 'Cardio'
        },
        {
          nombre: 'Eliptica'
        },
        {
          nombre: 'Fuerza'
        },
        {
          nombre: 'Pilates'
        },
        {
          nombre: 'Baile'
        },
        {
          nombre: 'Crossfit'
        },
        {
          nombre: 'Yoga'
        },
      ]
    },
    {
      nombre: 'Escalada',
      terrenos: [
        {
          nombre: 'En Bloque'
        },
        {
          nombre: 'En Interiores'
        },
        {
          nombre: 'En Roca'
        },
      ]
    },
    {
      nombre: 'Acuaticos',
      terrenos: [
        {
          nombre: 'Canoa'
        },
        {
          nombre: 'Kayak'
        },
        {
          nombre: 'Kitesurf'
        },
        {
          nombre: 'Remo'
        },
        {
          nombre: 'Windsurf'
        },
        {
          nombre: 'Buceo'
        },
      ]
    },
  ]

  terrenos = [
    {
      valor: 'calle',
      nombre: 'Calle'
    },
    {
      valor: 'trail',
      nombre: 'Trail'
    },
    {
      valor: 'mountain',
      nombre: 'Montaña'
    },
    {
      valor: 'ruta',
      nombre: 'Ruta'
    },
    {
      valor: 'sendero',
      nombre: 'Sendero'
    },
    {
      valor: 'mixto',
      nombre: 'Mixto'
    }
  ]

  niveles = [
    {
      nro: 1,
      nombre: 'Inicial',
      vamMin: 800,
      vamMax: 600,
    },
    {
      nro: 2,
      nombre: 'Basico 1',
      vamMin: 600,
      vamMax: 450,
    },
    {
      nro: 3,
      nombre: 'Basico 2',
      vamMin: 450,
      vamMax: 360,
    },
    {
      nro: 4,
      nombre: 'Basico 3',
      vamMin: 360,
      vamMax: 327,
    },
    {
      nro: 5,
      nombre: 'Intermedio 1',
      vamMin: 327,
      vamMax: 300,
    },
    {
      nro: 6,
      nombre: 'Intermedio 2',
      vamMin: 300,
      vamMax: 257,
    },
    {
      nro: 7,
      nombre: 'Intermedio 3',
      vamMin: 257,
      vamMax: 225,
    },
    {
      nro: 8,
      nombre: 'Avanzado 1',
      vamMin: 225,
      vamMax: 200,
    },
    {
      nro: 9,
      nombre: 'Avanzado 2',
      vamMin: 200,
      vamMax: 180,
    },
    {
      nro: 10,
      nombre: 'Elite',
      vamMin: 180,
      vamMax: 120,
    },
  ]

  tiposEtrenosRunning = [
    {
      nombre: 'Contiuno Variable',
      valor: 'cv'
      
    },
    {
      nombre: 'Contiuno Estable',
      valor: 'ce'
      
    },
    {
      nombre: 'Fraccionado',
      valor: 'fr'
      
    },
    {
      nombre: 'Progresivo',
      valor: 'pr'
      
    },
    {
      nombre: 'Escalonado',
      valor: 'es'
      
    },
    {
      nombre: 'Pasadas Triangulares',
      valor: 'tri'
      
    },
  ]
  constructor() { }



  getDistancia(tiempo: number, desnivel: number, rpe: string, nivelCliente: number){
    console.log("EL nivel del cliente es", nivelCliente)
    let ritmoCliente = this.getRitmoCliente(rpe, nivelCliente)/60;
    console.log("El ritmo del cliente es", ritmoCliente)
    let distanciaRecorrida = tiempo/ritmoCliente;
    console.log("La distancia a recorrer en llano seria", distanciaRecorrida)
    let desnivelPorKm = desnivel / distanciaRecorrida;
    let tiempoRetrasoPorDesnivel = (desnivelPorKm / 20 * 0.066 * ritmoCliente * distanciaRecorrida)
    let distanciaARestar = tiempoRetrasoPorDesnivel/ritmoCliente;
    console.log("La distancia a a restar oir desbuvek seria", distanciaARestar)

    return distanciaRecorrida - distanciaARestar;
  }

  getTiempo(distancia: number, desnivel: number, rpe: string, nivelCliente: number) {
    console.log(distancia)
    let ritmoCliente = this.getRitmoCliente(rpe, nivelCliente);
    let desnivelPorKm = desnivel / distancia;
    console.log("Ritmo Cliente", ritmoCliente)
    console.log(desnivelPorKm)
    console.log(desnivelPorKm / 20 * 0.066 * ritmoCliente * distancia)
    return (desnivelPorKm / 20 * 0.088 * ritmoCliente * distancia) + (ritmoCliente*distancia);
  }


  getRitmoCliente(rpe: string, nivelCliente: number) {
    let vam = this.getVam(nivelCliente);
    let zona = this.zonas.find(zona => zona.rpe === rpe);
    if (zona.nro === '1') {

      console.log("Zona trank")
      return vam + vam * (1-zona.vamMax);
    }
    return vam + vam *(1-(zona.vamMax + zona.vamMin) / 2);


  }

  getVam(nivelCliente: number) {
    let nivel = this.niveles.find(nivel => nivel.nro === nivelCliente);
    return (nivel.vamMax + nivel.vamMin) / 2
  }

}

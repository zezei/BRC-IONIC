
  export interface Cliente {
    id?: string;
    email?: string;
    dni?: string;
    nombre?: string;
    telefono?: string;
    apellido?: string;
    planes?: Plan[];
    uid?: string;
  }
  
  export interface Plan {
    id?: string;
    fecha_vto?: Fecha;
    tipo?: string;
    nro?: number;
    cliente?: string;
    valor?: number;
    fecha_inicio?: Fecha;
    microciclos?: Microciclo[];
    pagado?: boolean
    objetivos_generales?: string;
    objetivos_especificos?: string;
  }
  
  export interface Microciclo {
    id: string;
    entrenamientos: Entrenamiento[];
    nro: string;

    fecha_inicio?: Fecha;
    fecha_fin?: Fecha;
    plan_id?: string;
  }
  
  export interface Entrenamiento {
    id: string;
    fecha: Fecha;
    ejercicios_entrada_calor: EjercicioRef[];
    ejercicios_parte_princial: EjercicioRef[];
    ec_completa: EjerciciosCompletos[];
    pp_completa: EjerciciosCompletos[];
    vc_completa: EjerciciosCompletos[]
    turno: string;
    ejercicios_vuelta_a_calma: EjercicioRef[];
  }
  
  export interface EjercicioRef {
    refId: string;
    orden: string;
  }
  
  export interface Fecha {
    _seconds: number;
    _nanoseconds: number;
  }

  export interface Circuito{
    nombre_circuito?: string;
    id?: string;
    series?: number;
    pausa_entre_series?: number;
    pausa_entre_repeticiones?: number;
    ejercicios?: Ejercicio[];

  }

  export interface Serie{
    nombre_serie?: string;
    id?: string;
    ejercicios?: EjercicioSerie[];

  }

  export interface Ejercicio{ //Esto tiene que ser EjercicioCircuito
    foto?: string,
    intensidad?: string,
    categoria: string,
    subcategoria: string,
    id?: string,
    repeticiones?: number,
    video?: string,
    nombre?: string,
    descripcion?: string,
    seleccionado?: boolean,
    etiquetas?: string[]
  }

  export interface EjercicioSerie{
    foto?: string,
    intensidad?: string,
    id?: string,
    repeticiones?: number,
    video?: string,
    nombre?: string,
    series?:number,
    descripcion?: string,
    seleccionado?: boolean
    pausa?: number
  }

export interface EjerciciosCompletos {
  orden?: number,
  tipo?: string,
  serie?: Serie,
  circuito?: Circuito
}

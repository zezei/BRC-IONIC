  export interface Cliente {
    id?: string;
    email?: string;
    dni?: string;
    nombre?: string;
    telefono?: string;
    apellido?: string;
    planes?: Plan[];
    uid?: string;
    strava_code?: string;
    nivel?: number;
    historialPeso?: Peso[];
  }
  
  export interface Peso{
    fecha?: Date,
    peso: number,
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
    seleccionado?: boolean;
  }
  
  export interface Microciclo {
    id: string;
    entrenamientos?: Entrenamiento[];
    seleccionado?: boolean;
    nro: string;
    fecha_inicio?: Fecha;
    fecha_fin?: Fecha;
    plan_id?: string;
    tipo?: string;
    showEntrenos?: boolean;
    volTotal?: number;
  }
  
  export interface Entrenamiento {
    id?: string;
    fecha?: Fecha;
    medio?: string;
    actividad?: string;
    actividadPrincipal?: string;
    entrada_calor_running?: Running;
    parte_principal?: ActividadRunning;
    vuelta_a_calma_running?: Running;
    ejercicios_entrada_calor?: ParteEntreno[];
    ejercicios_parte_princial?: ParteEntreno[];
    ejercicios_vuelta_a_calma?: ParteEntreno[];
    texto?: string;
    volTotalEstimado?: number;
    distanciaTotalEstimada?: number;
    desnivelTotal?: number;
    completo?: boolean;
    feedback?: Feedback;
    volPorZona?: VolumenZona;
  }
  

  export interface VolumenZona {
    '1-3'?: number,
    '3-4'?: number,
    '4-5'?: number,
    '5-6'?: number,
    '6-7'?: number,
    '8-9'?: number,
    '10'?: number,
  }
  export interface Feedback {
    rpe?: number; //1 al 5
    clima?: string;
    registro_strava?: boolean;
    fecha_realizacion?: Date;
    observaciones?: string;
    volTotal?: number;
    desnivel?: number;
    tiempoTranscurrido?: string; 
  }
  export interface ActividadRunning{
    contiuno_estable?: ContinuoEstable;
    contiuno_variable?: ContiunoVariable;
    fraccionado?: Fraccionado;
    progresivo?: Progresivo;
  
  }

  export interface Progresivo{
    volTotal?: number;
    volTipo?: string;
    series?: number;
    pausaEntreSeries?: number;
    intensidadPausa?: string;
    bloques?: BloquePr[];
    desnivel?: number;
  }
  
  export interface BloquePr{
    vol?: number;
    intensidad?: string;
  }
  export interface Fraccionado{
    bloques?: BloqueFR[];
    pausaEntreBloques?: any;
    intensidadPausa?: string;
    observaciones?: string;
    volTotal?: number;

  }

  export interface BloqueFR{
    series?: number;
    repeticiones?: number;
    volTipo?:string;
    vol?: number;
    intensidad?: string;
    pausaEntreRepeticiones?: any;
    intensidadPausa?: string;
    desnivel?: string;
    terreno?: string;
  }
  export interface ContinuoEstable{
    volumenTotalEstimado?: number;
    volUnidad?: string;
    vol?: number;
    intensidad?: string;
    desnivel?: number;
    terreno?: string;
    observaciones?: string;
  }
  export interface ParteEntreno {
    orden?: string;
    circuito?: Circuito;
    serie?: Serie;
    running?: Running;
  }
  
  export interface ContiunoVariable{
    volumenTotalEstimado?: number;
    bloques?: BloqueCV[];
    pausaEntreBloques?: any;
    unidadPausa?: string;
    intensidadPausa?: string;
    desnivelTotal?: number;
  }

  export interface BloqueCV{
    volTipo?: string;
    vol?: any;
    desnivel?: number;
    volUnidadA?: string;
    volUnidadB?: string;
    intensidadA?: string;
    intensidadB?: string;
    volVarA?: number;
    volVarB?: number;
    terreno?: string;
  }

  export interface Running {
    volUnidad?: string;
    volumen?: number;
    intensidad?: string;
    observaciones?:string;
  }
  export interface Fecha {
    _seconds: number;
    _nanoseconds: number;
  }

  export interface Circuito{
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


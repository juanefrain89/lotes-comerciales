import { Component, Renderer2, OnInit, HostListener , ElementRef, ViewChild, AfterViewInit} from '@angular/core';
import { ObserverService } from '../../services/observer.service';
import { ContactFormComponent } from "../../core/contact-form/contact-form.component";

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FirstService } from '../../first.service';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [ContactFormComponent, CommonModule, HttpClientModule, ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent implements OnInit {
  fadeIn: string = 'fadeIn';
  @ViewChild('imagenAnimada', { static: false }) imagenAnimada!: ElementRef
  show: boolean = false;

  
  constructor(private renderer: Renderer2,  private el: ElementRef, private servicio: FirstService) {
  }
  menu: HTMLElement | null = null;

confirmar = true

hamburgesa(){

  if (this.menu) {
if (this.confirmar == true) {
  this.menu.style.transform = "translateY(100%)"
  this.confirmar = false
}else{
  this.menu.style.transform ="translateY(-500px)"
  this.confirmar = true
}
    
    
  }
}





closeModal() {
  this.show = false;
}
showModal() {
  this.show = true;
}


activo =1
datos: any = [];

general: any=[]

handleactivo(numero: any){
  this.activo = numero
  if (numero == 1) {
    this.datos = this.general.uno
    
  }
  if(numero == 2){
    this.datos = this.general.dos

  }
  if (numero == 3) {
    this.datos = this.general.tres
    
  }


}


  ngOnInit() {

    
this.servicio.primero().subscribe(
  (date)=>
    {
    this.general = date
    this.datos=this.general.uno
    console.log(date);
    
  },
  (error)=>{
    console.log(error);
    
  }
)
    


    setTimeout(() => this.syncHeights(), 0);
    this.menu = document.querySelector(".hamburguesa") // Esperar hasta que Angular haya aplicado los estilos
  }

  @HostListener('window:resize')
  onResize() {
    this.syncHeights(); // Ajustar alturas cuando se cambia el tamaño de la ventana
  }

  private syncHeights() {
    const sesion3 = document.querySelector('.sesion3') as HTMLElement;
    const fondo2 = document.querySelector('.fondo2') as HTMLElement;
    const contenedor = this.renderer.selectRootElement('.hijo-grid5', true);
    const imagen = this.renderer.selectRootElement('.imagen2', true);
    if (sesion3 && fondo2) {
      const alturaSesion3 = sesion3.getBoundingClientRect().height; // Obtener altura real
      
      this.renderer.setStyle(fondo2, 'height', `${alturaSesion3}px`);
    }
    if (contenedor && imagen) {
      const alturaSesion3 = contenedor.getBoundingClientRect().height;
//      this.renderer.setStyle(imagen, 'height', `${alturaSesion3}px`);
    }

  }


  diapositivaActual2: number = 0;
  slides2: NodeListOf<Element> = document.querySelectorAll('.slide2');






 
  x = document.querySelector(".container2");

  anterior = document.querySelectorAll(".anterior");
  
  item = 0;
  
  atrasar() {
    const hijos = document.querySelectorAll<HTMLElement>(".hijos");
  
    if (hijos.length > 0) {
    
      hijos[this.item].style.display = "none";
      this.item = this.item - 1 >= 0 ? this.item - 1 : hijos.length - 1;
      setTimeout(() => {
        hijos[this.item].style.display = "grid";
      }, 100); // Puedes ajustar el tiempo para hacer más suave la transición
    } else {
      console.error("No se encontró ningún elemento con la clase '.hijos'.");
    }
  }
  
  
  
  adelantar() {
  
  
  
  
  
  
  
  
  
  
  
    const hijos = document.querySelectorAll<HTMLElement>(".hijos");
  
    if (hijos.length > 0) {
      // Mover el hijo actual fuera de vista (a la derecha)
      hijos[this.item].style.display = "none"
      
      ;
  
      // Calcular el índice del siguiente elemento
      const nextItem = this.item + 1 < hijos.length ? this.item + 1 : 0;
  console.log(nextItem);
    
      hijos[nextItem].style.display = "none"; 
        setTimeout(() => {
        hijos[nextItem].style.display = "grid"; 
      }, 100); 
  
     
      this.item = nextItem;
    } else {
      console.error("No se encontró ningún elemento con la clase '.hijos'.");
    }
  }


}

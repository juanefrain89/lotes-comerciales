import { Component, Renderer2, OnInit, HostListener, ElementRef, ViewChild, AfterViewInit } from '@angular/core';
import { ObserverService } from '../../services/observer.service';
import { ContactFormComponent } from "../../core/contact-form/contact-form.component";

import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { FirstService } from '../../first.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';

interface SlideItem {
  imageSrc: string;
  alt: string;
}
@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [ContactFormComponent, CommonModule, HttpClientModule, ],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA]
})
export class InicioComponent implements OnInit {
  fadeIn: string = 'fadeIn';
  @ViewChild('imagenAnimada', { static: false }) imagenAnimada!: ElementRef
  show: boolean = false;

  
  constructor(private renderer: Renderer2,  private el: ElementRef, private servicio: FirstService) {
  }



slides: SlideItem[] = [
    { imageSrc: '../../../assets/brand/anuncio.jpg', alt: 'Slide 1' },
    { imageSrc: '../../../assets/brand/dolar.png', alt: 'Slide 2' },
    // Agrega más slides según necesites
  ];

  currentSlide = 0;
  autoPlayInterval: any;
  currentIndex = 0;

 

  menu: HTMLElement | null = null;
  @ViewChild('drawer')
 
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

    this.startAutoPlay();
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




  ngOnDestroy() {
    this.stopAutoPlay();
  }

  startAutoPlay() {
    this.autoPlayInterval = setInterval(() => {
      this.nextSlide();
    }, 5000); // Cambia cada 5 segundos
  }

  stopAutoPlay() {
    if (this.autoPlayInterval) {
      clearInterval(this.autoPlayInterval);
    }
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % this.slides.length;
  }

  previousSlide() {
    this.currentSlide = (this.currentSlide - 1 + this.slides.length) % this.slides.length;
  }

  goToSlide(index: number) {
    this.currentSlide = index;
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

  anterior = document.querySelector<HTMLElement>(".anterior");
  
  item = 1;
  
  atrasar() {
    const hijos = document.querySelectorAll<HTMLElement>(".hijos");
    const botonAnterior = document.querySelector<HTMLElement>(".anterior");
    const botonSiguiente = document.querySelector<HTMLElement>(".siguiente");
  
    if (hijos.length > 0) {
      hijos[this.item].style.transform = "translateX(-723px)"; // Mover a la izquierda
      hijos[this.item].style.position = "absolute";
  
      
      const prevItem = this.item + 1 < hijos.length ? this.item + 1 : hijos.length - 1;
  
     
      if (botonSiguiente) {
        botonSiguiente.style.display = "block"; // Mostrar el botón "siguiente"
      }
  
      // Deshabilitar el botón "anterior" si llegamos al último elemento
      if (prevItem === hijos.length - 1) {
        console.log("Deshabilitar botón anterior");
        if (botonAnterior) {
          botonAnterior.style.display = "none"; // Ocultar el botón "anterior"
        }
      }
  
      console.log(prevItem);
  
      hijos[prevItem].style.transform = "translateX(0)";
      setTimeout(() => {
        hijos[prevItem].style.position = "relative";
      }, 20);
  
      this.item = prevItem;
    } else {
      console.error("No se encontró ningún elemento con la clase '.hijos'.");
    }
  }
  
  
  
  
  adelantar() {
    const hijos = document.querySelectorAll<HTMLElement>(".hijos");
    const botonAnterior = document.querySelector<HTMLElement>(".anterior");
    const botonSiguiente = document.querySelector<HTMLElement>(".siguiente");
  
    if (hijos.length > 0) {
      hijos[this.item].style.transform = "translateX(723px)"; // Mover a la derecha
      hijos[this.item].style.position = "absolute";
  
      // Calcular el índice del siguiente elemento
      const nextItem = this.item - 1 >= 0 ? this.item - 1 : 0;
  
      
      if (botonAnterior) {
        botonAnterior.style.display = "block"; // Mostrar el botón "anterior"
      }
  
      
  
      hijos[nextItem].style.transform = "translateX(0)";
      setTimeout(() => {
        hijos[nextItem].style.position = "relative";
      }, 20);
      if (nextItem === 0) {
        console.log("Deshabilitar botón siguiente");
        if (botonSiguiente) {
          botonSiguiente.style.display = "none"; 
        }
      }
  
      this.item = nextItem;
    } else {
      console.error("No se encontró ningún elemento con la clase '.hijos'.");
    }
  }
  


}

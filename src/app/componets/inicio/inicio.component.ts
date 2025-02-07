import { Component, Renderer2, OnInit, HostListener } from '@angular/core';

@Component({
  selector: 'app-inicio',
  standalone: true,
  imports: [],
  templateUrl: './inicio.component.html',
  styleUrl: './inicio.component.scss'
})
export class InicioComponent implements OnInit {

  constructor(private renderer: Renderer2) {}

  ngOnInit() {
    setTimeout(() => this.syncHeights(), 0); // Esperar hasta que Angular haya aplicado los estilos
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
      hijos[this.item].style.opacity = "0";
      const prevItem = this.item - 1 >= 0 ? this.item - 1 : hijos.length - 1;
  
  
      
      hijos[prevItem].style.opacity = "1"; 
      setTimeout(() => {
        hijos[prevItem].style.opacity = "1"; 
      }, 10); 
      this.item = prevItem;
    } else {
      console.error("No se encontró ningún elemento con la clase '.hijos'.");
    }
  }
  
  adelantar() {
    const hijos = document.querySelectorAll<HTMLElement>(".hijos");
  
    if (hijos.length > 0) {
      // Mover el hijo actual fuera de vista (a la derecha)
      hijos[this.item].style.opacity = "0"
      
      ;
  
      // Calcular el índice del siguiente elemento
      const nextItem = this.item + 1 < hijos.length ? this.item + 1 : 0;
  console.log(nextItem);
  
      // Restablecer la posición de todos los elementos excepto el siguiente
     
  
    
      hijos[nextItem].style.opacity = "0"; // Posición inicial (izquierda)
      setTimeout(() => {
        hijos[nextItem].style.opacity = "1"; // Mover al centro
      }, 10); 
  
     
      this.item = nextItem;
    } else {
      console.error("No se encontró ningún elemento con la clase '.hijos'.");
    }
  }






  



}

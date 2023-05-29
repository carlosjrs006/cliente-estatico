import { Component, OnInit, Output, EventEmitter, HostListener, ViewChild, ElementRef, Renderer2 } from '@angular/core';


@Component({
  selector: 'app-calculadora',
  templateUrl: './calculadora.component.html',
  styleUrls: ['./calculadora.component.scss']
})
export class CalculadoraComponent implements OnInit {
  valor1: string = '';
  valor2: string = '';
  resultado: number = 0;

  @ViewChild('calculadora', { static: true }) calculadoraRef!: ElementRef;

  private isDragging: boolean = false;
  private dragStartX: number = 0;
  private dragStartY: number = 0;
  private offsetX: number = 0;
  private offsetY: number = 0;

  @Output() fechar2 = new EventEmitter();

  constructor( private renderer: Renderer2){}
  ngOnInit(): void {
    const calculadoraElement = this.calculadoraRef.nativeElement;
    this.renderer.setStyle(calculadoraElement, 'position', 'absolute');
    this.renderer.setStyle(calculadoraElement, 'cursor', 'move');
  }

  fechar(){
    this.fechar2.emit();
  }

  somar() {
    this.resultado = parseFloat(this.valor1) + parseFloat(this.valor2);
  }

  subtrair() {
    this.resultado = parseFloat(this.valor1) - parseFloat(this.valor2);
  }

  multiplicar() {
    this.resultado = parseFloat(this.valor1) * parseFloat(this.valor2);
  }

  dividir() {
    this.resultado = parseFloat(this.valor1) / parseFloat(this.valor2);
  }

  @HostListener('document:mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    if (this.isDragging && this.calculadoraRef) {
      const offsetX = event.clientX - this.dragStartX;
      const offsetY = event.clientY - this.dragStartY;
      this.offsetX += offsetX;
      this.offsetY += offsetY;
      this.dragStartX = event.clientX;
      this.dragStartY = event.clientY;

      const calculadoraElement = this.calculadoraRef.nativeElement;
      if (calculadoraElement) {
        this.renderer.setStyle(calculadoraElement, 'left', calculadoraElement.offsetLeft + offsetX + 'px');
        this.renderer.setStyle(calculadoraElement, 'top', calculadoraElement.offsetTop + offsetY + 'px');
      }
    }
  }

  @HostListener('document:mouseup')
  onMouseUp() {
    this.isDragging = false;
  }

  onMouseDown(event: MouseEvent) {
    this.isDragging = true;
    this.dragStartX = event.clientX;
    this.dragStartY = event.clientY;
  }
}

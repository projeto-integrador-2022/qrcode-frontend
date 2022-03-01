import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'app-landing-page',
  templateUrl: './landing-page.component.html',
  styleUrls: ['./landing-page.component.scss']
})


export class LandingPageComponent implements OnInit {  
  public isMenuCollapsed = true;
  readonly jumbotronContent = [
    { 
      title: 'Realidade Aumentada no seu negócio.',
      description: 'Incremente seu negócio usando Q.R Code e fique sabendo mais sobre seu cliente!',
      image: '../../../assets/images/image-example.png'
    },
    { 
      title: 'Quem são seus clientes?',
      description: 'Descubra os hábitos de consumo da sua clientela, onde e quando estiveram em sua loja. Saiba quem é seu freguês!',
      image: '../../../assets/images/image-example.png'
    },
    { 
      title: 'Donos de gráficas',
      description: 'Além de gerar o QR Code, agregue valor ao seu negócio e ofereça nosso serviço de rastreamento de clientela.',
      image: '../../../assets/images/image-example.png'
    },
  ];

  ngOnInit(): void {
    
  }
  

}

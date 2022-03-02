import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-payment-plans',
  templateUrl: './payment-plans.component.html',
  styleUrls: ['./payment-plans.component.scss']
})
export class PaymentPlansComponent implements OnInit {

  constructor() { }

  readonly cardsContents = [
    { 
      title: 'Starter',
      description1: 'Até 2 Usuários',
      description2: 'Relatórios Mensais',
      description3: 'Até 10 Clientes',
      value: 'R$ 350,00 /mês'
    },
    { 
      title: 'Professional',
      description1: 'Multiplos Usuários',
      description2: 'Relatórios em Tempo Real',
      description3: 'Até 100 Clientes',
      value: 'R$ 950,00 /mês'
    },
    { 
      title: 'Enterprise',
      description1: 'Até 2 Usuários',
      description2: 'Relatórios em Tempo Real',
      description3: 'Quantidade Fixa de Clientes',
      value: 'R$ 150,00 /usuário /mês'
    },
  ];

  size: number = this.cardsContents.length;
  
  ngOnInit(): void {
  }
  navigateTo() {

  }

}

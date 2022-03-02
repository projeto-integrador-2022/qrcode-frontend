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

  readonly faqQuestions = [
    { 
      title: 'Quais cartões de créditos aceitos?',
      description: 'Nullam mauris nulla, placerat egestas elit et, venenatis porttitor nisl. Nulla vel velit eu lectus bibendum blandit eu molestie nisl. Mauris sed cursus sem. '
    },
    { 
      title: 'Posso pagar por Pix?', 
      description: 'Vivamus venenatis erat ullamcorper auctor congue. Nunc varius, odio id maximus congue, velit diam elementum dolor, at eleifend est dui non nisl.'
    },
    { 
      title: 'Posso cancelar a qualquer momento?', 
      description: 'Sed neque tellus, finibus sed rhoncus a, vehicula eu enim. Cras condimentum lorem vel nisl interdum, ac placerat augue semper. Quisque iaculis dictum ex.'
    },
    { 
      title: 'Posso dividir minha assinatura?', 
      description: 'Nunc a pretium massa. Donec nulla turpis, rutrum eget metus ultricies, eleifend sagittis diam. Donec fringilla erat enim. Integer luctus nisl tortor, at lacinia.'
    },
    { 
      title: 'Como são entregues os relatórios mensais?', 
      description: 'lectus cursus tincidunt. Nullam lobortis ornare commodo. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas.'
    },
    { 
      title: 'O que são relatórios em tempo real?', 
      description: 'Quisque suscipit aliquet egestas. Etiam euismod placerat quam et rhoncus. Nunc mollis dolor at mi gravida ornare. Sed hendrerit egestas ultrices.'
    }

  ]
  cardContentSize: number = this.cardsContents.length;
  faqQuestionsSize: number = this.faqQuestions.length;
  

  ngOnInit(): void {
  }
  navigateTo() {

  }

}

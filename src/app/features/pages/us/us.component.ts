import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-us',
  templateUrl: './us.component.html',
  styleUrls: ['./us.component.scss']
})
export class UsComponent implements OnInit {
  imageUrl: string = '../../../assets/images/banner-example.png'
  constructor() { }

  readonly jumbotronContent = [
    { 
      title: 'A Big Hiccups Soluções',
      description1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec blandit tortor et consectetur.',
      description2: 'Phasellus ullamcorper porttitor eleifend. In in ante quis libero convallis tempor nec quis arcu.',
      description3: 'Pellentesque tristique ipsum a venenatis auctor. Duis metus turpis, fermentum eget  orci  vitae.',
    },
    { 
      title: 'Nossa Equipe',
      description1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec blandit tortor et consectetur.',
      description2: 'Phasellus ullamcorper porttitor eleifend. In in ante quis libero convallis tempor nec quis arcu.',
      description3: 'Pellentesque tristique ipsum a venenatis auctor. Duis metus turpis, fermentum eget  orci  vitae.',
    },
    { 
      title: 'Fale Conosco!',
      description1: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec blandit tortor et consectetur.',
      description2: 'Phasellus ullamcorper porttitor eleifend. In in ante quis libero convallis tempor nec quis arcu.',
      description3: 'Pellentesque tristique ipsum a venenatis auctor. Duis metus turpis, fermentum eget  orci  vitae.',
    },
  ];

  size: number = this.jumbotronContent.length;

  ngOnInit(): void {
  }

}

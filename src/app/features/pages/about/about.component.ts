import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-about',
  templateUrl: './about.component.html',
  styleUrls: ['./about.component.scss']
})
export class AboutComponent implements OnInit {

  constructor() { }

  readonly jumbotronContent = [
    { 
      title: 'Realidade Aumentada no seu negócio.',
      description: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Integer accumsan, augue et consequat gravida, velit tellus porttitor felis, nec accumsan quam arcu at turpis. Aenean congue arcu ex, in elementum felis tristique quis. Sed in tortor in odio fringilla consequat. Duis finibus elementum euismod. Donec vestibulum scelerisque eros ac varius. Nulla venenatis dignissim risus, non vestibulum lectus tristique et. Phasellus porta ac urna quis vehicula. Maecenas eget bibendum tortor. Praesent laoreet, sem ac iaculis interdum, metus libero convallis nisl, non lacinia nibh augue nec neque. Curabitur condimentum sapien ut nisi consequat, a efficitur neque lacinia. Fusce accumsan, massa a vehicula luctus, metus mauris posuere metus, quis tempor augue lorem in orci. Nam in congue eros, et accumsan justo.',
    },
    { 
      title: 'Quem são seus clientes?',
      description: 'Phasellus ullamcorper porttitor eleifend. In in ante quis libero convallis tempor nec quis arcu. Suspendisse potenti. Aliquam erat volutpat. Quisque sed rutrum lacus. Donec blandit tortor et consectetur dignissim. Phasellus porta, diam a tincidunt commodo, orci ligula dictum sapien, ac sollicitudin justo nulla vitae magna. Phasellus euismod suscipit dui nec pretium. Donec sed risus quis quam cursus semper eu non sem. Donec quis dolor at elit blandit luctus quis ac felis. Aenean ac lobortis ligula. Nullam nec metus arcu.',
    },
    { 
      title: 'Donos de gráficas.',
      description: 'Pellentesque tristique ipsum a venenatis auctor. Duis metus turpis, fermentum eget orci vitae, scelerisque hendrerit mauris. Fusce id condimentum dui. Nullam sed sapien vitae erat mattis iaculis. Aliquam interdum interdum iaculis. Aenean consequat sit amet odio vitae lobortis. Donec ullamcorper elit nec turpis egestas, vel laoreet quam vehicula. Quisque vel arcu interdum, pulvinar quam at, dignissim eros. Integer volutpat pulvinar nisi ac faucibus. Aliquam elit augue, pretium et lorem a, condimentum maximus eros.',
    },
  ];

  ngOnInit(): void {
  }

}

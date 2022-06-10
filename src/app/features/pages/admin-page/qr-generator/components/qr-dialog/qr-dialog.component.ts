import { Component, OnInit } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";



@Component({
  selector: 'qr-dialog',
  templateUrl: './qr-dialog.component.html',
  styleUrls: ['./qr-dialog.component.scss']
})
export class QrDialogComponent implements OnInit {
  imagePath!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    let base64 = window.localStorage.getItem('base64');
    this.imagePath = this.sanitizer.bypassSecurityTrustResourceUrl(
      `data:image/png;base64, ${base64}`
    );
    
  }

  


}

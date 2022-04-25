import { Component, OnInit } from '@angular/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'qr-dialog',
  templateUrl: './qr-dialog.component.html',
  styleUrls: ['./qr-dialog.component.scss']
})
export class QrDialogComponent implements OnInit {
  qrdata = 'Initial QR code data string';
  fileUrl: any;
  parent: any;
 
  constructor(private sanitizer: DomSanitizer) { }

  ngOnInit(): void {
    const blob = new Blob([this.qrdata], { type: 'application/octet-stream' });

    // To download the Qr code's internal text content
    this.fileUrl = this.sanitizer.bypassSecurityTrustResourceUrl(window.URL.createObjectURL(blob));
  }

  saveAsImage(parent : any) {

    console.log(parent);
    
    
    // fetches base 64 date from image
    const parentElement = parent.el.nativeElement.querySelector("img").src;

    
    
    // converts base 64 encoded image to blobData
    let blobData = this.convertBase64ToBlob(parentElement);

    // saves as image
    if (window.navigator && (window.navigator as any).msSaveOrOpenBlob) { //IE
      (window.navigator as any).msSaveOrOpenBlob(blobData, 'Qrcode');
    } else { // chrome
      const blob = new Blob([blobData], { type: "image/png" });
      const url = window.URL.createObjectURL(blob);
      // window.open(url);
      const link = document.createElement('a');
      link.href = url;
      link.download = 'Qrcode';
      link.click();
    }

    if ((window.navigator as any).msSaveOrOpenBlob) // IE10+
      (window.navigator as any).msSaveOrOpenBlob(blobData, 'Qrcode');
    else {
      const blob = new Blob([blobData], { type: "image/png" });
      var url = window.URL.createObjectURL(blob);
      window.open(url);
    }
  }

  private convertBase64ToBlob(Base64Image: any) {
    // SPLIT INTO TWO PARTS
    const parts = Base64Image.split(';base64,');
    // HOLD THE CONTENT TYPE
    const imageType = parts[0].split(':')[1];
    // DECODE BASE64 STRING
    const decodedData = window.atob(parts[1]);
    // CREATE UNIT8ARRAY OF SIZE SAME AS ROW DATA LENGTH
    const uInt8Array = new Uint8Array(decodedData.length);
    // INSERT ALL CHARACTER CODE INTO UINT8ARRAY
    for (let i = 0; i < decodedData.length; ++i) {
      uInt8Array[i] = decodedData.charCodeAt(i);
    }
    // RETURN BLOB IMAGE AFTER CONVERSION
    return new Blob([uInt8Array], { type: imageType });
  }

}

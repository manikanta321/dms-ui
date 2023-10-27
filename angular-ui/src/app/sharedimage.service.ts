import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedimageService {
  private selectedImage!: string; // You can change the data type based on your image representation
  
  constructor() { }

  setSelectedImage(imageData: string) {
    this.selectedImage = imageData;
  }

  getSelectedImage(): string {
    return this.selectedImage;
  }
}

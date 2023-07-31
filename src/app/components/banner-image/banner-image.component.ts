import { Component, Input } from '@angular/core';
import { BannerImage } from './banner-image.interface';

@Component({
  selector: 'app-banner-image',
  templateUrl: './banner-image.component.html',
  styleUrls: ['./banner-image.component.scss'],
})
export class BannerImageComponent {
  @Input() bannerImage?: BannerImage;
}

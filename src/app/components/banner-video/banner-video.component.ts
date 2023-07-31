import { Router } from '@angular/router';
import { Component, Input } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { BannerVideo } from './banner-video.interface';
@Component({
  selector: 'app-banner-video',
  templateUrl: './banner-video.component.html',
  styleUrls: ['./banner-video.component.scss'],
})
export class BannerVideoComponent {
  constructor(private _domSanitizer: DomSanitizer, private _router: Router) {}

  @Input() bannerVideo?: BannerVideo;
  @Input() isFullScreen: boolean = false;

  transform(url: string = ''): SafeResourceUrl {
    return this._domSanitizer.bypassSecurityTrustResourceUrl(url);
  }

  redirecionarPara(): void {
    this._router.navigate([this.bannerVideo?.saibaMaisLink]);
    window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
  }
}

import { BannerImage } from 'src/app/components/banner-image/banner-image.interface';
import { Contato } from 'src/app/pages/contato/contato-contains/contato-contains.interface';

export interface ContatoPageDTO {
  titulo: string;
  textoModal: string;
  link: string;
  bannerImage: BannerImage;
  contatos: Contato[];
}

import { BannerVideo } from 'src/app/components/banner-video/banner-video.interface';
import { ProdutosServico } from 'src/app/components/produtos-servicos/produtos-servicos.interface';

export interface HomePageDTOModule {
  titulo: string;
  textoModal: string;
  link: string;
  tituloProdutos: string;
  video: string;
  produtosServico: ProdutosServico;
  bannerVideo: BannerVideo;
}

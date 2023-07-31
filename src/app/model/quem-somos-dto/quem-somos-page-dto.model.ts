import { BannerVideo } from 'src/app/components/banner-video/banner-video.interface';
import { Citacao } from 'src/app/components/citacao/citacao.interface';
import { ProdutosServico } from 'src/app/components/produtos-servicos/produtos-servicos.interface';
import { SessaoInformativa } from 'src/app/components/sessao-informativa/sessao-informativa.interface';

export interface QuemSomosPageDTOModule {
  titulo: string;
  textoModal: string;
  link: string;
  tituloProdutos: string;
  produtosServico: ProdutosServico;
  sessaoInformativa: SessaoInformativa;
  bannerVideo: BannerVideo;
  citacao: Citacao;
}

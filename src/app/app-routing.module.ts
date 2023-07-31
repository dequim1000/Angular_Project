import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { BasePageCadastroComponent } from './pages/base-page-cadastro/base-page-cadastro.component';
import { BasePageComponent } from './pages/base-page/base-page.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { HomeComponent } from './pages/home/home.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { QuemSomosComponent } from './pages/quem-somos/quem-somos.component';
import { SitemapComponent } from './pages/sitemap/sitemap.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full',
  },
  {
    path: 'home',
    component: BasePageComponent,
    data: { breadcrumb: 'Home' },
    children: [
      {
        path: '',
        component: HomeComponent,
      },
      {
        path: 'produtos/:name',
        component: ProdutosComponent,
        data: { breadcrumb: 'Produtos' },
      },
      {
        path: 'quem-somos',
        component: QuemSomosComponent,
        data: { breadcrumb: 'Quem Somos' },
      },
      {
        path: 'contato',
        component: ContatoComponent,
        data: { breadcrumb: 'Contato' },
      },
      {
        path: 'sitemap',
        component: SitemapComponent,
        data: { breadcrumb: 'Sitemap' },
      },
    ],
  },

  {
    path: '',
    component: BasePageCadastroComponent,
    children: [{ path: 'cadastro', component: CadastroComponent }],
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}

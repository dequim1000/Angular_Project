import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { CadastroComponent } from './pages/cadastro/cadastro.component';
import { ContatoComponent } from './pages/contato/contato.component';
import { HomeComponent } from './pages/home/home.component';
import { ProdutosComponent } from './pages/produtos/produtos.component';
import { QuemSomosComponent } from './pages/quem-somos/quem-somos.component';
import { MenuComponent } from './components/menu/menu.component';
import { FooterComponent } from './components/footer/footer.component';
import { BasePageComponent } from './pages/base-page/base-page.component';
import { BasePageCadastroComponent } from './pages/base-page-cadastro/base-page-cadastro.component';
import { BannerVideoComponent } from './components/banner-video/banner-video.component';
import { HttpClientModule, HttpClient } from '@angular/common/http';
import { ProdutosServicosComponent } from './components/produtos-servicos/produtos-servicos.component';
import { SitemapComponent } from './pages/sitemap/sitemap.component';
import { BreadcrumbComponent } from './components/breadcrumb/breadcrumb.component';
import { SessaoInformativaComponent } from './components/sessao-informativa/sessao-informativa.component';
import { SeparadorComponent } from './components/separador/separador.component';
import { CitacaoComponent } from './components/citacao/citacao.component';
import { CookiesAceiteComponent } from './components/cookies-aceite/cookies-aceite.component';
import { MenuCadastroComponent } from './components/menu-cadastro/menu-cadastro.component';
import { BannerImageComponent } from './components/banner-image/banner-image.component';
import { InputComponent } from './components/form-elements/input/input.component';
import { FaleConoscoComponent } from './pages/contato/fale-conosco/fale-conosco.component';
import { ContatoContainsComponent } from './pages/contato/contato-contains/contato-contains.component';
import { DropdownMenuComponent } from './components/menu/dropdown-menu/dropdown-menu.component';
import { BotaoComponent } from './components/botao/botao.component';
import { BotaoStepperComponent } from './components/botao-stepper/botao-stepper.component';
import { CadastroStep1Component } from './components/cadastro-step1/cadastro-step1.component';
import { CadastroStep2Component } from './components/cadastro-step2/cadastro-step2.component';
import { CadastroStep3Component } from './components/cadastro-step3/cadastro-step3.component';
import { StepperComponent } from './components/stepper/stepper.component';
import { InputFileComponent } from './components/form-elements/input-file/input-file.component';
import { StepperFooterComponent } from './components/stepper-footer/stepper-footer.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { FieldErrosComponent } from './components/form-elements/field-erros/field-erros.component';
import { ModalAvisoComponent } from './components/modal-aviso/modal-aviso.component';
import { NgxMaskDirective, NgxMaskPipe, provideNgxMask } from 'ngx-mask';
import { SelectComponent } from './components/form-elements/select/select.component';
import { BaseFormControlComponent } from './components/form-elements/base-form-control/base-form-control.component';
import { SpinnerComponent } from './components/form-elements/spinner/spinner.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    QuemSomosComponent,
    ProdutosComponent,
    ContatoComponent,
    CadastroComponent,
    MenuComponent,
    FooterComponent,
    BasePageComponent,
    BasePageCadastroComponent,
    BannerVideoComponent,
    ProdutosServicosComponent,
    SitemapComponent,
    BreadcrumbComponent,
    BannerVideoComponent,
    SessaoInformativaComponent,
    SeparadorComponent,
    CitacaoComponent,
    BannerImageComponent,
    InputComponent,
    FaleConoscoComponent,
    ContatoContainsComponent,
    DropdownMenuComponent,
    CookiesAceiteComponent,
    MenuCadastroComponent,
    BotaoComponent,
    BotaoStepperComponent,
    CadastroStep1Component,
    CadastroStep2Component,
    CadastroStep3Component,
    StepperComponent,
    InputFileComponent,
    StepperFooterComponent,
    FieldErrosComponent,
    ModalAvisoComponent,
    SelectComponent,
    BaseFormControlComponent,
    SpinnerComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    NgxMaskDirective,
    NgxMaskPipe,
  ],
  providers: [provideNgxMask()],
  bootstrap: [AppComponent],
})
export class AppModule {}

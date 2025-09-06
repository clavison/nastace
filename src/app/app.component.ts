import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';

interface Ingrediente {
  nome: string;
  imagem: string; // caminho para PNG transparente
  preco: number;
}

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  titulo = 'Nastace – Gelatos do Sítio';
  etapa: 'montagem' | 'finalizacao' | 'confirmado' = 'montagem';
  precoTotal = 0;
  pagina: 'historia' | 'pedido' = 'historia';
  baseSelecionada: Ingrediente | null = null;
  recheioSelecionado: Ingrediente | null = null;
  coberturaSelecionada: Ingrediente | null = null;
  selecionados: Ingrediente[] = [];

  selecionarBase(b: Ingrediente) {
    // remover base anterior da lista
    this.selecionados = this.selecionados.filter(
      (ing) => ing !== this.baseSelecionada
    );

    // adicionar a nova base
    this.baseSelecionada = b;
    this.selecionados.push(b);

    // atualizar preço
    this.atualizarPreco();
  }
  
  selecionarRecheio(r: Ingrediente) {
    this.selecionados = this.selecionados.filter(
      (ing) => ing !== this.recheioSelecionado
    );
    this.recheioSelecionado = r;
    if (r) {
      this.selecionados.push(r);
    }
    this.atualizarPreco();
  }

  selecionarCobertura(c: Ingrediente) {
    this.selecionados = this.selecionados.filter(
      (ing) => ing !== this.coberturaSelecionada
    );
    this.coberturaSelecionada = c;
    if (c) {
      this.selecionados.push(c);
    }
    this.atualizarPreco();
  }

  atualizarPreco() {
    this.precoTotal = this.selecionados.reduce(
      (acc, ing) => acc + ing.preco,
      0
    );
  }

  irPara(p: 'historia' | 'pedido') {
    this.pagina = p;
    if (p === 'pedido') {
      this.baseSelecionada = null;
      this.recheioSelecionado = null;
      this.coberturaSelecionada = null;
      this.selecionados = [];
      this.precoTotal = 0;
      this.etapa = 'montagem';
    }
  }

  // listas de opções
  bases: Ingrediente[] = [
    { nome: 'Leite', imagem: 'assets/leite.png', preco: 10 },
    { nome: 'Chocolate Belga', imagem: 'assets/choco_belga.png', preco: 12 },
    { nome: 'Pistache', imagem: 'assets/pistache.png', preco: 15 },
  ];
  recheios: Ingrediente[] = [
    { nome: 'Doce de Leite', imagem: 'assets/rec_doceleite.png', preco: 5 },
    { nome: 'Goiabada', imagem: 'assets/rec_pistache.png', preco: 5 },
    { nome: 'Frutas Vermelhas', imagem: 'assets/rec_frutas.png', preco: 7 },
  ];
  coberturas: Ingrediente[] = [
    {nome: 'Chocolate', imagem: 'assets/cob_choco.png', preco: 3},
    { nome: 'Morando', imagem: 'assets/cob_mor.png', preco: 4 },
    { nome: 'Maracujá', imagem: 'assets/cob_mar.png', preco: 4 },
  ];
  sabores: Ingrediente[] = [
    {
      nome: 'Doce de leite c/ parmesão',
      imagem: 'assets/sabor-doceleite.png',
      preco: 8,
    },
    { nome: 'Goiabada', imagem: 'assets/sabor-goiabada.png', preco: 7 },
    { nome: 'Limão Siciliano', imagem: 'assets/sabor-limao.png', preco: 7 },
  ];

  cliente = { nome: '', endereco: '', telefone: '', pagamento: '' };

  selecionarIngrediente(ing: Ingrediente) {
    this.selecionados.push(ing);
    this.precoTotal += ing.preco;
  }

  novoPedido() {
    this.limpar(); // limpa seleção e preço
    this.cliente = { nome: '', endereco: '', telefone: '', pagamento: '' };
    this.etapa = 'montagem';
  }

  limpar() {
    this.baseSelecionada = null;
    this.recheioSelecionado = null;
    this.coberturaSelecionada = null;
    this.selecionados = [];
    this.precoTotal = 0;
    this.etapa = 'montagem';
  }

  finalizar() {
    this.etapa = 'finalizacao';
  }
  confirmarPedido() {
    this.etapa = 'confirmado';
  }
}

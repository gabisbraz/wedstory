# Wedstory – Etapa Borboleta (Next.js + React)

O **Wedstory** é um site de casamento criado inicialmente em **Vanilla JS** (Projeto 1 – Etapa Lagarta). Nesta segunda fase (**Etapa Borboleta**), o projeto foi migrado para uma **arquitetura baseada em componentes com React**, utilizando **Next.js** como framework.

A migração permite **componentização, reatividade e manutenibilidade**, além de preparar o projeto para integração com APIs e rotas dinâmicas.


## Diferenciais

- Simplicidade de uso para os noivos.

- Layouts prontos e personalizáveis.

- Flexibilidade na criação de listas de presentes e convidados.

- Organização prática para um dos momentos mais importantes da vida do casal.

 

## De Lagarta para Borboleta

**Projeto 1 – Lagarta:**

* Implementado em **JavaScript puro (Vanilla JS)**.
* Funcionalidades principais: cadastro de convidados, lista de presentes, layout estático e interação básica via DOM.
* Persistência via **LocalStorage**.

**Projeto 2 – Borboleta (atual):**

* Migrado para **React + Next.js**, utilizando **componentes reutilizáveis**.
* Gerenciamento de estado com **useState** e efeitos com **useEffect**.
* Rotas simples (`/sobre-plataforma`) e dinâmicas (`/convidados/novo?edit=id`).
* Preparado para consumo de **API client-side**.
* Mantido caráter extensionista: público real e impacto direto na comunidade (casais e organização de casamentos).

**Vantagens da migração:**

* **Componentização:** cada parte do site (lista de convidados, modal de presentes, avatar) é independente e reutilizável.
* **Reatividade:** mudanças de estado atualizam automaticamente a interface.
* **Escalabilidade:** mais fácil de adicionar funcionalidades sem duplicação de código.
* **Integração futura com APIs** e dados dinâmicos.



## Estrutura do Projeto

```
src/
 ├── app/
 │   ├── home/                     # Página inicial
 │   ├── login/                    # Autenticação
 │   ├── pagina-inicial/           # Dashboard com Swiper
 │   ├── sobre-plataforma/         # Informações da plataforma
 │   ├── sobre-nos/                # Equipe
 │   ├── presentes/                # Lista de presentes e modal
 │   │   └── components/
 │   ├── convidados/
 │   │   ├── novo/                 # Cadastro de convidados
 │   │   ├── lista/                # Lista de convidados
 │   │   └── import-excel/         # Importação via Excel
 │   ├── cadastro/
 │   │   ├── pagina1/              # Formulário passo 1
 │   │   └── pagina2/              # Formulário passo 2
 │   └── perfil/                   # AvatarPicker
 ├── assets/                       # Imagens e ícones
 └── styles/                        # CSS Modules + globals.css
```



## Funcionalidades

### Cadastro

* Duas páginas: informações iniciais e dados de login.
* Fluxo intuitivo e responsivo.

### Lista de Convidados

* Adição manual ou via **importação de Excel**.
* Edição, remoção e visualização detalhada.
* Estatísticas em tempo real (adultos, crianças, bebês).

### Lista de Presentes

* Adicionar presentes personalizados ou predefinidos.
* Modal interativo para inclusão de novos presentes.

### Perfil

* Seleção de avatar com **preview em tempo real**.

### Interface e UX

* **Swiper.js** no dashboard para destacar funcionalidades.
* Componentes interativos, reutilizáveis e responsivos.



## Instalação e Execução

```bash
git clone https://github.com/usuario/wedstory.git
cd wedstory
npm install
npm run dev
```

Acesse: [http://localhost:3000](http://localhost:3000)



## Aprendizados

* Componentização e reuso de código com React.
* Gerenciamento de estado com `useState` e efeitos colaterais com `useEffect`.
* Migração de Vanilla JS para arquitetura moderna com Next.js.
* Preparação para rotas dinâmicas e consumo de APIs.
* Desenvolvimento com foco em UX e acessibilidade.



# Próximos passos
- Integração com API server-side para persistência real dos dados.
- Melhoria de acessibilidade e responsividade.

## Protótipo no Figma

[Wedstory – Figma Prototype](https://www.figma.com/design/Gw830pcsNvTx8EGlyj1z0R/Wedstory?node-id=105-2&t=7RJGv8bIjQu4lio3-1)



## Equipe

* Gabriella Silveira Braz – 10402554
* Giovana Liao – 10402264
* Giovana Ribeiro de Francisco – 10297494
* Maria Julia de Pádua – 10400630


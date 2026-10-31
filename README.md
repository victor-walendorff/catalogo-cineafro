# CineAfro • Catálogo Interativo de Cinema Negro

Aplicação web desenvolvida como projeto prático para a unidade curricular de **Tópicos Especiais em Projeto e Desenvolvimento Web (TEPDW)**, ministrada pela **Profa. Ana Beatriz Moreira**.

---

## Autor

* **Victor Hugo Santos Walendorff**
* Curso: Ciência da Computação — IFCE Campus Tianguá

---

## Objetivo

O **CineAfro** é uma plataforma interativa concebida para catalogar, organizar e dar visibilidade a produções cinematográficas com foco em identidade, memória e narrativas negras no cinema (destacando obras como *Besouro*, *Uma História de Amor e Fúria*, entre outras). 

A aplicação foi construída com foco na manipulação tipada do DOM e no controlo de estados em memória utilizando TypeScript estrito, sem recurso a bibliotecas externas ou frameworks.

---

## Funcionalidades Obrigatórias

- [x] **01. Cadastro de Obras:** Formulário com validação rigorosa de campos obrigatórios e numéricos (título, categoria, ano de lançamento, URL de capa e estado de visualização).
- [x] **02. Exibição do Catálogo:** Apresentação dinâmica dos itens em grelha responsiva com estética cinematográfica (*cards* com tratamento de imagens, estados e categorias). Inclui mensagens informativas quando o catálogo está vazio ou quando nenhum registo coincide com a pesquisa.
- [x] **03. Busca e Filtragem:** Pesquisa em tempo real por título combinada com filtro de seleção por categorias temáticas.
- [x] **04. Atualização e Remoção:** Alternância imediata do estado da obra (*Assistido* / *Quero Assistir*) e exclusão de itens com recálculo instantâneo da interface.
- [x] **05. Painel de Resumo (Métricas):** Contadores visuais atualizados em tempo real que refletem o total de obras cadastradas, a quantidade de títulos já assistidos e os pendentes.

---

## Tecnologias Utilizadas

* **HTML5 Semântico**
* **CSS3 Moderno** (Variáveis CSS, CSS Grid, Flexbox, Glassmorphism e Efeitos de Luz Ambiente)
* **TypeScript** (Tipagem estrita, Interfaces, Type Aliases, Union Types, manipulação segura do DOM sem recurso a `any`)
* **Node.js & npm** (Gestão do compilador e scripts de automação)

---

## Estrutura do Projeto

```text
catalogo-cineafro/
├── index.html            # Estrutura da aplicação
├── package.json          # Metadados e scripts de compilação
├── tsconfig.json         # Configurações do compilador TypeScript
├── README.md             # Documentação do projeto
├── css/
│   └── style.css         # Folha de estilos e design do catálogo
├── src/
│   └── app.ts            # Código-fonte principal em TypeScript
└── dist/
    └── app.js            # Ficheiro JavaScript gerado pelo compilador
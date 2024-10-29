# Projeto Interdisciplinar II - Sistemas de Informação ESPM

<p align="center">
    <a href="https://www.espm.br/cursos-de-graduacao/sistemas-de-informacao/"><img src="https://raw.githubusercontent.com/tech-espm/misc-template/main/logo.png" alt="Sistemas de Informação ESPM" style="width: 375px;"/></a>
</p>

# [Nome do Projeto] (por exemplo, Sistema de Gerenciamento da ESPM Júnior)

### 2024-02

## Integrantes
- [Nome do integrante 1 e link do portifólio](https://github.com/tech-espm/)
- [Nome do integrante 2 e link do portifólio](https://github.com/tech-espm/)
- [Nome do integrante 3 e link do portifólio](https://github.com/tech-espm/)

## Descrição do Projeto

Descrição do projeto, incluindo o problema original, e o objetivo final. Pode ser em mais de um parágrafo.

# Detalhes de Configuração

Para gerar o arquivo `public/css/bootstrap.min.css` é necessário instalar o pacote `sass` através do comando abaixo:

`npm i -g sass`

Em seguida, é necessário executar o comando abaixo para atualizar o arquivo `public/css/bootstrap.min.css` sempre que algum arquivo `scss` for alterado:

`npm run sass`

Para ajustar o estilo e outras configurações, de preferência, alterar o arquivo `scss/_variables.scss`. Em seguida, se ainda precisar, alterar os arquivos `scss/_xxx.scss`, `scss/navs/_xxx.scss` ou `scss/utilities/_xxx.scss`.

Para funcionar corretamente, devem ser criados os seguintes arquivos/pastas nos caminhos especificados, com o conteúdo especificado:

- O arquivo `.env` deve ser criado em `/`, com o conteúdo abaixo:
```
mysqlhost=[HOST DO BANCO]
mysqlport=[PORTA DO BANCO]
mysqluser=[USUÁRIO DO BANCO]
mysqlpassword=[SENHA DO USUÁRIO DO BANCO]
mysqldatabase=[NOME DO BANCO]
```

# Licença

Este projeto é licenciado sob a [MIT License](https://github.com/tech-espm/misc-template/blob/main/LICENSE).

<p align="right">
    <a href="https://www.espm.br/cursos-de-graduacao/sistemas-de-informacao/"><img src="https://raw.githubusercontent.com/tech-espm/misc-template/main/logo-si-512.png" alt="Sistemas de Informação ESPM" style="width: 375px;"/></a>
</p>
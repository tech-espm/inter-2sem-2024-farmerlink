# Projeto Interdisciplinar II - Sistemas de Informação ESPM

<p align="center">
    <a href="https://www.espm.br/cursos-de-graduacao/sistemas-de-informacao/"><img src="https://raw.githubusercontent.com/tech-espm/misc-template/main/logo.png" alt="Sistemas de Informação ESPM" style="width: 375px;"/></a>
</p>

# FarmerLink

### 2024-02

## Integrantes

- [Ana Carolina Frank](https://github.com/tech-espm/)
- [Enzo Godoy](https://github.com/tech-espm/)
- [Julia Akemi Mullis](https://github.com/tech-espm/)
- [Marcela Martini](https://github.com/tech-espm/)
- [Maria Luiza de Souza](https://github.com/tech-espm/)
- [Rafael Lucena](https://github.com/tech-espm/)
- [Rafael Ghirelli](https://github.com/tech-espm/)

## Descrição do Projeto

O “FarmerLink” funcionará como uma feira online, onde produtores poderão criar perfis individuais com informações detalhadas sobre suas produções, localizações e histórias.

O projeto propõe a integração digital para superar desafios históricos, como a baixa inserção no mercado e o acesso limitado a tecnologias.

O objetivo é conectar diretamente os pequenos agricultores aos consumidores, promovendo visibilidade e acesso a mercados mais amplos, alinhando-se às demandas do consumidor moderno por qualidade e procedência dos produtos.

# Detalhes de Configuração

Para gerar o arquivo `public/css/bootstrap.min.css` é necessário instalar o pacote `sass` através do comando abaixo:

`npm i -g sass`

Em seguida, é necessário executar o comando abaixo para atualizar o arquivo `public/css/bootstrap.min.css` sempre que algum arquivo `scss` for alterado:

`npm run sass`

Para ajustar o estilo e outras configurações, de preferência, alterar o arquivo `scss/_variables.scss`. Em seguida, se ainda precisar, alterar os arquivos `scss/_xxx.scss`, `scss/navs/_xxx.scss` ou `scss/utilities/_xxx.scss`.

Para funcionar corretamente, devem ser criados os seguintes arquivos/pastas nos caminhos especificados, com o conteúdo especificado:

- O arquivo `.env` deve ser criado em `/`, com o conteúdo abaixo:

```
mysqlhost=localhost
mysqlport=3306
mysqluser=root
mysqlpassword=root
mysqldatabase=farmerlink
```

# Licença

Este projeto é licenciado sob a [MIT License](https://github.com/tech-espm/misc-template/blob/main/LICENSE).

<p align="right">
    <a href="https://www.espm.br/cursos-de-graduacao/sistemas-de-informacao/"><img src="https://raw.githubusercontent.com/tech-espm/misc-template/main/logo-si-512.png" alt="Sistemas de Informação ESPM" style="width: 375px;"/></a>
</p>

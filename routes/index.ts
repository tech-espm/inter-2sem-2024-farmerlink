﻿import app = require("teem");

class IndexRoute {
	public async index(req: app.Request, res: app.Response) {
		res.render("index/index");
	}

	public async sobre(req: app.Request, res: app.Response) {
		let opcoes = {
			titulo: "Sobre"
		};

		res.render("index/sobre", opcoes);
	}

	public async produtosExemploRafa(req: app.Request, res: app.Response) {
		let produtoA = {
			id: 1,
			nome: "Produto A",
			valor: 25
		};

		let produtoB = {
			id: 2,
			nome: "Produto B",
			valor: 15
		};

		let produtoC = {
			id: 3,
			nome: "Produto C",
			valor: 100
		};

		let produtosVindosDoBanco = [ produtoA, produtoB, produtoC ];

		let opcoes = {
			titulo: "Listagem de Produtos",
			produtos: produtosVindosDoBanco
		};

		res.render("index/produtosExemploRafa", opcoes);
	}

	public async noticias(req: app.Request, res: app.Response) {
		let opcoes = {
			titulo: "Notícias"
		};

		res.render("index/noticias", opcoes);
	}

	public async cadastro(req: app.Request, res: app.Response) {
		let opcoes = {
			titulo: "Cadastro"
		};

		res.render("index/cadastro", opcoes);
	}

	public async login(req: app.Request, res: app.Response) {
		let opcoes = {
			titulo: "Login"
		};

		res.render("index/login", opcoes);
	}

	public async agricultores(req: app.Request, res: app.Response) {
		let opcoes = {
			titulo: "Agricultores"
		};

		res.render("index/agricultores", opcoes);
	}

}

export = IndexRoute;

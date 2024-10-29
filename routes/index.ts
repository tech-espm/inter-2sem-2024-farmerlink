import app = require("teem");

class IndexRoute {
	public async index(req: app.Request, res: app.Response) {
		res.render("index/index");
	}

	public async sobre(req: app.Request, res: app.Response) {
		let opcoes = {
			titulo: "Sobre nós"
		};

		res.render("index/sobre-nos", opcoes);
	}

	public async noticias(req: app.Request, res: app.Response) {
		let opcoes = {
			titulo: "Notícias"
		};

		res.render("index/noticias", opcoes);
	}

	public async cadastro(req: app.Request, res: app.Response) {
		let opcoes = {
			titulo: "Cadastrar"
		};

		res.render("index/cadastrar", opcoes);
	}

	public async login(req: app.Request, res: app.Response) {
		let opcoes = {
			titulo: "Entrar"
		};

		res.render("index/entrar", opcoes);
	}

	public async agricultores(req: app.Request, res: app.Response) {
		let opcoes = {
			titulo: "Produtores"
		};

		res.render("index/produtores", opcoes);
	}

}

export = IndexRoute;

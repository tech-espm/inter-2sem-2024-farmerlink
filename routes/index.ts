import app = require("teem");
import Fazendeiro = require("../models/fazendeiro");

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

	@app.http.post()
	public async criarFazendeiro(req: app.Request, res: app.Response) {
		// Os dados enviados via POST ficam dentro de req.body
		let fazendeiro: Fazendeiro = req.body;

		// É sempre muito importante validar os dados do lado do servidor,
		// mesmo que eles tenham sido validados do lado do cliente!!!
		if (!fazendeiro) {
			res.status(400);
			res.json("Dados inválidos");
			return;
		}

		if (!fazendeiro.nome) {
			res.status(400);
			res.json("Nome inválido");
			return;
		}

		await app.sql.connect(async (sql) => {

			// Todas os comandos SQL devem ser executados aqui dentro do app.sql.connect().
			await sql.beginTransaction();

			// As interrogações serão substituídas pelos valores passados ao final, na ordem passada.
			await sql.query("INSERT INTO usuario (nome, email, telefone, cpf, nascimento, cep) VALUES (?, ?, ?, ?, ?, ?)", [fazendeiro.nome, fazendeiro.email, fazendeiro.telefone, fazendeiro.cpf, fazendeiro.nascimento, fazendeiro.cep]); 
 
			fazendeiro.id = await sql.scalar("SELECT last_insert_id()");

			await sql.query("INSERT INTO fazendeiro (id, resumo, catalogo) VALUES (?, ?, ?)", [fazendeiro.id, fazendeiro.resumo, fazendeiro.catalogo]);

			await sql.commit();

		});

		res.json(true);
	}

}

export = IndexRoute;

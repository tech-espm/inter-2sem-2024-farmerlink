import app = require("teem");
import Usuario = require("../models/usuario");
import Fazendeiro = require("../models/fazendeiro");

class IndexRoute {
	public async index(req: app.Request, res: app.Response) {
		res.render("index/index");
	}

	public async 'sobre-nos'(req: app.Request, res: app.Response) {
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

	public async cadastrar(req: app.Request, res: app.Response) {
		let opcoes = {
			titulo: "Cadastrar"
		};

		res.render("index/cadastrar", opcoes);
	}

	public async entrar(req: app.Request, res: app.Response) {
		let opcoes = {
			titulo: "Entrar"
		};

		res.render("index/entrar", opcoes);
	}

	public async fazendeiros(req: app.Request, res: app.Response) {
		let opcoes = {
			titulo: "Fazendeiros",
			fazendeiros: null,
		};

		await app.sql.connect(async (sql) => {

			opcoes.fazendeiros = await sql.query(`
				SELECT
					u.id, u.nome, u.email, u.telefone, u.cep, f.resumo
				FROM usuario u
				INNER JOIN fazendeiro f ON f.id = u.id
				WHERE u.exclusao IS NULL
			`); 

		});

		res.render("index/fazendeiros", opcoes);
	}

	public async fazendeiro(req: app.Request, res: app.Response) {
		let id = parseInt(req.query["id"] as string);
		let icone = req.query["icone"] as string;
		let classe = req.query["classe"] as string;
	
		let opcoes = {
			titulo: "Fazendeiro",
			fazendeiro: null,
			icone: decodeURIComponent(icone || ""),
			classe: decodeURIComponent(classe || "")
		};
	
		await app.sql.connect(async (sql) => {
			let lista = await sql.query(`
				SELECT
					u.id, u.nome, u.email, u.telefone, u.cpf, u.nascimento, u.cep, f.resumo, f.catalogo
				FROM usuario u
				INNER JOIN fazendeiro f ON f.id = u.id
				WHERE u.id = ? AND u.exclusao IS NULL
			`, [id]);
	
			opcoes.fazendeiro = lista[0];
		});
	
		res.render("index/fazendeiro", opcoes);
	}

	public async perfil(req: app.Request, res: app.Response) {
		let id = parseInt(req.query["id"] as string);
		let icone = req.query["icone"] as string;
		let classe = req.query["classe"] as string;
	
		let opcoes = {
			titulo: "Fazendeiro",
			fazendeiro: null,
			icone: decodeURIComponent(icone || ""),
			classe: decodeURIComponent(classe || ""),
		};
	
		await app.sql.connect(async (sql) => {
			let lista = await sql.query(`
				SELECT
					u.id, u.nome, u.email, u.telefone, u.cep, f.resumo, f.catalogo
				FROM usuario u
				INNER JOIN fazendeiro f ON f.id = u.id
				WHERE u.id = ? AND u.exclusao IS NULL
			`, [id]);
	
			opcoes.fazendeiro = lista[0];
		});
	
		res.render("index/perfil", opcoes);
	}	

	@app.http.post()
	public async criarUsuario(req: app.Request, res: app.Response) {
		// Os dados enviados via POST ficam dentro de req.body
		let usuario: Usuario = req.body;

		// É sempre muito importante validar os dados do lado do servidor,
		// mesmo que eles tenham sido validados do lado do cliente!!!
		if (!usuario) {
			res.status(400);
			res.json("Dados inválidos");
			return;
		}

		if (!usuario.nome) {
			res.status(400);
			res.json("Nome inválido");
			return;
		}

		if (!usuario.email) {
			res.status(400);
			res.json("E-mail inválido");
			return;
		}

		if (!usuario.telefone) {
			res.status(400);
			res.json("Telefone inválido");
			return;
		}
		
		if (!usuario.cpf) {
			res.status(400);
			res.json("CPF inválido");
			return;
		}

		if (!usuario.nascimento) {
			res.status(400);
			res.json("Nascimento inválido");
			return;
		}
		
		if (!usuario.cep) {
			res.status(400);
			res.json("CEP inválido");
			return;
		}

		await app.sql.connect(async (sql) => {

			// As interrogações serão substituídas pelos valores passados ao final, na ordem passada.
			await sql.query("INSERT INTO usuario (nome, email, telefone, cpf, nascimento, cep) VALUES (?, ?, ?, ?, ?, ?)", [usuario.nome, usuario.email, usuario.telefone, usuario.cpf, usuario.nascimento, usuario.cep]); 

		});

		res.json(true);
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

		if (!fazendeiro.email) {
			res.status(400);
			res.json("E-mail inválido");
			return;
		}
		
		if (!fazendeiro.telefone) {
			res.status(400);
			res.json("Telefone inválido");
			return;
		}

		if (!fazendeiro.cpf) {
			res.status(400);
			res.json("CPF inválido");
			return;
		}

		if (!fazendeiro.nascimento) {
			res.status(400);
			res.json("Data de nascimento inválida");
			return;
		}

		if (!fazendeiro.cep) {
			res.status(400);
			res.json("CEP inválido");
			return;
		}

		if (!fazendeiro.resumo) {
			res.status(400);
			res.json("Resumo inválido");
			return;
		}

		if (!fazendeiro.catalogo) {
			res.status(400);
			res.json("Catálogo inválido");
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

	@app.http.post()
	public async editarFazendeiro(req: app.Request, res: app.Response) {
		// Os dados enviados via POST ficam dentro de req.body
		let fazendeiro: Fazendeiro = req.body;

		// É sempre muito importante validar os dados do lado do servidor,
		// mesmo que eles tenham sido validados do lado do cliente!!!
		if (!fazendeiro) {
			res.status(400);
			res.json("Dados inválidos");
			return;
		}

		if (!fazendeiro.id) {
			res.status(400);
			res.json("Id inválido");
			return;
		}

		if (!fazendeiro.nome) {
			res.status(400);
			res.json("Nome inválido");
			return;
		}

		if (!fazendeiro.email) {
			res.status(400);
			res.json("E-mail inválido");
			return;
		}
		
		if (!fazendeiro.telefone) {
			res.status(400);
			res.json("Telefone inválido");
			return;
		}

		if (!fazendeiro.cpf) {
			res.status(400);
			res.json("CPF inválido");
			return;
		}

		if (!fazendeiro.nascimento) {
			res.status(400);
			res.json("Data de nascimento inválida");
			return;
		}

		if (!fazendeiro.cep) {
			res.status(400);
			res.json("CEP inválido");
			return;
		}

		if (!fazendeiro.resumo) {
			res.status(400);
			res.json("Resumo inválido");
			return;
		}

		if (!fazendeiro.catalogo) {
			res.status(400);
			res.json("Catálogo inválido");
			return;
		}

		await app.sql.connect(async (sql) => {

			// Todas os comandos SQL devem ser executados aqui dentro do app.sql.connect().
			await sql.beginTransaction();

			// As interrogações serão substituídas pelos valores passados ao final, na ordem passada.
			await sql.query("UPDATE usuario SET nome = ?, email = ?, telefone = ?, cpf = ?, nascimento = ?, cep = ? WHERE id = ?", [fazendeiro.nome, fazendeiro.email, fazendeiro.telefone, fazendeiro.cpf, fazendeiro.nascimento, fazendeiro.cep, fazendeiro.id]); 
 
			await sql.query("UPDATE fazendeiro SET resumo = ?, catalogo = ? WHERE id = ?", [fazendeiro.resumo, fazendeiro.catalogo, fazendeiro.id]);

			await sql.commit();

		});

		res.json(true);
	}

	@app.http.delete()
	public async excluirFazendeiro(req: app.Request, res: app.Response) {
		// Os dados enviados via POST ficam dentro de req.body
		let fazendeiro: Fazendeiro = req.body;

		// É sempre muito importante validar os dados do lado do servidor,
		// mesmo que eles tenham sido validados do lado do cliente!!!
		if (!fazendeiro) {
			res.status(400);
			res.json("Dados inválidos");
			return;
		}

		if (!fazendeiro.id) {
			res.status(400);
			res.json("Id inválido");
			return;
		}

		let erro: string = null;

		await app.sql.connect(async (sql) => {

			// Todas os comandos SQL devem ser executados aqui dentro do app.sql.connect().
			await sql.beginTransaction();

			let lista: Fazendeiro[] = await sql.query("SELECT id FROM fazendeiro WHERE id = ?", [fazendeiro.id]);
			if (!lista.length) {
				erro = "Fazendeiro não encontrado!";
				return;
			}

			await sql.query("DELETE FROM usuario WHERE id = ?", [fazendeiro.id]); 

			await sql.commit();

		});

		if (erro) {
			res.status(400);
			res.json(erro);
			return;
		}

		res.json(true);
	}

}

export = IndexRoute;
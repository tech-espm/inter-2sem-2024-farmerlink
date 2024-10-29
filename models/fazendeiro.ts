import Usuario = require("./usuario");

interface Fazendeiro extends Usuario {
	resumo: string;
	catalogo: string;
}

export = Fazendeiro;

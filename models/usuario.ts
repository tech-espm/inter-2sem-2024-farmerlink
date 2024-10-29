
interface Usuario {
	id: number;
	nome: string;
	email: string;
	telefone: string;
	cpf: string;
	nascimento: string;
	cep: string;
	exclusao: string | null;
}

export = Usuario;

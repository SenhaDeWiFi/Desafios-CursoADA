let turmas = []
let alunos = []
const regexDeEmail = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/
const regexDeData = /\d{1,2}\/\d{1,2}\/\d{2,4}/


const listaDeTurmas = [
    {
        codigo: 1,
        maximo: 6
    },
    {
        codigo: 2,
        maximo: 7
    },
    {
        codigo: 5,
        maximo: 10
    },
    {
        codigo: 3,
        maximo: 8
    },
]

const listaDeAlunos = [ 
    {
        nome: "joao",
        sobrenome: "silva",
        email : "joaosilva@email.com",
        turma : 3,
        nascimento : "22/04/2003",
        notas : [2, 3, 4, 5, 4]
    },
    {
        nome: "mateus",
        sobrenome: "canella",
        email : "mateuscanella@email.com",
        turma : 2,
        nascimento : "10/03/2000",
        notas : [7, 7, 5, 7, 7]
    },
    {
        nome: "lucas",
        sobrenome: "vinicius",
        email : "lucasvinicius@email.com",
        turma : 2,
        nascimento : "10/10/2000",
        notas : [8, 7, 5, 5, 6]
    },
    {
        nome: "joao",
        sobrenome: "silva",
        email : "joaosilva01@email.com",
        turma : 1,
        nascimento : "21/05/2004",
        notas : [2, 3, 4, 5, 4]
    },
    {
        nome: "mike",
        sobrenome: "wazowski",
        email : "monstrosSA@email.com",
        turma : 3,
        nascimento : "19/08/1998",
        notas : [8, 9, 7, 4, 9]
    }
]

listaDeTurmas.map(a => cadastrarTurma(a.codigo, a.maximo))
listaDeAlunos.map(a => cadastrarAluno(a.nome, a.sobrenome, a.email, a.turma, a.nascimento, a.notas))

// Cadastro de turma
function cadastrarTurma(codigo, maximo){
    codigo = parseInt(codigo)
    maximo = parseInt(maximo)

    if (codigo < 1 || codigo > 10) {
        throw new Error("Código inválido!")
    }
    if (maximo < 5 || maximo> 10) {
        throw new Error("Maximo de alunos inválido!")
    }

    if (turmas.find(turma => turma.codigo == codigo)) {
        console.log("Código de turma já em uso.")
    }else turmas.push({codigo, maximo})
}

// Cadastro de aluno
function cadastrarAluno(nome, sobrenome, email, turma, nascimento, notas){
    nome.trim()
    nome = nome[0].toUpperCase() + nome.slice(1)
    sobrenome.trim()
    sobrenome = sobrenome[0].toUpperCase() + sobrenome.slice(1)
    
    let ativo = true

    if (turmas.find(curr => curr.codigo == parseInt(turma))) {
    }else throw new Error("Turma inválida!")

    if (notas.length > 5 || notas.length < 1) {
        throw new Error("Insira um número de notas válido")
    }

    if (!regexDeEmail.test(email)) {
        throw new Error("Email inválido!")
    }

    if (!regexDeData.test(nascimento)){
        throw new Error("Insira uma data válida!")
    } else if (maiorDeIdade(nascimento)) {   
    } else throw new Error("Aluno menor de 16 anos!")

    if (alunos.find(aluno => aluno.email == email)) {
        throw new Error("Aluno já cadastrado.")
    }else alunos.push({nome, sobrenome, email, turma, nascimento, notas, ativo})
}

// Retorna a média do aluno-alvo
function mediaAluno(email){
    const alunoEncontrado = alunos.find(aluno => aluno.email === email)
    let mediaAluno = alunoEncontrado.notas.reduce((acc, curr) =>{
        media = acc + curr
        return media
    })/alunoEncontrado.notas.length
    return mediaAluno
}

// Retorna true se o usuário for maior de idade ou não
function maiorDeIdade(dataDeNascimento){
    dataDeNascimento = ""+ dataDeNascimento
    const partesData = dataDeNascimento.split('/');
    const dia = parseInt(partesData[0]);
    const mes = parseInt(partesData[1]);
    const ano = parseInt(partesData[2]);

    const dataNascimentoObj = new Date(ano, mes - 1, dia);
    const hoje = new Date();

    const idade = hoje.getFullYear() - dataNascimentoObj.getFullYear();

  return idade >= 16;
}

// "Edita" um aluno, apagando e criando de novo
function atualizarAluno(emailAlunoAlvo, nome, sobrenome, email, turma, nascimento, notas){
    removerAluno(emailAlunoAlvo)
    cadastrarAluno(nome, sobrenome, email, turma, nascimento, notas )
}

// Retorna todos os alunos
function retornarAlunos(){return alunos}

// Retorna a quantidade de turmas
function retornarQtdTurmas(){return turmas.length}

// Retorna a quantidade de alunos ativos
function getAlunosAtivos() {
    return alunos.filter(curr => curr.ativo)
}

// Retorna a quantidade de alunos inativos
function getAlunosInativos() {
    return alunos.filter(curr => !curr.ativo)
}

// Remove o aluno-alvo
function removerAluno(alunoEmail){
    alunos.splice(alunos.findIndex(aluno => aluno.email == alunoEmail))
}

// Desativa o aluno-alvo
function desativarAluno(alunoEmail){
    let alunoAlvo = alunos.find(aluno => aluno.email == alunoEmail)
    alunoAlvo.ativo = false
    return alunoAlvo
}

// Retorna os dados do aluno-alvo
function getAluno(alunoEmail){
    return alunos.find(aluno => aluno.email == alunoEmail)
}

// Retorna uma lista de alunos com média maior que 6
function alunosAprovados() {
    return alunos.filter(curr => mediaAluno(curr.email) >= 6)
}

// Retorna uma lista de alunos com média menor que 6
function alunosReprovados() {
    return alunos.filter(curr => mediaAluno(curr.email) < 6)
}

// Retorna o "Relatório Completo"
function relatorioCompleto(){
    console.log("A quantidade de alunos é " + alunos.length)
    console.log("A quantidade de turmas é " + retornarQtdTurmas())
    console.log("Os alunos com media para passar são ", alunosAprovados())
    console.log("Os alunos sem media para passar são ", alunosReprovados())
}

// Retorna uma lista com todas as médias
function todasAsMedias(){
    let mediAlunos = []
    alunos.map((x) => {
        mediAlunos.push({aluno : x, media : mediaAluno(x.email)})
    })
    return mediAlunos
}
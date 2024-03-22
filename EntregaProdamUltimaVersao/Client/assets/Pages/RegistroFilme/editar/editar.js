const dados = localStorage.getItem('filme');
const filme = JSON.parse(dados);
console.log(filme);

function pegarElemento(id) {
    elemento = document.getElementById(id);
    return elemento;
}

function obterValorDoCampo(nome) {
    var elemento = document.querySelector('input[name="' + nome + '"]');
    return elemento ? elemento.value : null;
}

const nome = pegarElemento('nome');
const valor = pegarElemento('valor');
const descricao = pegarElemento('descricao');




nome.value= filme.nome;
valor.value = filme.valor;
descricao.value= filme.descricao;





async function atualizarfilmeNoServidor(id, dadosAtualizados) {
    const url = `http://localhost:8080/filme/${id}`;
    
    try {
        const response = await fetch(url, {
            method: 'PUT',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(dadosAtualizados),
        });

        if (!response.ok) {
            throw new Error(`Erro na solicitação: ${response.status}`);
        }

        const filmeAtualizado = await response.json();
        console.log('filme atualizado com sucesso:', filmeAtualizado);
        return filmeAtualizado.id; 
    } catch (error) {
        console.error('Erro ao atualizar filme:', error);
        throw error;
    }
}

document.getElementById('meuFormulario').addEventListener('submit', async function (event) {
    event.preventDefault();

    var formDatafilme = {
        id: filme.id,
        nome: obterValorDoCampo("nome_filme"),
        valor: obterValorDoCampo("valor_filme"),
        descricao: obterValorDoCampo("descricao_filme"),

    };
    
    console.log(formDatafilme);

    try {
        const idAtualizado = await atualizarfilmeNoServidor(filme.id, formDatafilme);
        console.log(`filme atualizado com sucesso. ID: ${idAtualizado}`);
        alert(`filme atualizado com sucesso. ID: ${idAtualizado}`)
         window.location.href = "http://127.0.0.1:5500/assets/Pages/RegistroFilme/Registro.html";
    } catch (error) {
        console.error('Erro ao atualizar filme:', error);
    }





});

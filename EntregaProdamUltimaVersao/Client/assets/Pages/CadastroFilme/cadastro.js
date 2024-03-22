document.getElementById('meuFormulario').addEventListener('submit', async function (event) {
    event.preventDefault(); // Evita que o formulário seja enviado da maneira tradicional

    // Função para obter o valor de um campo de entrada por nome
    function obterValorDoCampo(nome) {
        var elemento = document.querySelector('input[name="' + nome + '"]');
        return elemento ? elemento.value : null;
    }

    // Coletando dados do formulário
    var formDataFilme = {
        nome: obterValorDoCampo("nome_filme"),
        valor: obterValorDoCampo("valor_filme"),
        descricao: obterValorDoCampo("descricao_filme"),
    };


    

  

    // Convertendo dados para JSON
    var jsonDataFornecedor = JSON.stringify(formDataFilme);
    

    // Enviando dados para o backend
    enviarParaServidor("http://localhost:8080/filme", jsonDataFornecedor);


   

       
    }
);

async function enviarParaServidor(url, dados) {
    const response = await fetch(url, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: dados,
    });

    if (!response.ok) {
        throw new Error(`Erro na solicitação: ${response.status}`);
    }

    const responseBody = await response.json();
    console.log('Resposta do servidor:', responseBody);
    window.location.href = "http://127.0.0.1:5500/assets/Pages/RegistroFilme/Registro.html";
    return responseBody.id;
}














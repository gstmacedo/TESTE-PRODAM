localStorage.clear();
async function enviarParaServidor(url) {
    try {
        const response = await fetch(url, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
            },
        });

        if (!response.ok) {
            throw new Error(`Erro na solicitação: ${response.status}`);
        }

        const responseBody = await response.json();
        console.log('Resposta completa do servidor:', responseBody);

        
        return responseBody; 
    } catch (error) {
        console.error('Erro:', error);
        throw error;
    }
}
async function deletePorId(id) {
    const url = `http://localhost:8080/filme/${id}`;

    fetch(url, {
        method: 'DELETE',
        headers: {
            'Content-Type': 'application/json',
        },
    })
    .then(response => {
        if (!response.ok) {
            throw new Error(`Erro na solicitação: ${response.status}`);
        }
        return response.json();
    })
    .then(data => {
       
        if (data) {
            console.log(data);
        } else {
            console.error('Erro: A resposta não contém dados JSON válidos.');
        }
    })
    .catch(error => console.error('Erro:', error));
    location.reload(true);
}

async function editarPorId(id) {
    try {
        // Obter informações do filme pelo ID
        const filme = await enviarParaServidor(`http://localhost:8080/filme/${id}`);
        localStorage.setItem('filme',JSON.stringify(filme));
        // Redirecionar para a tela de edição com as informações do filme
        window.location.href = `/assets/Pages/RegistroFilme/editar/editar.html`;
        console.log(filme);
    } catch (error) {
        console.error('Erro ao obter filme para edição:', error);
    }
}



// Exemplo de uso
async function obterEMostrarFilmes() {
    try {
        const respostaServidor = await enviarParaServidor("http://localhost:8080/filme");

        console.log('Resposta completa do servidor:', respostaServidor);

        
        const listaFilmes = respostaServidor;

        if (Array.isArray(listaFilmes) && listaFilmes.length > 0) {
            
            const contentMain = document.querySelector('.content__main');

           
            listaFilmes.forEach(filme => {
                const div = document.createElement('div');
                const paragrafo = document.createElement('p');
                paragrafo.textContent = `ID: ${filme.id},Nome: ${filme.nome}, Valor por dia: ${filme.valor} reais, Descrição: ${filme.descricao}`;
                const btn = document.createElement('button');
                btn.textContent = 'Editar';
                const btn_delete = document.createElement('button');
                btn_delete.textContent = 'Excluir';
                btn.addEventListener('click', () => editarPorId(filme.id));
                btn_delete.addEventListener('click', () => deletePorId(filme.id));


                contentMain.appendChild(div);
                div.classList.add(`conteudo`);
                div.appendChild(paragrafo);
                div.appendChild(btn);
                div.appendChild(btn_delete);
            });
        } else {
            console.error('A lista de filme está vazia ou não é uma lista válida.');
        }
    } catch (error) {
        
        console.error('Erro ao obter filmes:', error);
    }
}


obterEMostrarFilmes();





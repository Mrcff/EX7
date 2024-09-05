// Array para armazenar as tarefas
let tarefas = [];

// Função para gerar um ID único
function gerarId() {
    return Math.floor(Math.random() * 10000);
}

// Função para renderizar a lista de tarefas
function renderizarTarefas() {
    const lista = document.getElementById('lista-tarefas');
    lista.innerHTML = ''; // Limpa a lista antes de renderizar

    tarefas.forEach(tarefa => {
        const li = document.createElement('li');
        li.innerHTML = `
      ${tarefa.nome} - ${tarefa.status} (ID: ${tarefa.id})
      <div>
        <button onclick="editarTarefa(${tarefa.id})">Editar</button>
        <button onclick="removerTarefa(${tarefa.id})">Remover</button>
      </div>
    `;
        lista.appendChild(li);
    });
}

// Função para adicionar uma nova tarefa
document.getElementById('form-tarefa').addEventListener('submit', function (event) {
    event.preventDefault(); // Evita o envio do formulário

    const nome = document.getElementById('nome').value;
    const status = document.getElementById('status').value;

    const novaTarefa = {
        id: gerarId(),
        nome: nome,
        status: status
    };

    tarefas.push(novaTarefa);
    renderizarTarefas();

    // Limpar campos
    document.getElementById('nome').value = '';
});

// Função para remover uma tarefa
function removerTarefa(id) {
    tarefas = tarefas.filter(tarefa => tarefa.id !== id);
    renderizarTarefas();
}

// Função para editar uma tarefa
function editarTarefa(id) {
    const tarefa = tarefas.find(tarefa => tarefa.id === id);

    if (tarefa) {
        const novoNome = prompt("Digite o novo nome da tarefa:", tarefa.nome);
        const novoStatus = prompt("Digite o novo status da tarefa (pendente, em andamento, concluída):", tarefa.status);

        if (novoNome) tarefa.nome = novoNome;
        if (novoStatus) tarefa.status = novoStatus;

        renderizarTarefas();
    }
}

// Função para buscar uma tarefa pelo ID e exibir na página
function buscarTarefa() {
    const id = parseInt(document.getElementById('buscar-id').value); // Pega o valor digitado no campo de busca
    const tarefa = tarefas.find(tarefa => tarefa.id === id); // Busca a tarefa no array

    const resultadoBusca = document.getElementById('resultado-busca');

    if (tarefa) {
        resultadoBusca.innerHTML = `<p>Tarefa encontrada: ${tarefa.nome} - ${tarefa.status}</p>`;
    } else {
        resultadoBusca.innerHTML = `<p>Tarefa não encontrada.</p>`;
    }
}

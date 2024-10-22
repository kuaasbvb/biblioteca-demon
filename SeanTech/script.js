// Array para armazenar reservas
let reservas = [];

// Função para abrir o modal de informações do livro
function abrirModal(titulo, autor, imagem) {
    const modal = document.getElementById('modal');
    const modalTitulo = document.getElementById('modal-titulo');
    const modalAutor = document.getElementById('modal-autor');
    const modalImg = document.getElementById('modal-img');

    // Popula o modal com os dados do livro
    modalTitulo.textContent = titulo;
    modalAutor.textContent = 'Autor: ' + autor;
    modalImg.src = imagem;

    // Exibe o modal
    modal.classList.remove('hidden');
}

// Função para fechar o modal de informações do livro
function fecharModal() {
    const modal = document.getElementById('modal');
    modal.classList.add('hidden');
}

// Função para abrir o modal de adicionar livro
function abrirModalAdicionar() {
    const modalAdicionar = document.getElementById('modal-adicionar');
    modalAdicionar.classList.remove('hidden');
}

// Função para fechar o modal de adicionar livro
function fecharModalAdicionar() {
    const modalAdicionar = document.getElementById('modal-adicionar');
    modalAdicionar.classList.add('hidden');
}

// Função para abrir o modal de formulário de reserva
function abrirFormularioReserva() {
    const modalReserva = document.getElementById('modal-reserva');
    modalReserva.classList.remove('hidden');
}

// Função para fechar o modal de formulário de reserva
function fecharFormularioReserva() {
    const modalReserva = document.getElementById('modal-reserva');
    modalReserva.classList.add('hidden');
}

// Função para adicionar um livro (simulação)
function adicionarLivro(event) {
    event.preventDefault();
    const titulo = document.getElementById('titulo').value;
    const autor = document.getElementById('autor').value;
    const imagem = document.getElementById('imagem').value;

    const livrosDiv = document.querySelector('.livros');
    const novoLivroDiv = document.createElement('div');
    novoLivroDiv.classList.add('livro');
    novoLivroDiv.setAttribute('tabindex', '0');
    novoLivroDiv.setAttribute('role', 'button');
    novoLivroDiv.setAttribute('aria-label', `Abrir detalhes de ${titulo}`);
    novoLivroDiv.onclick = function () {
        abrirModal(titulo, autor, imagem);
    };

    const imgLivro = document.createElement('img');
    imgLivro.src = imagem;
    imgLivro.alt = `Capa do livro ${titulo}`;

    const tituloLivro = document.createElement('h3');
    tituloLivro.textContent = titulo;

    const autorLivro = document.createElement('p');
    autorLivro.textContent = `Autor: ${autor}`;

    novoLivroDiv.appendChild(imgLivro);
    novoLivroDiv.appendChild(tituloLivro);
    novoLivroDiv.appendChild(autorLivro);

    livrosDiv.appendChild(novoLivroDiv);
    fecharModalAdicionar(); // Fecha o modal após adicionar
}

// Função para salvar a reserva de livro (simulação)
function salvarReserva(event) {
    event.preventDefault();
    const nomeAluno = document.getElementById('nomeAluno').value;
    const tempoReserva = document.getElementById('tempoReserva').value;
    const telefone = document.getElementById('telefone').value;

    const reserva = {
        aluno: nomeAluno,
        tempo: tempoReserva,
        telefone: telefone,
    };

    reservas.push(reserva);
    atualizarListaReservas(); // Atualiza a lista de reservas
    fecharFormularioReserva(); // Fecha o modal após salvar
}

// Função para atualizar a lista de reservas exibida
function atualizarListaReservas() {
    const reservasDiv = document.getElementById('reservas-lista');
    reservasDiv.innerHTML = ''; // Limpa a lista existente

    reservas.forEach((reserva, index) => {
        const novaReservaDiv = document.createElement('div');
        novaReservaDiv.classList.add('reserva');

        // Adiciona informações da reserva
        novaReservaDiv.innerHTML = `
            <p>Aluno: ${reserva.aluno}</p>
            <p>Tempo de Reserva: ${reserva.tempo} dias</p>
            <p>Telefone: ${reserva.telefone}</p>
            <button onclick="removerReserva(${index})" class="btn-remover">Remover Reserva</button>
        `;

        reservasDiv.appendChild(novaReservaDiv);
    });
}

// Função para remover uma reserva
function removerReserva(index) {
    reservas.splice(index, 1); // Remove a reserva do array
    atualizarListaReservas(); // Atualiza a lista de reservas
}

// Adicionando evento aos botões de fechar (X)
document.querySelectorAll('.fechar').forEach(button => {
    button.addEventListener('click', function() {
        const modal = button.closest('.modal');
        modal.classList.add('hidden'); // Esconde o modal correspondente
    });
});

// Função para fechar modais ao pressionar ESC
function fecharModalEsc(event) {
    if (event.key === "Escape") {
        const modalReserva = document.getElementById('modal-reserva');
        const modalAdicionar = document.getElementById('modal-adicionar');
        const modalInformacao = document.getElementById('modal');

        // Verifica se os modais estão abertos, se sim, fecha
        if (!modalReserva.classList.contains('hidden')) {
            modalReserva.classList.add('hidden');
        }
        if (!modalAdicionar.classList.contains('hidden')) {
            modalAdicionar.classList.add('hidden');
        }
        if (!modalInformacao.classList.contains('hidden')) {
            modalInformacao.classList.add('hidden');
        }
    }
}

// Adiciona um listener global para capturar a tecla ESC
document.addEventListener('keydown', fecharModalEsc);

// Função para filtrar os livros com base na pesquisa
function filtrarLivros() {
    const pesquisa = document.getElementById('campo-pesquisa').value.toLowerCase();
    const livros = document.querySelectorAll('.livro');

    livros.forEach(livro => {
        const titulo = livro.querySelector('h3').textContent.toLowerCase();
        const autor = livro.querySelector('p').textContent.toLowerCase();

        // Verifica se o título ou autor contém o texto da pesquisa
        if (titulo.includes(pesquisa) || autor.includes(pesquisa)) {
            livro.style.display = ''; // Exibe o livro
        } else {
            livro.style.display = 'none'; // Oculta o livro
        }
    });
}

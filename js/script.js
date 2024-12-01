
// Função para aplicar a máscara no campo de CEP
function mascaraCEP(input) {
    var cep = input.value.replace(/\D/g, ''); // Remove caracteres não numéricos
    if (cep.length <= 5) {
        input.value = cep.replace(/(\d{5})(\d{0,3})/, '$1-$2'); // Aplica o formato 'xxxxx-xxx'
    } else {
        input.value = cep.replace(/(\d{5})(\d{0,3})/, '$1-$2'); // Formata o CEP
    }
}

// Função chamada quando o campo de CEP perde o foco ou ao pressionar Enter
document.getElementById('NumCEP').addEventListener('blur', buscarEndereco);
document.getElementById('NumCEP').addEventListener('keypress', function(event) {
    if (event.key === 'Enter') {
        buscarEndereco();
    }
});

// Função para buscar o endereço via API ViaCEP
function buscarEndereco() {
    // Recupera o valor do CEP informado, sem o hífen
    const cep = document.getElementById('NumCEP').value.replace(/\D/g, '');

    // Valida o CEP (deve ter 8 dígitos)
    if (cep.length === 8) {
        // Faz a requisição para a API ViaCEP
        const url = `https://viacep.com.br/ws/${cep}/json/`;

        fetch(url)
            .then(response => response.json())
            .then(data => {
                if (!data.erro) {
                    // Preenche os campos com os dados retornados da API
                    document.getElementById('Endereco').value = data.logradouro;
                    document.getElementById('NomeBairro').value = data.bairro;
                    document.getElementById('Cidade').value = data.localidade;
                    document.getElementById('Uf').value = data.uf;
                } else {
                    alert("CEP não encontrado!");
                    limparCampos();
                }
            })
            .catch(error => {
                alert("Erro ao buscar o CEP!");
                console.error(error);
                limparCampos();
            });
    } else {
        alert("CEP inválido! O CEP deve ter 8 dígitos.");
        limparCampos();
    }
}                                               

// Função para limpar os campos de endereço em caso de erro ou CEP inválido
function limparCampos() {
    document.getElementById('Endereco').value = '';
    document.getElementById('NomeBairro').value = '';
    document.getElementById('cidade').value = '';
    document.getElementById('Uf').value = '';
}
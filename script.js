document.addEventListener('DOMContentLoaded', () => {
  const clientIdElement = document.getElementById('client-id');
  const clientImageElement = document.getElementById('client-image');
  const cutsContainer = document.getElementById('cuts-container');
  const addCutButton = document.getElementById('add-cut');
  let cuts = 0;

  // Função para buscar dados do cliente
  async function fetchClientData() {
      try {
          const response = await fetch('https://api.exemplo.com/client');
          const data = await response.json();
          clientIdElement.textContent = `ID: ${data.id}`;
          clientImageElement.src = data.image;
      } catch (error) {
          console.error('Erro ao buscar dados do cliente:', error);
      }
  }

  // Função para atualizar o cartão de fidelidade
  function updateLoyaltyCard() {
      cutsContainer.innerHTML = '';
      for (let i = 1; i <= 10; i++) {
          const cutElement = document.createElement('div');
          cutElement.classList.add('cut');
          if (i <= cuts) {
              cutElement.classList.add('completed');
              cutElement.textContent = '✓';
          }
          cutsContainer.appendChild(cutElement);
      }
  }

  // Evento para adicionar um corte
  addCutButton.addEventListener('click', () => {
      if (cuts < 10) {
          cuts++;
          updateLoyaltyCard();
      } else {
          alert('Você ganhou um corte grátis!');
          cuts = 0;
          updateLoyaltyCard();
      }
  });

  // Inicialização
  fetchClientData();
  updateLoyaltyCard();
});

function checkTokenAndRedirect() {
  // Verifica se o token está no armazenamento local
  const token = localStorage.getItem('token');

  // Se o token não existir, redirecione o usuário para a página de login
  if (!token) {
    window.location = '/login';
  }
}

export default checkTokenAndRedirect;
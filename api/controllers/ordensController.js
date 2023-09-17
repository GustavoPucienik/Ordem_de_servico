/* eslint-disable class-methods-use-this */
class OrdensController {
  static cadastrar(req, res) {
    try {
      const cadastra = { mensagem: "Pagina para criar ordens de serviço." };
      return res.status(200).json(cadastra);
    } catch (error) {
      return res.status(500).json(error.message);
    }
  }
}

module.exports = OrdensController;

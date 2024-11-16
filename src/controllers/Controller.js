export default class Controller {
  constructor(service) {
    this.service = service;
  }

  async pegaTodos(req, res) {
    try {
      const registrosRetornados = await this.service.pegaTodosOsRegistros();
      res.status(200).json(registrosRetornados);
    } catch (error) {
      console.error(`nao foi possivel retornar dos items: ${error}`);
    }
  }
  async pegaPorId(req, res) {
    try {
      const livroEncontrado = await this.service.pegaRegistroPorId(
        req.params.id,
      );
      res.status(200).json(livroEncontrado);
    } catch (error) {
      console.log(`nao foi possivel acessar objeto para esse id`);
      res
        .status(404)
        .json({ message: "nao foi possivel encontrar objeto para esse id" });
    }
  }
  async criar(req, res) {
    try {
      await this.service.criaNovoRegistro(req.body);
      res.status(201).json({ message: "item cadastrado" });
    } catch (error) {
      console.error(`nao foi possivel adicionar item: ${error}`);
    }
  }
  async atualizaPorId(req, res) {
    try {
      await this.service.atualizaRegistroPorId(req.params.id, req.body);
      res.status(200).json({ message: "item atualizado" });
    } catch (error) {
      console.log(`nao foi possivel atualizar objeto: ${error}`);
    }
  }
  async deletaPorId(req, res) {
    try {
      await this.service.deletaRegistroPorId(req.params.id);
      res.status(200).json({ message: "item deletado" });
    } catch (error) {
      console.log(`nao foi possivel deletar item: ${error}`);
    }
  }
}

import db from "../models/index.js";

export default class Service {
  constructor(modelName) {
    this.model = modelName;
  }
  async pegaTodosOsRegistros() {
    return db[this.model].findAll();
  }
  async pegaRegistroPorId(id) {
    return db[this.model].findByPk(id);
  }
  async criaNovoRegistro(DTO) {
    return db[this.model].create(DTO);
  }
  async atualizaRegistroPorId(id, DTO) {
    db[this.model].update(DTO, {
      where: { id },
    });
    return registro.save();
  }
  async deletaRegistroPorId(id) {
    const registro = this.pegaRegistroPorId(id);
    return registro.destroy();
  }
}

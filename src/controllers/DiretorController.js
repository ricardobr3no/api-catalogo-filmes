import Controller from "./Controller.js";
import DiretorService from "../services/DiretorService.js"

const diretorService = new DiretorService()

export default class DiretorController extends Controller {
  constructor() {
    super(diretorService);
  }
}
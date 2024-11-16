import GeneroService from "../services/GeneroService.js";
import Controller from "./Controller.js";

const generoService = new GeneroService();

export default class GeneroController extends Controller {
  constructor() {
    super(generoService);
  }
}

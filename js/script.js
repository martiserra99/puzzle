import { setupNewElements } from "./elements/elements.js";
import { Controller } from "./mvc/controller/controller.js";
import { Model } from "./mvc/model/model.js";
import { View } from "./mvc/view/view.js";

setupNewElements();

const view = new View();
const model = new Model();
const app = new Controller(view, model);

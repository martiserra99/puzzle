import canvasUI from "../../../canvas-user-interface.js";
import { config } from "../../../config.js";

export class PlayButtonView {
  id = "playButton";

  constructor() {
    this.playButtonElement = this._build();
  }

  _build() {
    const playButton = canvasUI.composite.new(this.id, "textArea");
    playButton.set("size", {
      width: { unit: "px", value: 150 },
      height: { unit: "px", value: 45 },
    });
    playButton.set("text", "Play");
    playButton.set("color", config.styles.button.color);
    playButton.set("background", config.styles.button.background);
    playButton.set("border", config.styles.button.border);
    playButton.set("corner", config.styles.button.corner);
    playButton.set("font", config.styles.button.font);
    return playButton;
  }

  handlerClick(handler) {
    this.playButtonElement.listeners.add("click", function (element) {
      handler();
    });
  }
}

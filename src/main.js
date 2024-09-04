import plugin from '../plugin.json';
const SideButton = acode.require('sideButton');

class AcodePlugin {
  #style;
  #fingerHold = false;
  #ws;

  async init() {
    console.info('Задаём стиль')
    // Устанавливаем дополнительные стили в документ
    this.#style = document.createElement('style');
    this.#style.textContent = '.ace_breakpoint {border-radius: 20px 0px 0px 20px; background: #652020;}';
    document.head.appendChild(this.#style);

    window.acode.addIcon('btn-icn', 'https://s.iimg.su/s/04/9eqJxr5oVbMjFs7FyN23aaxg0LgTIh6c8SEC5TpU.png');
    const sideButton = SideButton({
      text: 'My Side Button',
      icon: 'btn-icn',
      onclick: this.wsConnect.bind(this),
      backgroundColor: '#fff',
      textColor: '#000',
    });

    console.info('Задаём слушателя')
    window.editorManager.editor.on('guttermousedown', this.toggleBreakpointByClick.bind(this));

    console.info('Задаём команду')
    const {commands} = window.editorManager.editor;
    commands.addCommand({
      name: 'Toggle breakpoint',
      bindKey: {
        win: 'F9', mac: 'F9'
      },
      // exec: this.toggleBreakpoint.bind(this, window.editorManager.editor),
      exec: () => {
        console.info(window.editorManager.editor.getCursorPosition())
        console.info(window.editorManager.editor.getSelectionRange())
        console.info(window.editorManager.editor.getSelection())
        console.info(window.editorManager.editor.multiSelect)
      }
    })
  }

  async destroy() {
    this.#style = null;

    const {commands} = window.editorManager.editor;
    commands.removeCommand('Toggle breakpoint');
    window.editorManager.editor.removeListener('guttermousedown', this.toggleBreakpointByClick.bind(this));
  }

  /**
   * Изменяет состояние точки останова в строке row. Если для state указано булевое значение, то это оно
   * будет установлено невзирая на текущее состояние (true - установлена, false - не установлена).
   * Если state не задано, состояние будет изменено на противоположное..
   * @param {number} row
   * @param {boolean|undefined} [state]
   */
  toogleBreakpoint(row, state) {
    console.info('on toogleBreakpoint')
    const editor = window.editorManager.editor;
    const breakpoints = editor.session.getBreakpoints();

    if (state === undefined) {
      state = !breakpoints[row];
    }
    if (state) {
      editor.session.setBreakpoint(row);
    } else {
      editor.session.clearBreakpoint(row);
    }
    console.info('off toogleBreakpoint')
  }

  toggleBreakpointByClick(event) {
    console.info('on toggleBreakpointByClick')
    this.toogleBreakpoint(event.getDocumentPosition().row);
    console.info('off toggleBreakpointByClick')
  }

  wsConnect() {
    this.#ws = new WebSocket('ws://localhost:8080');
    this.#ws.onmessage = (event) => {
      document.getElementById('output').innerText += event.data + '\n';
    };
  }


}

if (window.acode) {
  const acodePlugin = new AcodePlugin();
  acode.setPluginInit(plugin.id, (baseUrl, $page, cache) => {
    acodePlugin.init();
  });
  acode.setPluginUnmount(plugin.id, () => {
    acodePlugin.destroy();
  });
}


function test() {

  window.editorManager.editor.session.setBreakpoint(4);
  console.log(window);
  console.log(window.editorManager.editor);
  
}


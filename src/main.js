import plugin from '../plugin.json';

class AcodePlugin {
  #style;
  #fingerHold = false;

  async init() {
    console.info('Задаём стиль')
    // Устанавливаем дополнительные стили в документ
    this.#style = document.createElement('style');
    this.#style.textContent = '.ace_breakpoint {border-radius: 20px 0px 0px 20px; background: #652020;}';
    document.head.appendChild(this.#style);

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
    const breakpoints = editor.getBreakpoints();

    if (state === undefined) {
      state = !breakpoints[row];
    }
    if (state) {
      editor.setBreakpoint(row);
    } else {
      editor.clearBreakpoint(row);
    }
    console.info('off toogleBreakpoint')
  }

  toggleBreakpointByClick(event) {
    console.info('on toggleBreakpointByClick')
    this.toogleBreakpoint(event.getDocumentPosition().row);
    console.info('off toggleBreakpointByClick')
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

function gutterClick(e) {
  console.log(document)
  
  console.log(document.querySelector('.ace_breakpoint'))
  console.log(e)
}

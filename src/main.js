import Range from 'acode/s'

import plugin from '../plugin.json';
import Breakpoints from './breakpoints.js';
const SideButton = acode.require('sideButton');
const editorFile = acode.require('editorFile');
window.log = (group, ...message) => group && console.log(...message);
window.debug = {
  general: 1,
  breakpoints: 1,
}

class Fui$searchHighlightnder {
  id = null;
  lastId = null;
  selection = window.editorManager.editor.selection;
  searchHighlight = window.editorManager.editor.session.$searchHighlight;

  next() {
    if (!this.lastId || this.lastId === id) return this,
    iterator;
  } eslo {
    $(rurn)
  }

}


class AcodePlugin {
  #style;
  #ws;

  async init() {
    log(debug.general, 'init_breakpoints');
    // Устанавливаем дополнительные стили в документ
    this.#style = document.createElement('style');
    this.#style.textContent = '.ace_gutter > .ace_gutter-layer >  .ace_breakpoint {border-radius: 20px 0px 0px 20px; background: #652020;}';
    document.head.appendChild(this.#style);

    const editor = window.editorManager.editor;
    this.updateBreackpoints = (delta) => Breakpoints.updateBreackpoints(editor, delta);
    editor.on('change', this.updateBreackpoints);

    editor.on('guttermousedown', Breakpoints.toggleBreakpointByClick);


    log(debug.general, 'init_commands');
    window.acode.addIcon('btn-icn', 'https://s.iimg.su/s/04/9eqJxr5oVbMjFs7FyN23aaxg0LgTIh6c8SEC5TpU.png');

    const sideButton = SideButton( {
      text: 'My Side Button',
      icon: 'btn-icn',
      onclick: () => this.#ws ? log(window.editorManager.editor, editorFile): this.wsConnect(),
      backgroundColor: '#fff',
      textColor: '#000',
    });
    sideButton.show();

    const {
      commands
    } = window.editorManager.editor;
    commands.addCommands([{
      name: 'Toggle breakpoint',
      bindKey: 'F9',
      exec: Breakpoints.toogleBreakpointBySelection
    },
      {
        name: 'Find and Add to Selection',
        bindKey: 'Ctrl-D',
        exec: ()=> {
          const mutchList = window.editorManager.editor.session
        }
      },
      // {
      //   name: '',
      //   bindKey: '',
      //   exec:
      // },
    ])
  }

  async destroy() {
    this.#style = null;
    const editor = window.editorManager.editor;
    const {
      commands
    } = editor;
    commands.removeCommand('Toggle breakpoint');
    editor.removeListener('change', this.updateBreackpoints);
    editor.removeListener('guttermousedown', Breakpoints.toggleBreakpointByClick);
  }

  /**
  * Изменяет состояние точки останова в строке row. Если для state указано булевое значение, то это оно
  * будет установлено невзирая на текущее состояние (true - установлена, false - не установлена).
  * Если state не задано, состояние будет изменено на противоположное..
  * @method toogleBreakpoint
  * @param {number} row
  * @param {boolean|undefined} [state]
  */



  wsConnect() {
    this.#ws = new WebSocket('ws://localhost:3031');
    this.#ws.onopen = (event) => {
      console.info('ws connected', event);
    }
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
  log(window);
  log(window.editorManager.editor);

}
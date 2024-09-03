import plugin from '../plugin.json';

class AcodePlugin {
  
  
  

  async init() {}

  async destroy() {}
}

if (window.acode) {
  const acodePlugin = new AcodePlugin();
  acode.setPluginInit('com.acode.bugger', (baseUrl, $page, cache) => {

window.editorManager.editor.on('guttermousedown', gutterClick);

    
// TODO and
    const {
      commands
    } = editorManager.editor;
    commands.addCommand({
      name: 'example-plugin',
      bindKey: {
        win: 'Ctrl-Alt-E', mac: 'Command-Alt-E'
      },
      exec: test,
    });
  });
  acode.setPluginUnmount('com.acode.bugger', () => {
    const {
      commands
    } = editorManager.editor;
    commands.removeCommand('example-plugin');
    
    
    
window.editorManager.editor.removeListener('guttermousedown', gutterClick);

  });
}


function test() {

const style=document.createElement('style');
    style.textContent = 
        '.ace_breakpoint {\
            border-radius: 20px 0px 0px 20px;\
            box-shadow: 0px 0px 1px 1px\ #248c46 inset;\
        }';
document.head.appendChild(style);
  window.editorManager.editor.session.setBreakpoint(4);
  console.log(window);
  console.log(window.editorManager.editor);
  
}

function gutterClick(e) {
  console.log(document)
  
  console.log(document.querySelector('.ace_breakpoint'))
  console.log(e)
}

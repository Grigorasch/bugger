class Breakpoints {
  static toogleBreakpoint(row, state) {
    log(debug.breakpoints, 'toogleBreakpoint_pre', 'row:', row, 'state:', state);
    const editor = window.editorManager.editor;

    if (state === undefined) {
      const breakpoints = editor.session.getBreakpoints();
      state = !breakpoints[row];
    }
    if (state) {
      editor.session.setBreakpoint(row);
      log(debug.breakpoints, 'toogleBreakpoint_post_if', 'row:', row, 'state:', state);
    } else {
      editor.session.clearBreakpoint(row);
      log(debug.breakpoints, 'toogleBreakpoint_post_else', 'row:', row, 'state:', state);
    }
  }

  static toogleBreakpoints(rows) {
    log(debug.breakpoints, 'toogleBreakpoints_pre', 'rows:', rows);
    const qtyActivBreakpoints = rows.reduce((isActive, totalActive) => totalActive += Boolean(isActive), 0);
    const jointState = !(qtyActivBreakpoints >= rows.length / 2);
    rows.forEach(row => Breakpoints.toogleBreakpoint(row,));
    log(debug.breakpoints, 'toogleBreakpoints_post', 'qtyActivBreakpoints:', qtyActivBreakpoints, 'jointState:', jointState);
  }

  static toggleBreakpointByClick(event) {
    log(debug.breakpoints, 'toggleBreakpointByClick_pre', 'event:', event);
    Breakpoints.toogleBreakpoint(event.getDocumentPosition().row);
    log(debug.breakpoints, 'toggleBreakpointByClick_post');
  }

  static toogleBreakpointBySelection(editor) {
    const selection = editor.getSelection();
    log(debug.breakpoints, 'toggleBreakpointByClick_pre', 'selection:', selection);
    if (selection.inMultiSelectMode) {
      
    } else {
      if (selection.$isEmpty) {
        Breakpoints.toogleBreakpoint(selection.cursor.row);
      } else {
        
      }
    }
    
    
    if (selection.$isEmpty && !inMultiSelectMode) {
      Breakpoints.toogleBreakpoint(selection.cursor.row);
      log(debug.breakpoints, 'toggleBreakpointByClick_post_empty');
      return;
    }

    const makeRowsArray = (startRow, endRow) => {
      const minRow = Math.min(startRow, endRow);
      const maxRow = Math.max(startRow, endRow);
      const qtyRows = maxRow - minRow;
      const rows = [];
      for (let i = 0; i <= qtyRows; i++) {
        rows.push(minRow + i);
      }
      return rows;
    }
    if (!selection.ranges.length) {
      const rows = makeRowsArray(selection.cursor.row, selection.anchor.row)
      Breakpoints.toogleBreakpoints(rows);
      log(debug.breakpoints, 'toggleBreakpointByClick_post_range', 'rows:', rows);
      return;
    }

    selection.ranges.forEach(range => {
      const rows = makeRowsArray(range.start.row, range.end.row);
      Breakpoints.toogleBreakpoints(rows);
    });
    log(debug.breakpoints, 'toggleBreakpointByClick_post_ranges');
  }

  static updateBreackpoints(editor, delta) {
    if (!delta || delta.lines.length <= 1) return;
    if (delta.action === "insert") {
      const breakpoints = editor.session.$breakpoints;
      for (let i = 0; i < delta.lines.length-1; i++) {
        breakpoints.splice(delta.end.row-i, 0, null);
        delete breakpoints[delta.end.row-i];
      }
    }

    if (delta.action === "remove") {
      const breakpoints = editor.session.$breakpoints;
      for (let i = 0; i < delta.lines.length-1; i++) {
        breakpoints.splice(delta.end.row-i, 1);
      }
    }

    editor.session._signal("changeBreakpoint", {});
  }
}

export default Breakpoints;
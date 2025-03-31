/**
 * Markdown Dropdown Generator - Table
 * テーブル生成に関する機能
 */

// 表を生成する関数
function generateTable() {
  const rows = parseInt(document.getElementById('rows').value);
  const cols = parseInt(document.getElementById('cols').value);
  const showColumnHeaders = document.getElementById('show-column-headers').checked;
  const showRowHeaders = document.getElementById('show-row-headers').checked;
  
  // 現在のコード表示状態を保存
  const codeContainer = document.getElementById('code-container');
  const dropdownExportContainer = document.getElementById('dropdown-export-container');
  const codeDisplayed = codeContainer.style.display === 'block';
  const dropdownCodeDisplayed = dropdownExportContainer.style.display === 'block';
  
  // 現在の表から選択状態を保存
  saveCurrentSelections();
  
  // 実際の表示用のテーブルHTML（onchange属性を含む）
  let tableForDisplay = '<table style="border-collapse: collapse; width: 100%;">\n';
  
  // 表示用コード用のテーブルHTML（onchange属性を含まない）
  let tableForCode = '<table style="border-collapse: collapse; width: 100%;">\n';
  
  // ヘッダー行（列ヘッダー表示が有効な場合のみ）
  if (showColumnHeaders) {
    tableForDisplay += '  <tr>\n';
    tableForCode += '  <tr>\n';
    if (showRowHeaders) {
      tableForDisplay += '    <th style="border: 1px solid #ddd; padding: 8px;"></th>\n';
      tableForCode += '    <th style="border: 1px solid #ddd; padding: 8px;"></th>\n';
    }
    for (let i = 0; i < cols; i++) {
      const header = document.getElementById(`header_col_${i}`) ? document.getElementById(`header_col_${i}`).value : `列${i+1}`;
      tableForDisplay += `    <th style="border: 1px solid #ddd; padding: 8px;">${header}</th>\n`;
      tableForCode += `    <th style="border: 1px solid #ddd; padding: 8px;">${header}</th>\n`;
    }
    tableForDisplay += '  </tr>\n';
    tableForCode += '  </tr>\n';
  }
  
  // データ行
  for (let i = 0; i < rows; i++) {
    tableForDisplay += '  <tr>\n';
    tableForCode += '  <tr>\n';
    
    // 行ヘッダー（行ヘッダー表示が有効な場合のみ）
    if (showRowHeaders) {
      const rowHeader = document.getElementById(`header_row_${i}`) ? document.getElementById(`header_row_${i}`).value : `行${i+1}`;
      tableForDisplay += `    <th style="border: 1px solid #ddd; padding: 8px;"><b>${rowHeader}</b></th>\n`;
      tableForCode += `    <th style="border: 1px solid #ddd; padding: 8px;"><b>${rowHeader}</b></th>\n`;
    }
    
    // データセル
    for (let j = 0; j < cols; j++) {
      const options = document.getElementById(`options_col_${j}`) ? document.getElementById(`options_col_${j}`).value.split(',') : ['A', 'B', 'C'];
      const cellKey = `cell_${i}_${j}`;
      let selectedValue = options.length > 0 ? options[0] : '';
      
      // 保存されている選択状態があれば使用
      if (cellSelections[cellKey] && options.includes(cellSelections[cellKey])) {
        selectedValue = cellSelections[cellKey];
      }
      
      // 表示用（セレクトのID付与）
      tableForDisplay += `    <td style="border: 1px solid #ddd; padding: 8px;"><select id="select_${i}_${j}">`;
      
      // コード表示用（onchange属性なし）
      tableForCode += '    <td style="border: 1px solid #ddd; padding: 8px;"><select>';
      
      if (options.length === 0) {
        tableForDisplay += '<option value=""></option>';
        tableForCode += '<option value=""></option>';
      } else {
        options.forEach(opt => {
          const isSelected = opt === selectedValue;
          tableForDisplay += `<option value="${opt}"${isSelected ? ' selected' : ''}>${opt}</option>`;
          tableForCode += `<option value="${opt}"${isSelected ? ' selected' : ''}>${opt}</option>`;
        });
      }
      tableForDisplay += '</select></td>\n';
      tableForCode += '</select></td>\n';
    }
    tableForDisplay += '  </tr>\n';
    tableForCode += '  </tr>\n';
  }
  
  tableForDisplay += '</table>';
  tableForCode += '</table>';
  
  // 実際の表示用
  document.getElementById('result').innerHTML = tableForDisplay;
  
  // 生成されたセレクトにイベントリスナーを追加
  for (let i = 0; i < rows; i++) {
    for (let j = 0; j < cols; j++) {
      const select = document.getElementById(`select_${i}_${j}`);
      if (select) {
        select.addEventListener('change', function() {
          updateDropdownHTML();
          saveCurrentSelections();
        });
      }
    }
  }
  
  // コードを保持（表示/非表示の切り替え用）- onchange属性なしのバージョン
  document.getElementById('markdown-code').textContent = tableForCode;
  
  // コード表示状態を復元
  if (codeDisplayed) {
    codeContainer.style.display = 'block';
    document.getElementById('toggle-code').textContent = 'HTMLコードを非表示';
    document.getElementById('toggle-code').style.backgroundColor = '#e0e0e0';
    document.getElementById('toggle-code').style.color = '#333';
  } else {
    codeContainer.style.display = 'none';
    document.getElementById('toggle-code').textContent = 'HTMLコードを表示';
    document.getElementById('toggle-code').style.backgroundColor = '';
    document.getElementById('toggle-code').style.color = 'white';
  }
  
  if (dropdownCodeDisplayed) {
    // 選択状態を反映したプルダウン付き表のHTMLコードを更新して表示
    updateDropdownHTML();
    dropdownExportContainer.style.display = 'block';
    document.getElementById('dropdown-button').textContent = '選択状態を反映したプルダウン付き表のHTMLコードを非表示';
    document.getElementById('dropdown-button').style.backgroundColor = '#e0e0e0';
    document.getElementById('dropdown-button').style.color = '#333';
  } else {
    dropdownExportContainer.style.display = 'none';
    document.getElementById('dropdown-button').textContent = '選択状態を反映したプルダウン付き表のHTMLコードを表示';
    document.getElementById('dropdown-button').style.backgroundColor = '';
    document.getElementById('dropdown-button').style.color = 'white';
  }
}

// 現在の表のセル選択状態を保存する関数
function saveCurrentSelections() {
  const result = document.getElementById('result');
  const rows = result.querySelectorAll('tr');
  
  if (rows.length === 0) {
    return;
  }
  
  const showColumnHeaders = document.getElementById('show-column-headers').checked;
  const showRowHeaders = document.getElementById('show-row-headers').checked;
  
  // データ行から選択状態を保存
  const startRow = showColumnHeaders ? 1 : 0;
  for (let i = startRow; i < rows.length; i++) {
    const row = rows[i];
    const cells = row.querySelectorAll('td');
    
    const startCol = showRowHeaders ? 0 : 0; // 行ヘッダーはth要素なのでtdには含まれない
    for (let j = startCol; j < cells.length; j++) {
      const cell = cells[j];
      const select = cell.querySelector('select');
      
      if (select) {
        // 行インデックスを調整（ヘッダー行がある場合は-1）
        const rowIndex = showColumnHeaders ? i - 1 : i;
        // 列インデックスを調整（行ヘッダーがある場合、td要素のインデックスとj値は一致する）
        const colIndex = j;
        const cellKey = `cell_${rowIndex}_${colIndex}`;
        cellSelections[cellKey] = select.value;
      }
    }
  }
}

// ヘッダー設定やプルダウン選択肢が変更されたときに表と表示中のコードを更新する関数
function updateTableAndCode() {
  // 表が生成されている場合のみ処理
  const result = document.getElementById('result');
  if (!result.querySelector('table')) {
    return;
  }
  
  // 現在のコード表示状態を保存
  const codeContainer = document.getElementById('code-container');
  const dropdownExportContainer = document.getElementById('dropdown-export-container');
  const codeDisplayed = codeContainer.style.display === 'block';
  const dropdownCodeDisplayed = dropdownExportContainer.style.display === 'block';
  
  // 表を再生成（この中でコード表示がリセットされる）
  generateTable();
  
  // コード表示状態を元に戻す
  if (codeDisplayed) {
    codeContainer.style.display = 'block';
    document.getElementById('toggle-code').textContent = 'HTMLコードを非表示';
    document.getElementById('toggle-code').style.backgroundColor = '#e0e0e0';
    document.getElementById('toggle-code').style.color = '#333';
  }
  
  if (dropdownCodeDisplayed) {
    // 選択状態を反映したプルダウン付き表のHTMLコードを更新して表示
    updateDropdownHTML();
    dropdownExportContainer.style.display = 'block';
    document.getElementById('dropdown-button').textContent = '選択状態を反映したプルダウン付き表のHTMLコードを非表示';
    document.getElementById('dropdown-button').style.backgroundColor = '#e0e0e0';
    document.getElementById('dropdown-button').style.color = '#333';
  }
} 
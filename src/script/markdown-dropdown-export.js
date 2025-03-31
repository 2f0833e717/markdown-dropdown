/**
 * Markdown Dropdown Generator - Export
 * HTMLコード表示とエクスポート機能
 */

// HTML表示/非表示を切り替える関数
function toggleCode() {
  const codeContainer = document.getElementById('code-container');
  const toggleButton = document.getElementById('toggle-code');
  
  if (codeContainer.style.display === 'none') {
    codeContainer.style.display = 'block';
    toggleButton.textContent = 'HTMLコードを非表示';
    toggleButton.style.backgroundColor = '#e0e0e0';
    toggleButton.style.color = '#333';
  } else {
    codeContainer.style.display = 'none';
    toggleButton.textContent = 'HTMLコードを表示';
    toggleButton.style.backgroundColor = '';
    toggleButton.style.color = 'white';
  }
}

// 選択状態を保持したプルダウン付きHTML表を生成する関数
function saveSelectionsWithDropdowns() {
  const result = document.getElementById('result');
  const dropdownExportContainer = document.getElementById('dropdown-export-container');
  const dropdownButton = document.getElementById('dropdown-button');
  
  if (dropdownExportContainer.style.display === 'none') {
    if (!result.querySelector('table')) {
      // 表が生成されていない場合は空の状態で表示
      document.getElementById('dropdown-export-data').textContent = '';
      dropdownExportContainer.style.display = 'block';
      dropdownButton.textContent = '選択状態を反映したプルダウン付き表のHTMLコードを非表示';
      dropdownButton.style.backgroundColor = '#e0e0e0';
      dropdownButton.style.color = '#333';
      return;
    }
    
    // まずコンテナを表示に設定
    dropdownExportContainer.style.display = 'block';
    dropdownButton.textContent = '選択状態を反映したプルダウン付き表のHTMLコードを非表示';
    dropdownButton.style.backgroundColor = '#e0e0e0';
    dropdownButton.style.color = '#333';
    
    // 選択状態を反映したプルダウン付きHTML表を生成
    updateDropdownHTML();
  } else {
    dropdownExportContainer.style.display = 'none';
    dropdownButton.textContent = '選択状態を反映したプルダウン付き表のHTMLコードを表示';
    dropdownButton.style.backgroundColor = '';
    dropdownButton.style.color = 'white';
  }
}

// プルダウンの選択状態が変更されたときにHTMLコードを更新する関数
function updateDropdownHTML() {
  const result = document.getElementById('result');
  const rows = result.querySelectorAll('tr');
  
  if (rows.length === 0) {
    document.getElementById('dropdown-export-data').textContent = '';
    return;
  }
  
  const showColumnHeaders = document.getElementById('show-column-headers').checked;
  const showRowHeaders = document.getElementById('show-row-headers').checked;
  
  // 現在の選択状態を反映したプルダウン付きHTML表を生成
  let tableHTML = '<table style="border-collapse: collapse; width: 100%;">\n';
  
  // ヘッダー行（列ヘッダー表示が有効な場合のみ）
  if (showColumnHeaders && rows.length > 0) {
    tableHTML += '  <tr>\n';
    const headerRow = rows[0];
    const headerCells = headerRow.querySelectorAll('th');
    
    if (showRowHeaders) {
      tableHTML += '    <th style="border: 1px solid #ddd; padding: 8px;"></th>\n';
    }
    
    // 列ヘッダーを取得（最新の値を使用）
    for (let i = showRowHeaders ? 1 : 0; i < headerCells.length; i++) {
      const headerText = headerCells[i].textContent;
      tableHTML += `    <th style="border: 1px solid #ddd; padding: 8px;">${headerText}</th>\n`;
    }
    tableHTML += '  </tr>\n';
  }
  
  // データ行を生成（選択状態を保持したプルダウンメニューを含む）
  const startRow = showColumnHeaders ? 1 : 0;
  for (let i = startRow; i < rows.length; i++) {
    const row = rows[i];
    const cells = row.querySelectorAll('th, td');
    tableHTML += '  <tr>\n';
    
    // 行ヘッダー（行ヘッダー表示が有効な場合のみ）
    if (showRowHeaders && cells.length > 0) {
      const rowHeader = cells[0].textContent;
      tableHTML += `    <th style="border: 1px solid #ddd; padding: 8px;"><b>${rowHeader}</b></th>\n`;
    }
    
    // データセル
    const startCol = showRowHeaders ? 1 : 0;
    for (let j = startCol; j < cells.length; j++) {
      const cell = cells[j];
      const select = cell.querySelector('select');
      
      // プルダウンメニューを生成（選択状態を保持）
      tableHTML += '    <td style="border: 1px solid #ddd; padding: 8px;"><select>';
      
      if (select) {
        const options = Array.from(select.options);
        const selectedValue = select.value;
        
        if (options.length === 0) {
          tableHTML += '<option value=""></option>';
        } else {
          options.forEach(option => {
            const isSelected = option.value === selectedValue;
            tableHTML += `<option value="${option.value}"${isSelected ? ' selected' : ''}>${option.text}</option>`;
          });
        }
      } else {
        tableHTML += '<option value=""></option>';
      }
      
      tableHTML += '</select></td>\n';
    }
    
    tableHTML += '  </tr>\n';
  }
  
  tableHTML += '</table>';
  
  document.getElementById('dropdown-export-data').textContent = tableHTML;
} 
/**
 * Markdown Dropdown Generator - Header
 * ヘッダー設定に関する機能
 */

// 行と列のヘッダー設定フィールドを生成する関数
function generateHeaderSettings() {
  const rows = parseInt(document.getElementById('rows').value);
  const cols = parseInt(document.getElementById('cols').value);
  const showColumnHeaders = document.getElementById('show-column-headers').checked;
  const showRowHeaders = document.getElementById('show-row-headers').checked;
  
  // ヘッダー設定部分の表示制御
  const headerSettings = document.getElementById('header-settings');
  if (!showColumnHeaders && !showRowHeaders) {
    headerSettings.style.display = 'none';
    return;
  }
  
  // 列ヘッダー設定
  if (showColumnHeaders) {
    let columnHeadersHTML = '<h4>列ヘッダー設定:</h4><div>';
    for (let i = 0; i < cols; i++) {
      // 既存の値を保持する
      const headerValue = document.getElementById(`header_col_${i}`) ? 
                         document.getElementById(`header_col_${i}`).value : 
                         `列${i+1}`;
      const optionsValue = document.getElementById(`options_col_${i}`) ? 
                          document.getElementById(`options_col_${i}`).value : 
                          'A,B,C';
      
      columnHeadersHTML += `
        <div style="margin-bottom: 10px;">
          <div>列${i+1}: 
            <input type="text" id="header_col_${i}" value="${headerValue}" style="width: 150px;">
            <input type="text" id="options_col_${i}" value="${optionsValue}" style="width: 250px;" placeholder="プルダウンの選択肢（カンマ区切り）">
          </div>
        </div>`;
    }
    columnHeadersHTML += '</div>';
    
    // 列ヘッダー設定のHTMLを更新
    const columnHeadersContainer = document.getElementById('column-headers');
    columnHeadersContainer.innerHTML = columnHeadersHTML;
    columnHeadersContainer.style.display = 'block';
    
    // ヘッダー設定変更時のイベントハンドラを追加
    for (let i = 0; i < cols; i++) {
      const headerInput = document.getElementById(`header_col_${i}`);
      const optionsInput = document.getElementById(`options_col_${i}`);
      
      if (headerInput) {
        headerInput.addEventListener('change', updateTableAndCode);
      }
      
      if (optionsInput) {
        optionsInput.addEventListener('change', updateTableAndCode);
      }
    }
  } else {
    document.getElementById('column-headers').style.display = 'none';
  }
  
  // 行ヘッダー設定
  if (showRowHeaders) {
    let rowHeadersHTML = '<h4>行ヘッダー設定:</h4><div>';
    for (let i = 0; i < rows; i++) {
      // 既存の値を保持する
      const headerValue = document.getElementById(`header_row_${i}`) ? 
                         document.getElementById(`header_row_${i}`).value : 
                         `行${i+1}`;
      
      rowHeadersHTML += `<div>行${i+1}: <input type="text" id="header_row_${i}" value="${headerValue}" style="width: 150px;"></div>`;
    }
    rowHeadersHTML += '</div>';
    
    // 行ヘッダー設定のHTMLを更新
    const rowHeadersContainer = document.getElementById('row-headers');
    rowHeadersContainer.innerHTML = rowHeadersHTML;
    rowHeadersContainer.style.display = 'block';
    
    // 行ヘッダー設定変更時のイベントハンドラを追加
    for (let i = 0; i < rows; i++) {
      const headerInput = document.getElementById(`header_row_${i}`);
      
      if (headerInput) {
        headerInput.addEventListener('change', updateTableAndCode);
      }
    }
  } else {
    document.getElementById('row-headers').style.display = 'none';
  }
  
  // ヘッダー設定部分を表示
  headerSettings.style.display = 'block';
}

// 行数・列数が変更されたときに呼び出される関数
function rowColChanged() {
  // ヘッダー設定を更新
  generateHeaderSettings();
  
  // 表が生成されている場合は表と表示中のコードも更新
  const result = document.getElementById('result');
  if (result.querySelector('table')) {
    updateTableAndCode();
  }
} 
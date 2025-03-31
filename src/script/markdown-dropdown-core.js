/**
 * Markdown Dropdown Generator - Core
 * コア機能と初期化処理
 */

// セルの選択状態を保持するためのグローバル変数
let cellSelections = {};

// DOMが読み込まれたら初期化処理を実行
document.addEventListener('DOMContentLoaded', function() {
  // 初期表示時のイベントハンドラ設定
  document.getElementById('show-column-headers').addEventListener('change', generateHeaderSettings);
  document.getElementById('show-row-headers').addEventListener('change', generateHeaderSettings);
  document.getElementById('rows').addEventListener('change', rowColChanged);
  document.getElementById('cols').addEventListener('change', rowColChanged);
  
  // ボタンクリックイベントの設定
  document.getElementById('generate-table-btn').addEventListener('click', generateTable);
  document.getElementById('toggle-code').addEventListener('click', toggleCode);
  document.getElementById('dropdown-button').addEventListener('click', saveSelectionsWithDropdowns);
}); 
/**
 * Markdown Dropdown Generator - Core
 * コア機能と初期化処理
 */

// セルの選択状態を保持するためのグローバル変数
let cellSelections = {};

// 初期化関数
function initializeEventHandlers() {
  console.log('イベントハンドラを初期化します');
  // 初期表示時のイベントハンドラ設定
  document.getElementById('show-column-headers').addEventListener('change', generateHeaderSettings);
  document.getElementById('show-row-headers').addEventListener('change', generateHeaderSettings);
  document.getElementById('rows').addEventListener('change', rowColChanged);
  document.getElementById('cols').addEventListener('change', rowColChanged);
  
  // ボタンクリックイベントの設定
  document.getElementById('generate-table-btn').addEventListener('click', generateTable);
  document.getElementById('toggle-code').addEventListener('click', toggleCode);
  document.getElementById('dropdown-button').addEventListener('click', saveSelectionsWithDropdowns);
}

// DOMが読み込まれたら初期化処理を実行
document.addEventListener('DOMContentLoaded', function() {
  console.log('DOMContentLoaded');
  
  // 動的にコンテンツがロードされた場合のイベント
  document.addEventListener('contentLoaded', function() {
    console.log('contentLoaded イベント発火');
    initializeEventHandlers();
  });
  
  // 直接アクセスした場合（contentLoadedイベントが発火しない場合）
  setTimeout(function() {
    // 要素が存在するか確認
    if (document.getElementById('show-column-headers')) {
      console.log('要素が存在します - 直接初期化します');
      initializeEventHandlers();
    }
  }, 500);
}); 
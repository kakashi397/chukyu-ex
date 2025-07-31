/* スライダー */
const track = document.querySelector('.js-img-track'); // カルーセル部分の要素全体を取得

// 初期の子要素を保存（1セット分）
const originalItems = Array.from(track.children); // originalItemsにtrack（ul）の子要素（li）を全部配列として入れる

// 現在の複製数（初期1）
let currentSetCount = 1; // 現在、何セット分のアイテムが入っているかを数える変数 後でセット数が偶数か奇数か判定する必要があるため必要な情報

// 複製と偶数チェック
function generateEvenSets() { // generateEvenSets()関数を作る
  track.innerHTML = ''; // 一度中身を初期状態に戻す 一度空にしてから必要なセットを書き込んだ方が、前回の残りを考慮する必要がなくなるため
  originalItems.forEach(item => { // originalItemsに入っているliを一個一個取り出してitemに入れて処理する
    track.appendChild(item.cloneNode(true)); // (親).appendChild(子)は親の中に最後の子要素として子を追加する。 item.cloneNode（true）によりitemを全て（要素と中身まで）コピーしている。（falseなら要素だけ中身無しコピー）
  });
  currentSetCount = 1; // この時点でulの子要素をまっさらにした後1セット分複製してる

  const screenWidth = window.innerWidth; // innerWidthプロパティによってscreenWidthに表示領域の横幅を取得
  const trackWrapper = track.parentElement; // trackの親要素（<div class="p-achievement__logo-carousel">の要素だけを取得）
  const requireWidth = screenWidth * 2; // 最低でも画面の2倍分必要
  let currentWidth = track.scrollWidth; // ulタグ（track）の中に複製されたliたちが横に何ピクセルぶんあるかを取得

  // 必要なだけ複製（set単位で）
  while (currentWidth < requireWidth) { // 今のcurrentWidthが画面幅の二倍よりも少ない間は
    originalItems.forEach(item => { // 1セットを複製して
      track.appendChild(item.cloneNode(true));
    });
    currentSetCount++; // セット数に1を足す
    currentWidth = track.scrollWidth; // 現在の長さを図る
  } //  そしてwhileに戻る

  // 複製数が奇数なら+1セット追加して偶数に
  if (currentSetCount % 2 !== 0) { // もし現在のセット数が2で割り切れない＝奇数なら
    originalItems.forEach(item => { // もう一セット追加で複製
      track.appendChild(item.cloneNode(true));
    });
    currentSetCount++; // セット数に1を足す
  }
}

// 初回実行
generateEvenSets();

// リサイズ対応（連打防止のdebounceつき）
let resizeTimeout;
window.addEventListener('resize', () => { // ウィンドウのサイズが変更されたら発火させるイベントリスナー
  clearTimeout(resizeTimeout); // イベント発火したらまずは予約を削除する
  resizeTimeout = setTimeout(() => { // リサイズがあった0.3秒後にgenerateEvenSets()を実行することを予約する
    generateEvenSets();
  }, 300);
});
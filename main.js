//変数宣言（初期値は0にしておく、NaNを防止）
let startTime = 0; //開始時間
let elapsedTime = 0; //経過時間
let timerInterval; //タイマー
let holdTime = 0; //ストップした時の経過時間

//関数宣言
//Time(経過時間)を時:分:秒:ミリ秒で表示する関数
//Math.floor()で時:分:秒:ミリ秒に分割する
function updateDisplay(time) {
  const milliseconds = Math.floor((time % 1000) / 100); //ミリ秒
  const seconds = Math.floor(time / 1000) % 60; //秒
  const minutes = Math.floor(time / (1000 * 60)) % 60; //分
  const hours = Math.floor(time / (1000 * 60 * 60)); //時

  //経過時間をHTMLに表示させる
  //HTMLのid="display"を取得する→textContentでHTMLのdisplay（0:0:0:0）が更新される
  document.getElementById(
    "display"
  ).textContent = `${hours}:${minutes}:${seconds}:${milliseconds}`;
  //テンプレートリテラルで文字列を整えている、時:分:秒:ミリ秒の順
}

//開始時間の関数宣言
//holdTimeで停止した時点までの経過時間を入れておき、再開時にその時間からタイマーを開始出来るように
function start() {
  startTime = Date.now() - holdTime; //停止→再開に対応させるため、Date.now（現在の時間）-holdTime（経過時間）
  //timeIntervalにsetIntervalを保存
  timerInterval = setInterval(function () {
    elapsedTime = Date.now() - startTime; //経過時間=現在時間-開始時間
    updateDisplay(elapsedTime); //経過時間を「時間:分:秒:ミリ秒」に変換
  }, 100); // 100ミリ秒ごとに画面を更新（=0.1秒ごとに更新）
  //ボタンを無効または有効化させる (disabledを無効化ならtrue,有効化ならfalse)
  document.getElementById("startButton").disabled = true; // 再び押せないように無効に
  document.getElementById("stopButton").disabled = false; // 計測が止まるまで何度も押せるように有効に
  document.getElementById("resetButton").disabled = true; // 計測中は無効に
}

//停止時間の関数宣言
//clearIntervalでタイマー停止、計測された時間(elapsedTime)をholdTimeに入れる
function stop() {
  clearInterval(timerInterval); // setIntervalを停止（計測を停止する）
  holdTime = elapsedTime;
  //ボタンを無効または有効化させる
  document.getElementById("startButton").disabled = false; // 停止後、再開出来るように有効に
  document.getElementById("stopButton").disabled = true; // 停止したら押す必要がないので無効に
  document.getElementById("resetButton").disabled = false; // 停止後にゼロに出来るように有効に
}

//リセットするための関数宣言
//clearIntervalでタイマー停止、elapsedTime(経過時間)を0にする
//リセット後に、0から開始することが出来る
function reset() {
  clearInterval(timerInterval); // setIntervalを停止（計測を停止する）
  elapsedTime = 0; // 経過時間を0にする（リセット）
  holdTime = 0; // 保持時間を0にする（リセット）
  updateDisplay(elapsedTime); // elapsedTimeは0なので、画面表示が0:0:0:0になる(リセットになる)
  //ボタンを無効または有効化させる
  document.getElementById("startButton").disabled = false; // リセット後に再び押せるように有効に
  document.getElementById("stopButton").disabled = true; // リセット後は必要ないため無効に
  document.getElementById("resetButton").disabled = true; // リセット後は再び押さなくても良いので無効に
}

$(function(){

  let NAMES = ["福岡 陽","藤井 隆史","安藤 勝","小林 慎平","城島 由紀子","豊嶋 七瀬","稲葉 優一郎","林 信輔","増田 有紗"];

  const $text = $("#text");
  const $button = $("#button");
  const $list = $("#list");

  let max = NAMES.length - 1;
  let isStop = false;
  let interval, randomNum;

  interval = setInterval(ruuuurettoppoi, 1);

  $button.on('click', function(){
    if(!isStop){
      clearInterval(interval);

      list_ni_sonyu(NAMES[randomNum]);
      NAMES.splice(randomNum, 1);
      max--;
    } else {
      interval = setInterval(ruuuurettoppoi, 1);
    }
    isStop = !isStop;
  });

  function list_ni_sonyu(name){
    var list = $("<li>" + name + "</li>");

    $list.append(list);
  }

  function ruuuurettoppoi(){
    randomNum = Math.round(Math.random() * max);
    const randomName = NAMES[randomNum];

    if(randomName){
      $text.text(randomName);
    } else {
      $text.text("抽選 終わり");
      $button.text("押せないよ！").css({"background-color": "#777"}).removeClass('active').off('click');
    }

  }
});

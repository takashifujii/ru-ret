$(function(){
  const $timerStart = $("#timerStart");
  const $timerStop = $("#timerStop");
  const $timerReset = $("#timerReset");
  const $list = $("#list");
  const $time = $("#time");
  const $min = $time.find(".min");
  const $sec = $time.find(".sec");

  let startTime, endTime, stopTime, restTime;
  let tmpTime = 0;
  let interval = null;

  const targetMinutes = 5;
  const targetMilliSeconds = targetMinutes * 1000 * 60;
  writeTime(targetMilliSeconds)

  $timerStart.on('click', function(){
    if(!interval || interval > 0){
      startTime = Date.now();
      interval = setInterval(function(){
        endTime = Date.now();
        stopTime = endTime - startTime;
        restTime = targetMilliSeconds - tmpTime;
        let displayTime = restTime - stopTime;

        if(displayTime < targetMilliSeconds / 2){
          $time.one().addClass("half");
        }
        if(displayTime <= 60000){
          $time.one().addClass("one");
        }
        if(displayTime <= 10000){
          $time.one().addClass("death");
        }

        if(displayTime > 0){
          writeTime(displayTime);
        } else {
          clearInterval(interval);
          $time.html("<p>はっぴょうは<br>おわってしまった！</p>");
        }

      }, 20);
    }
  });

  $timerStop.on('click', function(){
    tmpTime = stopTime + tmpTime;
    clearInterval(interval);
  });

  $timerReset.on('click', function(){
    tmpTime = 0;
    startTime = Date.now();
    endTime = Date.now();
    restTime = targetMilliSeconds;
    writeTime(restTime);
  });



  function writeTime(displayTime){
    let msec = displayTime % 1000;
    let sec = Math.floor(displayTime / 1000);
    let dsec = sec % 60;
    let min = Math.floor(sec / 60);

    if (min.toString().length == 1){
      min = 0 + min.toString();
    }
    if (dsec.toString().length == 1){
      dsec = 0 + dsec.toString();
    }

    $min.text(min);
    $sec.text(dsec);
  }

});

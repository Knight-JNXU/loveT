var v = document.getElementById('video');

var playBtn = document.getElementById('play_btn');

/*播放、暂停
* play, paused
*/

playBtn.textContent = '>';
playBtn.addEventListener("click", function(){
    if(v.paused){
      v.play();
      playBtn.textContent = '||';
    }else{
      v.pause();
      playBtn.textContent = '>';
    }
});

/**音量
* volume
*/
var volIncBtn = document.getElementById('vol_inc_btn');
var volDecBtn = document.getElementById('vol_dec_btn');

volIncBtn.addEventListener("click", function(){
  v.volume > 0.9?v.volume = 1:v.volume += 0.1;
})

volDecBtn.addEventListener("click", function(){
  v.volume < 0.1?v.volume = 0:v.volume -= 0.1;
})

/**静音
*muted
*/
var mutedBtn = document.getElementById('muted_btn');

mutedBtn.addEventListener("click", function(){
  v.muted = !v.muted;
  mutedBtn.textContent = v.muted?'恢复':'静音';
})

/**时间
*currentTime
*/
var nowTime = document.getElementById('now_time');
var duration = document.getElementById('duration');
nowTime.textContent = 0;
duration.textContent = 0;

function parseTime(time){
  time = Math.floor(time);
  var _m, _s;
  _m = Math.floor(time/60);
  _s = time - _m*60;
  if(_m<10){
    _m = '0' + _m;
  }
  if(_s<10){
    _s = '0' + _s;
  }
  return _m + ':' + _s
}

v.addEventListener('timeupdate', function(){
  nowTime.textContent = parseTime(v.currentTime);
  getProgress();
})

v.addEventListener('loadedmetadata', function(){
  duration.textContent = parseTime(v.duration);
})

/**进度条
*
*/
var progressWrap = document.getElementById("progressWrap");
var playProgress = document.getElementById("playProgress");

function getProgress(){
  var percent = v.currentTime / v.duration;
  playProgress.style.width = percent * (progressWrap.offsetWidth) + "px";
}

// 鼠标在播放条上点击时进行捕获并进行处理
function videoSeek(e){
    if(v.paused || v.ended){
        v.play();
    }
    enhanceVideoSeek(e);
}
function enhanceVideoSeek(e){
    var length = e.pageX - progressWrap.offsetLeft;
    var percent = length / progressWrap.offsetWidth;
    playProgress.style.width = percent * (progressWrap.offsetWidth) + "px";
    v.currentTime = percent * v.duration;
}

progressWrap.addEventListener('click', function(e){
  console.log('jump');
  videoSeek(e);
})
/**播放速度
* playbackRate
*/
var speedUpBtn = document.getElementById('speed_up');

var _speed = 1;

speedUpBtn.addEventListener('click', function(){
  changeSpeed();
});

function changeSpeed () {
  _speed = _speed * 2;
  if(_speed>4){
    _speed = 1;
  }
  v.playbackRate = _speed;
  speedUpBtn.textContent = _speed===1?'快进':'快进x' + _speed;
}

//后退
var backBtn = document.getElementById('back');
var _back_speed = 1;
var _t;

backBtn.addEventListener('click', function(){
  _back_speed = _back_speed * 2;
  if(_back_speed>4){
    v.playbackRate = 1;
    _back_speed = 1;
    clearInterval(_t);
  }else{
    v.playbackRate = 0;
    clearInterval(_t);
    _t = setInterval(function(){
      v.currentTime -= _back_speed * 0.1;
    },100)
  }
  backBtn.textContent = _back_speed===1?'快退':'快退x' + _back_speed;
})

/**加载状态
/*
*/
var loadState = document.getElementById('load_state');

loadState.textContent = '阿文提示：视频加载中，大概需要 30 秒，建议缓存30分钟！'

v.addEventListener('loadstart', function(){
  loadState.textContent = '视频加载中。。。';
})

v.addEventListener('loadeddata', function(){
  loadState.textContent = '加载完毕。';
})

v.addEventListener('error', function(){
  loadState.textContent = '加载失败。';
})

/**全屏
*
*/
function requestFullScreen(de) {
  // var de = document.documentElement;
  if (de.requestFullscreen) {
    de.requestFullscreen();
  } else if (de.mozRequestFullScreen) {
    de.mozRequestFullScreen();
  } else if (de.webkitRequestFullScreen) {
    de.webkitRequestFullScreen();
  }
}

var fullscreen = document.getElementById('fullscreen');

fullscreen.addEventListener('click', function(){
  requestFullScreen(v);
})

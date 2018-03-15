/**
 * Created by johnny on 2017/12/25.
 */
function WechatSound(doc) {
    // 原理：调用链中的某个事件被标识为用户事件而非系统事件
    // 进而导致浏览器以为是用户触发播放而允许播放

    Audio.prototype._play = Audio.prototype.play;
    HTMLAudioElement.prototype._play = HTMLAudioElement.prototype.play;
    //Video.prototype._play = Video.prototype.play;
    HTMLVideoElement.prototype._play=HTMLVideoElement.prototype.play;
    function wxPlayAudio(audio) {
        /// <summary>
        /// 微信播放Hack
        /// </summary>
        /// <param name="audio" type="Audio">音频对象</param>
        WeixinJSBridge.invoke('getNetworkType', {}, function (e) {
            audio._play();
        });
    }

    function play() {
        var self = this;
        self._play();
        var evtFns = [];
        try {
            wxPlayAudio(self);
        } catch (ex) {
            evtFns.push("WeixinJSBridgeReady", function evt() {
                wxPlayAudio(self);
                for (var i = 0; i < evtFns.length; i += 2) document.removeEventListener(evtFns[i], evtFns[i + 1], false);
            });
            document.addEventListener("WeixinJSBridgeReady", evtFns[evtFns.length - 1], false);
        }
    }
    Audio.prototype.play = play;
    HTMLAudioElement.prototype.play = play;
    HTMLVideoElement.prototype.play=play;
    return this;
}
WechatSound.prototype.preloads={}
WechatSound.prototype.preloadVideo=function(url,playtime){
    playtime=playtime||100;
    var videoObj=document.createElement('video')
    videoObj.setAttribute('webkit-playsinline', true);
    videoObj.setAttribute('playsinline', true);
    videoObj.setAttribute('preload', 'load');
    videoObj.setAttribute('src', url);
    this.preloads[url]=videoObj;
    videoObj.oncanplay = function () {
        setTimeout(function () {
          //     console.log('canplay:'+url);
            videoObj.pause();
        },playtime)

    }
    videoObj.play();
};
WechatSound.prototype.preloadAudio=function(url,playtime){
    playtime=playtime||100;
    var videoObj=new Audio()
    videoObj.setAttribute('preload', 'load');
    videoObj.setAttribute('src', url);
    this.preloads[url]=videoObj;
    videoObj.oncanplay = function () {
        setTimeout(function () {
            videoObj.pause();
        },playtime)

    }
    videoObj.play();
};

module.exports=WechatSound;
 window.WechatSound=WechatSound;
//WechatSound(document);
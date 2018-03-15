# wechat-sound

you can play audio without user action in wechat

video can play automatic in ios(can't in Andriod)

```
npm install wechat-sound
import WechatSound from 'wechat-sound'

```

``` html
 <script src="dist/wechat-sound.js"></script>
``` 

### Usage
```javascript
  var ws=new WechatSound(document)
  
  //加入预加载视频和音频功能
  ws.preloadVideo()
  ws.preloadAudio();
  
  
  
  //视频只有IOS能用哦
  
  
```
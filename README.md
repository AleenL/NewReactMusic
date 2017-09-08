### 在线音乐APP

--------------

#### 技术栈：ES6-Webpack-React-Ajax

#####[DEMO地址](https://aleenl.github.io/NewReactMusic/build/index.html)
请使用手机模式打开

##### Quick-Start
```
    git clone https://github.com/AleenL/NewReactMusic.git
    npm install
    npm start
    
```
使用的是Creact-react-app的脚手架，其中webpack是已经打包好了的，省了很多麻烦，但是貌似这个脚手架不支持最新的redux版本，所以如果想要使用redux的话，最好是重新安装一下react和react-dom。

在写代码的时候了解到了axios来获取api的数据，不过当时忙于另一个项目，所以没用，使用的是自己写的Ajax插件，支持ES6的Promise，如果获取不到数据的话，就会自执行一边componentDidUpdate，这样就不会存在，打开的时候没有歌，失败之后会自动执行一次ajax。
没有用到redux和router，毕竟不存在什么数据管理，如果使用router的话，如果两个Route需要信息交互的话，又要使用Redux，有点浪费性能，当然也可以使用（context)来和两个组件内的信息通信，不过这是react实验性的API，官方文档也说以后说不定就会移除这个API，还是不用好了，所以页面跳转只是使用CSS加JS来实现。audio真是好东西哈，后期会考虑加入canvas来添加一些音乐可视化的内容。

#### 有没有踩坑

暂时还没有什么坑可踩，唯一踩的坑大概就是ended这个函数了吧，由于这个函数只是返回一个bool值，一开始我还以为可以直接将他赋值给一个函数，然后当歌曲播放完毕后自动播放下一首歌曲，但是试了很多次才明白，这个函数必须添加监听函数，可以使用ontimeupdate自带的API监听ended，当ended返回true后执行下一首

#### 实现的功能
- 音乐选择
- 暂停/播放
- 获取歌曲封面
- 下一首
- 收藏
- 歌词同步

API使用百度提供的API，如果有任何侵权行为，请告知。

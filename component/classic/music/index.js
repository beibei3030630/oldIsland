// component/classic/music/index.js
import {
  classicBeh
} from "../class-beh.js";
const player = wx.getBackgroundAudioManager();
Component({
  /**
   * 组件的属性列表
   */
  behaviors: [classicBeh],
  properties: {
    playerTitle: String,
    playerSrc: String
  },

  /**
   * 组件的初始数据
   */
  data: {
    controlBtn: false,
    playBtn: "./images/play.png",
    pauseBtn: "./images/pause.png"
  },

  /**
   * 组件的方法列表
   */
  lifetimes: {
    attached() {
      this._recoverStatus();
      this._monitorSwitch();
    }
  },
  methods: {
    controlMusic() {
      const control_btn = this.data.controlBtn;
      control_btn ? this._onPause() : this._onPlay();
      this.setData({
        controlBtn: !control_btn
      })
    },
    _onPlay() {
      player.src = this.data.playerSrc;
      player.title = this.data.playerTitle;
    },
    _onPause() {
      player.pause();
    },
    _recoverStatus() {
      if (player.paused) {
        this.setData({
          controlBtn: false
        })
        return
      }
      if (player.src == this.data.playerSrc) {
        this.setData({
          controlBtn: true
        })
      }
    },
    _monitorSwitch() {
      player.onPlay(() => {
        this._recoverStatus();
      })
      player.onPause(() => {
        this._recoverStatus();
      })
      player.onStop(() => {
        this._recoverStatus();
      })
      player.onEnded(() => {
        this._recoverStatus();
      })
    }
  }
})
import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import ElementUI from 'element-ui';
import "babel-polyfill";
import iconPicker from 'e-icon-picker'; //一个基于font-awesome 的图标库
import 'e-icon-picker/dist/index.css';// 图标基础样式
import 'e-icon-picker/dist/main.css'; //fontAwesome 图标库样式
import _ from "lodash"  // 引入lodash库

Vue.prototype.$_ = _  //全局注册lodash库
Vue.use(iconPicker); //使用图标库
import anime from "animejs"; //全局使用animejs   js动画库
//添加animejs到项目中
Vue.prototype.$anime = anime;
// 富文本编译器
import  VueQuillEditor from 'vue-quill-editor'
import 'quill/dist/quill.core.css'
import 'quill/dist/quill.snow.css'
import 'quill/dist/quill.bubble.css'
Vue.use(VueQuillEditor)
//多语言
import VueI18n from "vue-i18n"
import enLocale from 'element-ui/lib/locale/lang/en'        //引入Element UI的英文包
import zhLocale from 'element-ui/lib/locale/lang/zh-CN'

Vue.config.productionTip = false
Vue.use(ElementUI);


let language = 'zh';
let userLanguage = (navigator.language || navigator.browserLanguage).toLowerCase()  //获取浏览器默认语言
userLanguage.includes("zh")?language='zh':language='en' //判断浏览器语言设置系统语言
Vue.use(VueI18n)
const i18n = new VueI18n({
  locale: language,
  //this.$i18n.locale // 通过切换locale的值来实现语言切换
  messages: {
    'zh': Object.assign(require("./lang/zh"),zhLocale),
    'en': Object.assign(require("./lang/en"),enLocale)
  }
})


new Vue({
  router,
  store,
  i18n,
  render: h => h(App)
}).$mount('#app')

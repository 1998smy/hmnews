// 按需引入 vant组件库组件
import Vue from 'vue'
import Vant, { Lazyload } from 'vant'
import { NavBar, Form, Field, CellGroup, Toast, Tabbar, TabbarItem, Icon, Tab, Tabs, Cell, PullRefresh, List, ActionSheet, Notify, Popup, Col, Row, Badge, ConfigProvider, Divider, ShareSheet, Uploader, DatetimePicker, Loading, } from 'vant'
import 'vant/lib/index.css'
import 'vant/es/toast/style'
import 'vant/es/notify/style'
import 'vant/es/dialog/style'

Vue.use(NavBar, Form, Field, CellGroup, Toast, Tabbar, TabbarItem, Icon, Tab, Tabs, Cell, PullRefresh, List, ActionSheet, Notify, Popup, Col, Row, Badge, ConfigProvider, Divider, ShareSheet, Uploader, DatetimePicker, Loading);
Vue.use(Vant)
Vue.use(Lazyload)
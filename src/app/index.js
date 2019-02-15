//定义全局路由的方法
window.app = {
    router: null,//路由跳转用到
    routerGoTo: function (path) {
        window.app.router.push(path);
    },
    routerRedirect: function(path){
        window.app.router.replace(path);
    },
    currentRouterPath: '/',//保存当前进入的页面。作用主要是为了。进入某一个页面。如果没有登录，会进入注册页面，注册成功后，返回。注：/Register 不会被设置
};

import React from 'react';
import ReactDom from 'react-dom';
import routes from './routes/routes'
import {Router, Route, browserHistory, hashHistory} from 'react-router';
import {Provider} from "mobx-react";
import Stores from "./config/mobxStores";

const rootEL = document.getElementById('app');
//注入mobx到外层作用区域
try {
    ReactDom.render((
        <Provider {...Stores}>
            <Router
                history={hashHistory}
                routes={routes}
            />
        </Provider>
    ), rootEL);
} catch (e) {
    console.error(e);
}


// 关于routes.js入口路由的注释
//利用react router进行组件code spliting的分拆渲染，也就是
//只有当url路由映射时才渲染对应页面组件，避免最外层作用区域一次性
//渲染多个页面组件，当页面组件路由较多时会造成首屏加载时间过长的问题，影响用户体验



/**
 *进入对应路由映射渲染前发起的全局操作
 *
 * @param {*} nextState
 * @param {*} replace
 */
function rootOnEnter(nextState, replace) {
    var urlInfo = nextState.location.pathname;
    console.log(urlInfo,'klakalkalkal')
    if(urlInfo == ''){
        window.app.currentRouterPath ='/helloworld'
    }
    // 路由标题，作为页面的名称
    let title = nextState.routes[nextState.routes.length - 1].title
    //修改标题
    let urlKey = urlInfo.split('/')[1];
    // 回到顶部
    //window.scrollTo(0, 0);
}

/**
 *离开对应路由映射渲染前发起的全局操作
 *
 * @param {*} prevState
 */
function rootOnLeave(prevState) {
    var urlInfo = prevState.location.pathname + prevState.location.search;
    if (urlInfo != '/login') { 
        window.app.currentRouterPath = urlInfo;
    }
    
}
//设置title信息
function titleText(title) {
     document.title = title;
}

export default [

    {
        path: '/',
        component: require('../app'),
        childRoutes: [
           {
                //home
                 path: '/helloworld',
                 title: 'jareact',
                 getComponent: (nextState, cb) => {
                     require.ensure([], (require) => {
                         cb(null, require('../pages/mobile/helloWorld/helloWorldView'))
                         titleText("jareact")
                     })
                 },
                 onEnter: rootOnEnter,
                 onLeave: rootOnLeave
            }
        ]
    },
]
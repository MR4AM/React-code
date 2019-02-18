import React, {PropTypes, Component} from 'react'
import { inject, observer } from 'mobx-react';
import {NavBar, Icon, TabBar } from 'antd-mobile';
import 'antd-mobile/dist/antd-mobile.css';
//inject从props中获取相应的数据
@inject('helloworld')
//全局视图层入口
class App extends Component {
    constructor(props, context) {
        super(props, context)
    }
    componentDidMount(){
        console.log(this.props,'检测app下所有的props从属属性')
    }
    render() {
        return (
            <div>
                 <NavBar
                    mode="dark"
                    icon={<Icon type="left" />}
                    onLeftClick={() => console.log('onLeftClick')}
                    rightContent={[
                        <Icon key="0" type="search" style={{ marginRight: '16px' }} />,
                        <Icon key="1" type="ellipsis" />,
                    ]}
                    >jareact
                 </NavBar>
                {
                    //this.props.default表示在app components下的所有childroutes都会在这个区域进行渲染
                }
                {this.props.default}
            </div>

            );
    }
}
module.exports = App;
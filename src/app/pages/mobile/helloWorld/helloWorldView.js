/* 
    view层也就是可视化视图层的主要功能
    1.接收来着logic层的状态及数据，可以理解为jsx骨架层
    2.根据数据按架构渲染
*/
import React, {PropTypes, Component} from 'react';
import {inject,observer} from 'mobx-react';
import { Divider } from 'antd';
import './helloWorld.scss';

//inject从props中获取相应的数据
@inject('helloworld')
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
export default class Helloworld extends Component{
    constructor(props,ctx){
        super(props,ctx)
        this.jamobx=this.props.helloworld;
    }
    componentDidMount(){
        console.log(this.jamobx,'检测mobx共享的状态值')
    }
    render(){
        let {title} =this.jamobx.state;
        return(
            <div className="hellworldpage">
                <h3>{title}</h3>
            </div>
        )
    }
}

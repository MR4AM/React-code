/* 
    view层也就是可视化视图层的主要功能
    1.接收来着logic层的状态及数据，可以理解为jsx骨架层
    2.根据数据按架构渲染
*/
import React, {PropTypes, Component} from 'react';
import {inject,observer} from 'mobx-react';
import { Divider } from 'antd';
import './helloWorld.scss';
import { Carousel, WingBlank } from 'antd-mobile';

//inject从props中获取相应的数据
@inject('helloworld')
//将组件设置为响应式组件，成为观察者，以便响应被观察数据的变化
@observer
export default class Helloworld extends Component{
    constructor(props,ctx){
        super(props,ctx)
        this.jamobx=this.props.helloworld;
        this.state = {
            data: ['1', '2', '3'],
            imgHeight: 176,
        }
    }
    componentDidMount(){
        console.log(this.jamobx,'检测mobx共享的状态值');
        setTimeout(() => {
            this.setState({
              data: ['AiyWuByWklrrUDlFignR', 'TekJlZRVCjLFexlOCuWn', 'IJOtIlfsYdTyaDTRVrLI'],
            });
          }, 100);
    }
    render(){
        let {title} =this.jamobx.state;
        return(
            <div className="hellworldpage">
                 <Carousel
                    autoplay={true}
                    infinite
                    beforeChange={(from, to) => console.log(`slide from ${from} to ${to}`)}
                    afterChange={index => console.log('slide to', index)}
                    >
                    {this.state.data.map(val => (
                        <a
                        key={val}
                        href="http://www.alipay.com"
                        style={{ display: 'inline-block', width: '100%', height: this.state.imgHeight }}
                        >
                        <img
                            src={`https://zos.alipayobjects.com/rmsportal/${val}.png`}
                            alt=""
                            style={{ width: '100%', verticalAlign: 'top' }}
                            onLoad={() => {
                            // fire window resize event to change height
                            window.dispatchEvent(new Event('resize'));
                            this.setState({ imgHeight: 'auto' });
                            }}
                        />
                        </a>
                    ))}
                </Carousel>
            </div>
        )
    }
}

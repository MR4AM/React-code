import {observable,action,runInAction,useStrict,autorun} from 'mobx';
/*
    logic逻辑层的主要功能
    1.基于mobx存储控制view层的状态量，状态量一般分为控制动态组件的常量及通过api请求回来的动态数据
    2.处理常规请求，赋值数据给mobx中的状态
    3.处理页面交互逻辑
*/ 
//严格模式下,MobX 会强制只有在动作之中才可以修改状态。对于任何不使用动作的状态修改，MobX 都会抛出异常。
useStrict(true);
class helloWorld{
    //通过@observable监控数据使其成为公共数据
    //用于定义mobx状态变量
    @observable state = {
        title:'这是helloworld页面'
    };
    //action 是任一一段可以改变状态的代码
    @action
    test(){

    }
}
//将logic层进行实例化，使logic层实例唯一，统一输出
const helloworld =new helloWorld();

export default helloworld;
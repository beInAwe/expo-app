

import { useEffect } from 'react';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import Login from '../Login';
import OutLook from './OutLook';
import Register from '../Register';


// 创建一个名为Stack的导航器
const Stack = createNativeStackNavigator();


export default function Myself({ navigation, route }) {
    // 当组件加载时运行一次，用于设置一些导航选项
    useEffect(() => {
        navigation.setOptions({
            headerShown: false,//取消头部显示
            headerBackVisible: false,//取消默认的返回按钮
        })
    }, [])
    // 返回一个StackNavigator组件，用于管理所有的子页面
    return (
        <Stack.Navigator
            initialRouteName="mine"//默认登录页
            screenOptions={{
                headerStyle: {
                    backgroundColor: 'black',//标题背景色
                },
                headerTintColor: '#fff',//后退按钮和标题都使用此属性作为其颜色
                headerTitleStyle: {//自定义的其他样式属性
                    fontWeight: 'bold',
                },
                headerTitleAlign: 'center',//标题文本居中
            }}
        >
            {/* 第一个子页面 */}
            <Stack.Screen
                name="Login"
                component={Login}
                initialParams={{ title: '初始参数', context: '该参数传递给Login页面' }} // 传递给Login组件的初始参数
                options={{
                    headerBackVisible: false, // 取消返回图标
                    // headerTitle: (props) => <LogoTitle {...props} />,
                    title: '登录' // 标题
                }}
            />
            {/* 第二个子页面 */}
            <Stack.Screen
                name="Register"
                component={Register}
                initialParams={{ title: '初始参数' }} // 传递给Register组件的初始参数
                options={{
                    headerBackVisible: false, // 取消返回图标
                    title: '注册', // 标题
                }}
            />
            {/* 第三个子页面 */}
            <Stack.Screen
                name="mine"
                component={OutLook}
                options={{
                    headerBackVisible: false, // 取消返回图标
                    title: '个人中心', // 标题
                }}
            />
        </Stack.Navigator>
    );
}

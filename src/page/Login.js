
import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, View, Text, ToastAndroid } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Btn from '../components/Button';
import { login } from '../api/user';//axios方式
import { useAuth } from '../context/AuthProvider'

// 创建名为Login的组件
const Login = ({ route, navigation }) => {
    // 添加副作用钩子
    useEffect(() => {
        // 打印路由参数
        console.log('login-route.params:', route.params);
        // 设置导航头部的左侧按钮
        navigation.setOptions({
            headerLeft: () => (
                <AntDesign
                    onPress={() => navigation.replace('mine')}
                    name="left"
                    size={26}
                    color="black"
                />
            ),
        })
    }, [])
    // 定义两个状态，分别为用户名和密码，并返回它们的更新函数
    const [userName, onChangeUser] = useState('');
    const [pwd, onChangePwd] = useState('');
    // 从useAuth hook获取user和setUser
    const { user, setUser } = useAuth()

    // 定义toLogin函数，当登录按钮被点击时调用
    const toLogin = () => {
        // 构建包含用户名和密码的数据对象
        let data = { userName: userName, password: pwd }
        // 使用axios发送登录请求
        login(data)
            .then(res => {
                // 打印登录响应
                console.log('login-res:', res);
                // 根据响应状态码进行处理
                if (res.code == 200) {
                    // 导航到'mine'页面并传递参数
                    navigation.navigate('mine', { title: '将参数传递给路由;', context: '该参数传递给Mine页面' })
                    // 使用ToastAndroid显示成功信息
                    ToastAndroid.showWithGravity(res.msg, ToastAndroid.SHORT, ToastAndroid.CENTER)
                    // 更新用户状态
                    setUser(res.data)
                    // 打印用户状态
                    console.log('login-user:', user);
                } else {
                    // 使用ToastAndroid显示错误信息
                    ToastAndroid.showWithGravity(res.msg, ToastAndroid.SHORT, ToastAndroid.CENTER)
                }
            })
    }

    return (
        <View style={styles.container}>
            <View View style={styles.login} >
                <Text style={{ fontSize: 26, marginBottom: 26 }}>
                    登录
                </Text>
                 {/* 输入框，当文本改变时调用onChangeUser更新用户名状态 */}
                <TextInput
                    style={styles.Input}
                    onChangeText={text => onChangeUser(text)}
                    value={userName}
                    placeholder={'手机号/用户名/邮箱'}
                />
                 {/* 输入框，当文本改变时调用onChangePwd更新密码状态 */}
                <TextInput
                    secureTextEntry={true}
                    style={styles.Input}
                    onChangeText={text => onChangePwd(text)}
                    value={pwd}
                    placeholder={'密码'}
                />
                {/* 显示“忘记密码？”文本并在被点击时显示一个Toast消息 */}
                <View style={{
                    width: '100%'
                }}>
                    <Text
                        style={{
                            color: '#4facfe',
                            fontSize: 12,
                            textAlign: 'right',
                        }}
                        onPress={() => {
                            ToastAndroid.showWithGravityAndOffset('忘记密码!', ToastAndroid.SHORT, ToastAndroid.TOP, 200, 400)
                        }}
                    >
                        忘记密码?
                    </Text>
                </View>
                <Btn
                    onPress={toLogin}
                    style={{
                        width: '100%',
                        height: 40,
                        fontWeight: 'bolder',
                        borderRadius: 50,
                        backgroundColor: '#4facfe',
                        marginVertical: 10
                    }}
                    color=''
                    id='login'
                >登录</Btn>
            </View >
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        // padding: 30,
        backgroundColor: '#ccc',
        alignItems: 'center',
        justifyContent: 'center',
    },
    login: {
        width: '70%',
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'center',
        alignItems: 'center'
    },
    Input: {
        width: '100%',
        height: 40,
        padding: 10,
        margin: 10,
        borderColor: 'gray',
        borderRadius: 10,
        borderWidth: 1.5
    },
});
export default Login;

import React, { useState, useEffect } from 'react';
import { TextInput, StyleSheet, View, Text, ToastAndroid } from 'react-native';
import { AntDesign } from '@expo/vector-icons';
import Btn from '../components/Button';
import { register } from '../api/user';//axios方式

const Register = ({ route, navigation }) => {
    useEffect(() => {
        console.log('register-route.params:', route.params);
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
    const [userName, onChangeUser] = useState('');
    const [pwd, onChangePwd] = useState('');
    const [confirm, onChangeConfirm] = useState('');

    const toRegister = () => {
        if (pwd == confirm) {
            let data = { userName: userName, password: pwd, confirm: confirm }
            // axios方式
            register(data)
                .then(res => {
                    console.log('register-res:', res);
                    if (res.code == 200) {
                        navigation.navigate('mine', { title: '将参数传递给路由;', context: '该参数传递给Mine页面' })
                        ToastAndroid.showWithGravity(res.msg, ToastAndroid.SHORT, ToastAndroid.CENTER)
                    } else {
                        ToastAndroid.showWithGravity(res.msg, ToastAndroid.SHORT, ToastAndroid.CENTER)
                    }
                })
        } else {
            ToastAndroid.showWithGravity('请确认两次密码是否输入正确!', ToastAndroid.SHORT, ToastAndroid.CENTER)
        }
    }

    return (
        <View style={styles.container}>
            <View View style={styles.register} >
                <Text style={{ fontSize: 26, marginBottom: 26 }}>
                    注册
                </Text>
                <TextInput
                    style={styles.Input}
                    onChangeText={text => onChangeUser(text)}
                    value={userName}
                    placeholder={'手机号/用户名/邮箱'}
                />
                <TextInput
                    secureTextEntry={true}
                    style={styles.Input}
                    onChangeText={text => onChangePwd(text)}
                    value={pwd}
                    placeholder={'密码'}
                />
                <TextInput
                    secureTextEntry={true}
                    style={styles.Input}
                    onChangeText={text => onChangeConfirm(text)}
                    value={confirm}
                    placeholder={'确认密码'}
                />
                <View style={{
                    width: '100%'
                }}>
                    <Text
                        style={{
                            color: '#4facfe',
                            fontSize: 13,
                            fontWeight: 'bold',
                            textAlign: 'right',
                        }}
                        onPress={() => navigation.replace('Login')}
                    >
                        已有账号,去登陆！
                    </Text>
                </View>
                <Btn
                    onPress={toRegister}
                    style={{
                        width: '100%',
                        height: 40,
                        fontWeight: 'bolder',
                        borderRadius: 50,
                        backgroundColor: '#4facfe',
                        marginVertical: 10
                    }}
                    color=''
                    id='register'
                >注册</Btn>
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
    register: {
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
export default Register;
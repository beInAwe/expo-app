import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import {
  StyleSheet,
  BackHandler,
  ToastAndroid,
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import Home from './src/page/Home';
import AuthProvider from './src/context/AuthProvider';

let time = 0;

export default function App() {
  useEffect(() => {
    BackHandler.addEventListener(
      'hardwareBackPress',
      () => {
        if (Date.now() - time > 2000) {
          time = Date.now();
          ToastAndroid.show(
            '确定退出?',
            ToastAndroid.SHORT
          )
          return true//停止后续操作
        } else {
          BackHandler.exitApp();//退出
        }
      }
    )
  }, [])

  return (
    <AuthProvider>

      <NavigationContainer>

        <StatusBar style="auto" />

        <Stack.Navigator
          initialRouteName="Home"//默认首页
          screenOptions={{
            headerStyle: {
              backgroundColor: '#f4511e',//标题背景色
            },
            headerTintColor: '#fff',//后退按钮和标题都使用此属性作为其颜色
            headerTitleStyle: {//自定义的其他样式属性
              fontWeight: 'bold',
            },
            headerTitleAlign: 'center',//标题文本居中
          }}
        >
          <Stack.Screen
            name="Home"
            component={Home}
            options={{
              title: '首页',
            }}
          />
        </Stack.Navigator>

      </NavigationContainer>
    </AuthProvider>
  );
}

const styles = StyleSheet.create({

});

import { StatusBar } from 'expo-status-bar';
import { useEffect } from 'react';
import {
    StyleSheet,
    Text,
    View,
    Image,
    ImageBackground,
    ScrollView,
    TouchableOpacity,
    Alert,
    BackHandler,
    ToastAndroid
} from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
const Stack = createNativeStackNavigator();

import Btn from './components/Button'
import News from './sceens/News'
import Login from './sceens/Login';
// import RootNavigator from './components/RootNavigator';

const uri = 'https://reactnative.dev/docs/assets/p_cat2.png';

let time = 0;

const ImageBG = ({ source, style, children }) => {
    return (
        <View>
            {/* <Image source={source} style={[style, { position: 'relative' }]} /> */}
            <ImageBackground source={source} style={style} >
                {children}
            </ImageBackground>
        </View>
    )
}

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
        <NavigationContainer>

            <Stack.Navigator initialRouteName="Login">
                <Stack.Screen name="Login" component={Login} />
                <Stack.Screen name="News" component={News} />
            </Stack.Navigator>

            {/* <View style={styles.container}>
        <StatusBar style="auto" /> */}
            {/* <Login /> */}
            {/* <News /> */}
            {/* <RootNavigator /> */}
            {/* <ScrollView>

        <Text style={{ textAlign: "center", color: '#0f0' }}>
          Hello World!
          <Text style={{ color: '#f00' }}>Text 内部也可以加Text,自身样式优先级高于继承的样式</Text>
        </Text>
        <Text>View 默认上下分布</Text>

        <Image
          source={require('./assets/images/bz-12.jpg')}
          style={{ width: 400, height: 300, resizeMode: 'contain' }}
        />
        <Image
          source={{
            uri//简写形式
          }}
          style={{ width: 200, height: 200 }}
        />
        <ImageBackground
          source={require('./assets/images/bz-13.jpg')}
          style={{ width: 400, height: 300, margin: 20 }}
        >
          <Text>背景图片</Text>
        </ImageBackground>
        <ImageBG
          source={require('./assets/images/bz-13.jpg')}
          style={{ width: 450, height: 300 }}
        >
          <Text>自己封装组件</Text>
        </ImageBG>
        <View style={{ justifyContent: 'center', alignItems: 'center' }}>
          <TouchableOpacity
            style={{
              width: 200,
              height: 40,
              margin: 10,
              backgroundColor: '#f00',
              borderRadius: 20,
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Text>按钮</Text>
          </TouchableOpacity>
          <Btn
            id='btn'
            onPress={() => {
              Alert.alert(
                "Alert Title",
                "My Alert Msg",
                [
                  {
                    text: "Ask me later",
                    onPress: () => console.log("Ask me later pressed")
                  },
                  {
                    text: "Cancel",
                    onPress: () => console.log("Cancel Pressed"),
                    style: "cancel"
                  },
                  { text: "OK", onPress: () => console.log("OK Pressed") }
                ]
              )
            }}
            style={{
              width: 200,
              height: 50,
              backgroundColor: '#96e6a1',
            }}
            color=''
          >按钮</Btn>
        </View>

      </ScrollView> */}
            {/* </View> */}
        </NavigationContainer>
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
});

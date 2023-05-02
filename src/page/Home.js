
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { MaterialCommunityIcons } from '@expo/vector-icons';

import { FontAwesome } from '@expo/vector-icons';
import { AntDesign } from '@expo/vector-icons';
import { StyleSheet, } from 'react-native';
import { useEffect } from 'react';
import News from './News';
import Upload from './Upload';
import MineNavigater from './mine/Myself';
import UploadBtn from './UploadBtn';
import ReSet from './ReSet';

const Tab = createBottomTabNavigator();

export default function Home({ route, navigation }) {

    useEffect(() => {
        navigation.setOptions({
            headerShown: false,//取消头部显示
            headerBackVisible: false,//取消默认的返回按钮
        })
    }, [])

    return (
        <Tab.Navigator
            screenOptions={{
                tabBarActiveTintColor: 'black',
                tabBarInactiveTintColor: 'black',
                tabBarInactiveBackgroundColor: '',
                tabBarActiveBackgroundColor: '',
                tabBarLabelStyle: { fontSize: 14 },
                tabBarStyle: { backgroundColor: '#5342CE' },
                headerStyle: {
                    backgroundColor: 'black',//标题背景色
                },
                headerTintColor: '#fff',//后退按钮和标题都使用此属性作为其颜色
                headerTitleAlign: 'center',//标题文本居中
            }}
        >
            <Tab.Screen
                name="新闻"
                component={News}
                options={{
                    tabBarLabel: '首页',
                    tabBarIcon: ({ color, size, focused }) => (
                        focused
                            ? <MaterialCommunityIcons name="message-processing" size={size} color={color} />
                            : <MaterialCommunityIcons name="message-processing-outline" size={size} color={color} />
                    ),
                }} />
            <Tab.Screen
                name="新闻投稿"
                component={Upload}
                options={{
                    tabBarLabel: '投稿',
                    headerRight: () => (<UploadBtn />),
                    tabBarIcon: ({ color, size, focused }) => (
                        focused
                            ? <AntDesign name="cloudupload" size={size} color={color} />
                            : <AntDesign name="clouduploado" size={size} color={color} />
                    ),
                }}
            />
            <Tab.Screen
                name="个人中心"
                component={MineNavigater}
                options={{
                    headerRight: () => (<ReSet />),
                    tabBarLabel: 'Mine',
                    tabBarIcon: ({ color, size, focused }) => (
                        focused
                            ? <FontAwesome name="user" size={size} color={color} />
                            : <FontAwesome name="user-o" size={size} color={color} />
                    ),
                }}
            />
        </Tab.Navigator>
    );
}

const styles = StyleSheet.create({

});

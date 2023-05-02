import React, { useEffect, useRef, useState } from 'react'; // 导入React及其钩子函数
import * as ImagePicker from 'expo-image-picker'; // 导入用于选择图片的库
import { useAuth } from "../../context/AuthProvider"; // 导入自定义钩子函数
import Btn from '../../components/Button'; // 导入自定义组件
import { AntDesign } from '@expo/vector-icons'; // 导入图标库
import Mine from './PersonalInfo'; // 导入自定义组件
import { edit } from '../../api/user'; // 导入API函数
import {
    Image,
    TextInput,
    Alert,
    TouchableHighlight,
    DrawerLayoutAndroid, // 导入用于实现抽屉的组件
    Text,
    StyleSheet,
    View,
} from 'react-native'; // 导入React Native的基础组件及样式

const OutLook = ({ navigation }) => {
    const { user, setUser } = useAuth(); // 获取用户信息和修改用户信息的函数
    // 头像
    const [avatara, setAvatara] = useState(user.avatar); // 定义图片状态
    // 抽屉
    const [name, setName] = useState(''); // 定义用户名状态
    const [password, setPassword] = useState(''); // 定义密码状态
    const [petName, setpetName] = useState(''); // 定义昵称状态
    const [signature, setSignature] = useState(''); // 定义个性签名状态
    useEffect(() => {
        user.avatar ? setAvatara(user.avatar) : setAvatara(null); // 如果用户有头像，设置头像状态，否则设为null
        setName(user.name); // 设置用户名状态
        setPassword(user.password); // 设置密码状态
        setpetName(user.petName); // 设置昵称状态
        setSignature(user.signature); // 设置个性签名状态
        
    }, [user]); // 只有当user发生变化时才执行useEffect

    const pickImage = async () => {

        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All, // 所有媒体类型
            allowsEditing: true, // 允许编辑
            aspect: [4, 3], // 宽高比为4:3
            quality: 1, // 图片质量为1
        });
        if (!result.canceled) {
            setAvatara(result.assets[0].uri); // 设置图片状态
        }
    };

    // 抽屉
    const drawer = useRef(null); // 定义一个引用

    const reset = () => { // 定义名为 reset 的函数
        let infoData = { // 使用对象扩展运算符，将 user 对象的所有属性复制到新对象中，并替换 userName、password、petName 和 signature 属性的值
            ...user,
            name: name,
            password: password,
            petName: petName,
            signature: signature
        }
        edit(infoData) // 调用 edit 函数，并传递 infoData 对象作为参数
            .then(res => { // 处理 edit 函数返回的 Promise
                console.log( res); // 打印 edit 函数的返回值 res
                if (res.code === '200') { // 如果 res.code 的值等于字符串 '200'，则执行以下代码块
                    Alert.alert('success'); // 显示一个包含“修改成功”文本的 Alert 对话框
                    setUser(res.data); // 调用 setUser 函数，将 res.data 对象作为参数，以更新用户信息
                    drawer.current.closeDrawer(); // 关闭 drawer 抽屉
                }
                drawer.current.closeDrawer(); // 无论 if 语句是否执行，都会关闭 drawer 抽屉
            })
    }


    const navigationView = () => (
        //定义名为 navigationView 的函数组件
        <View style={[styles.container1, styles.navigationContainer]}>
            {/* 使用 View 组件来创建 UI 布局，并添加样式 */}
            {/* 定义一个可点击的组件，用于选择头像图片 */}
            {/* 添加样式
        绑定 onPress 事件 */}
            <TouchableHighlight
                style={{ marginLeft: 18 }}
                onPress={pickImage}
            >
                <View style={styles.avataraa}>
                    {/* 使用 View 组件创建 UI 布局，并添加样式 */}
                    <Text style={{ fontSize: 25 }}>头像</Text>
                    {/* 添加一个文本组件 */}
                    <View style={styles.avatara}>
                        {/* 创建一个用于展示头像的组件，使用 View 组件创建 UI 布局，并添加样式 */}
                        <Image
                            source={{ uri: avatara }}
                            style={{ width: 48, height: 47 }}
                        />
                        {/* 使用 Image 组件展示头像图片//指定图片的来源//添加样式 */}
                    </View>
                    <AntDesign name="right" size={20} color="black" />
                    {/* //添加一个 AntDesign 图标组件 */}
                </View>
            </TouchableHighlight>

            {/* //使用 View 组件创建 UI 布局，并添加样式 */}
            <View style={styles.xoy}>
                {/* //添加一个输入框组件，用于输入用户名 */}
                <TextInput
                    style={styles.textin}   //添加样式
                    onChangeText={text => setName(text)}   //绑定 onChangeText 事件
                    value={name}   //指定输入框的初始值
                    placeholder={'用户名'}   //添加一个占位符
                />
                <TextInput   //添加一个输入框组件，用于输入密码
                    secureTextEntry={true}   //指定输入内容为密码
                    style={styles.textin}   //添加样式
                    onChangeText={text => setPassword(text)}   //绑定 onChangeText 事件
                    value={password}   //指定输入框的初始值
                    placeholder={'密码'}   //添加一个占位符
                />
                <TextInput   //添加一个输入框组件，用于输入昵称
                    style={styles.textin}   //添加样式
                    onChangeText={text => setpetName(text)}   //绑定 onChangeText 事件
                    value={petName}   //指定输入框的初始值
                    placeholder={'昵称'}   //添加一个占位符
                />
                <TextInput   //添加一个输入框组件，用于输入个性签名
                    style={styles.textin}   //添加样式
                    onChangeText={text => setSignature(text)}   //绑定 onChangeText 事件
                    value={signature}   //指定输入框的初始值
                    placeholder={'个性签名'}   //添加一个占位符
                />
                <Btn   //自定义的按钮组件
                    onPress={reset}   //绑定 onPress 事件
                    style={{   //添加样式
                        width: '100%',
                        height: 40,
                        fontWeight: 'bolder',
                        borderRadius: 50,
                        backgroundColor: '#4facfe',
                        marginVertical: 10
                    }}
                    color=''
                    id='reset'
                >退出登录</Btn>
            </View>
        </View>
    );

    // 返回一个DrawerLayoutAndroid组件，用于呈现侧边抽屉式菜单
    return (
        <DrawerLayoutAndroid
            // 将drawer变量作为ref属性传递给DrawerLayoutAndroid组件，以便在其他地方使用该组件
            ref={drawer}
            // 定义侧边抽屉的宽度为300像素
            drawerWidth={300}
            // 定义侧边抽屉的位置为右侧
            drawerPosition='right'
            // 定义渲染侧边菜单视图的函数
            renderNavigationView={navigationView}
        >
            {/* 在侧边抽屉中呈现一个名为'Mine'的组件，并将drawer、user和navigation作为属性传递给该组件 */}
            <Mine drawer={drawer} user={user} navigation={navigation} />
        </DrawerLayoutAndroid>
    );
}




const styles = StyleSheet.create({
    avatara: {
        borderRadius: 15,
        overflow: 'hidden',
        width: 60,
        height: 60,

    },
    container1: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
        padding: 16,
    },
    navigationContainer: {
        backgroundColor: '#ecf0f1',
    },
    xoy: {
        width: '90%',
        display: 'flex',
        // flex: 1,
        justifyContent: 'center',
        alignItems: 'center'
    },
    avataraa: {
        width: '90%',
        display: 'flex',
        flexDirection: 'row',
        // flex: 1,
        justifyContent: 'space-between',
        alignItems: 'center'
    },
    textin: {
        width: '100%',
        borderRadius: 12,
        borderWidth: 1.5,
        height: 38,
        padding: 10,
        margin: 10,
    
    },
});

export default OutLook;
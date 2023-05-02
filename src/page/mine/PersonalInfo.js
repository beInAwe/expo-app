import React, { useEffect, useState } from 'react';
import Btn from '../../components/Button';
import {
    Text,
    StyleSheet,
    View,
    Image,
    TouchableHighlight,
    ToastAndroid
} from 'react-native';
import { FontAwesome, AntDesign, MaterialCommunityIcons, } from '@expo/vector-icons';
export default PersonalInfo = (props) => {
    useEffect(() => {
        console.log(props.user);
    }, [])

    const handlePress = () => {
        props.navigation.navigate('TodoList');
    }
    const handlePressGame = () => {
        props.navigation.navigate('Game');
    }
    const handlePressUpload = () => {
        // 导航到 "新闻投稿" 页面
        props.navigation.navigate('新闻投稿');
    }
    const news = () => { props.navigation.navigate('新闻') }


    return (
        <View style={styles.ctn}>
            <View style={styles.user}>
                {/* 用户头像部分 */}
                <View style={styles.avatarit}>
                    {
                        // 如果用户头像存在，则使用 Image 组件展示该头像，否则使用 FontAwesome 组件展示默认头像
                        props.user.avatar
                            ? <Image
                                source={{ uri: props.user.avatar }}
                                style={{ width: 88, height: 88 }}
                            />
                            : <FontAwesome name="user" size={88} color="#5A44CD" />

                    }
                </View>
                name
                {/* 用户信息部分 */}
                {
                    // 如果用户已登录，则展示用户信息和抽屉菜单按钮
                    Object.keys(props.user).length != 0
                        ? <TouchableHighlight
                            style={styles.button}
                            onPress={() => { props.drawer.current.openDrawer() }}
                        >
                            <View style={styles.avr}>
                                {/* 用户名、昵称和个性签名 */}
                                <View style={styles.abr}>
                                    <Text style={styles.name}>{props.user.userName}</Text>
                                    <Text style={styles.nickName}>昵称：{props.user.nickName}</Text>
                                    <Text style={styles.signature}>个性签名：{props.user.userSignature}</Text>
                                </View>
                                {/* 抽屉菜单按钮 */}
                                <View style={styles.btn}>
                                    <AntDesign name="qrcode" size={24} color="black" />
                                    <AntDesign name="right" size={20} color="black" />
                                </View>
                            </View>
                        </TouchableHighlight>
                        // 如果用户未登录，则展示登录和注册按钮
                        : <View style={{ marginLeft: 40, display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between', width: 360 }}>
                            <Text >您还未登录</Text>
                            {/* 登录按钮 */}
                            <Btn
                                onPress={() => { props.navigation.replace('Login') }}
                                style={styles.loginn}
                                color=''
                                id='login'
                            >登录</Btn>
                            {/* 注册按钮 */}
                            <Btn
                                onPress={() => { props.navigation.replace('Register') }}
                                style={styles.registerr}
                                color=''
                                id='register'
                            >注册</Btn>
                        </View>
                }
            </View>

            {/* 第一个元素是一个可触摸的高亮元素，并使用 styles.button 样式。
            在按下元素时，onPress 属性将调用一个函数，
            该函数使用 React Navigation 的 navigate 方法将用户导航到名为“新闻”的屏幕。
            这个元素也有一个 marginTop 样式属性，它将这个元素的上边缘与它上面的元素分隔开 */}
            <TouchableHighlight
                style={[styles.button, { marginTop: 23 }]}
                onPress={news}
            >
                {/* 这个元素包含一个名为 awe 的样式和两个子元素。
                第一个子元素是一个名为 iconBox 的样式，包含一个使用 MaterialCommunityIcons 
                组件的图标和一个文本标签，用于描述这个元素。
                第二个子元素是一个使用 AntDesign 组件的右箭头图标，用于指示用户可以进一步导航。 */}
                <View style={styles.awe}>
                    <View style={styles.iconBox}>
                        <AntDesign name="mail" size={24} color="#5A44CD" />

                        <Text style={styles.iconText}>新闻列表</Text>
                    </View>
                    <AntDesign name="right" size={20} color="#5A44CD" />
                </View>
            </TouchableHighlight>
            {/* 第二个元素也是一个可触摸的元素，并使用 styles.button 样式。
            当按下元素时，onPress 属性将调用一个函数，
            该函数使用 React Navigation 的 navigate 方法将用户导航到名为“新闻投稿”的屏幕。 */}
            <TouchableHighlight
                style={styles.button}
                onPress={handlePressUpload}
            >
                {/* 这个元素也包含一个名为 awe 的样式和两个子元素。
                第一个子元素是一个名为 iconBox 的样式，包含一个使用 AntDesign 
                组件的图标和一个文本标签，用于描述这个元素。
                第二个子元素是一个使用 AntDesign 组件的右箭头图标，
                用于指示用户可以进一步导航。 */}
                <View style={styles.awe}>
                    <View style={styles.iconBox}>
                        <AntDesign name="star" size={24} color="#5A44CD" />
                        <Text style={styles.iconText}>投稿</Text>
                    </View>
                    <AntDesign name="right" size={20} color="#5A44CD" />
                </View>
            </TouchableHighlight>
            {/* 第三个元素也是一个可触摸的元素，并使用 styles.button 样式。
            当按下元素时，onPress 属性将调用一个函数，
            该函数使用 React Navigation 的 navigate 方法将用户导航到名为“新闻投稿”的屏幕。 */}
            <TouchableHighlight
                style={styles.button}
                onPress={() => { props.navigation.navigate('新闻投稿') }}
            >
                <View style={styles.awe}>
                    <View style={styles.icon}>
                        <AntDesign name="staro" size={24} color="#5A44CD" />
                        <Text style={styles.iconText}>朋友圈</Text>
                    </View>
                    <AntDesign name="right" size={20} color="#5A44CD" />
                </View>
            </TouchableHighlight>

            {/* 二维码按钮 */}
            <TouchableHighlight
                style={styles.button}
                onPress={() => {
                    // 导航到 "二维码" 页面
                    props.navigation.navigate('二维码');
                }}>
                <View style={styles.awe}>
                    <View style={styles.icon}>
                        {/* 二维码图标 */}
                        <AntDesign name="qrcode" size={24} color="#5A44CD" />
                        {/* 图标文本 */}
                        <Text style={styles.iconText}>二维码</Text>
                    </View>
                    {/* 右侧箭头图标 */}
                    <AntDesign name="right" size={20} color="#5A44CD" />
                </View>
            </TouchableHighlight>

            {/* 上传按钮 */}
            <TouchableHighlight
                style={styles.button}
                onPress={handlePressUpload}>
                <View style={styles.awe}>
                    <View style={styles.icon}>
                        {/* 上传图标 */}
                        <AntDesign name="cloudupload" size={24} color="#5A44CD" />
                        {/* 图标文本 */}
                        <Text style={styles.iconText}>upload</Text>
                    </View>
                    {/* 右侧箭头图标 */}
                    <AntDesign name="right" size={20} color="#5A44CD" />
                </View>
            </TouchableHighlight>


            {/* Todolist 按钮 */}
            <TouchableHighlight style={styles.button} onPress={handlePress}>
                <View style={styles.awe}>
                    <View style={styles.icon}>
                        {/* 工具箱图标 */}
                        <AntDesign name="tool" size={24} color="#5A44CD" />
                        {/* 图标文本 */}
                        <Text style={styles.iconText}>Todolist</Text>
                    </View>
                    {/* 右侧箭头图标 */}
                    <AntDesign name="right" size={20} color="#5A44CD" />
                </View>
            </TouchableHighlight>

            {/* Game 按钮 */}
            <TouchableHighlight style={styles.button} onPress={handlePressGame}>
                <View style={styles.awe}>
                    <View style={styles.icon}>
                        {/* 游戏图标 */}
                        <AntDesign name="minuscircleo" size={24} color="black" />
                        {/* 图标文本 */}
                        <Text style={styles.iconText}>Game</Text>
                    </View>
                    {/* 右侧箭头图标 */}
                    <AntDesign name="right" size={20} color="#5A44CD" />
                </View>
            </TouchableHighlight>



            {/* TouchableHighlight 组件，用于渲染一个带有图标和文本的按钮。
            它会显示一个提示信息。
            如果用户未登录，则显示“请先登录”提示信息；
            如果用户已登录，则打开抽屉（drawer）。 */}
            <TouchableHighlight
                style={[styles.button, { marginTop: 23 }]} // 按钮样式，包括顶部边距。
                onPress={() => {
                    // 当按钮被点击时执行的函数。
                    Object.keys(props.user).length == 0 // 判断用户是否已登录。
                        ? ToastAndroid.showWithGravity('请先登录', ToastAndroid.SHORT, ToastAndroid.CENTER) // 如果用户未登录，则显示提示信息。
                        : props.drawer.current.openDrawer() // 如果用户已登录，则打开抽屉。
                }}>
                <View style={styles.awe}>
                    <View style={styles.icon}>
                        {/* 设置图标 */}
                        <AntDesign name="setting" size={30} color="#5336A2" />
                        {/* 图标下方的文本 */}
                        <Text style={styles.iconText}>设置</Text>
                    </View>
                    {/* 右侧箭头图标 */}
                    <AntDesign name="right" size={20} color="black" />
                </View>
            </TouchableHighlight>




        </View >
    );
};
const styles = StyleSheet.create({
    ctn: {
        backgroundColor: '#F8FAF3',
        flex: 1,
    },
    avr: {

        marginLeft: 40,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    },
    button: {
        backgroundColor: '#F194FF',
        borderRadius: 20,
        padding: 10,
        elevation: 2,
        marginBottom: 10,
    },
    abr: {
        width: 230,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center'
    },
    awe: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
    },
    icon: {
        flexDirection: 'row',
        alignItems: 'center',
    },
    iconText: {
        marginLeft: 10,
        fontSize: 18,
        fontWeight: 'bold',
    },
    user: {
        backgroundColor: '#ffffff',
        padding: 30,
        display: 'flex',
        flexDirection: 'row',
    },
    avatarit: {
        width: 140,
        height: 140,
        borderRadius: 12,
        overflow: 'hidden',
    },
    loginn: {
        borderRadius: 10,
        backgroundColor: '#5A44CD',
        marginVertical: 10,
        width: 90,
        height: 40,
        fontWeight: 'bolder',
    },
    btn: {
        width: 80,
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between'
    }
    ,
    registerr: {
        borderRadius: 10,
        backgroundColor: '#4facfe',
        marginVertical: 10,
        width: 90,
        height: 40,
        fontWeight: 'bolder',
    },
    nickName: {
        color: '#ccc',
        fontWeight: 'bold',
        marginTop: 6
    },
    name: {
        fontSize: 36,
        fontWeight: 'bold',
    },
    signature: {
        fontWeight: 'bold',
        color: '#ccc'
    },
});

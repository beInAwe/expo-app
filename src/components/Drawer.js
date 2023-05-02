import React, { useState } from 'react';
import {
    StyleSheet,
    View,
    TextInput,
    Alert,
} from 'react-native';
import * as ImagePicker from 'expo-image-picker';
import { upload, edit } from '../src/api/user';
import { useAuth } from "../src/context/AuthProvider";
// import { AntDesign } from '@expo/vector-icons';

const { user, setUser } = useAuth();
console.log(user);

export default navigationView = () => {
    const [userName, setuserName] = useState(user.userName);
    const [password, setPwd] = useState(user.password);
    const [nickName, setnickName] = useState(user.nickName);
    const [userSignature, setSignature] = useState(user.userSignature);
    const [image, setImage] = useState(user.avatar);
    const reset = () => {
        console.log(image);
        let infoData = { ...user, userName: userName, password: password, nickName: nickName, userSignature: userSignature, avatar: image }
        edit(infoData)
            .then(res => {
                console.log(res);
                if (res.code === '200') {
                    Alert.alert('修改成功');
                    setUser(res.data);
                    setDimage(user.avatar);
                    drawer.current.closeDrawer()
                }
                drawer.current.closeDrawer()
            })
    }
    const pickImage = async () => {
        // No permissions request is necessary for launching the image library
        let result = await ImagePicker.launchImageLibraryAsync({
            mediaTypes: ImagePicker.MediaTypeOptions.All,
            allowsEditing: true,
            aspect: [4, 3],
            quality: 1,
        });
        console.log(result);
        console.log(result.file);
        if (!result.canceled) {
            setImage(result.assets[0].uri);
        }
    };
    return (
        <View style={[styles.container1, styles.navigationContainer]}>
            <View style={styles.info}>
                <View style={styles.avatar}>
                    <Image
                        source={{ uri: image }}
                        style={{ width: 120, height: 120 }}
                    />
                </View>
                <Btn
                    key='avatar'
                    onPress={pickImage}
                    style={{
                        width: '30%',
                        height: 30,
                        backgroundColor: image ? '#fee140' : '#00f2fe'
                    }}
                    color='#f9748f'//注意，使用表达式需要添加大括号
                >
                    更换头像
                </Btn>
            </View>
            <View style={styles.info}>
                <TextInput
                    style={styles.Input}
                    onChangeText={text => setuserName(text)}
                    value={userName}
                    placeholder={'用户名'}
                />
                <TextInput
                    secureTextEntry={true}
                    style={styles.Input}
                    onChangeText={text => setPwd(text)}
                    value={password}
                    placeholder={'密码'}
                />
                <TextInput
                    style={styles.Input}
                    onChangeText={text => setnickName(text)}
                    value={nickName}
                    placeholder={'昵称'}
                />
                <TextInput
                    style={styles.Input}
                    onChangeText={text => setSignature(text)}
                    value={userSignature}
                    placeholder={'个性签名'}
                />
                <Btn
                    // onPress={() => drawer.current.closeDrawer()}
                    onPress={reset}
                    style={{
                        width: '100%',
                        height: 40,
                        fontWeight: 'bolder',
                        borderRadius: 50,
                        backgroundColor: '#4facfe',
                        marginVertical: 10
                    }}
                    color=''
                    id='reset'
                >修改</Btn>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({

});

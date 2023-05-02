import React, { useState } from "react";
import {
    Modal,
    StyleSheet,
    View,
    Text,
    TextInput,
    ToastAndroid
} from "react-native";
import Btn from '../components/Button';
import { postDraft } from "../api/draft";
import { useAuth } from "../context/AuthProvider";

const btnStyle = {
    width: '40%',
    height: 40,
    fontWeight: 'bolder',
    borderRadius: 50,
    backgroundColor: '#4facfe',
    marginVertical: 30
}

const UploadBtn = () => {
    const [modalVisible, setModalVisible] = useState(false);
    const [title, setTitle] = useState('');
    const [context, setContext] = useState('');
    const { user } = useAuth();

    // 表单结束之后执行
    const toSubmit = () => {
        const draftUser = user.userId;
        const msg = { draftTitle: title, draftContext: context, draftUser }
        postDraft(msg)
            .then(res => {
                console.log('uploadBtn-postDraft:', res);
                if (res.code == '200') {
                    ToastAndroid.showWithGravity('投稿成功', ToastAndroid.SHORT, ToastAndroid.CENTER)
                    setModalVisible(false);
                }
            });
    };

    return (
        <View style={styles.centeredView}>
            <Btn
                key='upload'
                onPress={() => {
                    Object.keys(user).length == 0
                        ? ToastAndroid.showWithGravity('您还没登陆,登录之后再投稿吧!', ToastAndroid.SHORT, ToastAndroid.CENTER)
                        : setModalVisible(true);
                }}
                style={{
                    width: 100,
                    height: 40,
                    backgroundColor: '#96e6a1',
                    borderRadius: 30,
                    marginHorizontal: 20
                }}
            >
                投稿
            </Btn>

            <Modal
                animationType="slide"
                transparent={true}
                visible={modalVisible}
                onRequestClose={() => {
                    ToastAndroid.showWithGravity("Modal has been closed.", ToastAndroid.SHORT, ToastAndroid.CENTER)
                    setModalVisible(!modalVisible);
                }}
                style={{ position: 'absolute' }}
            >
                <View style={styles.formStyle}>
                    <Text style={styles.title}>投稿标题</Text>
                    <TextInput
                        style={styles.Input}
                        onChangeText={text => setTitle(text)}
                        value={title}
                        placeholder={'投稿标题'}
                    />
                    <Text style={styles.title}>投稿内容</Text>
                    <TextInput
                        style={styles.Input}
                        onChangeText={text => setContext(text)}
                        value={context}
                        placeholder={'投稿内容'}
                    />
                    <View style={{ width: '90%', display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
                        <Btn
                            onPress={toSubmit}
                            style={btnStyle}
                            color=''
                            id='submit'
                        >发布投稿</Btn>
                        <Btn
                            onPress={() => {
                                setModalVisible(!modalVisible);
                            }}
                            style={btnStyle}
                            color=''
                            id='cancel'
                        >取消</Btn>
                    </View>
                </View>
            </Modal>

        </View>
    );
};

const styles = StyleSheet.create({
    centeredView: {
        flex: 1,
        justifyContent: "center",
        alignItems: "center",
    },
    formStyle: {
        position: 'relative',
        top: 300,
        left: 60,
        borderRadius: 50,
        backgroundColor: '#fff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '80%',
        height: 400
    },
    Input: {
        width: '90%',
        height: 40,
        padding: 10,
        margin: 20,
        borderColor: 'gray',
        borderRadius: 10,
        borderWidth: 1.5
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold'
    }
});

export default UploadBtn;
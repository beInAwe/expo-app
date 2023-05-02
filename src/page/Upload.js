import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    FlatList,
    SafeAreaView,
    Image
} from 'react-native';
import { useState, useEffect } from 'react'
import { getDraft } from '../api/draft';
import { baseAvatarUrl } from '../context/AuthProvider'

// FlatList
const Item = ({ title, name, context, time, avatar }) => {
    let src = !avatar ? 'https://reactnative.dev/docs/assets/p_cat2.png' : avatar.includes('http') ? avatar : baseAvatarUrl + avatar;
    // console.log(src);
    return (
        <View style={styles.item}>
            <View style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', alignItems: 'center' }}>
                <View style={{ width: 60, height: 60, borderRadius: 30, overflow: 'hidden', borderWidth: 2, marginLeft: 20 }}>
                    <Image
                        source={{ uri: src }}
                        style={{ width: 60, height: 60 }}
                        key={time}
                    />
                </View>
                <View style={{ marginRight: 40 }}>
                    <Text style={styles.title}>
                        user: {name}
                    </Text>
                    <Text style={{ fontSize: 18 }}>
                        time: {new Date(time).toLocaleString()}
                    </Text>
                </View>
            </View>
            <View style={{ marginTop: 20, marginLeft: 20 }}>
                <Text style={styles.title}>
                    draftTitle: {title}
                </Text>
                <Text style={{ fontSize: 18, marginVertical: 10 }}>
                    draftContext: {context}
                </Text>
            </View>
        </View>
    );
}

const renderItem = ({ item }) => {
    return (
        < Item name={item.user.userName} time={item.draftDate} title={item.draftTitle} context={item.draftContext} avatar={item.user.avatar} />
    )
};

export default function Upload({ route, navigation }) {
    console.log(route.params);
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [list, setList] = useState([])
    const [refreshing, setFresh] = useState(false)
    // 组件加载时运行
    useEffect(() => {
        getDraft({ page, size: 11 })
            .then(res => {
                if (res.code === '200') {
                    setFresh(false)
                    setTotalPages(res.data.totalPages)
                    if (page == 1) {
                        setList(res.data.content)
                    } else {
                        setList([...list, ...res.data.content])
                    }
                }
            })
            .catch(err => {
                console.log(err);
            })
    }, [page]);

    const onEnd = () => {
        console.log('end');
        if (page == totalPages) {
            Alert.alert('最后一页')
        } else {
            setPage(page + 1)
        }
    }

    const onRefresh = () => {
        setFresh(true)
        setPage(1)
    }

    return (
        <View style={styles.container}>
            <SafeAreaView style={styles.container1}>
                <FlatList
                    data={list}
                    renderItem={renderItem}
                    onEndReached={onEnd}
                    refreshing={refreshing}
                    onRefresh={onRefresh}
                    keyExtractor={item => item.id}
                />
            </SafeAreaView>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        border: 5,
        marginTop: StatusBar.currentHeight || 0,
        paddingTop: 20,
        backgroundColor: '#F8FAF3',
    },
    container1: {
        flex: 8,
    },
    item: {
        backgroundColor: '#FFFFFF',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-around',
        fontSize:'11'
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        color:'white'
    },
});

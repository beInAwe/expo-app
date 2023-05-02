import { StatusBar } from 'expo-status-bar';
import {
    StyleSheet,
    Text,
    View,
    Alert,
    FlatList,
    SafeAreaView
} from 'react-native';
import { useState, useEffect } from 'react'
import { getList } from '../api/news';
import Btn from '../components/Button'

// FlatList
const Item = ({ title, type, context }) => {
    return (
        <View style={styles.item}>
            <Text style={styles.title}>{title} -- {type}</Text>
            <Text>{context}</Text>
        </View>
    );
}

const renderItem = ({ item }) => {
    return (
        < Item title={item.newsTitle} type={item.type.newsName} context={item.newsContext} />
    )
};

const tagsData = [
    { title: '全部新闻', url: '' },
    { title: '综合新闻', url: '1' },
    { title: '通知公告', url: '2' },
    { title: '媒体聚焦', url: '3' },
    { title: '科学科研', url: '4' },
    { title: '基层动态', url: '5' }
];

export default function News({ route, navigation }) {
    console.log(route.params);
    const [selectTag, setSelectTag] = useState('')
    const [page, setPage] = useState(1)
    const [totalPages, setTotalPages] = useState(0)
    const [list, setList] = useState([])
    const [refreshing, setFresh] = useState(false)
    // 组件加载时运行
    useEffect(() => {
        getList({ page, size: 20, newsType: selectTag })
            .then(res => {
                console.log('50:', res);
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
    }, [selectTag, page]);

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
            <View style={styles.tabBtn}>
                {
                    tagsData.map(item => {
                        return (
                            <Btn
                                key={item.url}
                                onPress={() => {
                                    setSelectTag(item.url)
                                }}
                                style={{
                                    width: '16%',
                                    height: 30,
                                    backgroundColor: item.url == selectTag ? '#fee140' : '#00f2fe'
                                }}
                                color={item.url == selectTag ? '#f9748f' : ''}//注意，使用表达式需要添加大括号
                            >
                                {item.title}
                            </Btn>
                        )
                    })
                }
            </View>

            <SafeAreaView style={styles.flat}>
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
        backgroundColor: '#ffffff',
        alignItems: 'center',
        justifyContent: 'center',
    },
    flat: {
        flex: 1,
        marginTop: StatusBar.currentHeight || 0,
    },
    tabBtn: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        // marginVertical: 20,//表示上、下margin合并
    },
    item: {
        backgroundColor: '#a8edea',
        padding: 20,
        marginVertical: 8,
        marginHorizontal: 16,
    },
    title: {
        fontSize: 20,
        fontWeight: 'bold',
        marginBottom: 10
    },
});

import {
    StyleSheet,
    Text,
    TouchableOpacity,
} from 'react-native';

export default Btn = (props) => {
    const { children, style, color, onPress, id } = props
    return (
      
        <TouchableOpacity
            key={id}
            style={{ ...styles.Btn, ...style }}
            onPress={onPress}
        >
            <Text style={{ color: color ? color : '#fff', fontSize: 18, fontWeight: 'bold' }}>
                {children}
            </Text>
        </TouchableOpacity>
    )
}
const styles = StyleSheet.create({
    Btn: {
        justifyContent: 'center',
        alignItems: 'center',
        marginVertical: 25,//表示上、下margin合并
    },
});

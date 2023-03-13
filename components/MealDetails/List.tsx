import { StyleSheet, View, Text } from 'react-native';

type Props = {
    list: string[];
};

const List: React.FC<Props> = ({ list }) => {
    const content = list.map((item, index) => (
        <View style={styles.listItem} key={index}>
            <Text style={styles.itemText}>{item}</Text>
        </View>
    ));
    return <>{content}</>;
};

export default List;

const styles = StyleSheet.create({
    listItem: {
        borderRadius: 6,
        paddingHorizontal: 8,
        paddingVertical: 4,
        marginVertical: 4,
        marginHorizontal: 12,
        backgroundColor: '#e2b497',
    },
    itemText: {
        color: '#351401',
        textAlign: 'center',
    },
});

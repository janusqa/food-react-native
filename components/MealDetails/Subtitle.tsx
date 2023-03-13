import { StyleSheet, View, Text } from 'react-native';

type Props = {
    heading: string;
};

const Subtitle: React.FC<Props> = ({ heading }) => {
    return (
        <View style={styles.subTitleContainer}>
            <Text style={styles.subTitle}>{heading}</Text>
        </View>
    );
};

export default Subtitle;

const styles = StyleSheet.create({
    subTitle: {
        color: '#e2b497',
        fontSize: 18,
        fontWeight: 'bold',
        textAlign: 'center',
    },
    subTitleContainer: {
        padding: 6,
        marginHorizontal: 12,
        marginVertical: 4,
        borderBottomColor: '#e2b497',
        borderBottomWidth: 2,
    },
});

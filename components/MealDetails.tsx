import { StyleSheet, View, Text } from 'react-native';

type Props = {
    duration: number;
    complexity: string;
    affordability: string;
    style?: { [key: string]: string };
    textStyle?: { [key: string]: string };
};

const MealDetails: React.FC<Props> = ({
    duration,
    complexity,
    affordability,
    style,
    textStyle,
}) => {
    return (
        <View style={[styles.details, style ? style : style]}>
            <Text style={[styles.detailsItem, textStyle ? textStyle : null]}>
                {duration}m
            </Text>
            <Text style={[styles.detailsItem, textStyle ? textStyle : null]}>
                {complexity.toUpperCase()}
            </Text>
            <Text style={[styles.detailsItem, textStyle ? textStyle : null]}>
                {affordability.toUpperCase()}
            </Text>
        </View>
    );
};

export default MealDetails;

const styles = StyleSheet.create({
    details: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        padding: 8,
    },
    detailsItem: {
        marginHorizontal: 4,
        fontSize: 12,
    },
});

import {
    StyleSheet,
    View,
    Text,
    Pressable,
    Image,
    Platform,
} from 'react-native';
import { useNavigation, useRoute } from '@react-navigation/native';
import type { NativeStackNavigationProp } from '@react-navigation/native-stack';
import type { RouteProp } from '@react-navigation/native';
import { RootStackParamList } from '../../App';
import MealDetails from '../MealDetails';

type MealOverviewNavigationProps = NativeStackNavigationProp<
    RootStackParamList,
    'MealsOverview'
>;

type MealOverviewRouteProps = RouteProp<RootStackParamList, 'MealsOverview'>;

type Props = {
    id: string;
    title: string;
    imageUrl: string;
    duration: number;
    complexity: string;
    affordability: string;
    onPress?: (mealId: string) => void;
};

const MealItem: React.FC<Props> = ({
    id,
    title,
    imageUrl,
    duration,
    complexity,
    affordability,
    onPress, // we no longer pass in a hander since we can do navigation via useNavigation hook directly in this component.
}) => {
    // note wer are passing in an onPress from parent component
    // which we can use to navigate to Meals Details from that page,
    // but to show a different method we will use useNavigation hook
    // here to perform navication from same component that press occurs!!!
    const navigation = useNavigation<MealOverviewNavigationProps>();
    const route = useRoute<MealOverviewRouteProps>();

    const pressHandler = () => {
        navigation.navigate('MealDetails', { mealId: id });
        // console.log(route.params.categoryId)
    };

    return (
        <View style={styles.mealItem}>
            <Pressable
                style={({ pressed }) => (pressed ? styles.buttonPressed : null)}
                // onPress={() => onPress(id)}
                onPress={pressHandler}
                android_ripple={{ color: '#ccc' }}
            >
                <View style={styles.innerContainer}>
                    <View>
                        <Image
                            style={styles.image}
                            source={{ uri: imageUrl }}
                        />
                        <Text style={styles.title}>{title}</Text>
                    </View>
                    <MealDetails
                        duration={duration}
                        complexity={complexity}
                        affordability={affordability}
                    />
                </View>
            </Pressable>
        </View>
    );
};

export default MealItem;

// REMEMBER: that overflow hidden on IOS causes shadows to be hidden!!!!
const styles = StyleSheet.create({
    mealItem: {
        margin: 16,
        borderRadius: 8,
        elevation: 4,
        backgroundColor: 'white', // must add bgcolor to make a shadow actually appear
        shadowColor: 'black',
        shadowOpacity: 0.35,
        shadowOffset: { width: 0, height: 2 },
        shadowRadius: 16,
        overflow: Platform.OS === 'android' ? 'hidden' : 'visible',
    },
    innerContainer: {
        borderRadius: 8,
        // we can put overflow hidden here because no shadows
        // here so ios will not be affected. And border radius
        // will again be effective on inner container to give
        // back roundde corners to IOS
        overflow: 'hidden',
    },
    image: {
        width: '100%',
        height: 200,
    },
    title: {
        fontWeight: 'bold',
        textAlign: 'center',
        fontSize: 18,
        margin: 8,
    },
    buttonPressed: {
        opacity: 0.5,
    },
});

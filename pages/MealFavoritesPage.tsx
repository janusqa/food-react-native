import { StyleSheet, View, Text } from 'react-native';
import MealsList from '../components/MealsList/MealsList';
import { MEALS } from '../data/dumm-data';
import { useAppSelector } from '../store/hooks/useStore';
import { getFavoritedMeals } from '../store/meals';

const MealFavoritesPage: React.FC = () => {
    const favoritedMealsIds = useAppSelector(getFavoritedMeals);

    const favoritedMeals = MEALS.filter((meal) =>
        favoritedMealsIds.includes(meal.id)
    );

    return favoritedMeals.length ? (
        <MealsList displayedMeals={favoritedMeals} />
    ) : (
        <View style={styles.rootContainer}>
            <Text style={styles.text}>
                You haven't favorited any meals yet!
            </Text>
        </View>
    );
};

export default MealFavoritesPage;

const styles = StyleSheet.create({
    rootContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    text: {
        fontSize: 18,
        fontWeight: 'bold',
        color: 'white',
    },
});

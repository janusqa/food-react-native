import { StyleSheet, View, FlatList } from 'react-native';
import { MEALS } from '../../data/dumm-data';
import MealItem from './MealItem';
import Meal from '../../data/models/meal';

type Props = {
    displayedMeals: Meal[];
    onPress?: (mealId: string) => void;
};

const MealsList = ({ displayedMeals, onPress }: Props) => {
    const renderMealItem = (mealId: string) => {
        const meal = MEALS.find((meal) => meal.id === mealId);

        const mealProps = {
            id: meal.id,
            title: meal.title,
            imageUrl: meal.imageUrl,
            duration: meal.duration,
            affordability: meal.affordability,
            complexity: meal.complexity,
            onPress: onPress,
        };
        return <MealItem {...mealProps} />;
    };

    return (
        <View style={styles.container}>
            <FlatList
                data={displayedMeals}
                renderItem={(meal) => renderMealItem(meal.item.id)}
                keyExtractor={(meal) => meal.id}
            />
        </View>
    );
};

export default MealsList;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});

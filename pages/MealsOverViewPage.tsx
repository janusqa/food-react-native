import { StyleSheet, View, FlatList } from 'react-native';
import { useLayoutEffect } from 'react';
import { MEALS, CATEGORIES } from '../data/dumm-data';
import { RootStackParamList } from '../App';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import MealItem from '../components/MealItem';

export type Props = NativeStackScreenProps<RootStackParamList, 'MealsOverview'>;

const MealsOverviewPage: React.FC<Props> = ({ navigation, route }) => {
    const categoryId = route.params.categoryId;

    const displayedMeals = MEALS.filter((meal) =>
        meal.categoryIds.includes(categoryId)
    );

    const pressHandler = (mealId: string) => {
        navigation.navigate('MealDetails', { mealId });
    };

    const renderMealItem = (mealId: string) => {
        const meal = MEALS.find((meal) => meal.id === mealId);

        const mealProps = {
            id: meal.id,
            title: meal.title,
            imageUrl: meal.imageUrl,
            duration: meal.duration,
            affordability: meal.affordability,
            complexity: meal.complexity,
            onPress: pressHandler,
        };
        return <MealItem {...mealProps} />;
    };

    // useLayoutEffect instead of useEffect because we need
    // the effect to happen before the screen is rendered
    // see webdevsimplified on youtube for some explanation
    useLayoutEffect(
        function () {
            const category = CATEGORIES.find(
                (category) => category.id === categoryId
            );

            // this is the alternative way to setting options for a route
            // instead of add them to options prop back in parent component
            navigation.setOptions({
                title: category.title,
            });
        },
        [categoryId]
    );

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

export default MealsOverviewPage;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
    },
});

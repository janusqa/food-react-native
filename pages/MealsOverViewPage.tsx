import { useLayoutEffect } from 'react';
import { MEALS, CATEGORIES } from '../data/dumm-data';
import { RootStackParamList } from '../App';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import MealsList from '../components/MealsList/MealsList';

export type Props = NativeStackScreenProps<RootStackParamList, 'MealsOverview'>;

const MealsOverviewPage: React.FC<Props> = ({ navigation, route }) => {
    const categoryId = route.params.categoryId;

    const displayedMeals = MEALS.filter((meal) =>
        meal.categoryIds.includes(categoryId)
    );

    const pressHandler = (mealId: string) => {
        navigation.navigate('MealDetails', { mealId });
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

    return <MealsList displayedMeals={displayedMeals} onPress={pressHandler} />;
};

export default MealsOverviewPage;

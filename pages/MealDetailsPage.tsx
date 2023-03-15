import { StyleSheet, View, Text, Image, ScrollView } from 'react-native';
import { useLayoutEffect, useMemo } from 'react';
import { RootStackParamList } from '../App';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import { MEALS } from '../data/dumm-data';
import MealDetailsSnippet from '../components/MealDetails';
import Subtitle from '../components/MealDetails/Subtitle';
import List from '../components/MealDetails/List';
import IconButton from '../components/IconButton';
import { useAppDispatch, useAppSelector } from '../store/hooks/useStore';
import { addFavorite, removeFavorite, getFavoritedMeals } from '../store/meals';

type Props = NativeStackScreenProps<RootStackParamList, 'MealDetails'>;

const MealDetails: React.FC<Props> = ({ navigation, route }) => {
    const meal = useMemo(
        () => MEALS.find((meal) => meal.id === route.params.mealId),
        [route.params.mealId]
    );

    const mealIsFavorited = useAppSelector(getFavoritedMeals).includes(meal.id);

    const dispatch = useAppDispatch();

    const changeFavoriteStatusHandler = () => {
        if (mealIsFavorited) dispatch(removeFavorite({ mealId: meal.id }));
        else dispatch(addFavorite({ mealId: meal.id }));
    };

    // useLayoutEffect instead of useEffect because we need
    // the effect to happen before the screen is rendered
    // see webdevsimplified on youtube for some explanation
    useLayoutEffect(
        function () {
            const meal = MEALS.find((meal) => meal.id === route.params.mealId);

            // this is the alternative way to setting options for a route
            // instead of add them to options prop back in parent component
            navigation.setOptions({
                title: meal.title,
                headerRight: () => (
                    <IconButton
                        icon={mealIsFavorited ? 'star' : 'star-outline'}
                        size={24}
                        color="white"
                        onPress={changeFavoriteStatusHandler}
                    />
                ),
            });
        },
        [route.params.mealId, mealIsFavorited]
    );

    return (
        <ScrollView style={styles.rootContainer}>
            <View>
                <Image style={styles.image} source={{ uri: meal.imageUrl }} />
                <Text style={styles.title}>{meal.title}</Text>
                <MealDetailsSnippet
                    duration={meal.duration}
                    complexity={meal.complexity}
                    affordability={meal.affordability}
                    textStyle={styles.detailText}
                />
                <View style={styles.listOuterContainer}>
                    <View style={styles.listInnerContainer}>
                        <Subtitle heading="Ingrediants" />
                        <List list={meal.ingredients} />
                        <Subtitle heading="Steps" />
                        <List list={meal.steps} />
                    </View>
                </View>
            </View>
        </ScrollView>
    );
};

export default MealDetails;

const styles = StyleSheet.create({
    rootContainer: {
        marginBottom: 32,
    },
    image: {
        width: '100%',
        height: 350,
    },
    title: {
        fontWeight: 'bold',
        fontSize: 24,
        margin: 8,
        textAlign: 'center',
        color: 'white',
    },
    detailText: {
        color: 'white',
    },
    listInnerContainer: {
        width: '80%',
    },
    listOuterContainer: {
        alignItems: 'center',
    },
});

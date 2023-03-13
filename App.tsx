import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, Button } from 'react-native';
import CategoriesPage from './pages/CategoriesPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MealsOverviewPage from './pages/MealsOverViewPage';
import MealDetailsPage from './pages/MealDetailsPage';

export type RootStackParamList = {
    MealsCategories: undefined;
    MealsOverview: { categoryId: string };
    MealDetails: { mealId: string };
};

const App: React.FC = () => {
    const Stack = createNativeStackNavigator<RootStackParamList>();

    return (
        <>
            <StatusBar style="light" />
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="MealsCategories"
                    screenOptions={{
                        headerStyle: { backgroundColor: '#351401' },
                        headerTintColor: 'white',
                        contentStyle: {
                            backgroundColor: '#3f2f25',
                        },
                    }}
                >
                    <Stack.Screen
                        name="MealsCategories"
                        component={CategoriesPage}
                        options={{
                            title: 'Meal Categories',
                        }}
                    />
                    <Stack.Screen
                        name="MealsOverview"
                        component={MealsOverviewPage}
                        //to load dynamic values into options below
                        // pass a function instead of an object.
                        // but instead comment out the below and
                        // let set these from witin the screen/page itself
                        //>>>
                        // options={({ navigation, route }) => {
                        //     const catId = route.params.categoryId;
                        //     const category = CATEGORIES.find(
                        //         (category) => category.id === catId
                        //     );
                        //     return { title: category.title };
                        // }}
                    />
                    <Stack.Screen
                        name="MealDetails"
                        component={MealDetailsPage}
                    />
                </Stack.Navigator>
            </NavigationContainer>
        </>
    );
};

export default App;

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        alignItems: 'center',
        justifyContent: 'center',
    },
});

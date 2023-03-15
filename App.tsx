import { StatusBar } from 'expo-status-bar';
import { StyleSheet } from 'react-native';
import { Provider } from 'react-redux';
import initilizeStore from './store/configureStore';
import CategoriesPage from './pages/CategoriesPage';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import MealsOverviewPage from './pages/MealsOverViewPage';
import MealDetailsPage from './pages/MealDetailsPage';
// we will nest some navigation
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigatorScreenParams } from '@react-navigation/native';
import MealFavoritesPage from './pages/MealFavoritesPage';
import { Ionicons } from '@expo/vector-icons';

export type RootStackParamList = {
    MealDrawer: NavigatorScreenParams<DrawerParamList>;
    MealsOverview: { categoryId: string };
    MealDetails: { mealId: string };
};

export type DrawerParamList = {
    MealsCategories: undefined;
    MealFavorites: undefined;
};

const Stack = createNativeStackNavigator<RootStackParamList>();
const Drawer = createDrawerNavigator<DrawerParamList>();
const store = initilizeStore();

const DrawerNavigator: React.FC = () => {
    return (
        <Drawer.Navigator
            initialRouteName="MealsCategories"
            screenOptions={{
                headerStyle: { backgroundColor: '#351401' },
                headerTintColor: 'white',
                sceneContainerStyle: {
                    // in Drawer navigator contentStyle is renamed scenceContainerStyle. Who knows why???
                    backgroundColor: '#3f2f25',
                },
                drawerContentStyle: { backgroundColor: '#351401' },
                drawerInactiveTintColor: 'white',
                drawerActiveTintColor: '#351401',
                drawerActiveBackgroundColor: '#e4baa1',
            }}
        >
            <Drawer.Screen
                name="MealsCategories"
                component={CategoriesPage}
                options={{
                    title: 'Categories',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="list" size={size} color={color} />
                    ),
                }}
            />
            <Drawer.Screen
                name="MealFavorites"
                component={MealFavoritesPage}
                options={{
                    title: 'Favorites',
                    drawerIcon: ({ color, size }) => (
                        <Ionicons name="star" size={size} color={color} />
                    ),
                }}
            />
        </Drawer.Navigator>
    );
};

const App: React.FC = () => {
    return (
        <Provider store={store}>
            <StatusBar style="light" />
            <NavigationContainer>
                <Stack.Navigator
                    initialRouteName="MealDrawer"
                    screenOptions={{
                        headerStyle: { backgroundColor: '#351401' },
                        headerTintColor: 'white',
                        contentStyle: {
                            backgroundColor: '#3f2f25',
                        },
                    }}
                >
                    <Stack.Screen
                        name="MealDrawer"
                        component={DrawerNavigator}
                        options={{
                            title: 'Meal Categories',
                            headerShown: false,
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
        </Provider>
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

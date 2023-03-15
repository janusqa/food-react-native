import { FlatList } from 'react-native';
import { CATEGORIES } from '../data/dumm-data';
import CategoryGridTile from '../components/CategoryGridTile';
import { RootStackParamList, DrawerParamList } from '../App';
import type { NativeStackScreenProps } from '@react-navigation/native-stack';
import type { DrawerScreenProps } from '@react-navigation/drawer';
import type { CompositeScreenProps } from '@react-navigation/native';

type Props = CompositeScreenProps<
    DrawerScreenProps<DrawerParamList, 'MealsCategories'>,
    NativeStackScreenProps<RootStackParamList>
>;

const CategoriesPage: React.FC<Props> = ({ navigation }) => {
    const pressHandler = (categoryId: string) => {
        navigation.navigate('MealsOverview', { categoryId });
    };

    const renderCategoryItem = (item: number) => {
        return (
            <CategoryGridTile
                title={CATEGORIES[item].title}
                color={CATEGORIES[item].color}
                id={CATEGORIES[item].id}
                onPress={pressHandler}
            />
        );
    };

    return (
        <FlatList
            data={CATEGORIES}
            renderItem={(category) => renderCategoryItem(category.index)}
            keyExtractor={(category) => category.id}
            numColumns={2}
        />
    );
};

export default CategoriesPage;

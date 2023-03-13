import { StyleSheet, View, Pressable } from 'react-native';
import { Ionicons } from '@expo/vector-icons';

type IonIconName = React.ComponentProps<typeof Ionicons>['name'];

type Props = {
    icon: IonIconName;
    size: number;
    color: string;
    onPress: () => void;
};

const IconButton: React.FC<Props> = ({ icon, size, color, onPress }) => {
    return (
        <Pressable
            onPress={onPress}
            style={({ pressed }) => (pressed ? styles.pressed : null)}
        >
            <Ionicons name={icon} size={size} color={color} />
        </Pressable>
    );
};

export default IconButton;

const styles = StyleSheet.create({
    pressed: {
        opacity: 0.7,
    },
});

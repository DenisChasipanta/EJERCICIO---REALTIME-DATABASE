import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Button, Divider, Text, TextInput } from 'react-native-paper';
import { styles } from '../../theme/styles';
import { useNavigation, useRoute } from '@react-navigation/native';
import { VideoGame } from './HomeScreen';
import { ref, remove, update } from 'firebase/database';
import { dbRealTime } from '../../config/firebaseConfig';

export const DetailVideoGameScreen = () => {
    const route = useRoute();
    const { videoGame } = route.params as { videoGame: VideoGame };
    const navigation = useNavigation();

    const [editFormVideoGame, setEditFormVideoGame] = useState<VideoGame>({
        id: '',
        title: '',
        genre: '',
        description: ''
    });

    useEffect(() => {
        setEditFormVideoGame(videoGame);
    }, [videoGame]);

    const handlerSetValue = (key: string, value: string) => {
        setEditFormVideoGame({ ...editFormVideoGame, [key]: value });
    };

    const handlerUpdateVideoGame = async () => {
        const dbRef = ref(dbRealTime, 'videoGames/' + editFormVideoGame.id);
        await update(dbRef, { description: editFormVideoGame.description });
        navigation.goBack();
    };

    const handlerDeleteVideoGame = async () => {
        const dbRef = ref(dbRealTime, 'videoGames/' + editFormVideoGame.id);
        await remove(dbRef);
        navigation.goBack();
    };

    return (
        <View style={styles.rootDetail}>
            <View>
                <Text variant='headlineSmall'>Título: {editFormVideoGame.title}</Text>
                <Divider />
            </View>
            <View>
                <Text variant='bodyLarge'>Género: {editFormVideoGame.genre}</Text>
                <Divider />
            </View>
            <View style={{ gap: 20 }}>
                <Text style={styles.textDetail}>Descripción</Text>
                <TextInput
                    value={editFormVideoGame.description}
                    multiline={true}
                    numberOfLines={5}
                    onChangeText={(value) => handlerSetValue('description', value)}
                />
            </View>
            <Button mode='contained' icon='gamepad-variant' onPress={handlerUpdateVideoGame}>Actualizar</Button>
            <Button mode='contained' icon='email-remove' onPress={handlerDeleteVideoGame}>Eliminar</Button>
        </View>
    );
}
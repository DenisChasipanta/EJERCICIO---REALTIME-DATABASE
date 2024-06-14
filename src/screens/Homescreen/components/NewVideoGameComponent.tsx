import React, { useState } from 'react';
import { Modal, Portal, Text, IconButton, Divider, TextInput, Button } from 'react-native-paper';
import { styles } from '../../../theme/styles';
import { View } from 'react-native';
import { push, ref, set } from 'firebase/database';
import { auth, dbRealTime } from '../../../config/firebaseConfig';


interface Props {
    showModalVideoGame: boolean;
    setShowModalVideoGame: Function;
}

interface FormVideoGame {
    title: string;
    genre: string;
    description: string;
}

export const NewVideoGameComponent = ({ showModalVideoGame, setShowModalVideoGame }: Props) => {
    const [formVideoGame, setFormVideoGame] = useState<FormVideoGame>({
        title: '',
        genre: '',
        description: ''
    });

    const handlerSetValues = (key: string, value: string) => {
        setFormVideoGame({ ...formVideoGame, [key]: value })
    }

    const handlerSaveVideoGame = async () => {
        if (!formVideoGame.title || !formVideoGame.genre || !formVideoGame.description) {
            return;
        }

        const dbRef = ref(dbRealTime, 'videoGames/' + auth.currentUser?.uid);
        const saveVideoGame = push(dbRef);

        try {
            await set(saveVideoGame, formVideoGame);
            setFormVideoGame({
                title: '',
                genre: '',
                description: ''
            })
        } catch (ex) {
            console.log(ex);
        }
        setShowModalVideoGame(false);
    }

    return (
        <Portal>
            <Modal visible={showModalVideoGame} contentContainerStyle={styles.modal}>
                <View style={styles.header}>
                    <Text variant='headlineMedium'>Mis Gustos</Text>
                    <View style={styles.iconEnd}>
                        <IconButton
                            icon='close-circle-outline'
                            size={28}
                            onPress={() => setShowModalVideoGame(false)}
                        />
                    </View>
                </View>
                <Divider />
                <TextInput
                    label='Título'
                    mode='outlined'
                    onChangeText={(value) => handlerSetValues('title', value)} />
                <TextInput
                    label='Género'
                    mode='outlined'
                    onChangeText={(value) => handlerSetValues('genre', value)} />
                <TextInput
                    label='Descripción'
                    mode='outlined'
                    multiline={true}
                    numberOfLines={7}
                    onChangeText={(value) => handlerSetValues('description', value)} />
                <Button mode='contained' onPress={handlerSaveVideoGame}>Guardar</Button>
            </Modal>
        </Portal>
    )
}

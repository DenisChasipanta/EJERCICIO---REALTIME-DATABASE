import React, { useEffect, useState } from 'react';
import { View } from 'react-native';
import { Avatar, Button, Divider, FAB, IconButton, Modal, Portal, Text, TextInput } from 'react-native-paper';
import firebase, { signOut, updateProfile } from 'firebase/auth';
import { FlatList } from 'react-native-gesture-handler';
import { VideoGameCardComponent } from './components/VideoGameCardComponent';
import { NewVideoGameComponent } from './components/NewVideoGameComponent';
import { onValue, ref } from 'firebase/database';
import { CommonActions, useNavigation } from '@react-navigation/native';
import { styles } from '../../theme/styles';
import { auth, dbRealTime } from '../../config/firebaseConfig';

interface FormUser {
    name: string;
}

export interface VideoGame {
    id: string;
    title: string;
    genre: string;
    description: string;
}

export const HomeScreen = () => {
    const [formUser, setFormUser] = useState<FormUser>({
        name: ''
    });

    const [userAuth, setUserAuth] = useState<firebase.User | null>(null);

    useEffect(() => {
        setUserAuth(auth.currentUser);
        setFormUser({ name: auth.currentUser?.displayName ?? "" })
        getAllVideoGames();
    }, [])

    const [showModal, setShowModal] = useState<boolean>(false);
    const [showModalVideoGame, setShowModalVideoGame] = useState<boolean>(false);
    const [videoGames, setVideoGames] = useState<VideoGame[]>([]);

    const navigation = useNavigation();

    const handlerSetValues = (key: string, value: string) => {
        setFormUser({ ...formUser, [key]: value })
    }

    const handlerUpdateUser = async () => {
        await updateProfile(userAuth!, {
            displayName: formUser.name
        })
        setShowModal(false);
    }

    const getAllVideoGames = () => {
        const dbRef = ref(dbRealTime, 'videoGames/' + auth.currentUser?.uid);
        onValue(dbRef, (snapshot) => {
            const data = snapshot.val();
            if (!data) return;
            const getKeys = Object.keys(data);
            const listVideoGames: VideoGame[] = [];
            getKeys.forEach((key) => {
                const value = { ...data[key], id: key };
                listVideoGames.push(value);
            })
            setVideoGames(listVideoGames);
        })
    }

    const handlerSignOut = async () => {
        await signOut(auth);
        navigation.dispatch(CommonActions.reset({ index: 0, routes: [{ name: 'Login' }] }));
        setShowModal(false);
    }

    return (
        <>
            <View style={styles.rootHome}>
                <View style={styles.header}>
                    <Avatar.Text size={50} label="VG" />
                    <View>
                        <Text variant='bodySmall'>Bienvenio</Text>
                        <Text variant='labelLarge'>{userAuth?.displayName}</Text>
                    </View>
                    <View style={styles.iconEnd}>
                        <IconButton
                            icon="account-edit"
                            mode="contained"
                            size={32}
                            onPress={() => setShowModal(true)}
                        />
                        
                    </View>
                </View>
                <View>
                    <FlatList
                        data={videoGames}
                        renderItem={({ item }) => <VideoGameCardComponent videoGame={item} />}
                        keyExtractor={item => item.id}
                    />
                </View>
            </View>
            <Portal>
                <Modal visible={showModal} contentContainerStyle={styles.modal}>
                    <View style={styles.header}>
                        <Text variant='headlineMedium'>Mi Perfil</Text>
                        <View style={styles.iconEnd}>
                            <IconButton
                                icon="close-circle-outline"
                                size={28}
                                onPress={() => setShowModal(false)}
                            />
                        </View>
                    </View>
                    <Divider />
                    <TextInput
                        mode='outlined'
                        label='Escribe tu nombre'
                        value={formUser.name}
                        onChangeText={(value) => handlerSetValues('name', value)}
                    />
                    <TextInput
                        mode='outlined'
                        label='Correo'
                        value={userAuth?.email!}
                        disabled />
                    <Button mode='contained' onPress={handlerUpdateUser}>Actualizar</Button>
                    <View style={styles.iconSignOut}>
                        <IconButton
                            icon="logout"
                            size={35}
                            mode='contained'
                            onPress={handlerSignOut}
                        />
                    </View>
                </Modal>
            </Portal>
            <FAB
                icon="plus"
                style={styles.fabMessage}
                onPress={() => setShowModalVideoGame(true)}
            />
            <NewVideoGameComponent showModalVideoGame={showModalVideoGame} setShowModalVideoGame={setShowModalVideoGame} />
        </>
    )
}

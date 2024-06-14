import React from 'react';
import { View } from 'react-native';
import { IconButton, Text } from 'react-native-paper';
import { styles } from '../../../theme/styles';
import { VideoGame } from '../HomeScreen';
import { CommonActions, useNavigation } from '@react-navigation/native';

interface Props {
    videoGame: VideoGame;
}

export const VideoGameCardComponent = ({ videoGame }: Props) => {
    const navigation = useNavigation();

    return (
        <View style={styles.rootMessage}>
            <View>
                <Text variant='labelLarge'>Título: {videoGame.title}</Text>
                <Text variant='bodyMedium'>Género: {videoGame.genre}</Text>
                <Text variant='bodyMedium'>Descripción: {videoGame.description}</Text>
            </View>
            <View style={styles.iconEnd}>
                <IconButton
                    icon="gamepad-variant"
                    size={25}
                    onPress={() => navigation.dispatch(CommonActions.navigate({ name: 'Detail', params: { videoGame } }))}
                />
            </View>
        </View>
    )
}

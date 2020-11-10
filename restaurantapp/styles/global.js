import { StyleSheet } from 'react-native';

const globalStyles = StyleSheet.create({
    contenedor: {
        flex: 1
    },
    contenido: {
        marginHorizontal: '2.5%',
        flex: 1
    },
    boton: {
        backgroundColor: '#ffda00'
    },
    botonTexto: {
        textTransform: 'uppercase',
        fontWeight: 'bold',
        color: '#000'
    }
});

export default globalStyles;
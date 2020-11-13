import React, { useContext, useEffect } from 'react';
import { Alert, StyleSheet } from 'react-native';
import {
    Container,
    Content,
    List,
    ListItem,
    Thumbnail,
    Text,
    Left,
    Body,
    Button,
    H1,
    Footer,
    FooterTab
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import PedidoContext from '../context/pedidos/pedidosContext';
import globalStyles from '../styles/global';
import firebase from '../firebase';

const ResumenPedido = () => {

    // redireccionar
    const navigation = useNavigation();

    // context de pedido
    const { pedido, total, mostrarResumen, eliminarProducto, pedidoRealizado } = useContext(PedidoContext);

    useEffect(() => {
        calcularTotal();
    }, [pedido]);

    const calcularTotal = () => {
        let nuevoTotal = 0;
        nuevoTotal = pedido.reduce((nuevoTotal, articulo) => nuevoTotal + articulo.total, 0);
        mostrarResumen(nuevoTotal);
    };

    // Redirecciona a Progreso pedido
    const progresoPedido = () => {
        Alert.alert(
            'Revisa tu pedido',
            'Una vez que realizas tu pedido, no podrás cambiarlo',
            [
                {
                    text: 'Confirmar',
                    onPress: async () => {
                        // Crear un objeto
                        const pedidoObj = {
                            tiempoEntrega: 0,
                            completado: false,
                            total: Number(total),
                            orden: pedido, // array
                            creado: Date.now()
                        };
                        try {
                            // Escribir el pedido en firebase
                            const pedido = await firebase.db.collection('ordenes').add(pedidoObj);
                            pedidoRealizado(pedido.id);
                            // Redireccionar
                            navigation.navigate('ProgresoPedido');
                        } catch (error) {
                            console.log(error);
                        }
                    }
                },
                {
                    text: 'Revisar',
                    style: 'cancel'
                }
            ]
        );
    };

    // Elimina un producto del arreglo de pedidos
    const confirmarEliminacion = (id) => {
        Alert.alert(
            '¿Deseas eliminar este artículo?',
            'Una vez eliminado no se puede recuperar',
            [
                {
                    text: 'Confirmar',
                    onPress: () => {
                        // Elimina del state
                        eliminarProducto(id);                        
                    }
                },
                {
                    text: 'Cancelar',
                    style: 'cancel'
                }
            ]
        );
    };

    return (
        <Container style={globalStyles.contenedor}>
            <Content style={globalStyles.contenido}>
                <H1 style={globalStyles.titulo}>Resumen Pedido</H1>
                {pedido.map((platillo, i) => {
                    const { cantidad, nombre, imagen, id, precio } = platillo;
                    return (
                        <List key={id+i}>
                            <ListItem thumbnail>
                                <Left>
                                    <Thumbnail large square source={{uri: imagen}} />
                                </Left>
                                <Body>
                                    <Text>{nombre}</Text>
                                    <Text>Cantidad: {cantidad}</Text>
                                    <Text>Precio: $ {precio}</Text>
                                    <Button
                                        onPress={() => confirmarEliminacion(id)}
                                        full
                                        danger
                                        style={{marginTop: 20}}
                                    >
                                        <Text style={[globalStyles.botonTexto, {color: '#fff'}]}>Eliminar</Text>
                                    </Button>
                                </Body>
                            </ListItem>
                        </List>
                    );
                })}
                <Text style={globalStyles.cantidad}>Total a Pagar: ${total}</Text>
                <Button                    
                    onPress={() => navigation.navigate('Menu')}
                    style={{marginTop: 30}}
                    full
                    dark
                >
                    <Text style={[globalStyles.botonTexto, {color: '#fff'}]}>Seguir Pidiendo</Text>
                </Button>
            </Content>
            <Footer>
                <FooterTab>
                    <Button                    
                        onPress={() => progresoPedido()}
                        style={globalStyles.boton}
                        full
                    >
                        <Text style={globalStyles.botonTexto}>Ordenar Pedido</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
};

export default ResumenPedido;
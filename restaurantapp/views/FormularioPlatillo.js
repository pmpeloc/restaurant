import React, { useState, useContext, useEffect } from 'react';
import { Alert } from 'react-native';
import {
    Container,
    Content,
    Form,
    Icon,
    Input,
    Grid,
    Col,
    Button,
    Text,
    Footer,
    FooterTab
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import PedidoContext from '../context/pedidos/pedidosContext';
import globalStyles from '../styles/global';

const FormularioPlatillo = () => {

    // state para cantidades
    const [cantidad, guardarCantidad] = useState(1);
    const [total, guardarTotal] = useState(0);
    
    // Pedido context
    const { platillo, guardarPedido } = useContext(PedidoContext);
    const { precio } = platillo;

    // Redireccionar
    const navigation = useNavigation();

    // En cuanto el componente carga, calcular la cantidad a pagar
    useEffect(() => {
        calcularTotal();
    }, [cantidad]);

    // Calcular el total del platillo por su cantidad
    const calcularTotal = () => {
        const totalPagar = precio * cantidad;
        guardarTotal(totalPagar);
    };

    // Decrementa en uno
    const decrementarUno = () => {
        if (cantidad > 1) {
            const nuevaCantidad = parseInt(cantidad) - 1;
            guardarCantidad(nuevaCantidad);
        }
    };

    // se incrementa en uno la cantidad
    const incrementarUno = () => {
        const nuevaCantidad = parseInt(cantidad) + 1;
        guardarCantidad(nuevaCantidad);
    };

    // Confirma si la orden es correcta
    const confirmarOrden = () => {
        Alert.alert(
            '¿Deseas confirmar tu pedido',
            'Un pedido confirmado ya no se podrá modificar',
            [
                {
                    text: 'Confirmar',
                    onPress: () => {
                        // Almacenar el pedido al pedido principal
                        const pedido = {
                            ...platillo,
                            cantidad,
                            total
                        };
                        guardarPedido(pedido);
                        // Navegar hacia el resumen
                        navigation.navigate('ResumenPedido');
                    }
                },
                {
                    text: 'Cancelar',
                    style: 'cancel'
                }
            ]
        )
    };

    return (
        <Container>
            <Content>
                <Form>
                    <Text style={globalStyles.titulo}>Cantidad</Text>
                    <Grid>
                        <Col>
                            <Button
                                props
                                dark
                                style={{height: 80, justifyContent: 'center', width: '100%'}}
                                onPress={() => decrementarUno()}
                            >
                                <Icon style={{fontSize: 40}} name="remove"/>
                            </Button>
                        </Col>
                        <Col>
                            <Input
                                style={{textAlign: 'center', fontSize: 20}}
                                value={cantidad.toString()}
                                keyboardType="numeric"
                                onChangeText={(cantidad) => {
                                    if (cantidad === '') {
                                        guardarCantidad(parseInt(0, 10));
                                    } else {
                                        guardarCantidad(parseInt(cantidad, 10));
                                    }
                                }}                              
                            />
                        </Col>
                        <Col>
                            <Button
                                props
                                dark
                                style={{height: 80, justifyContent: 'center', width: '100%'}}
                                onPress={() => incrementarUno()}
                            >
                                <Icon style={{fontSize: 40}} name="add"/>
                            </Button>                            
                        </Col>
                    </Grid>
                    <Text style={globalStyles.cantidad}>Subtotal: ${total}</Text>
                </Form>
            </Content>
            <Footer>
                <FooterTab>
                    <Button
                        style={globalStyles.boton} 
                        onPress={() => confirmarOrden()}                       
                    >
                        <Text style={globalStyles.botonTexto}>Agregar al Pedido</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
};
 
export default FormularioPlatillo;
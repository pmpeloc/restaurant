import React, { useContext } from 'react';
import { Button, Text } from 'native-base';
import globalStyles from '../../styles/global';
import { useNavigation } from '@react-navigation/native';
import PedidoContext from '../../context/pedidos/pedidosContext';

const BotonResumen = () => {

    const navigation = useNavigation();

    // Leer el objeto de pedido
    const { pedido } = useContext(PedidoContext);
    
    if (pedido.length === 0) return null;

    return (
        <Button 
            style={[globalStyles.boton, {marginRight: 5}]}
            onPress={() => navigation.navigate('ResumenPedido')}
        >
            <Text style={globalStyles.botonTexto}>Ir a Pedidos</Text>
        </Button>
    );
};
 
export default BotonResumen;
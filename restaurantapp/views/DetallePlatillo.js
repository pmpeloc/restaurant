import React, { useContext } from 'react';
import { Image } from 'react-native';
import {
    Container,
    Content,
    Footer,
    FooterTab,
    Button,
    Body,
    Text,
    H1,
    Card,
    CardItem
} from 'native-base';
import { useNavigation } from '@react-navigation/native';
import PedidoContext from '../context/pedidos/pedidosContext';
import globalStyles from '../styles/global';

const DetallePlatillo = () => {

    // Pedido context
    const { platillo } = useContext(PedidoContext);
    const { nombre, imagen, descripcion, precio } = platillo;

    // Redireccionar
    const navigation = useNavigation();

    return (
        <Container style={globalStyles.contenedor}>
            <Content style={globalStyles.contenido}>
                <H1 style={globalStyles.titulo}>{nombre}</H1>
                <Card>
                    <CardItem>
                        <Body>
                            <Image style={globalStyles.imagen} source={{uri: imagen}} />
                            <Text style={{marginTop: 20}}>{descripcion}</Text>
                            <Text style={globalStyles.cantidad}>Precio: $ {precio}</Text>
                        </Body>
                    </CardItem>
                </Card>
            </Content>
            <Footer>
                <FooterTab>
                    <Button
                        style={globalStyles.boton}
                        onPress={() => navigation.navigate('FormularioPlatillo')}
                    >
                        <Text style={globalStyles.botonTexto}>Ordenar Pedido</Text>
                    </Button>
                </FooterTab>
            </Footer>
        </Container>
    );
}
 
export default DetallePlatillo;
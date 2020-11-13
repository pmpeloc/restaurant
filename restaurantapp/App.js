import 'react-native-gesture-handler';
import React from 'react';

import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import NuevaOrden from './views/NuevaOrden';
import Menu from './views/Menu';
import DetallePlatillo from './views/DetallePlatillo';
import FormularioPlatillo from './views/FormularioPlatillo';
import ResumenPedido from './views/ResumenPedido';
import ProgresoPedido from './views/ProgresoPedido';

// Componentes
import BotonResumen from './components/ui/BotonResumen';

// Importar el state del context
import FirebaseState from './context/firebase/firebaseState';
import PedidoState from './context/pedidos/pedidosState';

const Stack = createStackNavigator();

const App = () => {
  return (
    <>
      <FirebaseState>
        <PedidoState>
          <NavigationContainer>
            <Stack.Navigator
              screenOptions={{
                headerStyle: {
                  backgroundColor: '#ffda00'
                },
                headerTitleStyle: {
                  fontWeight: 'bold'
                },
                headerTitleAlign: 'center',
                headerTintColor: '#000'
              }}
            >
              <Stack.Screen
                name="NuevaOrden"
                component={NuevaOrden}
                options={{
                  title: "Nueva Orden"
                }}
              />
              <Stack.Screen
                name="Menu"
                component={Menu}
                options={{
                  title: "Nuestro Menú",
                  headerRight: props => <BotonResumen />
                }}
              />
              <Stack.Screen
                name="DetallePlatillo"
                component={DetallePlatillo}
                options={{
                  title: "Detalle Platillo"
                }}
              />
              <Stack.Screen
                name="FormularioPlatillo"
                component={FormularioPlatillo}
                options={{
                  title: "Ordenar Pedido"
                }}
              />
              <Stack.Screen
                name="ResumenPedido"
                component={ResumenPedido}
                options={{
                  title: "Resumen Pedido"
                }}
              />
              <Stack.Screen
                name="ProgresoPedido"
                component={ProgresoPedido}
                options={{
                  title: "Progreso de Pedido"
                }}
              />
            </Stack.Navigator>
          </NavigationContainer> 
        </PedidoState>
      </FirebaseState>
    </>
  );
};

export default App;
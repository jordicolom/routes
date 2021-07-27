import React from 'react';
import { Text, Button } from 'react-native';
const PruebaState = (stateChanger, props) => {
    return (
        <>
            <Text>(UseState Nombre Portada) Hola tu nombre es {props.nombre}</Text>
            <Button title="Cambiar el Nombre" onClick={() => { stateChanger("JORDI COLOM") }}></Button>
        </>
    );
}

export default PruebaState;
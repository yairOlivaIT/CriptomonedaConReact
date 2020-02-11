import React , { Fragment, useState } from 'react';
import styled from '@emotion/styled';


const Label = styled.label`
    font-family: 'Bebas Neue',cursive;
    color: #FFFFFF;
    text-transform: uppercase;
    font-weight: bold;
    font-size: 2.4rem;
    margin-top:2rem;
    display:block;
`;

const Select = styled.select`
    width: 100%;
    display: block;
    padding: 1rem;
    --webkit-appearance: none;
    border-radius: 10px;
    border: none;
    font-size:1.1rem;
`;

//Hooks es una funcion unicamente
//Lo que este antes del seleccionar es el state y otras operaciones que podemos hacer
const useCriptomoneda = (label,stateInicial,opciones) => {
    //State de nuestro custom hook
    const [ state , actualizarState ] = useState(stateInicial);
    //lo que este dentro del seleccionar es lo que se va a mostrar en pantalla
    const SelectCriptomoneda = () => (
        <Fragment>
            {/* este label hace referencia al 'elige tu moneda' del useMoneda que declaramos en el formulario */}
            <Label>{label}</Label>
            <Select
                // para que cambie el valor hay que pasarle el value state
                onChange ={e => actualizarState(e.target.value)}
                value = {state}
            >
                <option value="">-- Seleccione --</option>
                {opciones.map(opcion => (
                <option key={opcion.CoinInfo.Id} value={opcion.CoinInfo.Name}>{opcion.CoinInfo.FullName}</option>
                ))}
            </Select>
        </Fragment>
    );

    //Retornar state , interfaz y  funcion que modifica el state
    return [state,SelectCriptomoneda,actualizarState];
    //a la hora de utilizar el hook el orden que lo retornas es importante

}

export default useCriptomoneda;
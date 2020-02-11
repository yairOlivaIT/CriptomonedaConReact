import React , {useEffect , useState } from 'react';
import styled from '@emotion/styled';
import Error from './Error';

import useMoneda from '../hooks/useMoneda';
import useCriptomoneda from '../hooks/useCriptomoneda';
import axios from 'axios';
import PropTypes from 'prop-types';

const Boton = styled.input`
    margin-top:20px;
    font-weight: bold;
    font-size: 20px;
    padding: 10px;
    background-color: #66A2FE;
    border: none;
    width: 100%;
    border-radius: 10px;
    color: #fff;
    transition: background-color .3s ease;

    &:hover{
        background-color: #326AC3;
        cursor: pointer;
    }
`;

const Formulario = ({guardarMoneda,guardarCriptomoneda}) => {
    
    //state del listado de criptomonedas
    const [ listaCripto , guardarCriptomonedas ] = useState([]);
    const [ error , guardarError ] = useState(false);
    const MONEDAS = [
        { codigo : 'USD' , nombre:  'Dolar de Estados Unidos' },
        { codigo : 'ARS' , nombre:  'Peso Argentino' },
        { codigo : 'EUR' , nombre:  'Euro' },
        { codigo : 'GBP' , nombre:  'Libra Esterlina' },
        { codigo : 'MXN' , nombre:  'Peso Mexicano' },

    ]

    //utilizar useMoneda
    //el state que retorna es la moneda que el usuario elija
    const [ moneda , SelectMonedas ] = useMoneda('Elige tu Moneda','' ,MONEDAS);

    // utilizar criptomoneda
    const [ criptomoneda , SelectCriptomoneda ] = useCriptomoneda('Elige tu Criptomoneda','' ,listaCripto); //SelectCriptomoneda es como se llama el componente


    // Ejecutar  llamado a la API
    useEffect(() => {
        const consultarApi = async () => {
            const url = 'https://min-api.cryptocompare.com/data/top/mktcapfull?limit=10&tsym=USD';

            const resultado = await axios.get(url);
            
            guardarCriptomonedas(resultado.data.Data);
        }
        consultarApi();
    },[]);

    // cuando el usuario hace submit
    const cotizarMoneda = e => {
        e.preventDefault();

        //validar si ambos campos estan llenos

        if(moneda.trim() === '' || criptomoneda.trim() === ''){
            guardarError(true);
            return;
        }

        //pasar los Datos al componente principal
        guardarError(false);
        guardarMoneda(moneda);
        guardarCriptomoneda(criptomoneda);

    }

    return ( 
        <form
            onSubmit = {cotizarMoneda}
        >
        { error ? <Error mensaje= ' Todos los campos son obligatorios ' /> : null}    
            <SelectMonedas/>
            <SelectCriptomoneda/>
            <Boton 
                type="submit"
                value="Calcular"
            />
        </form>
    );
}
 
Formulario.propTypes = {
    guardarMoneda : PropTypes.func.isRequired,
    guardarCriptomoneda : PropTypes.func.isRequired
}
export default Formulario;
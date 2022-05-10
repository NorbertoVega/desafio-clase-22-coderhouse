import { normalize, schema, denormalize } from "normalizr";
import util from 'util';

const originalData = {
    id: "999",
    messages: [
        {
            id: "123",
            author: {
                id: 'norberto.a.vega@gmail.com',
                nombre: 'Norberto',
                apellido: 'Vega',
                edad: 33,
                alias: 'norber',
                avatar: 'https://loremflickr.com/1234/2345/computer?86969'
            },
            text: 'hola!'
        },
        {
            id: "456",
            author: {
                id: 'juan@gmail.com',
                nombre: 'Juan',
                apellido: 'Díaz',
                edad: 26,
                alias: 'juan',
                avatar: 'https://loremflickr.com/1234/2345/computer?26240'
            },
            text: '¡Hola! ¿Que tal?'
        },
        {
            id: "457",
            author: {
                id: 'norberto.a.vega@gmail.com',
                nombre: 'Norberto',
                apellido: 'Vega',
                edad: 33,
                alias: 'norber',
                avatar: 'https://loremflickr.com/1234/2345/computer?86969'
            },
            text: 'Todo bien. Vos?'
        }
    ]
}

const author = new schema.Entity('authors');
const messages = new schema.Entity('messages', {messages: [author]});

const dataNormalizada = normalize(originalData, messages);

function printData(data) {
    console.log(util.inspect(data, false, 12, true));
}

console.log('dataNormalizada:');
printData(dataNormalizada);

const dataOriginal = denormalize(dataNormalizada.result, messages, dataNormalizada.entities);

console.log('dataOriginal:');
printData(dataOriginal);

console.log('objeto original:', JSON.stringify(originalData).length);
console.log('objeto normalizado:', JSON.stringify(dataNormalizada).length);
console.log('objeto desnormalizado:', JSON.stringify(dataOriginal).length);

function calcularPorcentajeNormalizacion(originalLength, normalizedLenght) {
    const diff = Math.abs(originalLength - normalizedLenght);
    const porcentaje = ((diff * 100) / originalLength).toFixed(2);;
    
    if (originalLength < normalizedLenght)
        return `+${porcentaje}%`;
    else
        return `-${porcentaje}%`;
}

console.log('Procentaje de normalización: ', calcularPorcentajeNormalizacion(JSON.stringify(originalData).length, JSON.stringify(dataNormalizada).length));

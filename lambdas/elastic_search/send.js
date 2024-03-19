const AWS = require('aws-sdk');
const elasticsearch = require('elasticsearch');

// Configura el cliente de Elasticsearch
const esClient = new elasticsearch.Client({
    host: 'https://search-mycluster-mlruqvw7tcgrul77cgyz7r2feu.aos.us-east-1.on.aws',
    log: 'error',
    httpAuth: 'admin:Mycluster123-',
    protocol: 'https',
});

exports.handler = async (event, context) => {
    // Procesa los datos y envíalos a Elasticsearch
    try {
        const requestBody = JSON.parse(event.body); // Parsea el cuerpo de la solicitud HTTP para obtener los datos
        
        // Verifica si el requestBody es un solo JSON o una matriz de JSON
        const jsonData = Array.isArray(requestBody) ? requestBody : [requestBody];

        // Realiza una solicitud PUT a Elasticsearch para indexar documentos en el índice "usuarios"
        const promises = jsonData.map(async (data) => {
            const response = await esClient.index({
                index: 'usuarios',
                type: '_doc',
                body: data // Los datos a ser indexados
            });
            return response;
        });

        // Espera a que todas las promesas se resuelvan
        const responses = await Promise.all(promises);

        return {
            statusCode: 200,
            body: JSON.stringify(responses)
        };
    } catch (error) {
        console.error('Error al enviar datos a Elasticsearch:', error);
        return {
            statusCode: 500,
            body: 'Error al enviar datos a Elasticsearch'
        };
    }
};

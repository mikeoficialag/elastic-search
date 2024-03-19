const elasticsearch = require('elasticsearch');

// Configura el cliente de Elasticsearch
const esClient = new elasticsearch.Client({
    host: 'https://search-mycluster-mlruqvw7tcgrul77cgyz7r2feu.aos.us-east-1.on.aws',
    log: 'error',
    httpAuth: 'admin:Mycluster123-',
    protocol: 'https',
});

exports.handler = async (event, context) => {
    try {
        // Realiza una solicitud de búsqueda para obtener todos los datos en el índice "usuarios"
        const { body } = await esClient.search({
            index: 'usuarios',
            body: {
                query: {
                    match_all: {} // Obtener todos los documentos
                }
            }
        });

        // Retorna los resultados obtenidos de Elasticsearch
        return {
            statusCode: 200,
            body: JSON.stringify(body.hits.hits.map(hit => hit._source))
        };
    } catch (error) {
        console.error('Error al obtener datos de Elasticsearch:', error);
        return {
            statusCode: 500,
            body: 'Error al obtener datos de Elasticsearch'
        };
    }
};

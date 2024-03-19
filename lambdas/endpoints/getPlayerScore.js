const Responses = require('../common/API_Responses');
const Dynamo = require('../common/Dynamo');

const tableName = process.env.tableName;

exports.handler = async (event) => {
    console.log('event', event);

    if (!event.pathParameters || !event.pathParameters.ID) {
        return Responses._400({ message: 'Missing the ID from the path' });
    }

    const ID = event.pathParameters.ID;

    try {
        const item = await Dynamo.get(ID, tableName); // Aquí se pasa tableName como segundo argumento

        if (!item) {
            return Responses._400({ message: 'Usuario no encontrado' });
        }

        return Responses._200(item);
    } catch (error) {
        console.log("Error in Dynamo Get", error);
        return Responses._500({ message: 'Error retrieving user data' });
    }
};

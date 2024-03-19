const aws = require('aws-sdk');

const documentClient = new aws.DynamoDB.DocumentClient();

const Dynamo = {
    async get(ID, tableName) {
        const params = {
            TableName: tableName,
            Key: {
                ID
            }
        };

        try {
            const data = await documentClient.get(params).promise();

            if (!data || !data.Item) {
                throw Error(`There was an error fetching the data for ID of ${ID} from ${tableName}`);
            }

            console.log(data);
            return data.Item;
        } catch (error) {
            console.error('Error fetching data:', error);
            throw error;
        }
    },

    async write(data, tableName){
        if(!data.ID){
            throw Error('No ID on the data');
        }

        const params = {
            TableName: tableName,
            Item: data
        };

        const response = await documentClient.put(params).promise();
      if (!response){
        throw Error('There was an error inserting the ID '+data.ID+' into the table '+tableName);
      }
      return data;
    }
};

module.exports = Dynamo;

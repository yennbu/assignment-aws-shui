import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    const { userId } = event.pathParameters;

    try {
    const result = await ddbDocClient.send(
        new QueryCommand({
                TableName: process.env.NOTES_TABLE,
                KeyConditionExpression: "PK = :pk AND SK = :sk",
                ExpressionAttributeValues: {
                    ":pk": `USER#${userId}`,
                    ":sk": "PROFILE",
                },
            })
        );
        return {
            statusCode: 200,
            body: JSON.stringify(result.Items || []),
        };

    } catch (err) {
        console.error(err);
        return { statusCode: 500, body: "Failed to get notes for user" };
    }
};
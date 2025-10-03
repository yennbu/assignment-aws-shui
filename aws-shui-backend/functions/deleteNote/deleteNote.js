import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, DeleteCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    const { userId, noteId } = event.pathParameters;

    try {
        const deletedResult = await ddbDocClient.send(
            new DeleteCommand({
                TableName: process.env.NOTES_TABLE,
                Key: {
                    PK: `USER#${userId}`,
                    SK: `NOTE#${noteId}`
                },
                ReturnValues: "ALL_OLD",
            })
        );
        return {
            statusCode: 200,
            body: JSON.stringify({
                message: "Note deleted successfully",
                deletedNote: deletedResult.Attributes,
            }),
        };
    } catch (err) {
        console.error(err);
        return { statusCode: 500, body: "Failed to delete note" };
    };
};
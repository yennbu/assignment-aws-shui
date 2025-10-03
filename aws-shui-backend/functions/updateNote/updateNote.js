import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, UpdateCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    const { userId, noteId } = event.pathParameters;
    const { title, content } = JSON.parse(event.body);

    try {
        const result = await ddbDocClient.send(
            new UpdateCommand({
                TableName: process.env.NOTES_TABLE,
                Key: {
                    PK: `USER#${userId}`,
                    SK: `NOTE#${noteId}`
                },
                UpdateExpression: "set title = :title, content = :content",
                ExpressionAttributeValues: {
                    ":title": title,
                    ":content": content,
                },
                ConditionExpression: "attribute_exists(noteId)",
                ReturnValues: "ALL_NEW",
            })
        );

        return {
            statusCode: 200,
            body: JSON.stringify(result.Attributes),
        };
    } catch (err) {
        console.error(err);
        return { statusCode: 500, body: "Failed to update note" };
    };
};
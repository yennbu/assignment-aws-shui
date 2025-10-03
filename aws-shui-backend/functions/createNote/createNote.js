import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, GetCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    const { userId } = event.pathParameters;
    const { title, content } = JSON.parse(event.body);

    if (!userId) {
        return {
            statusCode: 400,
            body: "userId is required",
        };
    };

    if (!title || !content) {
        return {
            statusCode: 400,
            body: "Title and content are required",
        };
    };

    let userName = "Okänt namn";
    try {
        const userResult = await ddbDocClient.send(
            new GetCommand({
                TableName: process.env.NOTES_TABLE,
                Key: {
                    PK: `USER#${userId}`,
                    SK: "PROFILE" // så som ditt exempel ser ut
                }
            })
        );

        if (userResult.Item && userResult.Item.username) {
            userName = userResult.Item.username;
        }
    } catch (err) {
        console.error("Failed to get user profile:", err);
    }

    const noteId = uuidv4().substring(0, 8)

    const newNote = {
        PK: `USER#${userId}`,
        SK: `NOTE#${noteId}`,
        noteId,
        title,
        content,
        userName,
        createdAt: new Date().toISOString(),
    };

    try {
        await ddbDocClient.send(
            new PutCommand({
                TableName: process.env.NOTES_TABLE,
                Item: newNote,
                ConditionExpression: "attribute_not_exists(noteId)",
            })
        );

        return {
            statusCode: 201,
            body: JSON.stringify(newNote),
        };
    } catch (err) {
        console.error(err);
        return { statusCode: 500, body: "Failed to create note" };
    };
};
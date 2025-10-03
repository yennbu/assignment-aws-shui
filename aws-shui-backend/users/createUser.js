import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, PutCommand, ScanCommand } from "@aws-sdk/lib-dynamodb";
import { v4 as uuidv4 } from "uuid";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    const { username, password } = JSON.parse(event.body);

    if (!username || !password) {
        return {
            statusCode: 400,
            body: "Username and password are required",
        };
    };

    const existing = await ddbDocClient.send(
        new ScanCommand({
            TableName: process.env.NOTES_TABLE,
            FilterExpression: "#username = :username",
            ExpressionAttributeNames: { "#username": "username" },
            ExpressionAttributeValues: { ":username": username },
        })
    );

    if (existing.Items.length > 0) {
        return { statusCode: 400, body: "Username already exists" };
    }

    const userId = uuidv4().substring(0, 4);

    const newUser = {
        PK: `USER#${userId}`,
        SK: `PROFILE`,
        userId,
        username,
        password,
    };

    try {
        await ddbDocClient.send(
            new PutCommand({
                TableName: process.env.NOTES_TABLE,
                Item: newUser,
                ConditionExpression: "attribute_not_exists(username)",
            })
        );
        return {
            statusCode: 201,
            body: JSON.stringify(newUser),
        };
    } catch (err) {
        console.error(err);
        return { statusCode: 500, body: "Failed to create user" };
    };

};

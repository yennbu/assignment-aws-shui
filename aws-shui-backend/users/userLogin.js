import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    const { username, password } = JSON.parse(event.body);

    if (!username || !password) {
        return {
            statusCode: 400,
            body: "Username and password are required",
        };
    }

    try {
        const result = await ddbDocClient.send(
            new ScanCommand({
                TableName: process.env.NOTES_TABLE,
                FilterExpression: "#sk = :profile AND #username = :username",
                ExpressionAttributeNames: {
                    "#sk": "SK",
                    "#username": "username",
                },
                ExpressionAttributeValues: {
                    ":profile": "PROFILE",
                    ":username": username,
                },
            })
        );

        if (!result.Items || result.Items.length === 0) {
            return { statusCode: 401, body: "User not found" };
        }

        const user = result.Items[0];

        if (user.password !== password) {
            return { statusCode: 401, body: "Invalid password" };
        }

        return {
            statusCode: 200,
            body: JSON.stringify({ message: "Login successful", user }),
        };
    } catch (err) {
        console.error(err);
        return { statusCode: 500, body: "Failed to login" };
    }
};

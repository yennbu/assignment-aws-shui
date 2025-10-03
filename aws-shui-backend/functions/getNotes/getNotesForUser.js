import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, QueryCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {
    // Hantera preflight OPTIONS-request
    if (event.requestContext.http?.method === "OPTIONS") {
        return {
            statusCode: 200,
            headers: {
                "Access-Control-Allow-Origin": "*",
                "Access-Control-Allow-Headers": "Content-Type",
                "Access-Control-Allow-Methods": "OPTIONS,GET",
            },
            body: "",
        };
    }

    const { userId } = event.pathParameters;

    if (!userId) {
        return {
            statusCode: 400,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ error: "Missing userId parameter" }),
        };
    }

    try {
        const result = await ddbDocClient.send(
            new QueryCommand({
                TableName: process.env.NOTES_TABLE,
                KeyConditionExpression: "PK = :pk AND begins_with(SK, :sk)",
                ExpressionAttributeValues: {
                    ":pk": `USER#${userId}`,
                    ":sk": "NOTE#",
                },
            })
        );

        return {
            statusCode: 200,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify(result.Items || []),
        };
    } catch (err) {
        console.error("Error fetching notes for user:", err);
        return {
            statusCode: 500,
            headers: { "Access-Control-Allow-Origin": "*" },
            body: JSON.stringify({ error: "Failed to get notes for user" }),
        };
    }
};

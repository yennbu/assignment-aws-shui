import { DynamoDBClient } from "@aws-sdk/client-dynamodb";
import { DynamoDBDocumentClient, ScanCommand } from "@aws-sdk/lib-dynamodb";

const client = new DynamoDBClient({});
const ddbDocClient = DynamoDBDocumentClient.from(client);

export const handler = async (event) => {

  try {
    const result = await ddbDocClient.send(
      new ScanCommand({
        TableName: process.env.NOTES_TABLE,
        FilterExpression: "begins_with(SK, :sk)",
        ExpressionAttributeValues: { ":sk": "NOTE#" },
      })
    );

    const notes = result.Items.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

    return {
      statusCode: 200,
      body: JSON.stringify(notes || []),
    };
  } catch (err) {
    console.error(err);
    return { statusCode: 500, body: "Failed to get notes" };
  }


};

module.exports = {
    // method of operation
    get: {
      tags: ["Posts CRUD operations"], // operation's tag.
      description: "Get Posts", // operation's desc.
      operationId: "getPosts", // unique operation id.
      parameters: [], // expected params.
      // expected responses
      responses: {
        // response code
        200: {
          description: "Posts were obtained", // response desc.
          content: {
            // content-type
            "application/json": {
              schema: {
                $ref: "#/components/schemas/Post", // Todo model
              },
            },
          },
        },
      },
    },
  };
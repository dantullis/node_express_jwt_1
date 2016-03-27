# NodeExpressJwt_1

### REQUIREMENTS:
You will need to install the following tools:

- Node.js - (https://nodejs.org/en/)
- MongoDB - (https://www.mongodb.org/downloads#production)
- PostMan - (http://www.getpostman.com/)

### SETUP / INSTALL:
- Follow instructions to install Node.js, pay attention to permissions
- Follow instructions to install MongoDB, pay attention to permissions
- Follow instructions to install PostMan

To install project dependencies open a console / terminal and run the following:
```
npm install
```

### START / RUN PROJECT:
Start the MongoDB database by opening a new console / terminal tab and run:
```
mongod
```

Start the server by opening a new console / terminal tab and run:
```
node server.js
```

### USE APP (Steps):
1: In a web browser navigate to: (http://localhost:3000) 
```
Should receive: Hello! This is a base non-secure non-API route
```
2: In a web browser navigate to: (http://localhost:3000/usersetup) 
```
Should receive: {"success":true}
```
3: Now use PostMan to authenticate by doing the following:

	A. Change HTTP request from GET to POST
	B. In the BODY choose x-www-form-urlencoded radio button
	C. Enter a userName key and value <userName><Test User>
	D. Enter a userPassword key and value <userPassword><testPassword> 

4: Copy the token for use in Step 5 below.

5: In a web browser navigate to:
```
http://localhost:3000/api/users?token=<token from Step 4>
```		

Example:
```
http://localhost:3000/api/users?token=eyJ0eXAiOiJKV1QiLCJhbGciOiJIUzI1NiJ9.eyIkX18iOnsic3RyaWN0TW9kZSI6dHJ1ZSwiZ2V0dGVycyI6e30sIndhc1BvcHVsYXRlZCI6ZmFsc2UsImFjdGl2ZVBhdGhzIjp7InBhdGhzIjp7ImlzQWRtaW4iOiJpbml0IiwiX192IjoiaW5pdCIsInVzZXJQYXNzd29yZCI6ImluaXQiLCJ1c2VyTmFtZSI6ImluaXQiLCJfaWQiOiJpbml0In0sInN0YXRlcyI6eyJpZ25vcmUiOnt9LCJkZWZhdWx0Ijp7fSwiaW5pdCI6eyJfX3YiOnRydWUsImlzQWRtaW4iOnRydWUsInVzZXJQYXNzd29yZCI6dHJ1ZSwidXNlck5hbWUiOnRydWUsIl9pZCI6dHJ1ZX0sIm1vZGlmeSI6e30sInJlcXVpcmUiOnt9fSwic3RhdGVOYW1lcyI6WyJyZXF1aXJlIiwibW9kaWZ5IiwiaW5pdCIsImRlZmF1bHQiLCJpZ25vcmUiXX0sImVtaXR0ZXIiOnsiZG9tYWluIjpudWxsLCJfZXZlbnRzIjp7fSwiX2V2ZW50c0NvdW50IjowLCJfbWF4TGlzdGVuZXJzIjowfX0sImlzTmV3IjpmYWxzZSwiX2RvYyI6eyJpc0FkbWluIjp0cnVlLCJfX3YiOjAsInVzZXJQYXNzd29yZCI6InRlc3RQYXNzd29yZCIsInVzZXJOYW1lIjoiVGVzdCBVc2VyIiwiX2lkIjoiNTZlY2NkMWY4YTgxNjVlMzAyMWE4OGYxIn0sIl9wcmVzIjp7IiRfX29yaWdpbmFsX3NhdmUiOltudWxsLG51bGxdfSwiX3Bvc3RzIjp7IiRfX29yaWdpbmFsX3NhdmUiOltdfSwiaWF0IjoxNDU4MzU5NTk1LCJleHAiOjE0NTg0NDU5OTV9.Ah3Cy6WVMqUfWmZdDWsBusWG0PHAF5Qgq_g6EZX192w
```

Should receive:
``` 
..*[{"_id":"56eccd1f8a8165e3021a88f1","userName":"Test User","userPassword":"testPassword","__v":0,"isAdmin":true}]
```

### NEXT STEPS:
Navigate to https://github.com/dantullis/node_express_jwt_2 for the next steps building on top of this project.

### CREDITS: 
These projects will build on parts of the fine work found in the following places:

(https://scotch.io/tutorials/authenticate-a-node-js-api-with-json-web-tokens)

(http://sahatyalkabov.com/create-a-character-voting-app-using-react-nodejs-mongodb-and-socketio/)

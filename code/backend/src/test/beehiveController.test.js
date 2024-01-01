import supertest from "supertest";
import { createServer } from "../utils/server.js";
import mongoose from "mongoose";
import { mongoURL } from "../config/dbconfig.js";
import { User } from "../models/userModel.js";
import { Beehive } from "../models/beehiveModel.js";
import { MongoMemoryServer } from "mongodb-memory-server";
import dotenv from "dotenv/config.js";
import jwt from "jsonwebtoken";

const app = createServer();
beforeAll(async () => {
  // Create a in memory server
  const mongoServer = await MongoMemoryServer.create();
  // Get the connection string
  const mongoUri = mongoServer.getUri();
  // Connect to the in memory server
  await mongoose.connect(mongoUri);
});

afterAll(async () => {
  await mongoose.disconnect();
});

var userID = 1;
var accessToken = "";

//BEEHIVE Schema
// const beehiveSchema = new Schema(
//     {
//       user_id: {
//         type: mongoose.Schema.Types.ObjectId,
//         required: true,
//         ref: "User",
//       },
//       name: {
//         type: String,
//         required: [true, "Please add the beehive name"],
//       },
//       CO2: {
//         type: String,
//         required: [true, "Please add the CO2 level"],
//       },
//       Temperature: {
//         type: String,
//         required: [true, "Please add the Temperature"],
//       },
//       Humidity: {
//         type: String,
//         required: [true, "Please add the Humidity"],
//       },
//       Weight: {
//         type: String,
//         required: [true, "Please add the weight"],
//       },
//     },
//     {
//       timestamps: true,
//     }
//   );
//TEST FLOW
// 1. Should try to create a beehive without a token
// 2. Should try to get all beehives without a token
// 3. Should try to get a beehive without a token
// 4. Should try to update a beehive without a token
// 5. Should try to delete a beehive without a token
// 6. Should try to create a beehive with a token
// 7. Should try to get all beehives with a token
// 8. Should try to get a beehive with a token
// 9. Should try to update a beehive with a token
// 10. Should try to delete a beehive with a token

describe("Beehive API", () => {
    // it("should try to create a beehive without a token", async () => {
    //     const beehive = {
    //         name: "Test Beehive",
    //         CO2: "400 ppm",
    //         Temperature: "35°C",
    //         Humidity: "60%",
    //         Weight: "15kg",
    //         user_id: userID, // Assuming userID is a valid ObjectId
    //     };
    //     const res = await supertest(app).post("/api/beehive").send(beehive);
    //     expect(res.statusCode).toEqual(401);
    //     expect(res.body).toHaveProperty("message");
    //     expect(res.body.message).toBe("No token, authorization denied");
    // });
    
    // it("should try to get all beehives without a token", async () => {
    //     const res = await supertest(app).get("/api/beehive");
    //     //console.log(res.body);
    //     expect(res.statusCode).toEqual(401);
    //     expect(res.body).toHaveProperty("message");
    //     expect(res.body.message).toBe("No token, authorization denied");
    // }
    // );
    // it("should try to get a beehive without a token", async () => {
    //     const res = await supertest(app).get("/api/beehive/1");
    //     //console.log(res.body);
    //     expect(res.statusCode).toEqual(401);
    //     expect(res.body).toHaveProperty("message");
    //     expect(res.body.message).toBe("No token, authorization denied");
    // }
    // );
    // it("should try to update a beehive without a token", async () => {
    //     const beehive = {
    //         name: "Test Beehive Updated",
    //         CO2: "450 ppm",
    //         Temperature: "30°C",
    //         Humidity: "65%",
    //         Weight: "20kg",
    //         user_id: userID,
    //     };
    //     const res = await supertest(app).put("/api/beehive/1").send(beehive);
    //     expect(res.statusCode).toEqual(401);
    //     expect(res.body).toHaveProperty("message");
    //     expect(res.body.message).toBe("No token, authorization denied");
    // });
    
    // it("should try to delete a beehive without a token", async () => {
    //     const res = await supertest(app).delete("/api/beehive/1");
    //     //console.log(res.body);
    //     expect(res.statusCode).toEqual(401);
    //     expect(res.body).toHaveProperty("message");
    //     expect(res.body.message).toBe("No token, authorization denied");
    // }
    // );
    it("should try to create a beehive with a token", async () => {
        //Create a user
        const user = {
            username: "test user",
            email: "testuser@gmail.com",
            password: "testpassword",
        };
        const res = await supertest(app).post("/api/user/register").send(user);
        //console.log(res.body);
        userID = res.body._id;
        expect(res.statusCode).toEqual(201);
        expect(res.body).toHaveProperty("_id");
        //expect(res.body.username).toBe(user.username);
        expect(res.body.email).toBe(user.email);
        //Login and get the token
        
        const res2 = await supertest(app).post("/api/user/login").send(user);
        //console.log(res2.body);
        expect(res2.statusCode).toEqual(200);
        expect(res2.body).toHaveProperty("accessToken");
        accessToken = res2.body.accessToken;
        
        //Create a beehive with the token(Bearer)

        const beehive = {
            name: "Test Beehive",
            CO2: "400 ppm",
            Temperature: "35°C",
            Humidity: "60%",
            Weight: "15kg",
            user_id: userID, // Assuming userID is a valid ObjectId
        };

        const res3 = await supertest(app).post("/api/beehive").set("Authorization", "Bearer " + accessToken).send(beehive);
        //console.log(res3.body);
        expect(res3.statusCode).toEqual(201);
        expect(res3.body).toHaveProperty("_id");
        expect(res3.body.name).toBe(beehive.name);
        expect(res3.body.CO2).toBe(beehive.CO2);
        expect(res3.body.Temperature).toBe(beehive.Temperature);
        expect(res3.body.Humidity).toBe(beehive.Humidity);
        expect(res3.body.Weight).toBe(beehive.Weight);
        expect(res3.body.user_id).toBe(beehive.user_id);

    }
    );
});



        



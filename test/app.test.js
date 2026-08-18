const { expect } = require("chai");
const request = require("supertest");

const app = require("../app");
const { calculateAverage } = require("../calculator");

describe("Student Grade Calculator API Tests", function () {

    describe("REST API Endpoint Tests", function () {

        it("should return student information successfully", async function () {
            const response = await request(app)
                .get("/api/student");

            expect(response.status).to.equal(200);
            expect(response.body.name).to.equal("Poojitha");
            expect(response.body.course).to.equal("SIT725");
            expect(response.body.status).to.equal("active");
        });

        it("should return 404 for an invalid endpoint", async function () {
            const response = await request(app)
                .get("/api/invalid");

            expect(response.status).to.equal(404);
        });

    });

    describe("Calculation Function Tests", function () {

        it("should calculate the average correctly", function () {
            const result = calculateAverage([80, 70, 90]);

            expect(result).to.equal(80);
        });

        it("should calculate the average for a single mark", function () {
            const result = calculateAverage([75]);

            expect(result).to.equal(75);
        });

        it("should reject an empty marks array", function () {
            expect(() => calculateAverage([]))
                .to.throw("Marks array cannot be empty");
        });

        it("should reject marks outside the valid range", function () {
            expect(() => calculateAverage([80, 105, 70]))
                .to.throw("Marks must be numbers between 0 and 100");
        });

    });

});
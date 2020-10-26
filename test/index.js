const request = require('supertest');
const {app} = require('./../server');

describe("authentication", ()=>{
    let user = {
        "firstName" : "kalkidan",
        "lastName": "tesfaye",
        "email" : "kalkidan@gmail.com",
        "phoneNumber":"+251942793296",
        "password" : "kalkidan", 
        "role":"user"
    }
    it("sign up should return user and token", function (){
        return request(app)
        .post("/v1/auth/signup")
        .send(user)
        .expect(200)
    })
    it("sign in should return user and token", function (){
        return request(app)
        .post("/v1/auth/signin")
        .send({"email": user.email, "password": user.password})
        .expect(200)
    })
})
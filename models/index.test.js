const db = require('./').db;
const User = require('./').User;
const Project = require('./').Project;
const {expect} = require('chai')


describe('Models', () => {
    before('wait for the db', () => db.didSync);
    afterEach('Clear the tables', () => db.truncate({ cascade: true }));

    describe('User fields', () => {
        it('includes firebaseId', () =>{
            User.create({
                firebaseId: 'abc123'
            })
            .then(user => {
                expect(user.firebaseId).to.equal('abc123');
                expect(user.firebaseId).to.not.equal(null);
            });
        });

        it('firebaseId is a string', () =>{
            User.create({
                firebaseId: 'abc123'
            })
            .then(user => {
                expect(user.firebaseId).to.be.a('string');
            });
        });

    });

    describe('Project fields', () => {
        it('include hashedProjectId, code, projectName', () =>{
            Project.create({
                hashedProjectId: 'def456',
                code: "{\"htmlString\":\"<h1>My Tiny App</h1>\",\"cssString\":\"h1 {\\n  color: #add8e6;\",\"jsString\":\"console.log(1)\"serverString\":\"const express = require('express');\"databaseString\":\"const Sequelize = require('sequelize');\"}",
                projectName: 'my project'
            })
            .then(project => {
                expect(project.hashedProjectId).to.equal('def456');
                expect(project.code).to.equal("{\"htmlString\":\"<h1>My Tiny App</h1>\",\"cssString\":\"h1 {\\n  color: #add8e6;\",\"jsString\":\"console.log(1)\"serverString\":\"const express = require('express');\"databaseString\":\"const Sequelize = require('sequelize');\"}");
                expect(project.projectName).to.equal('my project');
            });
        });

        it('field types are correct and JSON object has correct properties', () =>{
            Project.create({
                hashedProjectId: 'xyz890',
                code: "{\"htmlString\":\"\",\"cssString\":\"\",\"jsString\":\"\",\"serverString\":\"\",\"databaseString\":\"\"}",
                projectName: 'another project'
            })
            .then(project => {
                expect(project.hashedProjectId).to.be.a('string');
                expect(project.code).to.be.a('string');

                const projectCodeObj = JSON.parse(project.code);
                expect(projectCodeObj).to.be.an('object');
                expect(projectCodeObj).to.have.property('htmlString');
                expect(projectCodeObj).to.have.property('cssString');
                expect(projectCodeObj).to.have.property('jsString');
                expect(projectCodeObj).to.have.property('serverString');
                expect(projectCodeObj).to.have.property('databaseString');
                expect(projectCodeObj).to.not.have.property('randomProp');
                expect(project.projectName).to.be.a('string');
            });
        });

    });
});

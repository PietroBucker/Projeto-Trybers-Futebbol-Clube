import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import { loginMockInvlidEmail, loginMockInvlidPassword, loginMockValid, loginMockWithoutEmail, loginMockWithoutPassword, tokenValidAdmin } from './mock/login.mock';
import SequelizeUser from '../database/models/SequelizeUser';
import Token from '../utils/CreateToken';
import * as jwt from 'jsonwebtoken';


chai.use(chaiHttp);

const { expect } = chai;

describe('testa rota post login', () => {
  beforeEach(function () { sinon.restore(); });
  const errorWhtField = { "message": "All fields must be filled" }
  const erroInvalidField = { "message": "Invalid email or password" }

  it('teste integraçao rota post login', async () => {
    sinon.stub(Token, 'createToken').resolves(tokenValidAdmin)
    const httpResponse = await chai.request(app).post('/login').send(loginMockValid)

    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.deep.equal({ token: tokenValidAdmin});
    
  });

  it('teste de integraçao login sem email', async () => {
    const httpResponse = await chai.request(app).post('/login').send(loginMockWithoutEmail)
    expect(httpResponse.status).to.be.equal(400);
    expect(httpResponse.body).to.be.deep.equal(errorWhtField);
  });

  it('teste de integraçao login sem senha', async () => {
    const httpResponse = await chai.request(app).post('/login').send(loginMockWithoutPassword)
    expect(httpResponse.status).to.be.equal(400);
    expect(httpResponse.body).to.be.deep.equal(errorWhtField);
  });

  it('teste de integraçao login email invalido', async () => {
    const httpResponse = await chai.request(app).post('/login').send(loginMockInvlidEmail)
    expect(httpResponse.status).to.be.equal(401);
    expect(httpResponse.body).to.be.deep.equal(erroInvalidField);
  });

  it('teste de integraçao login senha invalido', async () => {
    const httpResponse = await chai.request(app).post('/login').send(loginMockInvlidPassword)
    expect(httpResponse.status).to.be.equal(401);
    expect(httpResponse.body).to.be.deep.equal(erroInvalidField);
  });

  it('teste de integraçao login user nao econtrado', async () => {
    sinon.stub(SequelizeUser, 'findOne').resolves(null)
    const httpResponse = await chai.request(app).post('/login').send(loginMockInvlidPassword)
    expect(httpResponse.status).to.be.equal(401);
    expect(httpResponse.body).to.be.deep.equal(erroInvalidField);
  });

  it('testando CreateToken', async () => {
    const httpResponse = await chai.request(app).post('/login').send(loginMockValid)

    expect(httpResponse.status).to.be.equal(200);
  });
});

describe('testa rota get login/role', () => {
  beforeEach(function () { sinon.restore(); });
 

  it('teste integraçao rota get login/role', async () => {
    const httpResponse = await chai.request(app).get('/login/role').set('Authorization', tokenValidAdmin)
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.deep.equal({"role": "admin"});

  });

  it('teste de integraçao retorna not found', async () => {
    const httpResponse = await chai.request(app).get('/login/role').set('Authorization', 'token invalido')
    expect(httpResponse.status).to.be.equal(401);
    expect(httpResponse.body).to.be.deep.equal({ "message": "Token must be a valid token"});
  });

  it('teste de integraçao retorna not found', async () => {
    const httpResponse = await chai.request(app).get('/login/role')
    expect(httpResponse.status).to.be.equal(401);
    expect(httpResponse.body).to.be.deep.equal({ message: 'Token not found' });
  });
});

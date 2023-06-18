import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';

import SequelizeMatche from '../database/models/SequelizeMatche';
import { createMatche, getAllInProgressFalse, getAllInProgressTrue, getAllMatches, tokenValidAdmin } from './mock/matches.mock';
import ValidateToken from '../middleware/validateToken';


chai.use(chaiHttp);

const { expect } = chai;

describe('testa rota get de matches', () => {
  beforeEach(function () { sinon.restore(); });
 

  it('teste integraçao rota get matches', async () => {
    sinon.stub(SequelizeMatche, 'findAll').resolves(getAllMatches as any)
    const httpResponse = await chai.request(app).get('/matches')
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.deep.equal(getAllMatches)

  });

  it('teste de integraçao retorna array vazio', async () => {
    sinon.stub(SequelizeMatche, 'findAll').resolves([])
    const httpResponse = await chai.request(app).get('/matches')
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.length(0);
  });

  it('teste de integraçao retorna todas as partidas inProgress false', async () => {
    sinon.stub(SequelizeMatche, 'findAll').resolves(getAllInProgressFalse as any)
    const httpResponse = await chai.request(app).get('/matches').query({inProgress: 'false'})
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.deep.equal(getAllInProgressFalse as any);
  });

  it('teste de integraçao retorna todas as partidas inProgress true', async () => {
    sinon.stub(SequelizeMatche, 'findAll').resolves(getAllInProgressTrue as any)
    const httpResponse = await chai.request(app).get('/matches').query({inProgress: 'true'})
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.deep.equal(getAllInProgressTrue as any);
  });
});

describe('testa rota patch finished', () => {
  beforeEach(function () { sinon.restore(); });
 
  it('teste integraçao rota finish retorna o esperado', async () => {
    sinon.stub(SequelizeMatche, 'update').resolves([1])
    const httpResponse = await chai.request(app).patch('/matches/45/finish').set('Authorization', tokenValidAdmin)
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.deep.equal({ message: "Finished" });

  });

  it('teste integraçao rota finish retorna erro', async () => {
    sinon.stub(SequelizeMatche, 'update').resolves([0])
    const httpResponse = await chai.request(app).patch('/matches/45/finish').set('Authorization', tokenValidAdmin)
    expect(httpResponse.status).to.be.equal(404);
    expect(httpResponse.body).to.be.deep.equal({ message: "not found" });

  });
});

describe('testa rota patch de update ', () => {
  beforeEach(function () { sinon.restore(); });
 
  const body = {
    "homeTeamGoals": 3,
    "awayTeamGoals": 1
  }
  it('teste integraçao rota de update retorna esperado', async () => {
    sinon.stub(SequelizeMatche, 'update').resolves([1])
    const httpResponse = await chai.request(app).patch('/matches/42').send(body).set('Authorization', tokenValidAdmin)
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.deep.equal(body);
  });

  it('teste integraçao rota de update retorna erro', async () => {
    sinon.stub(SequelizeMatche, 'update').resolves([0])
    const httpResponse = await chai.request(app).patch('/matches/42').send(body).set('Authorization', tokenValidAdmin)
    expect(httpResponse.status).to.be.equal(417);
    expect(httpResponse.body).to.be.deep.equal({message: 'not update'});
  });
});

describe('testa rota post cadastro ', () => {
  beforeEach(function () { sinon.restore(); });
 
  const body = {
      "homeTeamId": 16,
      "awayTeamId": 8,
      "homeTeamGoals": 2,
      "awayTeamGoals": 2
  }

  const invalidBody = {
    "homeTeamId": 1,
    "awayTeamId": 1,
    "homeTeamGoals": 2,
    "awayTeamGoals": 2
}
  it('teste integraçao rota de update retorna esperado', async () => {
    sinon.stub(SequelizeMatche, 'create').resolves(createMatche as any)
    const httpResponse = await chai.request(app).post('/matches').send(body).set('Authorization', tokenValidAdmin)
    expect(httpResponse.status).to.be.equal(201);
    expect(httpResponse.body).to.be.deep.equal(createMatche);
  });

  it('teste integraçao rota de update retorna por parametros errado', async () => {
  
    const httpResponse = await chai.request(app).post('/matches').send(invalidBody).set('Authorization', tokenValidAdmin)
    expect(httpResponse.status).to.be.equal(422);
    expect(httpResponse.body).to.be.deep.equal({ message: 'It is not possible to create a match with two equal teams'});
  });

  it('teste integraçao rota de update retorna erro', async () => {
  
    sinon.stub(SequelizeMatche, 'create').throws()
    const httpResponse = await chai.request(app).post('/matches').send(body).set('Authorization', tokenValidAdmin)
    expect(httpResponse.status).to.be.equal(404);
    expect(httpResponse.body).to.be.deep.equal({ message: 'create Error'});
  });

  it('teste integraçao rota de update retorna erro de chave estrangera', async () => {
  
    sinon.stub(SequelizeMatche, 'create').throws('SequelizeForeignKeyConstraintError')
    const httpResponse = await chai.request(app).post('/matches').send(body).set('Authorization', tokenValidAdmin)
    expect(httpResponse.status).to.be.equal(404);
    expect(httpResponse.body).to.be.deep.equal({ message: 'There is no team with such id!'});
  });
});
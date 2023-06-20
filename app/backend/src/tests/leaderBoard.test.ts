import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeMatche from '../database/models/SequelizeMatche';
import { leaderBoardAwayMock, leaderBoardHomeMock, leaderBoardMock } from './mock/leaderBoard.mock';
import { getAllInProgressFalse } from './mock/matches.mock';



chai.use(chaiHttp);

const { expect } = chai;

describe('testa rota get de /leaderBoard', () => {
  beforeEach(function () { sinon.restore(); });
 

  it('teste integraçao rota get leaderBoard', async () => {
    sinon.stub(SequelizeMatche, 'findAll').resolves(getAllInProgressFalse as any)
    const httpResponse = await chai.request(app).get('/leaderBoard')
    console.log('teste2');
    
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.deep.equal(leaderBoardMock);

  });

  it('teste de integraçao retorna array vazio', async () => {
    sinon.stub(SequelizeMatche, 'findAll').resolves([])
    const httpResponse = await chai.request(app).get('/leaderBoard')
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.length(0);
  });
});

describe('testa rota get de /leaderBoard/home', () => {
  beforeEach(function () { sinon.restore(); });
 

  it('teste integraçao rota get leaderBoard/home', async () => {
    sinon.stub(SequelizeMatche, 'findAll').resolves(getAllInProgressFalse as any)
    const httpResponse = await chai.request(app).get('/leaderBoard/home')
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.deep.equal(leaderBoardHomeMock);

  });

  it('teste de integraçao retorna array vazio leaderBoard/home', async () => {
    sinon.stub(SequelizeMatche, 'findAll').resolves([])
    const httpResponse = await chai.request(app).get('/leaderBoard/home')
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.length(0);
  });
});

describe('testa rota get de /leaderBoard/away', () => {
  beforeEach(function () { sinon.restore(); });
 

  it('teste integraçao rota get leaderBoard/away', async () => {
    sinon.stub(SequelizeMatche, 'findAll').resolves(getAllInProgressFalse as any)
    const httpResponse = await chai.request(app).get('/leaderboard/away')
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.deep.equal(leaderBoardAwayMock);

  });

  it('teste de integraçao retorna array vazio leaderBoard/away', async () => {
    sinon.stub(SequelizeMatche, 'findAll').resolves([])
    const httpResponse = await chai.request(app).get('/leaderBoard/away')
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.length(0);
  });
});


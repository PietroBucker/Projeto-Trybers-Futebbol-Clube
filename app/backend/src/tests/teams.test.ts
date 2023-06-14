import * as sinon from 'sinon';
import * as chai from 'chai';
// @ts-ignore
import chaiHttp = require('chai-http');

import { app } from '../app';
import SequelizeTeam from '../database/models/SequelizeTeam';
import { getAllTeams } from './mock/team.mock';


chai.use(chaiHttp);

const { expect } = chai;

describe('testa rota get de teams', () => {
  beforeEach(function () { sinon.restore(); });
 

  it('teste integraçao rota get teams', async () => {
    sinon.stub(SequelizeTeam, 'findAll').resolves(getAllTeams as any)
    const httpResponse = await chai.request(app).get('/teams')
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.deep.equal(getAllTeams);

  });

  it('teste de integraçao retorna array vazio', async () => {
    sinon.stub(SequelizeTeam, 'findAll').resolves([])
    const httpResponse = await chai.request(app).get('/teams')
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.length(0);
  });
});

describe('testa rota get por id de teams', () => {
  beforeEach(function () { sinon.restore(); });
 

  it('teste integraçao rota get teams', async () => {
    sinon.stub(SequelizeTeam, 'findOne').resolves(getAllTeams[0] as any)
    const httpResponse = await chai.request(app).get('/teams/1')
    expect(httpResponse.status).to.be.equal(200);
    expect(httpResponse.body).to.be.deep.equal(getAllTeams[0]);

  });

  it('teste de integraçao retorna not found', async () => {
    sinon.stub(SequelizeTeam, 'findOne').resolves(null)
    const httpResponse = await chai.request(app).get('/teams/20')
    expect(httpResponse.status).to.be.equal(404);
    expect(httpResponse.body).to.be.deep.equal({ message: 'not found'});
  });
});

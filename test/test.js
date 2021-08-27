/* eslint-disable no-unused-expressions */
const { describe, it } = require('mocha');
const chai = require('chai');
const chaiHttp = require('chai-http');

const app = require('../src/index');

chai.use(chaiHttp);

describe('GET tests', () => {
  it('should return status 200, res.body to be an array and no errors', (done) => {
    chai.request(app)
      .get('/vehicles')
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.be.a('array');
        done();
      });
  });
});

describe('POST tests', () => {
  it('should return status 200, object created with all properties and no errors', (done) => {
    chai.request(app)
      .post('/vehicles')
      .send({
        id: 'test', placa: 'test', chassi: 'test', renavam: 'test', modelo: 'test', marca: 'test', ano: 'test',
      })
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.have.property('placa').eql('test');
        chai.expect(res.body).to.have.property('chassi').eql('test');
        chai.expect(res.body).to.have.property('renavam').eql('test');
        chai.expect(res.body).to.have.property('modelo').eql('test');
        chai.expect(res.body).to.have.property('marca').eql('test');
        chai.expect(res.body).to.have.property('ano').eql('test');
      });
    done();
  });
});

describe('PUT tests', () => {
  it('should return status 200 and no errors', (done) => {
    chai.request(app)
      .put('/vehicles/test')
      .send({ placa: 'altered Data' })
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res).to.have.status(200);
        chai.expect(res.body).to.have.property('placa').eql('altered Data');
        done();
      });
  });
});

describe('DELETE tests', () => {
  it('should return status 204 and no errors', (done) => {
    chai.request(app)
      .delete('/vehicles/test')
      .end((err, res) => {
        chai.expect(err).to.be.null;
        chai.expect(res).to.have.status(204);
        done();
      });
  });

  it('item with id=test should not exist', (done) => {
    chai.request(app)
      .get('/vehicles/test')
      .end((err, res) => {
        chai.expect(res).to.have.status(404);
        done();
      });
  });
});

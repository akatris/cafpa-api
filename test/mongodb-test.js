// Copyright (c) 2018 Sitraka Ratsimba

const Lab = require("lab");
const MongoDB = require("../lib/mongodb.js");

const {expect} = require("code");

const {before, describe, it} = exports.lab = Lab.script();

describe("MongoDB", () => {

  let database = null;

  before(() => {
    // We expect that users have'not deleted the database test :D
    database = new MongoDB.Database("mongodb://localhost:27017/test");
  });

  describe("#getURL()", () => {

    it("should returns mongo url", () => {
      const hostname = "localhost";
      const port = 27017;
      const dbName = "fako";
      expect(MongoDB.buildUrl(hostname, port, dbName))
        .to.be.equal("mongodb://localhost:27017/fako");
    });
  });

  describe("Database", () => {

    it("should set url and dbName", async () => {
      await database.connect();
      expect(database.client.isConnected()).to.be.true();
    });

    it("returns the database connection", async () => {
      // I'm am pretty sure that example.com does not use mongo :D
      const db = await database.connect();
      expect(db).to.be.not.null().and.not.undefined();
    });

    it("get() should return a connection to the database", async () => {
      await database.connect();
      expect(database.get()).to.be.not.null().and.not.undefined();
    });
  });
});

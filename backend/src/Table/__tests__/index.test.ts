import { dbConnect, dbDisconnect } from "../../util/mongoDBConfigTest";
import { Table, TableDocument } from "../Table.model";
import TableRepo from "../Table.repo";
import TableService from "../Table.service";
import { express } from "../../server/index";
import request from "supertest";

jest.setTimeout(60000);

const mockTableData: Table = {
  number: 1,
  taken: false,
};

let createdTable: TableDocument | null = null;

describe("Table Service", () => {
  describe("Table Repository", () => {
    beforeAll(async () => {
      await dbConnect();
    });

    afterAll(async () => {
      await dbDisconnect();
      createdTable = null;
    });

    describe("Create Table", () => {
      it("WITH SUCCESS", async () => {
        createdTable = await TableRepo.create(mockTableData);

        expect(createdTable).not.toBeNull();
        expect(createdTable._id).not.toBeNull();
        expect(typeof createdTable.number).toBe("number");
        expect(createdTable.taken).toBe(false);
      });
    });

    describe("Get Table", () => {
      it("WITH SUCCESS", async () => {
        const table = await TableRepo.getByID(createdTable!._id.toString());

        expect(table._id.toString()).toBe(createdTable?._id.toString());
        expect(table.number).toBe(createdTable?.number);
        expect(table.taken).toBe(createdTable?.taken);
      });

      it("WITH ERROR", async () => {
        await expect(TableRepo.getByID("wecq22daaewccs")).rejects.toThrow();
      });
    });

    describe("List Tables", () => {
      it("WITH SUCCESS", async () => {
        const tables = await TableRepo.get({ number: 1 });

        expect(Array.isArray(tables)).toBe(true);
        expect(tables.length).toBeGreaterThanOrEqual(1);
      });
    });

    describe("Update Table", () => {
      it("WITH SUCCESS", async () => {
        const updatedTable = await TableRepo.update(
          createdTable!._id.toString(),
          { taken: true } as Table,
        );

        expect(updatedTable!._id.toString()).toBe(createdTable?._id.toString());
        expect(updatedTable!.taken).toBe(true);
      });

      it("WITH ERROR", async () => {
        await expect(
          TableRepo.update("dadcrfdsdfs", {} as Table),
        ).rejects.toThrow();
      });
    });

    describe("Delete Table", () => {
      it("WITH SUCCESS", async () => {
        const deletedTable = await TableRepo.delete(
          createdTable!._id.toString(),
        );

        expect(deletedTable._id.toString()).toBe(createdTable?._id.toString());
      });

      it("WITH ERROR", async () => {
        await expect(TableRepo.delete("dadcrfdsdfs")).rejects.toThrow();
      });
    });
  });

  describe("Table Service", () => {
    beforeAll(async () => {
      await dbConnect();
    });

    afterAll(async () => {
      await dbDisconnect();
      createdTable = null;
    });

    describe("Create Table", () => {
      it("WITH SUCCESS", async () => {
        createdTable = await TableService.createTable(mockTableData);

        expect(createdTable).not.toBeNull();
        expect(createdTable._id).not.toBeNull();
        expect(typeof createdTable.number).toBe("number");
        expect(createdTable.taken).toBe(false);
      });
    });

    describe("Get Table", () => {
      it("WITH SUCCESS", async () => {
        const table = await TableService.getTable(createdTable!._id.toString());

        expect(table._id.toString()).toBe(createdTable?._id.toString());
        expect(table.number).toBe(createdTable?.number);
      });

      it("WITH ERROR", async () => {
        await expect(TableService.getTable("wecq22daaewccs")).rejects.toThrow();
      });
    });

    describe("List Tables", () => {
      it("WITH SUCCESS", async () => {
        const { data: tables } = await TableService.getTables({ number: 1 });

        expect(Array.isArray(tables)).toBe(true);
        expect(tables.length).toBeGreaterThanOrEqual(1);
      });
    });

    describe("Update Table", () => {
      it("WITH SUCCESS", async () => {
        const updatedTable = await TableService.updateTable(
          createdTable!._id.toString(),
          { taken: true } as Table,
        );

        expect(updatedTable!._id.toString()).toBe(createdTable?._id.toString());
        expect(updatedTable!.taken).toBe(true);
      });

      it("WITH ERROR", async () => {
        await expect(
          TableService.updateTable("dadcrfdsdfs", {} as Table),
        ).rejects.toThrow();
      });
    });

    describe("Delete Table", () => {
      it("WITH SUCCESS", async () => {
        const deletedTable = await TableService.deleteTable(
          createdTable!._id.toString(),
        );

        expect(deletedTable._id.toString()).toBe(createdTable?._id.toString());
      });

      it("WITH ERROR", async () => {
        await expect(TableService.deleteTable("dadcrfdsdfs")).rejects.toThrow();
      });
    });
  });

  describe("Table API", () => {
    beforeAll(async () => {
      await dbConnect();
    });

    afterAll(async () => {
      await dbDisconnect();
      createdTable = null;
    });

    describe("POST /table", () => {
      it("Status 200 Success", async () => {
        await request(express.app)
          .post("/table")
          .send(mockTableData)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            createdTable = response.body.data;
            expect(response.body.message).toBeTruthy();
            expect(typeof response.body.data.number).toBe("number");
            expect(response.body.data.taken).toBe(false);
          });
      });

      it("Status 200 Success with empty body", async () => {
        await request(express.app)
          .post("/table")
          .send({})
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            expect(response.body.message).toBeTruthy();
            expect(typeof response.body.data.number).toBe("number");
          });
      });
    });

    describe("GET /table", () => {
      it("Status 200 Success", async () => {
        await request(express.app)
          .get("/table")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            expect(response.body.message).toBeTruthy();
            expect(Array.isArray(response.body.data)).toBe(true);
            expect(response.body.data.length).toBeGreaterThanOrEqual(1);
          });
      });
    });

    describe("DELETE /table/:id", () => {
      it("Status 200 Success", async () => {
        await request(express.app)
          .delete("/table/" + createdTable!._id)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            expect(response.body.message).toBeTruthy();
          });
      });

      it("Status 404 Error", async () => {
        await request(express.app)
          .delete("/table/" + createdTable!._id)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(404)
          .then((response) => {
            expect(response.body.message).toBeTruthy();
          });
      });
    });
  });
});

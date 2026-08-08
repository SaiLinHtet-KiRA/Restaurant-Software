import { dbConnect, dbDisconnect } from "../../util/mongoDBConfigTest";
import { History, HistoryDocument } from "../History.model";
import HistoryRepo from "../History.repo";
import HistoryService from "../History.service";

jest.setTimeout(60000);

const mockHistoryData: History = {
  _id: "",
  table: "1",
  price: 100,
  eatIn: [],
  takeAway: [],
  paymentMethod: "Cash",
};

let createdHistory: HistoryDocument | null = null;

describe("History Service", () => {
  describe("History Repository", () => {
    beforeAll(async () => {
      await dbConnect();
    });

    afterAll(async () => {
      await dbDisconnect();
      createdHistory = null;
    });

    describe("Create History", () => {
      it("WITH SUCCESS", async () => {
        createdHistory = await HistoryRepo.create(mockHistoryData);

        expect(createdHistory).not.toBeNull();
        expect(createdHistory._id).toBeDefined();
        expect(createdHistory.table).toBe("1");
        expect(createdHistory.price).toBe(100);
      });
    });

    describe("Get History", () => {
      it("WITH SUCCESS", async () => {
        const history = await HistoryRepo.getByID(
          createdHistory!._id.toString(),
        );

        expect(history._id.toString()).toBe(createdHistory?._id.toString());
        expect(history.table).toBe(createdHistory?.table);
        expect(history.price).toBe(createdHistory?.price);
      });

      it("WITH ERROR", async () => {
        await expect(HistoryRepo.getByID("wecq22daaewccs")).rejects.toThrow();
      });
    });

    describe("List Historys", () => {
      it("WITH SUCCESS", async () => {
        const historys = await HistoryRepo.get({});

        expect(Array.isArray(historys)).toBe(true);
        expect(historys.length).toBeGreaterThanOrEqual(1);
      });
    });

    describe("Update History", () => {
      it("WITH SUCCESS", async () => {
        const updatedHistory = await HistoryRepo.update(
          createdHistory!._id.toString(),
          { price: 200 },
        );

        expect(updatedHistory!._id.toString()).toBe(
          createdHistory?._id.toString(),
        );
        expect(updatedHistory!.price).toBe(200);
      });

      it("WITH ERROR", async () => {
        await expect(
          HistoryRepo.update("dadcrfdsdfs", {}),
        ).rejects.toThrow();
      });
    });

    describe("Delete History", () => {
      it("WITH SUCCESS", async () => {
        const deletedHistory = await HistoryRepo.delete(
          createdHistory!._id.toString(),
        );

        expect(deletedHistory._id.toString()).toBe(
          createdHistory?._id.toString(),
        );
      });

      it("WITH ERROR", async () => {
        await expect(HistoryRepo.delete("dadcrfdsdfs")).rejects.toThrow();
      });
    });
  });

  describe("History Service", () => {
    beforeAll(async () => {
      await dbConnect();
    });

    afterAll(async () => {
      await dbDisconnect();
      createdHistory = null;
    });

    describe("Create History", () => {
      it("WITH SUCCESS", async () => {
        createdHistory = await HistoryService.createHistory(mockHistoryData);

        expect(createdHistory).not.toBeNull();
        expect(createdHistory._id).toBeDefined();
        expect(createdHistory.table).toBe("1");
        expect(createdHistory.price).toBe(100);
      });
    });

    describe("Get History", () => {
      it("WITH SUCCESS", async () => {
        const history = await HistoryService.getHistory(
          createdHistory!._id.toString(),
        );

        expect(history._id.toString()).toBe(createdHistory?._id.toString());
        expect(history.table).toBe(createdHistory?.table);
        expect(history.price).toBe(createdHistory?.price);
      });

      it("WITH ERROR", async () => {
        await expect(
          HistoryService.getHistory("wecq22daaewccs"),
        ).rejects.toThrow();
      });
    });

    describe("List Historys", () => {
      it("WITH SUCCESS", async () => {
        const { data: historys } = await HistoryService.getHistorys({});

        expect(Array.isArray(historys)).toBe(true);
        expect(historys.length).toBeGreaterThanOrEqual(1);
      });
    });

    describe("Update History", () => {
      it("WITH SUCCESS", async () => {
        const updatedHistory = await HistoryService.updateHistory(
          createdHistory!._id.toString(),
          { price: 200 },
        );

        expect(updatedHistory!._id.toString()).toBe(
          createdHistory?._id.toString(),
        );
        expect(updatedHistory!.price).toBe(200);
      });

      it("WITH ERROR", async () => {
        await expect(
          HistoryService.updateHistory("dadcrfdsdfs", {}),
        ).rejects.toThrow();
      });
    });

    describe("Delete History", () => {
      it("WITH SUCCESS", async () => {
        const deletedHistory = await HistoryService.deleteHistory(
          createdHistory!._id.toString(),
        );

        expect(deletedHistory._id.toString()).toBe(
          createdHistory?._id.toString(),
        );
      });

      it("WITH ERROR", async () => {
        await expect(
          HistoryService.deleteHistory("dadcrfdsdfs"),
        ).rejects.toThrow();
      });
    });
  });
});

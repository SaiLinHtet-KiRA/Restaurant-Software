import mongoose from "mongoose";
import { dbConnect, dbDisconnect } from "../../util/mongoDBConfigTest";
import {
  ItemCollection,
  ItemCollectionDocument,
} from "../Item_Collection.model";
import ItemCollectionRepo from "../Item_Collection.repo";
import ItemCollectionService from "../Item_Collection.service";
import { express } from "../../server/index";
import request from "supertest";

jest.setTimeout(60000);

let createdItemCollection: ItemCollectionDocument | null = null;

describe("ItemCollection Service", () => {
  describe("ItemCollection Repository", () => {
    beforeAll(async () => {
      await dbConnect();
    });

    afterAll(async () => {
      await dbDisconnect();
      createdItemCollection = null;
    });

    describe("Create ItemCollection", () => {
      it("WITH SUCCESS", async () => {
        createdItemCollection = await ItemCollectionRepo.create({
          name: "Test Collection",
          items: [],
        });

        expect(createdItemCollection).not.toBeNull();
        expect(createdItemCollection._id).not.toBeNull();
        expect(createdItemCollection.items).toEqual([]);
      });

      it("WITH ERROR", async () => {
        await expect(
          ItemCollectionRepo.create({} as ItemCollection),
        ).rejects.toThrow();
      });
    });

    describe("Get ItemCollection", () => {
      it("WITH SUCCESS", async () => {
        const collection = await ItemCollectionRepo.getByID(
          createdItemCollection!._id.toString(),
        );

        expect(collection).toMatchObject({
          _id: createdItemCollection?._id,
        });
        expect(collection.items).toEqual([]);
      });

      it("WITH ERROR", async () => {
        await expect(
          ItemCollectionRepo.getByID("wecq22daaewccs"),
        ).rejects.toThrow();
      });
    });

    describe("Update ItemCollection", () => {
      it("WITH SUCCESS", async () => {
        const itemId = new mongoose.Types.ObjectId();
        const updatedCollection = await ItemCollectionRepo.update(
          createdItemCollection!._id.toString(),
          { items: [itemId] },
        );

        expect(updatedCollection._id.toString()).toBe(
          createdItemCollection?._id.toString(),
        );
        expect(updatedCollection.items.length).toBe(1);
      });

      it("WITH ERROR", async () => {
        await expect(
          ItemCollectionRepo.update("dadcrfdsdfs", {} as ItemCollection),
        ).rejects.toThrow();
      });
    });

    describe("Delete ItemCollection", () => {
      it("WITH SUCCESS", async () => {
        const deletedCollection = await ItemCollectionRepo.delete(
          createdItemCollection!._id.toString(),
        );

        expect(deletedCollection._id.toString()).toBe(
          createdItemCollection?._id.toString(),
        );
      });

      it("WITH ERROR", async () => {
        await expect(
          ItemCollectionRepo.delete("dadcrfdsdfs"),
        ).rejects.toThrow();
      });
    });
  });

  describe("ItemCollection Service", () => {
    beforeAll(async () => {
      await dbConnect();
    });

    afterAll(async () => {
      await dbDisconnect();
      createdItemCollection = null;
    });

    describe("Create ItemCollection", () => {
      it("WITH SUCCESS", async () => {
        createdItemCollection =
          await ItemCollectionService.createItemCollection({
            name: "Service Test",
            items: [],
          });
        expect(createdItemCollection).not.toBeNull();
        expect(createdItemCollection._id).not.toBeNull();
        expect(createdItemCollection.items).toEqual([]);
      });

      it("WITH ERROR", async () => {
        await expect(
          ItemCollectionService.createItemCollection({} as ItemCollection),
        ).rejects.toThrow();
      });
    });

    describe("Get ItemCollection", () => {
      it("WITH SUCCESS", async () => {
        const collection = await ItemCollectionService.getItemCollection(
          createdItemCollection!._id.toString(),
        );
        expect(collection._id.toString()).toBe(
          createdItemCollection?._id.toString(),
        );
        expect(collection.items).toEqual([]);
      });

      it("WITH ERROR", async () => {
        await expect(
          ItemCollectionService.getItemCollection("wecq22daaewccs"),
        ).rejects.toThrow();
      });
    });

    describe("Update ItemCollection", () => {
      it("WITH SUCCESS", async () => {
        const itemId = new mongoose.Types.ObjectId();
        const updatedCollection =
          await ItemCollectionService.updateItemCollection(
            createdItemCollection!._id.toString(),
            { items: [itemId] },
          );

        expect(updatedCollection._id.toString()).toBe(
          createdItemCollection?._id.toString(),
        );
        expect(updatedCollection.items.length).toBe(1);
      });

      it("WITH ERROR", async () => {
        await expect(
          ItemCollectionService.updateItemCollection(
            "dadcrfdsdfs",
            {} as ItemCollection,
          ),
        ).rejects.toThrow();
      });
    });

    describe("Delete ItemCollection", () => {
      it("WITH SUCCESS", async () => {
        const deletedCollection =
          await ItemCollectionService.deleteItemCollection(
            createdItemCollection!._id.toString(),
          );

        expect(deletedCollection._id.toString()).toBe(
          createdItemCollection?._id.toString(),
        );
      });

      it("WITH ERROR", async () => {
        await expect(
          ItemCollectionService.deleteItemCollection("dadcrfdsdfs"),
        ).rejects.toThrow();
      });
    });
  });
});

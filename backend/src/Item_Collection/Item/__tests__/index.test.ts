import mongoose from "mongoose";
import { dbConnect, dbDisconnect } from "../../../util/mongoDBConfigTest";
import { Item, ItemDocument } from "../Item.model";
import ItemRepo from "../Item.repo";
import ItemService from "../Item.service";
import { express } from "../../../server/index";
import request from "supertest";

const mockItemData: Item = {
  name: "Test Item",
  photo_url: "https://example.com/photo.jpg",
  price: 100,
  item_collection: new mongoose.Types.ObjectId(),
};

let createdItem: ItemDocument | null = null;

describe("Item Service", () => {
  describe("Item Repository", () => {
    beforeAll(async () => {
      await dbConnect();
    });

    afterAll(async () => {
      await dbDisconnect();
      createdItem = null;
    });

    describe("Create Item", () => {
      it("WITH SUCCESS", async () => {
        createdItem = await ItemRepo.create(mockItemData);

        expect(createdItem).not.toBeNull();
        expect(createdItem._id).not.toBeNull();
        expect(createdItem.name).toBe(mockItemData.name);
        expect(createdItem.price).toBe(mockItemData.price);
      });

      it("WITH ERROR", async () => {
        await expect(ItemRepo.create({} as Item)).rejects.toThrow();
      });
    });

    describe("Get Item", () => {
      it("WITH SUCCESS", async () => {
        const item = await ItemRepo.getByID(
          createdItem!._id.toString(),
        );

        expect(item._id.toString()).toBe(createdItem?._id.toString());
        expect(item.name).toBe(createdItem?.name);
      });

      it("WITH ERROR", async () => {
        await expect(ItemRepo.getByID("wecq22daaewccs")).rejects.toThrow();
      });
    });

    describe("Update Item", () => {
      it("WITH SUCCESS", async () => {
        const newName = "Updated Name";
        const updatedItem = await ItemRepo.update(
          createdItem!._id.toString(),
          {
            name: newName,
          } as Item,
        );

        expect(updatedItem!._id.toString()).toBe(
          createdItem?._id.toString(),
        );
        expect(updatedItem!.name).toBe(newName);
      });

      it("WITH ERROR", async () => {
        await expect(
          ItemRepo.update("dadcrfdsdfs", {} as Item),
        ).rejects.toThrow();
      });
    });

    describe("Delete Item", () => {
      it("WITH SUCCESS", async () => {
        const deletedItem = await ItemRepo.delete(
          createdItem!._id.toString(),
        );

        expect(deletedItem._id.toString()).toBe(
          createdItem?._id.toString(),
        );
      });

      it("WITH ERROR", async () => {
        await expect(ItemRepo.delete("dadcrfdsdfs")).rejects.toThrow();
      });
    });
  });

  describe("Item Service", () => {
    beforeAll(async () => {
      await dbConnect();
    });

    afterAll(async () => {
      await dbDisconnect();
      createdItem = null;
    });

    describe("Create Item", () => {
      it("WITH SUCCESS", async () => {
        createdItem = await ItemService.createItem(mockItemData);
        expect(createdItem).not.toBeNull();
        expect(createdItem._id).not.toBeNull();
        expect(createdItem.name).toBe(mockItemData.name);
      });

      it("WITH ERROR", async () => {
        await expect(
          ItemService.createItem({} as Item),
        ).rejects.toThrow();
      });

      it("WITH ERROR - negative price", async () => {
        const invalidData: Item = {
          name: "Invalid",
          photo_url: "https://example.com/photo.jpg",
          price: -1,
          item_collection: new mongoose.Types.ObjectId(),
        };
        await expect(
          ItemService.createItem(invalidData),
        ).rejects.toThrow();
      });
    });

    describe("Get Item", () => {
      it("WITH SUCCESS", async () => {
        const item = await ItemService.getItem(
          createdItem!._id.toString(),
        );
        expect(item._id.toString()).toBe(createdItem?._id.toString());
        expect(item.name).toBe(createdItem?.name);
      });

      it("WITH ERROR", async () => {
        await expect(
          ItemService.getItem("wecq22daaewccs"),
        ).rejects.toThrow();
      });
    });

    describe("Update Item", () => {
      it("WITH SUCCESS", async () => {
        const newName = "Updated By Service";
        const updatedItem = await ItemService.updateItem(
          createdItem!._id.toString(),
          {
            name: newName,
          } as Item,
        );

        expect(updatedItem!._id.toString()).toBe(
          createdItem?._id.toString(),
        );
        expect(updatedItem!.name).toBe(newName);
      });

      it("WITH ERROR", async () => {
        await expect(
          ItemService.updateItem("dadcrfdsdfs", {} as Item),
        ).rejects.toThrow();
      });
    });

    describe("Delete Item", () => {
      it("WITH SUCCESS", async () => {
        const deletedItem = await ItemService.deleteItem(
          createdItem!._id.toString(),
        );

        expect(deletedItem._id.toString()).toBe(
          createdItem?._id.toString(),
        );
      });

      it("WITH ERROR", async () => {
        await expect(
          ItemService.deleteItem("dadcrfdsdfs"),
        ).rejects.toThrow();
      });
    });
  });

  describe("Item API", () => {
    beforeAll(async () => {
      await dbConnect();
    });

    afterAll(async () => {
      await dbDisconnect();
      createdItem = null;
    });

    describe("POST /item", () => {
      it("Status 200 Success", async () => {
        await request(express.app)
          .post("/item")
          .send({
            name: mockItemData.name,
            photo_url: mockItemData.photo_url,
            price: mockItemData.price,
          })
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            createdItem = response.body.data;
            expect(response.body.message).toBeTruthy();
            expect(response.body.data.name).toBe(mockItemData.name);
            expect(response.body.data.price).toBe(mockItemData.price);
          });
      });

      it("Status 400 Error", async () => {
        await request(express.app)
          .post("/item")
          .send({})
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(400)
          .then((response) => {
            expect(response.body.message).toBeTruthy();
            expect(response.body.data).toBeNull();
          });
      });
    });

    describe("GET /item/:id", () => {
      it("Status 200 Success", async () => {
        await request(express.app)
          .get("/item/" + createdItem!._id)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            expect(response.body.message).toBeTruthy();
            expect(response.body.data._id).toBe(createdItem?._id.toString());
            expect(response.body.data.name).toBe(createdItem?.name);
          });
      });

      it("Status 500 Error", async () => {
        await request(express.app)
          .get("/item/msfkmsdfsf")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(500)
          .then((response) => {
            expect(response.body.message).toBeTruthy();
            expect(response.body.data).toBeNull();
          });
      });
    });

    describe("DELETE /item/:id", () => {
      it("Status 200 Success", async () => {
        await request(express.app)
          .delete("/item/" + createdItem!._id)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            expect(response.body.message).toBeTruthy();
            expect(response.body.data._id).toBe(createdItem?._id.toString());
          });
      });

      it("Status 404 Error", async () => {
        await request(express.app)
          .delete("/item/" + createdItem!._id)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(404)
          .then((response) => {
            expect(response.body.message).toBeTruthy();
            expect(response.body.data).toBeNull();
          });
      });
    });
  });
});

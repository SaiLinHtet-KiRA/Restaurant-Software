import { dbConnect, dbDisconnect } from "../../util/mongoDBConfigTest";
import { Order, OrderDocument } from "../Order.model";
import OrderRepo from "../Order.repo";
import OrderService from "../Order.service";
import { express } from "../../server/index";
import request from "supertest";

jest.setTimeout(60000);

const mockOrderData: Order = {
  table: "1",
  price: 100,
  eatIn: [],
  takeAway: [],
};

let createdOrder: OrderDocument | null = null;

describe("Order Service", () => {
  describe("Order Repository", () => {
    beforeAll(async () => {
      await dbConnect();
    });

    afterAll(async () => {
      await dbDisconnect();
      createdOrder = null;
    });

    describe("Create Order", () => {
      it("WITH SUCCESS", async () => {
        createdOrder = await OrderRepo.create(mockOrderData);

        expect(createdOrder).not.toBeNull();
        expect(createdOrder._id).toBeDefined();
        expect(typeof createdOrder.id).toBe("number");
        expect(createdOrder.table).toBe("1");
        expect(createdOrder.price).toBe(100);
      });
    });

    describe("Get Order", () => {
      it("WITH SUCCESS", async () => {
        const order = await OrderRepo.getByID(createdOrder!._id.toString());

        expect(order._id.toString()).toBe(createdOrder?._id.toString());
        expect(order.id).toBe(createdOrder?.id);
        expect(order.table).toBe(createdOrder?.table);
        expect(order.price).toBe(createdOrder?.price);
      });

      it("WITH ERROR", async () => {
        await expect(
          OrderRepo.getByID("wecq22daaewccs"),
        ).rejects.toThrow();
      });
    });

    describe("List Orders", () => {
      it("WITH SUCCESS", async () => {
        const orders = await OrderRepo.get({});

        expect(Array.isArray(orders)).toBe(true);
        expect(orders.length).toBeGreaterThanOrEqual(1);
      });
    });

    describe("Update Order", () => {
      it("WITH SUCCESS", async () => {
        const updatedOrder = await OrderRepo.update(
          createdOrder!._id.toString(),
          { price: 200 },
        );

        expect(updatedOrder!._id.toString()).toBe(
          createdOrder?._id.toString(),
        );
        expect(updatedOrder!.price).toBe(200);
      });

      it("WITH ERROR", async () => {
        await expect(
          OrderRepo.update("dadcrfdsdfs", {}),
        ).rejects.toThrow();
      });
    });

    describe("Delete Order", () => {
      it("WITH SUCCESS", async () => {
        const deletedOrder = await OrderRepo.delete(
          createdOrder!._id.toString(),
        );

        expect(deletedOrder._id.toString()).toBe(
          createdOrder?._id.toString(),
        );
      });

      it("WITH ERROR", async () => {
        await expect(OrderRepo.delete("dadcrfdsdfs")).rejects.toThrow();
      });
    });
  });

  describe("Order Service", () => {
    beforeAll(async () => {
      await dbConnect();
    });

    afterAll(async () => {
      await dbDisconnect();
      createdOrder = null;
    });

    describe("Create Order", () => {
      it("WITH SUCCESS", async () => {
        createdOrder = await OrderService.createOrder(mockOrderData);

        expect(createdOrder).not.toBeNull();
        expect(createdOrder._id).toBeDefined();
        expect(typeof createdOrder.id).toBe("number");
        expect(createdOrder.table).toBe("1");
        expect(createdOrder.price).toBe(100);
      });
    });

    describe("Get Order", () => {
      it("WITH SUCCESS", async () => {
        const order = await OrderService.getOrder(
          createdOrder!._id.toString(),
        );

        expect(order._id.toString()).toBe(createdOrder?._id.toString());
        expect(order.id).toBe(createdOrder?.id);
        expect(order.table).toBe(createdOrder?.table);
        expect(order.price).toBe(createdOrder?.price);
      });

      it("WITH ERROR", async () => {
        await expect(
          OrderService.getOrder("wecq22daaewccs"),
        ).rejects.toThrow();
      });
    });

    describe("List Orders", () => {
      it("WITH SUCCESS", async () => {
        const { data: orders } = await OrderService.getOrders({});

        expect(Array.isArray(orders)).toBe(true);
        expect(orders.length).toBeGreaterThanOrEqual(1);
      });
    });

    describe("Update Order", () => {
      it("WITH SUCCESS", async () => {
        const updatedOrder = await OrderService.updateOrder(
          createdOrder!._id.toString(),
          { price: 200 },
        );

        expect(updatedOrder!._id.toString()).toBe(
          createdOrder?._id.toString(),
        );
        expect(updatedOrder!.price).toBe(200);
      });

      it("WITH ERROR", async () => {
        await expect(
          OrderService.updateOrder("dadcrfdsdfs", {}),
        ).rejects.toThrow();
      });
    });

    describe("Delete Order", () => {
      it("WITH SUCCESS", async () => {
        const deletedOrder = await OrderService.deleteOrder(
          createdOrder!._id.toString(),
        );

        expect(deletedOrder._id.toString()).toBe(
          createdOrder?._id.toString(),
        );
      });

      it("WITH ERROR", async () => {
        await expect(
          OrderService.deleteOrder("dadcrfdsdfs"),
        ).rejects.toThrow();
      });
    });
  });

  describe("Order API", () => {
    beforeAll(async () => {
      await dbConnect();
    });

    afterAll(async () => {
      await dbDisconnect();
      createdOrder = null;
    });

    describe("POST /order", () => {
      it("Status 200 Success", async () => {
        await request(express.app)
          .post("/order")
          .send(mockOrderData)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            createdOrder = response.body.data;
            expect(response.body.message).toBeTruthy();
            expect(typeof response.body.data.id).toBe("number");
            expect(response.body.data.table).toBe("1");
            expect(response.body.data.price).toBe(100);
          });
      });

      it("Status 400 with empty body", async () => {
        await request(express.app)
          .post("/order")
          .send({})
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(400)
          .then((response) => {
            expect(response.body.message).toBeTruthy();
          });
      });
    });

    describe("GET /orders", () => {
      it("Status 200 Success", async () => {
        await request(express.app)
          .get("/orders")
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

    describe("GET /order/:id", () => {
      it("Status 200 Success", async () => {
        await request(express.app)
          .get("/order/" + createdOrder!._id)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            expect(response.body.message).toBeTruthy();
            expect(response.body.data._id).toBe(
              createdOrder!._id.toString(),
            );
          });
      });

      it("Status 500 Error", async () => {
        await request(express.app)
          .get("/order/" + "dadcrfdsdfs")
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(500)
          .then((response) => {
            expect(response.body.message).toBeTruthy();
          });
      });
    });

    describe("PATCH /order/:id", () => {
      it("Status 200 Success", async () => {
        await request(express.app)
          .patch("/order/" + createdOrder!._id)
          .send({ price: 500 })
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            expect(response.body.message).toBeTruthy();
            expect(response.body.data.price).toBe(500);
          });
      });
    });

    describe("DELETE /order/:id", () => {
      it("Status 200 Success", async () => {
        await request(express.app)
          .delete("/order/" + createdOrder!._id)
          .set("Accept", "application/json")
          .expect("Content-Type", /json/)
          .expect(200)
          .then((response) => {
            expect(response.body.message).toBeTruthy();
          });
      });

      it("Status 404 Error", async () => {
        await request(express.app)
          .delete("/order/" + createdOrder!._id)
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

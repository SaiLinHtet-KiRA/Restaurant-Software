import { dbConnect, dbDisconnect } from "../../util/mongoDBConfigTest";
import { getNextSequence } from "../Counter";

jest.setTimeout(60000);

describe("Counter - getNextSequence", () => {
  beforeAll(async () => {
    await dbConnect();
  });

  afterAll(async () => {
    await dbDisconnect();
  });

  it("returns a number for TableId", async () => {
    const sequence = await getNextSequence("TableId");

    expect(typeof sequence).toBe("number");
    expect(sequence!).toBeGreaterThanOrEqual(0);
  });

  it("returns a number for ItemId", async () => {
    const sequence = await getNextSequence("ItemId");

    expect(typeof sequence).toBe("number");
    expect(sequence!).toBeGreaterThanOrEqual(0);
  });

  it("increments sequence on subsequent calls", async () => {
    const first = await getNextSequence("TableId");
    const second = await getNextSequence("TableId");

    expect(second!).toBeGreaterThan(first!);
  });

  it("maintains separate sequences for different names", async () => {
    const roomSeq = await getNextSequence("TableId");
    const userSeq = await getNextSequence("ItemId");

    expect(typeof roomSeq).toBe("number");
    expect(typeof userSeq).toBe("number");
  });
});

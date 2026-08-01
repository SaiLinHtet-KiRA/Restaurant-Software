import { Request, Response, NextFunction } from "express";

declare global {
  namespace Express {
    interface Request {
      userId?: string;
      userRole?: string;
    }
  }
}

async function CheckAdmin(req: Request, _res: Response, next: NextFunction) {
  if (!req.userId) return next(new Error("Not logged in"));
  if (req.userRole !== "admin") return next(new Error("Admin access required"));
  next();
}

describe("CheckAdmin Middleware", () => {
  it("calls next() for admin user", async () => {
    const req = { userId: "admin123", userRole: "admin" } as unknown as Request;
    const res = {} as Response;
    const next = jest.fn();

    await CheckAdmin(req, res, next);

    expect(next).toHaveBeenCalledWith();
  });

  it("calls next(error) for non-admin user", async () => {
    const req = { userId: "user123", userRole: "user" } as unknown as Request;
    const res = {} as Response;
    const next = jest.fn();

    await CheckAdmin(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0]).toBeInstanceOf(Error);
    expect((next.mock.calls[0][0] as Error).message).toBe("Admin access required");
  });

  it("calls next(error) when not logged in", async () => {
    const req = {} as unknown as Request;
    const res = {} as Response;
    const next = jest.fn();

    await CheckAdmin(req, res, next);

    expect(next).toHaveBeenCalled();
    expect(next.mock.calls[0][0]).toBeInstanceOf(Error);
    expect((next.mock.calls[0][0] as Error).message).toBe("Not logged in");
  });
});

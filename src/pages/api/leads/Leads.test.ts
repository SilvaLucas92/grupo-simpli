/**
 * @jest-environment node
 */
import handler from "./index";
import { createMocks } from "node-mocks-http";
import Leads from "../../../models/Leads";

jest.mock("../../../libs/mongodb");

describe("/leads", () => {
      it("should create a lead successfully", async () => {
        const { req, res } = createMocks({
          method: "POST",
          body: {
            name: "Lucas",
            lastname: "Silva",
            email: "lucas@gmail.com",
            description: "Test description.",
          },
        });

        await handler(req, res);

        expect(res._getStatusCode()).toBe(200);
      });

    it("Should return a 405 when is not POST", async () => {
      const { req, res } = createMocks({
        method: "GET",
      });
      await handler(req, res);

      expect(res._getStatusCode()).toBe(405);
      expect(res._getJSONData()).toEqual({
        error: "Only post allowed",
      });
    });
});

import { server } from "@/mocks/handlers";
import "@testing-library/jest-dom";
beforeAll(() => server.listen());
afterAll(() => server.close());
afterEach(() => server.resetHandlers());

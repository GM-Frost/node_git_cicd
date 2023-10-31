export default {
  post: jest
    .fn()
    .mockResolvedValue({ data: "http://localhost:8000/reservations" }),
};

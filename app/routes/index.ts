import userRoutes from "./User";

const routing = (app: any) => {
  app.use("/beacon/api/user", userRoutes);
};

export default routing;

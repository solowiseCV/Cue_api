import userRoute from './users/userRoute.js'


export default (router) => {
  router.use("/users",userRoute);
   
  return router;
};
import userRoute from './users/userRoute.js'
import hotelRoute from './users/userRoute.js'


export default (router) => {
  router.use("/users",userRoute);
  router.use("/hotels",hotelRoute);
   
  return router;
};
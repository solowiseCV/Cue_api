import userRoute from './users/userRoute.js'
import hotelRoute from './hotels/hotelRoute.js'
import roomRoute from './rooms/roomRoute.js'


export default (appRouter) => {
  appRouter.use("/users",userRoute);
  appRouter.use("/hotels",hotelRoute);
  appRouter.use("/",roomRoute);
  return appRouter;
};
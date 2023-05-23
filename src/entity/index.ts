import { AccountLogin } from "./account-login.entity";
import { Account } from "./account.entity";
import { BusRoute } from "./bus-route.entity";
import { BusStop } from "./bus-stop.entity";
import { BusTrip } from "./bus-trip";
import { Order } from "./order";
import { OrderItem } from "./order-item";
import { RouteStop } from "./route-stop";

export const entities = [Account, AccountLogin, BusRoute, BusStop, RouteStop, BusTrip, Order, OrderItem];
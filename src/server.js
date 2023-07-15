"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const tslib_1 = require("tslib");
const dotenv_1 = require("dotenv");
const express_1 = tslib_1.__importDefault(require("express"));
const DataSource_1 = tslib_1.__importDefault(require("./Database/DataSource"));
const train_routes_1 = require("./Routes/train.routes");
const cors_1 = tslib_1.__importDefault(require("cors"));
(0, dotenv_1.config)();
const app = (0, express_1.default)();
const PORT = process.env.PORT || 5000;
const startServer = async () => {
    try {
        console.log("Connecting to database....");
        await DataSource_1.default.initialize();
        console.log("Database connected");
        app.listen(PORT, () => {
            console.log(`listening on http://localhost:${PORT}`);
        });
    }
    catch (error) {
        console.log("Unable to connect to database", error);
    }
};
app.use((0, cors_1.default)({
    origin: "http://localhost:3000",
}));
app.use(express_1.default.json());
app.use(express_1.default.urlencoded({ extended: true }));
startServer();
app.use("/train", train_routes_1.trainRoutes);
// app.get("/seedSeats", async (req: Request, res: Response) => {
//   const trainRepo = appDataSource.getRepository(TrainEntity);
//   const seatsRepo = appDataSource.getRepository(SeatsEntity);
//   const train = await trainRepo.findOne({
//     where: {
//       id: 1,
//     },
//   });
//   try {
//     for (let index = 0; index < 70; index++) {
//       const seat = new SeatsEntity();
//       seat.seatNumber = index + 1;
//       seat.isAvailable = true;
//       seat.isBooked = false;
//       seat.trainName = train!.trainName;
//       seat.train = train!;
//       await seatsRepo.save(seat);
//     }
//   } catch (error) {
//     return res.send("Unable to seed seats");
//   }
//   const seats = await seatsRepo.find();
//   res.send(seats);
// });
// app.get("/drop", async (req: Request, res: Response) => {
//   try {
//     await dropTable();
//     res.send("Successful");
//   } catch (error) {
//     console.log("Unable to drop table", error);
//     res.send("Unable to drop table");
//   }
// });
// const createTable = async () => {
//   try {
//     await appDataSource.transaction(async (txn) => {
//       try {
//         const trainRepo = txn.getRepository(TrainEntity);
//         const seatsRepo = txn.getRepository(SeatsEntity);
//         const train = new TrainEntity();
//         train.trainName = "Shatabdi Express";
//         train.fromStation = "Delhi";
//         train.toStation = "Mumbai";
//         train.departureTime = moment().utc().toDate();
//         train.arrivalTime = moment().utc().toDate();
//         train.seatsAvailableCount = 70;
//         train.seatsBookedCount = 0;
//         train.waitingCount = 0;
//         const savedTrain = await trainRepo.save(train);
//         for (let index = 0; index < 70; index++) {
//           const seat = new SeatsEntity();
//           seat.seatNumber = index + 1;
//           seat.isAvailable = true;
//           seat.isBooked = false;
//           seat.trainName = savedTrain.trainName;
//           seat.train = savedTrain;
//           await seatsRepo.save(seat);
//         }
//       } catch (error) {
//         console.log("Unable to create table", error);
//       }
//     });
//   } catch (error) {
//     console.log("Unable to create table", error);
//   }
// };
//# sourceMappingURL=server.js.map
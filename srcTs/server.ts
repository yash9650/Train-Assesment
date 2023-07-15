import { config } from "dotenv";
import express, { Application } from "express";
import appDataSource from "./Database/DataSource";
import { trainRoutes } from "./Routes/train.routes";

config();

const app: Application = express();
const PORT = process.env.PORT || 5000;

const startServer = async () => {
  try {
    console.log("Connecting to database....");
    await appDataSource.initialize();
    console.log("Database connected");
    app.listen(PORT, () => {
      console.log(`listening on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.log("Unable to connect to database", error);
  }
};

startServer();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use("/train", trainRoutes);

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

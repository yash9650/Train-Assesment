import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  Unique,
} from "typeorm";
import { TrainEntity } from "./train.entity";

@Entity("Seats")
@Unique(["seatNumber", "trainId"])
export class SeatsEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({
    nullable: false,
  })
  seatNumber: number;

  @Column({
    nullable: false,
  })
  rowNumber: number;

  @Column({
    nullable: false,
    type: "int",
  })
  trainId: number;

  @Column({ nullable: false, type: "varchar", length: 255 })
  trainName: string;

  @Column({ nullable: false })
  isAvailable: boolean;

  @Column({ nullable: false })
  isBooked: boolean;

  @ManyToOne(() => TrainEntity, (train) => train.seats)
  @JoinColumn({ name: "trainId" })
  train: TrainEntity;
}

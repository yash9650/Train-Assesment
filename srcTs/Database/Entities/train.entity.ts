import { Entity, PrimaryGeneratedColumn, Column, OneToMany } from "typeorm";
import { SeatsEntity } from "./seats.entity";

@Entity("Trains")
export class TrainEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false, type: "varchar", length: 255 })
  trainName: string;

  @Column({ nullable: false })
  seatsAvailableCount: number;

  @Column({ nullable: false })
  seatsBookedCount: number;

  @Column({ nullable: false })
  waitingCount: number;

  @Column({ nullable: false, type: "varchar", length: 255 })
  fromStation: string;

  @Column({ nullable: false, type: "varchar", length: 255 })
  toStation: string;

  @Column({ nullable: false, type: "timestamp" })
  departureTime: Date;

  @Column({ nullable: false, type: "timestamp" })
  arrivalTime: Date;

  @OneToMany(() => SeatsEntity, (seats) => seats.train, {
    onDelete: "CASCADE",
  })
  seats: SeatsEntity[];
}

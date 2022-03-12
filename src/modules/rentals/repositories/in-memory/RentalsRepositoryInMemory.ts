import { Rental } from "../../infra/typeorm/model/Rental";
import { ICreateRentalDTO, IRentalsRepository } from "../IRentalsRepository";

export class RentalsRepositoryInMemory implements IRentalsRepository {
  rentals: Rental[] = [];

  async create({ car_id, expected_return_date, user_id }: ICreateRentalDTO) {
    const rental = new Rental();

    Object.assign(rental, {
      car_id,
      expected_return_date,
      user_id,
      start_date: new Date(),
    });

    this.rentals.push(rental);

    return rental;
  }

  async findByOpenRentalCarId(car_id: string) {
    return this.rentals.find(
      (rental) => rental.car_id === car_id && !rental.end_date
    );
  }

  async findOpenRentalByUser(user_id: string) {
    return this.rentals.find(
      (rental) => rental.user_id === user_id && !rental.end_date
    );
  }

  async findById(rental_id: string) {
    return this.rentals.find(
      (rental) => rental.id === rental_id && !rental.end_date
    );
  }
}

export default class Address {
  _street: string = "";
  _number: number = 0;
  _zipcode: string = "";
  _city: string = "";

  constructor(street: string, number: number, zip: string, city: string) {
    this._street = street;
    this._number = number;
    this._zipcode = zip;
    this._city = city;

    this.validate();
  }

  get street() {
    return this._street;
  }

  get number() {
    return this._number;
  }

  get zipcode() {
    return this._zipcode;
  }

  get city() {
    return this._city;
  }

  validate() {
    if (this._street.length === 0) {
      throw new Error("Street is required");
    }
    if (this._number === 0) {
      throw new Error("Number is required");
    }
    if (this._zipcode.length === 0) {
      throw new Error("Zip is required");
    }
    if (this._city.length === 0) {
      throw new Error("City is required");
    }
  }

  toString(): string {
    return `${this.street}, ${this.number}, ${this.zipcode}, ${this.city}`;
  }
}

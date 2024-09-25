import Address from "../value-object/address";

//entidade deve sempre se auto validar e deve sempre ser consistente
export default class Customer {
  private _id: string;
  private _name: string = "";
  private _address!: Address;
  private _active: boolean = true;
  private _rewardPoints: number = 0;

  constructor(id: string, name: string) {
    this._id = id;
    this._name = name;
    this.validate();
  }

  validate() {
    if (this._id.length == 0) {
      throw new Error("Id is Required");
    }
    if (this._name.length == 0) {
      throw new Error("Name is Required");
    }
  }

  changeName(name: string) {
    this._name = name;
    this.validate();
  }

  get name() {
    return this._name;
  }

  isActive(): boolean {
    return this._active;
  }

  activate() {
    if (this._address === undefined) {
      throw new Error("Address is mandatory to activate a customer");
    }
    this._active = true;
  }

  get rewardPoints(): number {
    return this._rewardPoints;
  }

  get id() {
    return this._id;
  }

  addRewardPoints(points: number) {
    this._rewardPoints += points;
  }

  changeAddress(address: Address) {
    this._address = address;
  }

  get address() {
    return this._address;
  }

  deactivate() {
    this._active = false;
  }
}

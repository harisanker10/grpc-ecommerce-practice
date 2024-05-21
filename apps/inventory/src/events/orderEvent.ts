export class OrderEvent {
  constructor(public readonly data: any) {}

  toString() {
    return JSON.stringify(this.data);
  }
}

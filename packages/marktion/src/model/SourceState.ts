export class SourceState {
  constructor(public source: string) {
    this.source = source
  }

  getSource() {
    return this.source
  }

  static create(source: string) {
    return new SourceState(source)
  }
}

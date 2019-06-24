class Exception {
  constructor(message) {
    this.message = message;
  }
}

class NoGuiException {
  constructor(message) {
    super(message);
    this.name = "NoGuiExcetion";
  }
}

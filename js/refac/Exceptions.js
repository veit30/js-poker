class Exception {
  constructor(message) {
    this.message = message;
  }
}

class NoGuiException extends Exception{
  constructor(message) {
    super(message);
    this.name = "NoGuiExcetion";
  }
}

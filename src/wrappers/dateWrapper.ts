/**
 * A utility function for easier testability of "now".
 * Thank you Varun Jayaraman for teaching me this.
 */
class DateWrapper {
  public static createDate = (): Date => new Date();
}

export default DateWrapper;

using System;

public class ParseError : Exception {
    public ParseError(String message) {
        base(message);
    }
}

package eggtalk.eggtalk.exception;

public class NotFoundRequestException extends RuntimeException {
    public NotFoundRequestException() {
        super();
    }
    public NotFoundRequestException(String message, Throwable cause) {
        super(message, cause);
    }
    public NotFoundRequestException(String message) {
        super(message);
    }
    public NotFoundRequestException(Throwable cause) {
        super(cause);
    }
}
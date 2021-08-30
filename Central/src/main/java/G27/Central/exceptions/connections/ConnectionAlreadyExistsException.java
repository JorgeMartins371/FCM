package G27.Central.exceptions.connections;

public class ConnectionAlreadyExistsException extends RuntimeException {
    private String message;

    public ConnectionAlreadyExistsException(String message){
        super(message);
        this.message = message;
    }

    public ConnectionAlreadyExistsException(){

    }
}

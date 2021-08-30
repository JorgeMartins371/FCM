package G27.Central.exceptions.user;

public class UserNotFoundException extends RuntimeException {
    private String message;

    public UserNotFoundException(String message){
        super(message);
        this.message = message;
    }

    public UserNotFoundException(){

    }
}

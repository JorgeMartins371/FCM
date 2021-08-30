package G27.Central.exceptions.user;

public class SelfDeleteException extends RuntimeException {
    private String message;

    public SelfDeleteException(String message){
        super(message);
        this.message = message;
    }

    public SelfDeleteException(){

    }
}

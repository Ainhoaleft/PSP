import java.util.Random;

public class RangoNumeros implements Runnable {
    private int n1;
    private int n2;

    public RangoNumeros(int n1, int n2){
        this.n1 = n1;
        this.n2 = n2;
    }
    @Override
    public void run(){
        Random random = new Random();
        for(int i = n1; i <= n2; i++){
            System.out.println(i);
        }try {
            Thread.sleep(random.nextInt(1000)+1);
        } catch (InterruptedException e) {
            e.printStackTrace();
        }
    }
}


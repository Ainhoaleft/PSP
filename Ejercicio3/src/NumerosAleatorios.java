import java.util.Random;

public class NumerosAleatorios implements Runnable{
    private int n;
    private Random random;

    public NumerosAleatorios(int n){
        this.n = n;
        this.random = new Random();
    }

    public void run() {
        int randomNumber = random.nextInt(100) + 1;
        System.out.println(Thread.currentThread().getName() + " generó el número " + randomNumber);
        System.out.println("Hilo 2: " + n + " Mostrando primos hasta el " + randomNumber);
        for (int i = 1; i <= randomNumber; i++) {
            if (esPrimo(i)) {
                System.out.println(Thread.currentThread().getName() + " - Número primo: " + i);
                System.out.println("Hilo 2: " + n + i);
                try {
                    Thread.sleep(random.nextInt((1000 - 500) + 1) + 500);
                } catch (InterruptedException e) {
                    System.out.println(Thread.currentThread().getName() + " fue interrumpido.");;
                }
            }
        }
    }
    private boolean esPrimo(int number) {
        if (number <= 1) {
            return false;
        }
        for (int i = 2; i <= Math.sqrt(number); i++) {
            if (number % i == 0) {
                return false;
            }
        }
        return true;
    }
}
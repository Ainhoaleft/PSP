import java.util.ArrayList;
import java.util.List;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) throws InterruptedException {
        Scanner scanner = new Scanner(System.in);
        List<Thread> threads = new ArrayList<>();

        System.out.println("Introduce el numero de hilos a crear: ");
        int n = new Scanner(System.in).nextInt();


        for (int i = 1; i <= n; i++) {
            Thread t = new Thread(new NumerosAleatorios(n));
            t.start();
        }
        boolean threadsAlive = true;
        while (threadsAlive) {
            threadsAlive = false;
            for (Thread thread : threads) {
                if (thread.isAlive()) {
                    threadsAlive = true;
                    System.out.println("ID: " + thread.getId() + ", Nombre: " + thread.getName() + ", Estado: " + thread.getState());
                }
            }

            Thread.sleep(1000);
        }
    }
}
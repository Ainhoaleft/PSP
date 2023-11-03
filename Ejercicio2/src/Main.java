import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Introduce el numero de hilos a crear: ");
        int n = new Scanner(System.in).nextInt();

        for (int i = 1; i <= n; i++) {
            Thread t = new Thread(new NumerosAleatorios(n));
            t.start();
        }
    }
}
package Lambda;

import java.util.Random;
import java.util.Scanner;
import java.util.TreeMap;

public class Main {
    public static void main(String[] args) {

        Scanner scanner = new Scanner(System.in);

        System.out.println("Ingrese un numero n1:");
        int n1 = new Scanner(System.in).nextInt();

        System.out.println("Ingrese un numero n2:");
        int n2 = new Scanner(System.in).nextInt();

        Thread t = new Thread(() -> {
            Random random = new Random();
            for (int i = n1; i <= n2; i++) {
                System.out.println(i);
                try {
                    // Suspender el hilo de forma aleatoria entre 1 y 1000 milisegundos
                    Thread.sleep(random.nextInt(1000) + 1);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        });

        t.start();

       System.out.println("El hilo se ha lanzado");

    }
}
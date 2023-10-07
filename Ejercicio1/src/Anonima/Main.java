package Anonima;

import java.util.Random;
import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Ingrese un numero n1:");
        int n1 = new Scanner(System.in).nextInt();

        System.out.println("Ingrese un numero n2:");
        int n2 = new Scanner(System.in).nextInt();

        Runnable r = new Runnable() {
            @Override
            public void run() {
                Random random = new Random();
                for (int i = n1; i <= n2; i++) {
                    System.out.println(i);
                }
                try {
                    Thread.sleep(random.nextInt(1000) + 1);
                } catch (InterruptedException e) {
                    e.printStackTrace();
                }
            }
        };

       Thread t = new Thread(r);
       t.start();

       System.out.println("El hilo se ha lanzado");

    }
}
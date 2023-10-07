import java.util.Scanner;

public class Main {
    public static void main(String[] args) {
        Scanner scanner = new Scanner(System.in);

        System.out.println("Ingrese un numero n1:");
        int n1 = new Scanner(System.in).nextInt();

        System.out.println("Ingrese un numero n2:");
        int n2 = new Scanner(System.in).nextInt();

       Thread t = new Thread(new RangoNumeros(n1, n2));
       t.start();

       System.out.println("El hilo se ha lanzado");

    }
}
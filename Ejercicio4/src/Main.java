import java.util.Random;
import java.util.Scanner;
import java.util.concurrent.atomic.AtomicBoolean;

public class Main {
    public static void main(String[] args) {

        // Elegir un número aleatorio entre 10 y 20
        int randomStopNumber = new Random().nextInt(11) + 10;
        System.out.println("Intenta detener el contador en el número " + randomStopNumber + ".");

        // Crear el objeto Runnable
        CounterRunnable counterRunnable = new CounterRunnable();
        Thread counterThread = new Thread(counterRunnable);
        counterThread.start();

        // Pedir al usuario que presione Enter para detener el contador
        Scanner scanner = new Scanner(System.in);
        scanner.nextLine();
        counterRunnable.stopCounting();

        // Obtener el número en el que se detuvo el contador
        int stoppedAt = counterRunnable.getCounter();
        System.out.println("Detuviste el contador en: " + stoppedAt);

        if (stoppedAt == randomStopNumber) {
            System.out.println("¡Ganaste! Detuviste el contador exactamente en " + stoppedAt + ".");
        } else {
            System.out.println("Perdiste. El contador se detuvo en " + stoppedAt + ".");
        }

        scanner.close();
    }
}
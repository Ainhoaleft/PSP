import java.util.concurrent.atomic.AtomicBoolean;

public class CounterRunnable implements Runnable{
    private volatile boolean running = true;
    private int counter = 0;

    public void stopCounting() {
        running = false;
    }

    public int getCounter() {
        return counter;
    }

    @Override
    public void run() {
        while (running) {
            counter++;
            if (counter <= 5) {
                System.out.println(counter);
            }

            try {
                Thread.sleep(1000);
            } catch (InterruptedException e) {
                Thread.currentThread().interrupt();
            }

            if (counter == 20) { // Asegurarse de que el hilo no cuente indefinidamente
                running = false;
            }
        }
    }
}

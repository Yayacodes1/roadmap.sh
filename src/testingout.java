import java.util.ArrayList;
import java.util.Scanner;


public class testingout {

    static ArrayList<String> tasks  = new ArrayList<>();

    public static void main(String[] args) {

      Scanner scanner = new Scanner(System.in);
      while (true){
          System.out.println("Enter a task: ");
          String task = scanner.nextLine();

          if (task.equalsIgnoreCase("end")){
              break;
          }
          addTask(task);



      }
        System.out.println("Tasks added: " + tasks);



    }
    public static void addTask(String task) {


tasks.add(task);
    }

}

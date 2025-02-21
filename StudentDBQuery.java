import java.sql.*;

public class StudentDBQuery {
    public static void main(String[] args) {
        // Database credentials
        String url = "jdbc:mysql://localhost:3306/studentDB"; // Change database name if needed
        String user = "root";  // Change if needed
        String password = "root";  // Replace with your actual MySQL password

        // SQL Query
        String query = "SELECT * FROM Students";

        try {
            // Load MySQL JDBC Driver
            Class.forName("com.mysql.cj.jdbc.Driver");

            // Establish connection
            Connection conn = DriverManager.getConnection(url, user, password);
            Statement stmt = conn.createStatement();
            ResultSet rs = stmt.executeQuery(query);

            // Retrieve Metadata
            ResultSetMetaData metaData = rs.getMetaData();
            int columnCount = metaData.getColumnCount();
            
            System.out.println("Table Metadata:");
            for (int i = 1; i <= columnCount; i++) {
                System.out.println("Column " + i + ": " + metaData.getColumnName(i) + " (" + metaData.getColumnTypeName(i) + ")");
            }
            System.out.println("\nStudent Records:");

            // Retrieve and display records
            while (rs.next()) {
                int id = rs.getInt("ID");
                String name = rs.getString("Name");
                int age = rs.getInt("Age");
                String major = rs.getString("Major");

                System.out.println("ID: " + id + ", Name: " + name + ", Age: " + age + ", Major: " + major);
            }

            // Close resources
            rs.close();
            stmt.close();
            conn.close();

        } catch (ClassNotFoundException e) {
            System.out.println("MySQL JDBC Driver not found. Add the driver to your classpath.");
            e.printStackTrace();
        } catch (SQLException e) {
            System.out.println("Database error! Check if studentDB and Students table exist.");
            e.printStackTrace();
        }
    }
}

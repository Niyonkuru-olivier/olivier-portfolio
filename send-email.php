<?php
// Database connection
$conn = mysqli_connect("localhost", "root", "", "contact");

// Check connection
if (!$conn) {
    die("Connection error: " . mysqli_connect_error());
}

// Check if POST data exists (validate form data)
if (isset($_POST["name"]) && isset($_POST["email"]) && isset($_POST["reason"]) && isset($_POST["message"])) {
    // Sanitize input data to prevent SQL injection
    $name = mysqli_real_escape_string($conn, $_POST["name"]);
    $email = mysqli_real_escape_string($conn, $_POST["email"]);
    $reason = mysqli_real_escape_string($conn, $_POST["reason"]);
    $message = mysqli_real_escape_string($conn, $_POST["message"]);

    // Prepare the SQL statement
    $sql = "INSERT INTO contact (name, email, reason, message) VALUES (?, ?, ?, ?)";
    $stmt = mysqli_prepare($conn, $sql);

    if ($stmt) {
        // Bind the sanitized input to the prepared statement
        mysqli_stmt_bind_param($stmt, "ssss", $name, $email, $reason, $message);
        
        // Execute the statement
        if (mysqli_stmt_execute($stmt)) {
            // Database insertion successful, now send email
            $to = "oniyonkuru44@gmail.com"; // Your email address
            $subject = "New Message from $name - $reason";
            $email_body = "
            You have received a new message from your contact form:

            Name: $name
            Email: $email
            Reason: $reason

            Message:
            $message
            ";

            // Email headers
            $headers = "From: $email\r\n";
            $headers .= "Reply-To: $email\r\n";
            $headers .= "Content-Type: text/plain; charset=UTF-8\r\n";

            // Send email
            if (mail($to, $subject, $email_body, $headers)) {
                echo "Message submitted and email sent successfully!";
            } else {
                echo "Message saved, but email failed to send.";
            }
        } else {
            die("Error inserting data: " . mysqli_error($conn));
        }

        // Close the prepared statement
        mysqli_stmt_close($stmt);
    } else {
        die("SQL preparation error: " . mysqli_error($conn));
    }

} else {
    die("Form data not set. Please ensure all fields are filled.");
}

// Close the database connection
mysqli_close($conn);
?>






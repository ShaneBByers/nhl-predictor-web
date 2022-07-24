<?php
    $json_body = file_get_contents('php://input');
    $body = json_decode($json_body, true);
    $db_login = $body['databaseLogin'];
    $connection = new mysqli($db_login['serverName'], $db_login['username'], $db_login['password'], $db_login['databaseName']);
    if (!$connection->connect_error)
    {
        try
        {
            $query_result = $connection->query($body['queryList'][0]);
            
            $row_count = $query_result->num_rows;
            
            $results_array = array();
            while ($row = $query_result->fetch_assoc())
            {
                $results_array[] = $row;
            }
            echo json_encode($results_array);
        }
        catch (\Throwable $e)
        {
            $connection->rollback();
            echo $e;
        }
    }
    else
    {
        echo $connection->connect_error;
    }
    $connection->close();
?>

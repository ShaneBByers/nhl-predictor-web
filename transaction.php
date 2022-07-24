<?php
    $json_body = file_get_contents('php://input');
    $body = json_decode($json_body, true);
    $db_login = $body['databaseLogin'];
    $connection = new mysqli($db_login['serverName'], $db_login['username'], $db_login['password'], $db_login['databaseName']);
    if (!$connection->connect_error)
    {
        $row_count = 0;
        try
        {
            $connection->begin_transaction();
            foreach ($body['queryList'] as $query)
            {
                $connection->query($query);
                $row_count = $row_count + $connection->affected_rows;
            }
            $connection->commit();
        }
        catch (\Throwable $e)
        {
            $connection->rollback();
            echo $e;
        }
        echo $row_count;
    }
    else
    {
        echo $connection->connect_error;
    }
    $connection->close();
?>

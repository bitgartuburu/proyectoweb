<!DOCTYPE html>
<html lang="es">
<head>
    <meta charset="UTF-8">
    <title>Mi Primera Página PHP</title>
    <style>
        body { font-family: Arial, sans-serif; text-align: center; margin-top: 50px; }
        .mensaje { color: #2c3e50; font-size: 24px; }
    </style>
</head>
<body>

    <h1>Bienvenido a mi sitio web</h1>

    <div class="mensaje">
        <?php
            // Esto es código PHP
            $nombre = "Invitado"; 
            echo "Hola, " . $nombre . ". ¡Qué gusto verte!";
        ?>
    </div>

    <p>La fecha y hora actual es: <strong><?php echo date("d/m/Y H:i:s"); ?></strong></p>

</body>
</html>
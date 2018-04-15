<?php

function newText($im, $size, $angle= 0, $x, $y, $color, $font, $text,$align = "left",$border=false,$width=0,$height=0){
    if($align == "center")
    {
        if ($border == true ){
           imagerectangle($im, $x, $y, $x +$width, $y + $height, $color);
        }
        $bbox = imageftbbox($size, 0, $font, $text);

        // Marcamos el ancho y alto
        $s_width  = $bbox[4];
        $s_height = $bbox[5];  
        
        $y = $y + ($height-$s_height)/2;
        $x = $x + ($width-$s_width)/2;

    }
     
    imagettftext($im, $size, $angle, $x, $y, $color, $font, $text);
}

//header("Content-type: image/jpeg");

$img = imagecreatefromjpeg("../img/bg.jpg");

// Crear una imagen de 300x100
$rojo = imagecolorallocate($img, 255, 0, 0);
$blanco = imagecolorallocate($img, 255, 255, 255);
$archivo_fuente = '../fonts/bebasneue-bold.ttf';

//imagefttext($imagen, $tamaño, $angulo, $x, $y, $color, $fuente)
//$texto = imagefttext($img, 22, 0, 105, 55, $blanco, $archivo_fuente, 'Ya tienes' . PHP_EOL . 'Información Disponible');

imagerectangle($img, 280, 100, 595, 180, $blanco);

ob_start();
var_dump($imgbox);
$salida = ob_get_clean();
file_put_contents("debug.json", date("d-m-Y H:i") . "\n\n" . $salida);

// Imprimir la imagen al navegador
header('Content-Type: image/jpeg');

imagejpeg($img, NULL, 99);
imagedestroy($img);
<?php

namespace App\Utils;
use \stdClass;

class Serialize {
    public function serialize($arrayOfUnserializedElements) {
        $serializationArray = array();
        $serializationObject = new stdClass();

        foreach ($arrayOfUnserializedElements as $key=>$value) {
            $serializationArray[$key] = $key;
            $serializationObject->$key = $value;
        }

        return [ "elements"=>$serializationArray, "elementsById"=>$serializationObject ];
    }
}


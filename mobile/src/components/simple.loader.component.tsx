import * as Animatable from "react-native-animatable";
import React from "react";

export default function SimpleAnimatable() {
  return (
    <Animatable.View>
      <Animatable.Text
        animation="flash"
        iterationCount={"infinite"}
        direction="normal"
      >
        Loading..
      </Animatable.Text>
    </Animatable.View>
  );
}

import React, { useState, useEffect } from "react";
import {
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  Dimensions,
} from "react-native";
import { Camera } from "expo-camera";
import { Entypo } from "@expo/vector-icons";
import { MaterialIcons } from "@expo/vector-icons";
import DisplayPhoto from "./displayPhoto";
let ScreenHeight = Dimensions.get("window").height - 110;

export default function CameraLab(props) {
  const [hasPermission, setHasPermission] = useState(null);
  const [type, setType] = useState(Camera.Constants.Type.back);
  const [photo, setPhoto] = useState(undefined);
  const [capturedPhoto, setCapturedPhoto] = useState();
  useEffect(() => {
    (async () => {
      const { status } = await Camera.requestPermissionsAsync();
      setHasPermission(status === "granted");
    })();
  }, []);

  async function takePicture() {
    if (camera) {
      let photo = await camera.takePictureAsync();
      setPhoto(photo.uri);
      setCapturedPhoto(true);
    }
  }
  {
    hasPermission === null && <View />;
  }
  {
    hasPermission === false && <Text>No access to camera</Text>;
  }
  return (
    <>
      {capturedPhoto ? (
        <DisplayPhoto photo={photo} setCapturedPhoto={setCapturedPhoto} />
      ) : (
        <>
          <TouchableOpacity
            style={styles.homeButton}
            onPress={() => {
              props.setCamera(false);
            }}
          >
            <Text style={styles.buttonText}>
              <MaterialIcons name="home" size={25} />
            </Text>
          </TouchableOpacity>
          <Camera
            style={styles.camera}
            type={type}
            ref={(ref) => {
              camera = ref;
            }}
          >
            <View style={styles.cameraContainer}>
              <View style={styles.buttonContainer}>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setType(Camera.Constants.Type.back)}
                >
                  <Text style={styles.buttonText}>
                    <MaterialIcons name="camera-rear" size={25} />
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.button} onPress={takePicture}>
                  <Text style={styles.buttonText}>
                    <Entypo name="camera" size={25} />
                  </Text>
                </TouchableOpacity>
                <TouchableOpacity
                  style={styles.button}
                  onPress={() => setType(Camera.Constants.Type.front)}
                >
                  <Text style={styles.buttonText}>
                    <MaterialIcons name="camera-front" size={25} />
                  </Text>
                </TouchableOpacity>
              </View>
            </View>
          </Camera>
        </>
      )}
    </>
  );
}
const styles = StyleSheet.create({
  camera: {
    flex: 1,
    width: "100%",
    height: ScreenHeight,
  },
  cameraContainer: {
    flex: 1,
    backgroundColor: "transparent",
    flexDirection: "row",
  },
  buttonContainer: {
    flex: 1,
    alignSelf: "flex-end",
    backgroundColor: "#393e46",
    flexDirection: "row",
    justifyContent: "space-around",
  },
  button: {
    padding: 15,
  },
  homeButton: {
    alignItems: "center",
    backgroundColor: "#393e46",
    padding: 10,
  },
  buttonText: {
    color: "white",
  },
});

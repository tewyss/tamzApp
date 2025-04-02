import React, { useEffect, useRef } from "react";
import { Animated, Image, StyleSheet, Dimensions } from "react-native";
import { Audio } from "expo-av";

interface Props {
  trigger: boolean;
  onFinish?: () => void;
}

const CoinAnimation: React.FC<Props> = ({ trigger, onFinish }) => {
  const scale = useRef(new Animated.Value(0)).current;
  const rotate = useRef(new Animated.Value(0)).current;
  const opacity = useRef(new Animated.Value(0)).current;

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require("../../assets/sounds/coin.mp3")
    );
    await sound.playAsync();
  };

  useEffect(() => {
    if (trigger) {
      scale.setValue(0);
      rotate.setValue(0);
      opacity.setValue(1);

      playSound();

      Animated.parallel([
        Animated.sequence([
          Animated.timing(scale, {
            toValue: 1.75,
            duration: 800,
            useNativeDriver: true,
          }),
          Animated.timing(scale, {
            toValue: 0,
            duration: 800,
            useNativeDriver: true,
          }),
        ]),
        Animated.timing(rotate, {
          toValue: 1,
          duration: 1800,
          useNativeDriver: true,
        }),
      ]).start(() => {
        opacity.setValue(0);
        rotate.setValue(0);
        if (onFinish) onFinish();
      });
    }
  }, [trigger]);

  const rotateInterpolate = rotate.interpolate({
    inputRange: [0, 1],
    outputRange: ["0deg", "1080deg"],
  });

  return (
    <Animated.View
      style={[
        styles.wrapper,
        {
          opacity,
          transform: [{ scale }, { rotate: rotateInterpolate }],
        },
      ]}
      pointerEvents="none">
      <Image
        source={require("../../assets/images/coin.png")}
        style={styles.coin}
        resizeMode="contain"
      />
    </Animated.View>
  );
};

const { width, height } = Dimensions.get("window");

const styles = StyleSheet.create({
  wrapper: {
    position: "absolute",
    top: height / 2 - 150,
    left: width / 2 - 150,
    width: 300,
    height: 300,
    justifyContent: "center",
    alignItems: "center",
    zIndex: 999,
  },
  coin: {
    width: 300,
    height: 300,
  },
});

export default CoinAnimation;

/* /src/components/TabBar.js */

import React from "react";

import {
  View,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  Animated,
  Text
} from "react-native";

const { width } = Dimensions.get("window");

const Styles = StyleSheet.create({
  container: { flexDirection: "row", height: 52, elevation: 2 },
  tabButton: {
    flex: 1,
    justifyContent: "space-around",
    alignItems: "center",
    flexDirection: "row-reverse"
  },
  textStyle: {
    color: "gray",
    fontSize: 13
  }
});

const TabBar = props => {
  const {
    renderIcon,
    getLabelText,
    activeTintColor,
    inactiveTintColor,
    onTabPress,
    onTabLongPress,
    getAccessibilityLabel,
    navigation
  } = props;

  const { routes, index: activeRouteIndex } = navigation.state;

  let type = "slideInUp";

  let animationValue = new Animated.Value(activeRouteIndex);

  return (
    <View style={Styles.container}>
      <Animated.View
        style={[
          StyleSheet.absoluteFill,
          {
            borderRadius: 25,
            backgroundColor: "#c6c9ce",
            width: width / 3,
            height: 48,
            top: 2,
            opacity: 0.5
          },
          {
            transform: [
              {
                translateX: animationValue.interpolate({
                  inputRange: [0, 1, 2],
                  outputRange: [0, width / 3, (width / 3) * 2]
                })
              }
            ]
          }
        ]}
      />
      {routes.map((route, routeIndex) => {
        const isRouteActive = routeIndex === activeRouteIndex;
        const tintColor = isRouteActive ? activeTintColor : inactiveTintColor;
        return (
          <TouchableOpacity
            key={routeIndex}
            style={[Styles.tabButton]}
            onPress={() => {
              Animated.timing(animationValue, {
                toValue: routeIndex,
                duration: 500,
                useNativeDriver: true
              }).start(() => {
                onTabPress({ route });
              });
            }}
            onLongPress={() => {
              onTabLongPress({ route });
            }}
            accessibilityLabel={getAccessibilityLabel({ route })}
          >
            {isRouteActive ? (
              <View style={Styles.tabButton}>
                {renderIcon({ route, focused: isRouteActive, tintColor })}
                <Text style={Styles.textStyle}>{getLabelText({ route })}</Text>
              </View>
            ) : (
              <View>
                {renderIcon({ route, focused: isRouteActive, tintColor })}
              </View>
            )}
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

export default TabBar;

import React from 'react';
import { View } from 'react-native';
import styled from 'styled-components/native';
import Animated, {
  interpolate,
  useAnimatedStyle,
  useDerivedValue,
  withTiming,
} from 'react-native-reanimated';

type ProgressBarProps = {
  step: number;
  totalSteps: number;
};

export const ProgressBar: React.FC<ProgressBarProps> = ({
  step,
  totalSteps,
}) => {
  const progress = step / totalSteps;

  const animatedProgress = useDerivedValue(() =>
    withTiming(progress, { duration: 300 }),
  );

  const animatedStyle = useAnimatedStyle(() => {
    const width = interpolate(animatedProgress.value, [0, 1], [0, 100]);

    return {
      width: `${width}%`,
    };
  });

  return (
    <ProgressBarWrapper>
      <ProgressBarFill style={animatedStyle} />
    </ProgressBarWrapper>
  );
};

const ProgressBarWrapper = styled(View)`
  height: 4px;
  background-color: #ccc;
  border-radius: 2px;
  margin-vertical: 12px;
`;

const ProgressBarFill = styled(Animated.View)`
  height: 100%;
  background-color: #f63501;
  border-radius: 2px;
`;

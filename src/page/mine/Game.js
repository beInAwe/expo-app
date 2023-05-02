import React, { useState } from 'react';
import { View, Text, TouchableOpacity } from 'react-native';

const Game = () => {
  const [score, setScore] = useState(0);

  const handlePress = () => {
    // 每次点击分数加一
    setScore(score + 1);
  };

  return (
    <View>
      <Text style={{ fontSize: 24, fontWeight: 'bold' }}>简易小游戏</Text>
      <Text style={{ fontSize: 18 }}>当前分数：{score}</Text>
      <TouchableOpacity onPress={handlePress}>
        <Text style={{ fontSize: 24 }}>点击加分</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Game;

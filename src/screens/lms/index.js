import * as IMG from 'assets/images';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React from 'react';
import {
  Image,
  ScrollView,
  TouchableOpacity,
  View,
  Dimensions,
  Animated,
  Easing
} from 'react-native';
import styles from './styles';
import {navigate} from 'navigation/navigation-ref';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import Medium from 'typography/medium-text';
import LinearGradient from 'react-native-linear-gradient';

const {width} = Dimensions.get('window');
const CARD_WIDTH = (width - mvs(60)) / 2;

const Lms = props => {
  const menuItems = [
    {
      id: 1,
      title: 'Lectures Notes',
      icon: IMG.notes,
      route: 'LectureNotes',
      description: 'Access all course materials'
    },
    {
      id: 2,
      title: 'Video Tutorials',
      icon: IMG.video,
      route: 'VideoTutorials',
      description: 'Learn with video content'
    },
    {
      id: 3,
      title: 'Assignment',
      icon: IMG.assignment,
      route: 'Assignment',
      description: 'Submit your assignments'
    },
    {
      id: 4,
      title: 'Quiz',
      icon: IMG.quiz,
      route: 'Quiz',
      description: 'Test your knowledge'
    }
  ];

  const renderMenuItem = (item, index) => (
    <TouchableOpacity
      key={item?.id}
      style={styles.menuItem}
      onPress={() => navigate(item?.route)}
      activeOpacity={0.9}>
      <View style={styles.card}>
        <View style={styles.iconContainer}>
          <Image source={item?.icon} style={styles.image} />
        </View>
        <Medium
          label={item?.title}
          fontSize={mvs(16)}
          color={colors.primary}
          style={styles.menuTitle}
          numberOfLines={2}
        />
      </View>
    </TouchableOpacity>
  );

  return (
    <View style={styles.container}>
     
        <Header1x2x
          title={'Learning Management System'}
          style={styles.header}
          titleStyle={styles.headerTitle}
        />
      
      <ScrollView
        contentContainerStyle={styles.scrollContent}
        showsVerticalScrollIndicator={false}>
        <View style={styles.welcomeContainer}>
          <Medium
            label="Welcome to LMS"
            fontSize={mvs(20)}
            color={colors.primary}
            style={styles.welcomeTitle}
          />
          <Medium
            label="Access all your learning materials in one place"
            fontSize={mvs(14)}
            color={colors.placeholder}
            style={styles.welcomeSubtitle}
            numberOfLines={2}
          />
        </View>
        
        <View style={styles.gridContainer}>
          {menuItems.map((item, index) => renderMenuItem(item, index))}
        </View>
      </ScrollView>
    </View>
  );
};

export default Lms;
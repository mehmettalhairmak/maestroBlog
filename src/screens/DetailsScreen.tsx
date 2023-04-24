import React, { useEffect } from 'react';
import { Dimensions, Image, ScrollView, View } from 'react-native';
import RenderHTML from 'react-native-render-html';
import { useBlogs } from '../hooks/contextHook';

const height = Dimensions.get('window').height;

const DetailsScreen = () => {
  const { selectedBlog, blogsDispatch } = useBlogs();

  useEffect(() => {
    return () => {
      blogsDispatch({ type: 'SET_SELECTED_BLOG', payload: null });
    };
  }, []);

  return (
    <View style={{ flex: 1 }}>
      <ScrollView style={{ flex: 1 }}>
        <Image
          resizeMode="contain"
          source={{ uri: selectedBlog!.image }}
          style={{ width: '100%', height: height / 4 }}
        />
        <View style={{ padding: 10 }}>
          <RenderHTML
            source={{ html: selectedBlog!.content }}
            contentWidth={Dimensions.get('window').width}
          />
        </View>
      </ScrollView>
    </View>
  );
};

export default DetailsScreen;

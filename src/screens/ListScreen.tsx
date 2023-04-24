import React, { useEffect, useState } from 'react';
import {
  Text,
  View,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  Image,
  Dimensions,
  ActivityIndicator,
  RefreshControl,
} from 'react-native';
import useApiHelper from '../hooks/apiHook';
import { useBlogs } from '../hooks/contextHook';
import { ResultModel } from '../models/BlogsModel';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParams } from '../navigation/NavigationParams';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const ListScreen = () => {
  const navigation =
    useNavigation<NativeStackNavigationProp<RootStackParams>>();

  const [page, setPage] = useState<number>(1);
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [lastPage, setLastPage] = useState<boolean>(false);

  const { blogs, selectedBlog, blogsDispatch } = useBlogs();

  useEffect(() => {
    (async () => {
      fetchBlogs(page).then(response =>
        blogsDispatch({ type: 'SET_BLOGS', payload: response }),
      );
    })();
  }, []);

  useEffect(() => {
    if (page > 1) {
      fetchBlogs(page).then(response => {
        if (response.result.length > 0) {
          setLastPage(false);
          blogsDispatch({ type: 'ADD_BLOGS', payload: response.result });
        } else {
          setLastPage(true);
        }
      });
    }
  }, [page]);

  useEffect(() => {
    if (selectedBlog !== null) {
      navigation.navigate('DetailsScreen');
    }
  }, [selectedBlog]);

  const { fetchBlogs } = useApiHelper();

  const fetchMoreBlogs = async () => {
    setPage(page + 1);
  };

  const onRefresh = () => {
    setRefreshing(true);
    setLastPage(false);
    setPage(1);
    fetchBlogs(1).then(response => {
      blogsDispatch({ type: 'SET_BLOGS', payload: response });
      setRefreshing(false);
    });
  };

  const renderItem = ({ item }: { item: ResultModel }) => {
    return (
      <TouchableOpacity
        style={styles.listItemContainer}
        onPress={() =>
          blogsDispatch({ type: 'SET_SELECTED_BLOG', payload: item })
        }>
        {/* Banner & Title */}
        <View style={{ flex: 1, flexDirection: 'row', alignItems: 'center' }}>
          <View style={{ flex: 4 }}>
            <Image
              source={{ uri: item.banner }}
              resizeMode="contain"
              style={styles.blogBanner}
            />
          </View>
          <View style={{ flex: 6 }}>
            <Text style={styles.titleText}>{item.title}</Text>
          </View>
        </View>
        {/* Summary */}
        <View style={styles.summaryContainer}>
          <Text style={styles.summaryText}>{item.summary}</Text>
        </View>
        {/* Total Reading Time */}
        <View style={styles.totalReadingTimeContainer}>
          <Text style={styles.totalReadingTimeText}>
            Total Reading Time: {item.totalReadingTime} minute
          </Text>
        </View>
      </TouchableOpacity>
    );
  };

  const ListFooterComponent = () => {
    if (lastPage) {
      return (
        <View
          style={{
            height: 70,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <Text style={{ color: 'black' }}>No more blogs</Text>
        </View>
      );
    } else {
      return (
        <View
          style={{
            height: 70,
            justifyContent: 'center',
            alignItems: 'center',
          }}>
          <ActivityIndicator />
        </View>
      );
    }
  };

  if (!blogs.success) {
    return (
      <View style={styles.container}>
        <Text style={{ color: 'black' }}>Loading...</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <FlatList
        data={blogs.result}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderItem}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
        onEndReached={fetchMoreBlogs}
        onEndReachedThreshold={0.2}
        ListFooterComponent={ListFooterComponent}
      />
    </View>
  );
};

export default ListScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  blogBanner: {
    width: width * 0.4,
    height: height * 0.13,
    marginLeft: 10,
  },
  listItemContainer: {
    flex: 1,
    alignItems: 'center',
    backgroundColor: '#F1F6F9',
    borderBottomWidth: 0.5,
  },
  titleText: {
    marginHorizontal: 10,
    flexWrap: 'wrap',
    paddingLeft: 10,
    fontSize: 20,
    color: 'black',
    fontWeight: '600',
  },
  summaryContainer: {
    flex: 1,
    backgroundColor: '#FFFF',
    borderWidth: 0.5,
    borderRadius: 15,
    marginVertical: 40,
    marginHorizontal: 20,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },
  summaryText: {
    color: 'black',
  },
  totalReadingTimeContainer: {
    flex: 1,
    width: '100%',
    paddingBottom: 10,
    paddingHorizontal: 10,
    alignItems: 'flex-end',
  },
  totalReadingTimeText: {
    color: 'black',
  },
});

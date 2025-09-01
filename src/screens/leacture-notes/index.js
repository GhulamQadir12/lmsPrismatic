import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React, {useEffect} from 'react';
import {
  View,
} from 'react-native';
import {
  getLectures,
} from 'services/api/auth-api-actions';
import styles from './styles';
import Header1x2x from 'components/atoms/headers/header-1x-2x';
import {Row} from 'components/atoms/row';
import Bold from 'typography/bold-text';
import {useIsFocused} from '@react-navigation/native';
import CustomFlatList from 'components/atoms/custom-flatlist';
import {Loader} from 'components/atoms/loader';
import LectureNotesCard from 'components/molecules/lecture-notes-card';

const LectureNotes = props => {
  const [loading, setLoading] = React.useState(false);
  const [lectures, setLectures] = React.useState([]);
  const [page, setPage] = React.useState(1);
  const [hasNextPage, setHasNextPage] = React.useState(true);
  const [loadingMore, setLoadingMore] = React.useState(false);
const [expandedId, setExpandedId] = React.useState(null);
  const [total, setTotal] = React.useState(0);
  const isFocused = useIsFocused();

  const fetchLectureList = async (pageNum = 1) => {
    try {
      if (pageNum === 1) setLoading(true);
      else setLoadingMore(true);

      const response = await getLectures(pageNum);
      console.log("console")
      const newLectures = response?.lectures || [];

      if (pageNum === 1) {
        setLectures(newLectures);
        setTotal(response?.total_lectures || 0);
      } else {
        setLectures(prev => [...prev, ...newLectures]);
      }

      // handle pagination
      const pagination = response?.pagination;
      setHasNextPage(pagination?.next_page_url !== null);
      setPage(pagination?.current_page || 1);
    } catch (err) {
      console.error('Failed to fetch data', err);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  useEffect(() => {
    if (isFocused) {
      fetchLectureList(); // Fetch data on component mount
    }
  }, [isFocused]);

  const renderItem = ({item, index}) => (
    <LectureNotesCard item={item} questionNumber={index + 1}  isExpanded={expandedId === item.id}
    onToggle={() => handleToggle(item.id)}/>
  );
useEffect(() => {
  if (lectures.length > 0 && expandedId === null) {
    setExpandedId(lectures[0]?.id);
  }
}, [lectures]);

const handleToggle = (itemId) => {
  setExpandedId(prevId => prevId === itemId ? null : itemId);
};

  return (
    <View style={styles.container}>
      <Header1x2x back={true} title={'Uploaded Lectures'} />
      <View
             style={{
               marginHorizontal: mvs(20),
               marginVertical: mvs(10),
               alignSelf:'center'
             }}>
             <Bold
               label={`${total} Total Lectures`}
               color={colors.primary}
               fontSize={mvs(20)}
             />
     
           </View>

      {loading ? (
        <Loader />
      ) : (
        <CustomFlatList
          showsVerticalScrollIndicator={false}
          data={lectures || []}
          renderItem={renderItem}
          contentContainerStyle={{
            paddingBottom: mvs(70),
          }}
          onEndReached={() => {
            if (!loadingMore && hasNextPage) {
              fetchLectureList(page + 1);
            }
          }}
          onEndReachedThreshold={0.5}
          ListFooterComponent={loadingMore ? <Loader /> : null}
        />
      )}
    </View>
  );
};
export default LectureNotes;

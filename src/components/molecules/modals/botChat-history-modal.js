import React from 'react';
import {CrossModal} from 'assets/icons';
import {Loader} from 'components/atoms/loader';
import {ModalWrapper} from 'components/atoms/modal-wrapper';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import {t} from 'i18next';
import {
  ScrollView,
  StyleSheet,
  TouchableOpacity,
  View,
  Animated,
} from 'react-native';
import Bold from 'typography/bold-text';
import {getChatHistory} from 'services/api/chat-api-actions';
import ChatListCard from '../chat-list-card';
import CustomFlatList from 'components/atoms/custom-flatlist';
import Medium from 'typography/medium-text';
import {RefreshControl} from 'react-native';
import Regular from 'typography/regular-text';

const BotChatHistoryModal = ({
  visible = false,
  onClose = () => {},
  onSelectChat = () => {},
  onNewChat = () => {}, // Add this prop
}) => {
  const slideAnim = React.useRef(new Animated.Value(-300)).current;
  const [chatHistory, setChatHistory] = React.useState([]);
  const [loading, setLoading] = React.useState(false);
  const [refreshing, setRefreshing] = React.useState(false);
  const [loadingMore, setLoadingMore] = React.useState(false);
  const [pagination, setPagination] = React.useState({
    current_page: 1,
    last_page: 1,
    next_page_url: null,
    total: 0,
  });

  React.useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start();
      fetchChatHistory(1);
    } else {
      Animated.timing(slideAnim, {
        toValue: -300,
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const handleNewChat = () => {
    onNewChat(); // Call the parent's new chat handler
    onClose(); // Close the modal
  };

  const fetchChatHistory = async (page = 1) => {
    try {
      if (page === 1) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      console.log(`Fetching page ${page}`); // Debug log
      const response = await getChatHistory(page);
      console.log('API Response:', response); // Debug log

      if (response?.status) {
        if (page === 1) {
          setChatHistory(response?.data?.data || []);
        } else {
          setChatHistory(prev => [...prev, ...(response?.data?.data || [])]);
        }
        setPagination({
          current_page: response?.data?.current_page || 1,
          last_page: response?.data?.last_page || 1,
          next_page_url: response?.data?.next_page_url || null,
          total: response?.data?.total || 0,
        });
      }
    } catch (error) {
      console.log('Error fetching chat history:', error);
    } finally {
      setLoading(false);
      setLoadingMore(false);
    }
  };

  const handleLoadMore = React.useCallback(() => {
    console.log('Load more conditions:', {
      notLoading: !loading && !loadingMore,
      hasMorePages: pagination.current_page < pagination.last_page,
      hasItems: chatHistory.length > 0,
      shouldFetch:
        !loading &&
        !loadingMore &&
        pagination.current_page < pagination.last_page &&
        chatHistory.length > 0,
    });

    if (
      !loading &&
      !loadingMore &&
      pagination.current_page < pagination.last_page
    ) {
      console.log(`Fetching page ${pagination.current_page + 1}`);
      fetchChatHistory(pagination.current_page + 1);
    }
  }, [
    loading,
    loadingMore,
    pagination.current_page,
    pagination.last_page,
    chatHistory.length,
  ]);

  const handleChatSelect = chat => {
    onSelectChat(chat);
    onClose();
  };

  const renderChatItem = ({item}) => (
    <ChatListCard item={item} onPress={() => handleChatSelect(item)} />
  );

  const onRefresh = async () => {
    try {
      setRefreshing(true);
      await fetchChatHistory(1);
    } catch (error) {
      console.error('Refresh error:', error);
    } finally {
      setRefreshing(false);
    }
  };

  return (
    <ModalWrapper
      onBackdropPress={onClose}
      onBackButtonPress={onClose}
      visible={visible}
      style={styles.contentContainerStyle}>
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{translateX: slideAnim}],
          },
        ]}>
        <View style={styles.listContainer}>
          <View
            style={{
              borderBottomWidth: 1,
              borderBottomColor: colors.border,
              padding: mvs(16),
            }}>
            <Row style={styles.header}>
              <Bold label={t('Chat History')} color={colors.primary} style={[styles.heading]} />
              <TouchableOpacity onPress={onClose} style={styles.cross}>
                <CrossModal />
              </TouchableOpacity>
            </Row>
            <TouchableOpacity
              onPress={handleNewChat}
              style={[styles.newChatButton, {backgroundColor: colors.primary}]}>
              <Regular
                label={t('New Chat')}
                style={{color: colors.white, fontSize: mvs(14)}}
              />
            </TouchableOpacity>
          </View>

          {loading ? (
            <Loader />
          ) : (
            <CustomFlatList
              data={chatHistory}
              renderItem={renderChatItem}
              contentContainerStyle={styles.listContent}
              keyExtractor={item => item.id.toString()}
              ItemSeparatorComponent={() => <View style={styles.separator} />}
              ListEmptyComponent={
                <Medium label={t('no_chat_history')} style={styles.emptyText} />
              }
              refreshControl={
                <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
              }
              onEndReached={handleLoadMore}
              onEndReachedThreshold={0.1} // More sensitive threshold
              ListFooterComponent={
                loadingMore ? (
                  <View style={styles.footerLoader}>
                    <Loader />
                  </View>
                ) : null
              }
            />
          )}
        </View>
      </Animated.View>
    </ModalWrapper>
  );
};

// ... (keep your existing styles)

const styles = StyleSheet.create({
  contentContainerStyle: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'flex-start',
  },
  container: {
    backgroundColor: colors.white,
    width: '80%',
    height: '100%',
    borderTopRightRadius: mvs(20),
    borderBottomRightRadius: mvs(20),
  },
  header: {
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  heading: {
    fontSize: mvs(18),
    flex: 1,
    textAlign: 'center',
  },
  cross: {
    padding: mvs(5),
  },
  listContainer: {
    flex: 1,
  },
  listContent: {
    padding: mvs(10),
  },
  separator: {
    height: mvs(10),
  },
  emptyText: {
    textAlign: 'center',
    marginTop: mvs(20),
  },
  newChatButton: {
    padding: mvs(5),
    marginRight: mvs(10),
    borderRadius: mvs(5),
    width: mvs(100),
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default BotChatHistoryModal;

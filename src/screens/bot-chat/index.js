import CustomFlatList from 'components/atoms/custom-flatlist';
import {Loader} from 'components/atoms/loader';
import {Row} from 'components/atoms/row';
import {colors} from 'config/colors';
import {mvs} from 'config/metrices';
import React, {useCallback, useState} from 'react';
import {View, Alert, TouchableOpacity} from 'react-native';
import Item from 'components/molecules/chatBot-chat';
import {MessageInput} from 'components/atoms/inputs';
import {UTILS} from 'utils';
import {
  onSendChat,
  onSendMessage,
  onUpdateChat,
} from 'services/api/chat-api-actions';
import {useAppSelector} from 'hooks/use-store';
import styles from './style';
import Bold from 'typography/bold-text';
import {MenuIcon} from 'assets/icons/tab-icons';
import BotChatHistoryModal from 'components/molecules/modals/botChat-history-modal';

const BotChat = ({navigation}) => {
  const [textInput, setTextInput] = useState('');
  const [messages, setMessages] = useState([]);
  const [loadingMap, setLoadingMap] = useState({});
  const [showInstructions, setShowInstructions] = useState(false);
  const [selectedChat, setSelectedChat] = useState(null);
  const [currentChatId, setCurrentChatId] = useState(null); // Add this state

  const user = useAppSelector(s => s?.user?.userInfo);

  // Load selected chat messages when selectedChat changes
  React.useEffect(() => {
    if (selectedChat) {
      setMessages(
        selectedChat?.conversation?.map(msg => ({
          text: msg?.text,
          answer: msg?.answer,
          id: msg?.id,
        })),
      );
    }
  }, [selectedChat]);

  const sendMessage = async () => {
    if (!textInput.trim()) return;

    const messageId = Date.now().toString();
    try {
      const newMessage = {
        text: textInput,
        answer: '',
        id: messageId,
      };

      setLoadingMap(prev => ({...prev, [messageId]: true}));

      // Update messages immediately with the new question
      setMessages(prev => [...prev, newMessage]);
      setTextInput('');
      const userId = user?.id;

      // First send the message to get response
      const res = await onSendMessage({
        student_id: String(userId),
        question: textInput,
      });

      if (res?.answer) {
        // Create the complete updated messages array
        const updatedMessages = [
          ...messages,
          {...newMessage, answer: res.answer},
        ];

        // Update UI state with both question and answer
        setMessages(updatedMessages);

        // Prepare conversation data with ONLY the new message for API
        const newConversationItem = {
          id: messageId,
          text: textInput,
          answer: res.answer,
        };

        // If this is a new chat (no currentChatId), call sendChat with full conversation
        if (!currentChatId && !selectedChat) {
          const sendChatRes = await onSendChat({
            conversation: updatedMessages, // Send full conversation for new chat
          });
          if (sendChatRes?.data?.id) {
            setCurrentChatId(sendChatRes.data.id);
          }
        }
        // If this is an existing chat, call updateChat with ONLY the new message
        else {
          const chatIdToUpdate = selectedChat?.id || currentChatId;
          await onUpdateChat(chatIdToUpdate, {
            conversation: [newConversationItem], // Send only the new message
          });
        }
      }
    } catch (error) {
      console.log('error', error);
      Alert.alert('Error', UTILS.returnError(error));
      // Remove the message if there was an error
      setMessages(prev => prev.filter(msg => msg.id !== messageId));
    } finally {
      setLoadingMap(prev => ({...prev, [messageId]: false}));
    }
  };

  const renderItem = ({item}) => (
    <Item item={item} isLoading={loadingMap[item?.id]} />
  );

  const handleNewChat = () => {
    setSelectedChat(null); // Clear any selected chat
    setCurrentChatId(null); // Clear current chat ID
    setMessages([]); // Clear messages
    setTextInput(''); // Clear input
  };
  return (
    <View style={styles.container}>
      <View style={{backgroundColor: colors.primary}}>
        <Row
          style={{
            alignItems: 'center',
            backgroundColor: colors.primary,
            marginHorizontal: mvs(10),
            marginVertical: mvs(15),
          }}>
          <View style={{width: '80%'}}>
            <Bold
              label={selectedChat?.title || 'Chat with Prismatic Bot'}
              style={styles.title}
            />
            {selectedChat && (
              <TouchableOpacity
                onPress={() => setSelectedChat(null)}
                style={{position: 'absolute', left: 0}}>
                {/* Add your back icon here */}
              </TouchableOpacity>
            )}
          </View>
          <TouchableOpacity onPress={() => setShowInstructions(true)}>
            <MenuIcon />
          </TouchableOpacity>
        </Row>
      </View>

      <View style={{flex: 1}}>
        <View style={{marginBottom: mvs(50), flex: 1}}>
          <CustomFlatList
            inverted
            showsVerticalScrollIndicator={false}
            data={[...messages].reverse()}
            renderItem={renderItem}
            emptyShow={false}
          />
        </View>

        <Row style={styles.inputContainer}>
          <MessageInput
            value={textInput}
            onChangeText={setTextInput}
            sendMessage={sendMessage}
            disabled={Object.values(loadingMap).some(Boolean)}
          />
        </Row>
      </View>

      <BotChatHistoryModal
        visible={showInstructions}
        onClose={() => setShowInstructions(false)}
        onSelectChat={setSelectedChat}
        onNewChat={handleNewChat} // Add this prop
      />
    </View>
  );
};

export default BotChat;

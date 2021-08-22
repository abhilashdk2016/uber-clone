import React, { useState } from "react";
import { RouteComponentProps } from "react-router";
import { SUBSCRIBE_TO_MESSAGES } from "src/graphql/ChatSubscription.graphql";
import { useGetChatQuery, useSendMessageMutation, useUserProfileQuery } from "../../generated/graphql";
import ChatPresenter from './ChatPresenter';
interface IProps extends RouteComponentProps<any> {}
interface IState {
  message: "";
}

const ChatContainer: React.FC<IProps>  = (props) => {
  const { match, history } = props;
  if(!match.params.chatId){
    history.push("/");
  }
  const [state, setState] = useState<IState>({
    message: ""
  });
  const { data: userprofileData } = useUserProfileQuery();
  const { data: getChatData, loading, subscribeToMore  } = useGetChatQuery({
    variables: { id: match.params.chatId}
  });
  subscribeToMore({
    document: SUBSCRIBE_TO_MESSAGES,
    updateQuery: (prev, { subscriptionData }) => {
      const subData = subscriptionData.data as any;
      const messages = prev.GetChat.chat?.messages;
      if(!subscriptionData.data) {
        return prev;
      }
      if(subData.chatRoom.id === messages![messages!.length - 1].id) {
        return prev;
      }
      const newObject = Object.assign({}, prev, {
        GetChat: {
          ...prev.GetChat,
          chat: {
            ...prev.GetChat.chat,
            messages: [
              ...prev.GetChat.chat?.messages!,
              subData.chatRoom
            ]
          }
        }
      });
      return newObject;
    }
  })

  const [sendMessageMutation, { data: sendChatMessageData }] = useSendMessageMutation();

  const onInputChange: React.ChangeEventHandler<HTMLInputElement> = event => {
    const {
      target: { name, value }
    } = event;
    setState({
      ...state,
      [name]: value
    } as any);
  };

  const onSubmit = () => {
    const { message } = state;
    const {
      match: {
        params: { chatId }
      }
    } = props;
    if (message !== "") {
      setState({
        message: ""
      });
      sendMessageMutation({
        variables: {
          id: chatId,
          message
        }
      });
    }
    return;
  };

  return (
    <ChatPresenter
      data={getChatData}
      loading={loading}
      userData={userprofileData}
      messageText={state.message}
      onInputChange={onInputChange}
      onSubmit={onSubmit}
    />
  )
}

export default ChatContainer;
import React from "react";
import { UserProfileQuery, GetChatQuery } from "../../generated/graphql";
import Form from "../../Components/Form";
import Input from "../../Components/Input";
import Header from "../../Components/Header";
import Message from "../../Components/Message";
import styled from "../../styled.d";

const Container = styled.div``;

const Chat = styled.div`
  height: 80vh;
  overflow: scroll;
  padding: 0 20px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
`;

const InputCont = styled.div`
  padding: 0 20px;
`;

interface IProps {
  data?: GetChatQuery;
  userData?: UserProfileQuery;
  loading: boolean;
  messageText: string;
  onSubmit: () => void;
  onInputChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

const ChatPresenter: React.FC<IProps> = ({
  loading,
  data,
  userData,
  onInputChange,
  onSubmit,
  messageText
}) => {
  const chat = data?.GetChat.chat;
  const user = userData?.GetMyProfile.user;
  return <Container>
    <Header title={"Chat"} />
    {!loading &&
      chat &&
      user && (
        <React.Fragment>
          <Chat>
            {chat.messages &&
              chat.messages.map(message => {
                if (message) {
                  return (
                    <Message
                      key={message.id}
                      text={message.text}
                      mine={parseInt(user.id) === message.userId}
                    />
                  );
                }
                return null;
              })}
          </Chat>
          <InputCont>
            <Form submitFn={onSubmit}>
              <Input
                value={messageText}
                placeholder={"Type your message"}
                onChange={onInputChange}
                name={"message"}
              />
            </Form>
          </InputCont>
        </React.Fragment>
      )}
  </Container>
};

export default ChatPresenter;
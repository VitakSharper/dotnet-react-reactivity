import React, {useContext, useEffect} from "react";
import {RootStoreContext} from "../../store/Root.store";

import {Segment, Header, Comment, Form, Button} from "semantic-ui-react";
import {Form as FinalForm, Field} from 'react-final-form';
import {Link} from "react-router-dom";
import TextAreaInput from "../Forms/reusable/TextAreaInput.component";
import {observer} from "mobx-react-lite";


const ActivityDetailedChat = () => {
    const rootStore = useContext(RootStoreContext);
    const {activity, createHubConnection, stopHubConnection, addComment} = rootStore.activityStore;

    useEffect(() => {
        createHubConnection();

        return () => {
            stopHubConnection()
        }
    }, [createHubConnection, stopHubConnection]);

    return (
        <>
            <Segment
                textAlign="center"
                attached="top"
                inverted
                color="teal"
                style={{border: "none"}}
            >
                <Header>Chat about this event</Header>
            </Segment>
            <Segment attached>
                <Comment.Group>
                    {
                        activity && activity.comments && activity.comments.map(c =>
                            <Comment key={c.id}>
                                <Comment.Avatar src={c.image || '/assets/user.png'}/>
                                <Comment.Content>
                                    <Comment.Author as={Link}
                                                    to={`/profile/${c.username}`}>{c.displayName}</Comment.Author>
                                    <Comment.Metadata>
                                        <div>{c.createdAt}</div>
                                    </Comment.Metadata>
                                    <Comment.Text>{c.body}</Comment.Text>
                                </Comment.Content>
                            </Comment>)
                    }
                    <FinalForm
                        onSubmit={addComment}
                        render={({handleSubmit, submitting, form}) => (
                            <Form onSubmit={() => handleSubmit()!.then(() => form.reset())}>
                                <Field
                                    name={'body'}
                                    component={TextAreaInput}
                                    rows={2}
                                    placeholder={'Add your comment.'}
                                />
                                <Button
                                    content="Add Reply"
                                    labelPosition="left"
                                    icon="edit"
                                    loading={submitting}
                                    primary
                                />
                            </Form>
                        )}
                    />
                </Comment.Group>
            </Segment>
        </>
    );
};

export default observer(ActivityDetailedChat);

import React, {useContext, useState} from "react";
import {Tab, Header, Card, Image, Button, Icon, Grid, Reveal} from "semantic-ui-react";
import {RootStoreContext} from "../../store/Root.store";

const ProfilePhotos = () => {
    const rootStore = useContext(RootStoreContext);
    const {profile, isCurrentUser} = rootStore.profileStore;
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16} style={{paddingBottom: '0'}}>
                    <Grid>
                        <Grid.Column width={10}>
                            <Header floated={"left"} icon={'image'} content={'Photos'}/>
                        </Grid.Column>
                        <Grid.Column width={6}>
                            {isCurrentUser &&
                            <Button.Group floated={"right"} fluid>

                                <Reveal animated="move">
                                    <Reveal.Content visible style={{width: "100%"}}>
                                        <Button fluid color="teal" content="Following"/>
                                    </Reveal.Content>
                                    <Reveal.Content hidden>
                                        <Button
                                            fluid
                                            basic
                                            color={true ? "red" : "green"}
                                            content={true ? "Unfollow" : "Follow"}
                                            icon={}
                                        />
                                    </Reveal.Content>
                                </Reveal>

                                <Button animated circular
                                        type={'button'}
                                        onClick={() => setAddPhotoMode(!addPhotoMode)}
                                >
                                    <Button.Content hidden>{addPhotoMode ? 'Cancel' : 'Add Photo'}</Button.Content>
                                    <Button.Content visible>
                                        <Icon name={addPhotoMode ? 'cancel' : 'add'}/>
                                    </Button.Content>
                                </Button>
                            </Button.Group>}
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
                <Grid.Column width={16}>
                    {addPhotoMode ? (
                        <p>Photo widget will go here</p>
                    ) : (
                        <Card.Group itemsPerRow={5}>
                            {profile && profile?.photos.map(p => (
                                <Card key={p.id}>
                                    <Image src={p.url}/>
                                    {isCurrentUser && <Card.Content style={{padding: '0'}}>
                                        <Button.Group fluid size={"mini"}>
                                            <Button animated basic positive
                                                    type={'button'}>
                                                <Button.Content
                                                    hidden>Main</Button.Content>
                                                <Button.Content visible>
                                                    <Icon name={'edit'}/>
                                                </Button.Content>
                                            </Button>
                                            <Button.Or/>
                                            <Button animated basic negative type={'button'}>
                                                <Button.Content hidden>Delete</Button.Content>
                                                <Button.Content visible>
                                                    <Icon name={'trash'}/>
                                                </Button.Content>
                                            </Button>
                                        </Button.Group>
                                    </Card.Content>}
                                </Card>
                            ))}
                        </Card.Group>
                    )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
};

export default ProfilePhotos;

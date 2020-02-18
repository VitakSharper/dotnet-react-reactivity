import React, {useContext, useState} from "react";
import {Tab, Header, Card, Image, Button, Icon, Grid, Reveal} from "semantic-ui-react";
import {RootStoreContext} from "../../store/Root.store";
import PhotoUploadWidget from "../../components/photoUpload/PhotoUploadWidget.component";

const ProfilePhotos = () => {
    const rootStore = useContext(RootStoreContext);
    const {profile, isCurrentUser} = rootStore.profileStore;
    const [addPhotoMode, setAddPhotoMode] = useState(true);

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
                            <Reveal animated={'move right'}>
                                <Reveal.Content visible style={{width: "100%"}}>
                                    <Button fluid color="teal" content={addPhotoMode ? 'Cancel' : 'Add Photo'}/>
                                </Reveal.Content>
                                <Reveal.Content hidden>
                                    <Button
                                        fluid
                                        basic
                                        negative={addPhotoMode}
                                        onClick={() => setAddPhotoMode(!addPhotoMode)}
                                        icon={addPhotoMode ? 'cancel' : 'add'}
                                    />
                                </Reveal.Content>
                            </Reveal>
                            }
                        </Grid.Column>
                    </Grid>
                </Grid.Column>
                <Grid.Column width={16}>
                    {addPhotoMode && isCurrentUser ? (
                        <PhotoUploadWidget/>
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

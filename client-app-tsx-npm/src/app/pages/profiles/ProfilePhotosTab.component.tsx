import React, {useContext, useState} from "react";
import {Tab, Header, Card, Image, Button, Popup, Icon, Grid, Reveal, Label} from "semantic-ui-react";
import {RootStoreContext} from "../../store/Root.store";
import PhotoUploadWidget from "../../components/photoUpload/PhotoUploadWidget.component";
import {observer} from "mobx-react-lite";

const ProfilePhotos = () => {
    const rootStore = useContext(RootStoreContext);
    const {profile, isCurrentUser, uploadingPhoto, uploadPhoto, loading, setMainPhoto, deletePhoto} = rootStore.profileStore;
    const [addPhotoMode, setAddPhotoMode] = useState(false);
    const [target, setTarget] = useState<string | undefined>(undefined);

    const handleUploadPhoto = (photo: Blob) => {
        uploadPhoto(photo).then(() => setAddPhotoMode(false))
    };

    return (
        <Tab.Pane>
            <Grid>
                <Grid.Column width={16} style={{paddingBottom: '0'}}>
                    <Grid>
                        <Grid.Column width={10}>
                            <Header floated={"left"} icon={'image'} content={addPhotoMode ? 'Add Photo' : 'Photos'}/>
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
                        <PhotoUploadWidget handleUploadPhoto={handleUploadPhoto} loading={uploadingPhoto}/>
                    ) : (
                        <Card.Group itemsPerRow={5}>
                            {profile && profile?.photos.map(p => (
                                <Card key={p.id}>
                                    <Image src={p.url}/>
                                    {isCurrentUser && <Popup content='Make it private' trigger={
                                        <Label as={'a'} corner={"right"} icon={'heart'}/>
                                    }/>}
                                    <Card.Content style={{padding: '0'}}>
                                        {isCurrentUser && !p.isMain &&
                                        <Button.Group fluid size={"mini"}>
                                            <Button animated basic positive
                                                    name={p.id}
                                                    onClick={(e) => {
                                                        setMainPhoto(p);
                                                        setTarget(e.currentTarget.name);
                                                    }}
                                                    loading={loading && target === p.id}
                                                    type={'button'}>
                                                <Button.Content
                                                    hidden>Set Main</Button.Content>
                                                <Button.Content visible>
                                                    <Icon name={'edit'}/>
                                                </Button.Content>
                                            </Button>
                                            <Button.Or/>
                                            <Button animated basic negative
                                                    name={`d${p.id}`}
                                                    disabled={loading}
                                                    loading={loading && target === `d${p.id}`}
                                                    onClick={(e) => {
                                                        deletePhoto(p);
                                                        setTarget(e.currentTarget.name);
                                                    }}
                                                    type={'button'}>
                                                <Button.Content hidden>Delete</Button.Content>
                                                <Button.Content visible>
                                                    <Icon name={'trash'}/>
                                                </Button.Content>
                                            </Button>
                                        </Button.Group>}
                                        {p.isMain && isCurrentUser && <Label attached={"bottom"} content={'Is Main'}/>}
                                    </Card.Content>
                                </Card>
                            ))}
                        </Card.Group>
                    )}
                </Grid.Column>
            </Grid>
        </Tab.Pane>
    )
};

export default observer(ProfilePhotos);

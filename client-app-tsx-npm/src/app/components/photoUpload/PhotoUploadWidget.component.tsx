import React, {Fragment, useEffect, useState} from "react";
import {observer} from "mobx-react-lite";

import {Header, Grid, Button, Icon, Card, Image} from "semantic-ui-react";
import PhotoWidgetDropzone from "./PhotoWidgetDropzone.component";
import PhotoWidgetCropper from "./PhotoWidgetCropper.component";

interface IProps {
    loading: boolean;
    handleUploadPhoto: (file: Blob) => void;
}

const PhotoUploadWidget: React.FC<IProps> = ({loading, handleUploadPhoto}) => {
    const [files, setFiles] = useState<any[]>([]);
    const [image, setImage] = useState<Blob | null>(null);

    useEffect(() => {
        return () => {
            files.forEach(file => URL.revokeObjectURL(file.preview))
        }
    });

    return (
        <Fragment>
            <Grid>
                <Grid.Column width={4}>
                    <Header color="teal" sub content="Step 1 - Add Photo"/>
                    <PhotoWidgetDropzone setFiles={setFiles}/>
                </Grid.Column>
                <Grid.Column width={1}/>
                <Grid.Column width={4}>
                    <Header sub color="teal" content="Step 2 - Resize image"/>
                    {files.length > 0 &&
                    <PhotoWidgetCropper
                        setImage={setImage}
                        imagePreview={files[0].preview}/>}

                </Grid.Column>
                <Grid.Column width={1}/>
                <Grid.Column width={6}>
                    <Header sub color="teal" content="Step 3 - Preview & Upload"/>
                    {files.length > 0 &&
                    <Card>
                        <Image as={'div'} className={'img-preview'}
                               style={{minHeight: '20rem', overflow: 'hidden'}}/>
                        <Card.Content style={{padding: '0'}}>
                            <Button.Group fluid>
                                <Button animated basic positive
                                        loading={loading}
                                        onClick={() => handleUploadPhoto(image!)}
                                        type={'button'}>
                                    <Button.Content
                                        hidden>upload</Button.Content>
                                    <Button.Content visible>
                                        <Icon name={'check'}/>
                                    </Button.Content>
                                </Button>
                                <Button.Or/>
                                <Button animated basic negative
                                        disabled={loading}
                                        type={'button'}
                                        onClick={() => setFiles([])}>
                                    <Button.Content hidden>Cancel</Button.Content>
                                    <Button.Content visible>
                                        <Icon name={'close'}/>
                                    </Button.Content>
                                </Button>
                            </Button.Group>
                        </Card.Content>
                    </Card>
                    }
                </Grid.Column>
            </Grid>
        </Fragment>
    )
};

export default observer(PhotoUploadWidget);

import React, {useCallback} from 'react'
import {useDropzone} from 'react-dropzone'

import {Icon, Header} from "semantic-ui-react";

interface IProps {
    setFiles: (files: object[]) => void;
}

const styles = {
    dropZone: {
        border: 'dashed 3px',
        borderColor: '#eee',
        borderRadius: '0.5rem',
        paddingTop: '3rem',
        textAlign: 'center' as 'center',
        maxHeight: "20rem"
    },
    dropZoneActive: {
        borderColor: '#C8E6C9',
        background: 'repeating-linear-gradient(45deg, #F5F5F5, #EEEEEE 15%, #C8E6C9 20%)'
    }
};

const PhotoWidgetDropzone: React.FC<IProps> = ({setFiles}) => {

    const onDrop = useCallback(acceptedFiles => {
        setFiles(acceptedFiles.map((file: object) => Object.assign(file, {
            preview: URL.createObjectURL(file)
        })))
    }, [setFiles]);

    const {getRootProps, getInputProps, isDragActive} = useDropzone({onDrop});

    return (
        <div {...getRootProps()}
             style={isDragActive ? {...styles.dropZone, ...styles.dropZoneActive} : styles.dropZone}>
            <input {...getInputProps()} />
            <Icon name={'upload'} size={"huge"}/>
            <Header content={'Drop image here.'}/>
        </div>
    )
};

export default PhotoWidgetDropzone;
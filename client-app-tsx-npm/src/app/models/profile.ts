export interface IPhoto {
    id: string;
    url: string;
    isMain: boolean;
}

export interface IProfile {
    displayName: string;
    username: string;
    image: string;
    bio: string;
    photos: IPhoto[];
}

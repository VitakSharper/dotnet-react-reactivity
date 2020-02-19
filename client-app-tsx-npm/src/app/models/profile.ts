export interface IPhoto {
    id: string;
    url: string;
    isMain: boolean;
    status: boolean;
}

export interface IProfile {
    displayName: string;
    username: string;
    image: string;
    bio: string;
    photos: IPhoto[];
}

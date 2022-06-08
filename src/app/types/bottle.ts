export interface Bottle {
    _id?: string;
    title: string;
    postedBy: PostedByDetails;
    content: string;
    comments: Comments;
    //Location ID from endpoint
    locId?: string;

    //Location parameters
    bottleViewLat?:number;
    bottleViewLng?:number;
}

export interface Comments {
    text?: string;
    createdDate?: string;
    postedBy?: string;
    username?: string;
    numberofLikes?: number;
}

export interface PostedByDetails {
    _id: string;
    loginCode?: string;
    username?: string;
    createDate?: Date;
}


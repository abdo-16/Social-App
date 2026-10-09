 
export interface Comment {
    success: boolean;
    message: string;
    data:    Data;
    meta:    Meta;
}

export interface Data {
    comments: CommentElement[];
}

export interface CommentElement {
    _id:            string;
    content:        string;
    commentCreator: CommentCreator;
    post:           string;
    parentComment:  null;
    likes:          any[];
    createdAt:      Date;
    repliesCount:   number;
}

export interface CommentCreator {
    _id:      string;
    name:     string;
    username: string;
    photo:    string;
}

export interface Meta {
    pagination: Pagination;
}

export interface Pagination {
    currentPage:   number;
    limit:         number;
    total:         number;
    numberOfPages: number;
}
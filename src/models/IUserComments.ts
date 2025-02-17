export interface IUserComments {
    meta: Meta;
    data: UserComment[];
}

export interface UserComment {
    post_id: number;
    id:      number;
    name:    string;
    email:   string;
    body:    string;
}

export interface Meta {
    status:     number;
    message:    string;
    pagination: Pagination;
}

export interface Pagination {
    page:        number;
    per_page:    number;
    total_items: number;
    total_pages: number;
}

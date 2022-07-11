const environment = {
    baseurl : '',
    jsonPlaceholderUrl:'https://jsonplaceholder.typicode.com/'
}
// get this environment from your env file or your other preffered way of setting up ENVs

export class ApiUrls {
    static GET_POSTS = environment.jsonPlaceholderUrl + "posts";
}
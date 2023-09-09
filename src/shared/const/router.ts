export enum AppRoutes {
    MAIN = 'main',
    ABOUT = 'about',
    PROFILE = 'profile',
    ARTICLES = 'articles',
    ARTICLE_DETAILS = 'article_details',
    ARTICLE_CREATE = 'article_create',
    ARTICLE_EDIT = 'article_edit',
    ADMIN_PANEL = 'admin_panel',
    FORBIDDEN = 'forbidden',
    // last
    NOT_FOUND = 'not_found',
}

export const getRouteMain = () => {
    return '/';
};
export const getRouteAbout = () => {
    return '/about';
};
export const getRouteArticles = () => {
    return '/articles';
};
export const getRouteProfile = (id: string) => {
    return `/profile/${id}`;
};
export const getRouteArticleDetails = (id: string) => {
    return `/articles/${id}`;
};
export const getRouteArticleCreate = () => {
    return '/articles/new';
};
export const getRouteArticleEdit = (id: string) => {
    return `/articles/${id}/edit`;
};
export const getRouteAdminPanel = () => {
    return '/admin';
};
export const getRouteForbidden = () => {
    return '/forbidden';
};

export const getNotFound = () => {
    return '/forbidden';
};

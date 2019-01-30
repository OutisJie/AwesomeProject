import ajax from './ajax'

/**-------------main article---------------- */
export const fetchArticleList = ajax.fetchJSONByGet('/main/article/view/list')
export const fetchArticleList = ajax.fetchJSONByGet('/main/article/view/detail')

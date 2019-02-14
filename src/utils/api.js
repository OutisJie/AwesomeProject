import * as ajax from './ajax'

/**-------------main article---------------- */
export const fetchArticleList = ajax.fetchJSONByGet('/main/article/view/list')
export const fetchArticleDetail = ajax.fetchJSONByGet('/main/article/view/detail')

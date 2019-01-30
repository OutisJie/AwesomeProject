import { createFetchAction, createReducer } from '../../../utils/reduxUtil'
import * as API from '../../../utils/api'

/**-----------state--------------- */
export default defaultState = {
  data: [],
  paging: {
    pageSize: 10,
    current: 1,
    total: 0
  }
}

/**-----------action--------------- */
export const fetchArticleList = createFetchAction({
  name: 'articleListState',
  api: API.fetchArticleList
})
export const fetchArticleDetail = createFetchAction({
  name: 'fetchArticleDetail',
  api: API.fetchArticleDetail
})

/**-----------reducer-------------- */
export default createReducer({
  name: 'articleListState',
  defaultState
})
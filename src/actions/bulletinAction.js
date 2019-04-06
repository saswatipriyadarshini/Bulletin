export function postsAction(data){
  return function(dispatch){
    dispatch({
      type: 'POSTS',
      payload: data
    }, () => {
      console.log('data is', data)
    })
  }
}
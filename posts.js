const { createStore } = require("redux");
// initial state
const initialState = {
  posts: [],
};

// action (action , action creator )
// action types
const ADD_POST = "ADD_POST";
const REMOVE_POST = "REMOVE_POST";
// add post
const addPostAction = (post) => {
  return {
    type: ADD_POST,
    payload: post,
  };
};

// remove post
const removePostAction = (id) => {
  return {
    type: REMOVE_POST,
    id,
  };
};

//reducer
const postReducer = (state = initialState, action) => {
  //   if (action.type === ADD_POST) {
  //     return {
  //       posts: [...state.posts, action.payload],
  //     };
  //   } else if (action.type === REMOVE_POST) {
  //     return {
  //       posts: state.posts.filter((post) => {
  //         return post.id != action.id;
  //       }),
  //     };
  //   } else {
  //     return state;
  //   }
  switch (action.type) {
    case ADD_POST:
      return {
        posts: [...state.posts, action.payload],
      };
    case REMOVE_POST:
      return {
        posts: state.posts.filter((post) => {
          return post.id != action.id;
        }),
      };
    //   break;f

    default:
      return state;
  }
};

// store
const store = createStore(postReducer);

//subscribe
store.subscribe(() => {
  const data = store.getState();
  console.log("data-->", data);
});

//dispatch
// add post action
store.dispatch(
  addPostAction({
    id: 1,
    title: "Ferrari",
  })
);
store.dispatch(
  addPostAction({
    id: 2,
    title: "Rolls Roy",
  })
);
store.dispatch(
  addPostAction({
    id: 3,
    title: "B M W",
  })
);

// remove post action
store.dispatch(removePostAction(3));

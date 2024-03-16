const { createStore, combineReducers } = require("redux");
// initial state
const initialState = {
  posts: [],
};
//user initial state
const userInitialState = {
  users: [],
};
// action (action , action creator )
// action types
const ADD_POST = "ADD_POST";
const REMOVE_POST = "REMOVE_POST";
const ADD_USER = "ADD_USER";

// add post
const addPostAction = (post) => {
  return {
    type: ADD_POST,
    payload: post,
  };
};
//add user
const addUserAction = (user) => {
  return {
    type: ADD_USER,
    payload: user,
  };
};

// remove post
const removePostAction = (id) => {
  return {
    type: REMOVE_POST,
    id,
  };
};

//Post reducer
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

//user reducer
const userReducer = (state = userInitialState, action) => {
  if (action.type === ADD_USER) {
    return {
      users: [...state.users, action.payload],
    };
  } else {
    return state;
  }
};

//root reducer
const rootReducer = combineReducers({
  posts: postReducer,
  users: userReducer,
});

// store
const store = createStore(rootReducer);

//subscribe
store.subscribe(() => {
  const data = store.getState();
  console.log("data post-->", data.posts);
  console.log("data user-->", data.users);
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

// add new user

store.dispatch(addUserAction({ name: "Ram", id: 1 }));

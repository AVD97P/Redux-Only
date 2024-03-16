const { createStore, applyMiddleware } = require("redux");
const axios = require("axios");
const thunk = require("redux-thunk").default;
// initialState
const initialState = {
  blogs: [],
  error: "",
  loading: false,
};

//Actions
const fetchBlogsRequest = () => {
  return {
    type: "REQUEST_STARTED",
  };
};
const fetchBlogsFail = (err) => {
  return {
    type: "REQUEST_FAIL",
    payload: err,
  };
};
const fetchBlogsSuccess = (blogs) => {
  return {
    type: "REQUEST_SUCCESS",
    payload: blogs,
  };
};

// action to make the request
const fetchBlog = () => {
  return async (dispatch) => {
    try {
      dispatch(fetchBlogsRequest());
      const data = await axios.get(
        "https://jsonplaceholder.typicode.com/posts"
      );
      dispatch(fetchBlogsSuccess(data));
    } catch (error) {
      dispatch(fetchBlogsFail(error.message));
    }
  };
};

// Reducers
const blogsReducer = (state = initialState, action) => {
  switch (action.type) {
    case "REQUEST_STARTED":
      return {
        ...state,
        loading: true,
      };
    case "REQUEST_FAIL":
      return {
        ...state,
        loading: true,
      };

    default:
      return state;
  }
};

//store
const store = createStore(blogsReducer, applyMiddleware(thunk));

//subscribe
store.subscribe(() => {
  const data = store.getState();
  console.log("data-->", data);
});

//dispatch
store.dispatch(fetchBlogsRequest);

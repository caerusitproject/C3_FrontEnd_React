import { createPostsService } from "../services/postServices";
import { valueOfPost } from "../slices/postsSlice";
import { globalLoaderOpen, globalLoaderClose } from "../slices/globalSlice";

// export const fetchPosts = () => {
//   return (dispatch) => {
//     dispatch(globalLoaderOpen({ open: true }));
//     createPostsService()
//       .then((res) => {
//         console.log("First API Response____", res);
//         dispatch(valueOfPost(res));
//         dispatch(globalLoaderClose({ open: false }));
//         // dispatch(actions.openSnackbar({message:response?.message,status:'success'}))
//       })
//       .catch((err) => {
//         dispatch(globalLoaderClose({ open: false }));
//         console.error("Error fetching posts:", err);
//         // dispatch(actions.openSnackbar({message:err?.message,status:'error'}))
//       });
//   };
// };

export const fetchPosts = () => {
  return async (dispatch) => {
    dispatch(globalLoaderOpen());

    try {
      // 10 second delay
      await new Promise((resolve) => setTimeout(resolve, 3000));

      const res = await createPostsService();

      console.log("First API Response____", res);

      dispatch(valueOfPost(res));

      dispatch(globalLoaderClose());

      // dispatch(openSnackbar({
      //   message: response?.message,
      //   status: "success"
      // }));
    } catch (err) {
      dispatch(globalLoaderClose());

      console.error("Error fetching posts:", err);

      // dispatch(openSnackbar({
      //   message: err?.message,
      //   status: "error"
      // }));
    }
  };
};

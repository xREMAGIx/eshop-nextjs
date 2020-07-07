import { postActions } from "../../actions";
import Typography from "@material-ui/core/Typography";
import Head from "next/head";

export default function Post(props) {
  // const router = useRouter();
  // const { id } = router.query;
  // console.log("*************");
  // console.log(id);
  //const classes = useStyles();
  const { result } = props;
  return (
    <React.Fragment>
      <Typography variant="h1">{result.posts.items.title}</Typography>
      <Typography variant="subtitle1">{result.posts.items.content}</Typography>
    </React.Fragment>
  );
}

Post.getInitialProps = async (ctx) => {
  let result;
  checkServerSideCookie(ctx);

  const token = ctx.store.getState().users.token;
  await ctx.store.dispatch(postActions.getById(ctx.query.id));
  // .then(() => (result = store.getState()));

  result = store.getState();

  return { result };
};

// // This function gets called at build time
// export async function getStaticPaths() {
//   // Call an external API endpoint to get posts
//   const res = await fetch("http://localhost:5000/api/posts");
//   const posts = await res.json();
//   console.log(posts);

//   // Get the paths we want to pre-render based on posts
//   const paths = posts.data.map((post) => ({
//     params: { id: post.id },
//   }));

//   // We'll pre-render only these paths at build time.
//   // { fallback: false } means other routes should 404.
//   return { paths, fallback: false };
// }

// export async function getStaticProps({ params }) {
//   // params contains the post `id`.
//   // If the route is like /posts/1, then params.id is 1
//   const res = await fetch(`http://localhost:5000/api/posts/${params.id}`);
//   const post = await res.json();

//   // Pass post data to the page via props
//   return { props: { post } };
// }

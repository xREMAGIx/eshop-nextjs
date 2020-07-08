import { postActions } from "../../actions";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";
import { checkServerSideCookie } from "../../actions/user.actions";
import { useSelector } from "react-redux";
import { Editor, EditorState, convertFromRaw } from "draft-js";

import Mainbar from "../../components/Appbar";

export default function Post() {
  const posts = useSelector((state) => state.posts);
  const [editorState, setEditorState] = React.useState(
    EditorState.createEmpty()
  );

  // const editor = React.useRef(null);

  // function focusEditor() {
  //   editor.current.focus();
  // }

  React.useEffect(() => {
    if (posts.items.content !== undefined && posts.items.content !== "") {
      setEditorState(
        EditorState.createWithContent(
          convertFromRaw(JSON.parse(posts.items.content))
        )
      );
    }
    //setContentJsonString(props.content);
    //focusEditor();
  }, [posts.items.content]);

  return (
    <React.Fragment>
      {/* Header */}
      <Mainbar />
      <Container style={{ marginTop: 64 }} maxWidth="lg">
        <Typography variant="h1">{posts.items.title}</Typography>
        {/* <Typography variant="subtitle1">{posts.items.content}</Typography>     */}
        <Editor editorState={editorState} readOnly={true} />
      </Container>
    </React.Fragment>
  );
}

Post.getInitialProps = async (ctx) => {
  let result;
  checkServerSideCookie(ctx);

  const token = ctx.store.getState().users.token;
  await ctx.store.dispatch(postActions.getById(ctx.query.id));
  // .then(() => (result = store.getState()));
  result = {
    title: ctx.store.getState().posts.items.title,
  };

  return { result };
};

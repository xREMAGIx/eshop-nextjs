import React, { useState, useEffect } from "react";
import dynamic from "next/dynamic"; // (if using Next.js or use own dynamic loader)
import { convertFromRaw, Editor, EditorState } from "draft-js";

import Divider from "@material-ui/core/Divider";

const SuperEditor = dynamic(
  () => import("react-draft-wysiwyg").then((mod) => mod.Editor),
  { ssr: false }
);

const content = {
  entityMap: {},
  blocks: [
    {
      key: "637gr",
      text: "Initialized from content state.",
      type: "unstyled",
      depth: 0,
      inlineStyleRanges: [],
      entityRanges: [],
      data: {},
    },
  ],
};

function EditorConvertToJSON() {
  const [loadEditor, setLoadEditor] = useState(false);
  const [contentState, setContentState] = useState(convertFromRaw(content));

  const onContentStateChange = (contentState) => {
    setContentState(convertFromRaw(contentState));
  };

  const [editorState, setEditorState] = React.useState(
    EditorState.createWithContent(convertFromRaw(content))
  );

  useEffect(() => {
    setLoadEditor(true);
  }, []);

  useEffect(() => {
    console.log(contentState);
    setEditorState(EditorState.createWithContent(contentState));
  }, [contentState]);

  useEffect(() => {
    console.log(editorState);
  }, [editorState]);

  return (
    <div>
      {loadEditor ? (
        <React.Fragment>
          <SuperEditor
            initialContentState={content}
            wrapperClassName="demo-wrapper"
            editorClassName="demo-editor"
            onContentStateChange={onContentStateChange}
          />
          <Divider></Divider>
          <SuperEditor readOnly toolbarHidden editorState={editorState} />
        </React.Fragment>
      ) : null}
    </div>
  );
}

export default EditorConvertToJSON;

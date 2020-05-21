// Whoami.js
import { checkServerSideCookie } from "../actions/user.actions";
import { Typography } from "@material-ui/core";

const Whoami = ({ user }) => (
  <Typography title="Who Am I">
    {(user && (
      <div>
        <h2>Who am i</h2>
        {JSON.stringify(user)}
      </div>
    )) ||
      "Please sign in"}
  </Typography>
);

Whoami.getInitialProps = async (ctx) => {
  checkServerSideCookie(ctx);
};

export default Whoami;

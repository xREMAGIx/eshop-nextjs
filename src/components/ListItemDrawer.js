//Standard Modules
import React from "react";
import { makeStyles } from "@material-ui/core/styles";

//UI Components
import ListItem from "@material-ui/core/ListItem";
import ListItemIcon from "@material-ui/core/ListItemIcon";
import ListItemText from "@material-ui/core/ListItemText";
import DashboardIcon from "@material-ui/icons/Dashboard";
import List from "@material-ui/core/List";
import CategoryIcon from "@material-ui/icons/Category";
import ExitToAppIcon from "@material-ui/icons/ExitToApp";
import HomeIcon from "@material-ui/icons/Home";
import TreeView from "@material-ui/lab/TreeView";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import ChevronRightIcon from "@material-ui/icons/ChevronRight";
import TreeItem from "@material-ui/lab/TreeItem";
import BrandingWatermarkIcon from "@material-ui/icons/BrandingWatermark";
import TrendingDownIcon from "@material-ui/icons/TrendingDown";
import BookIcon from "@material-ui/icons/Book";
import Typography from "@material-ui/core/Typography";
import AccountBoxIcon from "@material-ui/icons/AccountBox";
import InfoIcon from "@material-ui/icons/Info";

//Custom Components
import Link from "./Link";

const useStyles = makeStyles((theme) => ({
  root: {
    width: "100%",
    maxWidth: 360,
    backgroundColor: theme.palette.background.paper,
  },
  nested: {
    paddingLeft: theme.spacing(4),
  },
  treeItem: {
    "& .MuiTreeItem-root.Mui-selected": {
      backgroundColor: "transparent",
    },
    "& .MuiTreeItem-content": {
      flexDirection: "row-reverse",
      "& .MuiTreeItem-iconContainer": {
        marginRight: 12,
      },
    },
  },
}));

const categoryData = {
  id: "root",
  name: "Categories",
  children: [
    {
      id: "1",
      name: "Child - 1",
    },
    {
      id: "3",
      name: "Child - 3",
      children: [
        {
          id: "4",
          name: "Child - 4",
        },
      ],
    },
  ],
};

const brandData = {
  id: "root",
  name: "Brands",
  children: [
    {
      id: "1",
      name: "Child - 1",
    },
    {
      id: "3",
      name: "Child - 3",
      children: [
        {
          id: "4",
          name: "Child - 4",
        },
      ],
    },
  ],
};

export default function MainListItems() {
  const classes = useStyles();

  //Render Data Tree
  const renderTree = (nodes, icon) => (
    <TreeItem
      className={classes.treeItem}
      key={nodes.id}
      nodeId={nodes.id}
      label={
        <ListItem component="div" style={{ paddingLeft: 12 }}>
          {nodes.id === "root" ? <ListItemIcon>{icon}</ListItemIcon> : null}
          <ListItemText
            primary={
              <Typography
                {...(nodes.id !== "root" && {
                  component: Link,
                  href: `/${nodes.name}`,
                })}
              >
                {nodes.name}
              </Typography>
            }
          />
        </ListItem>
      }
    >
      {Array.isArray(nodes.children)
        ? nodes.children.map((node) => renderTree(node))
        : null}
    </TreeItem>
  );

  return (
    <List>
      {/* Dashboard */}
      <ListItem button component={Link} href="/">
        <ListItemIcon>
          <HomeIcon />
        </ListItemIcon>
        <ListItemText primary="Homepage" />
      </ListItem>

      {/* Categories */}
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        //  defaultExpanded={["root"]}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {renderTree(categoryData, <CategoryIcon />)}
      </TreeView>

      {/* Brands */}
      <TreeView
        className={classes.root}
        defaultCollapseIcon={<ExpandMoreIcon />}
        //defaultExpanded={["root"]}
        defaultExpandIcon={<ChevronRightIcon />}
      >
        {renderTree(brandData, <BrandingWatermarkIcon />)}
      </TreeView>

      {/* Sale Items */}
      <ListItem button component={Link} href="/">
        <ListItemIcon>
          <TrendingDownIcon />
        </ListItemIcon>
        <ListItemText primary="Sale Items" />
      </ListItem>

      {/* Blogs */}
      <ListItem button component={Link} href="/">
        <ListItemIcon>
          <BookIcon />
        </ListItemIcon>
        <ListItemText primary="Blogs" />
      </ListItem>

      {/* My account */}
      <ListItem button component={Link} href="/">
        <ListItemIcon>
          <AccountBoxIcon />
        </ListItemIcon>
        <ListItemText primary="My account" />
      </ListItem>

      {/* About */}
      <ListItem button component={Link} href="/">
        <ListItemIcon>
          <InfoIcon />
        </ListItemIcon>
        <ListItemText primary="About us & Policy" />
      </ListItem>

      {/* Logout
      <ListItem button component={Link} href="/login">
        <ListItemIcon>
          <ExitToAppIcon />
        </ListItemIcon>
        <ListItemText primary="Logout" />
      </ListItem> */}
    </List>
  );
}

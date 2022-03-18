import classes from "./Layout.module.css";
import MainNavigation from "./MainNavigation";

const Layout = (props) => {
  return (
    <div className={classes.layout}>
      <MainNavigation></MainNavigation>
      <div className={classes["layout-content"]}>{props.children}</div>
    </div>
  );
};

export default Layout;

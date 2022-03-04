import React from 'react';

import classes from './Posts.module.css';

const Posts = (props) => {
  return (
    <li className={classes.movie}>
      <h2>{props.title}</h2>
      <h3>{props.body}</h3>
    </li>
  );
};

export default Posts;

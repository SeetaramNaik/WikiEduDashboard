
import React from 'react';
import PropTypes from 'prop-types';
import CourseLink from '../common/course_link';

const CourseAlert = (props) => {
  let components = null;
  let action = null;

  if (props.components) components = props.components;

  if (props.actionMessage) {
    action = (
      <a href={props.href || '#'} className="button">
        {props.actionMessage}
      </a>
    );

    const actionProps = {};
    // Changes type of link to CourseLink and adds link to course
    if (props.courseLink)
      action = (
        <CourseLink to={props.courseLink}>{props.actionMessage}</CourseLink>
      );
    // or adds regular button link
    else if (props.buttonLink) actionProps.href = props.buttonLink;

    // Appends custom class names
    actionProps.className = `button ${props.actionClassName}`.trim();
    // Appends onClick if present
    if (props.onClick) actionProps.onClick = props.onClick;

    action = React.cloneElement(action, actionProps);
  }

  const messages = [].concat(props.message);

  return (
    <div
      className={
        props.className ? `${props.className} notification` : 'notification'
      }
    >
      <div className="container">
        {messages.map((message, i) => (
          <p key={i}>{message}</p>
        ))}
        {action}
        {components}
      </div>
    </div>
  );
};

CourseAlert.propTypes = {
  actionMessage: PropTypes.string,
  actionClassName: PropTypes.string,
  buttonLink: PropTypes.string,
  components: PropTypes.node,
  className: PropTypes.string,
  courseLink: PropTypes.string,
  href: PropTypes.string,
  message: PropTypes.any,
  onClick: PropTypes.func,
};

export default CourseAlert;


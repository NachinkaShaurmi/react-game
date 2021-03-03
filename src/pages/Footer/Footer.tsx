import React from "react";
import rsIcons from "../../assets/images/rs_school.svg";
import GitHubIcon from "@material-ui/icons/GitHub";
import YouTubeIcon from "@material-ui/icons/YouTube";

function Footer() {
  return (
    <footer className="footer">
      <a href="https://rs.school/" target="_blank">
        <img src={rsIcons} width={100} />
      </a>
      <p>2021</p>
      <a href="https://github.com/NachinkaShaurmi/" target="_blank">
        <GitHubIcon style={{ fontSize: 40 }} />
      </a>
      <a href="https://www.youtube.com/feed/subscriptions" target="_blank">
        <YouTubeIcon style={{ fontSize: 40 }} />
      </a>
    </footer>
  );
}

export default Footer;

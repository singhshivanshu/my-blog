import React from "react"

import { FaTwitter, FaFacebook, FaEnvelope, FaLinkedin } from "react-icons/fa"

import { ShareButtonIconOnly, ShareBlockStandard } from "react-custom-share"

const ShareButton = props => {
  const shareBlockProps = {
    url: props.url,
    button: ShareButtonIconOnly,
    buttons: [
      { network: "Twitter", icon: FaTwitter },
      { network: "Facebook", icon: FaFacebook },
      { network: "Email", icon: FaEnvelope },
      { network: "Linkedin", icon: FaLinkedin },
    ],
    text: props.title,
  }

  return <ShareBlockStandard {...shareBlockProps} />
}

export default ShareButton

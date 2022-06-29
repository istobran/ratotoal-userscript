import * as React from 'react'

export interface ThreadAttachment {
  aid: number;
  filename: string;
  filesize: string;
  downloadTimes: number;
}

type Props = {
  attachments: ThreadAttachment[]
};

export function AttachmentPanel(props: Props) {
  console.log(props.attachments)
  return (
    <div className="myhaha">123</div>
  )
}

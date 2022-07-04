import * as React from 'react'
import { ReactNode } from 'react'
import styled from '@emotion/styled';
import starCenter from './assets/star_center.png';
import { Border, LinearBackground } from './Background';
import { Replay } from './Replay';

export interface ThreadAttachment {
  aid: number;
  filename: string;
  filesize: string;
  downloadTimes: number;
}

type Props = {
  attachments: ThreadAttachment[]
};

export function PanelBackground(props: { children?: ReactNode }) {
  return (
    <Border color="#000000" width="4px">
      <Border color="#bc0d00" width="4px">
        <Border color="#000000" width="4px">
          <Border color="#fb6a09" width="4px">
            <Border color="#000000" width="4px">
              <LinearBackground
                start="#421718"
                end="#241919"
                direction="bottom">
                {props.children}
              </LinearBackground>
            </Border>
          </Border>
        </Border>
      </Border>
    </Border>
  )
}

const CenterIconWrapper = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  img {
    width: 300px;
  }
`;

function PanelTitle() {
  return <CenterIconWrapper><img src={starCenter} alt="star_center" /></CenterIconWrapper>
}

const StyledAttachmentPanel = styled.div`
  img {
    border: none;
    margin-bottom: 0;
  }
  .attachment-wrapper {
    padding: 20px;
  }
`;

export function AttachmentPanel(props: Props) {
  // TODO：添加阳光射线背景
  // TODO：处理加载中状态
  // TODO：处理查询失败
  return (
    <StyledAttachmentPanel>
      <PanelBackground>
        <PanelTitle />
        <div className="attachment-wrapper">
          {props.attachments.map(attachment => <Replay key={attachment.aid} {...attachment} />)}
        </div>
      </PanelBackground>
    </StyledAttachmentPanel>
  )
}

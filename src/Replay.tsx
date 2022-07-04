import styled from '@emotion/styled';
import { Border, LinearBackground } from './Background';
import * as React from 'react';
import { ReactNode, useEffect, useState } from 'react';
import banner from './assets/banner.png';
import sunlight from './assets/sunlight.png';
import { ThreadAttachment } from './AttachmentPanel';
import { jsonRequest } from './utils/request';
import { LeftPane } from './LeftPane';
import { RightPane } from './RightPane';
import { useToggle } from 'react-use';

export function ReplayBackground(props: { children?: ReactNode }) {
  return (
    <Border color="#000000" width="3px">
      <Border color="#bc0d00" width="4px">
        {props.children}
      </Border>
    </Border>
  )
}

const Title = styled.div`
  background: url(${banner}) no-repeat left center;
  background-size: 100% 100%;
  height: 34px;
  padding: 6px 0 0 40px;
  font-weight: bolder;
`;

const StyledReplay = styled.div`
  & + & {
    margin-top: 20px;
  }
`;

const ReplayContentWrapper = styled.div`
  background: #000000;
  .no-top {
    border-top: none;
  }
  .container {
    padding: 14px;
    background: url(${sunlight}) no-repeat center / 100%  bottom;
    display: flex;
    justify-content: space-between;
    align-items: start;
  }
  .relative {
    position: relative;
  }
`;

export type Player = {
  apm: number;
  clan: string;
  color: number;
  faction: number;
  human: boolean
  mode: number;
  name: string
  position: number;
  team: number;
}

export type Resp = {
  allowCommentary: boolean,
  broadcastGame: boolean,
  downloadUrl: string,
  duration: number,
  enableVoIP: boolean,
  externalId: string,
  filename: string,
  gameSpeed: number,
  gameVersion: string,
  hasAi: boolean,
  imageUrl: null,
  initialCameraPlayer: number,
  initialResources: number,
  invalid: boolean,
  mapName: string,
  mapPath: string,
  modInfo: string,
  numberOfPlayers: number,
  playAt: string,
  players: Player[],
  postCommentator: number,
  randomCrates: boolean,
  replaySaver: number,
  size: number,
  sourceUrl: string,
  tapeDelay: number,
  vsType: string,
}

export function Replay(props: ThreadAttachment) {
  const pureFilename = props.filename.replace(/\.ra3replay$/i, '');
  const [data, setData] = useState<Resp>(null);
  const [loading, setLoading] = useState(false);
  const [failed, setFailed] = useState('');
  const [refreshFlag, refresh] = useToggle(false);
  useEffect(() => {
    setFailed('');
    setLoading(true);
    jsonRequest('find/replay/by_ratotal_aid', { aid: props.aid })
      .then(resp => setData(resp), (err) => setFailed(err.message))
      .finally(() => setLoading(false));
  }, [refreshFlag]);
  return (
    <StyledReplay>
      <Title>{pureFilename}（{props.filesize}）</Title>
      <ReplayContentWrapper>
        <Border color="#000000" width="3px" className="no-top">
          <Border color="#bc0d00" width="4px" className="no-top">
            <Border color="#000000" width="2px" className="relative">
              <LinearBackground
                className="container"
                start="rgba(172, 20, 24, .69)"
                end="rgba(0, 0, 0, .69)"
                direction="top right">
                <LeftPane
                  {...data}
                  loading={loading}
                  failed={failed} />
                <RightPane
                  {...data}
                  loading={loading}
                  failed={failed}
                  onRetry={() => refresh()} />
              </LinearBackground>
            </Border>
          </Border>
        </Border>
      </ReplayContentWrapper>
    </StyledReplay>
  )
}
